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
