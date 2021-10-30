import './index.css';

//* ***************************************************************/
/*
 *GLOBALS VARIABLES
 */

const btnSend = document.getElementById('btn-send');
const textField = document.getElementById('text-work');
const ul = document.getElementById('list-inline');

//* ***************************************************************/
/*
 *FUNCTIONS "PUSH/POP" WITHOUT LOCALSTORE
 */
function getJStore() {
  return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')).sort() : [];
}

function setJStore(list) {
  return localStorage.setItem('tasks', JSON.stringify(list));
}
//* ***************************************************************/
/*
 *DRAW/ERASE LI ELEMENTS IN UL ELEMENT
 */
function drawList(list, elem) {
  list.forEach(el => {
    elem.insertAdjacentHTML('beforeend', `<li>${el}</li>`);
  });
}

function eraseList() {
  ul.querySelectorAll('li').forEach(el => el.remove());
}

/*
 *ALL LOGIC
 */
function getList() {
  if (textField.value) {
    eraseList();
    setJStore(getJStore().concat(textField.value));
    drawList(getJStore(), ul);
    textField.value = '';
  }
}

drawList(getJStore(), ul);
//* ***************************************************************/
/*
 *FOR ENTER
 */
const form = document.getElementById('form');

form.onsubmit = () => {
  getList();
  return false;
};
//* ********************************************/
/*
 *SAME FOR BUTTON
 */
btnSend.addEventListener('click', () => {
  getList();
});
