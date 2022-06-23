import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail } from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'user01@gmail.com', description: 'Users email'})
    @IsString({message: 'Only string'})
    @IsEmail({}, {message: 'Email is not validate'})
    readonly email: string;
    @ApiProperty({example: '156d4sa5d', description: 'Users password'})
    @IsString({message: 'Only string'})
    @Length(4, 16, {message: 'Length from 4 to 16'})
    readonly password: string;
}