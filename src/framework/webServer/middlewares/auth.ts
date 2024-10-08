import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { catchError } from '../../../usecases/middleares/catchError';
require('dotenv').config();

interface CustomRequest extends Request {
    user?: { userId: string};
}

interface CustomJwtPayload extends JwtPayload {
    userId: string;
}

export const isAuthenticate = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies("accessToken")
        const refreshToken = req.cookies("refreshToken")
       


        if (!accessToken || !refreshToken ) {
            return res.status(401).json({ message: 'Access Forbidden!!! Please login again.', success: false });
        }



        if (!accessToken && !refreshToken) {
            return res.status(401).json({ message: 'Access Forbidden!!! Please login again.', success: false });
        }

        try {
            const decode = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY as Secret) as CustomJwtPayload;
            if (decode) {
                req.user = { userId: decode.userId };
                next();
            } else {
                return res.status(401).json({ message: 'Access Forbidden!!! Please login again.', success: false });
            }
        } catch (error) {
            try {
                const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY as Secret) as CustomJwtPayload;
                if (!decodedRefreshToken) {
                    return res.status(401).json({ message: 'Access Forbidden!!! Please login again.', success: false });
                }

                const newAccessToken = jwt.sign({ userId: decodedRefreshToken.userId }, process.env.JWT_ACCESS_KEY as Secret, { expiresIn: '15m' });
                res.setHeader('Authorization', `Bearer ${newAccessToken}`);
                req.user = { userId: decodedRefreshToken.userId}; 
                next();
            } catch (err) {
                return res.status(401).json({ message: 'Access Forbidden!!! Please login again.', success: false });
            }
        }
    } catch (error) {
        catchError(error, next);
    }
};
