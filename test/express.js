/*Подключаем библиотеки*/
const express = require('express');
const app = express();
const fs = require('fs');
/*Подключаем свои модули*/
const generatePdf = require('./generatePdf');

/*Стартовая страница*/
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

/*Ловим url downloadPdf*/
app.get('/downloadPdf', function (req, res) {
    /*Забираем сгенерированую PDF*/
    let pdf = generatePdf.generatePdf();
    /*Имя для создаваемой на сервере PDF*/
    let createPdf = 'pdf/demo.pdf';
    /*Путь до созданной PDF*/
    let pathToPdf = '/pdf/demo.pdf';
    /*Создаем поток, который записывает файл на сервер*/
    let writeStream = fs.createWriteStream(createPdf);

    /*Подключаем поток*/
    pdf.pipe(writeStream);
    /*Завершаем формирование PDF*/
    pdf.end();
    /*Обработчик по окончанию записи PDF на сервер*/
    writeStream.on('finish', function () {
        /*Передаем файл в ответ на клиента*/
        res.download(__dirname + pathToPdf, 'Роллета.pdf', function () {
            /*Удаляем PDF из папки*/
            fs.unlink(__dirname + pathToPdf, function () {
                console.log('Pdf deleted from directory');
            });
        });
    });
});

/*Стартуем сервер*/
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});