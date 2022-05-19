const router = require('express').Router();
const { readTexts, writeTexts } = require('../db/index');
const db = require('../db/index')

// GET /api/texts should read db.json file & return all saved texts as JSON.
router.get('/texts', (req, res) => {
  db.readTexts().then((data)=>{
    return res.json(data)
  }).catch((err)=> res.json(err))
});

// POST /api/texts should receive a new text to save on the request body,
// add it to db.json, then return the text to client.
router.post('/texts', (req, res) => {
  db.writeTexts(req.body).then((data) => {
    return res.json(data)
  }).catch((err) => res.json(err))
});

module.exports = router;