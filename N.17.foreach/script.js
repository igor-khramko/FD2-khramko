"use strict";
var count = 0;
function searchVowels(value, index){
    var vowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
    count = vowels.includes(value.toLowerCase()) ? count + 1 : count;
    return count;
}
var str = prompt("Введите текст").split("").forEach(searchVowels);
console.log("Гласных букв в строке: " , count);  