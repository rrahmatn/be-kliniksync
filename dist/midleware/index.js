"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LowercaseMiddleware = void 0;
const common_1 = require("@nestjs/common");
let LowercaseMiddleware = class LowercaseMiddleware {
    use(req, res, next) {
        for (const key in req.body) {
            if (key !== 'password' && key != 'confPassword' && typeof req.body[key] === 'string') {
                req.body[key] = req.body[key].toLowerCase();
            }
        }
        next();
    }
};
exports.LowercaseMiddleware = LowercaseMiddleware;
exports.LowercaseMiddleware = LowercaseMiddleware = __decorate([
    (0, common_1.Injectable)()
], LowercaseMiddleware);
//# sourceMappingURL=index.js.map