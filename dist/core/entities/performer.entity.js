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
exports.Performer = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Performer = class Performer {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Performer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true, nullable: false }),
    __metadata("design:type", String)
], Performer.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, nullable: true }),
    __metadata("design:type", String)
], Performer.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], Performer.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Album, (album) => album.performer),
    __metadata("design:type", Array)
], Performer.prototype, "albums", void 0);
Performer = __decorate([
    (0, typeorm_1.Entity)()
], Performer);
exports.Performer = Performer;
//# sourceMappingURL=performer.entity.js.map