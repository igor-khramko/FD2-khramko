"use strict";
var ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
//Описание форм
var form1 = 
    [
        {label:'Название сайта:',kind:'longtext',name:'sitename'},
        {label:'URL сайта:',kind:'longtext',name:'siteurl'},
        {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
        {label:'E-mail для связи:',kind:'shorttext',name:'email'},
        {label:'Рубрика каталога:',kind:'combo',name:'division',
            variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
        {label:'Размещение:',kind:'radio',name:'payment',
            variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
        {label:'Разрешить отзывы:',kind:'check',name:'votes'},
        {label:'Описание сайта:',kind:'memo',name:'description'},
        {label:'Опубликовать:',kind:'submit'},
    ];

var form2 = 
    [
        {label:'Фамилия:',kind:'longtext',name:'lastname'},
        {label:'Имя:',kind:'longtext',name:'firstname'},
        {label:'Отчество:',kind:'longtext',name:'secondname'},
        {label:'Возраст:',kind:'number',name:'age'},
        {label:'Зарегистрироваться:',kind:'submit'},
    ];
//Перевод информации о формах в JSON-формат
var DYN_FORM1_ELEMENTS = JSON.stringify(form1);
var DYN_FORM2_ELEMENTS = JSON.stringify(form2);

var btn1 = document.querySelector(".button1");
var btn2 = document.querySelector(".button2");

btn1.addEventListener("click", displayForm('KHRAMKO_DYN_FORM1_AJAX'));
btn2.addEventListener("click", displayForm('KHRAMKO_DYN_FORM2_AJAX'));

window.addEventListener("load", saveDataOnServer);

//Запись JSON-представлений форм в базу данных
function saveDataOnServer(){
    $.ajax( {
        url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
        data : { f : 'INSERT', n : 'KHRAMKO_DYN_FORM1_AJAX', p : DYN_FORM1_ELEMENTS },
        success : dataReady, error : errorHandler
    }
    );
    $.ajax( {
        url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
        data : { f : 'INSERT', n : 'KHRAMKO_DYN_FORM1_AJAX', p : DYN_FORM2_ELEMENTS },
        success : dataReady, error : errorHandler
        }
    ); 
}

//оповещение об успешной записи в БД
function dataReady() {
    console.log("Data saved!");
}

//чтение JSON-а формы из БД
function displayForm(formnameToDisplay){
    $.ajax( {
        url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
        data : { f : 'READ', n : formnameToDisplay},
        success : display, error : errorHandler
    });
}

//построение формы по считанному из БД JSON-у
function display(formElements){
    var form = document.querySelector("form");
    function addElem(formElement, tagnameElement, kind){
        var elem = document.createElement(tagnameElement);
        elem.type = kind;
        if(kind != "submit"){
            var label = document.createElement("label")
            label.innerHTML = formElement.label;
            form.appendChild(label);
        }
        elem.style.display = "block";
        elem.style.margin = "5px";
        return  form.appendChild(elem);
    }
    for(var i=0; i<formElements.length; i++){
        if(formElements[i].kind === "longtext"){
            addElem(formElements[i], "input", "text");
        } else if(formElements[i].kind === "shorttext"){
            addElem(formElements[i], "input", "text");
        } else if(formElements[i].kind === "number"){
            addElem(formElements[i], "input", "text");
        } else if(formElements[i].kind === "combo"){
            var select = addElem(formElements[i], "select", "select");
            var variants = formElements[i].variants;
            for(var j=0; j<variants.length; j++){
                var option = document.createElement("option");
                option.innerHTML = variants[j].text;
                select.appendChild(option);
            }
            select.lastChild.setAttribute("selected", "selected");
            form.appendChild(select);
        } else if(formElements[i].kind === "check"){
            addElem(formElements[i], "input", "checkbox").setAttribute("checked", "checked");
        } else if(formElements[i].kind === "radio"){
            var variants = formElements[i].variants;
            var radiogroup = addElem(formElements[i], "div");
            for(var j = 0; j<variants.length; j++){
                var radio = document.createElement("input");
                radio.setAttribute("type", "radio");
                radio.setAttribute("name", "radio");
                var radioLabel = document.createElement("label");
                radioLabel.innerHTML = variants[j].text;
                radiogroup.appendChild(radio);
                radiogroup.appendChild(radioLabel);
            }
        } else if(formElements[i].kind === "memo"){
            addElem(formElements[i], "textarea");
        } else if(formElements[i].kind === "submit"){
            var button = addElem(formElements[i], "input", "submit");
            button.value = formElements[i].label.slice(0, -1);
        }
    }
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}