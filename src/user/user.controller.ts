import { Body, Controller, Get, HttpStatus, Post, Put, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDTO } from './dtos/request/register-user.dto';
import { Response } from 'express';
import { LoginUserDTO } from './dtos/request/login-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserDTO } from './dtos/request/update-user.dto';
import { LoggedGuard } from './guards/logged.guard';
import { LoginUserSwagger, RegisterUserSwagger, LogoutUserSwagger, UpdateUserSwagger } from './docs/swagger-user-data';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @RegisterUserSwagger()
  @UseGuards(LoggedGuard)
  @Post('register')
  async register(@Body() userDTO: RegisterUserDTO, @Res() res: Response) {

      const user = await this.userService.register(userDTO);
      return res.status(HttpStatus.CREATED).json(user);
    
  }

  @LoginUserSwagger()
  @UseGuards(LoggedGuard)
  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() payload: LoginUserDTO, @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.userService.login(payload);
      req['user'] = data.payload;
      return res.cookie('access_token', data.token).status(HttpStatus.OK).json({ access_token: data.token, status: HttpStatus.OK });

    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to login', error: error });
    }
  }

  @UpdateUserSwagger()
  @UseGuards(AuthGuard)
  @Put('update')
  async update(@Body() updateUserDTO: UpdateUserDTO, @Res() res: Response, @Req() req: Request,) {
    try {
      const user = req['user'];
      const updatedUser = await this.userService.update(updateUserDTO, user);
      return res.status(HttpStatus.OK).json(updateUserDTO);

    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to update', error: error });
    }
  }

  @LogoutUserSwagger()
  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res() res: Response) {
    return res.clearCookie('access_token').status(HttpStatus.OK).json({ access_token: null, status: HttpStatus.OK });
  }


}
