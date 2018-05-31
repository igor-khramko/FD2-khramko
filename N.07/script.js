function vowels(str){
    var vowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
    var count = 0;
    for(var i = 0; i<str.length; i++){
        for(var j = 0; j < vowels.length; j++){
            if(str[i].toLowerCase() == vowels[j]){
                count++;
            }
        }
    }
    console.log(`Гласных букв в строке: ${count}`); 
}
vowels(prompt("Введите текст"));
