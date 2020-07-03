const express = require('express');

const router = express.Router();
module.exports = (params) => {
  const { speakers } = params;

  router.get('/', async (req, res) => {
    const speakerslist = await speakers.getList();
    const artwork = await speakers.getAllArtwork();
    return res.render('speakers', { page: 'All Speakers', speakerslist, artwork });
  });

  router.get('/:name', async (req, res, next) => {
    const speaker = await speakers.getSpeaker(req.params.name);
    // This will fall through and create a NOT FOUND
    if (!speaker) return next();
    const artwork = await speakers.getArtworkForSpeaker(req.params.name);
    console.log(speaker);
    console.log(artwork);
    return res.render('speakers/detail', {
      page: req.params.name, artwork, speaker,
    });
  });
  return router;
};
