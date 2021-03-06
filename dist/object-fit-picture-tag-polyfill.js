(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("object-fit-picture-tag-polyfill", [], factory);
	else if(typeof exports === 'object')
		exports["object-fit-picture-tag-polyfill"] = factory();
	else
		root["object-fit-picture-tag-polyfill"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Cross browser CSS object-fit support for picture tags and img tags
 * DOM element must have either data-object-fit-cover or data-object-fit-contain assigned to the tag
 * Replaces tag with two divs - a parent with relative positioning and a child with a background image
 * @author Chris Boakes
 * @param options Object
 * @param options - fitPosition String (default 'center center')
 * @param options - addContainer Boolean - do we want a 'relative' wrapper?
 */
var _class = function () {
    function _class(options) {
        _classCallCheck(this, _class);

        // If we don't have object-fit support
        if (!this.supportsObjectFit()) {
            this.combineOptions(options);
            this.init();
        }
    }

    /**
     * Combine default parameters with user options
     * @param options Object
     */


    _createClass(_class, [{
        key: 'combineOptions',
        value: function combineOptions(options) {
            var defaults = {
                fitPosition: 'center center',
                addContainer: true
            };

            this.options = _extends({}, defaults, options);
        }

        /**
         * Initialise app
         */

    }, {
        key: 'init',
        value: function init() {
            // By default returns a nodeList - the below ensures it's an array
            this.initReplacementTags([].slice.call(document.querySelectorAll('[data-object-fit-cover]')), 'cover');
            this.initReplacementTags([].slice.call(document.querySelectorAll('[data-object-fit-contain]')), 'contain');
        }

        /**
         * Loop through object-fit-covers and object-fit-contains
         * @param tags Array
         * @param fitSize String
         */

    }, {
        key: 'initReplacementTags',
        value: function initReplacementTags(tags, fitSize) {
            var _this = this;

            if (tags.length > 0) {
                tags.forEach(function (item) {
                    _this.createReplacementTag(item, fitSize);
                });
            }
        }

        /**
         * Loop through array of picture tags and do our fix
         * @param pictureTag String
         * @param fitSize String
         */

    }, {
        key: 'createReplacementTag',
        value: function createReplacementTag(pictureTag, fitSize) {
            var src = this.getSrc(pictureTag);

            var tagClasses = pictureTag.getAttribute('class');

            var tagId = pictureTag.getAttribute('id');

            // If we have retreived the src attribute
            if (src) {
                var backgroundElement = this.createBackground(src, tagClasses, tagId, fitSize);

                // If we want a wrapping div
                if (this.options.addContainer) {
                    // Create a new div to wrap our child div
                    var wrapperElement = this.createBackgroundContainer(tagClasses, tagId);

                    // Add child div to wrapper
                    wrapperElement.appendChild(backgroundElement);
                    // Replace <picture> tag with div
                    pictureTag.parentNode.replaceChild(wrapperElement, pictureTag);
                    // If we don't have a wrapping div
                } else {
                    // Replace <picture> tag with div
                    pictureTag.parentNode.replaceChild(backgroundElement, pictureTag);
                }
            }
        }

        /**
         * Creates a new wrapper div for our background-image container
         * @param tagClasses String
         * @param tagId String
         * @return DOM element
         */

    }, {
        key: 'createBackgroundContainer',
        value: function createBackgroundContainer(tagClasses, tagId) {
            // Create a new div to wrap our child div
            var wrapperElement = document.createElement('div');

            // Add IDs and classes from the original picture tag to the new element
            wrapperElement = this.setClassesAndIds(wrapperElement, tagClasses, tagId);
            wrapperElement.style.position = 'relative';

            return wrapperElement;
        }

        /**
         * Our background-image container
         * @param src String
         * @param tagClasses String
         * @param tagId String
         * @param fitSize String
         * @return DOM element
         */

    }, {
        key: 'createBackground',
        value: function createBackground(src, tagClasses, tagId, fitSize) {
            var backgroundElement = document.createElement('div');

            backgroundElement.style.backgroundImage = 'url(' + src + ')';
            backgroundElement = this.setBackgroundElementStyles(backgroundElement, fitSize);

            if (!this.options.addContainer) {
                backgroundElement = this.setClassesAndIds(backgroundElement, tagClasses, tagId);
            }

            return backgroundElement;
        }

        /**
         * Append DOM element with Id and classes (if on original element)
         * @param el DOM element
         * @param tagClasses String
         * @param tagId String
         * @return DOM element
         */

    }, {
        key: 'setClassesAndIds',
        value: function setClassesAndIds(el, tagClasses, tagId) {
            if (tagClasses) {
                el.setAttribute('class', tagClasses);
            }

            if (tagId) {
                el.setAttribute('id', tagId);
            }

            return el;
        }

        /**
         * Child element styles
         * @param el DOM Element
         */

    }, {
        key: 'setBackgroundElementStyles',
        value: function setBackgroundElementStyles(el, fitSize) {
            el.style.backgroundSize = fitSize;
            el.style.backgroundPosition = this.options.fitPosition;
            el.style.backgroundRepeat = 'no-repeat';
            el.style.height = '100%';
            el.style.width = '100%';
            el.style.position = 'absolute';
            el.style.top = '0';
            el.style.left = '0';
            return el;
        }

        /**
         * Get src from <img> tag
         * @param item String
         * @return String
         */

    }, {
        key: 'getSrc',
        value: function getSrc(item) {
            var imgTagInsidePicture = item.querySelector('img');

            // <picture> tag
            if (imgTagInsidePicture && imgTagInsidePicture !== 'undefined' && imgTagInsidePicture !== null) {
                return imgTagInsidePicture.src;
                // <img> tag
            } else if (item.src !== 'undefined' && item.src !== null) {
                this.options.aspectRatio = item.height / item.width * 100;
                return item.src;
            }
            return false;
        }

        /**
         * Detect whether we support object fit
         * @return Boolean
         */

    }, {
        key: 'supportsObjectFit',
        value: function supportsObjectFit() {
            var testImg = typeof Image === 'undefined' ? { style: { 'object-position': 1 } } : new Image();
            var supportsFit = 'object-fit' in testImg.style;

            return supportsFit;
        }
    }]);

    return _class;
}();

exports.default = _class;
module.exports = exports['default'];

/***/ })
/******/ ]);
});