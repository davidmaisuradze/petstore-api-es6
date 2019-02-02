import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    mobilePhone: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    genderId: {type: String, required: true},
    birthDate: {type: Date, required: true},
    role: {type: String, default: 'user'},
    isActive: {type: Boolean, default: false}
}, {timestamps: true});

userSchema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

userSchema.methods.generatePasswordHash = function generatePasswordHash(password) {
    const salt = bcrypt.genSaltSync(10);
    this.passwordHash = bcrypt.hashSync(password, salt);
};

userSchema.methods.generateJWT = function generateJWT() {
    return jwt.sign({
        email: this.email,
        isActive: this.isActive
    }, process.env.JWT_SECRET, {expiresIn: '1h'});
};

userSchema.methods.toAuthJSON = function toAuthJSON() {
    return {
        token: this.generateJWT(),
        user: {
            email: this.email,
            mobilePhone: this.mobilePhone,
            firstName: this.firstName,
            lastName: this.lastName,
            genderId: this.genderId,
            birthDate: this.birthDate,
            isActive: this.isActive,
        }
    };
};

export default mongoose.model('users', userSchema);

