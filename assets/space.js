var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

function Star () 
{
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.size = 1;
    this.color = '#FFFFFF';
    this.accel = 1.02;
}

Star.prototype.init = function ()
{
    this.x = Math.random() * canvas.width - canvas.width / 2; 
    this.y = Math.random() * canvas.height - canvas.height / 2;
    var dist = Math.sqrt(Math.pow(this.y, 2) + Math.pow(this.x, 2));
    this.dx = this.x / dist; // Math.random() - .5;
    this.dy = this.y / dist; // Math.random() - .5;
    this.size = .5;
    this.color = '#FFFFFF'; // '#'+Math.floor(Math.random()*16777215).toString(16); // beautiul random color value code from http://www.paulirish.com/2009/random-hex-color-code-snippets/
}

Star.prototype.update = function ()
{
    this.x += this.dx;
    this.y += this.dy;
    this.dx *= this.accel;
    this.dy *= this.accel;
    this.size *= this.accel;

    if ( Math.abs(this.x) > canvas.width / 2 || Math.abs(this.y) > canvas.height / 2 )
    {
        this.init();
    }
};

Star.prototype.draw = function ()
{
    ctx.beginPath();
    ctx.globalAlpha = 1;
    /*if (this.size < 2)
    {
        ctx.globalAlpha = this.size / 2;
    }*/
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
}

function update()
{
    ctx.globalAlpha = 1;
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    for (i = 0; i < num; i++)
    {
        stars[i].update();
        stars[i].draw();
    }
}

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);

var num = 50;
var stars = [];
for (i = 0; i < num; i++)
{
    stars[i] = new Star();
    stars[i].init();
}

setInterval(update, 20);
