"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubspotEventsError = void 0;
class HubspotEventsError extends Error {
    isHubspotEventsError = true;
    sdk = 'HubspotEvents';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.HubspotEventsError = HubspotEventsError;
//# sourceMappingURL=HubspotEventsError.js.map