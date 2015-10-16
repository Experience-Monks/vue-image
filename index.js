'use strict';

var prepend = require('prepend-child');

exports.install = function (Vue, opts) {

  var dir = {
    bind: function () {

      this.isImage = (this.el.nodeName.toLowerCase() === 'img');
      this.imagPath = '';
      this.clone = true;
      if(this.isImage){
        this.insert = false;
        this.replace = true;
      }else{
        this.insert = true;
        this.replace = false;
      }

    },
    update: function (value, oldValue) {

      if(typeof value === 'string'){

        this.imagePath = value;

      }else if(typeof value.img !== 'undefined' && typeof value.img === 'string'){

        this.imagePath = value.img;

      }else{

        console.warn('[vue-content] You need to supply "v-image" with an imagePath');

      }

      this.clone = (typeof value.clone !== 'undefined') ? value.clone : this.clone;
      this.replace = (typeof value.replace !== 'undefined') ? value.replace : this.replace;

      if(value !== oldValue && this.imagePath){

        var asset = this.preloader.getContent(this.imagePath);

        //console.log('asset: ',asset,', assetPath: ',this.assetPath,', imagePath: ',this.imagePath);

        if(!asset && this.assetPath){
          asset = this.preloader.getContent(this.assetPath + this.imagePath);
        }

        if (!asset || typeof asset === 'string') {
          asset = new Image();
          asset.src = this.imagePath;
        }

        if (asset) {

          if(this.isImage && !this.clone){

            this.replaceEl(asset);

          }else if(this.isImage && this.clone){

            this.replaceEl(asset.cloneNode(false));

          }else if(!this.isImage && !this.replace){

            this.insertEl(asset);

          }else if(!this.isImage && !this.clone){

            this.replaceEl(asset);

          }else{
            this.replaceEl(asset.cloneNode(false));
          }

        } else {

          console.warn('[vue-content] asset "', this.imagePath, '" could not be found.');

        }

      }

    },
    insertEl: function(asset){

      prepend(this.el, asset);

    },
    replaceEl: function(asset){

      var vElVal = '';

      for (var i = 0; i < this.el.attributes.length; i++) {
        var attr = this.el.attributes.item(i);
        if(attr.nodeName !== 'src')  asset.setAttribute(attr.nodeName, attr.nodeValue);
        if (attr.nodeName === 'v-el') vElVal = attr.nodeValue;
      }

      this.el.parentNode.insertBefore(asset, this.el);
      this.el.parentNode.removeChild(this.el);
      this.el = asset;
      this.vm.$compile(this.el);

      if (vElVal) {
        this.vm.$on('hook:compiled', function () {
          this.vm.$$[vElVal] = this.el;
        }.bind(this));
      }

    },
    init: function (preloader, assetPath) {

      this.preloader = preloader;
      this.assetPath = assetPath || "";

    }
  };

  dir.init(opts.preloader, opts.assetPath);

  Vue.directive('content', dir);

};
