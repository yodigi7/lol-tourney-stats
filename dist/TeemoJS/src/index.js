'use strict';
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/** True if running in tests. */
var DEBUG = /test[\\\/][-\w]+\.js$/.test(module.parent && module.parent.filename);
// Load dependencies.
var fetch = global.fetch || require("" + 'node-fetch');
var URL = global.URL || require("" + 'url').URL;
// Assign configurations.
TeemoJS.emptyConfig = require('../config/empty.json');
TeemoJS.defaultConfig = require('../config/default.json');
TeemoJS.kernelConfig = require('../config/kernel.json');
TeemoJS.ddragonConfig = require('../config/ddragon.json');
TeemoJS.cdragonConfig = require('../config/cdragon.json');
/** Returns a formatted string, replacing "{}" or "{name}" with supplied ARGOBJECT.
  * ARGOBJECT may be an object or Array. */
function format(format, argObject) {
    var i = 0;
    var result = format.replace(/\{(\w*)\}/g, function (_, key) {
        var val = undefined !== argObject[key] ? argObject[key] : argObject[i++];
        if (undefined === val)
            throw new Error("Argument provided for format \"" + format + "\" missing key \"{" + key + "}\".");
        return val;
    });
    return result;
}
/** Returns a promise that resolves after the supplied delay. */
function delayPromise(millis) {
    return new Promise(function (resolve) { return setTimeout(resolve, millis); });
}
var objFromEntries = Object.fromEntries || function (entries) {
    var obj = {};
    entries.forEach(function (_a) {
        var key = _a[0], val = _a[1];
        return obj[key] = val;
    });
    return obj;
};
/** Assigns VALUE into OBJECT at location PATH, where PATH is a period-dilimited set of segments. For example,
  * `"foo.bar"` would run `object.foo.bar = value`. But also fills in falsy values with new objects. */
function assignPath(object, path, value) {
    var segments = path.split('.');
    var final = segments.pop();
    for (var _i = 0, segments_1 = segments; _i < segments_1.length; _i++) {
        var segment = segments_1[_i];
        object = object[segment] || (object[segment] = {});
    }
    object[final] = value;
}
/** `TeemoJS(key [, config])` or `TeemoJS(config)` with `config.key` set. */
function TeemoJS(key, config) {
    if (config === void 0) { config = TeemoJS.defaultConfig; }
    if (!(this instanceof TeemoJS))
        return new (TeemoJS.bind.apply(TeemoJS, __spreadArrays([void 0], arguments)))();
    if (key instanceof Object)
        config = key;
    else
        config.key = key;
    this.config = config;
    this.regions = {};
}
TeemoJS.prototype.req = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    // Get region (first arg, or not).
    var region = this.config.regionPath ? args.shift() : null;
    var target = args[0], _a = args[1], pathParams = _a === void 0 ? {} : _a, _b = args[2], queryParams = _b === void 0 ? {} : _b, _c = args[3], bodyParam = _c === void 0 ? undefined : _c;
    // Get reqConfigs.
    var reqConfigs = [];
    var endpointTree = this.config.endpoints;
    for (var _d = 0, _e = target.split('.'); _d < _e.length; _d++) {
        var segment = _e[_d];
        if (endpointTree['*'])
            reqConfigs.push(endpointTree['*']);
        if (!(endpointTree = endpointTree[segment]))
            throw new Error("Missing path segment \"" + segment + "\" in \"" + target + "\".");
    }
    reqConfigs.push(endpointTree);
    // Assemble reqConfig.
    var reqConfig = Object.assign.apply(Object, __spreadArrays([{}], reqConfigs));
    if (typeof reqConfig.path !== 'string')
        throw new Error("Failed to find path for target: \"" + target + "\".");
    reqConfig.fetch = Object.assign.apply(Object, __spreadArrays([{ keepalive: true, redirect: 'follow', headers: {} }], reqConfigs.map(function (rc) { return rc.fetch; })));
    reqConfig.fetch.headers = Object.assign.apply(Object, __spreadArrays([{}], reqConfigs.map(function (rc) { return rc.fetch && rc.fetch.headers; })));
    reqConfig.pathParams = Object.assign.apply(Object, __spreadArrays([{}], reqConfigs.map(function (rc) { return rc.pathParams; }), [pathParams]));
    reqConfig.queryParams = Object.assign.apply(Object, __spreadArrays([{}], reqConfigs.map(function (rc) { return rc.queryParams; }), [queryParams]));
    reqConfig.bodyParam || (reqConfig.bodyParam = bodyParam);
    // Override key.
    if (this.config.keyPath)
        assignPath(reqConfig, this.config.keyPath, reqConfig.key || this.config.key);
    // Lookup regions.
    if (this.config.regionPath) {
        if (!reqConfig.regionTable[region])
            throw new Error('Failed to determine platform for region: ' +
                ("\"" + region + "\", available regions (for this endpoint): " + Object.keys(reqConfig.regionTable).join(', ') + "."));
        assignPath(reqConfig, this.config.regionPath, reqConfig.regionTable[region]);
    }
    // OriginParams. But first override origin.
    var origin = reqConfig.origin || this.config.origin;
    if (reqConfig.originParams)
        origin = format(origin, reqConfig.originParams);
    // PathParams. Interpolate path.
    if (Array.isArray(pathParams)) // Array.
        pathParams = pathParams.map(encodeURIComponent);
    else if (typeof pathParams === 'object') // Object dict.
        pathParams = objFromEntries(Object.entries(pathParams).map(function (_a) {
            var key = _a[0], val = _a[1];
            return [key, encodeURIComponent(val)];
        }));
    else // Single value.
        pathParams = [pathParams];
    var path = format(reqConfig.path, pathParams);
    // QueryParams. First build URL.
    var urlBuilder = new URL(path, format(origin, [region]));
    var _loop_1 = function (key, vals) {
        if (!Array.isArray(vals)) // Not array.
            urlBuilder.searchParams.set(key, vals);
        else if (this_1.config.collapseQueryArrays) // Array, collapse.
            urlBuilder.searchParams.set(key, vals.join(','));
        else // Array, do not collapse.
            vals.forEach(function (val) { return urlBuilder.searchParams.append(key, val); });
    };
    var this_1 = this;
    // Then build URL query params.
    for (var _f = 0, _g = Object.entries(reqConfig.queryParams); _f < _g.length; _f++) {
        var _h = _g[_f], key = _h[0], vals = _h[1];
        _loop_1(key, vals);
    }
    // BodyParam. Add body, if supplied, to reqConfig.fetch.
    if (undefined !== bodyParam) {
        reqConfig.fetch.body = JSON.stringify(bodyParam);
        reqConfig.fetch.headers['Content-Type'] = 'application/json';
    }
    return this._getRegion(region).req(target, urlBuilder.href, reqConfig.fetch);
};
/** Limits requests to FACTOR fraction of normal rate limits, allowing multiple
  * instances to be used across multiple processes/machines.
  * This can be called at any time. */
