import {database} from './database.js'


let indice = 0
const URLBASE = 'https://covers.openlibrary.org/b/id/'
let titulo  = document.getElementById('titulo');
let imagen = document.getElementById('imagen')
let autor = document.getElementById('autor')
let isbn = document.getElementById('isbn')
let adelante = document.getElementById('adelante')
let atras = document.getElementById('atras')

function rellenarCampos(){

    titulo.value = database[indice].titulo
    fecha.value = database[indice].fecha
    autor.value = database[indice].autor
    isbn.value = database[indice].isbn
    imagen.src = URLBASE + database[indice].filename 

}


function cargar(){

    rellenarCampos()

    adelante.addEventListener('click', (event) => {
        if (indice < database.length-1)
            indice++
        rellenarCampos()
    })
    atras.addEventListener('click', (event) => {
        if (indice > 0)
            indice--
        rellenarCampos()
    })


}

window.onload = cargar;



