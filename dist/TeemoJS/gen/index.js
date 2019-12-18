"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
// This file creates defaultConfig.json
// This is not meant to be `require`d in a project.
var fetch = require("node-fetch");
var writeFile = require("fs").writeFile;
var writeFileAsync = require("util").promisify(writeFile);
var overrides = {
    "*": {
        "regionTable": {
            "br": "br1",
            "eune": "eun1",
            "euw": "euw1",
            "jp": "jp1",
            "kr": "kr",
            "lan": "la1",
            "las": "la2",
            "na": "na1",
            "oce": "oc1",
            "tr": "tr1",
            "ru": "ru",
            "pbe": "pbe1"
        }
    },
    "tft": {
        "matchV1": {
            "*": {
                "regionTable": {
                    "br": "americas",
                    "eune": "europe",
                    "euw": "europe",
                    "jp": "asia",
                    "kr": "asia",
                    "lan": "americas",
                    "las": "americas",
                    "na": "americas",
                    "oce": "americas",
                    "tr": "europe",
                    "ru": "europe",
                    "pbe": "americas",
                    "americas": "americas",
                    "europe": "europe",
                    "asia": "asia"
                }
            }
        }
    },
    "tournament": {
        "*": {
            "regionTable": {
                "br": "americas",
                "eune": "americas",
                "euw": "americas",
                "jp": "americas",
                "kr": "americas",
                "lan": "americas",
                "las": "americas",
                "na": "americas",
                "oce": "americas",
                "tr": "americas",
                "ru": "americas",
                "pbe": "americas",
                "americas": "americas"
            }
        }
    }
};
var defaultConfig = require('../config/empty.json');
function camelCase() {
    var tokens = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        tokens[_i] = arguments[_i];
    }
    return tokens.shift() + tokens.map(function (t) { return t.charAt(0).toUpperCase() + t.slice(1); }).join('');
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var res, endpoints, paths, _i, _a, _b, path, methodOperation, _c, _d, _e, method, operation, topLayer, _f, endpoint, name_1, endpointSegments, layer, _g, _h, segment, outputDefault, promiseDefault, outputKernel, promiseKernel;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0: return [4 /*yield*/, fetch('http://www.mingweisamuel.com/riotapi-schema/openapi-3.0.0.json')];
                case 1:
                    res = _j.sent();
                    if (200 !== res.status)
                        throw new Error("Fetch failed: " + res.status + ".");
                    endpoints = {};
                    return [4 /*yield*/, res.json()];
                case 2:
                    paths = (_j.sent()).paths;
                    for (_i = 0, _a = Object.entries(paths); _i < _a.length; _i++) {
                        _b = _a[_i], path = _b[0], methodOperation = _b[1];
                        path = path.replace('{encryptedSummonerId}', '{summonerId}')
                            .replace('{encryptedAccountId}', '{accountId}')
                            .replace('{encryptedPUUID}', '{puuid}');
                        for (_c = 0, _d = Object.entries(methodOperation); _c < _d.length; _c++) {
                            _e = _d[_c], method = _e[0], operation = _e[1];
                            if (method.startsWith('x-'))
                                continue;
                            topLayer = 'lol';
                            _f = operation.operationId.split('.'), endpoint = _f[0], name_1 = _f[1];
                            endpointSegments = endpoint.split('-');
                            if (['tft', 'tournament', 'lol'].includes(endpointSegments[0]))
                                topLayer = endpointSegments.shift();
                            endpoint = camelCase.apply(void 0, endpointSegments);
                            console.log(topLayer.padEnd(10) + " " + endpoint.padEnd(20) + " " + name_1.padEnd(30) + " (" + method + ")");
                            layer = endpoints;
                            for (_g = 0, _h = [topLayer, endpoint, name_1]; _g < _h.length; _g++) {
                                segment = _h[_g];
                                layer = layer[segment] || (layer[segment] = {});
                            }
                            Object.assign(layer, {
                                path: path,
                                fetch: 'get' === method ? undefined : { method: method }
                            });
                        }
                    }
                    outputDefault = __assign(__assign({}, defaultConfig), { endpoints: endpoints });
                    objectInsert(outputDefault.endpoints, overrides);
                    promiseDefault = writeFileAsync(__dirname + '/../config/default.json', JSON.stringify(outputDefault, null, 2));
                    outputKernel = __assign(__assign({}, outputDefault), { key: undefined, keyPath: undefined, regionPath: "queryParams.platform" });
                    promiseKernel = writeFileAsync(__dirname + '/../config/kernel.json', JSON.stringify(outputKernel, null, 2));
                    return [4 /*yield*/, Promise.all([promiseDefault, promiseKernel])];
                case 3:
                    _j.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/* Insert fields value into target recursively. Throws if a field in target would be overwritten. */
function objectInsert(target, value) {
    for (var _i = 0, _a = Object.keys(value); _i < _a.length; _i++) {
        var key = _a[_i];
        if (target[key]) {
            if (typeof target[key] !== 'object')
                throw new Error("Attempted to overwrite " + key + ".");
            objectInsert(target[key], value[key]);
        }
        else
            target[key] = value[key];
    }
}
main().catch(console.err);
