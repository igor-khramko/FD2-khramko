"use strict";
var str = prompt("Введите текст").split("");
function filter(){
    var vowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
    str.filter(value => vowels.includes(value.toLowerCase()) ? true : false);
    return str.length;
}
console.log("Гласных букв в строке: " , filter(str));