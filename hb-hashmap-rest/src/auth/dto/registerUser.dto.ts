import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterUserDto {  
    @IsNotEmpty()  username: string;
    @IsNotEmpty()  password: string;
    is_admin : boolean = false
}