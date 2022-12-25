var rode1=document.getElementById("rode1");
var rode2=document.getElementById("rode2");
var ball=document.getElementById("ball");
var movement=20;

const thisRode1="rode1";
const thisRode2="rode2";
const storeName="abc";
const storeScore=123;

let whichRode;
let moveX=2;
let moveY=2;
let ballMoving;
let border=12;
let score;
let highScore;
let gameStart=false;

localStorage.setItem(storeScore,"null");
localStorage.setItem(storeScore,"null");
(function(){
    highScore=localStorage.getItem(storeScore);
    whichRode=localStorage.getItem(storeName);
    if(whichRode==="null" || highScore==="null"){
        alert("Hello.. This is your first game");
        highScore=0;
        whichRode=thisRode1;
    }
    else{
        alert(whichRode + " has maximum score of " + highScore*100);
    }
    gameReset(whichRode);
})();




function gameReset(rodeName){

    rode1.style.left=((window.innerWidth-rode1.offsetWidth)/2)+"px";
    rode2.style.left=((window.innerWidth-rode2.offsetWidth)/2)+"px";
    ball.style.left=((window.innerWidth-ball.offsetWidth)/2)+"px";

    if(rodeName === thisRode1){
        ball.style.top=rode2.getBoundingClientRect().y-rode2.getBoundingClientRect().height+"px";
        moveY=-2;
    }

    else if(rodeName === thisRode2){
        ball.style.top=rode1.getBoundingClientRect().height+"px";
        moveY=2;       
    }

    score=0;
    gameStart=false;

}




document.addEventListener('keydown',function(event){

    if(event.keyCode==68 || event.keyCode==39){
        if(parseInt(rode1.style.left)<(window.innerWidth-rode1.offsetWidth-border)){
            rode1.style.left=parseInt(rode1.style.left)+movement+'px';
            rode2.style.left=rode1.style.left;
        };

    };

    if(event.keyCode==65 || event.keyCode==37){
        
        if(parseInt(rode1.style.left)>border){
            rode1.style.left=parseInt(rode1.style.left)-movement+'px';
            rode2.style.left=rode1.style.left;
        };

    };

    if(event.keyCode==13){
        
        if(!gameStart){
            gameStart=true;
            let ballRect = ball.getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY=ballRect.y;
            let ballDia=ballRect.width;

            let rode1Height=rode1.offsetHeight;
            let rode2Height=rode2.offsetHeight;
            let rode1Width=rode2.offsetWidth;
            let rode2Width=rode2.offsetWidth;

            ballMoving = setInterval(function(){
            
                let rode1X=rode1.getBoundingClientRect().x;
                let rode2X=rode2.getBoundingClientRect().x;

                let ballCentre=ballX+ballDia/2;

                ballX+=moveX;
                ballY+=moveY;

                ball.style.left=ballX+"px";
                ball.style.top=ballY+"px";

                if(((ballX+ballDia)>window.innerWidth) || (ballX<0)){
                    moveX=-moveX;
                }

                if(ballY<=rode1Height){
                    moveY=-moveY;
                    score++;

                    if((ballCentre<rode1X) || (ballCentre>(rode1X+rode1Width))){
                        dataStoring(score,thisRode2);
                    }
                }
                if((ballY+ballDia)>=(window.innerHeight-rode2Height)){
                    moveY=-moveY;
                    score++;

                    if((ballCentre<rode2X) || (ballCentre>(rode2X+rode2Width))){
                        dataStoring(score,thisRode1);
                    }
                }  
            }, 10);
        }
    }
});

function dataStoring(scoreObtained,winningBar){
    if(score>highScore){
        highScore=score;
        localStorage.setItem(storeName,winningBar);
        localStorage.setItem(storeScore,highScore);
    }
    clearInterval(ballMoving);
    gameReset(winningBar);

    alert(winningBar+" wins with score of "+(scoreObtained*100)+". Max Score is: "+(highScore*100));
}


// // grab a reference of our "canvas" using its id
// const canvas = document.getElementById('canvas');
// /* get a "context". Without "context", we can't draw on canvas */
// const ctx = canvas.getContext('2d');

// // some sounds
// const hitSound = new Audio('../sounds/hitSound.wav');
// const scoreSound = new Audio('../sounds/scoreSound.wav');
// const wallHitSound = new Audio('../sounds/wallHitSound.wav');

// /* some extra variables */
// const netWidth = 4;
// const netHeight = canvas.height;

// const paddleWidth = 10;
// const paddleHeight = 100;

// let upArrowPressed = false;
// let downArrowPressed = false;

// /* some extra variables ends */

// /* objects */
// // net
// const net = {
//   x: canvas.width / 2 - netWidth / 2,
//   y: 0,
//   width: netWidth,
//   height: netHeight,
//   color: "#FFF"
// };

// // user paddle
// const user = {
//   x: 10,
//   y: canvas.height / 2 - paddleHeight / 2,
//   width: paddleWidth,
//   height: paddleHeight,
//   color: '#FFF',
//   score: 0
// };

// const ai = {
//   x: canvas.width - (paddleWidth + 10),
//   y: canvas.height / 2 - paddleHeight / 2,
//   width: paddleWidth,
//   height: paddleHeight,
//   color: '#FFF',
//   score: 0
// };

// // ball
// const ball = {
//   x: canvas.width / 2,
//   y: canvas.height / 2,
//   radius: 7,
//   speed: 7,
//   velocityX: 5,
//   velocityY: 5,
//   color: '#05EDFF'
// };

// /* objects declaration ends */

// /* drawing functions */
// // function to draw net
// function drawNet() {
//   // set the color of net
//   ctx.fillStyle = net.color;

