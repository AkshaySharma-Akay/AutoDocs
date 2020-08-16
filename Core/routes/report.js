var express = require('express');
var reportRouter = express.Router();
var bodyParser = require('body-parser');
const pdf = require('html-pdf')
const csv = require('csvtojson')
const ejs = require("ejs");
const path = require('path');

reportRouter.route('/')
  .get(function (req, res, next) {
    res.render('report-form', { title: 'Report Form' })
  })
  .post(function (req, res, next) {
    let classof = req.body.classof;
    let teacher = req.body.teachername;
    let maxmarks = req.body.maxmarks;
    let place = req.body.place;
    let title = "Report " + classof;

    const converter = csv().fromFile('./public/data/MOCK_DATA.csv').then((json) => {
      studentData = json;
      ejs.renderFile(path.join(__dirname, '../views/', "report-format.ejs"), {
         classof:classof, teacher:teacher, maxmarks:maxmarks, place:place, title:title,
         data: studentData }, (err, data) => {
        if (err) {
          res.send(err);
        } else {
          let options = {
            "height": "11.25in",
            "width": "8.5in",
          };
          pdf.create(data, options).toFile("public/output/report-" + classof + ".pdf", function (err, data) {
            if (err) {
              res.send(err);
            } else {
              res.send("File created successfully");
            }
          });
        }
      })
    })
  })

module.exports = reportRouter;