import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import {connect} from './config/db';
import {mainRoute} from './routes';
import {handleError} from "./middlewares/error.middleware";
import passport from "passport";
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import {UserModel} from "./app/models/user.model";

const app = express();
const port = process.env.PORT || 2222;

//passport
app.use(passport.initialize());

passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  function (jwt_payload, done) {
    console.log("Test")
    UserModel.findOne({id: jwt_payload.sub}, function (err: any, user: any) {

      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));

//bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//connect to DB
connect().then(r => {
});

//json
app.use(express.json());

app.use(cors());
//main route
app.use(mainRoute);

//global handle error
app.use(handleError);

app.listen(port, () => {
  console.log(`App listening  http://localhost:${port}`);
});
