import { Controller, Get, Redirect, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('guitars')
  @Render('../views/guitars.hbs')
  getAuthor() {
    return {
      pageTitle: 'Guitars Page',
      content: 'views/guitars.hbs',
      isLoggedIn: false,
    };
  }

  @Get('comparison')
  @Render('../views/comparison.hbs')
  getHousingTypes() {
    return {
      pageTitle: 'Comparison',
      content: 'views/comparison.hbs',
      isLoggedIn: false,
    };
  }

  @Get('/')
  @Render('../views/index.hbs')
  @Redirect('/')
  getIndex() {
    return {
      pageTitle: 'Index Page',
      content: 'views/index.hbs',
      isLoggedIn: true,
    };
  }
}

// import {
//   Controller,
//   Get,
//   Param,
//   Post,
//   Body,
//   Put,
//   Delete,
// } from '@nestjs/common';
// import { UserService } from './user.service';
// import { PostService } from './post.service';
// import { User as UserModel, Post as PostModel } from '@prisma/client';
//
// @Controller()
// export class AppController {
//   constructor(
//       private readonly userService: UserService,
//       private readonly postService: PostService,
//   ) {}
//
//   @Get('post/:id')
//   async getPostById(@Param('id') id: string): Promise<PostModel> {
//     return this.postService.post({ id: Number(id) });
//   }
//
//   @Get('feed')
//   async getPublishedPosts(): Promise<PostModel[]> {
//     return this.postService.posts({
//       where: { published: true },
//     });
//   }
//
//   @Get('filtered-posts/:searchString')
//   async getFilteredPosts(
//       @Param('searchString') searchString: string,
//   ): Promise<PostModel[]> {
//     return this.postService.posts({
//       where: {
//         OR: [
//           {
//             title: { contains: searchString },
//           },
//           {
//             content: { contains: searchString },
//           },
//         ],
//       },
//     });
//   }
//
//   @Post('post')
//   async createDraft(
//       @Body() postData: { title: string; content?: string; authorEmail: string },
//   ): Promise<PostModel> {
//     const { title, content, authorEmail } = postData;
//     return this.postService.createPost({
//       title,
//       content,
//       author: {
//         connect: { email: authorEmail },
//       },
//     });
//   }
//
//   @Post('user')
//   async signupUser(
//       @Body() userData: { name?: string; email: string },
//   ): Promise<UserModel> {
//     return this.userService.createUser(userData);
//   }
//
//   @Put('publish/:id')
//   async publishPost(@Param('id') id: string): Promise<PostModel> {
//     return this.postService.updatePost({
//       where: { id: Number(id) },
//       data: { published: true },
//     });
//   }
//
//   @Delete('post/:id')
//   async deletePost(@Param('id') id: string): Promise<PostModel> {
//     return this.postService.deletePost({ id: Number(id) });
//   }
// }