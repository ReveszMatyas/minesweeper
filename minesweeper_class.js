export class Minesweeper {
  
  hardnessMap = {
    "1" : {
      "8" : 10,
      "10" : 15,
      "12" : 20,
      "16" : 40
    },
    "2" : {
      "8" : 20,
      "10" : 25,
      "12" : 30,
      "16" : 60
    },
    "3" : {
      "8" : 30,
      "10" : 35,
      "12" : 40,
      "16" : 99
    }
  }

  constructor(size, hardness){
    this.array = [];
    this.size = size;
    this.hardness = hardness;
    this.mineCount = this.cntMines();
    this.populateArray();
  }

  cntMines(){
    return this.hardnessMap[this.hardness][this.size];
  }

  populateArray(){
    // Zero array
    for (let i = 0; i < this.size; i++) {
      this.array.push([]);
      for (let j = 0; j < this.size; j++)
          this.array[i].push(0);
    }
    // Place mines

    let toPlace = this.mineCount;

    while(toPlace > 0){
      
      let i = Math.floor(Math.random() * (this.size));
      let j = Math.floor(Math.random() * (this.size));

      //console.log(`i : ${i} \n j : ${j} \n current value in arr : ${this.array[i][j]} \n remaining mines: ${toPlace}`);

      if (this.array[i][j] === 0){
        this.array[i][j] = -1;
        toPlace--;
      }
    }


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