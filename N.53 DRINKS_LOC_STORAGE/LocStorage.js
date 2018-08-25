"use strict"

function LocStorage(menuItem){
    var self = this;
    self.storage = {};
    if(menuItem in localStorage){
        self.storage = JSON.parse(localStorage[menuItem]);
    }
    self.addValue = function(key, value){
        self.storage[key] = value;
        localStorage[menuItem] = JSON.stringify(self.storage);
        return self.storage;
    }
    self.getValue = function(key){
        return self.storage[key];
    }
    self.deleteValue = function(key){
        if(key in self.storage){
            delete self.storage[key];
            localStorage[menuItem] = JSON.stringify(self.storage);
            return true;
        } else{
            return false;
        }
    }
    self.getList = function(){
        return Object.keys(self.storage);
    }
}

var drinkStorage = new LocStorage("drinks");
function addDrink(){
    var drinkName = prompt("Введите название напитка");
    var drinkInfo = {};
    drinkInfo.Type = confirm("Напиток алкогольный?") ? "aлкогольный" : "безалкогольный"; 
    drinkInfo.Recipe = prompt("Введите рецепт напитка");
    drinkStorage.addValue(drinkName, drinkInfo);
    console.log(drinkStorage);
}
function getDrink(){
    var drinkName = prompt("Введите название напитка");
    console.log(`Информация о "${drinkName}":
Тип напитка: ${drinkStorage.getValue(drinkName).Type}
Рецепт напитка: ${drinkStorage.getValue(drinkName).Recipe}`);
}
function deleteDrink(){
    var drinkName = prompt("Введите название удаляемого напитка");
    console.log(drinkStorage.deleteValue(drinkName));
}
function getDrinkList(){
    console.log(drinkStorage.getList());
}

var foodStorage = new LocStorage("food");
function addFood(){
    var foodName = prompt("Введите название блюда");
    var foodInfo = {};
    foodInfo.Type = confirm("Блюдо диетическое?") ? "диетическое" : "обычное"; 
    foodInfo.Recipe = prompt("Введите рецепт блюда");
    foodStorage.addValue(foodName, foodInfo);
    console.log(foodStorage);
}
function getFood(){
    var foodName = prompt("Введите название блюда");
    console.log(`Информация о "${foodName}":
Тип блюда: ${foodStorage.getValue(foodName).Type}
Рецепт блюда: ${foodStorage.getValue(foodName).Recipe}`);
}
function deleteFood(){
    var foodName = prompt("Введите название удаляемого блюда");
    console.log(foodStorage.deleteValue(foodName));
}
function getFoodList(){
    console.log(foodStorage.getList());
}