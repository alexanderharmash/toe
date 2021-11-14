export function Move(status, cells, move) {

  return {

    STATUS : status,
    CELLS  : cells,
    MOVE   : move,

    initializeTheField: function(length){
      return length ? this.CELLS = [
        {
          'classes' : 'cell',
          'id' : `c-${--length}`,
        }
      ].concat(this.initializeTheField(length)) : [];
    },

    rewriteTheField: function(...cells){
      cells.forEach(el => {
        this.CELLS.forEach(cell => {
          if (_.isEqual(cell.id, el.id)){
            cell.classes = el.classes;
          }
        });
      });
    },
  }
}
