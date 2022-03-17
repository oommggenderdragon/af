

var paddleNO2 =10,paddleNO1=10;
var paddle1X = 10,paddleNO1Height = 110;
var paddleNO2Y = 685,paddle2Height = 70;
var score1 = 0, score2 =0;
var paddle1Y;
var  playerscore =0;
var pcscore =0;

var ball = {
    x:350/2,
    y:480/2,
    r:20,
    dx:3,
    dy:3
}
var paddleNO2Y = 685,paddleNO2Height = 70;
rightWristY = 0;
rightWristX = 0;
scoreRightWrist = 0;

game_status = "";



 function preload() {
  ball_touch_paddel = loadSound("ball_touch_paddel.wav");
  missed = loadSound("missed.wav");
}

function setup(){
var canvas =  createCanvas(700,600);
canvas.parent('canvas');

video = createCapture(VIDEO);
video.size(700, 600);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {

    rightWristY = results[0].pose.rightWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
    scoreRightWrist =  results[0].pose.keypoints[10].score;
    console.log(scoreRightWrist);
  }
}

function startGame()
{
  game_status = "start";
  document.getElementById("status").innerHTML = "Game Is Loading";
}

function draw(){

  background(0); 
  image(video, 0, 0, 700, 600);

  fill("#000000");
  stroke("#000000");
  rect(680,0,20,700);

  fill("#000000");
  stroke("#000000");
  rect(0,0,20,700);

  if(scoreRightWrist > 0.2)
  {
    fill("#ff0d00");
    stroke("#ff0d00");
    circle(rightWristX, rightWristY, 30);
  }

  if(game_status == "start")
  {
    document.getElementById("status").innerHTML = "Game Is Loaded";
    
    paddleInCanvas();
        
    
    fill(250,0,0);
    stroke(0,0,250);
    strokeWeight(0.5);
    paddle1Y = rightWristY; 
    rect(paddle1X,paddle1Y,paddle1,paddle1Height,100);


    
    fill("#FFA500");
    stroke("#FFA500");
    var paddle2y =ball.y-paddle2Height/2;  
    rect(paddle2Y,paddle2y,paddleNO2,paddleNO2Height,100);
    
   


    }

  }
