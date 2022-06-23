import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
    @IsString({message: 'Only string'})
    readonly value: string;
    @IsNumber({}, {message: 'Only number'})
    readonly userId: number;
}