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
        fetch('https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn.value + '&jscmd=data&format=json')
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
    let key = Object.keys(json)[0]
    let datosLibro = json[key]
    let libro = {
        "isbn": key.split(':')[1],
        "autor": datosLibro.authors.map(a=>a.name).join(', '),
        "fecha": datosLibro.publish_date,
        "titulo": datosLibro.title,
        "filename": datosLibro.cover.medium.replace(URLBASE, '')
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



