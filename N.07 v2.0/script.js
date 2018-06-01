function vowels(){
    return vowels = str.match(/[аоиеёэыуюя]/gi).length;
}
var str = prompt("Введите текст");
console.log("Гласных букв в строке: " , vowels(str)); 