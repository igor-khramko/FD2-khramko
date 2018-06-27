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
    var drinkInfo = {};
    drinkInfo.Type = confirm("Напиток алкогольный?") ? "aлкогольный" : "безалкогольный"; 
    drinkInfo.Recipe = prompt("Введите рецепт напитка");
    drinkStorage.addValue(drinkName, drinkInfo);
    console.log(drinkStorage.storage);
}
function get(){
    var drinkName = prompt("Введите название напитка");
    console.log(`Информация о "${drinkName}":
Тип напитка: ${drinkStorage.getValue(drinkName).Type}
Рецепт напитка: ${drinkStorage.getValue(drinkName).Recipe}`);
}
function deleteKey(){
    var drinkName = prompt("Введите название удаляемого напитка");
    console.log(drinkStorage.deleteValue(drinkName));
}
function getList(){
    console.log(drinkStorage.getList());
}