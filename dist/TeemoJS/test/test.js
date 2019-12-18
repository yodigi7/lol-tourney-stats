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
var parallel = require('mocha.parallel');
var assert = require("assert");
var TeemoJS = require("../src");
describe('TeemoJS LoL', function () {
    var api;
    before(function () {
        var apiKey = process.env.RIOT_API_KEY;
        if (!apiKey)
            throw new Error('Must set RIOT_API_KEY in environment.');
        api = TeemoJS(apiKey, __assign(__assign({}, TeemoJS.defaultConfig), { maxConcurrent: 10 }));
    });
    parallel('bad args', function () {
        it('handles bad dist factor', function () {
            assert.throws(function () { return api.setDistFactor(0); });
        });
        it('handles bad region', function () {
            assert.throws(function () { return api.req('na1', 'lol.statusV3.getShardData'); }); // Should be 'na'.
        });
        it('handles missing path', function () {
            // TODO return promises?
            assert.throws(function () { return api.req('na', 'hello'); });
            assert.throws(function () { return api.req('na', 'hello.world'); });
        });
        it('handles missing path', function () {
            // TODO return promises?
            assert.throws(function () { return api.req('na', 'hello'); });
            assert.throws(function () { return api.req('na', 'hello.world'); });
            assert.throws(function () { return api.req('na', 'league'); });
        });
        it('handles wrong path args', function () {
            // queue, tier, division.
            assert.throws(function () { return api.req('na', 'lol.leagueV4.getLeagueEntries', 'hi'); });
            assert.throws(function () { return api.req('na', 'lol.leagueV4.getLeagueEntries', ['RANKED_SOLO_5x5', 'GOLD']); });
            assert.throws(function () { return api.req('na', 'lol.leagueV4.getLeagueEntries', { tier: 'DIAMOND', division: '5' }); });
        });
    });
    parallel('#req()', function () {
        this.slow(1500);
        it('championMastery.getAllChampionMasteries', function () {
            return __awaiter(this, void 0, void 0, function () {
                var summoner, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.req('na', 'lol.summonerV4.getBySummonerName', 'lugnutsk')];
                        case 1:
                            summoner = _a.sent();
                            return [4 /*yield*/, api.req('na', 'lol.championMasteryV4.getAllChampionMasteries', { summonerId: summoner.id })];
                        case 2:
                            data = _a.sent();
                            assert.ok(data);
                            assert.ok(data.length >= 48);
                            assert.equal(data[0].championId, 143);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('championMastery.getChampionMastery', function () {
            return __awaiter(this, void 0, void 0, function () {
                var summoner, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.req('na', 'lol.summonerV4.getBySummonerName', 'lugnutsk')];
                        case 1:
                            summoner = _a.sent();
                            return [4 /*yield*/, api.req('na', 'lol.championMasteryV4.getChampionMastery', [summoner.id, 143])];
                        case 2:
                            data = _a.sent();
                            assert.equal(data.championId, 143);
                            assert.ok(data.championPoints >= 500000);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('match.getMatchlist', function () {
            return __awaiter(this, void 0, void 0, function () {
                var summoner, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.req('na', 'lol.summonerV4.getBySummonerName', 'c9 sneaky')];
                        case 1:
                            summoner = _a.sent();
                            return [4 /*yield*/, api.req('na', 'lol.matchV4.getMatchlist', summoner.accountId, { champion: 429, queue: 420 })];
                        case 2:
                            data = _a.sent();
                            assert.ok(data);
                            assert.ok(data.matches);
                            assert.ok(data.matches.length > 10);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('match.getMatchlist (list params)', function () {
            return __awaiter(this, void 0, void 0, function () {
                var summoner, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.req('na', 'lol.summonerV4.getBySummonerName', 'c9 sneaky')];
                        case 1:
                            summoner = _a.sent();
                            return [4 /*yield*/, api.req('na', 'lol.matchV4.getMatchlist', [summoner.accountId], { champion: [81, 429], queue: 420 })];
                        case 2:
                            data = _a.sent();
                            assert.ok(data);
                            assert.ok(data.matches);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('match.getMatch', function () {
            return api.req('na', 'lol.matchV4.getMatch', 2351868633)
                .then(function (data) {
                assert.ok(data);
                assert.equal(data.gameId, 2351868633);
                assert.equal(data.teams.length, 2);
                assert.equal(data.participants.length, 10);
            });
        });
        it('summoner.getBySummonerName', function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.req('na', 'lol.summonerV4.getBySummonerName', 'Lugn uts k')];
                        case 1:
                            data = _a.sent();
                            assert.ok(data);
                            assert.ok(data.summonerLevel > 30); // Level up.
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('summoner.getBySummonerName encoding test', function () {
            return api.req('na', 'lol.summonerV4.getBySummonerName', { summonerName: 'The Øne And Ønly' })
                .then(function (data) {
                assert.ok(data);
                assert.equal(data.id, 'hJqNbVEFncBg2KuHNUjztd6fJyy9ymX8LjYcGfrIuPXATow');
                assert.ok(data.summonerLevel >= 49);
                assert.equal(data.name, "The Øne And Ønly");
            });
        });
        xit('summoner.getBySummonerName many', function () {
            // return api.req('eun1','league.getMasterLeague', 'RANKED_SOLO_5x5V4')
            //   .then(data => console.log(JSON.stringify(data.entries.map(s => s.summonerName), null, 2)));
            var names = require('./names.json');
            var count = 100;
            return Promise.all(names.slice(0, count).map(function (name) {
                return api.req('eune', 'lol.summonerV4.getBySummonerName', name)
                    .then(function (data) {
                    if (null !== data) { // Null means name no longer exists.
                        //assert.ok(data);
                        //assert.equal(data.name, name); // TODO: handle case and space.
                    }
                    else {
                        console.log("Name not found: \"" + name + "\".");
                    }
                });
            }));
        });
        // it('lolStaticData.getChampionList', function() {
        //   return api.req('na', 'lolStaticDataV4.getChampionList', { tags: 'all' })
        //     .then(data => {
        //       assert.ok(data);
        //     });
        // });
        it('league.getAllLeaguePositionsForSummoner', function () {
            return __awaiter(this, void 0, void 0, function () {
                var summoner, data, entry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.req('na', 'lol.summonerV4.getBySummonerName', 'xBlotter')];
                        case 1:
                            summoner = _a.sent();
                            return [4 /*yield*/, api.req('na', 'lol.leagueV4.getLeagueEntriesForSummoner', summoner.id)];
                        case 2:
                            data = _a.sent();
                            if (0 !== data.length) {
                                entry = data.find(function (e) { return e.queueType === 'RANKED_SOLO_5x5'; });
                                assert.ok(entry.wins);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    parallel('#req() tournament', function () {
        this.slow(500);
        it('works for tournament endpoints', function () {
            return __awaiter(this, void 0, void 0, function () {
                var providerId, tournamentId, codes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, api.req('na', 'tournament.stubV4.registerProviderData', {}, {}, {
                                region: "NA",
                                url: "https://github.com/MingweiSamuel/TeemoJS"
                            })];
                        case 1:
                            providerId = _a.sent();
                            return [4 /*yield*/, api.req('na', 'tournament.stubV4.registerTournament', {}, {}, {
                                    name: "teemo tournament :)",
                                    providerId: providerId
                                })];
                        case 2:
                            tournamentId = _a.sent();
                            return [4 /*yield*/, api.req('na', 'tournament.stubV4.createTournamentCode', {}, {
                                    count: 10,
                                    tournamentId: tournamentId
                                }, {
                                    //allowedSummonerIds: {},
                                    mapType: "SUMMONERS_RIFT",
                                    metadata: "eW91IGZvdW5kIHRoZSBzZWNyZXQgbWVzc2FnZQ==",
                                    pickType: "TOURNAMENT_DRAFT",
                                    spectatorType: "ALL",
                                    teamSize: 5
                                })];
                        case 3:
                            codes = _a.sent();
                            assert.ok(codes);
                            assert.equal(codes.length, 10);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
