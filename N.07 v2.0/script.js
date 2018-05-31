function vowels(str){
    var vowels = str.match(/[аоиеёэыуюя]/gi).length;
    console.log("Гласных букв в строке:" , vowels); 
}
vowels(prompt("Введите текст"));