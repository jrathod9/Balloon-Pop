var POP = {
    WIDTH: 320, 
    HEIGHT:  480, 
    RATIO:  null,
    currentWidth:  null,
    currentHeight:  null,
    canvas: null,
    ctx:  null,

    init: function() {

        POP.RATIO = POP.WIDTH / POP.HEIGHT;
        // change on screen resize
        POP.currentWidth = POP.WIDTH;
        POP.currentHeight = POP.HEIGHT;
        POP.canvas = document.getElementsByTagName('canvas')[0];
        POP.canvas.width = POP.WIDTH;
        POP.canvas.height = POP.HEIGHT;
        POP.ctx = POP.canvas.getContext('2d');

        //  hide the address bar in our resize function
        POP.ua = navigator.userAgent.toLowerCase();
        POP.android = POP.ua.indexOf('android') > -1 ? true : false;
        POP.ios = ( POP.ua.indexOf('iphone') > -1 || POP.ua.indexOf('ipad') > -1  ) ? 
            true : false;

        POP.resize();

        // listen for clicks
        window.addEventListener('click', function(e) {
            e.preventDefault();
            POP.Input.set(e);
        }, false);

        // listen for touches
        window.addEventListener('touchstart', function(e) {
            e.preventDefault();
            // just the first touch is considered
            POP.Input.set(e.touches[0]);
        }, false);
        window.addEventListener('touchmove', function(e) {
            //Prevents zoom or scrolling
            e.preventDefault();
        }, false);
        window.addEventListener('touchend', function(e) {
            // as above
            // e.preventDefault();
        }, false);
        // POP.Draw.clear();
        // POP.Draw.rect(120,120,150,150, 'green');
        // POP.Draw.circle(100, 100, 50, 'rgba(255,0,0,0.5)');
        // POP.Draw.text('Hello World', 100, 100, 10, '#000');

    },

    resize: function() {

        POP.currentHeight = window.innerHeight;
        // resize the width in proportion to the new height
        POP.currentWidth = POP.currentHeight * POP.RATIO;

        if (POP.android || POP.ios) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }

        // set the new canvas style width and height
        POP.canvas.style.width = POP.currentWidth + 'px';
        POP.canvas.style.height = POP.currentHeight + 'px';


        // enabling us to scroll past the address bar, thus hiding it.
        if (POP.android || POP.ios) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }

        // some mobile browsers don't fire if there is not a short delay, thus time delay
        window.setTimeout(function() {
                window.scrollTo(0,1);
        }, 1);
    }

};


POP.Draw = {

    clear: function() {
        POP.ctx.clearRect(0, 0, POP.WIDTH, POP.HEIGHT);
    },

    rect: function(x, y, w, h, col) {
        POP.ctx.fillStyle = col;
        POP.ctx.fillRect(x, y, w, h);
    },

    circle: function(x, y, r, col) {
        POP.ctx.fillStyle = col;
        POP.ctx.beginPath();
        POP.ctx.arc(x + 5, y + 5, r, 0,  Math.PI * 2, true);
        POP.ctx.closePath();
        POP.ctx.fill();
    },

    text: function(string, x, y, size, col) {
        POP.ctx.font = 'bold '+size+'px Monospace';
        POP.ctx.fillStyle = col;
        POP.ctx.fillText(string, x, y);
    }

};


POP.Input = {

    x: 0,
    y: 0,
    tapped :false,

    set: function(data) {
        this.x = data.pageX;
        this.y = data.pageY;
        this.tapped = true; 

        POP.Draw.circle(this.x, this.y, 10, 'red');
    }

};

window.addEventListener('load', POP.init, false);
window.addEventListener('resize', POP.resize, false);