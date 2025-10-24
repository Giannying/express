const express = require('express')
const app = express();
const port =3000;
app.use(express.json());

app.set('view engine','ejs')
//express
const admin= require("firebase-admin");
const cors= require("cors");
app.use(cors())
app.use(express.urlencoded({extended: true}));
//credenciales
let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY){
    serviceAccount =JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
}else{
    serviceAccount=require('./firebase_key.json');
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db=admin.firestore(); //Rutas de la API de productos
//Indica que incie una pagina con los siguientes textos
app.get('/productos', async (req,res)=> {
    try {
        const items= await db.collection("productos").get();
        const productos=items.docs.map(doc=>{
            const data = doc.data();
            return {
                id: doc.id,
                nombre: data.nombre,
                descripcion: data.descripcion,
                precio:data.precio,
                image:data.image
            };
        });
        res.render('inicio',{productos});
    } catch(error){
        res.status(500).json({error:error.message})
    }
 /*       const productos=[
     {
            nombre:"Audifonos Bluetooth",
            descripcion:'Sonido de alta calidad y cancelacion de ruido',
            precio: 899.99,
            imagen: 'https://picsum.photos/200'
        },
        {
            nombre:"Smartwatch Pro",
            descripcion:'Controla tu salud y recibe notificaciones',
            precio: 1299.50,
            imagen: 'https://picsum.photos/200?2'
},
                {
            nombre:"Camara 4K",
            descripcion:'Captura tus momentos con resolucion ultra HD',
            precio: 4999.00,
            imagen: 'https://picsum.photos/200?3'
},
        {
            nombre:"Desfribiladores",
            descripcion:'Dale a tu vida esos pulsos que necesita',
            precio: 2499.99,
            imagen: 'https://picsum.photos/200?3'
},
        {
            nombre:"Celular Pro UltraMax ",
            descripcion:'Lleva a cualquier lado tu herramienta con multifunciones',
            precio: 6999.99,
            imagen: 'https://picsum.photos/200?4'
},
        {
            nombre:"Joycones de PlayBox",
            descripcion:'Mandos para la mas nueva consola de Sega',
            precio: 1799.99,
            imagen: 'https://picsum.photos/200?5'
}
];
    res.render('inicio',{ productos
    });*/


});
app.get('/productos/add',(req,res)=>{
    res.render('form',{producto:null,nombre:'rear productos'})
});
   app.post('/productos', async (req,res)=>{
        try{
            const { nombre,precio,descripcion,imagen}=req.body;
            const nuevo ={
                nombre:nombre||'',
                precio:parseFloat(precio)||0,
                descripcion,
                imagen:imagen||''
            };
            await db.collection('productos').add(nuevo);
            res.redirect('/productos');
        }catch(err){
            console.error(err);
            res.status(500).send('Error al crear producto')
        }
    });
app.delete('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = db.collection('productos').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ error: 'Producto no encontrado' });
    await docRef.delete();
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
app.listen(port,()=>{
    console.log('Servidor inicilizado en http://localhost:'+port+'/inicio');
});

 