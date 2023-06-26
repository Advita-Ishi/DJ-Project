music1= " ";
music2= " ";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;

function preload() {
    music1= loadSound("music.mp3");
    music2 = loadSound("music2.mp3")
}

function setup() {
    canvas= createCanvas(400, 400);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 400, 400);
    
    play_music1 = music1.isPlaying();
    play_music2 = music2.isPlaying();

    fill('#FF0000');
    stroke('#FF0000');

    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        music2.stop()
    }

    if(play_music1 = false) {
        music1.isPlaying();
        document.getElementById('songName').innerHTML = "Song Name = " + music1
    }
}

function modelLoaded() {
    console.log('Model is initialised');
}

function gotPoses (results) {
if(results.length > 0) {
    console.log(results);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + " " + "leftWristY = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + " " + "rightWristY = " + rightWristY);

    scoreLeftWrist = results[0].pose.keypoints[9].score;
}
}