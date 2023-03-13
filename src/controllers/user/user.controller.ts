import { Controller } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { Body, Get, Header, HttpCode, Param, Post, Query, Redirect, Req } from '@nestjs/common/decorators';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    returnAllUsers(): string {
        console.log(this.userService.findAll());
        return JSON.stringify(this.userService.findAll());
    }

    @Get(':id')
    returnOneUsers(@Param() params): string {
        console.log(params.id);
        return JSON.stringify(this.userService.find(parseInt(params.id)));
    }

    @Get('log-request')
    returnRequestObject(@Req() request: Request): void {
        console.log(request);
    }

    @Get('with-params') 
    getUrlQueryParams(@Query() querystring: string): string {
        return querystring;
    }

    @Get('redirect') 
    @Redirect('/users/redirected', 301)
    redirectUser(): void {
        console.log('Redirecting...');
    }

    @Get('redirected') 
    redirectedUser(): string {
        console.log('We have been redirected...');
        return 'We have been redirected ! ';
    }

    @Post('add')
    @HttpCode(204)
    @Header('cache-control', 'none')
    postAddUser(@Body() bodyContent: string): string {
        console.log(bodyContent);
        return JSON.stringify(bodyContent);
    }


}
