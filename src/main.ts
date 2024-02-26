import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  const port = process.env.PORT ?? 3000;
  console.log(port);
  await app.listen(port);
}
bootstrap();
