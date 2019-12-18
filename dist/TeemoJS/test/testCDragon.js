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
var parallel = require('mocha.parallel');
var assert = require("assert");
var TeemoJS = require("../src");
parallel('CDragon API', function () {
    this.slow(1500);
    var api = TeemoJS(TeemoJS.cdragonConfig);
    var version = 'pbe';
    var locale = 'default';
    it('gets cdn champion data by key', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.req('cdn.champion', ['latest', 'monkeyking'])];
                    case 1:
                        data = _a.sent();
                        assert.ok(data);
                        assert.equal(data.name, 'Wukong');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('gets cdn champion data by id', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.req('cdn.champion', { patch: 'latest', champion: 17 })];
                    case 1:
                        data = _a.sent();
                        assert.ok(data);
                        assert.equal(data.name, 'Teemo');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('gets champion-summary.json', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, teemo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.req('raw.championSummary', { version: version, locale: locale })];
                    case 1:
                        data = _a.sent();
                        assert.ok(data);
                        teemo = data.find(function (_a) {
                            var alias = _a.alias;
                            return 'Teemo' === alias;
                        });
                        assert.ok(teemo);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('gets champions/17.json (Teemo)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var teemo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.req('raw.championById', [version, locale, 17])];
                    case 1:
                        teemo = _a.sent();
                        assert.ok(teemo);
                        assert.equal(teemo.title, "the Swift Scout");
                        return [2 /*return*/];
                }
            });
        });
    });
    it('gets champions/-1.json (None)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.req('raw.championById', { version: version, locale: locale, id: -1 })];
                    case 1:
                        data = _a.sent();
                        assert.ok(data);
                        assert.equal(data.name, 'None');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('gets maps.json', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, sr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.req('raw.maps', [version, 'ja_jp'])];
                    case 1:
                        data = _a.sent();
                        assert.ok(data);
                        sr = data.find(function (_a) {
                            var id = _a.id;
                            return 11 === id;
                        });
                        assert.ok(sr);
                        assert.equal(sr.name, 'サモナーズリフト');
                        return [2 /*return*/];
                }
            });
        });
    });
    it('gets summoner-emotes.json', function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, teemote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.req('raw.summonerEmotes', [version, 'zh_cn'])];
                    case 1:
                        data = _a.sent();
                        assert.ok(data);
                        teemote = data.find(function (_a) {
                            var id = _a.id;
                            return 3212 === id;
                        });
                        assert.ok(teemote);
                        assert.equal(teemote.name, '提莫表情');
                        return [2 /*return*/];
                }
            });
        });
    });
});
