var formDef1=
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
var formDef2=
[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {label:'Зарегистрироваться:',kind:'submit'},
];

function formDef(formElements){
    var form = document.createElement("form");
    form.name = "myForm";
    form.action = "http://fe.it-academy.by/TestForm.php";
    document.querySelector("body").appendChild(form);
    function addElem(formElement, tagnameElement, kind){
        var elem = document.createElement(tagnameElement);
        elem.type = kind;
        var label = document.createElement("label")
        label.innerHTML = formElement.label;
        form.appendChild(label);
        elem.style.display = "block";
        elem.style.margin = "5px";
        return  form.appendChild(elem);
    }
    for(i=0; i<formElements.length; i++){
        if(formElements[i].kind === "longtext"){
            addElem(formElements[i], "input", "text");
        } else if(formElements[i].kind === "shorttext"){
            addElem(formElements[i], "input", "text");
        } else if(formElements[i].kind === "number"){
            addElem(formElements[i], "input", "text");
        } else if(formElements[i].kind === "combo"){
            var select = addElem(formElements[i], "select", "select");
            var options = ["здоровье", "домашний уют", "бытовая техника"];
            // for(var i=0; i<options.length; i++){
            //     var option = document.createElement("option");
            //     option.innerHTML = options[i];
            //     select.appendChild(option);
            // }
            // select.lastChild.setAttribute("selected", "selected");
            form.appendChild(select);
        } else if(formElements[i].kind === "check"){
            addElem(formElements[i], "input", "checkbox").setAttribute("checked", "checked");
        } else if(formElements[i].kind === "radio"){
            addElem(formElements[i], "input", "radio");
        } else if(formElements[i].kind === "memo"){
            addElem(formElements[i], "textarea");
        } else if(formElements[i].kind === "submit"){
            var button = addElem(formElements[i], "input", "submit");
            button.value = formElements[i].label.slice(0, -1);
        }
    }
}
formDef(formDef1);
formDef(formDef2);

