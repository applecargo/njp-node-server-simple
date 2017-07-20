function Webscope(canvas, miny, maxy, maxbuf) {

    //collect and init parameters
    this.buf = [];
    this.maxbuf = maxbuf;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.miny = miny;//-10;
    this.maxy = maxy;//10;

    this.clear = function() {
	this.buf = [];
    }
    
    this.update = function(item) {
	this.push(item);
	this.draw();
    }
    
    this.push = function(item) {
	if (this.buf.length > this.maxbuf) this.buf.shift();
	this.buf.push(item);
    }
    
    this.draw = function() {
	//refresh parameters
	this.stepx = this.width/(this.buf.length);
	this.rangey = this.maxy - this.miny;
	this.stepy = this.height/this.rangey;
	this.offsety = this.height/2;
	//clear canvas
	this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	//outline
	this.ctx.beginPath();
	this.ctx.strokeStyle = "rgb(0, 100, 255)";
	this.ctx.moveTo(0, this.height);
	this.ctx.lineTo(this.width, this.height);
	this.ctx.lineTo(this.width, 0);
	this.ctx.lineTo(0, 0);
	this.ctx.closePath();
	this.ctx.stroke();
	//centery
	this.ctx.beginPath();
	this.ctx.strokeStyle = "rgb(0, 255, 0)";
	this.ctx.moveTo(0, this.height-this.offsety);
	this.ctx.lineTo(this.width, this.height-this.offsety);
	this.ctx.stroke();
	//graph
	if (this.buf.length > 0) {
	    this.ctx.beginPath();
	    this.ctx.strokeStyle = "rgb(255, 100, 0)";
	    // this.ctx.strokeStyle = "rgb(0, 0, 0)";
	    this.ctx.moveTo(0, this.height-this.buf[0]);
	    for (var idx = 0; idx < this.buf.length; idx++) {
		this.ctx.lineTo(0+idx*this.stepx, this.height-this.stepy*this.buf[idx]-this.offsety);
	    }
	    this.ctx.stroke();
	    // //data marks: circles
	    // this.ctx.strokeStyle = "rgb(255, 100, 0)";
	    // for (var idx = 0; idx < this.buf.length; idx++) {
	    // 	this.ctx.beginPath();
	    // 	this.ctx.arc(0+idx*this.stepx, this.height-this.stepy*buf[idx]-this.offsety, 5, 0, 2*Math.PI, false);
	    // 	this.ctx.stroke();
	    // }
	}
    }
}
