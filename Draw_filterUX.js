let Mouseears;
let catright;
let catleft;
let whiskers;

let iscat = true;

function preload() {
  Mouseears = loadImage('Mouse ears.png');
  catright = loadImage('CatearRight.png');
  catleft = loadImage('CatearLeft.png');
}

function drawInteraction(faces, hands) {
  // hands part
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    if (showKeypoints) {
      drawPoints(hand)
      drawConnections(hand)
    }

    let whatGesture = detectHandGesture(hand);
    if (whatGesture) {
      if (whatGesture == "Thumbs Up") iscat = true;
      else if (whatGesture == "Open Palm") iscat = false;
    }
  }

  //------------------------------------------------------------
  // face part
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    if (showKeypoints) drawPoints(face);

    let faceWidth = face.faceOval.width;
    let faceHeight = face.faceOval.height;
    let faceCenterX = face.faceOval.centerX;
    let faceCenterY = face.faceOval.centerY;

    let earWidth = faceWidth / 1.5;
    let earHeight = faceHeight;
    let earXOffset = faceWidth * 0.6;
    let earYOffset = faceHeight;

    // Debug ellipse to check positions
    fill(255, 0, 0);
    ellipse(faceCenterX, faceCenterY - earYOffset, 50, 50);

    if (iscat) {
      // Cat ears
      image(catright, faceCenterX - earXOffset, faceCenterY - earYOffset, earWidth, earHeight);
      image(catleft, faceCenterX + earXOffset, faceCenterY - earYOffset, earWidth, earHeight);
    } else {
      // Mouse ears
      image(Mouseears, faceCenterX - earWidth / 2, faceCenterY - earYOffset, earWidth, earHeight);
    }
  }
}

// ----- helper functions -----
function drawConnections(hand) {
  push();
  for (let j = 0; j < connections.length; j++) {
    let pointAIndex = connections[j][0];
    let pointBIndex = connections[j][1];
    let pointA = hand.keypoints[pointAIndex];
    let pointB = hand.keypoints[pointBIndex];
    stroke(255, 0, 0);
    strokeWeight(2);
    line(pointA.x, pointA.y, pointB.x, pointB.y);
  }
  pop();
}

function drawPoints(feature) {
  push();
  for (let i = 0; i < feature.keypoints.length; i++) {
    let element = feature.keypoints[i];
    noStroke();
    fill(0, 255, 0);
    circle(element.x, element.y, 5);
  }
  pop();
}

// ----- ADD THIS -----
function draw() {
  background(220); // clear canvas each frame
  // For now, pass empty arrays so we can see the canvas is working
  drawInteraction([], []);

  // Test ellipse to make sure draw() is running
  fill(0, 0, 255);
  ellipse(100, 100, 50, 50);
}