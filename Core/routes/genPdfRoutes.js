const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'uploads/' })
const generatePdfService = require("../services/generatePdfService")
router.get('', (req,res)=>{
    return res.status(403).json({"status":"invalid request"});
});
router.post('', upload.single('file'), (req, res)=>{
    generatePdfService.generateReport(req.file.path, req.body)
        .then((pdf)=>{
            console.log("pdf - ", pdf);
            return res.status(200).send(pdf);
        })
        .catch((error)=>{
            res.send(500).send({"status":"Somthing went wrong" +error});
        })
});

module.exports = router;