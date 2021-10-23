function Bear() {
  this.dBear = 100;
  this.htmlElement = document.getElementById("bear");
  this.id = this.htmlElement.id;
  this.x = this.htmlElement.offsetLeft;
  this.y = this.htmlElement.offsetTop;
  
  this.move = function(xDir, yDir) {
    this.fitBounds(); // this keeps the bear within the board
    this.x += this.dBear * xDir;
    this.y += this.dBear * yDir;
    this.display();
  };
  
  this.display = function() {
    this.htmlElement.style.left = this.x + "px";
    this.htmlElement.style.top = this.y + "px";
    this.htmlElement.style.display = "block";
  };
  
  // fit the bear to the board limits
  this.fitBounds = function() {
    let parent = this.htmlElement.parentElement;
    let iw = this.htmlElement.offsetWidth;
    let ih = this.htmlElement.offsetHeight;
    let l = parent.offsetLeft;
    let t = parent.offsetTop;
    let w = parent.offsetWidth;
    let h = parent.offsetHeight;
    if (this.x < 0) this.x = 0;
    if (this.x > w - iw) this.x = w - iw
    if (this.y < 0) this.y = 0;
    if (this.y > h-ih) this.y = h - ih;
  };

  // speed of bear
  this.setSpeed = function() {
    this.dBear = document.getElementById("dBear").value;
  };
}

// handle keyboard events to move the bear
function moveBear(e) {
  // codes of the four keys
  const KEYUP = 38;
  const KEYDOWN = 40;
  const KEYLEFT = 37;
  const KEYRIGHT = 39;

  if (e.keyCode == KEYRIGHT) { 
    bear.move(1, 0)
  } // right key
  if (e.keyCode == KEYLEFT) {
    bear.move(-1, 0)
  } // left key
  if (e.keyCode == KEYUP) {
    bear.move(0, -1)
  } // up key
  if (e.keyCode == KEYDOWN) {
    bear.move(0, 1)
  } // down key
}

function start() {
  // create bear
  bear = new Bear();
  
  // add event listener to the kepress event
  document.addEventListener("keydown", moveBear, false);

  // create new array for bees
  bees = new Array();

  // create bees
  makeBees();
}


class Bee {
  constructor(beeNumber) {
    // the HTML element corresponding to the img of the bee
    this.htmlElement = createBeeImg(beeNumber);

    this.id = this.htmlElement.id; // HTML id
    this.x = this.htmlElement.offsetLeft; // left position x
    this.y = this.htmlElement.offsetRight; // top position y

    this.move = function(dx, dy) {
      // move the bees by dx, dy
      this.x += dx;
      this.y = dy;
      this.display();
    };

    this.display = function() {
      // adjust positon of bee and display it
      this.fitBounds(); // adjust to bounds
      this.htmlElement.style.left = this.x + "px";
      this.htmlElement.style.top = this.y + "px";
      this.htmlElement.style.display = "block";
    }

    this.fitBounds = function() {
      // check and make sure the bees stay in the board space
      let parent = this.htmlElement.parentElement;
      let iw = this.htmlElement.offsetWidth;
      let ih = this.htmlElement.offsetHeight;
      let l = parent.offsetLeft;
      let t = parent.offsetTop;
      let w = parent.offsetWidth;
      let h = parent.offsetHeight;
      if (this.x < 0) 
        this.x = 0;
      if (this.x > w - iw)
        this.x = w - iw;
      if (this.y < 0)
        this.y = 0
      if (this.y > h - ih)
        this.y = h - ih
    };

  }
}

function createBeeImg(wNum) {
  // get dimension and position of the board div
  let boardDiv = document.gettElementById("board");
  let boardDivW = boardDiv.offsetWidth;
  let boardDivH = boardDiv.offsetHeight;
  let boardDivX = boardDiv.offsetLeft;
  let boardDivY = boardDiv.offsetTop;

  // create img element
  let img = document.createElement("img");
  img.setAttribute("src", "images/bee.gif");
  img.setAttribute("width", "100");
  img.setAttribute("alt", "A bee!");
  img.setAttribute("id", "bee" + wNum);
  img.setAttribute("class", "bee"); // set class of html tag img

  // add the img element to the dom as a child of the board div
  img.style.position = "absolute";
  boardDiv.appendChild(img);

  // set initial position
  let x = getRandonInt(boardDivW);
  let y = getRandomInt(boardDivH);
  img.style.left = (boardDivX + x) + "px";
  img.style.top = (y) + "px";

  // return the img object
  return img;
}

function makeBees() {
  // get number of bees specified by the user
  let nbBees = document.getElementById("nbBees").value;
  nbBees = Number(nbBees); // try converting the content of the input to a number
  if (isNaN(nbBees)) {
    window.alert("Invalid number of bees");
    return;
  } 

  // create bees
  let i = 1;
  while (i <= nbBees) {
    var num = i;
    var bee = new Bee(num); // create object and its img element
    bee.display();
    bee.push(bee); // add the bee object to the bees array
    i++;
  }

}
