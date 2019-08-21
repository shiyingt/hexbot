/*features:
  - generates 1000 different coloured dots by pressing dynamically positioned button
*/
let canvas;
let ctx;
let appWidth;
let appHeight;
var themeCount = 0;
// var themeList = ['FF7F50,FFD700,FF8C00','228B22,3CB371,808000','EFF8E2,CECFC7,ADA8B6'];
// var themeCurrent = 0;

// called by NOOPBOT on window.onload
function start_app() {
  // size canvas to window
  // works for first themecurrent
  
  themeCurrent = themeCurrent.substring(1)
  console.log("themeCurrent "+ themeCurrent)
  sizeCanvas();
  // console.log(window.newThemeList)
  // for (i=0;i<window.newThemeList.length;i++){
  //   console.log(window.newThemeList[i])
  // }

  //set up a ticker to refresh page automatically.
  let speed = 300; // how often screen refreshes, in milliseconds.
  let ticker = NOOPBOT_TICK_SETUP(draw, speed);

  //fire a draw event.
  draw(themeCurrent)
  // draw(window.newThemeList[themeCount]);
  // canvas.addEventListener('click', clearCanvas);

  //redraw when canvas is clicked.
  // canvas.addEventListener('click', draw);
  button = document.getElementById('button');
  button.addEventListener('click', clearCanvas);

}

function sizeCanvas() {
   appWidth = window.innerWidth;
   appHeight = window.innerHeight;
  // appWidth = '200 px';    //sets the size of canvas
  // appHeight = '200 px';   //sets the size of canvas
  canvas = document.getElementById('canvas');
  ctx = NOOPBOT_SETUP_CANVAS({ canvas: canvas, bgColor:'#ffffff' });
}

function draw(theme) {
  console.log(theme)
  //get the data!
  // console.log(newThemeList)
  NOOPBOT_FETCH({
    API: 'hexbot',
    count: 1000,
    width: appWidth,
    height: appHeight,
    // seed: 'FF7F50,FFD700,FF8C00',  //orange based
    // seed: '228B22,3CB371,808000',   //green based
    seed: theme,
  }, drawSet);
}

function drawSet(responseJson) {
  let { colors } = responseJson;
  colors.forEach(function(point) {
    drawPoint(ctx, point);
  })
}

function drawPoint(ctx, point) {
  ctx.fillStyle = point.value;
  let pointSize = NOOPBOT_RANDOM(1,8);
  ctx.globalAlpha = Math.random();
  ctx.beginPath();
  ctx.arc(point.coordinates.x, point.coordinates.y, pointSize, 0, Math.PI * 2, true);
  ctx.fill();
}

  // listen if browser changes size.
  window.onresize = function(event){
    sizeCanvas();
    draw();
};
function resizeCanvasToDisplaySize(canvas) {
  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight-30;

  // If it's resolution does not match change it
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }

  return false;
}


function clearCanvas(){   //clears canvas upon clicking 
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  if (newThemeList[themeCount] == themeCurrent){
    if (themeCount==(newThemeList.length-1)){
      themeCount=0
      themeCurrent= newThemeList[0]
    }else{
    themeCount = themeCount+1
    themeCurrent = newThemeList[themeCount] 
    }
  }
   //fire a draw event.
  let speed = 300; // how often screen refreshes, in milliseconds.
  let ticker = NOOPBOT_TICK_SETUP(draw, speed);
   draw(window.newThemeList[themeCount]);
}

