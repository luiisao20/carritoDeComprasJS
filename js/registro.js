var listItems;
var error;
var nameCar

function saveCarrito(listItems, error, nameCar, buttonsave){
    buttonsave.addEve


    if (listItems.length == 0){
        error.innerText = 'No hay nada que guardar';
        return false;
    }
    localStorage.setItem(`${nameCar}`,JSON.stringify(listItems))
    console.log('Guardado!');
}