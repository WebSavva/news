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

/***/ "./complex_components/carousel/script/Carousel.js":
/*!********************************************************!*\
  !*** ./complex_components/carousel/script/Carousel.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Carousel)\n/* harmony export */ });\nclass Carousel {\r\n    constructor(config) {\r\n        (\r\n            {\r\n                id: this.id,\r\n                type: this.type,\r\n                duration: this.duration = 3e3,\r\n            }\r\n        = config);\r\n\r\n        this.carouselStart = 0;\r\n        this.currentSlide = this.carouselStart;\r\n        this.previousSlide = 0;\r\n        this.currentDirection = \"right\";\r\n        \r\n        this.carouselElement = document.getElementById(this.id);\r\n        this.items = Array.from(\r\n            this.carouselElement.querySelectorAll(\".carousel__item\")\r\n            );\r\n        this.itemsNumber = this.items.length;\r\n        this.carouselContent = this.carouselElement.querySelector(\".carousel__content\");\r\n        this.mainControls = Array.from( document.body.querySelectorAll(`[data-carousel-target=\"${this.id}\"]`) );\r\n    }\r\n\r\n    setUpCarousel() {\r\n      this.setUpMainControls();\r\n      this.calculateSize();\r\n      this.setItemsPosition();\r\n      this.setAutoMove();\r\n    }\r\n\r\n    //SETTING UP MAIN CONTROLS\r\n    setUpMainControls() {\r\n        this.mainControls.forEach((control) =>\r\n            control.addEventListener(\"click\", ({ target }) => {\r\n            this.mainControlClickHandle(target);\r\n            })\r\n        );\r\n    }\r\n\r\n    //CLICK HANDLER FOR MAIN CONTROLS\r\n    mainControlClickHandle(target) {\r\n      const currentControl = target.closest(\"[data-carousel-target]\");\r\n      if (!currentControl) return;\r\n\r\n      this.currentDirection = target.dataset.carouselDirection;\r\n      this.removeAutoMove();\r\n      this.changeCurrentSlideNumber();\r\n      this.switchSlide();\r\n    }\r\n\r\n    changeCurrentSlideNumber() {\r\n        this.previousSlide = this.currentSlide;\r\n        if (this.currentDirection === \"left\") {\r\n          if (this.currentSlide === this.carouselStart) {\r\n            this.currentSlide = this.carouselEnd;\r\n          } else {\r\n            this.currentSlide--;\r\n          }\r\n        } else {\r\n          if (this.currentSlide === this.carouselEnd) {\r\n            this.currentSlide = this.carouselStart;\r\n          } else {\r\n            this.currentSlide++;\r\n          }\r\n        }\r\n    }\r\n\r\n    setAutoMove() {\r\n        this.carouselInterval = setInterval(() => {\r\n            if (this.currentSlide === this.carouselStart) this.currentDirection = \"right\";\r\n            if (this.currentSlide === this.carouselEnd)  this.currentDirection = \"left\";\r\n            this.changeCurrentSlideNumber();\r\n            this.switchSlide();\r\n          }, this.duration);\r\n    }\r\n\r\n    removeAutoMove() {\r\n        clearTimeout(this.delayedAutoMove);\r\n        clearInterval(this.carouselInterval);\r\n    }\r\n\r\n    setDelayedAutoMove() {\r\n        this.delayedAutoMove = setTimeout(() => {\r\n            this.setAutoMove();\r\n          }, this.duration * 2);\r\n    }\r\n    \r\n    calculateSize() {\r\n\r\n    }\r\n\r\n    setItemsPosition() {\r\n\r\n    }\r\n\r\n    switchSlide() {\r\n\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://news/./complex_components/carousel/script/Carousel.js?");

/***/ }),

