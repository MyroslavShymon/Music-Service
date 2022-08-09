"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preferences = void 0;
const typeorm_1 = require("typeorm");
const genre_entity_1 = require("./genre.entity");
const user_entity_1 = require("./user.entity");
let Preferences = class Preferences {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Preferences.prototype, "userToGenreId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Preferences.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Preferences.prototype, "genreId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0, unsigned: true }),
    __metadata("design:type", Number)
], Preferences.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.preferences, {
        onDelete: 'CASCADE',
        cascade: true,
    }),
    __metadata("design:type", user_entity_1.User)
], Preferences.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => genre_entity_1.Genre, (genre) => genre.preferences, {
        onDelete: 'CASCADE',
        cascade: true,
    }),
    __metadata("design:type", genre_entity_1.Genre)
], Preferences.prototype, "genre", void 0);
Preferences = __decorate([
    (0, typeorm_1.Entity)()
], Preferences);
exports.Preferences = Preferences;
//# sourceMappingURL=preferences.entity.js.map