TeemoJS.prototype.setDistFactor = function (factor) {
    if (factor <= 0 || factor > 1)
        throw new Error("Factor must be greater than zero and non-greater than one.");
    if (this.config.distFactor === factor)
        return;
    this.config.distFactor = factor;
    Object.values(this.regions).forEach(function (r) { return r.updateDistFactor(); });
};
TeemoJS.prototype._getRegion = function (region) {
    return this.regions[region] || (this.regions[region] = new Region(this.config, region));
};
/** Regional Requester. Handles `RateLimit`s for a region. One app limit and multiple method limits. */
function Region(config) {
    this.config = config;
    this.appLimit = new RateLimit(this.config.rateLimitTypeApplication, 1, this.config);
    this.methodLimits = {};
    this.concurrentSema = new Semaphore(this.config.maxConcurrent);
}
Region.prototype.req = function (target, url, fetchConfig) {
    var _this = this;
    // Get rate limits to obey.
    var rateLimits = [this.appLimit];
    if (this.config.rateLimitTypeMethod) // Also method limit if applicable.
        rateLimits.push(this._getMethodLimit(target));
    return (function () { return __awaiter(_this, void 0, void 0, function () {
        var response, delay, retries, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    retries = 0;
                    _a.label = 1;
                case 1:
                    if (!(retries < this.config.retries)) return [3 /*break*/, 13];
                    // Acquire concurrent request permit.
                    // Note: This includes the time spent waiting for rate limits. To obey the rate limit we need to send the request
                    //       immediately after delaying, otherwise the request could be delayed into a different bucket.
                    return [4 /*yield*/, this.concurrentSema.acquire()];
                case 2:
                    // Acquire concurrent request permit.
                    // Note: This includes the time spent waiting for rate limits. To obey the rate limit we need to send the request
                    //       immediately after delaying, otherwise the request could be delayed into a different bucket.
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, , 8, 9]);
                    _a.label = 4;
                case 4:
                    if (!(0 <= (delay = RateLimit.getAllOrDelay(rateLimits)))) return [3 /*break*/, 6];
                    return [4 /*yield*/, delayPromise(delay)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 6: return [4 /*yield*/, fetch(url, fetchConfig)];
                case 7:
                    // Send request, get response.
                    response = _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    // Release concurrent request permit.
                    // Note: This may be released before the full response body is read.
                    this.concurrentSema.release();
                    return [7 /*endfinally*/];
                case 9:
                    // Update if rate limits changed or 429 returned.
                    rateLimits.forEach(function (rl) { return rl.onResponse(response); });
                    // Handle status codes.
                    if ([204, 404, 422].includes(response.status)) // Successful response, but no data found.
                        return [2 /*return*/, null];
                    if (!response.ok) return [3 /*break*/, 11];
                    return [4 /*yield*/, response.json()];
                case 10: // Successful response (presumably) with body.
                return [2 /*return*/, _a.sent()];
                case 11:
                    if (429 !== response.status && response.status < 500) // Non-retryable responses.
                        return [3 /*break*/, 13];
                    _a.label = 12;
                case 12:
                    retries++;
                    return [3 /*break*/, 1];
                case 13:
                    err = new Error("Request failed after " + retries + " retries with code " + response.status + ". " +
                        "The 'response' field of this Error contains the failed Response for debugging or error handling.");
                    err.response = response;
                    throw err;
            }
        });
    }); })();
};
Region.prototype.updateDistFactor = function () {
    var _this = this;
    this.appLimit.setDistFactor(this.config.distFactor);
    Object.values(this.methodLimits).forEach(function (rl) { return rl.setDistFactor(_this.config.distFactor); });
};
Region.prototype._getMethodLimit = function (method) {
    if (this.methodLimits[method])
        return this.methodLimits[method];
    return (this.methodLimits[method] = new RateLimit(this.config.rateLimitTypeMethod, 1, this.config));
};
/** Rate limit. A collection of token buckets, updated when needed. */
function RateLimit(type, distFactor, config) {
    this.config = config;
    this.type = type;
    this.buckets = this.config.defaultBuckets.map(function (b) { return new TokenBucket(b.timespan, b.limit, b); });
    this.retryAfter = 0;
    this.distFactor = distFactor;
}
RateLimit.prototype.retryDelay = function () {
    var now = Date.now();
    return now > this.retryAfter ? -1 : this.retryAfter - now;
};
RateLimit.prototype.onResponse = function (response) {
    // Handle 429 retry-after header (if exists).
    if (429 === response.status) {
        var type = response.headers.get(this.config.headerLimitType) || this.config.defaultLimitType;
        if (!type)
            throw new Error('Response missing type.');
        if (this.type.name === type.toLowerCase()) {
            var retryAfter = +response.headers.get(this.config.headerRetryAfter);
            if (Number.isNaN(retryAfter))
                throw new Error('Response 429 missing retry-after header.');
            this.retryAfter = Date.now() + retryAfter * 1000 + 500;
        }
    }
    // Update rate limit from headers (if changed).
    var limitHeader = response.headers.get(this.type.headerLimit);
    var countHeader = response.headers.get(this.type.headerCount);
    if (this._bucketsNeedUpdate(limitHeader, countHeader))
        this.buckets = RateLimit._getBucketsFromHeaders(limitHeader, countHeader);
};
RateLimit.prototype.setDistFactor = function (factor) {
    this.distFactor = factor;
    this.buckets.forEach(function (b) { return b.setDistFactor(factor); });
};
RateLimit.prototype._bucketsNeedUpdate = function (limitHeader, countHeader) {
    if (!limitHeader || !countHeader)
        return false;
    var limits = this.buckets.map(function (b) { return b.toLimitString(); }).join(',');
    return limitHeader !== limits;
};
RateLimit._getBucketsFromHeaders = function (limitHeader, countHeader) {
    var _this = this;
    // Limits: "20000:10,1200000:600"
    // Counts: "7:10,58:600"
    var limits = limitHeader.split(',');
    var counts = countHeader.split(',');
    if (limits.length !== counts.length)
        throw new Error("Limit and count headers do not match: " + limitHeader + ", " + countHeader + ".");
    return limits
        .map(function (limit, i) {
        var count = counts[i];
        var _a = limit.split(':').map(Number), limitVal = _a[0], limitSpan = _a[1];
        var _b = count.split(':').map(Number), countVal = _b[0], countSpan = _b[1];
        limitSpan *= 1000;
        countSpan *= 1000;
        if (limitSpan != countSpan)
            throw new Error("Limit span and count span do not match: " + limitSpan + ", " + countSpan + ".");
        var bucket = new TokenBucket(limitSpan, limitVal, { distFactor: _this.distFactor });
        bucket.getTokens(countVal);
        return bucket;
    });
};
RateLimit.getAllOrDelay = function (rateLimits) {
    var delay = rateLimits
        .map(function (r) { return r.retryDelay(); })
        .reduce(function (a, b) { return Math.max(a, b); }, -1);
    if (delay >= 0)
        return delay; // Techincally the delay could be more but whatev.
    var allBuckets = [].concat.apply([], rateLimits.map(function (rl) { return rl.buckets; }));
    return TokenBucket.getAllOrDelay(allBuckets);
};
/** Token bucket. Represents a single "100:60", AKA a 100 tokens per 60 seconds pair. */
function TokenBucket(timespan, limit, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.distFactor, distFactor = _c === void 0 ? 1 : _c, _d = _b.factor, factor = _d === void 0 ? 20 : _d, _e = _b.spread, spread = _e === void 0 ? 500 / timespan : _e, _f = _b.now, now = _f === void 0 ? Date.now : _f;
    this.now = now;
    this.timespan = timespan;
    // this.givenLimit is the limit given to the constructor, this.limit is the
    // functional limit, accounting for this.distFactor.
    this.givenLimit = limit;
    this.factor = factor;
    this.spread = spread;
    this.timespanIndex = Math.ceil(timespan / factor);
    this.total = 0;
    this.time = -1;
    this.buffer = new Array(this.factor + 1).fill(0);
    this.setDistFactor(distFactor);
}
TokenBucket.prototype.setDistFactor = function (distFactor) {
    this.limit = this.givenLimit * distFactor;
    // TODO: this math is ugly and basically wrong
    this.limitPerIndex = Math.floor(this.givenLimit / this.spread / this.factor) * distFactor;
    if (this.limitPerIndex * this.factor < this.limit) // TODO: hack to fix math above
        this.limitPerIndex = Math.ceil(this.limit / this.factor);
};
/** Returns delay in milliseconds or -1 if token available. */
TokenBucket.prototype.getDelay = function () {
    var index = this._update();
    if (this.total < this.limit) {
        if (this.buffer[index] >= this.limitPerIndex)
            return this._getTimeToBucket(1);
        return -1;
    }
    // check how soon into the future old buckets will be zeroed, making requests available.
    var i = 1;
    for (; i < this.buffer.length; i++) {
        if (this.buffer[(index + i) % this.buffer.length] > 0)
            break;
    }
    return this._getTimeToBucket(i);
};
TokenBucket.prototype.getTokens = function (n) {
    var index = this._update();
    this.buffer[index] += n;
    this.total += n;
    return this.total <= this.limit && this.buffer[index] <= this.limitPerIndex;
};
TokenBucket.prototype.toLimitString = function () {
    return this.givenLimit + ':' + (this.timespan / 1000);
};
TokenBucket.prototype._update = function () {
    if (this.time < 0) {
        this.time = this.now();
        return this._getIndex(this.time);
    }
    var index = this._getIndex(this.time);
    var length = this._getLength(this.time, (this.time = this.now()));
    if (length < 0)
        throw new Error('Negative length.');
    if (length == 0)
        return index;
    if (length >= this.buffer.length) {
        this.buffer.fill(0);
        this.total = 0;
        return index;
    }
    for (var i = 0; i < length; i++) {
        index++;
        index %= this.buffer.length;
        this.total -= this.buffer[index];
        this.buffer[index] = 0;
    }
    if (this._getIndex(this.time) != index)
        throw new Error("Get index time wrong: " + this._getIndex(this.time) + ", " + index + ".");
    return index;
};
TokenBucket.prototype._getIndex = function (ts) {
    return Math.floor((ts / this.timespanIndex) % this.buffer.length);
};
TokenBucket.prototype._getLength = function (start, end) {
    return Math.floor(end / this.timespanIndex) - Math.floor(start / this.timespanIndex);
};
TokenBucket.prototype._getTimeToBucket = function (n) {
    return n * this.timespanIndex - (this.time % this.timespanIndex);
};
TokenBucket.getAllOrDelay = function (tokenBuckets) {
    var delay = tokenBuckets
        .map(function (b) { return b.getDelay(); })
        .reduce(function (a, b) { return Math.max(a, b); }, -1);
    if (delay >= 0)
        return delay;
    tokenBuckets.forEach(function (b) { return b.getTokens(1); });
    return -1;
};
function Semaphore(count) {
    this.permits = count;
    this.queue = [];
}
Semaphore.prototype.acquire = function () {
    var _this = this;
    return new Promise(function (resolve) {
        if (_this.permits) {
            _this.permits--;
            resolve();
        }
        else
            _this.queue.push(resolve);
    });
};
Semaphore.prototype.release = function () {
    var resolve = this.queue.shift();
    (resolve ? resolve() : this.permits++);
};
if (DEBUG) {
    TeemoJS.delayPromise = delayPromise;
    TeemoJS.TokenBucket = TokenBucket;
    TeemoJS.Semaphore = Semaphore;
}
module.exports = TeemoJS;
