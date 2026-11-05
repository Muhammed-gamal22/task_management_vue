import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    Validate,
} from 'class-validator';

import { MatchPassword } from '../validators/match-password.validator';

export class RegisterDto {
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;

    @IsString()
    @IsNotEmpty({ message: 'Please confirm your password' })
    @Validate(MatchPassword, {
        message: 'Passwords do not match',
    })
    confirmPassword: string;

    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;
}