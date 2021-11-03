 import './generateField.js';
 import { slots, undo, redo, wont, wons, rest} from './global/variables.js';
 import {css} from './index.css';

//**************************************************************************************************************** */
Array.prototype._push = function (el){
    this.push(el);
    return this;
}

Array.prototype._pop = function (){
    this.pop();
    return this;
}

function getArrayFromList(list){
    return Array.prototype.slice.call(list);
}

//**************************************************************************************************************** */

/*
* SAVE/DEL IN LOCALSTOREGE
*/

function save(key, el){
    localStorage.setItem(`${key}`, JSON.stringify(el));
}

function load(key){
    return localStorage.getItem(`${key}`) ? JSON.parse(localStorage.getItem(`${key}`)) : [];
}

function addDataToStore(key, el){
    save(key, load(key)._push(el));
    return (...arg) => {
       return arg.length ? addDataToStore(...arg) : false;
    }
}

function popDataToStore(key){
    save(key, load(key)._pop());
    return (...arg) => {
       return arg.length ? popDataToStore(...arg) : false;
    }
}

//**************************************************************************************************************** */

function move(){
    return (load('sym') == 'ch') ? 'r' : 'ch';
}

//**************************************************************************************************************** */
/*
* DRAW slots
*/

function clearCell(){
    Array.prototype.slice.call(slots).forEach((el) => el.classList = 'cell');
}

function fillCell(id, cls){
    id.forEach((e,i) => {
        Array.prototype.slice.call(slots).find((el) => el.id == e).classList.add(cls[i]);
    })
}



//**************************************************************************************************************** */

/*
* MAIN LOGIC
*/

function buttons(){
  console.log(!load('won'), load('id').length !== 0);
    redo.disabled = (!load('won') && load('last').length !== 0) ? false : true;
    undo.disabled = (!load('won') && load('id').length !== 0) ? false : true;
}

function removeCell(){
    clearCell();
    fillCell(load('id'), load('class'));
}

function clearField(){
    //save('won', false);
    load('id').forEach(() => 
        popDataToStore('id')('class')
    );

    save('sym', 'r');
    removeCell();
    buttons();

    wont.classList = 'hidden';
}

function addEvents(){
    slots.forEach((e) => e.addEventListener('click', (el) => { 

            if(!load('won') && !load('id').find((e) => e == el.target.id)){
            save('sym', move());
            addDataToStore('id', el.target.id)('class', load('sym'));
            buttons();   
            }
            removeCell();
            won();
        })
    );

    undo.addEventListener('click', (el) => { 
        save('last', [load('id').pop(), load('class').pop()]);
        save('sym', move());
        popDataToStore('id')('class');
        removeCell();
        buttons();
        wont.classList = 'hidden';
    });
    
    redo.addEventListener('click', (el) => { 
      let last = getArrayFromList(load('last'));
      if(last.length){
        save('sym', move());
        addDataToStore('class', last.pop())('id', last.pop());
        save('last', [])
        fillCell(load('id'), load('class'));
        buttons();
      }
    });

    buttons();
    
    rest.addEventListener('click', (el) => { 
        save('won', false);
        save('last', []);
        clearField();
    });
    
}
//**************************************************************************************************************** */

/*
* GAME
*/

function getClass(el){
    return el.classList.value.split(' ').pop();
}

function getFirstSymbolInLine(i, array){
    return (getClass(array[i]) == 'cell') ? '' : getClass(array[i]);
}

function winClass(arr, type){
        if(!arguments.length && load('id').length == 9){
            wont.classList = 'won-title';  
            wons.textContent = `It's a draw!`;
            return false;
        }

        if(arguments.length){
          save('won', true);
          buttons();
            arr.forEach((e) => {
                e.classList.add('win', `${type}`)
            });

            wont.classList = 'won-title';  
            wons.textContent = arr.pop().classList.value.split(' ').find((e) => e == 'ch') ? `Crosses won!` : `Toes won!`;   
        }
      
}

/*
* array - а field
* start - а first symbol in line 
* iterator - a function that calculates the first character of a new line
* clas - diagonal-left | diagonal-right | vertical | horizontal
*/
function series(array, start, iterator, clas){
    
    let seria;
    let symbol;
    let seriaLine = [];

    for (let i = 0; i < 3; i++) {

        symbol = getFirstSymbolInLine(start(i), array);

        seria = true;

        for (let j = 0 ; j < 3; j++){
            seriaLine.push(array[iterator(i, j)]);
            seria &= getClass(array[iterator(i, j)]) == symbol;
        }  
        
        if(seria){   
            return [seriaLine, clas];
        }
 
        seriaLine = [];
     }

     return false;
}

function won(){

    let wonLineAndClass = series(slots, (i) => 2    , (i,j) => j * 3 + 2 - j, `diagonal-left`)  ||
    series(slots, (i) => 0    , (i,j) => j * 3 + j    , `diagonal-right`) ||
    series(slots, (i) => i * 3, (i,j) => i * 3 + j    , 'horizontal')     ||
    series(slots, (i) => i    , (i,j) => j * 3 + i    , 'vertical')       || [];
                 
    winClass(...wonLineAndClass);
}

 

fillCell(load('id'), load('class'));
won();
addEvents();






