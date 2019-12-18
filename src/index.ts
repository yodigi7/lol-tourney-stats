import express from "express";
import { tournamentProvider } from "./tournamentProvider";
import { tournament } from "./tournament";
import { tournamentCodes } from "./tournamentCodes";
// let express = require('express');
const app = express();

// @ts-ignore
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

app.post("/tournament-provider", async (req, res) => {
  tournamentProvider(req.body)
    .then(result => res.json(result))
    .catch(err => console.error(err));
});

app.post("/tournament", async (req, res) => {
  tournament(req.body)
    .then(result => res.json(result))
    .catch(err => console.error(err));
});

app.post("/tournament-codes", async (req, res) => {
  tournamentCodes(req.body)
    .then(result => res.json(result))
    .catch(err => console.error(err));
});

app.listen(3000);
