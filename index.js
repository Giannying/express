const express = require('express')
const app = express();
const port =3000;
app.use(express.json());

app.set('view engine','ejs')

//Indica que incie una pagina con los siguientes textos
app.get('/inicio', (req,res)=> {
        const productos=[
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
    });
});

app.listen(port,()=>{
    console.log('Servidor inicilizado en http://localhost:'+port+'/inicio');
});
