let size;
let hardness;
const cells = [];

const btnGenerate = document.getElementById("generateGrid");
const selector = document.getElementById("gridSize");


const allInputs = document.getElementsByTagName("input")

import { Minesweeper } from './minesweeper_class.js'

function cellClicked(cell){
  let val = cell.getAttribute('value');

  if (val === "-1"){
    cell.classList.remove("unclicked");
    cell.classList.add("uncovered");
    //gameLost();
  } else if (val === "0"){
    cell.classList.remove("unclicked");
    cell.classList.add("uncovered");
    // TODO: search algorithm to uncover all connecting "0" fields
  } else {
    cell.classList.remove("unclicked");
    cell.classList.add("uncovered");
    console.log(val);
    switch (val){
      case "1":
        formatCell(cell, "#FFBF00");
        break;
      case "2":
        formatCell(cell, "#FF7000");
        break;
      case "3":
        formatCell(cell, "#540375");
        break;
      case "4":
        formatCell(cell, "#10A19D");
        break;
      case "5":
        formatCell(cell, "#00A9FF");
        break;
      case "6":
        formatCell(cell, "#F875AA");
        break;
      case "7":
        formatCell(cell, "#57375D");
        break;
      case "8":
        formatCell(cell, "#4C4C6D");
        break;
    }
    cell.innerText = val;
  }

}

function formatCell(cell, color){
  cell.style.color = color;
  cell.style.fontWeight = "bold";
}

// TODO implement
function gameLost(){

}


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
    cells[i] = [];
    for (let j = 0; j < size; j++){
      const newCell = document.createElement('div');
      newCell.className = "cell unclicked";
      newCell.setAttribute('value', ms.array[i][j]);
      cells[i][j] = newCell;
      minesweeperGrid.appendChild(newCell);
    }
  }

  for (let i = 0; i < size; i++){
    for (let j = 0; j < size; j++){
    cells[i][j].addEventListener('click',  () =>{
      cellClicked(cells[i][j]);
    })
  }};
});



