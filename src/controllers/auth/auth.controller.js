import User from '../../models/user.model';
import HttpStatus from 'http-status';

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});

        if (user && user.isValidPassword(password)) {
            return res.status(HttpStatus.OK).json(user.toAuthJSON());
        } else {
            return res.status(HttpStatus.BAD_REQUEST).json('Invalid credentials');
        }
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
};

export const register = async (req, res, next) => {
    try {
        const data = req.body;

        const user = new User({
            email: data.email,
            mobilePhone: data.mobilePhone,
            firstName: data.firstName,
            lastName: data.lastName,
            genderId: data.genderId,
            birthDate: data.birthDate,
            role: data.role
        });
        user.generatePasswordHash(data.password);
        const result = await user.save();

        return res.json(result.toAuthJSON());
    } catch (err) {
        return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
};

export const getCurrentUser = async (req, res, next) => {
    try {
        const {currentUser} = req;
        return res.status(HttpStatus.OK).json({
            user: {
                email: currentUser.email,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                genderId: currentUser.genderId,
                birthDate: currentUser.birthDate
            }
        });
    } catch (err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
};
