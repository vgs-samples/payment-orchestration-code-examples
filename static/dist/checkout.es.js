var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __restKey = (key) => typeof key === "symbol" ? key : key + "";
var __objRest = (source2, exclude) => {
  var target = {};
  for (var prop in source2)
    if (__hasOwnProp.call(source2, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source2[prop];
  if (source2 != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source2)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source2, prop))
        target[prop] = source2[prop];
    }
  return target;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateWrapper = (obj, member, setter, getter) => {
  return {
    set _(value) {
      __privateSet(obj, member, value, setter);
    },
    get _() {
      return __privateGet(obj, member, getter);
    }
  };
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _emitter, _lastChannelId, _createChannelId, createChannelId_fn, _iframe, _iframeCommunication, _initParams, _cname, _getSubmitData, _updateLocalParams, _initParams2;
function getAugmentedNamespace(n2) {
  if (n2.__esModule)
    return n2;
  var a = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n2).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n2, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n2[k];
      }
    });
  });
  return a;
}
var shams = function hasSymbols() {
  if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
    return false;
  }
  if (typeof Symbol.iterator === "symbol") {
    return true;
  }
  var obj = {};
  var sym = Symbol("test");
  var symObj = Object(sym);
  if (typeof sym === "string") {
    return false;
  }
  if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
    return false;
  }
  if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
    return false;
  }
  var symVal = 42;
  obj[sym] = symVal;
  for (sym in obj) {
    return false;
  }
  if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
    return false;
  }
  if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
    return false;
  }
  var syms = Object.getOwnPropertySymbols(obj);
  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }
  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
    return false;
  }
  if (typeof Object.getOwnPropertyDescriptor === "function") {
    var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
      return false;
    }
  }
  return true;
};
var origSymbol = typeof Symbol !== "undefined" && Symbol;
var hasSymbolSham = shams;
var hasSymbols$1 = function hasNativeSymbols() {
  if (typeof origSymbol !== "function") {
    return false;
  }
  if (typeof Symbol !== "function") {
    return false;
  }
  if (typeof origSymbol("foo") !== "symbol") {
    return false;
  }
  if (typeof Symbol("bar") !== "symbol") {
    return false;
  }
  return hasSymbolSham();
};
var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
var slice = Array.prototype.slice;
var toStr$1 = Object.prototype.toString;
var funcType = "[object Function]";
var implementation$1 = function bind(that) {
  var target = this;
  if (typeof target !== "function" || toStr$1.call(target) !== funcType) {
    throw new TypeError(ERROR_MESSAGE + target);
  }
  var args = slice.call(arguments, 1);
  var bound;
  var binder = function() {
    if (this instanceof bound) {
      var result = target.apply(this, args.concat(slice.call(arguments)));
      if (Object(result) === result) {
        return result;
      }
      return this;
    } else {
      return target.apply(that, args.concat(slice.call(arguments)));
    }
  };
  var boundLength = Math.max(0, target.length - args.length);
  var boundArgs = [];
  for (var i = 0; i < boundLength; i++) {
    boundArgs.push("$" + i);
  }
  bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
  if (target.prototype) {
    var Empty = function Empty2() {
    };
    Empty.prototype = target.prototype;
    bound.prototype = new Empty();
    Empty.prototype = null;
  }
  return bound;
};
var implementation = implementation$1;
var functionBind = Function.prototype.bind || implementation;
var bind$4 = functionBind;
var src = bind$4.call(Function.call, Object.prototype.hasOwnProperty);
var undefined$1;
var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError$1 = TypeError;
var getEvalledConstructor = function(expressionSyntax) {
  try {
    return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
  } catch (e2) {
  }
};
var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
  try {
    $gOPD({}, "");
  } catch (e2) {
    $gOPD = null;
  }
}
var throwTypeError = function() {
  throw new $TypeError$1();
};
var ThrowTypeError = $gOPD ? function() {
  try {
    arguments.callee;
    return throwTypeError;
  } catch (calleeThrows) {
    try {
      return $gOPD(arguments, "callee").get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() : throwTypeError;
var hasSymbols2 = hasSymbols$1();
var getProto = Object.getPrototypeOf || function(x) {
  return x.__proto__;
};
var needsEval = {};
var TypedArray = typeof Uint8Array === "undefined" ? undefined$1 : getProto(Uint8Array);
var INTRINSICS = {
  "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
  "%ArrayIteratorPrototype%": hasSymbols2 ? getProto([][Symbol.iterator]()) : undefined$1,
  "%AsyncFromSyncIteratorPrototype%": undefined$1,
  "%AsyncFunction%": needsEval,
  "%AsyncGenerator%": needsEval,
  "%AsyncGeneratorFunction%": needsEval,
  "%AsyncIteratorPrototype%": needsEval,
  "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
  "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Error,
  "%eval%": eval,
  "%EvalError%": EvalError,
  "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
  "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
  "%Function%": $Function,
  "%GeneratorFunction%": needsEval,
  "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
  "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
  "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": hasSymbols2 ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
  "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
  "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
  "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols2 ? undefined$1 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
  "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
  "%RangeError%": RangeError,
  "%ReferenceError%": ReferenceError,
  "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
  "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols2 ? undefined$1 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": hasSymbols2 ? getProto(""[Symbol.iterator]()) : undefined$1,
  "%Symbol%": hasSymbols2 ? Symbol : undefined$1,
  "%SyntaxError%": $SyntaxError,
  "%ThrowTypeError%": ThrowTypeError,
  "%TypedArray%": TypedArray,
  "%TypeError%": $TypeError$1,
  "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
  "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
  "%URIError%": URIError,
  "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
  "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
  "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet
};
var doEval = function doEval2(name) {
  var value;
  if (name === "%AsyncFunction%") {
    value = getEvalledConstructor("async function () {}");
  } else if (name === "%GeneratorFunction%") {
    value = getEvalledConstructor("function* () {}");
  } else if (name === "%AsyncGeneratorFunction%") {
    value = getEvalledConstructor("async function* () {}");
  } else if (name === "%AsyncGenerator%") {
    var fn = doEval2("%AsyncGeneratorFunction%");
    if (fn) {
      value = fn.prototype;
    }
  } else if (name === "%AsyncIteratorPrototype%") {
    var gen = doEval2("%AsyncGenerator%");
    if (gen) {
      value = getProto(gen.prototype);
    }
  }
  INTRINSICS[name] = value;
  return value;
};
var LEGACY_ALIASES = {
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
};
var bind$3 = functionBind;
var hasOwn$1 = src;
var $concat = bind$3.call(Function.call, Array.prototype.concat);
var $spliceApply = bind$3.call(Function.apply, Array.prototype.splice);
var $replace = bind$3.call(Function.call, String.prototype.replace);
var $strSlice = bind$3.call(Function.call, String.prototype.slice);
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = function stringToPath2(string2) {
  var first = $strSlice(string2, 0, 1);
  var last = $strSlice(string2, -1);
  if (first === "%" && last !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
  } else if (last === "%" && first !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
  }
  var result = [];
  $replace(string2, rePropName, function(match2, number2, quote2, subString) {
    result[result.length] = quote2 ? $replace(subString, reEscapeChar, "$1") : number2 || match2;
  });
  return result;
};
var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
  var intrinsicName = name;
  var alias;
  if (hasOwn$1(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName];
    intrinsicName = "%" + alias[0] + "%";
  }
  if (hasOwn$1(INTRINSICS, intrinsicName)) {
    var value = INTRINSICS[intrinsicName];
    if (value === needsEval) {
      value = doEval(intrinsicName);
    }
    if (typeof value === "undefined" && !allowMissing) {
      throw new $TypeError$1("intrinsic " + name + " exists, but is not available. Please file an issue!");
    }
    return {
      alias,
      name: intrinsicName,
      value
    };
  }
  throw new $SyntaxError("intrinsic " + name + " does not exist!");
};
var getIntrinsic = function GetIntrinsic(name, allowMissing) {
  if (typeof name !== "string" || name.length === 0) {
    throw new $TypeError$1("intrinsic name must be a non-empty string");
  }
  if (arguments.length > 1 && typeof allowMissing !== "boolean") {
    throw new $TypeError$1('"allowMissing" argument must be a boolean');
  }
  var parts = stringToPath(name);
  var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
  var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
  var intrinsicRealName = intrinsic.name;
  var value = intrinsic.value;
  var skipFurtherCaching = false;
  var alias = intrinsic.alias;
  if (alias) {
    intrinsicBaseName = alias[0];
    $spliceApply(parts, $concat([0, 1], alias));
  }
  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
    var part = parts[i];
    var first = $strSlice(part, 0, 1);
    var last = $strSlice(part, -1);
    if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
      throw new $SyntaxError("property names with quotes must have matching quotes");
    }
    if (part === "constructor" || !isOwn) {
      skipFurtherCaching = true;
    }
    intrinsicBaseName += "." + part;
    intrinsicRealName = "%" + intrinsicBaseName + "%";
    if (hasOwn$1(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName];
    } else if (value != null) {
      if (!(part in value)) {
        if (!allowMissing) {
          throw new $TypeError$1("base intrinsic for " + name + " exists, but the property is not available.");
        }
        return void 0;
      }
      if ($gOPD && i + 1 >= parts.length) {
        var desc = $gOPD(value, part);
        isOwn = !!desc;
        if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
          value = desc.get;
        } else {
          value = value[part];
        }
      } else {
        isOwn = hasOwn$1(value, part);
        value = value[part];
      }
      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value;
      }
    }
  }
  return value;
};
var callBind$1 = { exports: {} };
(function(module) {
  var bind4 = functionBind;
  var GetIntrinsic3 = getIntrinsic;
  var $apply = GetIntrinsic3("%Function.prototype.apply%");
  var $call = GetIntrinsic3("%Function.prototype.call%");
  var $reflectApply = GetIntrinsic3("%Reflect.apply%", true) || bind4.call($call, $apply);
  var $gOPD2 = GetIntrinsic3("%Object.getOwnPropertyDescriptor%", true);
  var $defineProperty = GetIntrinsic3("%Object.defineProperty%", true);
  var $max = GetIntrinsic3("%Math.max%");
  if ($defineProperty) {
    try {
      $defineProperty({}, "a", { value: 1 });
    } catch (e2) {
      $defineProperty = null;
    }
  }
  module.exports = function callBind2(originalFunction) {
    var func = $reflectApply(bind4, $call, arguments);
    if ($gOPD2 && $defineProperty) {
      var desc = $gOPD2(func, "length");
      if (desc.configurable) {
        $defineProperty(func, "length", { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) });
      }
    }
    return func;
  };
  var applyBind = function applyBind2() {
    return $reflectApply(bind4, $apply, arguments);
  };
  if ($defineProperty) {
    $defineProperty(module.exports, "apply", { value: applyBind });
  } else {
    module.exports.apply = applyBind;
  }
})(callBind$1);
var GetIntrinsic$1 = getIntrinsic;
var callBind = callBind$1.exports;
var $indexOf = callBind(GetIntrinsic$1("String.prototype.indexOf"));
var callBound$1 = function callBoundIntrinsic(name, allowMissing) {
  var intrinsic = GetIntrinsic$1(name, !!allowMissing);
  if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
    return callBind(intrinsic);
  }
  return intrinsic;
};
var __viteBrowserExternal = {};
var __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": __viteBrowserExternal
});
var require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var hasMap = typeof Map === "function" && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === "function" && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var match = String.prototype.match;
var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
var isEnumerable = Object.prototype.propertyIsEnumerable;
var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
  return O.__proto__;
} : null);
var inspectCustom = require$$0.custom;
var inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;
var toStringTag = typeof Symbol === "function" && typeof Symbol.toStringTag !== "undefined" ? Symbol.toStringTag : null;
var objectInspect = function inspect_(obj, options, depth, seen) {
  var opts = options || {};
  if (has$3(opts, "quoteStyle") && (opts.quoteStyle !== "single" && opts.quoteStyle !== "double")) {
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  }
  if (has$3(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  }
  var customInspect = has$3(opts, "customInspect") ? opts.customInspect : true;
  if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  }
  if (has$3(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
    throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
  }
  if (typeof obj === "undefined") {
    return "undefined";
  }
  if (obj === null) {
    return "null";
  }
  if (typeof obj === "boolean") {
    return obj ? "true" : "false";
  }
  if (typeof obj === "string") {
    return inspectString(obj, opts);
  }
  if (typeof obj === "number") {
    if (obj === 0) {
      return Infinity / obj > 0 ? "0" : "-0";
    }
    return String(obj);
  }
  if (typeof obj === "bigint") {
    return String(obj) + "n";
  }
  var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
  if (typeof depth === "undefined") {
    depth = 0;
  }
  if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
    return isArray$4(obj) ? "[Array]" : "[Object]";
  }
  var indent = getIndent(opts, depth);
  if (typeof seen === "undefined") {
    seen = [];
  } else if (indexOf(seen, obj) >= 0) {
    return "[Circular]";
  }
  function inspect2(value, from, noIndent) {
    if (from) {
      seen = seen.slice();
      seen.push(from);
    }
    if (noIndent) {
      var newOpts = {
        depth: opts.depth
      };
      if (has$3(opts, "quoteStyle")) {
        newOpts.quoteStyle = opts.quoteStyle;
      }
      return inspect_(value, newOpts, depth + 1, seen);
    }
    return inspect_(value, opts, depth + 1, seen);
  }
  if (typeof obj === "function") {
    var name = nameOf(obj);
    var keys = arrObjKeys(obj, inspect2);
    return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + keys.join(", ") + " }" : "");
  }
  if (isSymbol(obj)) {
    var symString = hasShammedSymbols ? String(obj).replace(/^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
    return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
  }
  if (isElement(obj)) {
    var s = "<" + String(obj.nodeName).toLowerCase();
    var attrs = obj.attributes || [];
    for (var i = 0; i < attrs.length; i++) {
      s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
    }
    s += ">";
    if (obj.childNodes && obj.childNodes.length) {
      s += "...";
    }
    s += "</" + String(obj.nodeName).toLowerCase() + ">";
    return s;
  }
  if (isArray$4(obj)) {
    if (obj.length === 0) {
      return "[]";
    }
    var xs = arrObjKeys(obj, inspect2);
    if (indent && !singleLineValues(xs)) {
      return "[" + indentedJoin(xs, indent) + "]";
    }
    return "[ " + xs.join(", ") + " ]";
  }
  if (isError(obj)) {
    var parts = arrObjKeys(obj, inspect2);
    if (parts.length === 0) {
      return "[" + String(obj) + "]";
    }
    return "{ [" + String(obj) + "] " + parts.join(", ") + " }";
  }
  if (typeof obj === "object" && customInspect) {
    if (inspectSymbol && typeof obj[inspectSymbol] === "function") {
      return obj[inspectSymbol]();
    } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
      return obj.inspect();
    }
  }
  if (isMap(obj)) {
    var mapParts = [];
    mapForEach.call(obj, function(value, key) {
      mapParts.push(inspect2(key, obj, true) + " => " + inspect2(value, obj));
    });
    return collectionOf("Map", mapSize.call(obj), mapParts, indent);
  }
  if (isSet(obj)) {
    var setParts = [];
    setForEach.call(obj, function(value) {
      setParts.push(inspect2(value, obj));
    });
    return collectionOf("Set", setSize.call(obj), setParts, indent);
  }
  if (isWeakMap(obj)) {
    return weakCollectionOf("WeakMap");
  }
  if (isWeakSet(obj)) {
    return weakCollectionOf("WeakSet");
  }
  if (isWeakRef(obj)) {
    return weakCollectionOf("WeakRef");
  }
  if (isNumber$1(obj)) {
    return markBoxed(inspect2(Number(obj)));
  }
  if (isBigInt(obj)) {
    return markBoxed(inspect2(bigIntValueOf.call(obj)));
  }
  if (isBoolean(obj)) {
    return markBoxed(booleanValueOf.call(obj));
  }
  if (isString$2(obj)) {
    return markBoxed(inspect2(String(obj)));
  }
  if (!isDate$1(obj) && !isRegExp$1(obj)) {
    var ys = arrObjKeys(obj, inspect2);
    var isPlainObject2 = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
    var protoTag = obj instanceof Object ? "" : "null prototype";
    var stringTag = !isPlainObject2 && toStringTag && Object(obj) === obj && toStringTag in obj ? toStr(obj).slice(8, -1) : protoTag ? "Object" : "";
    var constructorTag = isPlainObject2 || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
    var tag = constructorTag + (stringTag || protoTag ? "[" + [].concat(stringTag || [], protoTag || []).join(": ") + "] " : "");
    if (ys.length === 0) {
      return tag + "{}";
    }
    if (indent) {
      return tag + "{" + indentedJoin(ys, indent) + "}";
    }
    return tag + "{ " + ys.join(", ") + " }";
  }
  return String(obj);
};
function wrapQuotes(s, defaultStyle, opts) {
  var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
  return quoteChar + s + quoteChar;
}
function quote(s) {
  return String(s).replace(/"/g, "&quot;");
}
function isArray$4(obj) {
  return toStr(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isDate$1(obj) {
  return toStr(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isRegExp$1(obj) {
  return toStr(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isError(obj) {
  return toStr(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isString$2(obj) {
  return toStr(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isNumber$1(obj) {
  return toStr(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isBoolean(obj) {
  return toStr(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isSymbol(obj) {
  if (hasShammedSymbols) {
    return obj && typeof obj === "object" && obj instanceof Symbol;
  }
  if (typeof obj === "symbol") {
    return true;
  }
  if (!obj || typeof obj !== "object" || !symToString) {
    return false;
  }
  try {
    symToString.call(obj);
    return true;
  } catch (e2) {
  }
  return false;
}
function isBigInt(obj) {
  if (!obj || typeof obj !== "object" || !bigIntValueOf) {
    return false;
  }
  try {
    bigIntValueOf.call(obj);
    return true;
  } catch (e2) {
  }
  return false;
}
var hasOwn = Object.prototype.hasOwnProperty || function(key) {
  return key in this;
};
function has$3(obj, key) {
  return hasOwn.call(obj, key);
}
function toStr(obj) {
  return objectToString.call(obj);
}
function nameOf(f) {
  if (f.name) {
    return f.name;
  }
  var m = match.call(functionToString.call(f), /^function\s*([\w$]+)/);
  if (m) {
    return m[1];
  }
  return null;
}
function indexOf(xs, x) {
  if (xs.indexOf) {
    return xs.indexOf(x);
  }
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) {
      return i;
    }
  }
  return -1;
}
function isMap(x) {
  if (!mapSize || !x || typeof x !== "object") {
    return false;
  }
  try {
    mapSize.call(x);
    try {
      setSize.call(x);
    } catch (s) {
      return true;
    }
    return x instanceof Map;
  } catch (e2) {
  }
  return false;
}
function isWeakMap(x) {
  if (!weakMapHas || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakMapHas.call(x, weakMapHas);
    try {
      weakSetHas.call(x, weakSetHas);
    } catch (s) {
      return true;
    }
    return x instanceof WeakMap;
  } catch (e2) {
  }
  return false;
}
function isWeakRef(x) {
  if (!weakRefDeref || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakRefDeref.call(x);
    return true;
  } catch (e2) {
  }
  return false;
}
function isSet(x) {
  if (!setSize || !x || typeof x !== "object") {
    return false;
  }
  try {
    setSize.call(x);
    try {
      mapSize.call(x);
    } catch (m) {
      return true;
    }
    return x instanceof Set;
  } catch (e2) {
  }
  return false;
}
function isWeakSet(x) {
  if (!weakSetHas || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakSetHas.call(x, weakSetHas);
    try {
      weakMapHas.call(x, weakMapHas);
    } catch (s) {
      return true;
    }
    return x instanceof WeakSet;
  } catch (e2) {
  }
  return false;
}
function isElement(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
    return true;
  }
  return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
}
function inspectString(str, opts) {
  if (str.length > opts.maxStringLength) {
    var remaining = str.length - opts.maxStringLength;
    var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
    return inspectString(str.slice(0, opts.maxStringLength), opts) + trailer;
  }
  var s = str.replace(/(['\\])/g, "\\$1").replace(/[\x00-\x1f]/g, lowbyte);
  return wrapQuotes(s, "single", opts);
}
function lowbyte(c) {
  var n2 = c.charCodeAt(0);
  var x = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[n2];
  if (x) {
    return "\\" + x;
  }
  return "\\x" + (n2 < 16 ? "0" : "") + n2.toString(16).toUpperCase();
}
function markBoxed(str) {
  return "Object(" + str + ")";
}
function weakCollectionOf(type2) {
  return type2 + " { ? }";
}
function collectionOf(type2, size, entries, indent) {
  var joinedEntries = indent ? indentedJoin(entries, indent) : entries.join(", ");
  return type2 + " (" + size + ") {" + joinedEntries + "}";
}
function singleLineValues(xs) {
  for (var i = 0; i < xs.length; i++) {
    if (indexOf(xs[i], "\n") >= 0) {
      return false;
    }
  }
  return true;
}
function getIndent(opts, depth) {
  var baseIndent;
  if (opts.indent === "	") {
    baseIndent = "	";
  } else if (typeof opts.indent === "number" && opts.indent > 0) {
    baseIndent = Array(opts.indent + 1).join(" ");
  } else {
    return null;
  }
  return {
    base: baseIndent,
    prev: Array(depth + 1).join(baseIndent)
  };
}
function indentedJoin(xs, indent) {
  if (xs.length === 0) {
    return "";
  }
  var lineJoiner = "\n" + indent.prev + indent.base;
  return lineJoiner + xs.join("," + lineJoiner) + "\n" + indent.prev;
}
function arrObjKeys(obj, inspect2) {
  var isArr = isArray$4(obj);
  var xs = [];
  if (isArr) {
    xs.length = obj.length;
    for (var i = 0; i < obj.length; i++) {
      xs[i] = has$3(obj, i) ? inspect2(obj[i], obj) : "";
    }
  }
  var syms = typeof gOPS === "function" ? gOPS(obj) : [];
  var symMap;
  if (hasShammedSymbols) {
    symMap = {};
    for (var k = 0; k < syms.length; k++) {
      symMap["$" + syms[k]] = syms[k];
    }
  }
  for (var key in obj) {
    if (!has$3(obj, key)) {
      continue;
    }
    if (isArr && String(Number(key)) === key && key < obj.length) {
      continue;
    }
    if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
      continue;
    } else if (/[^\w$]/.test(key)) {
      xs.push(inspect2(key, obj) + ": " + inspect2(obj[key], obj));
    } else {
      xs.push(key + ": " + inspect2(obj[key], obj));
    }
  }
  if (typeof gOPS === "function") {
    for (var j = 0; j < syms.length; j++) {
      if (isEnumerable.call(obj, syms[j])) {
        xs.push("[" + inspect2(syms[j]) + "]: " + inspect2(obj[syms[j]], obj));
      }
    }
  }
  return xs;
}
var GetIntrinsic2 = getIntrinsic;
var callBound = callBound$1;
var inspect = objectInspect;
var $TypeError = GetIntrinsic2("%TypeError%");
var $WeakMap = GetIntrinsic2("%WeakMap%", true);
var $Map = GetIntrinsic2("%Map%", true);
var $weakMapGet = callBound("WeakMap.prototype.get", true);
var $weakMapSet = callBound("WeakMap.prototype.set", true);
var $weakMapHas = callBound("WeakMap.prototype.has", true);
var $mapGet = callBound("Map.prototype.get", true);
var $mapSet = callBound("Map.prototype.set", true);
var $mapHas = callBound("Map.prototype.has", true);
var listGetNode = function(list, key) {
  for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
    if (curr.key === key) {
      prev.next = curr.next;
      curr.next = list.next;
      list.next = curr;
      return curr;
    }
  }
};
var listGet = function(objects, key) {
  var node = listGetNode(objects, key);
  return node && node.value;
};
var listSet = function(objects, key, value) {
  var node = listGetNode(objects, key);
  if (node) {
    node.value = value;
  } else {
    objects.next = {
      key,
      next: objects.next,
      value
    };
  }
};
var listHas = function(objects, key) {
  return !!listGetNode(objects, key);
};
var sideChannel = function getSideChannel() {
  var $wm;
  var $m;
  var $o;
  var channel = {
    assert: function(key) {
      if (!channel.has(key)) {
        throw new $TypeError("Side channel does not contain " + inspect(key));
      }
    },
    get: function(key) {
      if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
        if ($wm) {
          return $weakMapGet($wm, key);
        }
      } else if ($Map) {
        if ($m) {
          return $mapGet($m, key);
        }
      } else {
        if ($o) {
          return listGet($o, key);
        }
      }
    },
    has: function(key) {
      if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
        if ($wm) {
          return $weakMapHas($wm, key);
        }
      } else if ($Map) {
        if ($m) {
          return $mapHas($m, key);
        }
      } else {
        if ($o) {
          return listHas($o, key);
        }
      }
      return false;
    },
    set: function(key, value) {
      if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
        if (!$wm) {
          $wm = new $WeakMap();
        }
        $weakMapSet($wm, key, value);
      } else if ($Map) {
        if (!$m) {
          $m = new $Map();
        }
        $mapSet($m, key, value);
      } else {
        if (!$o) {
          $o = { key: {}, next: null };
        }
        listSet($o, key, value);
      }
    }
  };
  return channel;
};
var replace = String.prototype.replace;
var percentTwenties = /%20/g;
var Format = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
};
var formats$3 = {
  "default": Format.RFC3986,
  formatters: {
    RFC1738: function(value) {
      return replace.call(value, percentTwenties, "+");
    },
    RFC3986: function(value) {
      return String(value);
    }
  },
  RFC1738: Format.RFC1738,
  RFC3986: Format.RFC3986
};
var formats$2 = formats$3;
var has$2 = Object.prototype.hasOwnProperty;
var isArray$3 = Array.isArray;
var hexTable = function() {
  var array2 = [];
  for (var i = 0; i < 256; ++i) {
    array2.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
  }
  return array2;
}();
var compactQueue = function compactQueue2(queue) {
  while (queue.length > 1) {
    var item = queue.pop();
    var obj = item.obj[item.prop];
    if (isArray$3(obj)) {
      var compacted = [];
      for (var j = 0; j < obj.length; ++j) {
        if (typeof obj[j] !== "undefined") {
          compacted.push(obj[j]);
        }
      }
      item.obj[item.prop] = compacted;
    }
  }
};
var arrayToObject = function arrayToObject2(source2, options) {
  var obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var i = 0; i < source2.length; ++i) {
    if (typeof source2[i] !== "undefined") {
      obj[i] = source2[i];
    }
  }
  return obj;
};
var merge$2 = function merge(target, source2, options) {
  if (!source2) {
    return target;
  }
  if (typeof source2 !== "object") {
    if (isArray$3(target)) {
      target.push(source2);
    } else if (target && typeof target === "object") {
      if (options && (options.plainObjects || options.allowPrototypes) || !has$2.call(Object.prototype, source2)) {
        target[source2] = true;
      }
    } else {
      return [target, source2];
    }
    return target;
  }
  if (!target || typeof target !== "object") {
    return [target].concat(source2);
  }
  var mergeTarget = target;
  if (isArray$3(target) && !isArray$3(source2)) {
    mergeTarget = arrayToObject(target, options);
  }
  if (isArray$3(target) && isArray$3(source2)) {
    source2.forEach(function(item, i) {
      if (has$2.call(target, i)) {
        var targetItem = target[i];
        if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
          target[i] = merge(targetItem, item, options);
        } else {
          target.push(item);
        }
      } else {
        target[i] = item;
      }
    });
    return target;
  }
  return Object.keys(source2).reduce(function(acc, key) {
    var value = source2[key];
    if (has$2.call(acc, key)) {
      acc[key] = merge(acc[key], value, options);
    } else {
      acc[key] = value;
    }
    return acc;
  }, mergeTarget);
};
var assign = function assignSingleSource(target, source2) {
  return Object.keys(source2).reduce(function(acc, key) {
    acc[key] = source2[key];
    return acc;
  }, target);
};
var decode = function(str, decoder, charset) {
  var strWithoutPlus = str.replace(/\+/g, " ");
  if (charset === "iso-8859-1") {
    return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
  }
  try {
    return decodeURIComponent(strWithoutPlus);
  } catch (e2) {
    return strWithoutPlus;
  }
};
var encode$1 = function encode(str, defaultEncoder, charset, kind, format) {
  if (str.length === 0) {
    return str;
  }
  var string2 = str;
  if (typeof str === "symbol") {
    string2 = Symbol.prototype.toString.call(str);
  } else if (typeof str !== "string") {
    string2 = String(str);
  }
  if (charset === "iso-8859-1") {
    return escape(string2).replace(/%u[0-9a-f]{4}/gi, function($0) {
      return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
    });
  }
  var out = "";
  for (var i = 0; i < string2.length; ++i) {
    var c = string2.charCodeAt(i);
    if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats$2.RFC1738 && (c === 40 || c === 41)) {
      out += string2.charAt(i);
      continue;
    }
    if (c < 128) {
      out = out + hexTable[c];
      continue;
    }
    if (c < 2048) {
      out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
      continue;
    }
    if (c < 55296 || c >= 57344) {
      out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
      continue;
    }
    i += 1;
    c = 65536 + ((c & 1023) << 10 | string2.charCodeAt(i) & 1023);
    out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
  }
  return out;
};
var compact = function compact2(value) {
  var queue = [{ obj: { o: value }, prop: "o" }];
  var refs = [];
  for (var i = 0; i < queue.length; ++i) {
    var item = queue[i];
    var obj = item.obj[item.prop];
    var keys = Object.keys(obj);
    for (var j = 0; j < keys.length; ++j) {
      var key = keys[j];
      var val = obj[key];
      if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
        queue.push({ obj, prop: key });
        refs.push(val);
      }
    }
  }
  compactQueue(queue);
  return value;
};
var isRegExp = function isRegExp2(obj) {
  return Object.prototype.toString.call(obj) === "[object RegExp]";
};
var isBuffer$1 = function isBuffer(obj) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};
var combine = function combine2(a, b) {
  return [].concat(a, b);
};
var maybeMap = function maybeMap2(val, fn) {
  if (isArray$3(val)) {
    var mapped = [];
    for (var i = 0; i < val.length; i += 1) {
      mapped.push(fn(val[i]));
    }
    return mapped;
  }
  return fn(val);
};
var utils$i = {
  arrayToObject,
  assign,
  combine,
  compact,
  decode,
  encode: encode$1,
  isBuffer: isBuffer$1,
  isRegExp,
  maybeMap,
  merge: merge$2
};
var getSideChannel2 = sideChannel;
var utils$h = utils$i;
var formats$1 = formats$3;
var has$1 = Object.prototype.hasOwnProperty;
var arrayPrefixGenerators = {
  brackets: function brackets(prefix) {
    return prefix + "[]";
  },
  comma: "comma",
  indices: function indices(prefix, key) {
    return prefix + "[" + key + "]";
  },
  repeat: function repeat(prefix) {
    return prefix;
  }
};
var isArray$2 = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function(arr, valueOrArray) {
  push.apply(arr, isArray$2(valueOrArray) ? valueOrArray : [valueOrArray]);
};
var toISO = Date.prototype.toISOString;
var defaultFormat = formats$1["default"];
var defaults$6 = {
  addQueryPrefix: false,
  allowDots: false,
  charset: "utf-8",
  charsetSentinel: false,
  delimiter: "&",
  encode: true,
  encoder: utils$h.encode,
  encodeValuesOnly: false,
  format: defaultFormat,
  formatter: formats$1.formatters[defaultFormat],
  indices: false,
  serializeDate: function serializeDate(date) {
    return toISO.call(date);
  },
  skipNulls: false,
  strictNullHandling: false
};
var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
  return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
};
var stringify$1 = function stringify(object2, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate2, format, formatter, encodeValuesOnly, charset, sideChannel2) {
  var obj = object2;
  if (sideChannel2.has(object2)) {
    throw new RangeError("Cyclic object value");
  }
  if (typeof filter === "function") {
    obj = filter(prefix, obj);
  } else if (obj instanceof Date) {
    obj = serializeDate2(obj);
  } else if (generateArrayPrefix === "comma" && isArray$2(obj)) {
    obj = utils$h.maybeMap(obj, function(value2) {
      if (value2 instanceof Date) {
        return serializeDate2(value2);
      }
      return value2;
    });
  }
  if (obj === null) {
    if (strictNullHandling) {
      return encoder && !encodeValuesOnly ? encoder(prefix, defaults$6.encoder, charset, "key", format) : prefix;
    }
    obj = "";
  }
  if (isNonNullishPrimitive(obj) || utils$h.isBuffer(obj)) {
    if (encoder) {
      var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults$6.encoder, charset, "key", format);
      return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults$6.encoder, charset, "value", format))];
    }
    return [formatter(prefix) + "=" + formatter(String(obj))];
  }
  var values = [];
  if (typeof obj === "undefined") {
    return values;
  }
  var objKeys;
  if (generateArrayPrefix === "comma" && isArray$2(obj)) {
    objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
  } else if (isArray$2(filter)) {
    objKeys = filter;
  } else {
    var keys = Object.keys(obj);
    objKeys = sort ? keys.sort(sort) : keys;
  }
  for (var i = 0; i < objKeys.length; ++i) {
    var key = objKeys[i];
    var value = typeof key === "object" && key.value !== void 0 ? key.value : obj[key];
    if (skipNulls && value === null) {
      continue;
    }
    var keyPrefix = isArray$2(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(prefix, key) : prefix : prefix + (allowDots ? "." + key : "[" + key + "]");
    sideChannel2.set(object2, true);
    var valueSideChannel = getSideChannel2();
    pushToArray(values, stringify(value, keyPrefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate2, format, formatter, encodeValuesOnly, charset, valueSideChannel));
  }
  return values;
};
var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
  if (!opts) {
    return defaults$6;
  }
  if (opts.encoder !== null && opts.encoder !== void 0 && typeof opts.encoder !== "function") {
    throw new TypeError("Encoder has to be a function.");
  }
  var charset = opts.charset || defaults$6.charset;
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  var format = formats$1["default"];
  if (typeof opts.format !== "undefined") {
    if (!has$1.call(formats$1.formatters, opts.format)) {
      throw new TypeError("Unknown format option provided.");
    }
    format = opts.format;
  }
  var formatter = formats$1.formatters[format];
  var filter = defaults$6.filter;
  if (typeof opts.filter === "function" || isArray$2(opts.filter)) {
    filter = opts.filter;
  }
  return {
    addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults$6.addQueryPrefix,
    allowDots: typeof opts.allowDots === "undefined" ? defaults$6.allowDots : !!opts.allowDots,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults$6.charsetSentinel,
    delimiter: typeof opts.delimiter === "undefined" ? defaults$6.delimiter : opts.delimiter,
    encode: typeof opts.encode === "boolean" ? opts.encode : defaults$6.encode,
    encoder: typeof opts.encoder === "function" ? opts.encoder : defaults$6.encoder,
    encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults$6.encodeValuesOnly,
    filter,
    format,
    formatter,
    serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults$6.serializeDate,
    skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults$6.skipNulls,
    sort: typeof opts.sort === "function" ? opts.sort : null,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults$6.strictNullHandling
  };
};
var stringify_1 = function(object2, opts) {
  var obj = object2;
  var options = normalizeStringifyOptions(opts);
  var objKeys;
  var filter;
  if (typeof options.filter === "function") {
    filter = options.filter;
    obj = filter("", obj);
  } else if (isArray$2(options.filter)) {
    filter = options.filter;
    objKeys = filter;
  }
  var keys = [];
  if (typeof obj !== "object" || obj === null) {
    return "";
  }
  var arrayFormat;
  if (opts && opts.arrayFormat in arrayPrefixGenerators) {
    arrayFormat = opts.arrayFormat;
  } else if (opts && "indices" in opts) {
    arrayFormat = opts.indices ? "indices" : "repeat";
  } else {
    arrayFormat = "indices";
  }
  var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
  if (!objKeys) {
    objKeys = Object.keys(obj);
  }
  if (options.sort) {
    objKeys.sort(options.sort);
  }
  var sideChannel2 = getSideChannel2();
  for (var i = 0; i < objKeys.length; ++i) {
    var key = objKeys[i];
    if (options.skipNulls && obj[key] === null) {
      continue;
    }
    pushToArray(keys, stringify$1(obj[key], key, generateArrayPrefix, options.strictNullHandling, options.skipNulls, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.format, options.formatter, options.encodeValuesOnly, options.charset, sideChannel2));
  }
  var joined = keys.join(options.delimiter);
  var prefix = options.addQueryPrefix === true ? "?" : "";
  if (options.charsetSentinel) {
    if (options.charset === "iso-8859-1") {
      prefix += "utf8=%26%2310003%3B&";
    } else {
      prefix += "utf8=%E2%9C%93&";
    }
  }
  return joined.length > 0 ? prefix + joined : "";
};
var utils$g = utils$i;
var has = Object.prototype.hasOwnProperty;
var isArray$1 = Array.isArray;
var defaults$5 = {
  allowDots: false,
  allowPrototypes: false,
  allowSparse: false,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: false,
  comma: false,
  decoder: utils$g.decode,
  delimiter: "&",
  depth: 5,
  ignoreQueryPrefix: false,
  interpretNumericEntities: false,
  parameterLimit: 1e3,
  parseArrays: true,
  plainObjects: false,
  strictNullHandling: false
};
var interpretNumericEntities = function(str) {
  return str.replace(/&#(\d+);/g, function($0, numberStr) {
    return String.fromCharCode(parseInt(numberStr, 10));
  });
};
var parseArrayValue = function(val, options) {
  if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
    return val.split(",");
  }
  return val;
};
var isoSentinel = "utf8=%26%2310003%3B";
var charsetSentinel = "utf8=%E2%9C%93";
var parseValues = function parseQueryStringValues(str, options) {
  var obj = {};
  var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
  var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
  var parts = cleanStr.split(options.delimiter, limit);
  var skipIndex = -1;
  var i;
  var charset = options.charset;
  if (options.charsetSentinel) {
    for (i = 0; i < parts.length; ++i) {
      if (parts[i].indexOf("utf8=") === 0) {
        if (parts[i] === charsetSentinel) {
          charset = "utf-8";
        } else if (parts[i] === isoSentinel) {
          charset = "iso-8859-1";
        }
        skipIndex = i;
        i = parts.length;
      }
    }
  }
  for (i = 0; i < parts.length; ++i) {
    if (i === skipIndex) {
      continue;
    }
    var part = parts[i];
    var bracketEqualsPos = part.indexOf("]=");
    var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
    var key, val;
    if (pos === -1) {
      key = options.decoder(part, defaults$5.decoder, charset, "key");
      val = options.strictNullHandling ? null : "";
    } else {
      key = options.decoder(part.slice(0, pos), defaults$5.decoder, charset, "key");
      val = utils$g.maybeMap(parseArrayValue(part.slice(pos + 1), options), function(encodedVal) {
        return options.decoder(encodedVal, defaults$5.decoder, charset, "value");
      });
    }
    if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
      val = interpretNumericEntities(val);
    }
    if (part.indexOf("[]=") > -1) {
      val = isArray$1(val) ? [val] : val;
    }
    if (has.call(obj, key)) {
      obj[key] = utils$g.combine(obj[key], val);
    } else {
      obj[key] = val;
    }
  }
  return obj;
};
var parseObject = function(chain, val, options, valuesParsed) {
  var leaf = valuesParsed ? val : parseArrayValue(val, options);
  for (var i = chain.length - 1; i >= 0; --i) {
    var obj;
    var root = chain[i];
    if (root === "[]" && options.parseArrays) {
      obj = [].concat(leaf);
    } else {
      obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
      var index = parseInt(cleanRoot, 10);
      if (!options.parseArrays && cleanRoot === "") {
        obj = { 0: leaf };
      } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
        obj = [];
        obj[index] = leaf;
      } else {
        obj[cleanRoot] = leaf;
      }
    }
    leaf = obj;
  }
  return leaf;
};
var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
  if (!givenKey) {
    return;
  }
  var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
  var brackets2 = /(\[[^[\]]*])/;
  var child = /(\[[^[\]]*])/g;
  var segment = options.depth > 0 && brackets2.exec(key);
  var parent = segment ? key.slice(0, segment.index) : key;
  var keys = [];
  if (parent) {
    if (!options.plainObjects && has.call(Object.prototype, parent)) {
      if (!options.allowPrototypes) {
        return;
      }
    }
    keys.push(parent);
  }
  var i = 0;
  while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
    i += 1;
    if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
      if (!options.allowPrototypes) {
        return;
      }
    }
    keys.push(segment[1]);
  }
  if (segment) {
    keys.push("[" + key.slice(segment.index) + "]");
  }
  return parseObject(keys, val, options, valuesParsed);
};
var normalizeParseOptions = function normalizeParseOptions2(opts) {
  if (!opts) {
    return defaults$5;
  }
  if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
    throw new TypeError("Decoder has to be a function.");
  }
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  var charset = typeof opts.charset === "undefined" ? defaults$5.charset : opts.charset;
  return {
    allowDots: typeof opts.allowDots === "undefined" ? defaults$5.allowDots : !!opts.allowDots,
    allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults$5.allowPrototypes,
    allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults$5.allowSparse,
    arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults$5.arrayLimit,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults$5.charsetSentinel,
    comma: typeof opts.comma === "boolean" ? opts.comma : defaults$5.comma,
    decoder: typeof opts.decoder === "function" ? opts.decoder : defaults$5.decoder,
    delimiter: typeof opts.delimiter === "string" || utils$g.isRegExp(opts.delimiter) ? opts.delimiter : defaults$5.delimiter,
    depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults$5.depth,
    ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
    interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults$5.interpretNumericEntities,
    parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults$5.parameterLimit,
    parseArrays: opts.parseArrays !== false,
    plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults$5.plainObjects,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults$5.strictNullHandling
  };
};
var parse$1 = function(str, opts) {
  var options = normalizeParseOptions(opts);
  if (str === "" || str === null || typeof str === "undefined") {
    return options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  }
  var tempObj = typeof str === "string" ? parseValues(str, options) : str;
  var obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  var keys = Object.keys(tempObj);
  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i];
    var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
    obj = utils$g.merge(obj, newObj, options);
  }
  if (options.allowSparse === true) {
    return obj;
  }
  return utils$g.compact(obj);
};
var stringify2 = stringify_1;
var parse = parse$1;
var formats = formats$3;
var lib = {
  formats,
  parse,
  stringify: stringify2
};
const appConfig = Object.freeze({
  PROD: {}.PROD,
  DEV: {}.DEV,
  vaultHost: "verygoodproxy.com",
  checkoutOrigin: "http://localhost:5000/static/dist",
  iframePath: "/1.1.0/",
  collectKeeperUrl: "https://vgs-collect-keeper.apps.verygood.systems",
  rollbarAccessToken: "f3cc89bd5b9446a9a6d1fdd8ebaf5425",
  version: "1.1.0",
  iconsUrl: "https://js.verygoodvault.com/vgs-collect/icons"
});
function isString$1(value) {
  return typeof value === "string" || value instanceof String;
}
var unknown$2 = {};
var Validator$1 = {};
var validations = {};
var errors = {};
errors.__esModule = true;
errors.ValidationError = void 0;
errors.createValidationError = createValidationError;
errors.toError = toError;
errors.toPathErrors = toPathErrors;
class ValidationError extends TypeError {
  constructor(message, errors2) {
    super(message);
    this.errors = void 0;
    this.path = void 0;
    this.errors = errors2;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
  toJSON() {
    var _this$errors;
    return {
      message: this.message,
      errors: (_this$errors = this.errors) == null ? void 0 : _this$errors.map(({
        path,
        error: error2
      }) => {
        var _ValidationError$prot;
        return {
          path,
          error: ((_ValidationError$prot = ValidationError.prototype.toJSON) == null ? void 0 : _ValidationError$prot.apply(error2)) || error2
        };
      })
    };
  }
}
errors.ValidationError = ValidationError;
ValidationError.prototype.name = "ValidationError";
function toError(error2, ...args) {
  if (typeof error2 === "string") {
    return new ValidationError(error2);
  }
  if (typeof error2 === "function") {
    return toError(error2(...args));
  }
  return error2;
}
function toPathErrors(errorLike, path) {
  var _error$errors;
  const error2 = toError(errorLike);
  if (Array.isArray(error2.path)) {
    path = error2.path;
  }
  if ((_error$errors = error2.errors) != null && _error$errors.length) {
    return [].concat(...error2.errors.map((item) => toPathErrors(item.error, [...path, ...item.path])));
  }
  return [{
    error: error2,
    path
  }];
}
function createValidationError(errors2, error2, ...args) {
  if (!error2) {
    if (errors2[0]) {
      const {
        path,
        error: err2
      } = errors2[0];
      const message = String(err2 && err2.message || err2);
      error2 = path ? `${path.join(".")}: ${message}` : message;
    } else {
      error2 = "Unknown Validation Error";
    }
  }
  const err = toError(error2, ...args);
  err.errors = errors2;
  return err;
}
var utils$f = {};
utils$f.__esModule = true;
utils$f.deepConcat = deepConcat;
utils$f.isPrimitive = isPrimitive;
utils$f.isPromiseLike = isPromiseLike;
utils$f.typeCheck = typeCheck;
var _errors$4 = errors;
function typeCheck(ok) {
  return ok;
}
function isPromiseLike(value) {
  return !!value && typeof value.then === "function";
}
function isPrimitive(value) {
  return typeof value !== "object" && typeof value !== "function" || value === null;
}
function deepConcat(...values) {
  if (values.length < 2) {
    return values[0];
  }
  values = values.filter((value) => value !== void 0);
  if (values.length < 2) {
    return values[0];
  }
  let base = values[0];
  if (typeof base !== "object" || base === null) {
    for (let i = 1; i < values.length; i += 1) {
      if (values[i] !== base) {
        throw new _errors$4.ValidationError(`Type mismatch on validation concat`);
      }
    }
    return base;
  }
  const keys = {};
  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    if (typeof value !== "object" || value === null) {
      throw new _errors$4.ValidationError(`Type mismatch on validation concat`);
    }
    for (const key in value) {
      if (!Object.prototype.hasOwnProperty.call(value, key))
        continue;
      const keyVal = value[key];
      if (keyVal === void 0)
        continue;
      if (!keys[key]) {
        keys[key] = [];
      }
      keys[key].push(keyVal);
    }
  }
  if (Array.isArray(base)) {
    base = [];
  } else {
    base = {};
  }
  for (const key in keys) {
    base[key] = deepConcat(...keys[key]);
  }
  return base;
}
validations.__esModule = true;
validations.array = array$3;
validations.destruct = destruct;
validations.enumValue = enumValue;
validations.equals = equals;
validations.error = error;
validations.recordValue = recordValue;
validations.regexp = regexp;
validations.test = test;
validations.type = type;
var _errors$3 = errors;
var _utils$5 = utils$f;
function type(type2, error2) {
  return (...args) => {
    if (typeof args[0] !== type2 || args[0] === null) {
      throw (0, _errors$3.toError)(error2 || `Expect value to be "${type2}"`, ...args);
    }
    return args[0];
  };
}
function equals(expected, error2) {
  return (...args) => {
    if (args[0] !== expected) {
      throw (0, _errors$3.toError)(error2 || `Expect value to equal "${expected}"`, ...args);
    }
    return args[0];
  };
}
function test(tester, error2) {
  return (...args) => {
    if (!tester(...args)) {
      throw (0, _errors$3.toError)(error2 || `Validation test failed`, ...args);
    }
    return args[0];
  };
}
function destruct(validator2, error2) {
  return (...args) => {
    try {
      const res = validator2(...args);
      if (!(0, _utils$5.isPromiseLike)(res)) {
        return [null, res];
      }
      return res.then((ret) => [null, ret], (err) => [error2 ? (0, _errors$3.toError)(error2, ...args) : err]);
    } catch (err) {
      return [error2 ? (0, _errors$3.toError)(error2, ...args) : err];
    }
  };
}
function error(validator2, err) {
  return (...args) => {
    try {
      const res = validator2(...args);
      if (!(0, _utils$5.isPromiseLike)(res)) {
        return res;
      }
      return res.then(null, () => {
        throw (0, _errors$3.toError)(err, ...args);
      });
    } catch (e2) {
      throw (0, _errors$3.toError)(err, ...args);
    }
  };
}
function regexp(exp, error2) {
  if (!(exp instanceof RegExp)) {
    exp = new RegExp(exp);
  }
  return (...args) => {
    if (!exp.test(args[0])) {
      throw (0, _errors$3.toError)(error2 || `Invalid string format (expected: ${exp})`, ...args);
    }
    return String(args[0]);
  };
}
function array$3(length = null, error2) {
  const isArray2 = (...args) => {
    if (!Array.isArray(args[0])) {
      throw (0, _errors$3.toError)(error2 || `Expecting value to be an array`, ...args);
    }
    return args[0];
  };
  if (length === null) {
    return isArray2;
  }
  return (...args) => {
    const arr = isArray2(...args);
    if (arr.length !== length) {
      throw (0, _errors$3.toError)(error2 || `Expected array length ${length} (given: ${arr.length})`, ...args);
    }
    return arr;
  };
}
function enumValue(value, error2) {
  const values = new Set(Object.keys(value).filter((key) => isNaN(Number(key))).map((key) => value[key]));
  return (...args) => {
    if (!values.has(args[0])) {
      throw (0, _errors$3.toError)(error2 || "Unknown enum value", ...args);
    }
    return args[0];
  };
}
function recordValue(key, value, error2) {
  return (...args) => {
    const [input] = args;
    if (!input || typeof input !== "object") {
      throw (0, _errors$3.toError)(error2 || "Expected non-null object", ...args);
    }
    const obj = {};
    for (const k in input) {
      try {
        obj[key(k)] = value(input[k]);
      } catch (error3) {
        throw (0, _errors$3.createValidationError)([{
          path: [k],
          error: error3
        }], null, ...args);
      }
    }
    return obj;
  };
}
var logic = {};
var compiler$1 = {};
compiler$1.__esModule = true;
compiler$1.default = compiler;
var _errors$2 = errors;
var _validations$8 = validations;
var _utils$4 = utils$f;
function compiler(schema2, opts) {
  const {
    error: error2,
    basePath = [],
    strict
  } = opts || {};
  if (typeof schema2 === "function") {
    return schema2;
  }
  if (typeof schema2 !== "object" || schema2 === null) {
    return (0, _validations$8.equals)(schema2, error2);
  }
  if (schema2 instanceof RegExp) {
    return (0, _validations$8.regexp)(schema2, error2);
  }
  let typeValidator;
  if (Array.isArray(schema2)) {
    const validator2 = (0, _validations$8.array)(schema2.length, error2);
    typeValidator = (...args) => {
      return [validator2(...args), []];
    };
  } else {
    const validator2 = (0, _validations$8.type)("object", error2);
    typeValidator = (...args) => {
      return [validator2(...args), {}];
    };
  }
  const keys = Object.keys(schema2);
  const tasks = keys.map((key) => {
    const path = [...basePath, key];
    const validator2 = compiler(schema2[key], {
      basePath: path,
      strict
    });
    return (res, errors2, obj) => {
      try {
        const value = validator2(obj[key]);
        if (!(0, _utils$4.isPromiseLike)(value)) {
          res[key] = value;
          return;
        }
        return value.then((value2) => {
          res[key] = value2;
        }, (error3) => {
          errors2.push(...(0, _errors$2.toPathErrors)(error3, path));
        });
      } catch (error3) {
        errors2.push(...(0, _errors$2.toPathErrors)(error3, path));
      }
    };
  });
  if (strict) {
    const keysSet = new Set(keys);
    tasks.push((res, errors2, obj) => {
      Object.keys(obj).forEach((key) => {
        if (keysSet.has(key))
          return;
        errors2.push({
          path: [...basePath, key],
          error: (0, _errors$2.toError)(`Unknown property "${key}"`)
        });
      });
    });
  }
  const tasksCount = tasks.length;
  return (...args) => {
    let obj;
    let res;
    let mainError;
    try {
      [obj, res] = typeValidator(...args);
    } catch (e2) {
      obj = {};
      res = {};
      mainError = e2;
    }
    const promises = [];
    const errors2 = [];
    for (let i = 0; i < tasksCount; i += 1) {
      const promise = tasks[i](res, errors2, obj);
      if (promise)
        promises.push(promise);
    }
    if (!promises.length) {
      if (errors2.length || mainError) {
        throw (0, _errors$2.createValidationError)(errors2, mainError || error2, ...args);
      }
      return res;
    }
    return Promise.all(promises).then(() => {
      if (errors2.length || mainError) {
        throw (0, _errors$2.createValidationError)(errors2, mainError || error2, ...args);
      }
      return res;
    });
  };
}
var _switch$1 = {};
_switch$1.__esModule = true;
_switch$1.findSwitchKey = findSwitchKey;
_switch$1.generateSwitch = generateSwitch;
var _utils$3 = utils$f;
function findSwitchKey(...candidates) {
  const firstCandidate = candidates[0];
  if (candidates.length < 2 || typeof firstCandidate !== "object" || firstCandidate === null) {
    return null;
  }
  let values = /* @__PURE__ */ new Map();
  const switchKey = Object.keys(firstCandidate).find((key) => {
    const firstValue = firstCandidate[key];
    if (!(0, _utils$3.isPrimitive)(firstValue)) {
      return false;
    }
    values = /* @__PURE__ */ new Map([[firstValue, 0]]);
    for (let i = 1; i < candidates.length; i += 1) {
      const candidate = candidates[i];
      if (typeof candidate !== "object" || candidate === null) {
        return false;
      }
      const value = candidate[key];
      if (!(0, _utils$3.isPrimitive)(value) || values.has(value)) {
        return false;
      }
      values.set(value, i);
    }
    return true;
  });
  if (switchKey === void 0) {
    return null;
  }
  return [switchKey, values];
}
function generateSwitch(switchKey, validators2) {
  const [key, values] = switchKey;
  return (...args) => {
    const obj = args[0];
    let index;
    if (typeof obj === "object" && obj !== null) {
      const value = obj[key];
      index = values.get(value) || 0;
    } else {
      index = 0;
    }
    return validators2[index](...args);
  };
}
logic.__esModule = true;
logic.either = either;
logic.merge = merge$1;
logic.optional = optional;
logic.strictOptional = strictOptional;
var _compiler$3 = _interopRequireDefault$9(compiler$1);
var _utils$2 = utils$f;
var _switch = _switch$1;
function _interopRequireDefault$9(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function either(...candidates) {
  if (!candidates.length) {
    throw new RangeError(`Expecting at least one argument`);
  }
  const validators2 = candidates.map((schema2) => (0, _compiler$3.default)(schema2));
  const switchKey = (0, _switch.findSwitchKey)(...candidates);
  if (switchKey) {
    return (0, _switch.generateSwitch)(switchKey, validators2);
  }
  return (...args) => {
    let i = 0;
    const next = () => {
      const validator2 = validators2[i++];
      let res;
      try {
        res = validator2(...args);
      } catch (e2) {
        if (i >= candidates.length) {
          throw e2;
        }
        return next();
      }
      if (!(0, _utils$2.isPromiseLike)(res)) {
        return res;
      }
      return res.then(null, (e2) => {
        if (i >= candidates.length) {
          throw e2;
        }
        return next();
      });
    };
    return next();
  };
}
function merge$1(...args) {
  if (!args.length) {
    throw new RangeError(`Expecting at least one argument`);
  }
  const validators2 = args.map((schema2) => (0, _compiler$3.default)(schema2));
  const validatorsCount = validators2.length;
  if (validatorsCount === 1) {
    return validators2[0];
  }
  return (...args2) => {
    let isAsync;
    const res = [];
    for (let i = 0; i < validatorsCount; i += 1) {
      const ret = validators2[i](...args2);
      if ((0, _utils$2.isPromiseLike)(ret)) {
        isAsync = true;
      }
      res.push(ret);
    }
    if (!isAsync) {
      return (0, _utils$2.deepConcat)(...res);
    }
    return Promise.all(res).then((resolved) => (0, _utils$2.deepConcat)(...resolved));
  };
}
function optional(validator2, defaultValue) {
  return (...args) => {
    if (args[0] == null || args[0] === "") {
      return defaultValue;
    }
    return validator2(...args);
  };
}
function strictOptional(validator2, defaultValue) {
  return (...args) => {
    if (args[0] === void 0) {
      return defaultValue;
    }
    return validator2(...args);
  };
}
Validator$1.__esModule = true;
Validator$1.default = void 0;
var _validations$7 = validations;
var _utils$1 = utils$f;
var _logic$1 = logic;
class Validator {
  constructor(validator2) {
    this.validator = void 0;
    this.validator = validator2;
  }
  proxy() {
    return new Proxy(this.validator, {
      get: (target, propertyKey) => propertyKey in this ? this[propertyKey] : this.validator[propertyKey]
    });
  }
  equals(value, error2) {
    return this.transform((0, _validations$7.equals)(value, error2));
  }
  test(tester, error2) {
    return this.transform((0, _validations$7.test)(tester, error2));
  }
  transform(fn, constructor = this.constructor) {
    const {
      validator: validator2
    } = this;
    return new constructor((...args) => {
      const res = validator2(...args);
      if (!(0, _utils$1.isPromiseLike)(res)) {
        return fn(res);
      }
      return res.then((ret) => fn(ret));
    }).proxy();
  }
  construct(fn) {
    const Class = this.constructor;
    const {
      validator: validator2
    } = this;
    return new Class((...args) => validator2(...fn(...args))).proxy();
  }
  optional(defaultValue) {
    const Class = this.constructor;
    const {
      validator: validator2
    } = this;
    return new Class((0, _logic$1.optional)(validator2, defaultValue)).proxy();
  }
  strictOptional(defaultValue) {
    const Class = this.constructor;
    const {
      validator: validator2
    } = this;
    return new Class((0, _logic$1.strictOptional)(validator2, defaultValue)).proxy();
  }
  destruct(error2) {
    const Class = this.constructor;
    const {
      validator: validator2
    } = this;
    return new Class((0, _validations$7.destruct)(validator2, error2)).proxy();
  }
  error(err) {
    const Class = this.constructor;
    const {
      validator: validator2
    } = this;
    return new Class((0, _validations$7.error)(validator2, err)).proxy();
  }
}
Validator$1.default = Validator;
var object$1 = {};
object$1.__esModule = true;
object$1.default = object$1.ObjectValidator = void 0;
var _Validator$7 = _interopRequireDefault$8(Validator$1);
var _validations$6 = validations;
function _interopRequireDefault$8(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
class ObjectValidator extends _Validator$7.default {
}
object$1.ObjectValidator = ObjectValidator;
const object = new ObjectValidator((0, _validations$6.type)("object")).proxy();
var _default$8 = object;
object$1.default = _default$8;
var string$2 = {};
string$2.__esModule = true;
string$2.default = string$2.StringValidator = void 0;
var _Validator$6 = _interopRequireDefault$7(Validator$1);
var _validations$5 = validations;
function _interopRequireDefault$7(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
class StringValidator extends _Validator$6.default {
  toLowerCase() {
    return this.transform((str) => str.toLowerCase());
  }
  toUpperCase() {
    return this.transform((str) => str.toUpperCase());
  }
  toLocaleLowerCase(...input) {
    return this.transform((str) => str.toLocaleLowerCase(...input));
  }
  toLocaleUpperCase(...input) {
    return this.transform((str) => str.toLocaleUpperCase(...input));
  }
  normalize(...input) {
    return this.transform((str) => str.normalize(...input));
  }
  trim() {
    return this.transform((str) => str.trim());
  }
  truncate(length) {
    return this.transform((str) => str.length > length ? `${str.substring(0, length - 1)}\u2026` : str);
  }
  min(length, error2) {
    return this.test((str) => str.length >= length, error2 || ((str) => new RangeError(`Expect length to be minimum of ${length} characters (actual: ${str.length})`)));
  }
  max(length, error2) {
    return this.test((str) => str.length <= length, error2 || ((str) => new RangeError(`Expect length to be maximum of ${length} characters (actual: ${str.length})`)));
  }
  between(minLength, maxLength, error2) {
    return this.test((str) => str.length >= minLength && str.length <= maxLength, error2 || ((str) => new RangeError(`Expect length to be between ${minLength} and ${maxLength} characters (actual: ${str.length})`)));
  }
  regexp(exp, error2) {
    return this.transform((0, _validations$5.regexp)(exp, error2));
  }
}
string$2.StringValidator = StringValidator;
const string$1 = new StringValidator((0, _validations$5.type)("string")).proxy();
var _default$7 = string$1;
string$2.default = _default$7;
var number$1 = {};
number$1.__esModule = true;
number$1.default = number$1.NumberValidator = void 0;
var _Validator$5 = _interopRequireDefault$6(Validator$1);
var _string$3 = string$2;
var _validations$4 = validations;
function _interopRequireDefault$6(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
class NumberValidator extends _Validator$5.default {
  constructor(...args) {
    super(...args);
    this.gte = this.min;
    this.lte = this.max;
  }
  float(error2) {
    return this.test((val) => !isNaN(val) && Number.isFinite(val), error2 || `Expect value to be a number`);
  }
  integer(error2) {
    return this.test((val) => Number.isInteger(val), error2 || `Expect value to be an integer`);
  }
  toExponential(...args) {
    return this.transform((val) => val.toExponential(...args), _string$3.StringValidator);
  }
  toFixed(...args) {
    return this.transform((val) => val.toFixed(...args), _string$3.StringValidator);
  }
  toLocaleString(...args) {
    return this.transform((val) => val.toLocaleString(...args), _string$3.StringValidator);
  }
  toPrecision(...args) {
    return this.transform((val) => val.toPrecision(...args), _string$3.StringValidator);
  }
  toString(...args) {
    return this.transform((val) => val.toString(...args), _string$3.StringValidator);
  }
  min(min, error2) {
    return this.test((val) => val >= min, error2 || ((val) => new RangeError(`Expect value to be greater or equal than ${min} (actual: ${val})`)));
  }
  max(max, error2) {
    return this.test((val) => val <= max, error2 || ((val) => new RangeError(`Expect value to be lower or equal than ${max} (actual: ${val})`)));
  }
  gt(boundary, error2) {
    return this.test((val) => val > boundary, error2 || ((val) => new RangeError(`Expect value to be greater than ${boundary} (actual: ${val})`)));
  }
  lt(boundary, error2) {
    return this.test((val) => val < boundary, error2 || ((val) => new RangeError(`Expect value to be lower than ${boundary} (actual: ${val})`)));
  }
  between(min, max, error2) {
    return this.test((val) => val >= min && val <= max, error2 || ((val) => new RangeError(`Expect value to be between ${min} and ${max} (actual: ${val})`)));
  }
}
number$1.NumberValidator = NumberValidator;
const number = new NumberValidator((0, _validations$4.type)("number")).proxy();
var _default$6 = number;
number$1.default = _default$6;
var boolean$2 = {};
boolean$2.__esModule = true;
boolean$2.default = boolean$2.BooleanValidator = void 0;
var _Validator$4 = _interopRequireDefault$5(Validator$1);
var _validations$3 = validations;
function _interopRequireDefault$5(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
class BooleanValidator extends _Validator$4.default {
}
boolean$2.BooleanValidator = BooleanValidator;
const boolean$1 = new BooleanValidator((0, _validations$3.type)("boolean")).proxy();
var _default$5 = boolean$1;
boolean$2.default = _default$5;
var array$2 = {};
array$2.__esModule = true;
array$2.default = array$2.ArrayValidator = void 0;
var _Validator$3 = _interopRequireDefault$4(Validator$1);
var _validations$2 = validations;
var _compiler$2 = _interopRequireDefault$4(compiler$1);
var _utils = utils$f;
function _interopRequireDefault$4(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
class ArrayValidator extends _Validator$3.default {
  of(schema2, error2) {
    const validator2 = (0, _compiler$2.default)(schema2, {
      error: error2
    });
    return this.transform((arr) => {
      let isAsync;
      const items = arr.map((item) => {
        const ret = validator2(...[item]);
        if ((0, _utils.isPromiseLike)(ret)) {
          isAsync = true;
        }
        return ret;
      });
      if (!isAsync) {
        return items;
      }
      return Promise.all(items);
    });
  }
  min(length, error2) {
    return this.test((arr) => arr.length >= length, error2 || ((arr) => `Expect array to be minimum of ${length} items (actual: ${arr.length})`));
  }
  max(length, error2) {
    return this.test((arr) => arr.length <= length, error2 || ((arr) => `Expect array to be maximum of ${length} items (actual: ${arr.length})`));
  }
  between(minLength, maxLength, error2) {
    return this.test((arr) => arr.length >= minLength && arr.length <= maxLength, error2 || ((arr) => `Expect array to be between ${minLength} and ${maxLength} items (actual: ${arr.length})`));
  }
}
array$2.ArrayValidator = ArrayValidator;
const array$1 = new ArrayValidator((0, _validations$2.array)()).proxy();
var _default$4 = array$1;
array$2.default = _default$4;
var DateType$1 = {};
DateType$1.__esModule = true;
DateType$1.default = DateType$1.DateValidator = void 0;
var _Validator$2 = _interopRequireDefault$3(Validator$1);
var _string$2 = string$2;
var _errors$1 = errors;
var _number$1 = number$1;
function _interopRequireDefault$3(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
class DateValidator extends _Validator$2.default {
  constructor(...args) {
    super(...args);
    this.gte = this.min;
    this.lte = this.max;
  }
  toISOString(...args) {
    return this.transform((val) => val.toISOString(...args), _string$2.StringValidator);
  }
  getTime(...args) {
    return this.transform((val) => val.getTime(...args), _number$1.NumberValidator);
  }
  min(min, error2) {
    return this.test((val) => val >= min, error2 || ((val) => new RangeError(`Expect date to be greater or equal than ${min} (actual: ${val})`)));
  }
  max(max, error2) {
    return this.test((val) => val <= max, error2 || ((val) => new RangeError(`Expect date to be lower or equal than ${max} (actual: ${val})`)));
  }
  gt(boundary, error2) {
    return this.test((val) => val > boundary, error2 || ((val) => new RangeError(`Expect date to be greater than ${boundary} (actual: ${val})`)));
  }
  lt(boundary, error2) {
    return this.test((val) => val < boundary, error2 || ((val) => new RangeError(`Expect date to be lower than ${boundary} (actual: ${val})`)));
  }
  between(min, max, error2) {
    return this.test((val) => val >= min && val <= max, error2 || ((val) => new RangeError(`Expect date to be between ${min} and ${max} (actual: ${val})`)));
  }
}
DateType$1.DateValidator = DateValidator;
const DateType = new DateValidator((input) => {
  if (!(input instanceof Date)) {
    throw (0, _errors$1.toError)(`Expect value to be instance of Date`);
  }
  return input;
}).proxy();
var _default$3 = DateType;
DateType$1.default = _default$3;
unknown$2.__esModule = true;
unknown$2.default = unknown$2.UnknownValidator = void 0;
var _Validator$1 = _interopRequireDefault$2(Validator$1);
var _errors = errors;
var _object = object$1;
var _string$1 = string$2;
var _number = number$1;
var _boolean$1 = boolean$2;
var _compiler$1 = _interopRequireDefault$2(compiler$1);
var _array$1 = array$2;
var _validations$1 = validations;
var _DateType = DateType$1;
function _interopRequireDefault$2(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const BOOL_MAP = {
  true: true,
  false: false,
  t: true,
  f: false,
  yes: true,
  no: false,
  y: true,
  n: false,
  1: true,
  0: false
};
class UnknownValidator extends _Validator$1.default {
  schema(schema2, error2) {
    return this.transform((0, _compiler$1.default)(schema2, {
      error: error2
    }), _Validator$1.default);
  }
  object(error2) {
    return this.transform((0, _validations$1.type)("object", error2), _object.ObjectValidator);
  }
  array(error2) {
    return this.transform((0, _validations$1.array)(null, error2), _array$1.ArrayValidator);
  }
  string(error2) {
    return this.transform((input) => {
      if (typeof input === "string") {
        return input;
      }
      if (input == null || typeof input === "object" && input.toString === Object.prototype.toString) {
        throw (0, _errors.toError)(error2 || `Expect value to be string`, input);
      }
      return String(input);
    }, _string$1.StringValidator);
  }
  number(error2) {
    return this.transform((input) => {
      if (typeof input === "number") {
        return input;
      }
      const value = Number(input);
      if (isNaN(value) && input !== "NaN") {
        throw (0, _errors.toError)(error2 || `Unknown number value`, input);
      }
      return value;
    }, _number.NumberValidator);
  }
  boolean(error2) {
    return this.transform((input) => {
      if (typeof input === "boolean") {
        return input;
      }
      const key = String(input).trim().toLowerCase();
      const value = BOOL_MAP[key];
      if (value == null) {
        throw (0, _errors.toError)(error2 || `Unknown boolean value`, input);
      }
      return value;
    }, _boolean$1.BooleanValidator);
  }
  date(error2) {
    return this.transform((input) => {
      if (input instanceof Date) {
        return input;
      }
      if (typeof input === "number" || typeof input === "string") {
        const value = new Date(input);
        if (!isNaN(value.getTime())) {
          return value;
        }
      }
      throw (0, _errors.toError)(error2 || `Unknown date value`, input);
    }, _DateType.DateValidator);
  }
  enum(value, error2) {
    return this.transform((0, _validations$1.enumValue)(value, error2), _Validator$1.default);
  }
  record(key, value, error2) {
    return this.transform((0, _validations$1.recordValue)(key, value, error2), _Validator$1.default);
  }
}
unknown$2.UnknownValidator = UnknownValidator;
const unknown$1 = new UnknownValidator((input) => input).proxy();
var _default$2 = unknown$1;
unknown$2.default = _default$2;
var Schema$1 = {};
Schema$1.__esModule = true;
Schema$1.default = void 0;
var _Validator = _interopRequireDefault$1(Validator$1);
var _compiler = _interopRequireDefault$1(compiler$1);
var _logic = logic;
var _validations = validations;
function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function schema(schema2, opts) {
  let error2;
  let strict;
  if (opts) {
    if (typeof opts === "object" && !(opts instanceof Error)) {
      error2 = opts.error;
      strict = opts.strict;
    } else {
      error2 = opts;
    }
  }
  return new _Validator.default((0, _compiler.default)(schema2, {
    error: error2,
    strict
  })).proxy();
}
schema.either = function(...candidates) {
  return new _Validator.default((0, _logic.either)(...candidates)).proxy();
};
schema.merge = function(...args) {
  return new _Validator.default((0, _logic.merge)(...args)).proxy();
};
schema.enum = function(value, error2) {
  return new _Validator.default((0, _validations.enumValue)(value, error2)).proxy();
};
schema.record = function(key, value, error2) {
  return new _Validator.default((0, _validations.recordValue)(key, value, error2)).proxy();
};
const Schema = schema;
var _default$1 = Schema;
Schema$1.default = _default$1;
var default_1 = void 0;
var _unknown = _interopRequireDefault(unknown$2);
var unknown = _unknown.default;
_interopRequireDefault(object$1);
var _array = _interopRequireDefault(array$2);
var array = _array.default;
var _string = _interopRequireDefault(string$2);
var string = _string.default;
_interopRequireDefault(number$1);
var _boolean = _interopRequireDefault(boolean$2);
var boolean = _boolean.default;
var _Schema = _interopRequireDefault(Schema$1);
_interopRequireDefault(DateType$1);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var _default = _Schema.default;
default_1 = _default;
function e(e2) {
  this.message = e2;
}
e.prototype = new Error(), e.prototype.name = "InvalidCharacterError";
typeof window != "undefined" && window.atob && window.atob.bind(window) || function(r) {
  var t = String(r).replace(/=+$/, "");
  if (t.length % 4 == 1)
    throw new e("'atob' failed: The string to be decoded is not correctly encoded.");
  for (var n2, o, a = 0, i = 0, c = ""; o = t.charAt(i++); ~o && (n2 = a % 4 ? 64 * n2 + o : o, a++ % 4) ? c += String.fromCharCode(255 & n2 >> (-2 * a & 6)) : 0)
    o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);
  return c;
};
function n(e2) {
  this.message = e2;
}
n.prototype = new Error(), n.prototype.name = "InvalidTokenError";
var axios$1 = { exports: {} };
var bind$2 = function bind2(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};
var bind$1 = bind$2;
var toString = Object.prototype.toString;
function isArray(val) {
  return Array.isArray(val);
}
function isUndefined(val) {
  return typeof val === "undefined";
}
function isBuffer2(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
}
function isArrayBuffer(val) {
  return toString.call(val) === "[object ArrayBuffer]";
}
function isFormData(val) {
  return toString.call(val) === "[object FormData]";
}
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
function isString(val) {
  return typeof val === "string";
}
function isNumber(val) {
  return typeof val === "number";
}
function isObject(val) {
  return val !== null && typeof val === "object";
}
function isPlainObject(val) {
  if (toString.call(val) !== "[object Object]") {
    return false;
  }
  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}
function isDate(val) {
  return toString.call(val) === "[object Date]";
}
function isFile(val) {
  return toString.call(val) === "[object File]";
}
function isBlob(val) {
  return toString.call(val) === "[object Blob]";
}
function isFunction(val) {
  return toString.call(val) === "[object Function]";
}
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
function isURLSearchParams(val) {
  return toString.call(val) === "[object URLSearchParams]";
}
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
function isStandardBrowserEnv() {
  if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
    return false;
  }
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function forEach(obj, fn) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
function merge2() {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge2(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge2({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === "function") {
      a[key] = bind$1(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
function stripBOM(content) {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
}
var utils$e = {
  isArray,
  isArrayBuffer,
  isBuffer: isBuffer2,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isFunction,
  isStream,
  isURLSearchParams,
  isStandardBrowserEnv,
  forEach,
  merge: merge2,
  extend,
  trim,
  stripBOM
};
var utils$d = utils$e;
function encode2(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var buildURL$2 = function buildURL(url, params2, paramsSerializer) {
  if (!params2) {
    return url;
  }
  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params2);
  } else if (utils$d.isURLSearchParams(params2)) {
    serializedParams = params2.toString();
  } else {
    var parts = [];
    utils$d.forEach(params2, function serialize(val, key) {
      if (val === null || typeof val === "undefined") {
        return;
      }
      if (utils$d.isArray(val)) {
        key = key + "[]";
      } else {
        val = [val];
      }
      utils$d.forEach(val, function parseValue(v) {
        if (utils$d.isDate(v)) {
          v = v.toISOString();
        } else if (utils$d.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode2(key) + "=" + encode2(v));
      });
    });
    serializedParams = parts.join("&");
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
};
var utils$c = utils$e;
function InterceptorManager$1() {
  this.handlers = [];
}
InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled,
    rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};
InterceptorManager$1.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
InterceptorManager$1.prototype.forEach = function forEach2(fn) {
  utils$c.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};
var InterceptorManager_1 = InterceptorManager$1;
var utils$b = utils$e;
var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
  utils$b.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};
var enhanceError$2 = function enhanceError(error2, config, code, request2, response) {
  error2.config = config;
  if (code) {
    error2.code = code;
  }
  error2.request = request2;
  error2.response = response;
  error2.isAxiosError = true;
  error2.toJSON = function toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };
  return error2;
};
var enhanceError$1 = enhanceError$2;
var createError$2 = function createError(message, config, code, request2, response) {
  var error2 = new Error(message);
  return enhanceError$1(error2, config, code, request2, response);
};
var createError$1 = createError$2;
var settle$1 = function settle(resolve, reject, response) {
  var validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(createError$1("Request failed with status code " + response.status, response.config, null, response.request, response));
  }
};
var utils$a = utils$e;
var cookies$1 = utils$a.isStandardBrowserEnv() ? function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + "=" + encodeURIComponent(value));
      if (utils$a.isNumber(expires)) {
        cookie.push("expires=" + new Date(expires).toGMTString());
      }
      if (utils$a.isString(path)) {
        cookie.push("path=" + path);
      }
      if (utils$a.isString(domain)) {
        cookie.push("domain=" + domain);
      }
      if (secure === true) {
        cookie.push("secure");
      }
      document.cookie = cookie.join("; ");
    },
    read: function read(name) {
      var match2 = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match2 ? decodeURIComponent(match2[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  };
}() : function nonStandardBrowserEnv() {
  return {
    write: function write() {
    },
    read: function read() {
      return null;
    },
    remove: function remove() {
    }
  };
}();
var isAbsoluteURL$1 = function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};
var combineURLs$1 = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
};
var isAbsoluteURL2 = isAbsoluteURL$1;
var combineURLs2 = combineURLs$1;
var buildFullPath$1 = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL2(requestedURL)) {
    return combineURLs2(baseURL, requestedURL);
  }
  return requestedURL;
};
var utils$9 = utils$e;
var ignoreDuplicateOf = [
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
];
var parseHeaders$1 = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;
  if (!headers) {
    return parsed;
  }
  utils$9.forEach(headers.split("\n"), function parser(line) {
    i = line.indexOf(":");
    key = utils$9.trim(line.substr(0, i)).toLowerCase();
    val = utils$9.trim(line.substr(i + 1));
    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === "set-cookie") {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    }
  });
  return parsed;
};
var utils$8 = utils$e;
var isURLSameOrigin$1 = utils$8.isStandardBrowserEnv() ? function standardBrowserEnv2() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement("a");
  var originURL;
  function resolveURL(url) {
    var href = url;
    if (msie) {
      urlParsingNode.setAttribute("href", href);
      href = urlParsingNode.href;
    }
    urlParsingNode.setAttribute("href", href);
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
    };
  }
  originURL = resolveURL(window.location.href);
  return function isURLSameOrigin2(requestURL) {
    var parsed = utils$8.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : function nonStandardBrowserEnv2() {
  return function isURLSameOrigin2() {
    return true;
  };
}();
function Cancel$3(message) {
  this.message = message;
}
Cancel$3.prototype.toString = function toString2() {
  return "Cancel" + (this.message ? ": " + this.message : "");
};
Cancel$3.prototype.__CANCEL__ = true;
var Cancel_1 = Cancel$3;
var utils$7 = utils$e;
var settle2 = settle$1;
var cookies = cookies$1;
var buildURL$1 = buildURL$2;
var buildFullPath2 = buildFullPath$1;
var parseHeaders2 = parseHeaders$1;
var isURLSameOrigin = isURLSameOrigin$1;
var createError2 = createError$2;
var defaults$4 = defaults_1;
var Cancel$2 = Cancel_1;
var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }
      if (config.signal) {
        config.signal.removeEventListener("abort", onCanceled);
      }
    }
    if (utils$7.isFormData(requestData)) {
      delete requestHeaders["Content-Type"];
    }
    var request2 = new XMLHttpRequest();
    if (config.auth) {
      var username = config.auth.username || "";
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
      requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
    }
    var fullPath = buildFullPath2(config.baseURL, config.url);
    request2.open(config.method.toUpperCase(), buildURL$1(fullPath, config.params, config.paramsSerializer), true);
    request2.timeout = config.timeout;
    function onloadend() {
      if (!request2) {
        return;
      }
      var responseHeaders = "getAllResponseHeaders" in request2 ? parseHeaders2(request2.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === "text" || responseType === "json" ? request2.responseText : request2.response;
      var response = {
        data: responseData,
        status: request2.status,
        statusText: request2.statusText,
        headers: responseHeaders,
        config,
        request: request2
      };
      settle2(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request2 = null;
    }
    if ("onloadend" in request2) {
      request2.onloadend = onloadend;
    } else {
      request2.onreadystatechange = function handleLoad() {
        if (!request2 || request2.readyState !== 4) {
          return;
        }
        if (request2.status === 0 && !(request2.responseURL && request2.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request2.onabort = function handleAbort() {
      if (!request2) {
        return;
      }
      reject(createError2("Request aborted", config, "ECONNABORTED", request2));
      request2 = null;
    };
    request2.onerror = function handleError() {
      reject(createError2("Network Error", config, null, request2));
      request2 = null;
    };
    request2.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
      var transitional2 = config.transitional || defaults$4.transitional;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError2(timeoutErrorMessage, config, transitional2.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", request2));
      request2 = null;
    };
    if (utils$7.isStandardBrowserEnv()) {
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }
    if ("setRequestHeader" in request2) {
      utils$7.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
          delete requestHeaders[key];
        } else {
          request2.setRequestHeader(key, val);
        }
      });
    }
    if (!utils$7.isUndefined(config.withCredentials)) {
      request2.withCredentials = !!config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request2.responseType = config.responseType;
    }
    if (typeof config.onDownloadProgress === "function") {
      request2.addEventListener("progress", config.onDownloadProgress);
    }
    if (typeof config.onUploadProgress === "function" && request2.upload) {
      request2.upload.addEventListener("progress", config.onUploadProgress);
    }
    if (config.cancelToken || config.signal) {
      onCanceled = function(cancel) {
        if (!request2) {
          return;
        }
        reject(!cancel || cancel && cancel.type ? new Cancel$2("canceled") : cancel);
        request2.abort();
        request2 = null;
      };
      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
      }
    }
    if (!requestData) {
      requestData = null;
    }
    request2.send(requestData);
  });
};
var utils$6 = utils$e;
var normalizeHeaderName2 = normalizeHeaderName$1;
var enhanceError2 = enhanceError$2;
var DEFAULT_CONTENT_TYPE = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function setContentTypeIfUnset(headers, value) {
  if (!utils$6.isUndefined(headers) && utils$6.isUndefined(headers["Content-Type"])) {
    headers["Content-Type"] = value;
  }
}
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== "undefined") {
    adapter = xhr;
  } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
    adapter = xhr;
  }
  return adapter;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$6.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$6.trim(rawValue);
    } catch (e2) {
      if (e2.name !== "SyntaxError") {
        throw e2;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults$3 = {
  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data2, headers) {
    normalizeHeaderName2(headers, "Accept");
    normalizeHeaderName2(headers, "Content-Type");
    if (utils$6.isFormData(data2) || utils$6.isArrayBuffer(data2) || utils$6.isBuffer(data2) || utils$6.isStream(data2) || utils$6.isFile(data2) || utils$6.isBlob(data2)) {
      return data2;
    }
    if (utils$6.isArrayBufferView(data2)) {
      return data2.buffer;
    }
    if (utils$6.isURLSearchParams(data2)) {
      setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
      return data2.toString();
    }
    if (utils$6.isObject(data2) || headers && headers["Content-Type"] === "application/json") {
      setContentTypeIfUnset(headers, "application/json");
      return stringifySafely(data2);
    }
    return data2;
  }],
  transformResponse: [function transformResponse(data2) {
    var transitional2 = this.transitional || defaults$3.transitional;
    var silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
    var forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
    if (strictJSONParsing || forcedJSONParsing && utils$6.isString(data2) && data2.length) {
      try {
        return JSON.parse(data2);
      } catch (e2) {
        if (strictJSONParsing) {
          if (e2.name === "SyntaxError") {
            throw enhanceError2(e2, this, "E_JSON_PARSE");
          }
          throw e2;
        }
      }
    }
    return data2;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*"
    }
  }
};
utils$6.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
  defaults$3.headers[method] = {};
});
utils$6.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  defaults$3.headers[method] = utils$6.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults$3;
var utils$5 = utils$e;
var defaults$2 = defaults_1;
var transformData$1 = function transformData(data2, headers, fns) {
  var context = this || defaults$2;
  utils$5.forEach(fns, function transform(fn) {
    data2 = fn.call(context, data2, headers);
  });
  return data2;
};
var isCancel$1 = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};
var utils$4 = utils$e;
var transformData2 = transformData$1;
var isCancel2 = isCancel$1;
var defaults$1 = defaults_1;
var Cancel$1 = Cancel_1;
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new Cancel$1("canceled");
  }
}
var dispatchRequest$1 = function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = config.headers || {};
  config.data = transformData2.call(config, config.data, config.headers, config.transformRequest);
  config.headers = utils$4.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils$4.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults$1.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData2.call(config, response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel2(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData2.call(config, reason.response.data, reason.response.headers, config.transformResponse);
      }
    }
    return Promise.reject(reason);
  });
};
var utils$3 = utils$e;
var mergeConfig$2 = function mergeConfig(config1, config2) {
  config2 = config2 || {};
  var config = {};
  function getMergedValue(target, source2) {
    if (utils$3.isPlainObject(target) && utils$3.isPlainObject(source2)) {
      return utils$3.merge(target, source2);
    } else if (utils$3.isPlainObject(source2)) {
      return utils$3.merge({}, source2);
    } else if (utils$3.isArray(source2)) {
      return source2.slice();
    }
    return source2;
  }
  function mergeDeepProperties(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function valueFromConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    }
  }
  function defaultToConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  var mergeMap = {
    "url": valueFromConfig2,
    "method": valueFromConfig2,
    "data": valueFromConfig2,
    "baseURL": defaultToConfig2,
    "transformRequest": defaultToConfig2,
    "transformResponse": defaultToConfig2,
    "paramsSerializer": defaultToConfig2,
    "timeout": defaultToConfig2,
    "timeoutMessage": defaultToConfig2,
    "withCredentials": defaultToConfig2,
    "adapter": defaultToConfig2,
    "responseType": defaultToConfig2,
    "xsrfCookieName": defaultToConfig2,
    "xsrfHeaderName": defaultToConfig2,
    "onUploadProgress": defaultToConfig2,
    "onDownloadProgress": defaultToConfig2,
    "decompress": defaultToConfig2,
    "maxContentLength": defaultToConfig2,
    "maxBodyLength": defaultToConfig2,
    "transport": defaultToConfig2,
    "httpAgent": defaultToConfig2,
    "httpsAgent": defaultToConfig2,
    "cancelToken": defaultToConfig2,
    "socketPath": defaultToConfig2,
    "responseEncoding": defaultToConfig2,
    "validateStatus": mergeDirectKeys
  };
  utils$3.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge3 = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge3(prop);
    utils$3.isUndefined(configValue) && merge3 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
};
var data = {
  "version": "0.26.0"
};
var VERSION = data.version;
var validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type2, i) {
  validators$1[type2] = function validator2(thing) {
    return typeof thing === type2 || "a" + (i < 1 ? "n " : " ") + type2;
  };
});
var deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return function(value, opt, opts) {
    if (validator2 === false) {
      throw new Error(formatMessage(opt, " has been removed" + (version ? " in " + version : "")));
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
function assertOptions(options, schema2, allowUnknown) {
  if (typeof options !== "object") {
    throw new TypeError("options must be an object");
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator2 = schema2[opt];
    if (validator2) {
      var value = options[opt];
      var result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new TypeError("option " + opt + " must be " + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error("Unknown option " + opt);
    }
  }
}
var validator$1 = {
  assertOptions,
  validators: validators$1
};
var utils$2 = utils$e;
var buildURL2 = buildURL$2;
var InterceptorManager = InterceptorManager_1;
var dispatchRequest2 = dispatchRequest$1;
var mergeConfig$1 = mergeConfig$2;
var validator = validator$1;
var validators = validator.validators;
function Axios$1(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
Axios$1.prototype.request = function request(configOrUrl, config) {
  if (typeof configOrUrl === "string") {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }
  config = mergeConfig$1(this.defaults, config);
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = "get";
  }
  var transitional2 = config.transitional;
  if (transitional2 !== void 0) {
    validator.assertOptions(transitional2, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
      return;
    }
    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });
  var promise;
  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest2, void 0];
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);
    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error2) {
      onRejected(error2);
      break;
    }
  }
  try {
    promise = dispatchRequest2(newConfig);
  } catch (error2) {
    return Promise.reject(error2);
  }
  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }
  return promise;
};
Axios$1.prototype.getUri = function getUri(config) {
  config = mergeConfig$1(this.defaults, config);
  return buildURL2(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
};
utils$2.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$2.forEach(["post", "put", "patch"], function forEachMethodWithData2(method) {
  Axios$1.prototype[method] = function(url, data2, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: data2
    }));
  };
});
var Axios_1 = Axios$1;
var Cancel = Cancel_1;
function CancelToken(executor) {
  if (typeof executor !== "function") {
    throw new TypeError("executor must be a function.");
  }
  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  this.promise.then(function(cancel) {
    if (!token._listeners)
      return;
    var i;
    var l = token._listeners.length;
    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });
  this.promise.then = function(onfulfilled) {
    var _resolve;
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);
    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };
    return promise;
  };
  executor(function cancel(message) {
    if (token.reason) {
      return;
    }
    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }
  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};
CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token,
    cancel
  };
};
var CancelToken_1 = CancelToken;
var spread = function spread2(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};
var utils$1 = utils$e;
var isAxiosError = function isAxiosError2(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
};
var utils = utils$e;
var bind3 = bind$2;
var Axios = Axios_1;
var mergeConfig2 = mergeConfig$2;
var defaults = defaults_1;
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind3(Axios.prototype.request, context);
  utils.extend(instance, Axios.prototype, context);
  utils.extend(instance, context);
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig2(defaultConfig, instanceConfig));
  };
  return instance;
}
var axios = createInstance(defaults);
axios.Axios = Axios;
axios.Cancel = Cancel_1;
axios.CancelToken = CancelToken_1;
axios.isCancel = isCancel$1;
axios.VERSION = data.version;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;
axios.isAxiosError = isAxiosError;
axios$1.exports = axios;
axios$1.exports.default = axios;
`${appConfig.collectKeeperUrl}/vgs`;
const renameKey = (oldKey, newKey, userObject) => {
  const _a = userObject, { [oldKey]: value } = _a, common = __objRest(_a, [__restKey(oldKey)]);
  return __spreadValues(__spreadValues({}, common), { [newKey]: value });
};
var FormStatusTypes = /* @__PURE__ */ ((FormStatusTypes2) => {
  FormStatusTypes2["DEFAULT"] = "default";
  FormStatusTypes2["CARD_LIST"] = "card-list";
  FormStatusTypes2["SUCCESS"] = "success";
  FormStatusTypes2["LOADING"] = "loading";
  FormStatusTypes2["ERROR"] = "error";
  return FormStatusTypes2;
})(FormStatusTypes || {});
const deprecatedPropNames = {
  authToken: "accessToken",
  vaultId: "tenantId"
};
const renameDeprecatedProps = (params2) => {
  Object.keys(deprecatedPropNames).forEach((oldName) => {
    const newName = deprecatedPropNames[oldName];
    if (oldName in params2 && newName in params2) {
      delete params2[oldName];
    }
    if (oldName in params2) {
      params2 = renameKey(oldName, newName, params2);
    }
  });
  return params2;
};
const OptionalJWTToken = (token) => {
  return token == null ? void 0 : String(token);
};
const BillingField = default_1({
  visible: boolean.optional(true)
});
const BillingAddressConfigurationSchema = default_1.either({
  validCountries: array.of(string).min(1).optional(),
  country: BillingField,
  address1: BillingField,
  address2: BillingField,
  city: BillingField,
  postalCode: BillingField
});
const CheckoutConfigSchema = default_1({
  vaultId: string.optional(),
  tenantId: string,
  environment: string,
  submitPath: string.optional("/financial_instruments"),
  billingAddress: default_1.either(BillingAddressConfigurationSchema, boolean).optional(false),
  billingAddressConfiguration: unknown,
  accessToken: OptionalJWTToken,
  formStatus: string.optional("default"),
  isSavedCards: boolean.optional(false),
  cardsList: array.optional(),
  isSaveCardOptionEnabled: boolean.optional(false)
});
const CheckoutConfigSchemaSaveCard = default_1.merge(CheckoutConfigSchema, {
  cardsList: array.optional()
});
const configValidator = CheckoutConfigSchema.destruct();
const configValidatorSaveCard = CheckoutConfigSchemaSaveCard.destruct();
function parseConstructorParams(clientProvidedParams, isSavedCards) {
  var _a;
  const props = renameDeprecatedProps(clientProvidedParams);
  const [err, params2] = isSavedCards ? configValidatorSaveCard(props) : configValidator(props);
  if (err || !params2) {
    throw new Error((_a = err == null ? void 0 : err.message) != null ? _a : "Configuration error.");
  }
  return __spreadValues({}, params2);
}
const ThemeSchema = default_1({
  colors: unknown.object().optional(),
  shadows: unknown.object().optional(),
  borderStyles: unknown.object().optional(),
  borderWidths: unknown.object().optional(),
  fonts: unknown.object().optional(),
  fontWeights: unknown.object().optional(),
  fontSizes: unknown.object().optional(),
  lineHeights: unknown.object().optional(),
  space: unknown.object().optional(),
  transitions: unknown.object().optional(),
  radii: unknown.object().optional(),
  labels: unknown.object().optional()
});
const StyleSchema = unknown.object().optional();
const StyleConfigSchema = default_1({
  global: default_1({
    "@font-face": unknown.object().optional()
  }).optional(),
  root: StyleSchema,
  baseInput: StyleSchema,
  baseCheckbox: StyleSchema,
  baseFormControl: StyleSchema,
  cardholderSplitNameContainer: StyleSchema,
  cardHolderControl: StyleSchema,
  cardNumberControl: StyleSchema,
  cardCvcAndExpContainer: StyleSchema,
  cardExpControl: StyleSchema,
  cardCvcControl: StyleSchema,
  countryControl: StyleSchema,
  address1Control: StyleSchema,
  address2Control: StyleSchema,
  cityControl: StyleSchema,
  postalCodeControl: StyleSchema,
  saveCardTitleControl: StyleSchema,
  saveCardCheckboxControl: StyleSchema,
  cityAndPostalCodeControl: StyleSchema,
  form: StyleSchema,
  fieldset: StyleSchema,
  legend: StyleSchema,
  errorMessage: StyleSchema,
  submitButton: StyleSchema,
  submitIconContainer: StyleSchema,
  submitSuccessView: StyleSchema,
  submitErrorView: StyleSchema,
  cardsListView: StyleSchema,
  newCardButtonControl: StyleSchema,
  cardListTitleControl: StyleSchema,
  removeCardControl: StyleSchema,
  savedCardItemControl: StyleSchema,
  cardsListTitleControl: StyleSchema
});
const CheckoutAdditionalParams = default_1({
  accessToken: OptionalJWTToken,
  theme: ThemeSchema.optional(void 0),
  labels: unknown.object().optional(void 0),
  style: StyleConfigSchema.optional({}),
  preventSubmitOnEnter: boolean.optional(false),
  hasCustomBodyCallback: boolean.optional(false),
  headers: unknown.object().optional({}),
  withCredentials: boolean.optional(false),
  method: string.optional(void 0),
  formStatus: string.optional("default"),
  isSavedCards: boolean.optional(false)
});
const SubmitParams = default_1({
  submitPath: string.optional(),
  hasCustomBodyCallback: boolean.optional(false),
  headers: unknown.object().optional({}),
  withCredentials: boolean.optional(false),
  method: string.optional(void 0)
});
const additionalParamsValidator = CheckoutAdditionalParams.destruct();
const submitParamsValidator = SubmitParams.destruct();
function parseAdditionalParams(clientProvidedParams, validator2 = additionalParamsValidator) {
  var _a;
  const clientParams = renameDeprecatedProps(__spreadValues({}, clientProvidedParams));
  if ("getSubmitData" in clientParams) {
    clientParams.hasCustomBodyCallback = typeof clientParams.getSubmitData === "function";
  }
  const [err, params2] = validator2(clientParams);
  if (err || !params2) {
    throw new Error((_a = err == null ? void 0 : err.message) != null ? _a : "Configuration error.");
  }
  return params2;
}
const params = lib.parse(window.location.search, {
  ignoreQueryPrefix: true
});
function parseBillingAddress({ billingAddress }) {
  if (typeof billingAddress === "string") {
    return billingAddress === "true" || false;
  }
  return typeof billingAddress === "object";
}
function parseBillingAddressConfiguration({
  billingAddressConfiguration
}) {
  if (typeof billingAddressConfiguration === "object") {
    return billingAddressConfiguration;
  }
}
function getInitialConfig() {
  return {
    cardsList: [],
    updateConfig: () => {
    },
    environment: params.environment,
    tenantId: params.tenantId,
    accessToken: params.accessToken,
    submitPath: params.submitPath,
    formId: params.formId,
    createdAt: params.createdAt,
    configResolved: false,
    billingAddress: parseBillingAddress(params),
    billingAddressConfiguration: parseBillingAddressConfiguration(params),
    style: {},
    isSavedCards: false,
    formStatus: params.formStatus || FormStatusTypes.DEFAULT,
    isSaveCardOptionEnabled: false
  };
}
var MessageToIframe = /* @__PURE__ */ ((MessageToIframe2) => {
  MessageToIframe2["SetInitialParams"] = "SetInitialParams";
  MessageToIframe2["UpdateParams"] = "UpdateParams";
  MessageToIframe2["SubmitSignal"] = "SubmitSignal";
  MessageToIframe2["ClearFields"] = "ClearFields";
  return MessageToIframe2;
})(MessageToIframe || {});
const MessageFromIframe = {
  JsLoaded: "JsLoaded",
  AppMounted: "AppMounted",
  FieldFocus: "FieldFocus",
  FieldBlur: "FieldBlur",
  FieldChange: "FieldChange",
  SubmitStart: "SubmitStart",
  SubmitFail: "SubmitFail",
  SubmitSuccess: "SubmitSuccess",
  GetSubmitDataSignal: "GetSubmitDataSignal",
  WindowHeightChange: "WindowHeightChange",
  RemoveCard: "RemoveCard"
};
const messageOriginId = "vgs";
var tinyEmitter = { exports: {} };
function E() {
}
E.prototype = {
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx
    });
    return this;
  },
  once: function(name, callback, ctx) {
    var self = this;
    function listener() {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data2 = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;
    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data2);
    }
    return this;
  },
  off: function(name, callback) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
