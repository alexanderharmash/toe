export const View = {
  
  field: document.querySelector('div.field'),
  cells: document.querySelectorAll('div.cell'),
  wonTitle: document.querySelector('div.won-title'),
  wonMessage: document.querySelector('span.won-message'),
  undoBotton : document.querySelector('button.undo-btn.btn'),
  redoBotton : document.querySelector('button.redo-btn.btn'),
  
  wonTitleVisible(visible){
    if(visible){
      this.wonTitle.classList.value ="won-title";
    }else{
      this.wonTitle.classList.value ="won-title hidden";
    }
  },

  buttonDisabled(disabl){
    this.undoBotton.disabled = disabl;
    this.redoBotton.disabled = disabl;
  },

  clearCell(){
    Array.from(this.cells).forEach((el) => el.classList = 'cell');
  },

  fillField(lastField){
    Array.from(this.cells).reverse().forEach((cell, index) => {
      cell.classList.value = lastField[index].classes;
    })
  },
}
