var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

function distance(star1, star2)
{
    return Math.sqrt(Math.pow(star1.x - star2.x, 2) + Math.pow(star1.y - star2.y, 2));
}

function Star (x, y, color) 
{
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.size = 1;
    this.color = color;
    this.accel = 0.005;
    this.init();
}

Star.prototype.init = function ()
{
    if ( this.x == undefined && this.y == undefined ) {
        this.x = Math.random() * canvas.width - canvas.width / 2; 
        this.y = Math.random() * canvas.height - canvas.height / 2;
    }
    //var dist = Math.sqrt(Math.pow(this.y, 2) + Math.pow(this.x, 2));
    this.dx = Math.random() - .5; // this.x / dist;
    this.dy = Math.random() - .5; // this.y / dist;
    this.size = .5;
    if ( this.color == undefined )
    {
        this.color = '#FFFFFF'; // '#'+Math.floor(Math.random()*16777215).toString(16); // beautiul random color value code from http://www.paulirish.com/2009/random-hex-color-code-snippets/
    }
}

Star.prototype.kill = function ()
{
    var i = stars.indexOf(this);
    if ( i != -1 )
    {
        stars.splice(i, 1);
    }
}

Star.prototype.check_collision = function ()
{
    for (i = 0; i < stars.length; i++)
    {
        if (distance(this, stars[i]) < this.size + stars[i].size)
        {
            this.mate(stars[i]);
        }
    }
}

Star.prototype.mate = function (star)
{
    var color = "#FFFFFF";
    for (i = 1; i < 7; i++)
    {
        if (Math.random() > .5)
        {
            color[i] = this.color[i];
        }
        else
        {
            color[i] = star.color[i];
        }
        if (Math.random() > .05)
        {
            color[i] = Math.floor(Math.random()*16).toString(16);
        }
    }
    stars.push(new Star(this.x, this.y, color));
}

Star.prototype.update = function ()
{
    this.x += this.dx;
    this.y += this.dy;
    this.dx *= 1 + this.accel;
    this.dy *= 1 + this.accel;
    this.size *= 1 + this.accel;

    // leaving screen //
    if ( Math.abs(this.x) > canvas.width / 2 || Math.abs(this.y) > canvas.height / 2 )
    {
        this.kill();
    }

   // this.check_collision();

    /*if ( this.size > 3 )
    {
        
        stars.push(new Star(this.x, this.y));
        this.init();
    }*/
};

Star.prototype.draw = function ()
{
    ctx.beginPath();
    ctx.globalAlpha = 1;
    if (this.size < 2)
    {
        ctx.globalAlpha = this.size / 2;
    }
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

    for (i = 0; i < stars.length; i++)
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
    stars.push(new Star());
}

setInterval(update, 20);
