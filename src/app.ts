import express, { Application, Request, Response, NextFunction } from "express";
import { routes } from './routes';
import cors from 'cors';
import { connectToServer } from './db/conn';

const app: Application = express();
const port = 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/', (req: Request,res: Response, next: NextFunction) => {
//     res.status(200).send({message: "Hello from localhost"});
// });

// Application routing
routes(app);

connectToServer(function (err: any) {
    if (err) {
        console.error(err);
        process.exit();
    }

    // start the Express server
    app.listen(port, () => console.log(`Server is running on port: ${port}`));
});