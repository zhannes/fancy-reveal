# Fancy Reveal

WIP wrapper for Foundation Reveal. Uses deferreds, adds methods for showActivity/hideActivity.

###Namespacing/AMD
Currently available at ```window.App.lib.fancyReveal```. 

That is for demo purposes only. Please change this to work for your scenario. Good example: [http://stackoverflow.com/questions/13673346/supporting-both-commonjs-and-amd](http://stackoverflow.com/questions/13673346/supporting-both-commonjs-and-amd)

###Demos
For demos, see the index.html file included in this repo.
###Usage
Store a reference to a fancyReveal object:
```js
var $el   = $('#myModal'),
    modal = App.lib.fancyReveal($el);
```

Call methods on that object:
```js
modal.open();
```

Chain things:
```js
modal
  .showActivity()
  .then(doSomething) 
  .then(function(overlay){
    overlay.hideActivity();
  });
```

###Depends on
Include jquery and foundation files in your page.

```html
<script src="js/vendor/jquery.js"></script>
<script src="js/vendor/foundation/foundation.js"></script>
<script src="js/vendor/foundation/foundation.reveal.js"></script>
```

Then include the files from this repo.

```html
<script src="js/lib/loader.js"></script>
<script src="js/lib/fancy-reveal.js"></script>
<!-- your code below here -->
<script src="js/your-code.js"></script>
```