tinyEmitter.exports = E;
var TinyEmitter = tinyEmitter.exports.TinyEmitter = E;
class MessageCommunication {
  constructor(isTargetEvent, getReplyToWindow, replyToOrigin) {
    __privateAdd(this, _createChannelId);
    __privateAdd(this, _emitter, new TinyEmitter());
    __privateAdd(this, _lastChannelId, 0);
    this.getReplyToWindow = getReplyToWindow;
    this.replyToOrigin = replyToOrigin;
    window.addEventListener("message", (event) => {
      if (isTargetEvent(event)) {
        const data2 = __spreadValues({}, event.data);
        if (data2.replyWithType) {
          data2.reply = (payload) => {
            this.sendMessage(__spreadProps(__spreadValues({}, payload), {
              type: data2.replyWithType
            }));
          };
        }
        __privateGet(this, _emitter).emit(event.data.type, data2);
      }
    });
  }
  on(message, callback) {
    __privateGet(this, _emitter).on(message, callback);
  }
  off(message, callback) {
    __privateGet(this, _emitter).off(message, callback);
  }
  once(message, callback) {
    __privateGet(this, _emitter).once(message, callback);
  }
  sendMessage(payload) {
    const win = this.getReplyToWindow();
    win == null ? void 0 : win.postMessage(__spreadProps(__spreadValues({}, payload), {
      origin: messageOriginId
    }), this.replyToOrigin);
  }
  remoteExecute(payload) {
    const replyWithType = __privateMethod(this, _createChannelId, createChannelId_fn).call(this);
    return new Promise((resolve) => {
      this.once(replyWithType, resolve);
      this.sendMessage(__spreadProps(__spreadValues({}, payload), { replyWithType }));
    });
  }
}
_emitter = new WeakMap();
_lastChannelId = new WeakMap();
_createChannelId = new WeakSet();
createChannelId_fn = function() {
  return `${++__privateWrapper(this, _lastChannelId)._}.${new Date().toJSON()}`;
};
function randomId(root = "randomId") {
  const date = new Date().getDate();
  const randomString = `${Math.random()}`.replace(/[^\w\d]/, "");
  return `${root}${date}${randomString}`;
}
function createSerializableNode(key) {
  return {
    ___type: "vgs-key",
    key
  };
}
const valueKeys = {
  cardHolder: createSerializableNode("cardHolder"),
  cardNumber: createSerializableNode("cardNumber"),
  cardCvc: createSerializableNode("cardCvc"),
  cardExp: createSerializableNode("cardExp"),
  expMonth: createSerializableNode("expMonth"),
  expYear: createSerializableNode("expYear"),
  country: createSerializableNode("country"),
  address1: createSerializableNode("address1"),
  address2: createSerializableNode("address2"),
  city: createSerializableNode("city"),
  postalCode: createSerializableNode("postalCode"),
  zipCode: createSerializableNode("zipCode"),
  saveCard: createSerializableNode("saveCard")
};
const EventTypes = MessageFromIframe;
const ClassName = {
  CHECKOUT: "Checkout",
  SAVED_CARDS: "SavedCards"
};
class Checkout {
  constructor(params2) {
    __privateAdd(this, _iframe, null);
    __privateAdd(this, _iframeCommunication, new MessageCommunication((event) => {
      var _a;
      const isTargetFrame = __privateGet(this, _iframe) && event.source === __privateGet(this, _iframe).contentWindow;
      const isCollectLikeMessage = ((_a = event.data) == null ? void 0 : _a.origin) === messageOriginId;
      return Boolean(isTargetFrame && isCollectLikeMessage);
    }, () => {
      var _a;
      return (_a = __privateGet(this, _iframe)) == null ? void 0 : _a.contentWindow;
    }, appConfig.checkoutOrigin));
    __privateAdd(this, _initParams, void 0);
    __privateAdd(this, _cname, void 0);
    __privateAdd(this, _getSubmitData, void 0);
    __privateAdd(this, _updateLocalParams, (params2) => {
      return __spreadProps(__spreadValues({}, params2), { isSavedCards: __privateGet(this, _initParams).isSavedCards });
    });
    __privateSet(this, _initParams, parseConstructorParams(params2, false));
    __privateSet(this, _cname, null);
  }
  mount(element, params2) {
    if (__privateGet(this, _iframe)) {
      throw new Error("Checkout is already mounted");
    }
    __privateSet(this, _initParams, __spreadProps(__spreadValues({}, __privateGet(this, _initParams)), {
      isSavedCards: params2 == null ? void 0 : params2.isSavedCards
    }));
    const node = isString$1(element) ? document.querySelector(element) : element;
    const parsedParams = parseAdditionalParams(params2);
    __privateSet(this, _iframe, document.createElement("iframe"));
    __privateGet(this, _iframe).style = `width:100%;border:none;`;
    __privateGet(this, _iframeCommunication).on(MessageFromIframe.WindowHeightChange, (data2) => {
      if (__privateGet(this, _iframe)) {
        __privateGet(this, _iframe).height = data2.height;
      }
    });
    const query = lib.stringify({
      formId: randomId(),
      tenantId: __privateGet(this, _initParams).tenantId,
      environment: __privateGet(this, _initParams).environment,
      submitPath: __privateGet(this, _initParams).submitPath,
      createdAt: Date.now(),
      billingAddress: __privateGet(this, _initParams).billingAddress,
      billingAddressConfiguration: __privateGet(this, _initParams).billingAddressConfiguration,
      accessToken: __privateGet(this, _initParams).accessToken,
      formStatus: __privateGet(this, _initParams).formStatus,
      isSaveCardOptionEnabled: __privateGet(this, _initParams).isSaveCardOptionEnabled
    });
    const { checkoutOrigin, iframePath } = appConfig;
    const name = __privateGet(this, _cname) ? `${__privateGet(this, _cname)}__${__privateGet(this, _initParams).tenantId}` : "index";
    __privateGet(this, _iframe).src = `${checkoutOrigin}${iframePath}internal-app/${name}.html?${query}`;
    if (params2 && "getSubmitData" in params2) {
      __privateSet(this, _getSubmitData, typeof params2.getSubmitData === "function" ? params2.getSubmitData : void 0);
    }
    __privateGet(this, _iframe).setAttribute("frameborder", "0");
    __privateGet(this, _iframe).setAttribute("allowtransparency", "on");
    __privateGet(this, _iframe).setAttribute("scrolling", "no");
    __privateGet(this, _iframe).setAttribute("title", "Secure VGS Checkout");
    __privateGet(this, _iframeCommunication).once(MessageFromIframe.JsLoaded, () => {
      var _a, _b, _c, _d;
      let params22 = __spreadValues({}, parsedParams);
      if ((_a = __privateGet(this, _initParams)) == null ? void 0 : _a.isSavedCards) {
        params22.isSavedCards = (_b = __privateGet(this, _initParams)) == null ? void 0 : _b.isSavedCards;
        params22.isSaveCardOptionEnabled = (_c = __privateGet(this, _initParams)) == null ? void 0 : _c.isSaveCardOptionEnabled;
        params22.cardsList = (_d = __privateGet(this, _initParams)) == null ? void 0 : _d.cardsList;
      }
      __privateGet(this, _iframeCommunication).sendMessage({
        type: MessageToIframe.SetInitialParams,
        params: params22
      });
    });
    __privateGet(this, _iframeCommunication).on(MessageFromIframe.GetSubmitDataSignal, (data2) => {
      if (typeof __privateGet(this, _getSubmitData) === "function") {
        const result = __privateGet(this, _getSubmitData).call(this, valueKeys);
        data2.reply({ body: result });
      } else {
        throw new Error("'getSubmitData' must be a function");
      }
    });
    if (node) {
      node.appendChild(__privateGet(this, _iframe));
    } else {
      throw new Error("Can't mount Checkout. Specified node doesn't exist!");
    }
  }
  on(event, callback) {
    __privateGet(this, _iframeCommunication).on(event, callback);
  }
  once(event, callback) {
    __privateGet(this, _iframeCommunication).once(event, callback);
  }
  off(event, callback) {
    __privateGet(this, _iframeCommunication).off(event, callback);
  }
  unmount() {
    if (!__privateGet(this, _iframe)) {
      throw new Error("Checkout is not mounted yet");
    }
    __privateGet(this, _iframe).remove();
    __privateSet(this, _iframe, null);
  }
  update(params2) {
    if (!__privateGet(this, _iframe)) {
      throw new Error("Checkout is not mounted yet");
    }
    if (typeof (params2 == null ? void 0 : params2.getSubmitData) === "function") {
      __privateSet(this, _getSubmitData, params2.getSubmitData);
    }
    const parsedParams = __privateGet(this, _updateLocalParams).call(this, params2);
    if ((parsedParams == null ? void 0 : parsedParams.formStatus) === "card-list" && !__privateGet(this, _initParams).isSavedCards) {
      throw new Error("FormStatus 'card-list' supported only for SavedCards");
    }
    if (__privateGet(this, _initParams).isSavedCards && (params2 == null ? void 0 : params2.cardsList)) {
      parsedParams.formStatus = "card-list";
      parsedParams.cardsList = params2 == null ? void 0 : params2.cardsList;
    }
    __privateGet(this, _iframeCommunication).sendMessage({
      type: MessageToIframe.UpdateParams,
      params: parsedParams
    });
  }
  reset() {
    if (!__privateGet(this, _iframe)) {
      throw new Error("Checkout is not mounted yet");
    }
    const parsedParams = parseAdditionalParams(__privateGet(this, _updateLocalParams).call(this, getInitialConfig()));
    __privateGet(this, _iframeCommunication).sendMessage({
      type: MessageToIframe.UpdateParams,
      params: parsedParams
    });
  }
  clear() {
    if (!__privateGet(this, _iframe)) {
      throw new Error("Checkout is not mounted yet");
    }
    __privateGet(this, _iframeCommunication).sendMessage({
      type: MessageToIframe.ClearFields,
      params: true
    });
  }
  useCname(cname) {
    __privateSet(this, _cname, cname);
  }
  submit(params2) {
    if (typeof (params2 == null ? void 0 : params2.getSubmitData) === "function") {
      __privateSet(this, _getSubmitData, params2.getSubmitData);
    }
    return new Promise((resolve, reject) => {
      __privateGet(this, _iframeCommunication).remoteExecute({
        type: MessageToIframe.SubmitSignal,
        params: parseAdditionalParams(params2, submitParamsValidator)
      }).then((_a) => {
        var _b = _a, { type: type2, success } = _b, payload = __objRest(_b, ["type", "success"]);
        if (success) {
          resolve(payload);
        } else {
          reject(payload);
        }
      });
    });
  }
}
_iframe = new WeakMap();
_iframeCommunication = new WeakMap();
_initParams = new WeakMap();
_cname = new WeakMap();
_getSubmitData = new WeakMap();
_updateLocalParams = new WeakMap();
__publicField(Checkout, "values", valueKeys);
class SavedCards extends Checkout {
  constructor(params2) {
    super(params2);
    __privateAdd(this, _initParams2, void 0);
    __privateSet(this, _initParams2, parseConstructorParams(params2, true));
  }
  mount(element, params2) {
    super.mount(element, __spreadProps(__spreadValues({}, params2), {
      formStatus: FormStatusTypes.CARD_LIST,
      isSavedCards: true
    }));
  }
}
_initParams2 = new WeakMap();
export { Checkout, ClassName, EventTypes, SavedCards };
