import express from "express";

const app = express();
const port = 5001;

app.use('/', (req,res,next) => {
    res.status(200).send({message: "Hello from localhost"});
});

app.listen(port, () => console.log(`Server listening on ${port}`));