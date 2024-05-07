function validarAsuntoContacto(){
    let input=document.querySelector("#asuntoInputContacto")
    if(input.value.length >= 5){
        input.classList.add("correct");
        input.classList.remove("incorrecto");
    }else{
        input.classList.add("incorrecto");
        input.classList.remove("correct");
        
    }
}

function validarArmadoNombre(){
    let input = document.querySelector("#nombre-completo");
    let error = document.querySelector("#error-nombre");
    if (input.value.length >= 5) {
        input.classList.add("correct");
        input.classList.remove("incorrecto");
        error.style.color = "white";
    } else {
        input.classList.add("incorrecto");
        input.classList.remove("correct");
        error.style.color = "red";
    }
}

function validarArmadoCorreo(){
    let input = document.querySelector("#correo");
    let error = document.querySelector("#error-correo");
    if (input.value.length >= 5) {
        input.classList.add("correct");
        input.classList.remove("incorrecto");
        error.style.color = "white";
    } else {
        input.classList.add("incorrecto");
        input.classList.remove("correct");
        error.style.color = "red";
    }
}

function validarArmadoCelular(){
    let input = document.querySelector("#celular");
    let error = document.querySelector("#error-celular");
    let celular = input.value.trim(); // Obtener el valor del celular y eliminar espacios al inicio y al final

    // Validar que el valor ingresado contenga solo números y que tenga exactamente 9 dígitos
    if (/^\d{9}$/.test(celular)) {
        input.classList.add("correct");
        input.classList.remove("incorrecto");
        error.style.color = "white";
    } else {
        input.classList.add("incorrecto");
        input.classList.remove("correct");
        error.style.color = "red";
    }
}

function validarPresupuesto(){
    let input = document.querySelector("#presupuesto");
    let error = document.querySelector("#error-presupuesto");
    let presupuesto = parseInt(input.value.trim()); // Obtener el valor del presupuesto y convertirlo a número entero

    // Validar que el valor ingresado sea un número entero mayor o igual a 100000
    if (!isNaN(presupuesto) && presupuesto >= 100000) {
        input.classList.add("correct");
        input.classList.remove("incorrecto");
        error.style.color = "white";
    } else {
        input.classList.add("incorrecto");
        input.classList.remove("correct");
        error.style.color = "red";
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

document.getElementById("presupuesto").addEventListener("keyup", function() {
    var presupuestoPesos = parseFloat(document.getElementById("presupuesto").value);
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
});
