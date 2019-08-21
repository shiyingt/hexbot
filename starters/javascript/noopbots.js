const API_BASE = 'https://api.noopschallenge.com';

window.themelistobj  = getThemeList()

async function NOOPBOT_START() {
  console.log(`Noop Noop! 🤖🤖🤖🤖🤖`);
  checkThemeList(start_app)
}

async function NOOPBOT_FETCH(options, onComplete) {
  await sleep(1000)
  if (!options.API) {
    console.error('API not set');
    return;
  }

  if (!onComplete) {
    console.warn('onComplete not set, nothing will happen.');
  }

  if (!options.seed) {
    console.error('seed not set');
    return;
  }

  let params = [];
  Object.keys(options).forEach(key => params.push(`${key}=${options[key]}`))
  let url = `${API_BASE}/${options.API}?` + params.join('&');

  window.fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(responseJson) {
      onComplete(responseJson)
    });
}

function NOOPBOT_SETUP_CANVAS(options) {

  if (!options) {
    console.error("No options provided to SETUP_CANVAS");
    return;
  }

  if (!canvas || !options.canvas.getContext) {
    console.error("No canvas, we're in for a bad time...");
    return;
  }

  //edit here to change canvas element's height
  let width = options.width || window.innerWidth;
  let height = options.height || window.innerHeight;

  let ctx = options.canvas.getContext('2d');

  ctx.canvas.width  = width;
  ctx.canvas.height = height;

  ctx.fillStyle = options.bgColor || '#f1f1f1';
  ctx.fillRect(0, 0, width, height);
  return ctx
}

function NOOPBOT_TICK_SETUP(onTick, interval) {
  return setInterval(onTick, interval);
}

function NOOPBOT_TICK_STOP(intervalId) {
  clearInterval(intervalId);
}

function NOOPBOT_DECIDE(set) {
  if (!set || !set.length) {
    return null;
  }
  return set[Math.floor(Math.random()*set.length)];
}

function NOOPBOT_DECIDE_POINT(width, height) {
  return {
    x: NOOPBOT_RANDOM(0, width),
    y: NOOPBOT_RANDOM(0, height)
  };
}

function NOOPBOT_RANDOM(min, max) {
  return min + Math.floor(Math.random()*(max-min));
}

window.onload = function (event) {
  NOOPBOT_START();
};


function getThemeList(){
  // Create a request variable and assign a new XMLHttpRequest object to it.
  newThemeList = []
  var request = new XMLHttpRequest();
  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', 'https://api.noopschallenge.com/hexbot?count=1000',true);
  
  request.onload = function () {
  // Begin accessing JSON data here
    var obj =JSON.parse(this.response)
    //console.log(typeof(arr))
    for (c=0;c<1000;c++){
      //console.log(obj.colors[c].value)
      newThemeList.push(obj.colors[c].value)
    }
  }
  // Send request
  request.send();
  //return newThemeList
  return newThemeList
}


//using callback to make sure that newthemelist is generated before select themeCurrent, else sleep longer
//async await makses sure that timeout is done
async function checkThemeList(){
  console.log("first")
  await sleep(100)
  if (window.newThemeList.length==1000){
    console.log(window.newThemeList.length)
    console.log("starting app")
    themeCurrent = window.newThemeList[0];
    start_app()
    console.log(themeCurrent)
  }
  else{
    console.log("still trying to get full themelist")
    sleep(100)
    checkThemeList()
  }
}

//use promises to set a timeout
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}