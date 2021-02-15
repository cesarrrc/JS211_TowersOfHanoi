'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
/**
 * This function is setting up the board as it plays out on the consoleLog.
 */
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
/**
 * This Function will move a piece from one stack to another. It will not check to see if the move
 *  is legal. When invoked, the first argument will pass through a variable "piece" and it will pop 
 *  off the end of the board "array" at the designated stack defined by the first argument, then add it 
 *  to the "endstack" which is defined in the second argument. 
 * 
 * @param {*} startStack - this is the first parameter that decides what peice to move. 
 * @param {*} endStack - this stack is where we will move the first piece to.
 */
const movePiece = (startStack, endStack) => {
  // Your code here
  let piece = stacks[startStack].pop()
    stacks[endStack].push(piece)
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
/**
 * This Funcition will check to see if the move is legal by passing it through some conditionals.
 * The 1st condition checks to make sure there is an element "piece" in the array "stack", it then
 * goes into a second if statement with 2 OR "||" conditions. The condition checks:
 *      1st: IF the deisgnated array invoked by the "endStack" argument is empty
 *      2nd: IF at least the piece on top of the deignated "endStack" is bigger than the "starStack"
 *            piece we are trying to move into it.
 *  If at least one of those is true, it will continue with moving th piece. ELSE it's false and the
 *  piece will not move.
 * 
 * @param {*} startStack - this is the first parameter that decides what peice to move. 
 * @param {*} endStack - this stack is where we will move the first piece to.
 */
const isLegal = (startStack, endStack) => {
  // Your code here
  if(stacks[startStack].length > 0){
    if(stacks[endStack].length == 0 || stacks[endStack].slice(-1) > stacks[startStack].slice(-1)) {
      return true
  } else{
    return false
    }
  }
}

// What is a win in Towers of Hanoi? When should this function run?
//In order to check for a win, we will call this Fuction to test if the current board is a win.
/**
 * In order to check for a win, we will call this Fuction to test if the current board is a win.
 * We check in the condition if either of the two "stacks" are full (or equal to starting array.length)
 * We don't check starting stack because obviously it would be a win at the beginning.
 * IF either of the conditons are met, it returns a win in the final function, or "true" for now
 * 
 * @param {*} startStack - this is the first parameter that decides what peice to move. 
 * @param {*} endStack - this stack is where we will move the first piece to.
 */
const checkForWin = (startStack, endStack) => {
  // Your code here
  if (stacks["c"].length == 4 || stacks["b"].length == 4) {
    return true
  } 
  else {
    return false
  }
}

// When is this function called? What should it do with its argument?
/**
 *  This is the final piece to the puzzle. This will fut all the functions into play and allow
 *  a player to play the game. It will tell you when you win or when you can't move a peice.
 * @param {*} startStack 
 * @param {*} endStack 
 */
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  if(isLegal(startStack, endStack)){
    movePiece(startStack, endStack)
  } else {
    return console.log("You are not allowed to place your move here!")
  }
  if (checkForWin()) {
    return console.log('you won.')
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests
/**
 * These are tests to make sure the game works properly. You can create test before you begin coding
 * to give yourself a structure or idea what needs to be accomplished and what the anticpated end
 * result will be for the programs you will need to build. 
 */

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
