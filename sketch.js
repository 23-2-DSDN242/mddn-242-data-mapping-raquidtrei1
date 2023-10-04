let sourceImg=null;
let maskImg=null;

// change these three lines as appropiate
let sourceFile = "input_1.jpg";
let maskFile   = "mask_1.png";
let outputFile = "output_2.png";

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
}

function setup () {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  background(0, 0, 255);
  sourceImg.loadPixels();
  maskImg.loadPixels();
}

let X_STOP = 640;
let Y_STOP = 480;

let renderCounter = 0;
function draw () {

  let linesToDraw = 20;
  let R = 0
  let G = 0
  let B = 0
  let A = 255

  for(let j = renderCounter; j < renderCounter + linesToDraw && j < Y_STOP ; j++) {
    for(let i = 0; i < X_STOP; i++) {
      colorMode(RGB);
      let pix = [R, G, B, A]
      let mask = maskImg.get(i, j);

      if(mask[0] > 128){
        pix = sourceImg.get(i,j);
        set(i,j,pix)
      }
      else {
        pix = sourceImg.get(i,j);
        set(i,j,pix[0]-50)
      }
    }
  }
  renderCounter = renderCounter + linesToDraw;
  updatePixels();
  print(renderCounter)
  if(renderCounter > Y_STOP) {
    console.log("Done!")
    noLoop();
  }
}



function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}

    // for(let i=0;i<20736;i++) {
    //   let x = floor(random(sourceImg.width));
    //   let y = floor(random(sourceImg.height));
    //   let pix = sourceImg.get(x, y);
    //   let mask = maskImg.get(x, y);
    //   fill(pix);
    //   if(mask[0] < 128) {
    //     let pointSize = 10;
    //     ellipse(x, y, pointSize, pointSize);
    //   }
    // }
    // renderCounter = renderCounter + 1;
    // if(renderCounter > 20) {
    //   console.log("Done!")
    //   noLoop();
    //   // uncomment this to save the result
    //   // saveArtworkImage(outputFile);
    // }