"use strict";
var str = prompt("Введите текст");
function filter(myStr){
    var vowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
    var vowelsArr = myStr.split("").filter(value => vowels.includes(value.toLowerCase()) ? true : false);
    return vowelsArr.length;
}
console.log("Гласных букв в строке: " , filter(str));