"use strict";
function vowels(count, str){
  var vowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
  return count = vowels.includes(str.toLowerCase()) ?  count + 1 : count;
}
var str = prompt("Введите текст").split("").reduce(vowels, 0);
console.log("Гласных букв в строке: " , str); 