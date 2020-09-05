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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const helmet = require("helmet");
const app_module_1 = require("./app.module");
const config_service_1 = require("./common/config/config.service");
class App {
    constructor(configService) {
        this.configService = configService;
        this.run();
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const port = this.configService.get('PORT') || 3000;
            const app = yield core_1.NestFactory.create(app_module_1.AppModule);
            app.use(helmet());
            app.useGlobalPipes(new common_1.ValidationPipe({
                skipMissingProperties: true,
            }));
            yield app.listen(port);
            common_1.Logger.log(`Server started on http://localhost:${port}/graphql`, 'Server');
        });
    }
}
new App(new config_service_1.ConfigService(`.env.${process.env.NODE_ENV}`));
//# sourceMappingURL=main.js.map