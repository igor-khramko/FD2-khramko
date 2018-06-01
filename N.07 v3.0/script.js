function vowels(){
    var vowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
    var count = 0;
    for ( var i=0; i<str.length; i++ ) {
        count = vowels.includes(str[i].toLowerCase()) ? count + 1 : count;
    }
    return count;
}
var str = prompt("Введите текст");
console.log("Гласных букв в строке: " , vowels(str)); 