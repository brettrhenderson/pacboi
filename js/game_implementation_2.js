// create canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 600;
canvas.style.margin = 25;
document.getElementById("maze").appendChild(canvas);
// initialize score
var SCORE = -1;
// Blinky collision variable
var g_collision = 0;
// initialize Inky's direction
var inky_direct = 3;
// Inky collision variable
var inky_collision = 0;
// initialize Pinky's direction
var pinky_direct = 2;
// Pinky collision variable
var pinky_collision = 0;
// initialize Winky's direction
var winky_direct = 4;
// Winky collision variable
var winky_collision = 0;
// initialize lives
var LIVES = 3;
// number of pellets to eat to win
var WIN = 307;
// variable for power mode after eating power pellets
var powertime = 0;
// variable for pacman animation
var frame = 100;
// variable for poop mode after eating 
var frame2 = 350;
// variable that determines whether poops has been eaten
var stink = 0;
// keep track of number of pellets
var pel_ctr = 0;
// keep track of pellets eaten
var pel_eat = 0;
// number of cycles
var cycles = 0;
//indicate whether the game has been won
var WIN = 0;

// sound library
    var chomp = new Audio("sounds/Chomping.wav");
    var dies = new Audio("sounds/dies.mp3");
    var start = new Audio("sounds/start.mp3");
    var eat = new Audio("sounds/eatghost.mp3");
    var poo = new Audio("sounds/stinky.mp3");

//background image
var bkready = false;
var bkImage = new Image();
bkImage.crossOrigin = ' ';
bkImage.onload = function() {
    bkready = true;
};
bkImage.src = "http://i.imgur.com/p0g1b2X.png";


// Blinky image
var bliready = false;
var bliImage = new Image();
bliImage.crossOrigin = ' ';
bliImage.onload = function() {
    bliready = true;
    };
bliImage.src = "http://i.imgur.com/z0jA334.png"

// Inky image
var inkyready = false;
var inkyImage = new Image();
inkyImage.crossOrigin = ' ';
inkyImage.onload = function() {
    inkyready = true;
    };
inkyImage.src = "http://i.imgur.com/1urZ0qm.png"

// Pinky image
var pinkyready = false;
var pinkyImage = new Image();
pinkyImage.crossOrigin = ' ';
pinkyImage.onload = function() {
    pinkyready = true;
    };
pinkyImage.src = "http://i.imgur.com/pvi455q.png"

// Winky image
var winkyready = false;
var winkyImage = new Image();
winkyImage.crossOrigin = ' ';
winkyImage.onload = function() {
    winkyready = true;
    };
winkyImage.src =  "http://i.imgur.com/VvpcOXf.png"

// Sick ghost image
var sickready = false;
var sickImage = new Image();
sickImage.crossOrigin = ' ';
sickImage.onload = function() {
    sickready = true;
    };
sickImage.src = "http://i.imgur.com/vHnXmRc.png"

// Stinky image
var stinkyready = false;
var stinkyImage = new Image();
stinkyImage.crossOrigin = ' ';
stinkyImage.onload = function() {
    stinkyready = true;
    };
stinky_x = 24;
stinky_y = 561;
stinkyImage.src = "http://i.imgur.com/eDKXotp.png"

// pacman facing right image
var pacready = false;
var pacImage = new Image();
pacImage.crossOrigin = ' ';
pacImage.onload = function() {
    pacready = true;
    };
pacImage.src = " http://i.imgur.com/7pRNY3S.png"

//pacman facing left image
var pacleftready = false;
var pacleftImage = new Image();
pacleftImage.crossOrigin = ' ';
pacleftImage.onload = function() {
    pacleftready = true;
    };
pacleftImage.src = "http://i.imgur.com/2uu8Nfb.png"

//pacman facing up image
var pacupready = false;
var pacupImage = new Image();
pacupImage.crossOrigin = ' ';
pacupImage.onload = function() {
    pacupready = true;
    };
pacupImage.src = "http://i.imgur.com/QAL3Pgw.png"

//pacman facing down image
var pacdownready = false;
var pacdownImage = new Image();
pacdownImage.crossOrigin = ' ';
pacdownImage.onload = function() {
    pacdownready = true;
    };
pacdownImage.src = "http://i.imgur.com/v2DLFf3.png"

