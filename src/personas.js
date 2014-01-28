var personas = {
  _x: 75,
  _y: 50,
  _scale: 15,
  _height: 500,
  _width: 1024,
  _ctx: null,
  _drag: false,

  object: function(x, y, width, height) {
    this._ctx.beginPath();
    this._ctx.arc(x + this._scale, y + this._scale, this._scale * 2, 0, 2 * Math.PI, false);
    this._ctx.closePath();
    this._ctx.fill();
  },
  clear: function() {
    this._ctx.clearRect(0, 0, this._width, this._height);
  },
  draw: function() {
    personas.clear();
    personas._ctx.fillStyle = "#444444";
    
    personas.object(personas._x - 15, personas._y - 15, 30, 30);
  },
  init: function(id) {
    var canvas = document.getElementById(id || "canvas");
    canvas.width = this._width;
    canvas.height = this._height;
    
    this._ctx = canvas.getContext("2d");
    setInterval(this.draw, 10);

    var _that = this;

    canvas.onmousedown = function(e) {
      if (e.pageX < _that._x + _that._scale + this.offsetLeft &&
      e.pageX > _that._x - _that._scale + this.offsetLeft &&
      e.pageY < _that._y + _that._scale + this.offsetTop &&
      e.pageY > _that._y -_that._scale + this.offsetTop) {

        _that._drag = true;

        this.onmousemove = function(e) {
          if(!_that._drag) { return; }

          //_that.clear();
          _that._x = e.pageX - this.offsetLeft;
          _that._y = e.pageY - this.offsetTop;
        };
      }
    };

    canvas.onmouseup = function(e) {
      _that._drag = false;
      this.onmousemove = null;
    };
  }
};

personas.init();
