/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./complex_components/carousel/script/carousel.js":
/*!********************************************************!*\
  !*** ./complex_components/carousel/script/carousel.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Carousel)\n/* harmony export */ });\nclass Carousel {\r\n  constructor({type = \"small\", breakpoints = {}, interval = 3e3, id, dotControlsColor = \"gray\", dotControlsPosition = \"top-right\" } = {}) {\r\n    //initializaing the configuration \r\n    this.type = type\r\n    \r\n    this.id = id;\r\n    this.slideDuration = interval;\r\n    this.breakpoints = breakpoints;\r\n    this.currentDirection = \"right\";\r\n    this.carouselStart = 0;\r\n    this.currentSlide = this.carouselStart;\r\n    this.dotControlsColor = dotControlsColor;\r\n    this.dotControlsPosition = dotControlsPosition;\r\n\r\n    this.carouselElement = document.getElementById(this.id);\r\n    this.items = Array.from(\r\n      this.carouselElement.querySelectorAll(\".carousel__item\")\r\n    );\r\n    this.itemsNumber = this.items.length;\r\n    this.carouselContent = this.carouselElement.querySelector(\".carousel__content\");\r\n    this.controls = Array.from( document.body.querySelectorAll(`[data-carousel-target=\"${this.id}\"`) );\r\n    this.setUpCarousel();\r\n  }\r\n\r\n  setUpCarousel() {\r\n    this.calculateSize();\r\n\r\n    if ( this.type === \"large\" ) {\r\n        window.onresize = () => {\r\n            this.calculateSize();\r\n            this.moveContent(\"right\");\r\n        };\r\n    } else if ( this.type === \"small\" ) {\r\n        this.setUpDotControls();\r\n    }\r\n\r\n\r\n    this.controls.forEach((control) =>\r\n      control.addEventListener(\"click\", ({ target }) => {\r\n          this.controlClickHandle(target);\r\n      })\r\n    );\r\n\r\n\r\n    this.setAutoMove();\r\n  }\r\n\r\n  moveContent(direction = this.currentDirection) {\r\n    let fastMove = false;\r\n    if (direction === \"left\") {\r\n      if (this.currentSlide === this.carouselStart) {\r\n        this.currentSlide = this.carouselEnd;\r\n        fastMove = true;\r\n      } else {\r\n        this.currentSlide--;\r\n      }\r\n    } else {\r\n      if (this.currentSlide === this.carouselEnd) {\r\n        this.currentSlide = this.carouselStart;\r\n        fastMove = true;\r\n      } else {\r\n        this.currentSlide++;\r\n      }\r\n    }\r\n\r\n    if (fastMove) {\r\n      this.carouselContent.style.transition = \"all 1s\";\r\n    } else {\r\n      this.carouselContent.style.transition = \"\";\r\n    }\r\n\r\n    this.carouselContent.style.transform = `translateX(-${\r\n      this.currentSlide * (100 / this.itemsPerSlide)\r\n    }%)`;\r\n\r\n    if (this.type === \"small\") {\r\n       this.selectCurrentDot();\r\n    }\r\n  }\r\n\r\n  controlClickHandle(target) {\r\n      \r\n    const currentControl = target.closest(\"[data-carousel-target]\");\r\n      \r\n    if (!currentControl) return;\r\n      \r\n    clearTimeout(this.delayedAutoMove);\r\n    clearInterval(this.carouselInterval);\r\n    const moveDirection = currentControl.dataset.carouselDirection;\r\n\r\n    this.moveContent(moveDirection);\r\n\r\n    this.delayedAutoMove = setTimeout(() => {\r\n      this.setAutoMove();\r\n    }, this.slideDuration * 2);\r\n  }\r\n\r\n  setAutoMove() {\r\n    this.carouselInterval = setInterval(() => {\r\n      if (this.currentSlide === this.carouselStart)\r\n        this.currentDirection = \"right\";\r\n      if (this.currentSlide === this.carouselEnd)\r\n        this.currentDirection = \"left\";\r\n      this.moveContent();\r\n    }, this.slideDuration);\r\n  }\r\n\r\n  calculateSize() {\r\n    \r\n    let currentBreakpoint;\r\n    for (let breakpoint of Object.keys(this.breakpoints)) {\r\n      if (+breakpoint <= window.innerWidth) {\r\n        currentBreakpoint = breakpoint;\r\n      }\r\n    }\r\n\r\n    if (this.type === \"large\") {\r\n        this.itemsPerSlide = this.breakpoints[currentBreakpoint];\r\n        this.carouselEnd = this.itemsNumber - this.itemsPerSlide;\r\n    } else if (this.type === \"small\") {\r\n        this.itemsPerSlide = 1;\r\n        this.carouselEnd = this.itemsNumber - 1;\r\n    }\r\n\r\n    this.items.forEach(\r\n      (item) => (item.style.flex = `0 0 ${100 / this.itemsPerSlide}%`)\r\n    );\r\n  }\r\n\r\n  setUpDotControls() {\r\n    //creating elements\r\n    this.dotsWrapper = document.createElement('div');\r\n    this.dotsWrapper.className = \"carousel__dots-wrapper\";\r\n    \r\n    this.dotElements = [];\r\n    for (let i = 0; i < this.itemsNumber; i++) {\r\n        const dot = document.createElement('span');\r\n        dot.className = \"carousel__dot\";\r\n        dot.setAttribute('data-carousel-slide', i);\r\n        this.dotElements.push(dot);\r\n    }\r\n    this.selectCurrentDot();\r\n    this.dotsWrapper.append(...this.dotElements);\r\n    \r\n    this.dotsWrapper.style.cssText = `--carousel-dot-color:${this.dotControlsColor}`;\r\n    switch (this.dotControlsPosition) {\r\n        case \"bottom\":\r\n            this.dotsWrapper.style.bottom = \"10%\";\r\n            this.dotsWrapper.style.left = \"50%\";\r\n            this.dotsWrapper.style.transform = \"translateX(-50%)\";\r\n            break;\r\n            case \"top-right\":\r\n                default:\r\n                    this.dotsWrapper.style.top = \"10%\";\r\n                    this.dotsWrapper.style.right = \"10%\";\r\n                    break;\r\n                }\r\n                \r\n                \r\n    //attaching event listener\r\n    this.dotsWrapper.addEventListener('click', ({target}) => {\r\n        if (! target.classList.contains('carousel__dot') ) return;\r\n        clearTimeout(this.delayedAutoMove);\r\n        clearInterval(this.carouselInterval);\r\n\r\n        this.currentSlide = +target.dataset.carouselSlide;\r\n        this.selectCurrentDot();\r\n        \r\n        this.carouselContent.style.transform = `translateX(-${this.currentSlide * 100}%)`;\r\n        \r\n        this.delayedAutoMove = setTimeout(() => {\r\n            this.setAutoMove();\r\n          }, this.slideDuration * 2);\r\n    });\r\n\r\n    this.carouselElement.append(this.dotsWrapper);\r\n\r\n  }\r\n\r\n  selectCurrentDot() {\r\n    this.dotElements.forEach((dot) => dot.classList.remove('carousel__dot--selected'));\r\n    this.dotElements[this.currentSlide].classList.add('carousel__dot--selected')\r\n  }\r\n}\r\n\r\n// window.onload = () => {\r\n//   const carousel1 = new Carousel({\r\n//     id: \"carousel1\",\r\n//     breakpoints: {\r\n//         900: 3,\r\n//         700: 2,\r\n//         500: 1\r\n//     },\r\n//     interval: 3e3,\r\n//     type: \"small\",\r\n//     dotControlsPosition: \"top-right\",\r\n//     dotControlsColor: \"red\"\r\n//   });\r\n//   console.log(carousel1);\r\n// };\r\n\n\n//# sourceURL=webpack://news/./complex_components/carousel/script/carousel.js?");

/***/ }),

/***/ "./complex_components/main.js":
/*!************************************!*\
  !*** ./complex_components/main.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _carousel_script_carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carousel/script/carousel */ \"./complex_components/carousel/script/carousel.js\");\n\r\n\r\nconst state = {};\r\nwindow.onload = () => {\r\n\r\n    const carouselConfigs = [\r\n        {\r\n            id: 'carousel-world',\r\n            type: 'large',\r\n            breakpoints: {\r\n                1100: 4,\r\n                800: 3,\r\n                600: 2,\r\n                500: 1\r\n            }\r\n        }\r\n    ];\r\n\r\n    state.carousels = carouselConfigs.map((config) => new _carousel_script_carousel__WEBPACK_IMPORTED_MODULE_0__.default(config));\r\n    \r\n}\n\n//# sourceURL=webpack://news/./complex_components/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./complex_components/main.js");
/******/ 	
/******/ })()
;