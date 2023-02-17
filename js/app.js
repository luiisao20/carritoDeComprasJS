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
var itemsaved;

function moviendoComponente(event){
    item = event.target;
}

function moviendoCom(event){
    itemsaved = event.target;
}

function borrarDato(event){
    console.log('Borrando');
    console.log(itemsaved.getElementsByTagName('span')[0].innerText);
    let index = listItems.indexOf(itemsaved.getElementsByTagName('span')[0].innerText)
    console.log(index);

}

function deletingItem(){
    let ietmList = document.getElementsByClassName('itemlist');
    let trash = document.getElementById('trash');
    
    for (let itemsaved of ietmList) {
        itemsaved.addEventListener('dragstart', moviendoCom);
    }
    trash.addEventListener('dragover', e=>{e.preventDefault()});
    trash.addEventListener('drop', borrarDato);
}

function printElementsInUl(){
    for (let i = 0; i < listItems.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = `${i + 1}. ` + listItems[i];
        listItem.setAttribute('class', '')
        ul.appendChild(listItem);
    }
}

function insertarDatos(event){
    if (listItems.length >= 12) {
        error.innerText = 'La lista ya esta llena';
        return false
    }
    numberList += 1;
    error.innerText = '';
    itemName = item.getElementsByTagName('p')[0].innerHTML;
    itemPrice = item.getElementsByTagName('span')[0].innerHTML;
    ul = list.getElementsByTagName('ul')[0];
    price = precio.getElementsByTagName('span')[0];
    
    if (price.innerText == '0') {
        priceTotal = 0
    }

    listItems.push(itemName);
    ul.innerHTML = '';

    printElementsInUl();

    priceTotal += parseFloat(itemPrice);
    price.innerText = priceTotal.toFixed(2);
    console.log(listItems);
    deletingItem();
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
    error = document.getElementById('error');

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