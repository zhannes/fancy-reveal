(function(undefined){

  function bind(fn,context){
    return function(){
      fn.apply(context||null,arguments);
    };
  }

  /* borrowed from:
   * https://gist.github.com/reneras/3104283
   */
  function Loader(){
    this.createLoader();
    this.el = this.canvas;
  }
  Loader.prototype = {
    createLoader: function (){
      this.canvas = document.createElement('canvas');
      this.canvas.className = 'loader';
      this.context = this.canvas.getContext('2d');
      this.lines = 16;
      this.startDate = new Date();
    },
    drawLoader: function(){
      var start    = this.startDate,
          lines    = this.lines,
          context  = this.context,
          /* important, must define a width on your canvas */
          cW       = this.cW || this.context.canvas.width,
          cH       = this.cH || this.context.canvas.height,
          rotation = parseInt(((new Date() - start) / 1000) * lines) / lines;
      context.save();
      context.clearRect(0, 0, cW, cH);
      context.translate(cW / 2, cH / 2);
      context.rotate(Math.PI * 2 * rotation);
      for (var i = 0; i < lines; i++) {

        context.beginPath();
        context.rotate(Math.PI * 2 / lines);
        context.moveTo(cW / 10, 0);
        context.lineTo(cW / 4, 0);
        context.lineWidth = cW / 30;
        context.strokeStyle = "rgba(255,255,255," + i / lines + ")";
        context.stroke();
      }
      context.restore();
    },
    start: function (){
      this.timerId = window.setInterval(bind(this.drawLoader,this), 1000 / 30);
    },
    stop: function (){
      window.clearInterval(this.timerId);
    }
  };

  window.App || (window.App = {});
  window.App.lib || (window.App.lib = {});
  window.App.lib.Loader = Loader;
})();