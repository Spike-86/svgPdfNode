/*Подключаем библиотеки*/
const window = require('svgdom');
const SVG = require('svg.js')(window);
const document = window.document;
/*Подключаем свои модули*/
const constants = require('./constants');
const heightProfile = require('./heightProfileFromArt');
const colordetects = require('./colorsDetect');
const contrastColors = require('./colorsDetect');



//Функция для отрисовки вида снаружи
const drawPleaseFront = function () {


    //Инициализируем библиотеку svg.js и задаем размеры полотну для рисования
    const alurollBody = SVG(document).size(850, 1000);

    const PROFILE_COLOR = '201';

    //Глобальный объект, содержащий методы для отрисовки вида снаружи Aluroll в SVG
    const ALUPAINT = {

        /*Вспомогательные методы*/
        /*--------------------------*/
        //Ширина проема
        getWidthAperture: function () {
            return WIDTH_APERTURE;
        },
        //Высота проема
        getHeightAperture: function () {
            return HEIGHT_APERTURE;
        },
        //Центр полотна для рисования
        getCenterPlaceForDrawing: function () {
            return alurollBody.width() / 2;
        },
        //Вертикальная середина полотна для рисования
        getMiddlePlaceForDrawing: function () {
            return alurollBody.height() / 2;
        },
        //Центр проема
        getCenterAperture: function () {
            return ALUPAINT.getWidthAperture / 2;
        },
        //Начальная точка рисования в ширину
        getLeftApertureX: function () {
            return ALUPAINT.getCenterPlaceForDrawing() - (ALUPAINT.getWidthAperture() / 2);
        },
        //Начальная точка рисования в высоту
        getTopApertureY: function () {
            return ALUPAINT.getMiddlePlaceForDrawing() - (ALUPAINT.getHeightAperture() / 2);
        },
        //Получаем выбранный профиль
        getProfilValueArticle: function () {
            return 'AR/39N';
        },
        //Получаем высоту профиля в зависимости от артикула
        getHeightProfileFromArt: function () {
            return heightProfile('AR/39N', scaleFromRealSize);
        },
        //Высота защитного короба
        getHeightProtectiveBox: function () {
            return PROTECTIVE_BOX_HEIGHT;
        },


        /*Методы рисования фигур и элементов*/
        /*---------------------------------------*/
        //Прямоугольник
        drawRect: function (width, height) {
            return alurollBody.rect(width, height);
        },
        //Размерные линии
        drawDimensionLines: function (x_start, y_start, x_end, y_end) {
            return alurollBody.line(x_start, y_start, x_end, y_end).attr({
                stroke: "#000",
                "stroke-width": 1
            });
        },
        //Левая направляющая шина
        drawLeftGuideRail: function () {
            return ALUPAINT.drawRect(GUIDE_RAIL_WIDTH, ALUPAINT.getHeightAperture()).fill(GUIDE_RAIL_COLOR).move(ALUPAINT.getLeftApertureX() - GUIDE_RAIL_WIDTH, ALUPAINT.getTopApertureY());
        },
        //Правая направляющая шина
        drawRightGuideRail: function () {
            return ALUPAINT.drawRect(GUIDE_RAIL_WIDTH, ALUPAINT.getHeightAperture()).fill(GUIDE_RAIL_COLOR).move(ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture(), ALUPAINT.getTopApertureY());
        },
        //Защитный короб
        drawProtectiveBox: function () {
            return ALUPAINT.drawRect(ALUPAINT.getWidthAperture() + (GUIDE_RAIL_WIDTH * 2), PROTECTIVE_BOX_HEIGHT).fill(PROTECTIVE_BOX_COLOR).move(ALUPAINT.getLeftApertureX() - GUIDE_RAIL_WIDTH, ALUPAINT.getTopApertureY() - PROTECTIVE_BOX_HEIGHT);
        },
        //Профиль
        drawProfile: function (height, color) {
            let profilesGroup = alurollBody.group();
            let profilesArray = [];
            for (let i = 0; i < ALUPAINT.getHeightAperture() / ALUPAINT.getHeightProfileFromArt(); i++) {
                if (profilesArray.length * ALUPAINT.getHeightProfileFromArt() + ALUPAINT.getHeightProfileFromArt() < ALUPAINT.getHeightAperture()) {
                    profilesArray[i] = profilesGroup.rect(ALUPAINT.getWidthAperture(), height).fill(color).move(ALUPAINT.getLeftApertureX(), ALUPAINT.getTopApertureY()).y(ALUPAINT.getTopApertureY() + (ALUPAINT.getHeightProfileFromArt() * i));
                }
            }
            //рисуем зазор просвета для профилей
            profilesGroup.stroke(contrastColors(PROFILE_COLOR));
        },
        //Размерные линии с текстом для ширины проема
        showDimensionWidthAperture: function () {
            ALUPAINT.drawDimensionLines(ALUPAINT.getLeftApertureX(), ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture() + 30, ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture(), ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture() + 30);
            ALUPAINT.drawDimensionLines(ALUPAINT.getLeftApertureX(), ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture(), ALUPAINT.getLeftApertureX(), ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture() + 40);
            ALUPAINT.drawDimensionLines(ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() - 1, ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture(), ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() - 1, ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture() + 40);
            alurollBody.text('Ширина проема').move(ALUPAINT.getCenterPlaceForDrawing() - 30, ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture() + 30);
            alurollBody.text(WIDTH_APERTURE_REAL_SIZE + ' мм').move(ALUPAINT.getCenterPlaceForDrawing(), ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture() + 10);
        },
        //Размерные линии с текстом для высоты проема
        showDimensionHeightAperture: function () {
            ALUPAINT.drawDimensionLines(ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH + 30, ALUPAINT.getTopApertureY(), ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH + 30, ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture());
            ALUPAINT.drawDimensionLines(ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH, ALUPAINT.getTopApertureY(), ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH + 40, ALUPAINT.getTopApertureY());
            ALUPAINT.drawDimensionLines(ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH, ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture() - 1, ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH + 40, ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture() - 1);
            alurollBody.text('Высота проема').rotate(-90).move(-ALUPAINT.getMiddlePlaceForDrawing(), ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + 15);
            alurollBody.text(HEIGHT_APERTURE_REAL_SIZE + ' мм').rotate(-90).move(-ALUPAINT.getMiddlePlaceForDrawing(), ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH);
        },
        //Размерные линии защитного короба
        showDimensionProtectiveBox: function () {
            ALUPAINT.drawDimensionLines(ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH, ALUPAINT.getTopApertureY() - PROTECTIVE_BOX_HEIGHT, ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH + 40, ALUPAINT.getTopApertureY() - ALUPAINT.getHeightProtectiveBox())
            ALUPAINT.drawDimensionLines(ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH + 30, ALUPAINT.getTopApertureY() - ALUPAINT.getHeightProtectiveBox(), ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH + 30, ALUPAINT.getTopApertureY());
            alurollBody.text(String(PROTECTIVE_BOX_HEIGHT_REAL_SIZE)).rotate(-90).move(-ALUPAINT.getTopApertureY() + 30, ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH + 10);
        },
        //Размерные линии ширины роллеты
        showDimensionRolletWidth: function () {
            ALUPAINT.drawDimensionLines(ALUPAINT.getLeftApertureX() - GUIDE_RAIL_WIDTH + 1, ALUPAINT.getTopApertureY() - ALUPAINT.getHeightProtectiveBox() - 30, ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH - 1, ALUPAINT.getTopApertureY() - ALUPAINT.getHeightProtectiveBox() - 30);
            ALUPAINT.drawDimensionLines(ALUPAINT.getLeftApertureX() - GUIDE_RAIL_WIDTH + 1, ALUPAINT.getTopApertureY() - ALUPAINT.getHeightProtectiveBox(), ALUPAINT.getLeftApertureX() - GUIDE_RAIL_WIDTH + 1, ALUPAINT.getTopApertureY() - ALUPAINT.getHeightProtectiveBox() - 40);
            ALUPAINT.drawDimensionLines(ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH - 1, ALUPAINT.getTopApertureY() - ALUPAINT.getHeightProtectiveBox(), ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH - 1, ALUPAINT.getTopApertureY() - ALUPAINT.getHeightProtectiveBox() - 40);
            alurollBody.text('Ширина роллеты').move(ALUPAINT.getCenterPlaceForDrawing() - 30, ALUPAINT.getTopApertureY() - ALUPAINT.getHeightProtectiveBox() - 30);
            alurollBody.text(WIDTH_ROLLET + ' мм').move(ALUPAINT.getCenterPlaceForDrawing(), ALUPAINT.getTopApertureY() - ALUPAINT.getHeightProtectiveBox() - 50);
        },
        //Размерные линии высоты роллеты
        showDimensionRolletHeight: function () {
            ALUPAINT.drawDimensionLines(ALUPAINT.getLeftApertureX() - GUIDE_RAIL_WIDTH - 30, ALUPAINT.getTopApertureY() - ALUPAINT.getHeightProtectiveBox() + 1, ALUPAINT.getLeftApertureX() - GUIDE_RAIL_WIDTH - 30, ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture());
            ALUPAINT.drawDimensionLines(ALUPAINT.getLeftApertureX() - GUIDE_RAIL_WIDTH, ALUPAINT.getTopApertureY() - ALUPAINT.getHeightProtectiveBox() + 1, ALUPAINT.getLeftApertureX() - GUIDE_RAIL_WIDTH - 40, ALUPAINT.getTopApertureY() - ALUPAINT.getHeightProtectiveBox() + 1);
            ALUPAINT.drawDimensionLines(ALUPAINT.getLeftApertureX() - GUIDE_RAIL_WIDTH, ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture() - 1, ALUPAINT.getLeftApertureX() - GUIDE_RAIL_WIDTH - 40, ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture() - 1);
            alurollBody.text('Высота роллеты').rotate(-90).move(-ALUPAINT.getMiddlePlaceForDrawing(), ALUPAINT.getLeftApertureX() - 80);
            alurollBody.text(HEIGHT_ROLLET + ' мм').rotate(-90).move(-ALUPAINT.getMiddlePlaceForDrawing(), ALUPAINT.getLeftApertureX() - 80);
        },
        //Размерные линии направляющей шины
        showGuideRailWidth: function () {
            ALUPAINT.drawDimensionLines(ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH, ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture(), ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH, ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture() + 40);
            ALUPAINT.drawDimensionLines(ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH, ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture() + 30, ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH + 40, ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture() + 30);
            alurollBody.text(GUIDE_RAIL_REAL_SIZE + ' мм').move(ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH + 10, ALUPAINT.getTopApertureY() + ALUPAINT.getHeightAperture() + 10);
        },
        //Привод
        showDrive: function (color) {

            let sideToInstall = 'Справка';
            let typeOfDrive = 'Моторчик';

            if (sideToInstall === 'Справа') {
                ALUPAINT.drawRect(ALUPAINT.getWidthAperture() / 2, ALUPAINT.getHeightProtectiveBox() / 2).move(ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH - (ALUPAINT.getWidthAperture() / 2) - 1, ALUPAINT.getTopApertureY() - (ALUPAINT.getHeightProtectiveBox() * 0.8))
                    .fill(color);
                alurollBody.text(typeOfDrive).move(ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() + GUIDE_RAIL_WIDTH - (ALUPAINT.getWidthAperture() / 3) - 1, ALUPAINT.getTopApertureY() - (ALUPAINT.getHeightProtectiveBox() * 0.8));
            } else {
                ALUPAINT.drawRect(ALUPAINT.getWidthAperture() / 2, ALUPAINT.getHeightProtectiveBox() / 2).move(ALUPAINT.getLeftApertureX() - GUIDE_RAIL_WIDTH, ALUPAINT.getTopApertureY() - (ALUPAINT.getHeightProtectiveBox() * 0.8))
                    .fill(color);
                alurollBody.text(typeOfDrive).move(ALUPAINT.getLeftApertureX() + ALUPAINT.getWidthAperture() / 5, ALUPAINT.getTopApertureY() - (ALUPAINT.getHeightProtectiveBox() * 0.8));
            }

        },
        //Артикул профиля на полотне
        showArticle: function () {

            let fillColor;

            // if ($('#rolletProfileColor').find('option').length > 0) {
            //     fillColor = contrastColors(PROFILE_COLOR);
            // } else {
            fillColor = WHITE_COLOR;
            // }

            // alurollBody.text($('#rolletProfile').find('option:selected').text() + ' ' + $('#rolletProfileColor').find('option:selected').text() + ' (' + $('#rolletCoatingType').find('option:selected').text() + ')')
            alurollBody.text('test')
                .style({fill: fillColor})
                .move(ALUPAINT.getCenterPlaceForDrawing() - 60, ALUPAINT.getMiddlePlaceForDrawing() - 20);
        },

        /*--------------------------------------------------*/
        //Вызов отрисовки
        paintRollet: function () {
            ALUPAINT.drawRect(ALUPAINT.getWidthAperture(), ALUPAINT.getHeightAperture()).fill('#fff').move(ALUPAINT.getLeftApertureX(), ALUPAINT.getTopApertureY());
            ALUPAINT.drawLeftGuideRail();
            ALUPAINT.drawRightGuideRail();
            ALUPAINT.drawProtectiveBox();
            ALUPAINT.showDimensionWidthAperture();
            ALUPAINT.showDimensionHeightAperture();
            ALUPAINT.showDimensionProtectiveBox();
            ALUPAINT.showDimensionRolletWidth();
            ALUPAINT.showDimensionRolletHeight();
            ALUPAINT.showGuideRailWidth();
            ALUPAINT.showDrive('#a7a7a7');
            ALUPAINT.drawProfile(ALUPAINT.getHeightProfileFromArt(), colordetects(PROFILE_COLOR));
            ALUPAINT.showArticle();
        }
    };

    ALUPAINT.paintRollet();

    return alurollBody.svg();
};


/*---------------------------------*/

exports.paintFrontView = drawPleaseFront;



