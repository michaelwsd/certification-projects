class SudokuSolver {

  validateSolveString(puzzleString) {
    if (!puzzleString) return {error: 'Required field missing'};
    puzzleString = puzzleString.trim();
    if (puzzleString.length != 81) return {error: 'Expected puzzle to be 81 characters long'}
    if (!/^[1-9.]+$/.test(puzzleString)) return {error: 'Invalid characters in puzzle'} 

    let board = this.convertString(puzzleString);
    let canSolve = this.solve(board, 0, 0);
    if (!canSolve) return {error: 'Puzzle cannot be solved'}
    
    let res = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        res.push(board[i][j])
      }
    }
    
    return {solution: res.join('')} 
  }

  validateCheckString(puzzleString, coordinate, value) {
    if (!puzzleString || !coordinate || !value) return { error: 'Required field(s) missing' };
    puzzleString = puzzleString.trim();
    coordinate = coordinate.trim();

    if (puzzleString.length != 81) return {error: 'Expected puzzle to be 81 characters long'}
    if (!/^[1-9.]+$/.test(puzzleString)) return {error: 'Invalid characters in puzzle'}
    if (coordinate.length != 2 || !/^[A-I]$/.test(coordinate[0]) || !('1' <= coordinate[1] && coordinate[1] <= '9')) return { error: 'Invalid coordinate'}
    if (!(value >= 1 && value <= 9)) return {error: 'Invalid value'}

    // check row, col, region
    let row = coordinate[0].charCodeAt(0) - 'A'.charCodeAt(0);
    let col = Number(coordinate[1]) - 1;
    let board = this.convertString(puzzleString);
    if (Number(board[row][col]) == value) return {"valid": true}

    const invalids = [];
    if (!this.checkRowPlacement(board, row, value)) invalids.push('row');
    if (!this.checkColPlacement(board, col, value)) invalids.push('column')
    if (!this.checkRegionPlacement(board, row, col, value)) invalids.push('region');
    
    if (invalids.length > 0) return {"valid": false, "conflict": invalids}
    
    return {"valid": true};
  }

  convertString(puzzleString) {
    const board = []
    for (let i = 0; i < puzzleString.length; i += 9) {
      const row = puzzleString.slice(i, i+9).split('');
      board.push(row);
    }

    return board;
  }

  checkRowPlacement(board, row, value) {
    let c = board[0].length; 

    for (let j = 0; j < c; j++) {
      if (board[row][j] != '.' && Number(board[row][j]) == value) {
        return false;
      }
    }

    return true;
  }

  checkColPlacement(board, column, value) {
    let r = board.length; 

    for (let i = 0; i < r; i++) {
      if (board[i][column] != '.' && Number(board[i][column]) == value) {
        return false;
      }
    }

    return true;
  }

  checkRegionPlacement(board, row, column, value) {
    let gridX = Math.floor(row / 3) * 3, gridY = Math.floor(column / 3) * 3;

    for (let i = gridX; i < gridX + 3; i++) {
      for (let j = gridY; j < gridY + 3; j++) {
        if (board[i][j] != '.' && Number(board[i][j]) == value) {
          return false;
        }
      }
    }
    
    return true;
  }

  isValid(board, row, col, val) {
    for (let i = 0; i < 9; i++) {
      if (board[i][col] == val) return false;
      if (board[row][i] == val) return false;
      if (board[Math.floor(row/3)*3 + Math.floor(i/3)][Math.floor(col/3)*3 + i%3] == val) return false;
    }

    return true;
  }

  solve(board, row, col) {
    if (row == 9) return true;
    if (col == 9) return this.solve(board, row+1, 0);

    if (board[row][col] == '.') {
      for (let i = 1; i < 10; i++) {
        if (this.isValid(board, row, col, i.toString())) {
          board[row][col] = i.toString();

          if (this.solve(board, row, col+1)) return true;
          else board[row][col] = '.';
        }
      }
      return false;
    } else {
      return this.solve(board, row, col+1);
    }
  }
}

module.exports = SudokuSolver;

