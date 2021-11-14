import _ from "lodash";

export function Controller(View, Model) {

  function currentClass(id){
    let lastMove = Model.Data.loadLastFromStore('move');
    if (lastMove){
      let cellClass = lastMove.CELLS.find(e =>{
        return _.isEqual(e.id, id)
      });

      cellClass = _.isEqual(cellClass.classes, 'cell') ? lastMove.MOVE : _.replace(cellClass.classes, 'cell', '');
      
      return _.isEqual(cellClass, 'ch') ? 'r' : 'ch';
    }
    return 'ch';
  }

  function initializeMove(movclass){
    let move;
    let lastField = Model.Data.loadLastFromStore('move');
    
    if (lastField){
      move = new Model.Move('rendered', lastField.CELLS, movclass);

    }else{
      
      move = new Model.Move('rendered', [], movclass);
      move.initializeTheField(Model.ROWS * Model.COLS);
    }
    return move;
  }

  function saveInfoForMove(moveclasses, id, lastclasses){
    let move = initializeMove(moveclasses);

    move.rewriteTheField({
      'classes' : `${lastclasses} ${moveclasses}`,
      'id'      : `${id}`,
    });

    let seriesLine = Model.Directions(move.CELLS, Model.ROWS);
    if(!_.isEqual(seriesLine, [])){
      move.rewriteTheField(...seriesLine);
      move.STATUS = 'won';
    }

    Model.Data.addDataToStore('move', move);

    View.View.fillField(move.CELLS);
   }

  return {
    processMove(){
      View.View.field.addEventListener('click', function(event) {
          saveInfoForMove(
              currentClass(event.target.id)
            , event.target.id
            , event.target.classList
          );

          if(Model.Data.loadLastFromStore('move').STATUS !== 'won'){
            View.View.buttonDisabled(false);
          }else{
            View.View.wonTitleVisible(true);
            View.View.buttonDisabled(true);
          }
      });

      View.View.undoBotton.addEventListener('click', function(event) {
        let moves = Model.Data.loadFromLocalStorage('move');
        if (moves){
          moves.reverse();

          moves.find(move => {
            if (move.STATUS === 'rendered'){
              move.STATUS = 'canceled';
              return true;
            }
          });
          
          Model.Data.saveInLocalStorage('move', moves.reverse());

          let lastDraw = Model.Data.loadLastIfFromStore('move', 'rendered');

          if(lastDraw){
            View.View.fillField(Model.Data.loadLastIfFromStore('move', 'rendered').CELLS);
          }else{
            View.View.clearCell();
          }
        }

      });

      View.View.redoBotton.addEventListener('click', function(event) {
        let moves = Model.Data.loadFromLocalStorage('move');
        if (moves){

          moves.find(move => {
            if (move.STATUS === 'canceled'){
              move.STATUS = 'rendered';
              return true;
            }
          });
          
          Model.Data.saveInLocalStorage('move', moves);

          let lastDraw = Model.Data.loadLastIfFromStore('move', 'rendered');

          if(lastDraw){
            View.View.fillField(Model.Data.loadLastIfFromStore('move', 'rendered').CELLS);
          }else{
            View.View.clearCell();
          }
        }

      });
    },
  }
}
