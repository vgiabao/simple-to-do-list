import { Body, Controller, Post, Get, UseGuards } from "@nestjs/common";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }
  @Post('/signup')
  signUp(@Body() authCredentialDto: AuthCredentialDto) : Promise<User>{
    return this.authService.singUp(authCredentialDto)
  }
  @Post('/signIn')
  signIn(@Body() authCredentialDto: AuthCredentialDto) : Promise<Object>{
    return this.authService.signIn(authCredentialDto)
  }

  @UseGuards(AuthGuard())
  @Get("/")
  getUser(){
    console.log("hello")
  }
}
