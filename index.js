// 934px x 114px
window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    document.getElementById("canvas-board").style.display = "block";

    console.log("click");
    gameSetup();
  };

  document.getElementById("extract-button").onclick = () => {
    
    let ctx = gameScript.context;
    let brush = gameScript.brushSize;

    let w = gameScript.canvasW
    let h = gameScript.canvasH

    let imgData = ctx.getImageData(0,0,w,h);

    let extArr = Array.prototype.slice.call(imgData.data);
    
    let alphaPixels = extArr.filter((x,i) => (i+1)%4 == 0);
    
    console.log(alphaPixels);
  };

  //
  function gameSetup() {
    //startGame
    console.log("setup");
    gameScript.start();
  }
  //
  const gameScript = {
    //myGameArea
    canvas: document.createElement("canvas"),
    context: "",
    HTMLCanvas: "",
    canvasX: 0,
    canvasY: 0,
    canvasW: 800,
    canvasH: 600,
    mouseX: 0,
    mouseY: 0,
    mouseStatus: "",
    brushSize: 0,
    

    start: function () {
      console.log("start");
      document.getElementById("canvas-board").append(this.canvas);
      this.drawCanvas();
      this.brushSize = document.getElementById("brush-size").value
      this.reqAnimation = window.requestAnimationFrame(gameLoop);
    },

    drawCanvas: function () {
      this.context = this.canvas.getContext("2d");

      this.canvas.width = this.canvasW;
      this.canvas.height = this.canvasH;

      HTMLCanvas = document.getElementById("canvas-board").children[0];

      HTMLCanvas.addEventListener('mousemove', this.getMouse);
      HTMLCanvas.addEventListener('mousedown', this.holdClick);
      HTMLCanvas.addEventListener('mouseup', this.releaseClick);
      
      this.canvasX = HTMLCanvas.getBoundingClientRect().x + 1
      this.canvasY = HTMLCanvas.getBoundingClientRect().y 

    },

    getMouse: function (event){
      //console.log(gameScript.canvasX)
      // console.log(this.canvasX)
      // console.log(this.mouseStatus)
      console.log(gameScript.HTMLCanvas)
      
      this.mouseX = event.clientX - gameScript.canvasX;
      this.mouseY = gameScript.canvasH - (event.clientY - gameScript.canvasY);
      document.getElementById('status').innerHTML = this.mouseX + " | " + this.mouseY

      switch (this.mouseStatus){
        case 'hold':
          let r = 0;
          let g = 0;
          let b = 0;
          let a = 255;

          let brush = gameScript.brushSize;

          gameScript.context.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
          gameScript.context.fillRect(  this.mouseX, event.clientY - gameScript.canvasY, brush, brush );
          break;
        case 'release':
          break;
      }
    },

    holdClick: function (event){
      this.mouseStatus = "hold"
    },

    releaseClick: function (event){
      this.mouseStatus = "release"
    },

    stop: function () {},

  };

  function gameLoop() {

    //gameScript.reqAnimation = window.requestAnimationFrame(gameScript.stop);
    gameScript.reqAnimation = window.requestAnimationFrame(gameLoop);
  }
};

