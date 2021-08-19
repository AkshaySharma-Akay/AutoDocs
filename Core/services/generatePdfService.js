const xlsx2json = require('xlsx2json');
const ejs = require('ejs');
const path = require('path');
let html2pdf = require('html2pdf');

function getJson(filePath) {
    return new Promise(function (resolve, reject) {
        options = {
            mapping: {
                'sno': 'A',
                'name': 'B',
                'enrollment': 'C',
                'marks': 'D',
            }
        };
        xlsx2json(filePath, options)
            .then((jsonArray) => {
                resolve(jsonArray);
            })
            .catch((error) => {
                reject(Error(error));
            });
    });
}

function createHTMLReport(data, recordsLimitPerPage) {
    return new Promise((resolve, reject) => {
        ejs.renderFile(path.join(__dirname, "../views/reportTemplate.ejs"),
            { "data":data, "recordsLimitPerPage":recordsLimitPerPage }, function (error, htmlString) {
                if (error) {
                    reject(error);
                } else {
                    resolve(htmlString);
                }
            });
    })
}

async function convertHTMLToPdf(html) {
    const html_to_pdf = require('html-pdf-node');
    let options = { format: 'A4' , path:""};

    let file = { content: html };

    return await html_to_pdf.generatePdf(file, options);
}

async function generateReport(filePath, reqBody) {
    let recordsLimitPerPage = 7;
    try {
        let jsonData = await getJson(filePath);
        if (Array.isArray(jsonData) === true) {
            sheet1Data = jsonData[0];
            let htmlString = await createHTMLReport(sheet1Data, recordsLimitPerPage);
            let pdf = await convertHTMLToPdf(htmlString);
            return pdf;
        }
        else {
            throw new Error(jsonData);
        }
    } catch (error) {
        console.log(error);
        return Error(error);
    }
}

module.exports = { generateReport };