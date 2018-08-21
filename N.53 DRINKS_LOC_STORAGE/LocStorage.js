"use strict"

function LocStorage(){
    var self = this;
    self.storage = {keys : []};
    self.addValue = function(category, key, value){
        self.storage[key] = value;
        self.storage.keys.push(key);
        localStorage.setItem(category, JSON.stringify(self.storage));
        return self.storage;
    }
    self.getValue = function(key){
        return self.storage[key];
    }
    self.deleteValue = function(category, key){
        if(key in self.storage){
            delete self.storage[key];
            self.storage.keys.splice(self.storage.keys.indexOf(key), 1);
            localStorage.setItem(category, JSON.stringify(self.storage));
            return true;
        } else{
            return false;
        }
    }
    self.getList = function(){
        if(self.storage.keys == ""){
            return "Перечень пуст";
        } else return self.storage.keys;
    }
}

var drinkStorage =new LocStorage();
function addDrink(){
    var drinkName = prompt("Введите название напитка");
    var drinkInfo = {};
    drinkInfo.Type = confirm("Напиток алкогольный?") ? "aлкогольный" : "безалкогольный"; 
    drinkInfo.Recipe = prompt("Введите рецепт напитка");
    drinkStorage.addValue("drinks", drinkName, drinkInfo);
    console.log(drinkStorage);
    console.log(localStorage);
}
function getDrink(){
    var drinkName = prompt("Введите название напитка");
    console.log(`Информация о "${drinkName}":
Тип напитка: ${drinkStorage.getValue(drinkName).Type}
Рецепт напитка: ${drinkStorage.getValue(drinkName).Recipe}`);
}
function deleteDrink(){
    var drinkName = prompt("Введите название удаляемого напитка");
    console.log(drinkStorage.deleteValue("drinks", drinkName));
}
function getDrinkList(){
    console.log(drinkStorage.getList());
}

var foodStorage =new LocStorage();
function addFood(){
    var foodName = prompt("Введите название блюда");
    var foodInfo = {};
    foodInfo.Type = confirm("Блюдо диетическое?") ? "диетическое" : "обычное"; 
    foodInfo.Recipe = prompt("Введите рецепт блюда");
    foodStorage.addValue("food", foodName, foodInfo);
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
    console.log(foodStorage.deleteValue("food", foodName));
}
function getFoodList(){
    console.log(foodStorage.getList());
}