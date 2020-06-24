const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { feedback } = params;

  router.get('/', async (req, res, next) => {
    try {
      const feedbacklist = await feedback.getList();
      return res.render('feedback', {
        page: 'Feedback',
        feedbacklist,
        success: req.query.success,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const feedbackName = req.body.name.trim();
      const feedbackTitle = req.body.title.trim();
      const feedbackMessage = req.body.message.trim();

      if (!feedbackName || !feedbackTitle || !feedbackMessage) {
        const feedbacklist = await feedback.getList();
        return res.render('feedback', {
          page: 'Feedback',
          error: true,
          feedbackName,
          feedbackTitle,
          feedbackMessage,
          feedbacklist,
        });
      }
      await feedback.addEntry(feedbackName, feedbackTitle, feedbackMessage);
      return res.redirect('/feedback?success=true');
    } catch (err) {
      return next(err);
    }
  });
  return router;
};
