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

function validarPresupuesto(){
    let input = document.querySelector("#presupuesto");
    let error = document.querySelector("#error-presupuesto");
    if (input.value.length >= 6) {
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
