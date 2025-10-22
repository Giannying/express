const express = require('express')
const app = express();
const port =3000;
app.use(express.json());

app.get('/inicio', (req,res)=> {
    res.send('¡Hola, Mundo!');
});

app.listen(port,()=>{
    console.log('Servidor inicilizado en http://localhost:'+port);
});