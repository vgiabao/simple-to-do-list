import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "./users.repository";
import { JwtPayloadInterface } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UsersRepository) private userRepository: UsersRepository) {
    super({ secretOrKey: "beevo.contemi", jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() });
  }

  async validate(payload: JwtPayloadInterface): Promise<User> {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ username });
    if (!user) throw new UnauthorizedException();
    return user;
  }

}
