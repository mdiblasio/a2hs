/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ga = __webpack_require__(/*! ./ga.js */ \"./src/ga.js\");\nlet EVENTS = __webpack_require__(/*! ./ga.js */ \"./src/ga.js\").EVENTS;\n\nconst log = console.log;\n\nwindow.EVENTS = EVENTS;\n\nEVENTS = JSON.parse(JSON.stringify(EVENTS));\n\nconst setCookie = (name, value) => {\n  document.cookie = `${name}=${value}`;\n}\n\nconst getCookie = (name) => {\n  let re = new RegExp(`${name}=([^;]*)`);\n  return document.cookie.match(re) ? document.cookie.match(re)[1] : '';\n}\n\nwindow.showPrompt = getCookie('showPrompt') === 'false' ? false : true;\n\nconst clearCookies = (e) => {\n  // function clearCookies() {\n  log(`clearCookies()`);\n  let cookies = document.cookie.split(\";\");\n\n  for (let i = 0; i < cookies.length; i++) {\n    let cookie = cookies[i];\n    let eqPos = cookie.indexOf(\"=\");\n    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;\n    document.cookie = name + \"=;expires=Thu, 01 Jan 1970 00:00:00 GMT\";\n  }\n}\n\nconst trackConversion = (e) => {\n  log(`trackConversion()`);\n  ga.sendEvent(EVENTS.CONVERSIONS.purchase);\n  ga.trackConversion();\n}\n\nconst showA2HSPrompt = (e) => {\n  log(`showA2HSPrompt()`);\n\n  ga.sendEvent(EVENTS.A2HS.custom.accepted);\n  // hide our user interface that shows our A2HS button\n  buttons.showA2HSPrompt.style.display = 'none';\n\n  // Show the prompt\n  deferredPrompt.prompt();\n  // Wait for the user to respond to the prompt\n  deferredPrompt.userChoice\n    .then((choiceResult) => {\n      if (choiceResult.outcome === 'accepted') {\n        console.log('User accepted the A2HS prompt');\n        ga.sendEvent(EVENTS.A2HS.OS.accepted);\n      } else {\n        console.log('User dismissed the A2HS prompt');\n        ga.sendEvent(EVENTS.A2HS.OS.dismissed);\n      }\n      deferredPrompt = null;\n      setCookie('showPrompt', 'false');\n\n    });\n}\n\nlet buttons = {};\nbuttons.clearCookies = document.getElementById('clearCookies');\nbuttons.showA2HSPrompt = document.getElementById('showA2HSPrompt');\nbuttons.trackConversion = document.getElementById('trackConversion');\n\nbuttons.clearCookies.addEventListener('click', clearCookies);\nbuttons.showA2HSPrompt.addEventListener('click', showA2HSPrompt);\nbuttons.trackConversion.addEventListener('click', trackConversion);\n\nlet deferredPrompt;\n\nwindow.addEventListener('beforeinstallprompt', (e) => {\n  log(`beforeinstallprompt`);\n  if (window.showPrompt) {\n    ga.sendEvent(EVENTS.A2HS.custom.shown);\n    // Stash the event so it can be triggered later.\n    deferredPrompt = e;\n    // Update UI notify the user they can add to home screen\n    // showInstallPromotion();\n    buttons.showA2HSPrompt.style.visibility = 'unset';\n  }\n\n});\n\nwindow.addEventListener('appinstalled', (evt) => {\n  console.log('a2hs installed');\n  ga.sendEvent(EVENTS.A2HS.install);\n});\n\nif (window.matchMedia('(display-mode: standalone)').matches) {\n  console.log('display-mode is standalone');\n  ga.sendEvent(EVENTS.A2HS.launchedFromHS);\n}\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/ga.js":
/*!*******************!*\
  !*** ./src/ga.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// const ACCOUNT_ID = '';\n\nconst EVENTS = {\n  CONVERSIONS: {\n    purchase: {\n      action: 'purchase',\n      category: 'ecommerce',\n      label: '',\n      interaction: true\n    }\n  },\n  A2HS: {\n    OS: {\n      dismissed: {\n        action: 'dismissed',\n        category: 'a2hs',\n        label: 'OS',\n        interaction: true\n      },\n      accepted: {\n        action: 'accepted',\n        category: 'a2hs',\n        label: 'OS',\n        interaction: true\n      },\n      denied: {\n        action: 'denied',\n        category: 'a2hs',\n        label: 'OS',\n        interaction: true\n      }\n    },\n    custom: {\n      dismissed: {\n        action: 'dismissed',\n        category: 'a2hs',\n        label: 'custom',\n        interaction: true\n      },\n      accepted: {\n        action: 'accepted',\n        category: 'a2hs',\n        label: 'custom',\n        interaction: true\n      },\n      denied: {\n        action: 'denied',\n        category: 'a2hs',\n        label: 'custom',\n        interaction: true\n      },\n      shown: {\n        action: 'shown',\n        category: 'a2hs',\n        label: 'custom',\n        interaction: false\n      }\n    },\n    install: {\n      action: 'install',\n      category: 'a2hs',\n      label: '',\n      interaction: true\n    },\n    launchedFromHS: {\n      action: 'launched',\n      category: 'a2hs',\n      label: '',\n      interaction: false\n    }\n  }\n}\nconst log = console.log;\n\nfunction trackConversion() {\n  gtag('event', 'purchase', {\n    \"transaction_id\": \"24.031608523954162\",\n    \"affiliation\": \"Google online store\",\n    \"value\": 23.07,\n    \"currency\": \"USD\",\n    \"tax\": 1.24,\n    \"shipping\": 0,\n    \"items\": [{\n        \"id\": \"P12345\",\n        \"name\": \"Android Warhol T-Shirt\",\n        \"list_name\": \"Search Results\",\n        \"brand\": \"Google\",\n        \"category\": \"Apparel/T-Shirts\",\n        \"variant\": \"Black\",\n        \"list_position\": 1,\n        \"quantity\": 2,\n        \"price\": '2.0'\n      },\n      {\n        \"id\": \"P67890\",\n        \"name\": \"Flame challenge TShirt\",\n        \"list_name\": \"Search Results\",\n        \"brand\": \"MyBrand\",\n        \"category\": \"Apparel/T-Shirts\",\n        \"variant\": \"Red\",\n        \"list_position\": 2,\n        \"quantity\": 1,\n        \"price\": '3.0'\n      }\n    ]\n  });\n}\n\nfunction sendEvent(event) {\n  log(`GA:sendEvent()`);\n  console.log(event);\n  window.gtag('event', event.action, {\n    'event_category': event.category,\n    'event_label': event.label\n  });\n}\n\nmodule.exports = {\n  EVENTS,\n  sendEvent,\n  trackConversion\n};\n\n//# sourceURL=webpack:///./src/ga.js?");

/***/ })

/******/ });