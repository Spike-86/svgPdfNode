/*Подключаем библиотеки*/
const PDF = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');
/*Подключаем свои модули*/
let paintRolletFrontView = require('./paintRolletFrontView');
let paintRolletSideView = require('./paintRolletSideView');

let generatePdf = function () {
    /*Создаем пустой документ PDF*/
    let doc = new PDF();

    //Собираем pdf для вида снаружи
    doc.font('./DejaVuSans.ttf');
    doc.text('Вид снаружи');
    /*Получаем код SVG из отрисовки роллет*/
    let svgFrontView = paintRolletFrontView.paintFrontView();
    /*Добавляем картинку SVG в PDF документ*/
    SVGtoPDF(doc, svgFrontView, 0, 10);

    //Собираем pdf для вида сбоку
    doc.addPage();
    doc.font('./DejaVuSans.ttf');
    doc.text('Вид сбоку');
    /*Получаем код SVG из отрисовки роллет*/
    let svgSideView = paintRolletSideView.paintSideView();
    /*Добавляем картинку SVG в PDF документ*/
    SVGtoPDF(doc, svgSideView, 0, 10);

    /*Возвращаем готовый PDF*/
    return doc;
};

exports.generatePdf = generatePdf;

