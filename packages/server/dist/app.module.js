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
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const config_module_1 = require("./common/config/config.module");
const config_service_1 = require("./common/config/config.service");
const user_entity_1 = require("./user/user.entity");
const user_module_1 = require("./user/user.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_module_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    url: configService.get('DB_URL'),
                    synchronize: true,
                    logging: process.env.NODE_ENV === 'development' ? true : false,
                    dropSchema: process.env.NODE_ENV === 'test' ? true : false,
                    entities: [user_entity_1.UserEntity],
                    migrations: [],
                    subscribers: [],
                }),
                inject: [config_service_1.ConfigService],
            }),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: 'src/schema.gql',
                playground: true,
                debug: process.env.NODE_ENV === 'development' ? true : false,
                context: ({ req }) => ({ req }),
            }),
            user_module_1.UserModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map