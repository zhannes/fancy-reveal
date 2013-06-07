(function($,App,undefined){

  function resizeForDemo(overlay){
    var dfd = new $.Deferred,
        transEnds = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';

    // resolve when done
    overlay.$el.one(transEnds,function(){
      dfd.resolve(overlay);
      overlay.$el.css('transition','');
    });

    // define transition
    overlay.$el.css('transition','all 2000ms ease-in-out');

    // resize
    var dimensions,
        modDimensions = {
          'width':'45em',
          'margin-left': '-22.5em'
        },
        origW = overlay.$el.data('origW');

    // toggles between modDimensions or original
    if(origW !== undefined){

      if(origW === overlay.$el.outerWidth()){

        dimensions = modDimensions;

      } else {

        dimensions = {
          'width': origW + 'px',
          'margin-left': '-' + origW/2 + 'px'
        };

      }

    } else {

      // no origW, first time through
      overlay.$el.data('origW',overlay.$el.width());
      dimensions = modDimensions;

    }

    overlay.$el.css(dimensions);
    return dfd;
  }


  function init(){
    var $el = $('#myModal'),
         modal = App.lib.fancyReveal($el);

    // OPEN
    $('.open-demo').on('click', function(e){
      e.preventDefault();
      modal.open();
    });

    $el
      .on('click','.resize',function(e){
        e.preventDefault();

        // show activity, while resizing modal
        modal
          .showActivity()
          .then(resizeForDemo)
          .then(function(overlay){
            overlay.hideActivity();
          });

      })
      .on('click','.demo-close',function(e){
        e.preventDefault();

        // CLOSE
        modal.close();
      })
      .on('click', '.second-modal',function(e){
        var modal2 = App.lib.fancyReveal($('#modal2'));
        modal2.open();
      })
  }

  $(init);

})(window.jQuery, window.App || (window.App={}) );