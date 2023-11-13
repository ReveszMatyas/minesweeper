let size;
let hardness = 1;
let minesLeftDisplay;
let minesLeft;
let flagsLeft;

const cells = [];
const leftclickEventListeners = [];
const rightclickEventListeners = [];
const btnGenerate = document.getElementById("generateGrid");
const selector = document.getElementById("gridSize");
const allInputs = document.getElementsByTagName("input")
const mineImgSrc = 'resources/Be-Os-Be-Box-BeBox-Minesweeper32.png'
const flagImgSrc = 'resources/Iconsmind-Outline-Flag.png'
const playfieldContainer = document.getElementsByClassName("minesweeper-container")[0];

import { Minesweeper } from './minesweeper_class.js'

function cellClicked(cellObj){
  //console.log(cellObj.cell);
  let val = cellObj.cell.getAttribute('value');

  if (val === "-1"){
    uncoverCell(cellObj.cell)
    gameLost(cellObj.cell);
  } else if (val === "0"){
    uncoverEmptyCells(cellObj);
  } else {
    uncoverCell(cellObj.cell)
    switch (val){
      case "1":
        formatCell(cellObj.cell, "#FFBF00");
        break;
      case "2":
        formatCell(cellObj.cell, "#FF7000");
        break;
      case "3":
        formatCell(cellObj.cell, "#540375");
        break;
      case "4":
        formatCell(cellObj.cell, "#10A19D");
        break;
      case "5":
        formatCell(cellObj.cell, "#00A9FF");
        break;
      case "6":
        formatCell(cellObj.cell, "#F875AA");
        break;
      case "7":
        formatCell(cellObj.cell, "#57375D");
        break;
      case "8":
        formatCell(cellObj.cell, "#4C4C6D");
        break;
    }
    cellObj.cell.innerText = val;
  }

}

function uncoverEmptyCells(cellObj){
  uncoverCell(cellObj.cell);
  for (let i = Math.max(cellObj.i - 1, 0); i <= Math.min (cellObj.i + 1, cells.length - 1); i++)
    for (let j = Math.max(cellObj.j - 1, 0); j <= Math.min(cellObj.j + 1, cells[i].length - 1); j++)
      if(cells[i][j].cell.classList.contains('unclicked'))
        cellClicked(cells[i][j]);
}

function uncoverCell(cell){
  cell.classList.remove("unclicked");
  cell.classList.remove("flagged");
  cell.classList.add("uncovered");
}


function formatCell(cell, color){
  cell.style.color = color;
  cell.style.fontWeight = "bold";
}

function removeEventListeners(listeners) {
  for (const { element, listener } of listeners) {
    element.removeEventListener('click', listener);
  }
}


function gameLost(cell){
  removeEventListeners(leftclickEventListeners);
  removeEventListeners(rightclickEventListeners);
  cell.style.backgroundColor = "red"

  for(let i = 0; i < cells.length; i++){
    for(let j = 0; j < cells[i].length; j++){

        if (cells[i][j].cell.getAttribute('value') === "-1"){
            if(cells[i][j].cell.classList.contains('flagged')){
              cells[i][j].cell.removeChild(cells[i][j].cell.children[0]);
              cells[i][j].cell.classList.remove('flagged');
            }
            const mineImg = document.createElement('img');
            mineImg.src = mineImgSrc;
            mineImg.style.width = cells[i][j].cell.clientWidth + "px";
            mineImg.style.height = cells[i][j].cell.clientHeight + "px";
            cells[i][j].cell.appendChild(mineImg);
          }
      }
    }
}

function gameWon(){
  for (let i = 0; i < cells.length; i++){
    for (let j = 0; j < cells[i].length;j++){
      uncoverCell(cells[i][j].cell);
    }
    
  }
  alert("Game won!")
}

function flagCell(cellObj){
  let c = cellObj.cell;
  if (flagsLeft > 0){
    if (c.classList.contains('unclicked')){
      if(c.classList.contains('flagged')){
        c.classList.remove('flagged');
        c.removeChild(c.children[0]);
        minesLeftDisplay++;
        flagsLeft++;
        if (c.getAttribute("value") === "-1")
          minesLeft++;
      } else {
        c.classList.add('flagged');
        const flagImg = document.createElement('img');
        flagImg.src = flagImgSrc;
        flagImg.style.width = c.clientWidth + "px";
        flagImg.style.height = c.clientHeight + "px";
        c.appendChild(flagImg);
        minesLeftDisplay--;
        if (c.getAttribute("value") === "-1")
        minesLeft--;
        flagsLeft--;
      }
    }
    if (minesLeft === 0)
      gameWon();
  }
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
  minesLeftDisplay = ms.cntMines();
  minesLeft = ms.cntMines();
  flagsLeft = ms.cntMines();
  // clean up all elements
  removeElementsByClass("minesweeper-grid");

  // create a new div
  playfieldContainer.style.display = "inline-block";
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
      cells[i][j] = {
        'i' : i,
        'j' : j,
        'cell' : newCell
      };
      minesweeperGrid.appendChild(newCell);
    }
  }

  for (let i = 0; i < size; i++){
    for (let j = 0; j < size; j++){
      function handleRightClick(event){
        event.preventDefault();
        flagCell(cells[i][j]);
      }
      function handleClick(){
        cellClicked(cells[i][j]);
      }
      rightclickEventListeners.push({ element: cells[i][j].cell, listener: handleRightClick })
      leftclickEventListeners.push({ element: cells[i][j].cell, listener: handleClick });
      
      cells[i][j].cell.addEventListener('click', handleClick)
      cells[i][j].cell.addEventListener('contextmenu', handleRightClick)
  }}
});



