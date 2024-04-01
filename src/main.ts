import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.engine(
    'hbs',
    hbs.engine({
      extname: 'hbs',
      partialsDir: join(__dirname, '..', 'views/partials'),
      defaultLayout: 'main',
      layoutsDir: join(__dirname, '..', 'views/layouts'),
    }),
  );
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
}
bootstrap();
