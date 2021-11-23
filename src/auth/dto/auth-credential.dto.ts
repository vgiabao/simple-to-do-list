import {IsString, MinLength, MaxLength} from "class-validator";

export class AuthCredentialDto{
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  username: string;
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}
