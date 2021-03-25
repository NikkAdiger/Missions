import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import response from './middleware/response';
import checkRequest from './middleware/checkRequest';
import missionRouter from './routes/missionRouter';
import * as env from './config';
import * as mongoose from './services/mongoDB';

const app = express();
mongoose.run();
const { environment } = env;
const host = environment.webServer.host;
const port = environment.webServer.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());

app.use(checkRequest);

// version 1
app.use('/api/v1/mission', missionRouter);

app.use('*', (req: Request, res: Response) => {
  response(res, 200, 'Welcome to this API.');
});

app.listen(port, host, () => {
  return console.log(`server is listening on ${port}`);
});

export default app; 