// pacman closed mouth image
var paccloseready = false;
var paccloseImage = new Image();
paccloseImage.crossOrigin = ' ';
paccloseImage.onload = function() {
    paccloseready = true;
    };
paccloseImage.src = "http://i.imgur.com/QQFH5hH.png"

//pellet image
var pellready = false;
var pellImage = new Image();
pellImage.crossOrigin = ' ';
pellImage.onload = function() {
    pellready = true;
    };
pellImage.src = "http://i.imgur.com/9clnnbe.png";


//power pellet image
var powerready = false;
var powerImage = new Image();
powerImage.crossOrigin = ' ';
powerImage.onload = function() {
    powerready = true;
    };
powerImage.src = "http://i.imgur.com/jLB1oPd.png";

//game objects
var pacman = {};
pacman.dir = 0;
pacman.noise = 0;
var blinky = {};
var inky = {};
var pinky = {};
var winky = {};

// define a 2d array to keep track of pellets (http://www.webmasterworld.com/javascript/4249758.htm)
var pellet_grid = [];
for (var i = 0; i < 600; i++)
{
  pellet_grid[i] = [];
  for (var j = 0; j < 400; j++)
  {
    pellet_grid [i][j] = 1;
  }
}

// keep track of powerpellets
for (var i = 9; i < 600; i+=100)
{
    for (var j = 9; j < 400; j+=100)
    {
        pellet_grid[i][j] = 2;
    }
}

//keyboard control
var keyPress = {};

addEventListener("keydown", function (event) {
        keyPress[event.keyCode] = true;
}, false);

addEventListener("keyup", function (event) {
        delete keyPress[event.keyCode];
}, false);

// clear the entire canvas and redraw the background
function clear() {
ctx.clearRect(pacman.x, pacman.y, pacman.x+16, pacman.y+16);
ctx.clearRect(blinky.x, blinky.y, blinky.x+16, blinky.y+16);
ctx.clearRect(inky.x, inky.y, inky.x+16, inky.y+16);
ctx.clearRect(pinky.x, pinky.y, pinky.x+16, pinky.y+16);
ctx.clearRect(winky.x, winky.y, winky.x+16, winky.y+16);
ctx.drawImage(bkImage, 0, 0);
}
// generate a random integer between min and max (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FMath%2Frandom)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//reset pacman and ghosts
var reset = function () {
        pacman.x =  4 * canvas.width / 5;
        pacman.y = canvas.height / 2 + 1;
        pinky.x = canvas.width / 2 - 10;
        pinky.y = canvas.height / 2 - 5;
        pinky_direct = 2;
        winky.x = canvas.width / 2 - 15;
        winky.y = canvas.height / 2 - 5;
        winky_direct = 4;
        blinky.x = canvas.width / 2 - 5;
        blinky.y = canvas.height / 2;
        g_direct = 1;
        inky.x = canvas.width / 2 - 5;
        inky.y = canvas.height / 2;
        inky_direct = 3;
};


