
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


/**************** API USUARIOS ************************/

function limpiarContenido3() {
    const contenido3 = document.getElementById('contenido3');
    contenido3.innerHTML = '';
    const contenido2 = document.getElementById('contenido2');
    contenido2.innerHTML = '';
}

function generarUsuario() {
    limpiarContenido3();

    fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => {
            const usuario = data.results[0];
            const contenido3 = document.getElementById('contenido3');
            const usuarioDiv = document.createElement('div');
            usuarioDiv.classList.add('usuario');

            const imagen = document.createElement('img');
            imagen.src = usuario.picture.large;
            imagen.classList.add('usuario-imagen');

            const datos = document.createElement('div');
            datos.classList.add('usuario-datos');

            const nombre = document.createElement('p');
            nombre.innerHTML = `<strong>Nombre:</strong> ${usuario.name.first} ${usuario.name.last}`;

            const edad = document.createElement('p');
            edad.innerHTML = `<strong>Edad:</strong> ${usuario.dob.age}`;

            const correo = document.createElement('p');
            correo.innerHTML = `<strong>Correo:</strong> ${usuario.email}`;

            const celular = document.createElement('p');
            celular.innerHTML = `<strong>Celular:</strong> ${usuario.cell}`;

            const genero = document.createElement('p');
            genero.innerHTML = `<strong>Género:</strong> ${usuario.gender}`;

            const nacionalidad = document.createElement('p');
            nacionalidad.innerHTML = `<strong>Nacionalidad:</strong> ${usuario.nat}`;

            datos.appendChild(nombre);
            datos.appendChild(edad);
            datos.appendChild(correo);
            datos.appendChild(celular);
            datos.appendChild(genero);
            datos.appendChild(nacionalidad);

            usuarioDiv.appendChild(imagen);
            contenido3.appendChild(usuarioDiv);
            contenido3.appendChild(datos);
        })
        .catch(error => console.error('Error al obtener el usuario:', error));

        fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => {
            const usuario = data.results[0];
            const contenido3 = document.getElementById('contenido2');
            const usuarioDiv = document.createElement('div');
            usuarioDiv.classList.add('usuario');

            const imagen = document.createElement('img');
            imagen.src = usuario.picture.large;
            imagen.classList.add('usuario-imagen');

            const datos = document.createElement('div');
            datos.classList.add('usuario-datos');

            const nombre = document.createElement('p');
            nombre.innerHTML = `<strong>Nombre:</strong> ${usuario.name.first} ${usuario.name.last}`;

            const edad = document.createElement('p');
            edad.innerHTML = `<strong>Edad:</strong> ${usuario.dob.age}`;

            const correo = document.createElement('p');
            correo.innerHTML = `<strong>Correo:</strong> ${usuario.email}`;

            const celular = document.createElement('p');
            celular.innerHTML = `<strong>Celular:</strong> ${usuario.cell}`;

            const genero = document.createElement('p');
            genero.innerHTML = `<strong>Género:</strong> ${usuario.gender}`;

            const nacionalidad = document.createElement('p');
            nacionalidad.innerHTML = `<strong>Nacionalidad:</strong> ${usuario.nat}`;

            datos.appendChild(nombre);
            datos.appendChild(edad);
            datos.appendChild(correo);
            datos.appendChild(celular);
            datos.appendChild(genero);
            datos.appendChild(nacionalidad);

            usuarioDiv.appendChild(imagen);
            contenido3.appendChild(usuarioDiv);
            contenido3.appendChild(datos);
        })
        .catch(error => console.error('Error al obtener el usuario:', error));
}

document.addEventListener('DOMContentLoaded', function () {
    const generarUsuarioBtn = document.getElementById('generar-usuario');

    generarUsuarioBtn.addEventListener('click', generarUsuario);
});


/**************************** RESALTAR BOTÓN NAV ***********************/

function resaltarBotonNav() {
    var sections = document.querySelectorAll('section');

    sections.forEach(function(section) {
        var sectionTop = section.offsetTop;
        var sectionHeight = section.clientHeight;

        // Calcular un offset de desplazamiento para resaltar el botón cuando el usuario está más cerca del centro
        var offset = sectionHeight * 0.25; // Por ejemplo, resaltar cuando el usuario está dentro del 25% del centro de la sección

        if (window.scrollY >= sectionTop - offset && window.scrollY < sectionTop + sectionHeight - offset) {
            var sectionId = section.getAttribute('id');
            var navLink = document.querySelector('a[href="#' + sectionId + '"]');
            
            document.querySelectorAll('#barrasuperior a').forEach(function(link) {
                link.classList.remove('active');
            });

            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    resaltarBotonNav(); 
});


window.addEventListener('scroll', resaltarBotonNav);

document.addEventListener('DOMContentLoaded', function() {
    var formulario = document.getElementById('formContacto');

    formulario.addEventListener('submit', function(event) {
         

        alert('¡Gracias por elegirnos!');
        alert('Pronto nos pondremos en contacto contigo.');
    });
});