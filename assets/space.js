var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

function Star () 
{
    this.x = 0;
    this.y = 0;
    this.dx = .1;
    this.dy = .1;
    this.size = 1;
}

Star.prototype.update = function ()
{
    this.x += this.dx;
    this.y += this.dy;
    this.dx *= 1.01;
    this.dy *= 1.01;
    this.size *= 1.005;
};

Star.prototype.draw = function ()
{
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
}

function update()
{
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    star.update();
    star.draw();
}

var star = new Star();

setInterval(update, 20);
