import express from 'express';
const router = express.Router();

// This path is relative
router.get('/', (req, res) => {
    res.send('In articles');
});

module.exports = router;