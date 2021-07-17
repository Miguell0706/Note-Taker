
const uuid = require('uuid');
const fs = require("fs")

//Routing
module.exports = (app) => {
  //Get all notes
  app.get("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    res.json(notes);
  });
  // post notes

  app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    let note = req.body;
    note.id = uuid.v1();
    notes.push(note);
    fs.writeFileSync("db/db.json", JSON.stringify(notes));
    res.json(notes);
  });

  //delete notes
  app.delete("/api/notes/:id", (req,res) => {
    const notes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    const filteredNotes =  notes.filter(note => note.id !== req.params.id)
    fs.writeFileSync("db/db.json", JSON.stringify(filteredNotes));
    res.json(filteredNotes);
  } )
};
