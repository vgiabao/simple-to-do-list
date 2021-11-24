import { Injectable } from '@nestjs/common';
import { UsersRepository } from "./users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import { JwtService } from "@nestjs/jwt";
import {JwtPayloadInterface} from "./jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UsersRepository) private userRepository: UsersRepository, private jwtService: JwtService) {
  }
  async singUp(authCredentialDto:AuthCredentialDto): Promise<User>{
    return this.userRepository.createUser(authCredentialDto)
  }
  async signIn(authCredentialDto: AuthCredentialDto) : Promise<Object>{
    const user = await this.userRepository.login(authCredentialDto)
    const payload: JwtPayloadInterface = {username: user.username}
    const access_token =  this.jwtService.sign(payload)
    return { access_token }
  }

}
