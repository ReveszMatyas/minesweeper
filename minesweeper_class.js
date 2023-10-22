export class Minesweeper {

  constructor(size, hardness){
    this.array = [];
    this.size = size;
    this.hardness = hardness;
    this.populateArray(size, hardness);
    this.mineCount = this.cntMines();
  }

  cntMines(){
    let cnt = 0;
    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++)
        if(this.array[i][j] === -1)
          cnt++;
    
    return cnt;
  }

  populateArray(size, hardness){
    // Place the mines
    for (let i = 0; i < this.size; i++) {
      this.array.push([]);
      for (let j = 0; j < this.size; j++) {
        let randomNumber = Math.random();

        if (randomNumber < this.hardness)
          this.array[i].push(-1);
        else
          this.array[i].push(0);
      }
    }
    console.log("The original grid:");
    this.displayGrid();
    console.log("After: ");
    // Add cell values

    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++)
        this.countValue(i, j);

  }

  countValue(row, column){
    let cnt = 0;
    if (this.array[row][column] !== -1){
      for(let i = Math.max(row - 1, 0); i < Math.min(row + 2, this.size); i++){
        for(let j = Math.max(column - 1, 0); j < Math.min(column + 2, this.size); j++) {
          if (this.array[i][j] === -1)
            cnt++;
          }
        }
        this.array[row][column] = cnt;
      }
    else
      this.array[row][column] = -1;

  }

  displayGrid(){
    for (let i = 0; i < this.size; i++)
      console.log(this.array[i]);
  }



}