//   // syntax --> fillRect(x, y, width, height)
//   ctx.fillRect(net.x, net.y, net.width, net.height);
// }

// // function to draw score
// function drawScore(x, y, score) {
//   ctx.fillStyle = '#fff';
//   ctx.font = '35px sans-serif';

//   // syntax --> fillText(text, x, y)
//   ctx.fillText(score, x, y);
// }

// // function to draw paddle
// function drawPaddle(x, y, width, height, color) {
//   ctx.fillStyle = color;
//   ctx.fillRect(x, y, width, height);
// }

// // function to draw ball
// function drawBall(x, y, radius, color) {
//   ctx.fillStyle = color;
//   ctx.beginPath();
//   // syntax --> arc(x, y, radius, startAngle, endAngle, antiClockwise_or_not)
//   ctx.arc(x, y, radius, 0, Math.PI * 2, true); // π * 2 Radians = 360 degrees
//   ctx.closePath();
//   ctx.fill();
// }

// /* drawing functions end */

// /* moving Paddles */
// // add an eventListener to browser window
// window.addEventListener('keydown', keyDownHandler);
// window.addEventListener('keyup', keyUpHandler);

// // gets activated when we press down a key
// function keyDownHandler(event) {
//   // get the keyCode
//   switch (event.keyCode) {
//     // "up arrow" key
//     case 38:
//       // set upArrowPressed = true
//       upArrowPressed = true;
//       break;
//     // "down arrow" key
//     case 40:
//       downArrowPressed = true;
//       break;
//   }
// }

// // gets activated when we release the key
// function keyUpHandler(event) {
//   switch (event.keyCode) {
//     // "up arraow" key
//     case 38:
//       upArrowPressed = false;
//       break;
//     // "down arrow" key
//     case 40:
//       downArrowPressed = false;
//       break;
//   }
// }

// /* moving paddles section end */

// // reset the ball
// function reset() {
//   // reset ball's value to older values
//   ball.x = canvas.width / 2;
//   ball.y = canvas.height / 2;
//   ball.speed = 7;

//   // changes the direction of ball
//   ball.velocityX = -ball.velocityX;
//   ball.velocityY = -ball.velocityY;
// }

// // collision Detect function
// function collisionDetect(player, ball) {
//   // returns true or false
//   player.top = player.y;
//   player.right = player.x + player.width;
//   player.bottom = player.y + player.height;
//   player.left = player.x;

//   ball.top = ball.y - ball.radius;
//   ball.right = ball.x + ball.radius;
//   ball.bottom = ball.y + ball.radius;
//   ball.left = ball.x - ball.radius;

//   return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;
// }

// // update function, to update things position
// function update() {
//   // move the paddle
//   if (upArrowPressed && user.y > 0) {
//     user.y -= 8;
//   } else if (downArrowPressed && (user.y < canvas.height - user.height)) {
//     user.y += 8;
//   }

//   // check if ball hits top or bottom wall
//   if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
//     // play wallHitSound
//     wallHitSound.play();
//     ball.velocityY = -ball.velocityY;
//   }

//    // if ball hit on right wall
//    if (ball.x + ball.radius >= canvas.width) {
//     // play scoreSound
//     scoreSound.play();
//     // then user scored 1 point
//     user.score += 1;
//     reset();
//   }

//   // if ball hit on left wall
//   if (ball.x - ball.radius <= 0) {
//     // play scoreSound
//     scoreSound.play();
//     // then ai scored 1 point
//     ai.score += 1;
//     reset();
//   }

//   // move the ball
//   ball.x += ball.velocityX;
//   ball.y += ball.velocityY;

//   // ai paddle movement
//   ai.y += ((ball.y - (ai.y + ai.height / 2))) * 0.09;

//   // collision detection on paddles
//   let player = (ball.x < canvas.width / 2) ? user : ai;

//   if (collisionDetect(player, ball)) {
//     // play hitSound
//     hitSound.play();
//     // default angle is 0deg in Radian
//     let angle = 0;

//     // if ball hit the top of paddle
//     if (ball.y < (player.y + player.height / 2)) {
//       // then -1 * Math.PI / 4 = -45deg
//       angle = -1 * Math.PI / 4;
//     } else if (ball.y > (player.y + player.height / 2)) {
//       // if it hit the bottom of paddle
//       // then angle will be Math.PI / 4 = 45deg
//       angle = Math.PI / 4;
//     }

//     /* change velocity of ball according to on which paddle the ball hitted */
//     ball.velocityX = (player === user ? 1 : -1) * ball.speed * Math.cos(angle);
//     ball.velocityY = ball.speed * Math.sin(angle);

//     // increase ball speed
//     ball.speed += 0.2;
//   }
// }

// // render function draws everything on to canvas
// function render() {
//   // set a style
//   ctx.fillStyle = "#000"; /* whatever comes below this acquires black color (#000). */
//   // draws the black board
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   // draw net
//   drawNet();
//   // draw user score
//   drawScore(canvas.width / 4, canvas.height / 6, user.score);
//   // draw ai score
//   drawScore(3 * canvas.width / 4, canvas.height / 6, ai.score);
//   // draw user paddle
//   drawPaddle(user.x, user.y, user.width, user.height, user.color);
//   // draw ai paddle
//   drawPaddle(ai.x, ai.y, ai.width, ai.height, ai.color);
//   // draw ball
//   drawBall(ball.x, ball.y, ball.radius, ball.color);
// }

// // gameLoop
// function gameLoop() {
//   // update() function here
//   update();
//   // render() function here
//   render();
// }

// // calls gameLoop() function 60 times per second
// setInterval(gameLoop, 1000 / 60);