"use strict";

var form = document.forms.validForm;
form = document.addEventListener("submit", formValidate, false);
// function ErrorProccessong(){
//     var self = this;
//     self.errorMessage = function(error){
//         self.
//     }
// }
function formValidate(e){
    e = e || window.event;
    try {
        var form = document.forms.validForm;
        var devName = form.elements.name;
        var siteName = form.elements.siteName;
        var siteURL = form.elements.siteURL;
        var visitors = form.elements.visitors;
        var email = form.elements.email;
        var selectOption = form.elements.selectOption;
        var placement = form.elements.placement;
        var checkbox = form.elements.checkbox;
        var textarea = form.elements.textarea;
        var submit = form.elements.submit;

        // devName = document.addEventListener("blur", validation, false);
        var devNameValue = devName.value;
        var siteNameValue = siteName.value;
        var siteURLValue = siteURL.value;
        var visitors = visitors.value;
        var email = email.value;
        var selectOption = selectOption.value;
        var placement = placement.value;
        var checkbox = checkbox.value;
        var textarea = textarea.value;
        

        var emptyError = document.createElement("label");
        emptyError.innerHTML = "Поле не должно быть пустым";
        emptyError.classList = "error";

        var incorrectDataError = document.createElement("label");
        incorrectDataError.innerHTML = "Введите корректные данные";
        incorrectDataError.classList = "error";
        
        if(devNameValue == ""){
            document.getElementById("FIO").appendChild(emptyError);
            devName.focus(); 
            e.preventDefault();
            return;
        } else if(devNameValue.match(/[^a-z]/gi)){
            document.getElementById("FIO").appendChild(incorrectDataError);
            devNameValue.innerHTML = "";
            devName.focus(); 
            e.preventDefault();
        }

        if(siteNameValue == ""){
            document.getElementById("sitename").appendChild(emptyError);
            devName.focus(); 
            e.preventDefault();
            return;
        } else if(siteNameValue.match(/[^a-z]/gi)){
            document.getElementById("sitename").appendChild(incorrectDataError);
            devName.focus(); 
            e.preventDefault();
        }

        if(siteURLValue == ""){
            document.getElementById("sitename").appendChild(emptyError);
            devName.focus(); 
            e.preventDefault();
            return;
        } else if(siteURLValue.match(/[^a-z]/gi) && siteURLValue.match(/[^@]/gi)){
            document.getElementById("sitename").appendChild(incorrectDataError);
            devName.focus(); 
            e.preventDefault();
        }

        // form.elements.submit.removeAttribute("disabled");
    } catch (ex) {
        e.preventDefault();
    }
}