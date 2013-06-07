(function($,undefined){


  function FancyReveal($el,options){
    this.$el = $el;
    this.loader = new App.lib.Loader;
    this.$loader = $(this.loader.el);
    this.configureModal.apply(this, arguments);
  }
  FancyReveal.prototype = {

    configureModal: function($el,options){
      var $modal = this.$el;
      var defaults = {
        animation: 'fade',
        closeOnBackgroundClick: true
      };
      $modal.foundation('reveal', $.extend(defaults,options || {}));
    },

    open: function(){
      var dfd = new $.Deferred,
          $el = this.$el;
      $el.one('opened', function(){
        dfd.resolve($el);
      });
      $el.foundation('reveal', 'open');
      return dfd;
    },

    close: function(){
      var dfd  = new $.Deferred,
          $el  = this.$el,
          that = this;
      $el.one('close',function(){
        dfd.resolve(that);
      });
      $el.foundation('reveal', 'close');
      return dfd;
    },

    showActivity: function(){
      var dfd     = new $.Deferred,
          h       = 50,
          w       = 50,
          $el     = this.$el,
          $loader = this.$loader,
          loader  = this.loader;

      if(!$loader.data('loader')){
        $loader.data('loader', loader);
        var margin = ['-' + h / 2 + 'px', 0, 0, '-' + w/2 +'px'].join(' ');
        $loader
          .attr({
            'height': h,
            'width' : w
          })
          .css({
            position: 'absolute',
            top: '50%',
            left: '50%',
            'margin': margin,
            'background-color': 'rgba(0,0,0,.8)',
            'border-radius': '4px'
          });
        $loader.hide();
        $el.append($loader);
      }
      loader.start();
      $loader.show();
      return dfd.resolve(this);
    },

    hideActivity: function(){
      var dfd = new $.Deferred,
          $el     = this.$el,
          $loader = this.$loader,
          loader  = this.loader;
      loader.stop();
      $loader.hide();
      return dfd.resolve(this);
    }

  };

  function fancyReveal($el){
    if($el && $el.length > 0){
      return new FancyReveal($el);
    } else {
      throw("As the only argument, fancyReveal expects a DOM element wrapped as jQuery object.");
    }
  }

  window.App || (window.App = {});
  window.App.lib || (window.App.lib = {});
  window.App.lib.fancyReveal = fancyReveal;
})(window.jQuery);