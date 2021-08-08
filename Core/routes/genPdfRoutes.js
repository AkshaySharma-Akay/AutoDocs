const express = require('express');
const router = express.Router();
let genPdfController  = require('../controllers/genPdfController');

router.get('', (req,res)=>{
    return res.status(403).json({"status":"invalid request"});
});
router.post('/genpdf', (req, res, next)=>{
    return genPdfController.genpdf;
});

module.exports = router;