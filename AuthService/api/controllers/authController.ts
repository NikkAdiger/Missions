import { Request, Response, NextFunction} from 'express';
import response from '../middleware/response';
import passport from 'passport';
import passportJwt from 'passport-jwt';

import * as userService from '../services/userService';
import * as env from '../config';
const { environment } = env;

const jwtStrategy = passportJwt.Strategy;
const extractJwt = passportJwt.ExtractJwt;
const { jwtSecret } = environment;

export function authentificateJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', (err: Error, jwtToken: any) => {
        if(err) return response(res, 401, { message: 'unauthorized' });
        if(!jwtToken.username) return response(res, 401, { message: 'unauthorized' });
        return next();
    })(req, res, next);
}

passport.use(new jwtStrategy(
    {
        jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret
    }, async (jwtToken, done) => {
        const userIsExist = await userService.findUserByUsername(jwtToken.username);
        if(!userIsExist) return done(new Error(`User don't exist in DB`), jwtToken);
        return done(undefined, jwtToken);
    }
))
