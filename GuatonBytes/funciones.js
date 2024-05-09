
function validarAsuntoContacto() {
    let input = document.querySelector("#asuntoInputContacto")
    if (input.value.length >= 5) {
        input.classList.add("correct");
        input.classList.remove("incorrecto");
    } else {
        input.classList.add("incorrecto");
        input.classList.remove("correct");

    }
}

function validarArmadoNombre() {
    let input = document.querySelector("#nombre-completo");
    let error = document.querySelector("#error-nombre");
    if (input.value.length >= 5) {
        input.classList.add("correct");
        input.classList.remove("incorrecto");
        error.style.visibility = "hidden";
    } else {
        input.classList.add("incorrecto");
        input.classList.remove("correct");
        error.style.visibility = "visible";

    }
}

function validarArmadoCorreo() {
    let input = document.querySelector("#correo");
    let error = document.querySelector("#error-correo");
    if (input.value.length >= 5) {
        input.classList.add("correct");
        input.classList.remove("incorrecto");
        error.style.visibility = "hidden";
    } else {
        input.classList.add("incorrecto");
        input.classList.remove("correct");
        error.style.visibility = "visible";

    }
}

function validarArmadoCelular() {
    let input = document.querySelector("#celular");
    let error = document.querySelector("#error-celular");
    let celular = input.value.trim(); // Obtener el valor del celular y eliminar espacios al inicio y al final

    // Validar que el valor ingresado contenga solo números y que tenga exactamente 9 dígitos
    if (!isNaN(input.value) && input.value.length >= 9) {
        input.classList.add("correct");
        input.classList.remove("incorrecto");
        error.style.visibility = "hidden";
    } else {
        input.classList.add("incorrecto");
        input.classList.remove("correct");
        error.style.visibility = "visible";
    }
}

function validarPresupuesto() {
    let input = document.querySelector("#presupuesto");
    let error = document.querySelector("#error-presupuesto");
    let presupuesto = parseInt(input.value.trim()); // Obtener el valor del presupuesto y convertirlo a número entero

    // Validar que el valor ingresado sea un número entero mayor o igual a 100000
    if (!isNaN(input.value) && presupuesto >= 100000) {
        input.classList.add("correct");
        input.classList.remove("incorrecto");
        error.style.visibility = "hidden";
    } else {
        input.classList.add("incorrecto");
        input.classList.remove("correct");
        error.style.visibility = "visible";
    }
}

/********************* VALIDAR FUNCIONES ************************/

function validarFormulario() {

    validarPresupuesto();
    validarArmadoNombre();
    validarArmadoCorreo();
    validarArmadoCelular();


    if (document.querySelectorAll('.incorrecto').length > 0) {

        const modalError = new bootstrap.Modal(document.getElementById('modalError'));
        modalError.show();
    } else {
        const modalEnviar = new bootstrap.Modal(document.getElementById('modalEnviar'));
        modalEnviar.show();
    }
}


/********************** API MONEDA *************************/

document.getElementById("presupuesto").addEventListener("keyup", function () {
    var presupuestoPesos = parseFloat(document.getElementById("presupuesto").value);
    if (!isNaN(presupuestoPesos) && !isNaN(document.getElementById("presupuesto").value)) {
        fetch("https://mindicador.cl/api/dolar")
            .then(response => response.json())
            .then(data => {
                var tasaCambio = data.serie[0].valor;

                var presupuestoDolares = presupuestoPesos / tasaCambio;

                document.getElementById("presupuesto-dolares").textContent = "          $" + presupuestoDolares.toFixed(2) + " USD";
            })
            .catch(error => {
                console.error("Error al obtener la tasa de cambio:", error);
            });
    } else {
        document.getElementById("presupuesto-dolares").textContent = "           $0 USD";
    }
});


/**************************** VIDEOS *************************************/



function onYouTubeIframeAPIReady() {
    var player = new YT.Player('video1', {
        height: '360',
        width: '640',
        videoId: 'voHmSz7tJCo',
        events: {
            'onReady': onPlayerReady
        }
    });

    var player2 = new YT.Player('video2', {
        height: '360',
        width: '640',
        videoId: 'YxKjFxmzEnY',
        events: {
            'onReady': onPlayer2Ready
        }
    });

    var player3 = new YT.Player('video3', {
        height: '360',
        width: '640',
        videoId: '51c88IbjjQE',
        events: {
            'onReady': onPlayer3Ready
        }
    });
}

function onPlayerReady(event) {
    event.target.pauseVideo();
}

function onPlayer2Ready(event) {
    event.target.pauseVideo();
}

function onPlayer3Ready(event) {
    event.target.pauseVideo();
}

document.addEventListener('DOMContentLoaded', function () {
    onYouTubeIframeAPIReady();
});

/***************** API PRODUCTOS ************************/

async function getProductos() {
    try {
        const response = await fetch('https://api.platzi.com/fakestore/v2/products');
        const data = await response.json();
        console.log(data);
        return data.slice(0, 8); // Obtener solo los primeros 8 productos
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return [];
    }
}

async function mostrarProductos() {
    const productos = await getProductos();
    const productosContainer = document.getElementById('productos');
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `
            <h2>${producto.title}</h2>
            <p><strong>Precio:</strong> $${producto.price}</p>
            <p><strong>Categoría:</strong> ${producto.category}</p>
            <img src="${producto.image}" alt="${producto.title}" style="max-width: 200px;">
        `;
        productosContainer.appendChild(productoDiv);
    });
}


