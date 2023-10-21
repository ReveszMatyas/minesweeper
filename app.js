const btnGenerate = document.getElementById("generateGrid");
const selector = document.getElementById("gridSize");
let size;

function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}

btnGenerate.addEventListener('click', () => {
  size = parseInt(selector.value);

  // clean up all elements
  removeElementsByClass("minesweeper-grid");

  // create a new div
  const minesweeperGrid = document.createElement("div");
  minesweeperGrid.className = "minesweeper-grid"
  minesweeperGrid.style.gridTemplateColumns = "repeat(" + size + ", 30px)"
  minesweeperGrid.style.width = (size * 30).toString() + "px";
  
  // place div
  const minesweeperContainer = document.getElementsByClassName("minesweeper-container")[0];
  minesweeperContainer.appendChild(minesweeperGrid);

  for (let i = 0; i < size*size; i++){
    const newCell = document.createElement('div');
    newCell.className = "cell";
    minesweeperGrid.appendChild(newCell);
  }
});