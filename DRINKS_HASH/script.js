function HashStorage(){
    var self = this;
    self.storage = {};
    self.addValue = function(key, value){
        self.storage[key] = value;
        return self.storage;
    }
    self.getValue = function(key){
        return self.storage[key];
    }
    self.deleteValue = function(key){
        if(key in self.storage){
            delete self.storage[key];
            return true;
        } else{
            return false;
        }
    }
    self.getList = function(){
        return Object.keys(self.storage);
    }
}
var drinkStorage =new HashStorage();
function add(){
    var drinkName = prompt("Введите название напитка");
    var drinkInfo = [];
    drinkInfo.push("Тип напитка: ");
    drinkInfo.push(confirm("Напиток алкогольный?") ? "aлкогольный" : "безалкогольный"); 
    drinkInfo.push("; Рецепт напитка: ");
    drinkInfo.push(prompt("Введите рецепт напитка")); 
    drinkInfo = drinkInfo.join("");
    drinkStorage.addValue(drinkName, drinkInfo);
    console.log(drinkStorage.storage);
}
function get(){
    var drinkName = prompt("Введите название напитка");
    console.log(`Информация о "${drinkName}":
${drinkStorage.getValue(drinkName)}`);
}
function deleteKey(){
    var drinkName = prompt("Введите название удаляемого напитка");
    console.log(drinkStorage.deleteValue(drinkName));
}
function getList(){
    console.log(drinkStorage.getList());
}