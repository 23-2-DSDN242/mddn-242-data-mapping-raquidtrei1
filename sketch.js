let sourceImg=null;
let maskImg=null;

// change these three lines as appropiate
let sourceFile = "input_5.jpg";
let maskFile   = "mask_5.png";
let outputFile = "output_5.png";

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

let X_STOP = 1920;
let Y_STOP = 1080;

let renderCounter = 0;
function draw () {

  let linesToDraw = 20;

  for(let j = renderCounter; j < renderCounter + linesToDraw && j < Y_STOP ; j++) {
    for(let i = 0; i < X_STOP; i++) {
      colorMode(RGB);
      let pix = [0,0,0,255];
      let mask = maskImg.get(i, j);
      let col = color(pix)

      if(mask[0] > 128){
        pix = sourceImg.get(i,j);

        let newCol = [0, 0, 0, 255];
        newCol[1] = map(0, 0, 100, (Math.round(4*pix[1]/255)*64), 255);
        newCol[0] = map(0, 0, 100, (Math.round(4*pix[0]/255)*64), 255);
        newCol[2] = map(0, 0, 100, (Math.round(4*pix[2]/255)*64), 255);
    
        // uncomment to use colour version of renderer.
        set(i,j,newCol);

        // uncomment to use greyscale version of renderer.
        // set(i, j, (Math.round(4*pix[2]/255)*64));
      }

      else {
        pix = sourceImg.get(i,j);
        set(i,j,pix);
      }
    }
  }
  renderCounter = renderCounter + linesToDraw;
  updatePixels();

  if(renderCounter > Y_STOP) {
    console.log("Done!");
    noLoop();
    saveArtworkImage(outputFile);
  }
}



function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}