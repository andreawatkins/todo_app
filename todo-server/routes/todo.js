const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const User = require("../models/User");

//const privateKey = process.env.JWT_PRIVATE_KEY;
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQC05Q13YI+O3HvX8+F76Mjiq7eCL1iFD1w01p7WvgFsdGh2Mh3B
Hu1sK92p5ooF6E3s5jC2w3J5JGgtWQNqkA9kKhx3uLTyXvXPxSZWQy3xrI+LKME1
LMcFltWEME5/O9ogLHomvc6Hhs50dmSjiaIpc+CIQMjgR3t+viQyMD77xwIDAQAB
AoGAUBZEswB+LlqxPbfMsYYrQieSNEHv5+EYCpCmfB5dFP4orYOcpr6hkM2O8sSN
gPYLYgG7uX6odLfIo6MQHyKunQIzsm/UGx0nYXubQzE8tfyorhChTdXcZH13CP0q
kUhjYod2Clje+NVRDdkHYbFCvxeBy880kPSkSIS33N4AV0kCQQD7B21Ub9jnafXV
emH1HrVdGcDCa72CpHg2PXvflUTkNuBZmDVzA91sxyk28k6yQ1ACi56jvs9RjbQH
/+v3N3fzAkEAuHoVxMw+AnggUUz567gNpqb0dxXkuXnn6V9gN6KBMQx5MUHnR1/U
PyghvBrl0MadJNiMnCUW+eNn3f3u4ESV3QJACEEfRDaFUF64mbNzgybmWdBd+Uan
raMQ3N+6sghrgoGXcPrDTyviXRBTd54SHmR+PgcvST0d/hWFxPmSXceyJwJAA2Li
UWl6Xes8lKF4GPaY8Y0xAZqaRzlQo30HtB28h1z2QIw4JZxBtiMTc3N+8nUi31FG
S3t2z4F4H6AQqXc41QJAZjkgim0Dd2fsbSSJCeDFrXjru0EVcmcmPFBvIn24dlMN
TaQdBIIIBFr32Bm7wc1k5xmJ2tL2ekrAEo55i0EEBQ==
-----END RSA PRIVATE KEY-----`;

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      //Typically you would log the error here
      return res.status(401).json({
        error: "Something went wrong. ",
      });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

router.post("/", async function (req, res) {
  //const usernameQuery = await User.find().where("_id").equals("req.payload.id").exec();
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    //id must come out of secure location (jwt token)
    author: req.payload.id,
    created: req.body.created,
    checked: req.body.checked,
    status: req.body.status,
    username: req.body.username,
  });
  return todo
    .save()
    .then((saveTodo) => {
      return res.status(201).json({
        _id: saveTodo._id,
        title: saveTodo.title,
        description: saveTodo.description,
        author: saveTodo.author,
        created: saveTodo.created,
        checked: saveTodo.checked,
        status: saveTodo.finished,
        username: saveTodo.username,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: "Something went wrong" });
    });
});

router.get("/", async function (req, res, next) {
  const todos = await Todo.find().where("author").equals(req.payload.id).exec();
  return res.status(200).json({ todos: todos });
});

router.get("/:id", async function (req, res, next) {
  const todo = await Todo.findOne().where("_id").equals(req.params.id).exec();
  return res.status(200).json(todo);
});

router.delete("/:id", async function (req, res, next) {
  const todo = await Todo.deleteOne().where("_id").equals(req.params.id).exec();
  return res.status(200).json(todo);
});

router.put("/:id", async function (req, res, next) {
  const filter = { _id: req.params.id };
  const update = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    created: req.body.created,
    checked: req.body.checked,
    status: req.body.finished,
    username: req.body.username,
  };

  const todo = await Todo.findOneAndUpdate(filter, update);
  return res.status(200).json(todo);
});

module.exports = router;
