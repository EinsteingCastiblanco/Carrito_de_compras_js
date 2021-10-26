
//variables
const carrito = document.querySelector('#carrito');
const contenidoCarrito = document.querySelector('#lista-carrito');
const vaciarCarro = document.querySelector('#vaciar-carrito');
const listarCursos = document.querySelector('#lista-cursos');
//arreglo con los productos que queramos agregar al carrito 
let cursosCarrrito = [];


cargarEventListener();

function cargarEventListener() {
    //evento para agregar al carrito los cursos
    listarCursos.addEventListener('click', agregarCurso); 

    //elimina datos del curso
    carrito.addEventListener('click',eliminarCursos);

    //vaciar carrito de compras
    vaciarCarro.addEventListener('click', () => {
        cursosCarrrito = [];
        limpiarHTML();
    });
}


function agregarCurso(e) {
    e.preventDefault();//desabilita la accion por defecto 
    //prevenimos el Event Bubbling con Delegation
    if(e.target.classList.contains('agregar-carrito')) {
        
        const curso = e.target.parentElement.parentElement; //variable con la direccion de la card
        
        leerCurso(curso); //mandar a llamar la funcion que extrae los elementos html
    }
}

function eliminarCursos(e) {
    if(e.target.classList.contains('borrar-curso')){
        //obtener id para eliminar
        const id = e.target.getAttribute('data-id');
        
        //eliminar del arreglo con filter
        cursosCarrrito = cursosCarrrito.filter( ad => ad.idProducto !== id);

        //limpiar html y vuelve a iterar
        imprimeHTML();
    }
}


//leer contenido del HTML y extrae la informacion
function leerCurso(cur) {

    //crear objeto con la informacion del curso
    const infoCurso = {
        imagen: cur.querySelector('img').src,
        titulo: cur.querySelector('h4').textContent,
        precio: cur.querySelector('.precio span').textContent,
        idProducto: cur.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    };

    //verificar que el elemento no se repita
    const verificaExistencia =  cursosCarrrito.some( existe => existe.idProducto === infoCurso.idProducto);
    if (verificaExistencia) { //si existe se va incrementando
        
        const cursos = cursosCarrrito.map( curso => {
            if ( curso.idProducto === infoCurso.idProducto ) {
                curso.cantidad++;
                return curso; //retona el valor si aumentado si existe
            } else {
                return curso; //retona el valor asi no este aumentado
            }

        })
    } else {
        //agregar elementos al carrito //cursosCarrrito.push(infoCurso);
        cursosCarrrito = [...cursosCarrrito, infoCurso];
    }
    imprimeHTML();

}

function imprimeHTML() {

    //limpia el html
    limpiarHTML();

    //recorre el carrito y genera html
    cursosCarrrito.forEach( curso => {
        const fila = document.createElement('tr');
        
        fila.innerHTML = `
        <td> <img src="${curso.imagen}" width=100> </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id="${curso.idProducto}"> x </a> </td>
        `;
           
        contenidoCarrito.appendChild(fila);
    });


}

//elemina los cursos del html
function limpiarHTML() {
    while(contenidoCarrito.firstChild){ //si tiene un primer elemento 
        contenidoCarrito.removeChild(contenidoCarrito.firstChild); //remueve ese primer elemento
    }
}