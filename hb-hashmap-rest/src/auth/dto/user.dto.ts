import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {  
    @IsNotEmpty()  username: string;
    @IsNotEmpty()  password: string;
    @IsNotEmpty()  is_admin : boolean = false;
}