// change pacman's position with arrow keys
var move = function () {
        // move up
        if (38 in keyPress && collide(1,5) == 0)
        {
            pacman.dir = 1;
            pacman.noise = 1;
        }
        // move down
        if (40 in keyPress && collide(3, 5) == 0)
        {
            pacman.dir = 2;
            pacman.noise = 1;
        }
        // move left
        if (37 in keyPress && collide(4, 5) == 0)
        {
            pacman.dir = 3;
            pacman.noise = 1;
        }
        // move right
        if (39 in keyPress && collide(2, 5) == 0)
        {
            pacman.dir = 4;
            pacman.noise = 1;
        }
        // move up, check collision
        if (pacman.dir == 1)
        {
            pacman.y -= 2;
            clear();
            if (collide(1, 1) == 1)
            {
                pacman.y+=2;
                pacman.noise = 0;
            }
        }
        // move down, check collision
        if (pacman.dir == 2)
        {
            pacman.y += 2;
            clear();
            if (collide(3, 1) == 1)
            {
                pacman.y-=2;
                pacman.noise = 0;
            }
        }
        // move left, check collision
        if (pacman.dir == 3)
        {
            pacman.x -= 2;
            clear();
            if (collide(4, 1) == 1)
            {
                pacman.x +=2;
                pacman.noise = 0;
            }
        }
        // move right, check collision
        if (pacman.dir == 4)
        {
            pacman.x += 2;
            clear();
            if (collide(2, 1) == 1)
            {
                pacman.x -=2;
                pacman.noise = 0;
            }
        }
};
// Pinky's collision function
function pinkycollision(dir){
    // check up
    if (dir == 1)
    {
        var imgd = ctx.getImageData(pinky.x, pinky.y - 1, 16, 1);
    }
    // check right
    else if (dir == 2)
    {
        var imgd = ctx.getImageData(pinky.x + 16, pinky.y, 1, 16);
    }
    // check down
    else if (dir == 3)
    {
        var imgd = ctx.getImageData(pinky.x, pinky.y + 16, 16, 1);
    }
    // check left
    else if (dir == 4)
    {
        var imgd = ctx.getImageData(pinky.x - 1, pinky.y, 1, 16);
    }
    var pix = imgd.data;

    // if pixel is blue, detect collision
    for (var i = 2, n = pix.length; i < n; i += 4)
    {
        if (pix[i] == 255)
        {
            pinky_collision = 1;
        }
    }
}
// Pinky's move function
var pinky_move = function () {
    // Pinky moves down if already moving up or pacman is below it
    if (pinky_direct == 3 || (pinky.x == pacman.x && pacman.y > pinky.y))
    {
        pinky.y += 1;
        clear();
        // check for collision 
        pinkycollision(3);
        if (pinky_collision == 1)
        {
            pinky_direct = getRandomInt(1,4);
            pinky.y -= 1;
            pinky_collision = 0;
        }
    }
    // Pinky moves right if already moving right or pacman is to the right
    else if (pinky_direct == 4 || (pinky.y == pacman.y && pacman.x < pinky.x))
    {
        pinky.x -= 1;
        clear();
        // check for collision
        pinkycollision(4);
        if (pinky_collision == 1)
        {
            pinky_direct = getRandomInt(1,4);
            pinky.x += 1;
            pinky_collision = 0;
        }
    }
    // Pinky moves up if already moving down or pacman is above it
    else if (pinky_direct == 1 || (pinky.x == pacman.x && pacman.y < pinky.y))
    {
        pinky.y -= 1;
        clear();
        // check for collision
        pinkycollision(1);
        if (pinky_collision == 1)
        {
            pinky_direct = getRandomInt(1,4);
            pinky.y += 1;
            pinky_collision = 0;
        }
    }
    // Pinky moves right if already moving right or pacman is to the right
    else if (pinky_direct == 2 || (pinky.y == pacman.y && pacman.x > pinky.x))
    {
        pinky.x += 1;
        clear();
        // check for collision
        pinkycollision(2);
        if (pinky_collision == 1)
        {
            pinky_direct = getRandomInt(1,4);
            pinky.x -= 1;
            pinky_collision = 0;
        }
    }
};


// Winky's collision function
function winkycollision(dir){
    // check up
    if (dir == 1)
    {
        var imgd = ctx.getImageData(winky.x, winky.y - 1, 16, 1);
    }
    // check right
    else if (dir == 2)
    {
        var imgd = ctx.getImageData(winky.x + 16, winky.y, 1, 16);
    }
    // check down
    else if (dir == 3)
    {
        var imgd = ctx.getImageData(winky.x, winky.y + 16, 16, 1);
    }
    // check left
    else if (dir == 4)
    {
        var imgd = ctx.getImageData(winky.x - 1, winky.y, 1, 16);
    }
    var pix = imgd.data;

    // if pixel is blue, detect collision
    for (var i = 2, n = pix.length; i < n; i += 4)
    {
        if (pix[i] == 255)
        {
            winky_collision = 1;
        }
    }
}
// Winky's move function
var winky_move = function () {
    // move down if already moving up or if pacman is below
    if (winky_direct == 3 || (winky.x == pacman.x && pacman.y > winky.y))
    {
        winky.y += 1;
        clear();
        // check for collision
        winkycollision(3);
        if (winky_collision == 1)
        {
            winky_direct = getRandomInt(1,4);
            winky.y -= 1;
            winky_collision = 0;
        }
    }
     // move left if already moving left or if pacman is to the left
     else if (winky_direct == 4 || (winky.y == pacman.y && pacman.x < winky.x))
    {
        winky.x -= 1;
        clear();
        // check for collision
        winkycollision(4);
        if (winky_collision == 1)
        {
            winky_direct = getRandomInt(1,4);
            winky.x += 1;
            winky_collision = 0;
        }
    }
    // move up if already moving up or if pacman is above
    else if (winky_direct == 1 || (winky.x == pacman.x && pacman.y < winky.y))
    {
        winky.y -= 1;
        clear();
        // check for collision
        winkycollision(1);
        if (winky_collision == 1)
        {
            winky_direct = getRandomInt(1,4);
            winky.y += 1;
            winky_collision = 0;
        }
    }
    // move right if already moving right or if pacman is to the right
    else if (winky_direct == 2 || (winky.y == pacman.y && pacman.x > winky.x))
    {
        winky.x += 1;
        clear();
        winkycollision(2);
        if (winky_collision == 1)
        {
            winky_direct = getRandomInt(1,4);
            winky.x -= 1;
            winky_collision = 0;
        }
    }
};

