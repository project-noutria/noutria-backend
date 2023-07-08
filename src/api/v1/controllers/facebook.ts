import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import config from "../../config";
import models from "../models";
import { IUser } from "../utils/interface";
import jwtHelper from "../utils/jwt";

const { generateToken } = jwtHelper;

passport.use(
  new FacebookStrategy(
    {
      clientID: config.FACEBOOK_APP_ID,
      clientSecret: config.FACEBOOK_APP_SECRET,
      callbackURL: config.FACEBOOK_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const user: IUser | null = await models.User.findOne({ email: profile.emails?.[0].value, });
      if (user) {
        const { _id, email } = user;
        const token = await generateToken({ _id, email });
        const userDetails = {
          _id,
          email,
          name: user.name,
          phone: user.phone,
          role: user.role,
          verified: user.verified,
          active: user.active,
          password: user.password
        };
        return done(null, userDetails, token);
      }

      if (!user) {
        const newUser: IUser = await models.User.create({
          googleId: profile.id,
          name: profile.name?.givenName,
          email: profile.emails?.[0].value,
          role: "user",
          active: true,
          password: " ",
          verified: true
        });
        if (newUser) {
          done(null, newUser);
        }
      } else {
        done(null, user);
      }
    }
  )

);
