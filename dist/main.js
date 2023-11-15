"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cors = require("cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.use(cors());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Clinic')
        .setDescription('The clinic API description')
        .setVersion('1.0')
        .addTag('auth')
        .addTag('clinic')
        .addTag('superadmin')
        .addTag('receptionist')
        .addTag('doctor')
        .addTag('pharmacy')
        .addTag('cashier')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3333);
}
bootstrap();
//# sourceMappingURL=main.js.map