// Inky's collision function
function inkycollision(dir){
    // check up 
    if (dir == 1)
    {
        var imgd = ctx.getImageData(inky.x, inky.y - 1, 16, 1);
    }
    // check right 
    else if (dir == 2)
    {
        var imgd = ctx.getImageData(inky.x + 16, inky.y, 1, 16);
    }
    // check down
    else if (dir == 3)
    {
        var imgd = ctx.getImageData(inky.x, inky.y + 16, 16, 1);
    }
    // check left
    else if (dir == 4)
    {
        var imgd = ctx.getImageData(inky.x - 1, inky.y, 1, 16);
    }
    var pix = imgd.data;

    // if pixel is blue, detect collision
    for (var i = 2, n = pix.length; i < n; i += 4)
    {
        if (pix[i] == 255)
        {
            inky_collision = 1;
        }
    }
}
// Inky's move function
var inky_move = function () {
    // move down if already moving down or if pacman is below
    if (inky_direct == 3 || (inky.x == pacman.x && pacman.y > inky.y))
    {
        inky.y += 1;
        clear();
        // check for collision
        inkycollision(3);
        if (inky_collision == 1)
        {
            inky_direct = 4;
            inky.y -= 1;
            inky_collision = 0;
        }
    }
    // move left if already moving left or if pacman is to the left
    else if (inky_direct == 4 || (inky.y == pacman.y && pacman.x < inky.x))
    {
        inky.x -= 1;
        clear();
        // check collision
        inkycollision(4);
        if (inky_collision == 1)
        {
            inky_direct = 1;
            inky.x += 1;
            inky_collision = 0;
        }
    }
    // move up if already moving up or if pacman is above
    else if (inky_direct == 1 || (inky.x == pacman.x && pacman.y < inky.y))
    {
        inky.y -= 1;
        clear();
        // check collision
        inkycollision(1);
        if (inky_collision == 1)
        {
            inky_direct = 2;
            inky.y += 1;
            inky_collision = 0;
        }
    }
    // move right if already moving right or if pacman is to the right
    else if (inky_direct == 2 || (inky.y == pacman.y && pacman.x > inky.x))
    {
        inky.x += 1;
        clear();
        // check collision
        inkycollision(2);
        if (inky_collision == 1)
        {
            inky_direct = 3;
            inky.x -= 1;
            inky_collision = 0;
        }
    }
};
// Blinky's collision function
function ghostcollision(dir){
    // check up
    if (dir == 1)
    {
        var imgd = ctx.getImageData(blinky.x, blinky.y - 1, 16, 1);
    }
   // check right 
    else if (dir == 2)
    {
        var imgd = ctx.getImageData(blinky.x + 16, blinky.y, 1, 16);
    }
    // check down
    else if (dir == 3)
    {
        var imgd = ctx.getImageData(blinky.x, blinky.y + 16, 16, 1);
    }
    // check left
    else if (dir == 4)
    {
        var imgd = ctx.getImageData(blinky.x - 1, blinky.y, 1, 16);
    }
    var pix = imgd.data;

    // if pixel is blue, detect collision
    for (var i = 2, n = pix.length; i < n; i += 4)
    {
        if (pix[i] == 255)
        {
            g_collision = 1;
        }
    }
}
// Blinky's move function
function ghost_move() {
   if (blinky.y == pacman.y)
   {
       clear();
   }
   if (blinky.x == pacman.x)
   {
       clear();
   }
   // move up if pacman is above
   if (blinky.y - pacman.y > 0)
   {
      blinky.y -= 1;
      clear();
      ghostcollision(1);
      if (g_collision == 1)
      {
          blinky.y += 1;
          g_collision = 0;
      }
  }
  // move down if pacman is below
  if (blinky.y - pacman.y < 0)
  {
      blinky.y += 1;
      clear();
      ghostcollision(3);
      if (g_collision == 1)
      {
          blinky.y -= 1;
          g_collision = 0;
      }
  }
  // move left if pacman is to the left
  if (blinky.x - pacman.x > 0)
  {
      blinky.x -= 1;
      clear();
      ghostcollision(4);
      if (g_collision == 1)
      {
          blinky.x += 1;
          g_collision = 0;
      }
  }
  // move right if pacman is to the right
  if (blinky.x - pacman.x < 0)
  {
      blinky.x += 1;
      clear();
      ghostcollision(2);
      if (g_collision == 1)
      {
          blinky.x -=1;
          g_collision = 0;
      }
  }
};
// Blinky's move function if you eat poop
function mega_blinky() {
   if (blinky.y == pacman.y)
   {
       clear();
   }
   if (blinky.x == pacman.x)
   {
       clear();
   }
   // move up if pacman is above and ignore walls
   if (blinky.y - pacman.y > 0)
   {
      blinky.y -= 1;
      clear();
      ghostcollision(1);
      if (g_collision == 1)
      {
          //blinky.y += 1;
          g_collision = 0;
      }
  }
  // move down if pacman is below and ignore walls
  if (blinky.y - pacman.y < 0)
  {
      blinky.y += 1;
      clear();
      ghostcollision(3);
      if (g_collision == 1)
      {
          //blinky.y -= 1;
          g_collision = 0;
      }
  }
  // move left if pacman is to the left and ignore walls
  if (blinky.x - pacman.x > 0)
  {
      blinky.x -= 1;
      clear();
      ghostcollision(4);
      if (g_collision == 1)
      {
         // blinky.x += 1;
          g_collision = 0;
      }
  }
  // move right if pacman is to the right and ignore walls
  if (blinky.x - pacman.x < 0)
  {
      blinky.x += 1;
      clear();
      ghostcollision(2);
      if (g_collision == 1)
      {
          //blinky.x -=1;
          g_collision = 0;
      }
  }
};


