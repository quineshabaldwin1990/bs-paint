/*******************
 * OUR HELPER CODE *
*******************/

/*
 * Here we add the squares to the canvas dynamically.
 * You can mostly leave this section alone!
 * But if you want to change how wide the canvas is,
 * there are just two steps:
 * 
 * 1. Change the `gridWidth` value below.
 * 2. Change the `grid-template-rows` and
 * `grid-template-columns` to match.
 *
 * To make the second one happen, the number to change
 * is the first argument to `repeat`, currently set at 10.
 */
const gridWidth = 10;
let count = 0;
let rowCount, colCount;
while (count <= gridWidth * gridWidth) {
  const canvas = document.querySelector('.canvas');
  const div = document.createElement('div');
  rowCount = parseInt(count/10);
  colCount = count%10;
  div.className = 'square color-5 rowNo-' + rowCount + ' colNo-' + colCount;
  console.log(div.className);
  canvas.appendChild(div);
  count++;
}
console.log(count);

let mousePressed = false;
let columnTrigger = false;
let rowTrigger = false;

// You probably should NOT do these in the order below.
// That is, you probably should NOT do all the queries,
// THEN all the functions,
// THEN all the wiring.

// Instead, it'll be easier if you go one action at a time!
// So, add a query for the palette colors.
// THEN add an event listener function for what happens when one is clicked.
// THEN wire those two together, so that when the palette elements are clicked,
// the function runs.
//
// And proceed from there to getting the squares working.
//

// ALSO.
// You do not have to follow the sections below. If you're doing your functions inline, it doesn't make a lot of sense to separate the event listener functions from their wiring!

/***********
 * QUERIES *
***********/

// Add queries for all your squares, palette colors, and brush here.
// (Note the singular or plural used in that sentence!)
const squares = document.querySelectorAll(".square");
const palleteColors = document.querySelectorAll(".palette-color");
const currBrush = document.querySelector(".current-brush");
const rubber = document.querySelector(".current-rubber");
const rowButton = document.querySelector(".current-rowButton");
const colButton = document.querySelector(".current-colButton");

//function to return particular row squares
function getRowSquares(square) {
  let currRow = square.target.classList[2];
  currRow = "." + currRow;
  const retVal = document.querySelectorAll(currRow);
  return retVal;
}

//function to return particular column squares
function getColSquares(square) {
  let currCol = square.target.classList[3];
  currCol = "." + currCol;
  const retVal = document.querySelectorAll(currCol);
  return retVal;
}


/****************************
 * EVENT LISTENER FUNCTIONS *
****************************/

// Now add some functions to handle clicking one particular square
// and clicking one particular palette color. You can leave them
// empty at first, though a console.log just to know they're being
// run as event listeners (after the next step is set up) isn't a
// bad idea for testing purposes.

//handle Single Click Events
function handleClickEvent(square) {
  // console.log("Canvas Clicked Upon");
  if(rowTrigger)
    handleRowTrigger(square);
  else if(columnTrigger)
    handleColTrigger(square);
  else {
    square.target.classList.replace(square.target.classList[1], currBrush.classList[1]);
  }
  mousePressed = false;
}

//handle Brush Colour Change Events
function handleBrushColor(color) {
  // console.log("Color Change Requested")
  currBrush.classList.replace(currBrush.classList[1], color.target.classList[1]);
}

function handleDragEvent(square) {
  if(mousePressed) {
    square.target.classList.replace(square.target.classList[1], currBrush.classList[1]);
  }
}

function handleClearCanvas(rubber) {
  for(const square of squares) {
    square.classList.replace(square.classList[1], "color-5");
  }
}

function handleRowTrigger(square) {
  const rowSquares = getRowSquares(square);
  for(const tempSquare of rowSquares) {
    tempSquare.classList.replace(tempSquare.classList[1], currBrush.classList[1]);
  }
}

function handleColTrigger(square) {
  const colSquares = getColSquares(square);
  for(const tempSquare of colSquares) {
    tempSquare.classList.replace(tempSquare.classList[1], currBrush.classList[1]);
  }
}

function triggerRowButton(rowButton) {
  rowTrigger = !rowTrigger;
  columnTrigger = false;
  console.log("Row Status " + rowTrigger + " Column Status " + columnTrigger);
}

function triggerColButton(colButton) {
  columnTrigger = !columnTrigger;
  rowTrigger = false;
  console.log("Row Status " + rowTrigger + " Column Status " + columnTrigger);
}


/**************************
 * WIRING IT ALL TOGETHER *
**************************/

// Now: wiring up our event listeners to our html node elements.
// You'll need to add the appropriate event listener for each
// square and for each palette color from the functions you
// wrote above.

for(const square of squares)
  square.addEventListener("click", handleClickEvent);

for(const square of squares)
  square.addEventListener("mouseenter", handleDragEvent);

for(const color of palleteColors)
  color.addEventListener("click", handleBrushColor);

rubber.addEventListener("click", handleClearCanvas);

rowButton.addEventListener("click", triggerRowButton);

colButton.addEventListener("click", triggerColButton);

document.body.addEventListener("mousedown", () => {
  mousePressed = true;
})

document.body.addEventListener("mouseup", () => {
  mousePressed = false;
})