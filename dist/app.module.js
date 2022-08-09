"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const modules_1 = require("./modules");
const entities_1 = require("./core/entities");
const modules_2 = require("./core/modules");
const role_entity_1 = require("./core/entities/role.entity");
const all_exceptions_filter_1 = require("./core/filters/all-exceptions.filter");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '22864231',
                database: 'music_service_3',
                entities: [
                    entities_1.User,
                    entities_1.Test,
                    entities_1.Answer,
                    entities_1.Genre,
                    entities_1.AnswerToGenre,
                    entities_1.Album,
                    entities_1.Song,
                    entities_1.Performer,
                    entities_1.Preferences,
                    entities_1.AnswerToTest,
                    role_entity_1.Role,
                    entities_1.AlbumToGenre,
                ],
                synchronize: true,
                autoLoadEntities: true,
            }),
            modules_1.TestModule,
            modules_1.AnswerModule,
            modules_1.GenreModule,
            modules_1.AlbumModule,
            modules_1.PerformerModule,
            modules_1.SongModule,
            modules_2.FileModule,
            modules_1.AuthModule,
            modules_1.UserModule,
            modules_1.RoleModule,
            modules_2.TokenModule,
            modules_1.PreferencesModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: all_exceptions_filter_1.AllExceptionsFilters,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map