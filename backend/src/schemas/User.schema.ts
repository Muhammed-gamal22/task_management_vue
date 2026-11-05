import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { hash, compare } from 'bcrypt';
import { HydratedDocument } from "mongoose";

@Schema({
    timestamps: true,
    collection: "user",
})
export class User {
    @Prop({ required: [true, "Email is required"] })
    email: string;
    @Prop({
        required: [true, "Password is required"], select: false,
        minLength: [6, "password must be at least 6 characters"]
    })
    password: string;
    @Prop({
        required: [true, "Please confirm your password"], validate: {
            validator: function (v: string) {
                return this.password === v
            },
            message: "Passwords do not match"
        }
    })
    confirmPassword: string;
    @Prop({ required: [true, "Name is required"] })
    name: string;
}
export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await hash(this.password, 12);
    this.confirmPassword = undefined;
});
UserSchema.methods.comparePassword = async function (
    candidatePassword: string,
): Promise<boolean> {
    return compare(candidatePassword, this.password);
};
export interface UserMethods {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export type UserDocument = HydratedDocument<User, UserMethods>;