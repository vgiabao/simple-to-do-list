import { Body, Controller, Post } from "@nestjs/common";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }
  @Post('/signup')
  signUp(@Body() authCredentialDto: AuthCredentialDto) : Promise<User>{
    return this.authService.singUp(authCredentialDto)
  }
}
