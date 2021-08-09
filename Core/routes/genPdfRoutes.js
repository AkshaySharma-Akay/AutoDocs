const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'uploads/' })
const generatePdfService = require("../services/generatePdfService")
router.get('', (req,res)=>{
    return res.status(403).json({"status":"invalid request"});
});
router.post('', upload.single('file'), (req, res)=>{
    generatePdfService.generateReport(req.file.path, req.body);
    return res.status(200).json({"status":"processit"});
});

module.exports = router;