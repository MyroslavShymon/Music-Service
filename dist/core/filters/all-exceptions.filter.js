"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilters = void 0;
const common_1 = require("@nestjs/common");
let AllExceptionsFilters = class AllExceptionsFilters {
    constructor() {
        this.getErrorResponse = (status, errorMessage, request) => ({
            exception: String(this.exception) || '',
            statusCode: status,
            error: errorMessage,
            path: request.url,
            method: request.method,
            timeStamp: new Date(),
        });
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status;
        let errorMessage;
        this.exception = exception;
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const errorResponse = exception.getResponse();
            errorMessage =
                exception.message || errorResponse.error;
        }
        else {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            errorMessage = 'Critical internal server error occurred!';
        }
        const errorResponse = this.getErrorResponse(status, errorMessage, request);
        response.status(status).json(errorResponse);
    }
};
AllExceptionsFilters = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilters);
exports.AllExceptionsFilters = AllExceptionsFilters;
//# sourceMappingURL=all-exceptions.filter.js.map