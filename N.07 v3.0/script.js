function vowels(str){
    var vowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
    var count = 0;
    for ( var i=0; i<str.length; i++ ) {
        count = vowels.includes(str.slice(i, i+1).toLowerCase()) ? count + 1 : count;
    }
    console.log(`Гласных букв в строке: ${count}`); 
}
vowels(prompt("Введите текст"));
