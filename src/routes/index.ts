import express from 'express';
const router = express.Router();

// This path is relative
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;