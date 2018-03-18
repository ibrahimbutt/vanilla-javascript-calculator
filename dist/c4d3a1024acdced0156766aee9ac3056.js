// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({5:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var operatorMap = {
  '^': {
    value: 3,
    association: 'right',
    operate: function operate(leftOperand, rightOperand) {
      return Math.pow(leftOperand, rightOperand);
    }
  },
  '×': {
    value: 3,
    association: 'left',
    operate: function operate(leftOperand, rightOperand) {
      return leftOperand * rightOperand;
    }
  },
  '÷': {
    value: 3,
    association: 'left',
    operate: function operate(leftOperand, rightOperand) {
      return leftOperand / rightOperand;
    }
  },
  '+': {
    value: 2,
    association: 'left',
    operate: function operate(leftOperand, rightOperand) {
      return Number(leftOperand) + Number(rightOperand);
    }
  },
  '-': {
    value: 2,
    association: 'left',
    operate: function operate(leftOperand, rightOperand) {
      return leftOperand - rightOperand;
    }
  },
  '(': {
    value: 5
  },
  ')': {
    value: 5
  }
};

var shuntingYard = function shuntingYard(userInput) {
  var outputQueue = [];
  var operatorStack = [];

  var isTopOfStackOperatorPrecedenceGreater = function isTopOfStackOperatorPrecedenceGreater(currentOperator) {
    var value = operatorStack.length < 1 ? 0 : operatorMap[operatorStack[operatorStack.length - 1]].value;
    return value > operatorMap[currentOperator].value;
  };

  var isTopOfStackOperatorPrecedenceEqualAndSameAssociation = function isTopOfStackOperatorPrecedenceEqualAndSameAssociation(currentOperator) {
    var value = operatorStack.length < 1 ? 0 : operatorMap[operatorStack[operatorStack.length - 1]].value;
    return value === operatorMap[currentOperator].value && operatorMap[currentOperator].association === 'left';
  };

  var operatorAtTopOfStackIsNotLeftBracket = function operatorAtTopOfStackIsNotLeftBracket() {
    return operatorStack[operatorStack.length - 1] !== '(';
  };

  userInput.forEach(function (token) {
    if (Number(token)) {
      outputQueue.push(token);
    } else if (operatorMap.hasOwnProperty(token) && token !== ')' && token !== '(') {
      while ((isTopOfStackOperatorPrecedenceGreater(token) || isTopOfStackOperatorPrecedenceEqualAndSameAssociation(token)) && operatorAtTopOfStackIsNotLeftBracket()) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token);
    } else if (token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      while (operatorAtTopOfStackIsNotLeftBracket()) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.pop();
    }
  });

  operatorStack.forEach(function () {
    outputQueue.push(operatorStack.pop());
  });

  return outputQueue;
};

var postfixCalculator = function postfixCalculator(outputQueue) {
  var stack = [];
  outputQueue.forEach(function (token) {
    if (Number(token)) {
      stack.push(token);
    } else {
      var rightOperand = stack.pop();
      var leftOperand = stack.pop();
      stack.push(operatorMap[token].operate(leftOperand, rightOperand));
    }
  });
  return stack[0].toString();
};

exports.shuntingYard = shuntingYard;
exports.postfixCalculator = postfixCalculator;
},{}],7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var view = {
  buttonAnimation: function buttonAnimation(buttonPressed) {
    buttonPressed.classList.add('active');
    setTimeout(function () {
      buttonPressed.classList.remove('active');
    }, 750);
  },
  updateChromaticEffect: function updateChromaticEffect(inputDisplay) {
    inputDisplay.setAttribute("node-content", inputDisplay.textContent);
  }
};

exports.default = view;
},{}],8:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var state = {
  operatorLastPressed: false,
  store: []
};

