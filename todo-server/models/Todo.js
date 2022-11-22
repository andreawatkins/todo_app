const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  checked: { type: Boolean, required: true },
  status: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  created: {
    type: String,
    required: true,
    default: new Date(Date.now()).toString(),
  },
  username: { type: String, required: true },
});

module.exports = mongoose.model("Todo", TodoSchema);
