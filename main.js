noseX = 0;
noseY = 0;
L_WristX = 0;
R_WristX = 0;
difference = 0;

function setup()
{
    video = createCapture(VIDEO);
    video.size(400,400);

    canvas = createCanvas(400,400);
    canvas.position(560,180);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is successfully initialized!");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + "noseY = " + noseY);

        L_WristX = results[0].pose.leftWrist.x;
        R_WristX = results[0].pose.rightWrist.x;
        difference = L_WristX - R_WristX;
        console.log("Left wrist = " + L_WristX + "Right wrist = " + R_WristX + "Difference = " + difference);
    }
}

function draw()
{
    background('gray');
    textSize(difference);
    fill('#FFC300');
    text("Naina", noseX, noseY);
    document.getElementById("size_change").innerHTML = "The font size = " + difference;
}