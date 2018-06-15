/*Подключаем библиотеки*/
const PDF = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');
/*Подключаем свои модули*/
let paintRollet = require('./paintRolletFrontView');

let generatePdf = function () {
    /*Создаем пустой документ PDF*/
    let doc = new PDF();
    /*Получаем код SVG из отрисовки роллет*/
    let svgFrontView = paintRollet.paintFrontView();
    /*Добавляем картинку SVG в PDF документ*/
    SVGtoPDF(doc, svgFrontView, 0, 0);
    /*Возвращаем готовый PDF*/
    return doc;
};

exports.generatePdf = generatePdf;

