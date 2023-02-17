/*
* JS para la comprobacion de datos del formulario de entrada
* @author Luis Bravo <bravo.luis.1995@gmail.com>
*/
var items;
var item;
var container;
var list;
var precio;
var ul;
var price;
var itemPrice;
var listItems;
var error;
var numberList;
var ietmsList;
var itemsaved;

function moviendoComponente(event){
    item = event.target;
}

function insertarDatos(event){
    if (listItems.length >= 12) {
        error.innerText = 'La lista ya esta llena';
        return false
    }
    numberList += 1
    error.innerText = ''
    itemName = item.getElementsByTagName('p')[0].innerHTML
    itemPrice = item.getElementsByTagName('span')[0].innerHTML
    ul = list.getElementsByTagName('ul')[0]
    price = precio.getElementsByTagName('span')[0]
    ul.innerHTML += `<li id="itemsList" draggable="true">${numberList}. ${itemName}</li>`
    
    if (price.innerText == '0') {
        priceTotal = 0
    }

    listItems.push(itemName)
    priceTotal += parseFloat(itemPrice)
    price.innerText = priceTotal.toFixed(2)
    console.log(listItems);
    return true
}

function deleteAll(event){
    event.preventDefault();

    if (listItems.length == 0){
        console.log('No se puede borrar');
        error.innerText = 'La lista está vacía'
        return false
    }
    error.innerText = ''
    numberList = 0
    listItems = [];
    console.log('Se puede borrar');
    ul.innerHTML = '';
    price.innerText = '0';
    return true
}

function domCargado(){
    items = document.getElementsByClassName('item');
    container = document.getElementById('container');
    list = document.getElementById('list');
    precio = document.getElementById('precio');
    formButton = document.getElementById('button');
    error = document.getElementById('error')

    for (let item of items){
        item.addEventListener('dragstart', moviendoComponente)
    }

    listItems = []
    numberList = 0
    formButton.addEventListener('submit', deleteAll)
    container.addEventListener('dragover', e=>{e.preventDefault()});
    container.addEventListener('drop', insertarDatos);
}

document.addEventListener('DOMContentLoaded', domCargado);