export const Data = {

  saveInLocalStorage(key, el) {
    localStorage.setItem(key, JSON.stringify(el));
  },

  loadFromLocalStorage(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
  },

  addDataToStore(key, el) {
    const storage = this.loadFromLocalStorage(key);
    storage.push(el);
    this.saveInLocalStorage(key, storage);
  },
  
  popDataFromStore(key) {
    const storage =  this.loadFromLocalStorage(key);
    storage.pop();
    this.saveInLocalStorage(key, storage);
  },

  loadLastFromStore(key){
    const storage =  this.loadFromLocalStorage(key);
    return storage.pop();
  },

  loadLastIfFromStore(key, property){
    let moves = this.loadFromLocalStorage(key);
      if (moves){
        moves.reverse();

        return moves.find(move => move.STATUS === property);
      }
  },
}
