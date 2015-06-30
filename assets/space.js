var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");
function draw() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

draw();
