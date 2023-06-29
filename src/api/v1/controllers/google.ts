import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import config from "../../config/index";
import { IUser } from "../utils/interface";
import models from "../models";
import jwtHelper from "../utils/jwt";

// const { generateToken } = jwtHelper;

// passport.use(
//   new Strategy(
//     {
//       clientID: config.GOOGLE_CLIENT_ID,
//       clientSecret: config.GOOGLE_CLIENT_SECRET,
//       callbackURL: config.GOOGLE_CALLBACK_URL
//     },
//     async (accessToken: string, refreshToken:string, profile, done) => {
//       const user: IUser | null = await models.User.findOne({ email: profile.emails?.[0].value, });
//       if (user) {
//         const { _id, email } = user;
//         const token = await generateToken({ _id, email });
//         const userDetails = {
//           _id,
//           email,
//           name: user.name,
//           phone: user.phone,
//           role: user.role,
//           verified: user.verified,
//           active: user.active,
//           password: user.password
//         };
//         return done(null, userDetails, token);
//       }

//       if (!user) {
//         const newUser: IUser = await models.User.create({
//           googleId: profile.id,
//           name: profile.name?.givenName,
//           email: profile.emails?.[0].value,
//           role: "user",
//           active: true,
//           password: " ",
//           verified: true
//         });
//         if (newUser) {
//           done(null, newUser);
//         }
//       } else {
//         done(null, user);
//       }
//     }
//   )
// );
