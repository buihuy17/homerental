import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import {connect} from './config/db';
import {mainRoute} from './routes';

const app = express();
const port = process.env.PORT || 2222;


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

app.listen(port, () => {
  console.log(`App listening  http://localhost:${port}`);
});
