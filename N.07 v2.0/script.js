function vowels(){
    var vowels = prompt("Введите текст").match(/[аоиеёэыуюя]/gi).length;
    console.log("Гласных букв в строке:" , vowels); 
}
vowels();