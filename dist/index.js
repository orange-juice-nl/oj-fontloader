"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFonts = exports.loadFont = exports.getFontUrl = exports.isFontLoaded = void 0;
var loaded = {};
var isFontLoaded = function (name) {
    return loaded[name] === true;
};
exports.isFontLoaded = isFontLoaded;
var renderOnBody = function (fontFamily, top, left) {
    if (top === void 0) { top = 0; }
    if (left === void 0) { left = 0; }
    //HACK to load fontfamily before canvas render
    var temp = document.createElement("div");
    temp.classList.add("font-test");
    var tempImg = document.createElement("img");
    var tempSpan = document.createElement("span");
    tempSpan.style.fontFamily = "\"" + fontFamily + "\"";
    tempSpan.innerText = fontFamily;
    temp.appendChild(tempSpan);
    temp.appendChild(tempImg);
    temp.style.position = "fixed";
    temp.style.left = "".concat(left, "px");
    temp.style.top = "".concat(top, "px");
    document.body.appendChild(temp);
    var p = new Promise(function (res) {
        return tempImg.addEventListener("load", function () {
            return setTimeout(function () {
                document.body.removeChild(temp);
                res();
            }, 100);
        });
    });
    tempImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    return p;
};
var load = function (name, weights) {
    if (weights === void 0) { weights = []; }
    return __awaiter(void 0, void 0, void 0, function () {
        var css, style;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch((0, exports.getFontUrl)(name, weights)).then(function (x) { return x.text(); })];
                case 1:
                    css = _a.sent();
                    style = document.createElement("style");
                    style.setAttribute("type", "text/css");
                    style.appendChild(document.createTextNode(css));
                    document.head.appendChild(style);
                    return [4 /*yield*/, renderOnBody(name)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
var getFontUrl = function (name, weights) {
    if (weights === void 0) { weights = []; }
    var nameStr = name.replace(/\s/g, "+");
    var weightStr = weights.length > 0 ? ":".concat(weights.join(",")) : "";
    return "https://fonts.googleapis.com/css?family=".concat(nameStr).concat(weightStr);
};
exports.getFontUrl = getFontUrl;
var loadFont = function (name, weights) {
    if (weights === void 0) { weights = []; }
    if (!loaded[name]) {
        var p = load(name, weights);
        loaded[name] = p;
        p.finally(function () { return loaded[name] = true; });
    }
    return loaded[name] === true
        ? Promise.resolve()
        : loaded[name];
};
exports.loadFont = loadFont;
var loadFonts = function (families) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, Promise.all(families.map(function (x) { return (0, exports.loadFont)(x.name, x.weights); }))];
}); }); };
exports.loadFonts = loadFonts;
