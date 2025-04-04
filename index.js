import { GoogleGenAI } from "@google/genai";
import express from "express";
import bodyParser from "body-parser";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDR8pnggzIxh7Q2q6yqmGTMEqmcep1z8pE",
});

async function main(input) {
  const response = await ai.models.generateContentStream({
    model: "gemini-2.0-flash",
    contents: input,
  });
  var ans = "";
  for await (const chunk of response) {
    ans += chunk.text + "";
  }
  return ans;
}

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { chatHistory });
});

var chatHistory = [];
app.post("/chat", async (req, res) => {
  var input = req.body.inp;
  var output = await main(
    input + "Give me answer in simple and short with out any bold and italic"
  );
  chatHistory.push({ input: input, output: output });
  res.render("index.ejs", { chatHistory: chatHistory });
});

app.listen(3000, () => {
  console.log("Listening");
});
