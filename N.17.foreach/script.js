"use strict";
var str = prompt("Введите текст");
function foreach(myStr){    
    var count = 0;
    var vowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
    myStr.split("").forEach(value => {count = vowels.includes(value.toLowerCase()) ? count + 1 : count});
    return count;
}
console.log("Гласных букв в строке: " , foreach(str));  