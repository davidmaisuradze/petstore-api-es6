import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import HttpStatus from 'http-status';

export default async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.currentUser = await User.findOne({email: decoded.email});
            next();
        } else {
            return res.status(HttpStatus.UNAUTHORIZED).json('unauthorized');
        }
    } catch (err) {
        return res.status(HttpStatus.UNAUTHORIZED).json('unauthorized');
    }
}