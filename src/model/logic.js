export function Directions(cells, length) {

  const horizontal = _.chunk(cells, length);
  const vertical = _.zip(..._.chunk(cells, length));
  const diagonalRight = _.zip(..._.chunk(cells, length + 1));
  const diagonalLeft = _.zip(
    ..._.chunk(
      _([..._.chunk(cells, length)])
        .forEach(line => line.reverse())
        .flat(),
      length + 1
    )
  );

  function researchDirection(lines, direction) {
    return lines.find(line => {
      return line.find(cell => {
        return _.isEqual(cell, undefined) || _.isEqual(cell.classes, 'cell')
      }) ? 
      undefined : !(new Set(_.map(line, 'classes')).size - 1);
    });
  }

  function changeClassInDirection(lines, direction) {
    if (lines) {
      lines.forEach(cell => {
          cell.classes = `${cell.classes} win ${direction}`;
      });
      return lines;
    }
  }

  function getWinnerDirection(lines, direction){
    return changeClassInDirection(researchDirection(lines, direction), direction);
  }

  return (
    getWinnerDirection(vertical, 'vertical') ||
    getWinnerDirection(horizontal, 'horizontal') ||
    getWinnerDirection(diagonalRight, 'diagonal-right') ||
    getWinnerDirection(diagonalLeft, 'diagonal-left') || []
  );
}
