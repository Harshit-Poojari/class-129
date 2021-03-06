song = "";
leftWrist_x = 0;
rightWrist_x = 0;
leftWrist_y = 0;
rightWrist_y = 0;
scoreLeftwrist = 0;

function preload() {
   song = loadSound('music.mp3');
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modalLoaded);
    poseNet.on('pose',gotResults);
}

function modalLoaded(){
  console.log("Posenet is Loaded");
}

function draw() {
    image(video,0,0,600,500);
    fill('#e31010');
    stroke('#e31010');
    if (scoreLeftwrist>0.2) {
    circle(leftWrist_x,leftWrist_y,20);
    inNumber = Number(leftWrist_y);
    remove_decimal = floor(inNumber);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "volume ="+volume;
    song.setVolume(volume);
    }
}

function play_song() {
  song.play();
  song.setVolume(0.5);
  song.rate(1);
}

function gotResults(results) {
  if (results.length>0) {
    console.log(results);
    scoreLeftwrist = results[0].pose.keypoints[9].score;
    console.log("scoreLeftwrist"+scoreLeftwrist);
    leftWrist_x = results[0].pose.leftWrist.x;
    console.log("leftWrist x position is:"+leftWrist_x);
    rightWrist_x = results[0].pose.rightWrist.x;
    console.log("rightWrist x position is:"+rightWrist_x);

    leftWrist_y = results[0].pose.leftWrist.y;
    console.log("leftWrist y position is:"+leftWrist_y);
    rightWrist_y = results[0].pose.rightWrist.y;
    console.log("rightWrist y position is:"+rightWrist_y);
  }
}