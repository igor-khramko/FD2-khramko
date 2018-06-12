"use strict";
var str = prompt("Введите текст").split("");
function filter(){
    function vowels(str){
        var vowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
        if(vowels.includes(str.toLowerCase())){
            return true;
        }
    }
    return str.filter(vowels).length;
}
console.log("Гласных букв в строке: " , filter());