// move Blinky away from pacman with powerpellet
function scared_ghost_move () {
   // move down if pacman is above
   if (blinky.y - pacman.y > 0)
   {
      blinky.y += 1;
      clear();
      ghostcollision(3);
      if (g_collision == 1)
      {
          blinky.y -= 1;
          g_collision = 0;
      }
  }
  // move up if pacman is below
  if (blinky.y - pacman.y < 0)
  {
      blinky.y -= 1;
      clear();
      ghostcollision(1);
      if (g_collision == 1)
      {
          blinky.y += 1;
          g_collision = 0;
      }
  }
  // move right if pacman is left
  if (blinky.x - pacman.x > 0)
  {
      blinky.x += 1;
      clear();
      ghostcollision(2);
      if (g_collision == 1)
      {
          blinky.x -= 1;
          g_collision = 0;
      }
  }
  // move left if pacman is right
  if (blinky.x - pacman.x < 0)
  {
      blinky.x -= 1;
      clear();
      ghostcollision(4);
      if (g_collision == 1)
      {
          blinky.x +=1;
          g_collision = 0;
      }
  }
};

/**
 * detects collision between pacman and ghost; keeps track of lives and resets pacman
 * checks all sides
 */
var pac_ghost = function() {
    if (powertime == 0 && blinky.x >= (pacman.x - 16) && blinky.x <= (pacman.x + 15) && blinky.y <= (pacman.y + 15) && blinky.y >= (pacman.y - 16))
    {
        LIVES--;
        lives();
        dies.play();
        pacman.dir = 0;
        reset();
    }
    else if (powertime == 0 && inky.x >= (pacman.x - 16) && inky.x <= (pacman.x + 15) && inky.y <= (pacman.y + 15) && inky.y >= (pacman.y - 16))
    {
        LIVES--;
        lives();
        dies.play();
        pacman.dir = 0;
        reset();
    }
    else if (powertime == 0 && pinky.x >= (pacman.x - 16) && pinky.x <= (pacman.x + 15) && pinky.y <= (pacman.y + 15) && pinky.y >= (pacman.y - 16))
    {
        LIVES--;
        lives();
        dies.play();
        pacman.dir = 0;
        reset();
    }
    else if (powertime == 0 && winky.x >= (pacman.x - 16) && winky.x <= (pacman.x + 15) && winky.y <= (pacman.y + 15) && winky.y >= (pacman.y - 16))
    {
        LIVES--;
        lives();
        dies.play();
        pacman.dir = 0;
        reset();
    }
};

