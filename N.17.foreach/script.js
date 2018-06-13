"use strict";
var str = prompt("Введите текст");
function foreach(){    
    var count = 0;
    var vowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
    str.split("").forEach(value => {count = vowels.includes(value.toLowerCase()) ? count + 1 : count});
    return count;
}
console.log("Гласных букв в строке: " , foreach(str));  