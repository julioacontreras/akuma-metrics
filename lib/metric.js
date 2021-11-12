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
exports.MetricService = void 0;
var client = require('prom-client');
var MetricService = /** @class */ (function () {
    function MetricService() {
        this.widgets = new Map();
        console.log('Metrics services created!');
        this.metricsContentType = client.register.contentType;
        client.collectDefaultMetrics({
            timeout: 5000
        });
    }
    MetricService.prototype.startTime = function () {
        return Number(new Date());
    };
    MetricService.prototype.finishTime = function (start) {
        return Number(new Date()) - start;
    };
    MetricService.prototype.createCounterRequestTotalOperators = function () {
        var counter = new client.Counter({
            name: 'node_request_operations_total',
            help: 'The total number of processed requests',
            labelNames: ['action'],
        });
        this.widgets.set('total_requests', counter);
    };
    MetricService.prototype.createHistogramRequestDuration = function () {
        var histogram = new client.Histogram({
            name: 'http_request_duration_ms',
            help: 'Histogram for the duration in seconds.',
            labelNames: ['action'],
            buckets: [0, 0.001, 0.010, 0.5, 1, 5, 10]
        });
        this.widgets.set('histogram_duration', histogram);
    };
    MetricService.prototype.calculeHistogramRequestDuration = function (start, action) {
        var end = this.finishTime(start);
        var histogram = this.widgets.get('histogram_duration');
        var durationInMs = (end / 1000);
        histogram.observe({ action: action }, durationInMs);
    };
    MetricService.prototype.sumOneRequest = function (action) {
        var counter = this.widgets.get('total_requests');
        counter.inc({ action: action });
    };
    MetricService.prototype.getMetrics = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.register.metrics()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return MetricService;
}());
exports.MetricService = MetricService;
