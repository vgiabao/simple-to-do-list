import { Injectable } from '@nestjs/common';
import { UsersRepository } from "./users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UsersRepository) private userRepository: UsersRepository) {
  }
  async singUp(authCredentialDto:AuthCredentialDto): Promise<User>{
    return this.userRepository.createUser(authCredentialDto)
  }

}
