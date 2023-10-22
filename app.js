let size;
let hardness;

const btnGenerate = document.getElementById("generateGrid");
const selector = document.getElementById("gridSize");


const allInputs = document.getElementsByTagName("input")




import { Minesweeper } from './minesweeper_class.js'


function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}

btnGenerate.addEventListener('click', () => {

  size = parseInt(selector.value);
  for (let i = 0; i < allInputs.length; i++){
    if (allInputs[i].type === "radio" && allInputs[i].checked){
      hardness = parseFloat(allInputs[i].value);
      break;
    }
  }

  if (hardness === 0)
    return;

  const ms = new Minesweeper(size, hardness);

  // clean up all elements
  removeElementsByClass("minesweeper-grid");

  // create a new div
  const minesweeperGrid = document.createElement("div");
  minesweeperGrid.className = "minesweeper-grid"
  minesweeperGrid.style.gridTemplateColumns = "repeat(" + size + ", 24px)"
  minesweeperGrid.style.width = (size * 24 + 2).toString() + "px";
  
  // place div
  const minesweeperContainer = document.getElementsByClassName("minesweeper-container")[0];
  minesweeperContainer.appendChild(minesweeperGrid);

  // fill with cells
  for (let i = 0; i < size; i++){
    for (let j = 0; j < size; j++){
      const newCell = document.createElement('div');
      newCell.className = "cell";
      newCell.innerText = ms.array[i][j];
      minesweeperGrid.appendChild(newCell);
    }
  }
});