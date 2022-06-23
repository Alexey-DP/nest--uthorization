import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "./pipes/validation.pipe";


const start = async () => {
    const PORT = process.env.PORT || 7777;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Lesson by BackEnd')
        .setDescription('REST API document')
        .setVersion('1.0.0')
        .addTag('Home')
        .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    // app.useGlobalGuards(JwtAuthGuard)
    //! Через запятую валидаторы
    app.useGlobalPipes(new ValidationPipe)

    await app.listen(PORT, () => console.log(`Server started on port: ${PORT}...`));
}

start();