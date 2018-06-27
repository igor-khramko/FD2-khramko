"use strict";

var form = document.forms.validForm;
form = document.addEventListener("submit", formValidation, false);

function showMessage(container, errorMessage){
    container.classList.add("error");
    var message = document.createElement("label");
    message.classList.add("error-message");
    message.innerHTML = errorMessage;
    container.value = "";
    container.appendChild(message);
}

function deleteMessage(container){
    if(container.classList.contains("error")){
        container.removeChild(message);
    }
}

function formValidation(){
    var form = document.forms.validForm;
    var devName = form.elements.name;
    var FIO = document.getElementById("FIO");
    if(devName.value == ""){
        showMessage(FIO, "Поле не должно быть пустым")
    } else if(devName.value.match(/[^a-z]/gi)){
        showMessage(FIO, "Заполните поле латинскими буквами")
    }
}