// continually redraw the game
var draw = function () {
        if (bkready)
        {
            ctx.drawImage(bkImage, 0, 0);
            if (LIVES == 0)
            {
                ctx.font="65px Arial";
                ctx.fillText("You Lose!",50,300);
                ctx.fillStyle = "white";
                clearInterval(myGame);
            }
            if (2 * pel_eat - 1 == pel_ctr)
            {
                ctx.fillStyle="white";
                ctx.font="65px Arial";
                ctx.fillText("You Win!",50,300);
                ctx.fillText("Score: " + SCORE, 50, 400);
            }
        }
        if (stinkyready)
        {
            ctx.drawImage(stinkyImage, stinky_x, stinky_y);
        }
        // draw pellets winthin walls of maze and only draw pellets that haven't been eaten
        if (pellready && powerready)
        {

            for (var i = 9; i < 600; i += 20)
                {
                for (var j = 9; j < 400; j += 20)
                {

                    var overlap = 0;
                    var imgd = ctx.getImageData(j, i, 2, 2)
                    var pix = imgd.data;
                    for (var k= 2; n = pix.length, k < n; k += 4)
                    {
                        if (pix[k] > 0)
                        {
                                overlap = 1;
                        }
                    }
                    if (overlap == 0 && pellet_grid[i][j] == 1)
                    {
                        ctx.drawImage(pellImage, j , i);
                        if (cycles == 0)
                        {    
                            pel_ctr ++;
                        }
                    }
                    else if (overlap == 0 && pellet_grid[i][j] == 2)
                    {
                        ctx.drawImage(powerImage, j, i);
                        if (cycles == 0)
                        {
                            pel_ctr++;
                        }
                    }
                }
            }
         }
     if (bliready)
     {
         ctx.drawImage(bliImage, blinky.x, blinky.y);
     }
     if (inkyready)
     {
         ctx.drawImage(inkyImage, inky.x, inky.y);
     }
     if (pinkyready)
     {
         ctx.drawImage(pinkyImage, pinky.x, pinky.y);
     }
     if (winkyready)
     {
         ctx.drawImage(winkyImage, winky.x, winky.y);
     }
     if (frame == 0)
     {
        frame = 100;
     }
     // animate pacman when moving up
     if (pacupready  && pacman.dir == 1)
     {
         if (frame >= 50)
         ctx.drawImage(pacupImage, pacman.x, pacman.y);
         else if (frame <= 50)
         ctx.drawImage(paccloseImage, pacman.x, pacman.y);

     }
     // animate pacman when moving down
     if (pacdownready && pacman.dir == 2)
     {
         if (frame >= 50)
         ctx.drawImage(pacdownImage, pacman.x, pacman.y);
         else if (frame <= 50)
         ctx.drawImage(paccloseImage, pacman.x, pacman.y);
     }
     // animate pacman when moving left
     if (pacleftready && pacman.dir == 3)
     {
         if (frame >= 50)
         ctx.drawImage(pacleftImage, pacman.x, pacman.y);
         else if (frame <= 50)
         ctx.drawImage(paccloseImage, pacman.x, pacman.y);
     }
     // animate pacman when moving right
     if (pacready && pacman.dir == 4)
     {
         if (frame >= 50)
         ctx.drawImage(pacImage, pacman.x, pacman.y);
         else if (frame <= 50)
         ctx.drawImage(paccloseImage, pacman.x, pacman.y);
     }
     // moves pacman even if no direction keys are pressed
     if (pacready && pacdownready && pacleftready && pacupready && !(38 in keyPress) && !(40 in keyPress) && !(37 in keyPress) && !(39 in keyPress))
     {
        // initialize direction
        if (pacman.dir == 0)
        {
             if (frame >= 50)
             ctx.drawImage(pacImage, pacman.x, pacman.y);
             else if (frame <= 50)
             ctx.drawImage(paccloseImage, pacman.x, pacman.y);
        }
        // pacman up
        if (pacman.dir == 1)
        {
             if (frame >= 50)
             ctx.drawImage(pacupImage, pacman.x, pacman.y);
             else if (frame <= 50)
             ctx.drawImage(paccloseImage, pacman.x, pacman.y);
        }
        // pacman down
        if (pacman.dir == 2)
        {
             if (frame >= 50)
             ctx.drawImage(pacdownImage, pacman.x, pacman.y);
             else if (frame <= 50)
             ctx.drawImage(paccloseImage, pacman.x, pacman.y);
        }
        // pacman left
        if (pacman.dir == 3)
        {
             if (frame >= 50)
             ctx.drawImage(pacleftImage, pacman.x, pacman.y);
             else if (frame <= 50)
             ctx.drawImage(paccloseImage, pacman.x, pacman.y);
        }
        // pacman right
        if (pacman.dir == 4)
        {
             if (frame >= 50)
             ctx.drawImage(pacImage, pacman.x, pacman.y);
             else if (frame <= 50)
             ctx.drawImage(paccloseImage, pacman.x, pacman.y);
        }
     }
};

