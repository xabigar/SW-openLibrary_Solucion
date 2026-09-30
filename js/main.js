import {database} from './database.js'

let indice = 0
let titulo, imagen, autor, isbn, adelante, atras
const URLBASE = 'https://covers.openlibrary.org/b/id/'

function rellenarCampos(){
    titulo.value = database[indice].titulo
    fecha.value = database[indice].fecha
    autor.value = database[indice].autor
    isbn.value = database[indice].isbn
    imagen.src = URLBASE + database[indice].filename 
}

function cargar(){
    titulo  = document.getElementById('titulo');
    imagen = document.getElementById('imagen')
    autor = document.getElementById('autor')
    isbn = document.getElementById('isbn')
    adelante = document.getElementById('adelante')
    atras = document.getElementById('atras')

    adelante.addEventListener('click', adelanteHandler)
    atras.addEventListener('click', atrasHandler)
    buscar.addEventListener('click', buscarLibro)

    rellenarCampos()
}

function buscarLibro () {
    // https://openlibrary.org/dev/docs/api/books#:~:text=For%20example%2C%20here%20is%20a%20sample%20request.
    if (isbn.value) {
        fetch('https://openlibrary.org/search.json?q=isbn:' + isbn.value)
        .then(response => response.json())
        .then(jsonObject => {
            let libro = convertirLibro(jsonObject)
            database.push(libro)
            indice = database.length - 1
            rellenarCampos()
        })
    }
}

function convertirLibro (json) {
   
    let datosLibro = json.docs[0]
    let autores = datosLibro.author_name || []
    let libro = {
        "isbn": json.q.split(':')[1],
        "autor": autores.join(', '),
        "fecha": datosLibro.first_publish_year,
        "titulo": datosLibro.title,
        "filename": datosLibro.cover_i + '-M.jpg'
    }
    return libro
}

function adelanteHandler () {
    if (indice < database.length-1) {
        indice++
        rellenarCampos()
    } 
}

function atrasHandler () {
    if (indice > 0) {
        indice--
        rellenarCampos()
    }      
}

window.onload = cargar;



