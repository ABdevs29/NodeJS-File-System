import express from "express";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const curr_date = new Date();
const PORT = process.env.PORT;

//API endpoint to create a text file in a particular folder
app.get("/", (request, response) => {
  fs.appendFile(
    `./text_files/${
      curr_date.getDate() +
      "-" +
      (curr_date.getMonth() + 1) +
      "-" +
      curr_date.getFullYear() +
      "-" +
      curr_date.getHours() +
      ":" +
      curr_date.getMinutes() +
      ":" +
      curr_date.getSeconds()
    }.txt`,
    `
    ${Date()}`,
    function (err) {
      console.log(err);
    }
  );
  response.send("Date file created. Please check!!");
});

//API endpoint to retrieve all the text files in text_files folder
app.get("/files", async (request, response) => {
  const file_names = [];
  fs.readdirSync("./text_files").forEach((file) => {
    file_names.push(file);
  });

  response.send(file_names);
});

app.listen(PORT, () => console.log("Server has started"));
