"use strict";
var str = prompt("Введите текст").split("");
function reduce(myStr){
  var vowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
  return myStr.reduce((count, value) => {
    return count = vowels.includes(value.toLowerCase()) ?  count + 1 : count;
  }
    , 0);
}
console.log("Гласных букв в строке: " , reduce(str)); 