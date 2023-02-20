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
var listPrices;
var buttonsave;
var nameCar;
var getCarrito;
var savedCar;
var errorGet;

function moviendoComponente(event){
    item = event.target;
}

function moviendoCom(event){
    itemsaved = event.target;
}

function borrarDato(event){
    console.log('Borrando');
    itemToDelete = itemsaved.getElementsByTagName('span')[0].innerHTML
    let index = listItems.indexOf(itemToDelete)
    listItems.splice(index, 1);
    listPrices.splice(index, 1);
    console.log(listItems);
    printElementsInUl();
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
    ul.innerHTML = '';
    for (let i = 0; i < listItems.length; i++) {
        const listItem = document.createElement('li');
        listItem.setAttribute('class', 'itemlist')
        listItem.setAttribute('draggable', 'true')
        const listItemText = document.createElement('span')
        listItemText.textContent = listItems[i];
        listItem.appendChild(document.createTextNode(i + 1 + '. '));
        listItem.appendChild(listItemText);
        ul.appendChild(listItem);
    }
    if (listItems.length == 0){
        price.innerText = '0';
        return false;
    }
    let totalPrice = listPrices.reduce((x, y) => {return x + y});
    price.innerText = totalPrice.toFixed(2);
}

function insertarDatos(event){
    if (listItems.length >= 12) {
        error.innerText = 'La lista ya esta llena';
        return false
    }
    error.innerText = '';
    itemName = item.getElementsByTagName('p')[0].innerHTML;
    itemPrice = item.getElementsByTagName('span')[0].innerHTML;
    listPrices.push(parseFloat(itemPrice));

    listItems.push(itemName);

    printElementsInUl();

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
    listPrices = []
    return true
}

function domCargado(){
    items = document.getElementsByClassName('item');
    container = document.getElementById('container');
    list = document.getElementById('list');
    precio = document.getElementById('precio');
    formButton = document.getElementById('button');
    error = document.getElementById('error');
    buttonsave = document.getElementById('buttonsave');
    nameCar = document.getElementById('namecarrito');
    getCarrito = document.getElementById('getcar');
    savedCar = document.getElementById('savedcarrito');
    errorGet = document.getElementById('errorget');
    ul = list.getElementsByTagName('ul')[0];
    price = precio.getElementsByTagName('span')[0];

    for (let item of items){
        item.addEventListener('dragstart', moviendoComponente)
    }

    listItems = [];
    listPrices = [];

    formButton.addEventListener('submit', deleteAll)
    container.addEventListener('dragover', e=>{e.preventDefault()});
    container.addEventListener('drop', insertarDatos);
    buttonsave.addEventListener('click', saveCarrito);
    getCarrito.addEventListener('click', recupCarSaved);
}

function saveCarrito(){

    let nameSaved = localStorage.getItem(`${nameCar.value}`)
    console.log(nameSaved);
    
    if (nameSaved !== null){
        error.innerText = 'Este carrito ya existe!'
        return false
    } else if (listItems.length == 0){
        error.innerText = 'No hay nada que guardar';
        return false;
    } else if (nameCar.value == '') {
        error.innerText = 'Ingrese un nombre por favor';
        return false
    }
    error.innerText = '';
    errorGet.innerText = ''

    listSaved = {
        items: listItems,
        price: listPrices
    }
    localStorage.setItem(`${nameCar.value}`,JSON.stringify(listSaved))

    console.log('Guardado!');
}

function recupCarSaved() {
    console.log('Se obtiene el carrito');
    if (savedCar.value.length == 0){
        console.log('No hay nombre');
        savedCar.focus();
        errorGet.innerText = 'Ingrese un nombre por favor'
        return false
    }
    errorGet.innerText = ''
    console.log(savedCar.value);
    let listGet = localStorage.getItem(`${savedCar.value}`)

    if (listGet == null){
        console.log('No hay el carrito');
        errorGet.innerText = 'No existe un carrito con ese nombre'
        return false
    }

    let listObtained = JSON.parse(listGet)
    errorGet.innerText = ''
    listItems = listObtained.items
    listPrices = listObtained.price
    printElementsInUl();
    return true
}

document.addEventListener('DOMContentLoaded', domCargado);