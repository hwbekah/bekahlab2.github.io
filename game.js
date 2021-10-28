function Bear() {
  this.dBear = 100;
  this.htmlElement = document.getElementById("bear");
  this.id = this.htmlElement.id;
  this.x = this.htmlElement.offsetLeft;
  this.y = this.htmlElement.offsetTop;

  this.move = function (xDir, yDir) {
    this.fitBounds(); // this keeps the bear within the board
    this.x += this.dBear * xDir;
    this.y += this.dBear * yDir;
    this.display();
  };

  this.display = function () {
    this.htmlElement.style.left = this.x + "px";
    this.htmlElement.style.top = this.y + "px";
    this.htmlElement.style.display = "block";
  };

  // fit the bear to the board limits
  this.fitBounds = function () {
    let parent = this.htmlElement.parentElement;
    let iw = this.htmlElement.offsetWidth;
    let ih = this.htmlElement.offsetHeight;
    let l = parent.offsetLeft;
    let t = parent.offsetTop;
    let w = parent.offsetWidth;
    let h = parent.offsetHeight;
    if (this.x < 0) this.x = 0;
    if (this.x > w - iw) this.x = w - iw;
    if (this.y < 0) this.y = 0;
    if (this.y > h - ih) this.y = h - ih;
  };

  // speed of bear
  this.setSpeed = function (speed) {
    this.dBear = speed;
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
    bear.move(1, 0);
  } // right key
  if (e.keyCode == KEYLEFT) {
    bear.move(-1, 0);
  } // left key
  if (e.keyCode == KEYUP) {
    bear.move(0, -1);
  } // up key
  if (e.keyCode == KEYDOWN) {
    bear.move(0, 1);
  } // down key
}

function start() {
  // create bear
  bear = new Bear();

  // add event listener to the kepress event
  document.addEventListener("keydown", moveBear, false);

  bear.setSpeed(document.getElementById("dBear").value);

  // create new array for bees
  bees = new Array();

  // create bees
  makeBees();

  // get bees to move continuously
  updateBees();

  // take start time
  lastStingTime = new Date();
}

class Bee {
  constructor(beeNumber) {
    // the HTML element corresponding to the img of the bee
    this.htmlElement = createBeeImg(beeNumber);

    this.id = this.htmlElement.id; // HTML id
    this.x = this.htmlElement.offsetLeft; // left position x
    this.y = this.htmlElement.offsetTop; // top position y

    this.move = function (dx, dy) {
      // move the bees by dx, dy
      this.x += dx;
      this.y += dy;
      this.display();
    };

    this.display = function () {
      // adjust positon of bee and display it
      this.fitBounds(); // adjust to bounds
      this.htmlElement.style.left = this.x + "px";
      this.htmlElement.style.top = this.y + "px";
      this.htmlElement.style.display = "block";
    };

    this.fitBounds = function () {
      // check and make sure the bees stay in the board space
      let parent = this.htmlElement.parentElement;
      let iw = this.htmlElement.offsetWidth;
      let ih = this.htmlElement.offsetHeight;
      let l = parent.offsetLeft;
      let t = parent.offsetTop;
      let w = parent.offsetWidth;
      let h = parent.offsetHeight;
      if (this.x < 0) this.x = 0;
      if (this.x > w - iw) this.x = w - iw;
      if (this.y < 0) this.y = 0;
      if (this.y > h - ih) this.y = h - ih;
    };
  }
}

function createBeeImg(wNum) {
  // get dimension and position of the board div
  let boardDiv = document.getElementById("board");
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
  let x = getRandomInt(boardDivW);
  let y = getRandomInt(boardDivH);
  img.style.left = boardDivX + x + "px";
  img.style.top = y + "px";

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
    bees.push(bee); // add the bee object to the bees array
    i++;
  }
}

function getRandomInt(max) {
  // generates and returns a random integer between 0 and max
  const rand_i = Math.floor(Math.random() * max);
  return rand_i;
}

function moveBees() {
  // get speed input field value
  let speed = document.getElementById("speedBees").value;

  // move each bee to a random location
  for (let i = 0; i < bees.length; i++) {
    let dx = getRandomInt(2 * speed) - speed;
    let dy = getRandomInt(2 * speed) - speed;
    bees[i].move(dx, dy);
    isHit(bees[i], bear);
  }
}

function updateBees() {
  // update loop for game
  // move bees continously
  moveBees();
  // use a fixed update period
  let period = parseInt(document.getElementById("periodTimer").value); // modify this to control refresh period
  // update the timer for the next move
  if (hits.innerHTML < 1000) {
    updateTimer = setTimeout("updateBees()", period);
  } else {
    clearTimeout(updateTimer);
    window.alert("Game over!");
  }
}

function isHit(defender, offender) {
  if (overlap(defender, offender)) {
    //check if the two image overlap
    let score = hits.innerHTML;
    score = Number(score) + 1; //increment the score
    hits.innerHTML = score; //display the new score

    // calculate longest duration
    let newStingTime = new Date();
    let thisDuration = newStingTime - lastStingTime;
    lastStingTime = newStingTime;
    let longestDuration = Number(duration.innerHTML);
    if (longestDuration === 0) {
      longestDuration = thisDuration;
    } else {
      if (longestDuration < thisDuration) longestDuration = thisDuration;
    }
    document.getElementById("duration").innerHTML = longestDuration;
  }
}

function overlap(element1, element2) {
  //consider the two rectangles wrapping the two elements
  //rectangle of the first element
  left1 = element1.htmlElement.offsetLeft;
  top1 = element1.htmlElement.offsetTop;
  right1 = element1.htmlElement.offsetLeft + element1.htmlElement.offsetWidth;
  bottom1 = element1.htmlElement.offsetTop + element1.htmlElement.offsetHeight;
  //rectangle of the second element
  left2 = element2.htmlElement.offsetLeft; //e2x
  top2 = element2.htmlElement.offsetTop; //e2y
  right2 = element2.htmlElement.offsetLeft + element2.htmlElement.offsetWidth;
  bottom2 = element2.htmlElement.offsetTop + element2.htmlElement.offsetHeight;
  //calculate the intersection of the two rectangles
  x_intersect = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2));
  y_intersect = Math.max(0, Math.min(bottom1, bottom2) - Math.max(top1, top2));
  intersectArea = x_intersect * y_intersect;
  //if intersection is nil no hit
  if (intersectArea == 0 || isNaN(intersectArea)) {
    return false;
  }
  return true;
}

function addBee() {
  newVal = parseInt(document.getElementById("nbBees").value) + 1;
  document.getElementById("nbBees").value = newVal;
  var newBee = new Bee(newVal);
  newBee.display();
  bees.push(newBee);
}