/***/ "./complex_components/carousel/script/LargeCarousel.js":
/*!*************************************************************!*\
  !*** ./complex_components/carousel/script/LargeCarousel.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ LargeCarousel)\n/* harmony export */ });\n/* harmony import */ var _Carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Carousel */ \"./complex_components/carousel/script/Carousel.js\");\n\r\n\r\nclass LargeCarousel extends _Carousel__WEBPACK_IMPORTED_MODULE_0__.default {\r\n    constructor(config) {\r\n        super(config);\r\n\r\n        ({  \r\n            breakpoints: this.breakpoints = {},\r\n            style: {\r\n                itemsGap: this.itemsGap = 10,\r\n            }\r\n        } = config);\r\n\r\n        this.setUpCarousel();\r\n        window.addEventListener('resize',() => {\r\n            this.calculateSize();\r\n            this.setItemsPosition();\r\n            this.switchSlide(\"right\");\r\n        });\r\n        \r\n         //manual sliding event listeners\r\n         this.carouselElement.addEventListener('pointerdown', this.initiateManualSliding.bind(this) );\r\n         this.carouselElement.addEventListener('lostpointercapture', this.settleCarousel.bind(this) );\r\n    }\r\n\r\n    calculateSize() {\r\n        let currentBreakpoint;\r\n        for (let breakpoint of Object.keys(this.breakpoints)) {\r\n            if (+breakpoint <= document.body.offsetWidth) {\r\n                currentBreakpoint = breakpoint;\r\n            }\r\n        }\r\n\r\n        this.itemsPerSlide = this.breakpoints[currentBreakpoint];\r\n        this.carouselEnd = this.itemsNumber - this.itemsPerSlide;\r\n        this.carouselContent.classList.add('carousel__content--large');\r\n    }\r\n    \r\n    setItemsPosition() {\r\n        this.items.forEach(\r\n            (item) => {\r\n                item.style.cssText = `flex: 0 0 ${100 / this.itemsPerSlide}%;\r\n                                      padding: 0 ${this.itemsGap / 10}rem`;\r\n            }\r\n            );\r\n        this.itemWidth = this.items[0].offsetWidth;\r\n    }\r\n\r\n    changeCurrentSlideNumber() {\r\n        super.changeCurrentSlideNumber();\r\n\r\n        if ( Math.abs( this.previousSlide - this.currentSlide) > 1 ) {\r\n            this.carouselContent.classList.add('carousel__content--slow-motion');\r\n        } else {\r\n            this.carouselContent.classList.remove('carousel__content--slow-motion');\r\n        }\r\n    }\r\n\r\n    switchSlide() {\r\n        this.currentMovedWidth = this.currentSlide * this.itemWidth;\r\n\r\n        this.carouselContent.style.transform = `translateX(-${\r\n            this.currentMovedWidth\r\n          }px)`;\r\n    }\r\n\r\n    //MANUAL SLIDING IMPLEMENTATION\r\n    initiateManualSliding(e) {\r\n        // e.preventDefault();\r\n        const { target, pointerId, isPrimary, clientX } = e;\r\n        const targetedCarousel = target.closest('.carousel');\r\n        if ( targetedCarousel !== this.carouselElement || !isPrimary) return;\r\n        \r\n        this.removeAutoMove();\r\n        this.pointer = pointerId;\r\n        this.pointerInitialCoordinate = clientX;\r\n\r\n        this.carouselContent.style.transition = 'all 0s';\r\n        this.carouselElement.onpointermove = this.moveSlidesManually.bind(this);\r\n        this.carouselElement.setPointerCapture(this.pointer);  \r\n    }\r\n    \r\n    moveSlidesManually(e) {\r\n        const { pointerId:currentPointerId, clientX} = e;\r\n        e.preventDefault();\r\n        if (currentPointerId !== this.pointer) return;\r\n        this.movedDistance = this.pointerInitialCoordinate - clientX;\r\n        \r\n        this.carouselContent.style.transform = `translateX(${- (this.currentMovedWidth + this.movedDistance)}px)`;\r\n    }\r\n    \r\n    settleCarousel(e) {\r\n        this.carouselContent.style.transition = '';\r\n        if (this.movedDistance < 0) {\r\n            this.movedDistance = -this.movedDistance;\r\n            this.currentSlide -= Math.ceil( this.movedDistance / this.itemWidth);\r\n            if (this.currentSlide < 0) this.currentSlide = 0;\r\n        } else {\r\n            this.currentSlide += Math.ceil( this.movedDistance / this.itemWidth);\r\n            if (this.currentSlide > this.carouselEnd) this.currentSlide = this.carouselEnd;\r\n        }\r\n        \r\n        this.switchSlide();\r\n        this.carouselElement.onpointermove = null;\r\n        this.setDelayedAutoMove();\r\n    }\r\n}\n\n//# sourceURL=webpack://news/./complex_components/carousel/script/LargeCarousel.js?");

/***/ }),

