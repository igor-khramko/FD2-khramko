"use strict";
function vowels(str){
    var vowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
    if(vowels.includes(str.toLowerCase())){
        return true;
    }
}
var str = prompt("Введите текст").split("").filter(vowels);
console.log("Гласных букв в строке: " , str.length); 