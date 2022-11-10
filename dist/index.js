"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const express=require("express")
const axios = require("axios");
// import axios from "axios";
// import cors from "cors"
const cors = require("cors");
// const app=express();
const app = (0, express_1.default)();
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express_1.default.json());
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
app.get("/", (req, res) => {
    res.send("Welcome");
});
app.post("/login", (req, res) => {
    const data = req.body;
    console.log(data);
    let auth = false;
    for (let i = 0; i < savedCred.length; i++) {
        if (data.email === savedCred[i].email &&
            data.password === savedCred[i].password) {
            auth = true;
        }
    }
    if (auth) {
        let token = jwt.sign({ email: data.email }, "SECRETKEY");
        res.send(token);
    }
    else {
        res.send("error");
    }
});
app.post("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { query } = req.body;
    let token = req.headers["authorization"];
    let verify = jwt.verify(token, "SECRETKEY");
    if (verify) {
        let resp = yield axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
        res.status(200).send(resp.data);
    }
    else {
        res.sendStatus(401);
    }
}));
app.listen(PORT, () => {
    console.log(`server running`);
});
