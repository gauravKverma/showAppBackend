// import express, , Application } from "express";
const express=require("express")
const axios = require("axios")
const cors = require("cors");
const app=express();
// const app: Application = express();
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

app.get("/", (req:any, res:any) => {
  res.send("Welcome");
});

app.post("/login", (req:any, res:any) => {
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

app.post("/search", async (req:any, res:any) => {
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

app.listen(PORT, () => {
  console.log(`server running`);
});
