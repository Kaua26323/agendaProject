const mongoose = require("mongoose");

const AgendaSchema = new mongoose.Schema({
  title: { type: String, require: true },
  task: { type: String, require: true },
});

const AgendaModel = mongoose.model("Agenda", AgendaSchema);

module.exports = AgendaModel;