/**
 * prevent pacman from walking through walls
 */
function collide(dir, range){
    var collision = 0;
    // check up
    if (dir == 1)
    {
        var imgd = ctx.getImageData(pacman.x, pacman.y - range, 16, range);
    }
    // check right 
    else if (dir == 2)
    {
        var imgd = ctx.getImageData(pacman.x + 16, pacman.y, range, 16);
    }
    // check down
    else if (dir == 3)
    {
        var imgd = ctx.getImageData(pacman.x, pacman.y + 16, 16, range);
    }
    // check left
    else if (dir == 4)
    {
        var imgd = ctx.getImageData(pacman.x - range, pacman.y, range, 16);
    }
    var pix = imgd.data;

    // if pixel is blue, detect collision
    for (var i = 2, n = pix.length; i < n; i += 4)
    {
        if (pix[i] > 0)
        {
            collision = 1;
            break;
        }
    }
    return collision;
}

/**
 * Erase pellets that pacman "eats"
 */
function eatpellet()
{
      // iterate through grid of existing pellets to see if pacman is touching any of them
      for (var i = 9; i < 600; i += 20)
      {
          for (var j = 9; j < 400; j += 20)
          {
              // keep track of regular pellets eaten and updates score
              if (pellet_grid[i][j] == 1 && pacman.x <= (j + 10) && j <= (pacman.x + 10) && pacman.y <= (i + 10 )&& i <= (pacman.y + 10))
              {
                  pellet_grid[i][j] = 0
                  pel_eat++;
                  SCORE++;
                  score();
                  chomp.play();
              }
              // keep track of powerpellets eaten and updates score and time in power mode
              if (pellet_grid[i][j] == 2 && pacman.x <= (j + 10) && j <= (pacman.x + 10) && pacman.y <= (i + 10 )&& i <= (pacman.y + 10))
              {

                  pellet_grid[i][j] = 0
                  pel_eat++;
                  SCORE += 5;
                  powertime = 250;
                  score();
                  chomp.play();
              }
         }
      }
      // update score if pacman touches poop
      if (stinkyready && pacman.x <= (stinky_x + 10) && stinky_x <= (pacman.x + 10) && pacman.y <= (stinky_y + 10 )&& stinky_y <= (pacman.y + 10))
      {
          stinkyready = false;
          SCORE -= 21;
          score();
          poo.play();
          stink = 1;
          pel_eat -= 1;
      }
}
// pacman interacts with sick ghosts after eating power pellet
function eatghost()
{
    // replace regular ghosts with sick ones in power mode
    if (sickready && powertime > 0)
    {
        ctx.drawImage(sickImage, winky.x, winky.y);
        ctx.drawImage(sickImage, blinky.x, blinky.y);
        ctx.drawImage(sickImage, inky.x, inky.y);
        ctx.drawImage(sickImage, pinky.x, pinky.y);
    }
    // reset Blinky and update score if it's eaten
    if (powertime > 0 && blinky.x >= (pacman.x - 16) && blinky.x <= (pacman.x + 15) && blinky.y <= (pacman.y + 15) && blinky.y >= (pacman.y - 16))
    {
        blinky.x = canvas.width / 2 - 5;
        blinky.y = canvas.height / 2;
        SCORE += 10;
        score();
        eat.play();
    }
    // reset Inky and update score if it's eaten
    else if (powertime > 0 && inky.x >= (pacman.x - 16) && inky.x <= (pacman.x + 15) && inky.y <= (pacman.y + 15) && inky.y >= (pacman.y - 16))
    {
        inky.x = canvas.width / 2 - 20;
        inky.y = canvas.height / 2;
        SCORE += 10;
        score();
        eat.play();
    }
    // reset Pinky and update score if it's eaten
    else if (powertime > 0 && pinky.x >= (pacman.x - 16) && pinky.x <= (pacman.x + 15) && pinky.y <= (pacman.y + 15) && pinky.y >= (pacman.y - 16))
    {
        pinky.x = canvas.width / 2 - 10;
        pinky.y = canvas.height / 2;
        SCORE += 10;
        score();
        eat.play();
    }
    // reset Winky and update score if it's eaten
    else if (powertime > 0 && winky.x >= (pacman.x - 16) && winky.x <= (pacman.x + 15) && winky.y <= (pacman.y + 15) && winky.y >= (pacman.y - 16))
    {
        winky.x = canvas.width / 2 - 15;
        winky.y = canvas.height / 2;
        SCORE += 10;
        score();
        eat.play();
    }
}
// scoreboard
function score()
{
    $("#score").html("Score: " + SCORE);
    // indicate when all pellets are eaten
    if (2 * pel_eat - 1 == pel_ctr)
    {
        WIN = 1;
        $("#score").html("Winner!");
    }
}
// lives
function lives()
{
    $("#lives").html("Lives: " + LIVES);
    // indicate when all lives are gone
    if (LIVES == 0)
    {
        $("#lives").html("Loser!");
    }
}

