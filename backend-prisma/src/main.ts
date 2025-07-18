import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  
  const userService = app.get(UserService);
  await userService.seed();

  await app.listen(3003);
}
bootstrap();
