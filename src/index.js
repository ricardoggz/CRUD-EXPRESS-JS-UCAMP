//Configurar express
const express = require('express')
const server = express()

//Middleware json()
server.use(express.json())

//Levantar mi servidor con el método listen
server.listen(3000, ()=>{
    console.log('Servidor corriendo en localhost:3000')
})

//PELÍCULAS
let movies = [
    {
       id : 1,
       title: 'John Wick',
       duration: '1hr' 
    },
    {
        id: 2,
        title: 'Rápido y furioso',
        duration: '2hrs'
    },
    {
        id: 3,
        title: 'Super Mario bros',
        duration: '2hr'
    }
]
//CRUD

//1._ READ (GET)
server.get('/peliculas', (req, res)=>{
    res.status(200)
    res.json({
       message : 'Películas',
       movies: movies
    })
})

//2._ CREATE (POST)
server.post('/agregar-pelicula', (req, res)=>{
    //body
    const { body } = req
    movies.push(body)
    res.status(201)
    res.json({
        message: 'Película agregada correctamente',
        movies: movies
    })
})

//3._ UPDATE (PUT)
server.put('/editar-pelicula/:id', (req, res)=>{
   //Obtener el id del request
   const { body }= req
   const { id } = req.params
   //Indice del elemento
   const index = movies.findIndex((movie)=> movie.id === parseInt(id))
   //Sustitución del elemento
   movies.splice(index, 1, body)
   //Respuesta con datos actulizados
   res.json({
    message: 'Película actualizada correctamente',
    movies: movies
   })
})

//4._ DELETE (DELETE)
server.delete('/eliminar-pelicula', (req, res)=>{
    //Obtener el id del request
   const { id }= req.body
   //Indice del elemento
   const index = movies.findIndex((movie)=> movie.id === parseInt(id))
   movies.splice(index, 1)
   res.json({
    message: 'Película eliminada correctamente',
    movies: movies
   })
})