exports.default = state;
},{}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _calculate = require('./calculate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handlers = {
  clearAll: function clearAll(inputDisplay) {
    inputDisplay.innerText = 0;
    _state2.default.store = [];
    _state2.default.operatorLastPressed = false;
  },
  removeFormatting: function removeFormatting(input) {
    return input.includes('e') ? Number(input).toString() : input.replace(/,/g, '');
  },
  addFormatting: function addFormatting(input) {
    return input > 999999999 ? Number(input).toExponential(2).toString() : this.addCommas(input);
  },
  addCommas: function addCommas(input) {
    var inlcudesDecimal = false;
    var afterDecimalPortionOfValue = void 0;
    if (input.includes('.')) {
      afterDecimalPortionOfValue = input.split('').map(function (x) {
        if (x === '.') {
          inlcudesDecimal = true;
          return x;
        } else if (inlcudesDecimal) {
          return x;
        }
      }).join('');

      afterDecimalPortionOfValue = afterDecimalPortionOfValue === '.' ? '.' : Number(afterDecimalPortionOfValue).toFixed(afterDecimalPortionOfValue.length > 2 ? 2 : 1).toString().replace(/^0/, '');
    }

    var valueWithCommas = input
    // Remove portion after decimals
    .replace(/\..*/, '').split('').reverse().map(function (x, i) {
      return i % 3 === 0 ? x + ',' : x;
    }).reverse().join('')
    // Remove extra comma
    .slice(0, -1);

    return valueWithCommas + (afterDecimalPortionOfValue || '');
  },
  onDigitPress: function onDigitPress(input, buttonPressed) {
    if (input === '0' && buttonPressed !== '.' || _state2.default.operatorLastPressed) {
      _state2.default.operatorLastPressed = false;
      return buttonPressed;
    } else if (input === '0' && buttonPressed === '.') {
      console.log(123);
      _state2.default.operatorLastPressed = false;
      return '0.';
    } else if (buttonPressed === '.' && input.includes('.')) {
      return false;
    } else {
      _state2.default.operatorLastPressed = false;
      return input + buttonPressed;
    }
  },
  onOperatorPress: function onOperatorPress(input, buttonPressed) {
    if (input === '0') {
      return false;
    } else if (_state2.default.operatorLastPressed) {
      _state2.default.store.pop();
      _state2.default.store.push(buttonPressed);
    } else {
      _state2.default.store.push(input);
      var userInput = _state2.default.store;
      var outputQueue = (0, _calculate.shuntingYard)(userInput);
      _state2.default.store = [(0, _calculate.postfixCalculator)(outputQueue)];
      _state2.default.store.push(buttonPressed);
      _state2.default.operatorLastPressed = true;
      return _state2.default.store[0];
    }
  },
  onPlusMinusPress: function onPlusMinusPress(input) {
    return input > 0 ? '-' + input : input.replace(/^-/, '');
  },
  onPercentPress: function onPercentPress(input) {
    return (input / 100).toString();
  },
  calculateTotal: function calculateTotal(input) {
    _state2.default.store.push(input);
    console.log(_state2.default.store);
    var userInput = _state2.default.store;
    var outputQueue = (0, _calculate.shuntingYard)(userInput);
    _state2.default.store = [(0, _calculate.postfixCalculator)(outputQueue)];
    console.log(_state2.default.store[0]);
    return _state2.default.store[0];
  }
};

exports.default = handlers;
},{"./state":8,"./calculate":5}],3:[function(require,module,exports) {
'use strict';

var _calculate = require('./calculate');

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

var _handlers = require('./handlers');

var _handlers2 = _interopRequireDefault(_handlers);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inputDisplay = document.getElementById('calculator__display');

document.getElementById('calculator__bottom').addEventListener('click', function (e) {
  var buttonPressed = e.target.textContent;
  var currentInput = _handlers2.default.removeFormatting(inputDisplay.textContent);
  var newInput = void 0;

  if (Number(buttonPressed) || buttonPressed === '.' || buttonPressed === '0') {
    newInput = _handlers2.default.onDigitPress(currentInput, buttonPressed);
  } else if (buttonPressed === '+/-') {
    newInput = _handlers2.default.onPlusMinusPress(currentInput);
  } else if (buttonPressed === '%') {
    newInput = _handlers2.default.onPercentPress(currentInput);
  } else if (buttonPressed === 'AC') {
    _handlers2.default.clearAll(inputDisplay);
    newInput = '0';
  } else if (buttonPressed === '=') {
    newInput = _handlers2.default.calculateTotal(currentInput);
  } else {
    newInput = _handlers2.default.onOperatorPress(currentInput, buttonPressed) || currentInput;
  }
  inputDisplay.textContent = _handlers2.default.addFormatting(newInput);
  _view2.default.buttonAnimation(e.target);
  _view2.default.updateChromaticEffect(inputDisplay);
});
},{"./calculate":5,"./view":7,"./handlers":6,"./state":8}],10:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '51361' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[10,3])
//# sourceMappingURL=/dist/c4d3a1024acdced0156766aee9ac3056.map