count_x = 45;
var Time = 5
function countdown() {
    ctx.fillStyle="white";
    ctx.font="65px Arial";
    ctx.fillText(Time, count_x, 400);
    Time--;
    count_x += 75;
}

// start board
var setup = function () {
    start.play();
    var count = setInterval(countdown, 1000);
    if (Time == 0)
    {
        clearInterval(count);
    }
    ctx.fillStyle="white";
    ctx.font="65px Arial";
    ctx.fillText("Get Ready!",50,300);
}
// main game loop
var game = function () {
    draw();
    if (LIVES > 0 && 2 * pel_eat - 1 != pel_ctr) 
    {
        move();
        // regular Blinky moving
        if (powertime == 0 && stink == 0)
        {
            ghost_move();
        }
        // scared Blinky moving
        else if (powertime > 0 && stink == 0)
        {
            scared_ghost_move();
        }
        // poop Blinky moving
        else if (stink == 1 && powertime == 0)
        {
            mega_blinky();
        }
        inky_move();
        pinky_move();
        winky_move();
        pac_ghost();
        eatpellet();
        draw();
        cycles = 1;
        // decrease power mode time
        if (powertime > 0)
        {
            powertime--;
        }
        // move pacman animation forward
        if (frame > 0)
        {
            frame-=5;
        }
        eatghost();
        // when poop is eaten
        if (stink == 1)
        {
           frame2--;
           // reset Blinky back when poop mode is over
           if (frame2 == 0)
           {
               var imgd = ctx.getImageData(blinky.x, blinky.y, 16, 16);
               var pix = imgd.data;

               // if pixel is blue, detect collision
               for (var i = 2, n = pix.length; i < n; i += 4)
               {
                   if (pix[i] == 255)
                   {
                       blinky.x = canvas.width / 2 - 5;
                       blinky.y = canvas.height / 2;
                   }
               }
               // remove poop mode
               stink = 0;
           }
        }  
    }  
};

// run the game!
var myGame = 0;
myGame = function() {
    var play = setInterval(game, 20);
}

reset();
setup();
var pause = setTimeout(myGame, 5000);

