var compiler = require("compilex");
var options = { stats: true };
const express = require("express");
compiler.init(options);
const router = express.Router();
const fs = require("fs");

router.post("/compile", (req, res) => {
  const code = req.body.code;
  const input = req.body.input;
  const lang = req.body.lang;
  try {
    if (lang === "Cpp" || lang === "C") {
      if (!input) {
        var envData = { OS: "windows", cmd: "g++", options: { timeout: 1000 } }; // (uses g++ command to compile )

        compiler.compileCPP(envData, code, function (data) {
          console.log(data);
          res.send(data);
          //data.error = error message
          //data.output = output value
        });
      } else {
        var envData = { OS: "windows", cmd: "g++", options: { timeout: 1000 } }; // (uses g++ command to compile )

        compiler.compileCPPWithInput(envData, code, input, function (data) {
          console.log(data);
          res.send(data);
        });
      }
    } else if (lang === "Java") {
      if (!input) {
        var envData = { OS: "windows" };

        compiler.compileJava(envData, code, function (data) {
          res.send(data);
        });
      } else {
        var envData = { OS: "windows" };

        compiler.compileJavaWithInput(envData, code, input, function (data) {
          res.send(data);
        });
      }
    } else if (lang === "Python") {
      if (!input) {
        var envData = { OS: "windows" };

        compiler.compilePython(envData, code, function (data) {
          res.send(data);
        });
      } else {
        var envData = { OS: "windows" };

        compiler.compilePythonWithInput(envData, code, input, function (data) {
          res.send(data);
        });
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
  const dir =
    "C:/Users/user/vs code program/web develpoment/ide/server/temp";

  // fs.rm(dir, { recursive: true, force: true }, (err) => {
  //   if (err) {
  //     throw err;
  //   }
  // });
});

module.exports = router;
