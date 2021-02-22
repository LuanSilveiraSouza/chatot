import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.use('/', async (req: any, res: any) => {
  return res.status(200).json({ msg: 'Hello World!' });
});

export { app };
