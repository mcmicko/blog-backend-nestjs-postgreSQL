import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO, LoginDTO } from '../models/user.model';
import { ApiCreatedResponse, ApiResponse, ApiUnauthorizedResponse, ApiBody } from '@nestjs/swagger'

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post()
  @ApiCreatedResponse({ description: 'User registration' })
  @ApiBody({ type: RegisterDTO })
  register(@Body(ValidationPipe) credentials: { user: RegisterDTO }) {
    return this.authService.register(credentials.user);
  }

  @Post('/login')
  @ApiResponse({ description: 'User login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginDTO })
  login(@Body(ValidationPipe) credentials: { user: LoginDTO }) {
    return this.authService.login(credentials.user);
  }
}
