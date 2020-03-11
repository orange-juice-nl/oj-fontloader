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
require("oj-event");
var oj_ajax_1 = require("oj-ajax");
var FontLoader = /** @class */ (function () {
    function FontLoader() {
    }
    FontLoader.isLoaded = function (name) {
        return FontLoader.loaded[name] === true;
    };
    FontLoader.loadCustomFont = function (name, url, i) {
        if (i === void 0) { i = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var file, s;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (FontLoader.loaded[name] !== undefined)
                            return [2 /*return*/, name];
                        FontLoader.loaded[name] = false;
                        return [4 /*yield*/, oj_ajax_1.get(url, { responseType: "blob" })];
                    case 1:
                        file = _a.sent();
                        s = document.createElement('style');
                        s.setAttribute("type", "text/css");
                        s.appendChild(document.createTextNode("@font-face { font-family: '" + name + "'; src: url('" + URL.createObjectURL(file) + "'); style: 'normal'; weight: 400; }"));
                        document.head.appendChild(s);
                        return [4 /*yield*/, FontLoader.renderOnBody(name, i * 10).then(function () { return FontLoader.loaded[name] = true; })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, name];
                }
            });
        });
    };
    FontLoader.renderOnBody = function (fontFamily, top, left) {
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
        temp.style.left = left + "px";
        temp.style.top = top + "px";
        document.body.appendChild(temp);
        var p = new Promise(function (res) {
            return tempImg.on("load", function (e) {
                setTimeout(function () { return document.body.removeChild(temp); }, 100);
                res();
            });
        });
        tempImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
        return p;
    };
    FontLoader.loadCustomFonts = function (families) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(families.filter(function (item, i, ar) {
                        return ar.findIndex(function (x) { return x.name === item.name; }) === i;
                    }).map(function (x, i) {
                        return FontLoader.loadCustomFont(x.name, x.url, i);
                    }))];
            });
        });
    };
    FontLoader.loadGoogleFont = function (name, weights) {
        if (weights === void 0) { weights = []; }
        return __awaiter(this, void 0, void 0, function () {
            var nameStr, weightStr, res, s;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (FontLoader.loaded[name] !== undefined)
                            return [2 /*return*/, name];
                        FontLoader.loaded[name] = false;
                        nameStr = name.replace(/\s/g, "+");
                        weightStr = weights.length > 0 ? ":" + weights.join(",") : "";
                        return [4 /*yield*/, oj_ajax_1.get("https://fonts.googleapis.com/css?family=" + nameStr + weightStr)];
                    case 1:
                        res = _a.sent();
                        if (typeof res !== "string")
                            throw new Error("failed to load " + name);
                        s = document.createElement('style');
                        s.setAttribute("type", "text/css");
                        s.appendChild(document.createTextNode(res));
                        document.head.appendChild(s);
                        return [4 /*yield*/, FontLoader.renderOnBody(name).then(function () {
                                return FontLoader.loaded[name] = true;
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, name];
                }
            });
        });
    };
    FontLoader.loadGoogleFonts = function (families) {
        return __awaiter(this, void 0, void 0, function () {
            var succeeded, failed;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        succeeded = [];
                        failed = [];
                        return [4 /*yield*/, Promise.all(families.map(function (x) {
                                return _this.loadGoogleFont(x.name, x.weights)
                                    .then(function () {
                                    return succeeded.push(x.name);
                                })
                                    .catch(function () {
                                    return failed.push(x.name);
                                });
                            }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, [succeeded, failed]];
                }
            });
        });
    };
    FontLoader.loaded = {};
    return FontLoader;
}());
exports.default = FontLoader;
