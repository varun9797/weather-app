import { NextFunction, Request, Response } from 'express';

// Middleware to verify JWT token

// import jwt, { JwtPayload } from 'jsonwebtoken';
// import {SECRET_KEY_REFRESH_TOKEN, SECRET_KEY_TOKEN, REFRESH_TOKEN_COOKIE_NAME, AUTHORIZATION} from "./../utils/const"


// function verifyToken(req: Request, res: Response, next: NextFunction): void {
//   const token = req.header(AUTHORIZATION);
//   if (!token) {
//     res.status(401).json({ error: 'Access denied' });
//     return;
//   }
//   jwt.verify(token, SECRET_KEY_TOKEN, (err, decoded) => {
//     if (err) {
//       res.status(401).json({ error: 'Invalid token' });
//       return;
//     }
//     const userId = (decoded as JwtPayload).userId;
//     req.userId = userId;
//     next();
//     return;
//   });
// }

// export default verifyToken;


// export async function verifyRefreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
//   const refreshToken: string = req.cookies[REFRESH_TOKEN_COOKIE_NAME];
//   if (!refreshToken) {
//     res.status(401).json({ error: 'Access denied' });
//     return;
//   }
//   console.log("************", refreshToken);
//   if((typeof refreshToken != "string") || !(await redis.get(refreshToken))) {
//     res.status(401).json({ error: 'Your token has been compromised' });
//     return;
//   }
//   jwt.verify(refreshToken, SECRET_KEY_REFRESH_TOKEN, (err, decoded) => {
//     if (err) {
//       res.status(401).json({ error: 'Invalid token' });
//       return;
//     }
//     const userId = (decoded as JwtPayload).id;
//     console.log(decoded);
//     req.userId = userId;
//     next();
//     return;
//   });
// }