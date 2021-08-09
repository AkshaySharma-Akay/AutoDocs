const xlsx2json = require('xlsx2json');

let getExcelData = (filePath) => {
    return new Promise((resolve, reject) => {
        try{
            xlsx2json(filePath).then(jsonArray => {
                resolve(jsonArray);
            });
        } catch (exception){
            console.log("exception occured " + e);
            reject("can't read file");
        }
    })
};

let generateReport = (filePath, reqBody) => {
    getExcelData(filePath).then((data,error)=>{
        if(error) console.log(error);
        else{
            rows = data[0];
            let headers = Object.values(rows[0]);
            console.log(headers);
        }
    });
}

module.exports = { generateReport };