/***/ "./complex_components/carousel/script/SmallCarousel.js":
/*!*************************************************************!*\
  !*** ./complex_components/carousel/script/SmallCarousel.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SmallCarousel)\n/* harmony export */ });\n/* harmony import */ var _Carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Carousel */ \"./complex_components/carousel/script/Carousel.js\");\n\r\n\r\nclass SmallCarousel extends _Carousel__WEBPACK_IMPORTED_MODULE_0__.default {\r\n    constructor(config) {\r\n        super(config);\r\n\r\n        ({  \r\n            style: {\r\n                dotControlsPosition: this.dotControlsPosition = {},\r\n                dotControlsColor: this.dotControlsColor = '#fff',\r\n            }\r\n        } = config);\r\n\r\n        this.setUpCarousel();\r\n    }\r\n\r\n    setUpCarousel() {\r\n        this.carouselEnd  = this.itemsNumber - 1;\r\n        super.setUpCarousel();\r\n        this.setUpDotControls();\r\n    }\r\n    setItemsPosition() {\r\n        this.carouselContent.classList.add('carousel__content--small');\r\n        this.items.forEach(\r\n            (item) => item.classList.add('carousel__item--small')\r\n        );\r\n        this.items[this.currentSlide].classList.add('carousel__item--visible')\r\n    }\r\n\r\n    switchSlide() {\r\n        this.selectCurrentDot();\r\n        this.items[this.previousSlide].classList.remove('carousel__item--visible')\r\n        this.items[this.currentSlide].classList.add('carousel__item--visible')\r\n    }\r\n\r\n    setUpDotControls() {\r\n        //creating elements\r\n        this.dotsWrapper = document.createElement('div');\r\n        this.dotsWrapper.className = \"carousel__dots-wrapper\";\r\n\r\n        this.dotElements = [];\r\n        this.dotElements = Array.from( {length: this.itemsNumber}, (el, i) => {\r\n            const dot = document.createElement('span');\r\n            dot.className = 'carousel__dot';\r\n            dot.dataset.carouselSlide = i;\r\n            return dot;\r\n        });\r\n        \r\n        this.dotsWrapper.append(...this.dotElements);\r\n        this.selectCurrentDot();\r\n\r\n        let dotsWrapperStyle = `--carousel-dot-color:${this.dotControlsColor};`;\r\n        dotsWrapperStyle += Object.entries(this.dotControlsPosition).reduce((styledPosition,[posName, posValue]) => styledPosition += `${posName}:${posValue / 10 }rem;`, dotsWrapperStyle);\r\n        this.dotsWrapper.style.cssText = dotsWrapperStyle;\r\n        this.dotsWrapper.addEventListener('click', this.handleDotControlClick.bind(this));\r\n        this.carouselElement.append(this.dotsWrapper);\r\n    }\r\n\r\n    handleDotControlClick({target}) {\r\n        const targetedDot = target.closest('.carousel__dot');\r\n        if (! targetedDot ) return;\r\n        this.removeAutoMove();\r\n\r\n        this.previousSlide = this.currentSlide;\r\n        this.currentSlide = +targetedDot.dataset.carouselSlide;\r\n        \r\n        this.switchSlide(); \r\n        this.setDelayedAutoMove();\r\n    }\r\n\r\n    selectCurrentDot() {\r\n        this.dotElements.forEach((dot) => dot.classList.remove('carousel__dot--selected'));\r\n        this.dotElements[this.currentSlide].classList.add('carousel__dot--selected')\r\n    }\r\n}\n\n//# sourceURL=webpack://news/./complex_components/carousel/script/SmallCarousel.js?");

/***/ }),

/***/ "./complex_components/carousel/script/buildCarousel.js":
/*!*************************************************************!*\
  !*** ./complex_components/carousel/script/buildCarousel.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ buildCarousel)\n/* harmony export */ });\n/* harmony import */ var _LargeCarousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LargeCarousel */ \"./complex_components/carousel/script/LargeCarousel.js\");\n/* harmony import */ var _SmallCarousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SmallCarousel */ \"./complex_components/carousel/script/SmallCarousel.js\");\n\r\n\r\n\r\nfunction buildCarousel(config) {\r\n    if ( config.type === 'small' ) {\r\n        return new _SmallCarousel__WEBPACK_IMPORTED_MODULE_1__.default(config);\r\n    } else if (config.type === 'large' ) {\r\n        return new _LargeCarousel__WEBPACK_IMPORTED_MODULE_0__.default(config);\r\n    }\r\n}\n\n//# sourceURL=webpack://news/./complex_components/carousel/script/buildCarousel.js?");

/***/ }),

/***/ "./complex_components/main.js":
/*!************************************!*\
  !*** ./complex_components/main.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _carousel_script_buildCarousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carousel/script/buildCarousel */ \"./complex_components/carousel/script/buildCarousel.js\");\n\r\n\r\nconst state = {};\r\nwindow.onload = () => {\r\n    \r\n    const carouselConfigs = [\r\n        {\r\n            id: 'carousel-world',\r\n            type: 'large',\r\n            breakpoints: {\r\n                1100: 4,\r\n                800: 3,\r\n                600: 2,\r\n                500: 1\r\n            },\r\n            style: {\r\n                itemsGap:10,\r\n            }\r\n        },\r\n        {\r\n            id: 'carousel-travel',\r\n            type: 'large',\r\n            breakpoints: {\r\n                1100: 4,\r\n                800: 3,\r\n                600: 2,\r\n                500: 1\r\n            },\r\n            style: {\r\n                itemsGap:10,\r\n            }\r\n        },\r\n        {\r\n            id: 'carousel-tech',\r\n            type: 'large',\r\n            breakpoints: {\r\n                1100: 4,\r\n                800: 3,\r\n                600: 2,\r\n                500: 1\r\n            },\r\n            style: {\r\n                itemsGap:10,\r\n            }\r\n        },\r\n        {\r\n            id: 'carousel-gallery',\r\n            type: 'small',\r\n            style: {\r\n                dotControlsColor: \"#fff\",\r\n                itemsGap: 0,\r\n                dotControlsPosition: {\r\n                    top: 20,\r\n                    right: 20\r\n                }\r\n            }\r\n        },\r\n    ];\r\n\r\n    state.carousels = carouselConfigs.map((config) => (0,_carousel_script_buildCarousel__WEBPACK_IMPORTED_MODULE_0__.default)(config));\r\n    \r\n}\n\n//# sourceURL=webpack://news/./complex_components/main.js?");

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