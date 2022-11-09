import express, { Request, Response, Application } from "express";
const axios = require("axios")
const cors = require("cors");
const app: Application = express();
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());
const savedCred = [
  {
    email: "gauravverma004@gmail.com",
    password: "gau12345",
  },
  {
    email: "gauravverma004@gmail.com",
    password: "gaurav12345",
  },
  {
    email: "gauravverma004@gmail.com",
    password: "verma12345",
  },
];

const PORT = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response): void => {
  res.send("Welcome");
});

app.post("/login", (req: Request, res: Response): void => {
  const data = req.body;
  console.log(data);
  let auth = false;
  for (let i = 0; i < savedCred.length; i++) {
    if (
      data.email === savedCred[i].email &&
      data.password === savedCred[i].password
    ) {
      auth = true;
    }
  }
  if (auth) {
    let token = jwt.sign({ email: data.email }, "SECRETKEY");
    res.send(token);
  } else {
    res.send("error");
  }
});

app.post("/search", async (req: Request, res: Response) => {
  let { query } = req.body;
  let token = req.headers["authorization"];
  let verify = jwt.verify(token, "SECRETKEY");
  if (verify) {
    let resp=await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
    res.status(200).send(resp.data);
  } else {
    res.sendStatus(401);
  }
});

app.listen(PORT, (): void => {
  console.log(`server running`);
});
