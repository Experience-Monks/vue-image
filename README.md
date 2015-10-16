# vue-image

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A Vue directive that will insert an image from a preloader into the dom.

## Usage


```var fs = require('fs');
var Vue = require('vue');
Vue.use(require('vue-image'), {
	assetPath: '',
	preloader: require('preloader')
});```
  
`<img v-image="hero.image"/>`

### Options
clone
```<img v-content="{img: hero.image, clone: false}"/>```
Clone the image returned fromm `preloader.getContent(<img path>)`. Default is `true`. If set to false the same image for every directive that is returned from `preloader.getContent(<img path>)` is used and only one instance of the image can be present in the dom at one time.


replace
```<div v-content="{img: hero.image, replace: false}"></div>``` Replace the element with the image specified in the directive. If the directive element is an image than the default is `true` and probably should always be `true`. For any other element the default is `false` and the image is inserted as a child of that element.

[![NPM](https://nodei.co/npm/vue-image.png)](https://www.npmjs.com/package/vue-image)

## License

MIT, see [LICENSE.md](http://github.com/jam3/vue-image/blob/master/LICENSE.md) for details.
