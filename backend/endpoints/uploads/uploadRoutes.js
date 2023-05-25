const router = require('express').Router();	

const upload = require('./uploadsController');

router.post('/', upload.single('image'), (req, res) => {
    console.log(req.file);
    return res.json({ message: 'Success', filename: req.file.filename });
});

router.post('/multiple', upload.array('images', 10), (req, res) => {
    return res.send(`Success`);
 });

module.exports = router;