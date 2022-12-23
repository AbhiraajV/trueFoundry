import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class GhCredsDto {
  @IsString()
  @IsNotEmpty()
  gh_username: string;

  @IsString()
  @IsNotEmpty()
  gh_key: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class AssignUserGhDto {
  @IsString()
  @IsNotEmpty()
  gh_generated_token;

  @IsNumber()
  @IsNotEmpty()
  userId;
}

export class CreateGhCredsDto {
  @IsString()
  @IsNotEmpty()
  gh_generated_token;

  @IsString()
  @IsNotEmpty()
  gh_username: string;

  @IsString()
  @IsNotEmpty()
  gh_key: string;
}
