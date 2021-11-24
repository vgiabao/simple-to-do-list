import { EntityRepository, Repository } from "typeorm";
import {User} from "./user.entity";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";

@EntityRepository(User)
export class UsersRepository extends Repository<User>{
  async createUser(authCredentialDto: AuthCredentialDto): Promise<User>{
    const {username, password} = authCredentialDto
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = this.create({username, password: hashedPassword})
    try {
      await this.save(user)
    }
    catch (error) {
      if (error.code == 23505){
        throw new ConflictException("user name have been already existed")
      }
      throw new InternalServerErrorException()
    }
    return user
  }
  async login(authCredentialDto: AuthCredentialDto): Promise<User>{
    const {username, password} = authCredentialDto;
    const user = await this.findOne({username})
    if (user && (await  bcrypt.compare(password, user.password))){
      return user
    }
    throw new UnauthorizedException("Please check your login credential")

  }
}
