
var game = new Vue({
  el: '#game',
  data: {
    rows: 3,
    cols: 3,
    current_char: "X",
    game_won: false,
    end_text: "",
    game_board: [
      [
        {square: "1", character: "-"},
        {square: "2", character: "-"},
        {square: "3", character: "-"}
      ],
      [
        {square: "4", character: "-"},
        {square: "5", character: "-"},
        {square: "6", character: "-"}
      ],
      [
        {square: "7", character: "-"},
        {square: "8", character: "-"},
        {square: "9", character: "-"}
      ]
    ]
  },
  methods: {
    checkLine: function(line){
      //Check to see if the first char is not "-"
      //Then check to see if the rest of the chars are the same
      console.log(line);
      if(line[0] == "-"){
        console.log("False");
        this.game_won = false;
      } else {
        if (line[0] == line[1] &&
          line[1] == line[2]){
          console.log("Setting game_won");
          this.swapChars();
          this.end_text = this.current_char + ' won the game!';
          this.game_won = true;
        }
      }
    },
    boardFull: function(){
      let full = true;
      for (var r = 0; r < this.rows; r++) {
        for (var c = 0; c < this.cols; c++) {
            if(this.game_board[r][c]['character'] == "-"){
              full = false;
            }
        }
      }
      return full;
    },
    checkWin: function(){

      let rows = [["00", "01", "02"], ["10", "11", "12"], ["20", "21", "22"]];
      let columns = [["00", "10", "20"], ["01", "11", "21"], ["02", "12", "22"]];
      let diagonals = [["00", "11", "22"], ["20", "11", "02"]];

      console.log("HELP");

      //Check Rows
      for(r=0; r < rows.length; r++){//For every row
          if(rows[r] == "-"){
            this.game_won = false;
          }
          let line = ["-", "-", "-"];
          for(s=0; s < rows[r].length; s++){
            let square = rows[r][s];
            line[s] = this.game_board[parseInt(square[0])][parseInt(square[1])]['character'];
          }
          if(!this.game_won){
            this.checkLine(line);
          }
      }

      //Check columns
      for(c=0; c < columns.length; c++){//For every column
          if(columns[c] == "-"){
            this.game_won = false;
          }
          let line = ["-", "-", "-"];
          for(s=0; s < columns[c].length; s++){
            let square = columns[c][s];
            console.log(square);
            line[s] = this.game_board[parseInt(square[0])][parseInt(square[1])]['character'];
          }
          if(!this.game_won){
            this.checkLine(line);
          }
      }

      //Check diagonals
      for(d=0; d < diagonals.length; d++){//For every column
          if(diagonals[d] == "-"){
            this.game_won = false;
          }
          let line = ["-", "-", "-"];
          for(s=0; s < diagonals[d].length; s++){
            let square = diagonals[d][s];
            console.log(square);
            line[s] = this.game_board[parseInt(square[0])][parseInt(square[1])]['character'];
          }
          if(!this.game_won){
            this.checkLine(line);
          }
      }

      if (!this.game_won && this.boardFull()){
        this.end_text = "It's a draw!"
        this.game_won = true;
      }
    },
    getCharacter: function(row, col){
      var r = parseInt(row) - 1;
      var c = parseInt(col) - 1;
      //return {r, c};
      return this.game_board[r][c]['character'];
    },
    setCharacter: function(row, col){
      //this.game_won = true;
      if(!this.game_won){
      var r = parseInt(row) - 1;
      var c = parseInt(col) - 1;
      if(this.game_board[r][c]['character'] == "-"){
        this.game_board[r][c]['character'] = this.current_char;
        this.swapChars();
        this.checkWin();
      }
      }

      // if(this.isFull() == true){
      //   this.resetBoard();
      // }
    },
    swapChars: function(){
      if (this.current_char == "X") {
        this.current_char = "O";
      } else {
        this.current_char = "X";
      }
    },
    resetBoard: function(){
      for (var r = 0; r < this.rows; r++) {
        for (var c = 0; c < this.cols; c++) {
            this.game_board[r][c]['character'] = "-";
        }
      }
    },
    resetGame: function(){
      this.resetBoard();
      this.current_char="X";
      this.game_won=false;
    }
  }
});
