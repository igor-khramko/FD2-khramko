"use strict";

var form = document.forms.validForm;
form = document.addEventListener("submit", formValidate, false);

function formValidate(e){
    e = e || window.event;
    try {
        var form = document.forms.validForm;

        var emptyError = document.createElement("label");
        emptyError.innerHTML = "Поле не должно быть пустым";
        emptyError.classList = "error";
        var incorrectDataError = document.createElement("label");
        incorrectDataError.innerHTML = "Введите корректные данные";
        incorrectDataError.classList = "error";
        devName.onblur = function(){
            validDevName(false);
        }
        function validDevName(toFocus){
            var devName = form.elements.name;
            var devNameValue = devName.value;
            if(devNameValue == ""){
                document.getElementById("FIO").appendChild(emptyError);
            } else {
                document.getElementById("FIO").removeChild(emptyError);
            }
            
            if(devNameValue.match(/[^a-z]/gi)){
                document.getElementById("FIO").appendChild(incorrectDataError);
                devNameValue.innerHTML = "";
            }
        }
    } catch (ex) {
        e.preventDefault();
    }
}