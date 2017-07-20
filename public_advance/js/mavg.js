function Mavg (tap) {
    this.buf = [];
    this.tap = tap;

    this.push = function(item) {
	this.buf.push(item);
	if (this.buf.length > this.tap) {
	    this.buf.shift();
	}
    };

    this.get = function() {
	var sum = 0;
	for (var idx = 0; idx < this.buf.length; idx++) {
	    sum = sum + this.buf[idx];
	}
	return (sum/this.buf.length);
    };
}
