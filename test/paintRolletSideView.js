/*Подключаем библиотеки*/
const window = require('svgdom');
const SVG = require('svg.js')(window);
const document = window.document;
/*Подключаем свои модули*/
const heightProfile = require('./heightProfileFromArt');
const colordetects = require('./colorsDetect');
const contrastColors = require('./colorsDetect');

let scaleFromRealSize;

checkScale(2000, 2000);

//Функция для отрисовки вида сбоку
const drawPleaseSide = function () {

    //Инициализируем библиотеку svg.js и задаем размеры полотну для рисования
    const alurollBodySide = SVG(document).size(850, 1000);

    const ALUPAINT_SIDE = {

        /*Вспомогательные методы*/
        /*--------------------------*/
        //Ширина проема
        getWidthAperture: function () {
            return WIDTH_APERTURE;
        },
        //Толщина профиля роллеты
        getProfileThickness: function () {
            return PROFILE_THICKNESS;
        },
        //Высота проема
        getHeightAperture: function () {
            return HEIGHT_APERTURE;
        },
        //Центр полотна для рисования
        getCenterPlaceForDrawing: function () {
            return alurollBodySide.width() / 2;
        },
        //Вертикальная середина полотна для рисования
        getMiddlePlaceForDrawing: function () {
            return alurollBodySide.height() / 2;
        },
        //Начальная точка рисования в ширину
        getLeftApertureX: function () {
            return ALUPAINT_SIDE.getCenterPlaceForDrawing() - (ALUPAINT_SIDE.getWidthAperture() / 2);
        },
        //Начальная точка рисования в высоту
        getTopApertureY: function () {
            return ALUPAINT_SIDE.getMiddlePlaceForDrawing() - (ALUPAINT_SIDE.getHeightAperture() / 2);
        },
        //Глубина защитного короба
        getDeepProtectiveBox: function () {
            return DEEP_PROTECTIVE_BOX;
        },
        //Высота защитного короба
        getHeightProtectiveBox: function () {
            return PROTECTIVE_BOX_HEIGHT;
        },
        //Тип защитного короба
        getTypeProtectiveBox: function () {
            // 1: 45-градусный или консоль
            // 2: 20-градусный
            // 3: Полукруглый
            // 4: Круглый
            // 5: Встроенный
            // 6: Экструдированный полукруглый
            // 7: Экструдированный круглый

            return ROLLET_TYPEOF_BOX;
        },
        /*Методы рисования фигур и элементов*/
        /*---------------------------------------*/
        //Прямоугольник
        drawRect: function (width, height) {
            return alurollBodySide.rect(width, height);
        },
        //Размерные линии
        drawDimensionLines: function (x_start, y_start, x_end, y_end) {
            return alurollBodySide.line(x_start, y_start, x_end, y_end).attr({
                stroke: "#000",
                "stroke-width": 1
            });
        },
        //Фон свободного простанства
        drawFreePlace: function () {

            //Тип монтажа.
            // 0 - встроенный
            // 1 - накладной
            let rolletInstallType = ROLLET_INSTALL_TYPE;

            if (rolletInstallType === '0') {
                ALUPAINT_SIDE.drawRect((alurollBodySide.width() / 4) + ALUPAINT_SIDE.getDeepProtectiveBox(), ALUPAINT_SIDE.getHeightProtectiveBox() * 2)
                    .move(ALUPAINT_SIDE.getCenterPlaceForDrawing() - alurollBodySide.width() / 4, ALUPAINT_SIDE.getTopApertureY() - (ALUPAINT_SIDE.getHeightProtectiveBox() * 2))
                    .fill(LIGHT_GRAY_COLOR);
                ALUPAINT_SIDE.drawRect((alurollBodySide.width() / 4) + ALUPAINT_SIDE.getDeepProtectiveBox(), ALUPAINT_SIDE.getHeightProtectiveBox() * 2)
                    .move(ALUPAINT_SIDE.getCenterPlaceForDrawing() - alurollBodySide.width() / 4, ALUPAINT_SIDE.getTopApertureY() + ALUPAINT_SIDE.getHeightAperture())
                    .fill(LIGHT_GRAY_COLOR);
            } else {
                ALUPAINT_SIDE.drawRect(alurollBodySide.width() / 4, ALUPAINT_SIDE.getHeightProtectiveBox() * 2)
                    .move(ALUPAINT_SIDE.getCenterPlaceForDrawing() - alurollBodySide.width() / 4, ALUPAINT_SIDE.getTopApertureY() - (ALUPAINT_SIDE.getHeightProtectiveBox() * 2))
                    .fill(LIGHT_GRAY_COLOR);
                ALUPAINT_SIDE.drawRect((alurollBodySide.width() / 4), ALUPAINT_SIDE.getHeightProtectiveBox() * 2)
                    .move(ALUPAINT_SIDE.getCenterPlaceForDrawing() - alurollBodySide.width() / 4, ALUPAINT_SIDE.getTopApertureY() + ALUPAINT_SIDE.getHeightAperture())
                    .fill(LIGHT_GRAY_COLOR);
            }

        },
        //Рисуем профиль в профиль (каламбур)
        drawProfileSide: function () {
            return ALUPAINT_SIDE.drawRect(ALUPAINT_SIDE.getProfileThickness(), ALUPAINT_SIDE.getHeightAperture())
                .move(ALUPAINT_SIDE.getCenterPlaceForDrawing(), ALUPAINT_SIDE.getTopApertureY());
        },
        //Рисуем защитный короб
        drawProtectiveBox: function () {
            ALUPAINT_SIDE.drawRect(ALUPAINT_SIDE.getDeepProtectiveBox(), ALUPAINT_SIDE.getHeightProtectiveBox())
                .move(ALUPAINT_SIDE.getCenterPlaceForDrawing(), ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox());

            let typeBox = Number(ALUPAINT_SIDE.getTypeProtectiveBox());

            switch (typeBox) {
                case 1:
                    alurollBodySide.polyline([[ALUPAINT_SIDE.getCenterPlaceForDrawing() + (ALUPAINT_SIDE.getDeepProtectiveBox() * 0.7), ALUPAINT_SIDE.getTopApertureY()], [ALUPAINT_SIDE.getCenterPlaceForDrawing() + ALUPAINT_SIDE.getDeepProtectiveBox() + 1, ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getDeepProtectiveBox() * 0.3], [ALUPAINT_SIDE.getCenterPlaceForDrawing() + ALUPAINT_SIDE.getDeepProtectiveBox() + 1, ALUPAINT_SIDE.getTopApertureY()]])
                        .fill(WHITE_COLOR);

                    break;

                case 2:
                    alurollBodySide.polyline([[ALUPAINT_SIDE.getCenterPlaceForDrawing() + (ALUPAINT_SIDE.getDeepProtectiveBox() * 0.5), ALUPAINT_SIDE.getTopApertureY()], [ALUPAINT_SIDE.getCenterPlaceForDrawing() + ALUPAINT_SIDE.getDeepProtectiveBox() + 1, ALUPAINT_SIDE.getTopApertureY() - (ALUPAINT_SIDE.getDeepProtectiveBox() * 0.5) * 0.364], [ALUPAINT_SIDE.getCenterPlaceForDrawing() + ALUPAINT_SIDE.getDeepProtectiveBox() + 1, ALUPAINT_SIDE.getTopApertureY()]])
                        .fill(WHITE_COLOR);

                    break;

                case 3:
                    ALUPAINT_SIDE.drawRect((ALUPAINT_SIDE.getDeepProtectiveBox() / 2) + 1, ALUPAINT_SIDE.getHeightProtectiveBox())
                        .move(ALUPAINT_SIDE.getCenterPlaceForDrawing() + (ALUPAINT_SIDE.getDeepProtectiveBox() / 2), ALUPAINT_SIDE.getTopApertureY() - (ALUPAINT_SIDE.getHeightProtectiveBox() / 2))
                        .fill(WHITE_COLOR);
                    alurollBodySide.circle(ALUPAINT_SIDE.getHeightProtectiveBox())
                        .move(ALUPAINT_SIDE.getCenterPlaceForDrawing(), ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox());

                    break;

                case 4:
                    ALUPAINT_SIDE.drawRect((ALUPAINT_SIDE.getDeepProtectiveBox() / 2) + 1, ALUPAINT_SIDE.getHeightProtectiveBox())
                        .move(ALUPAINT_SIDE.getCenterPlaceForDrawing() + (ALUPAINT_SIDE.getDeepProtectiveBox() / 2), ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox())
                        .fill(WHITE_COLOR);
                    alurollBodySide.circle(ALUPAINT_SIDE.getHeightProtectiveBox())
                        .move(ALUPAINT_SIDE.getCenterPlaceForDrawing(), ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox());
                    break;

                case 5:

                    break;

                case 6:
                    ALUPAINT_SIDE.drawRect((ALUPAINT_SIDE.getDeepProtectiveBox() / 2) + 1, ALUPAINT_SIDE.getHeightProtectiveBox())
                        .move(ALUPAINT_SIDE.getCenterPlaceForDrawing() + (ALUPAINT_SIDE.getDeepProtectiveBox() / 2), ALUPAINT_SIDE.getTopApertureY() - (ALUPAINT_SIDE.getHeightProtectiveBox() / 2))
                        .fill(WHITE_COLOR);
                    alurollBodySide.circle(ALUPAINT_SIDE.getHeightProtectiveBox())
                        .move(ALUPAINT_SIDE.getCenterPlaceForDrawing(), ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox());

                    break;

                case 7:
                    ALUPAINT_SIDE.drawRect((ALUPAINT_SIDE.getDeepProtectiveBox() / 2) + 1, ALUPAINT_SIDE.getHeightProtectiveBox())
                        .move(ALUPAINT_SIDE.getCenterPlaceForDrawing() + (ALUPAINT_SIDE.getDeepProtectiveBox() / 2), ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox())
                        .fill(WHITE_COLOR);
                    alurollBodySide.circle(ALUPAINT_SIDE.getHeightProtectiveBox())
                        .move(ALUPAINT_SIDE.getCenterPlaceForDrawing(), ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox());

                    break;
            }
        },
        //Высота проема
        showDimensionHeightAperture: function () {
            ALUPAINT_SIDE.drawDimensionLines(ALUPAINT_SIDE.getCenterPlaceForDrawing() + ALUPAINT_SIDE.getDeepProtectiveBox() + 20, ALUPAINT_SIDE.getTopApertureY(), ALUPAINT_SIDE.getCenterPlaceForDrawing() + ALUPAINT_SIDE.getDeepProtectiveBox() + 20, ALUPAINT_SIDE.getTopApertureY() + ALUPAINT_SIDE.getHeightAperture());
            ALUPAINT_SIDE.drawDimensionLines(ALUPAINT_SIDE.getCenterPlaceForDrawing(), ALUPAINT_SIDE.getTopApertureY(), ALUPAINT_SIDE.getCenterPlaceForDrawing() + ALUPAINT_SIDE.getDeepProtectiveBox() + 30, ALUPAINT_SIDE.getTopApertureY());
            ALUPAINT_SIDE.drawDimensionLines(ALUPAINT_SIDE.getCenterPlaceForDrawing(), ALUPAINT_SIDE.getTopApertureY() + ALUPAINT_SIDE.getHeightAperture(), ALUPAINT_SIDE.getCenterPlaceForDrawing() + ALUPAINT_SIDE.getDeepProtectiveBox() + 30, ALUPAINT_SIDE.getTopApertureY() + ALUPAINT_SIDE.getHeightAperture());
            alurollBodySide.text('Высота проема').rotate(-90).move(-ALUPAINT_SIDE.getMiddlePlaceForDrawing(), ALUPAINT_SIDE.getCenterPlaceForDrawing() + ALUPAINT_SIDE.getDeepProtectiveBox() - 10);
            alurollBodySide.text(HEIGHT_APERTURE_REAL_SIZE + ' мм').rotate(-90).move(-ALUPAINT_SIDE.getMiddlePlaceForDrawing(), ALUPAINT_SIDE.getCenterPlaceForDrawing() + ALUPAINT_SIDE.getDeepProtectiveBox() - 10);
        },
        //Размерные линии защитного короба
        showDimensionProtectiveBox: function () {
            ALUPAINT_SIDE.drawDimensionLines(ALUPAINT_SIDE.getCenterPlaceForDrawing(), ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox(), ALUPAINT_SIDE.getCenterPlaceForDrawing() + ALUPAINT_SIDE.getDeepProtectiveBox() + 30, ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox());
            ALUPAINT_SIDE.drawDimensionLines(ALUPAINT_SIDE.getCenterPlaceForDrawing() + ALUPAINT_SIDE.getDeepProtectiveBox() + 20, ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox(), ALUPAINT_SIDE.getCenterPlaceForDrawing() + ALUPAINT_SIDE.getDeepProtectiveBox() + 20, ALUPAINT_SIDE.getTopApertureY());
            alurollBodySide.text(String(PROTECTIVE_BOX_HEIGHT_REAL_SIZE)).rotate(-90).move(-ALUPAINT_SIDE.getTopApertureY() + 35, ALUPAINT_SIDE.getCenterPlaceForDrawing() + ALUPAINT_SIDE.getDeepProtectiveBox() + 5);
        },
        //Размерная линия глубины защитного короба
        showDeepDimensionProtectiveBox: function () {
            ALUPAINT_SIDE.drawDimensionLines(ALUPAINT_SIDE.getCenterPlaceForDrawing(), ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox() - 20, ALUPAINT_SIDE.getCenterPlaceForDrawing() + ALUPAINT_SIDE.getDeepProtectiveBox(), ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox() - 20);
            ALUPAINT_SIDE.drawDimensionLines(ALUPAINT_SIDE.getCenterPlaceForDrawing(), ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox(), ALUPAINT_SIDE.getCenterPlaceForDrawing(), ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox() - 30);
            ALUPAINT_SIDE.drawDimensionLines(ALUPAINT_SIDE.getCenterPlaceForDrawing() + ALUPAINT_SIDE.getDeepProtectiveBox(), ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox(), ALUPAINT_SIDE.getCenterPlaceForDrawing() + ALUPAINT_SIDE.getDeepProtectiveBox(), ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox() - 30);
            alurollBodySide.text(String(DEEP_PROTECTIVE_BOX_REAL_SIZE)).move(ALUPAINT_SIDE.getCenterPlaceForDrawing() + 10, ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox() - 20);
        },
        //Размерные линии высоты роллеты
        showDimensionRolletHeight: function () {
            ALUPAINT_SIDE.drawDimensionLines(ALUPAINT_SIDE.getCenterPlaceForDrawing() - ALUPAINT_SIDE.getDeepProtectiveBox(), ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox(), ALUPAINT_SIDE.getCenterPlaceForDrawing() - ALUPAINT_SIDE.getDeepProtectiveBox(), ALUPAINT_SIDE.getTopApertureY() + ALUPAINT_SIDE.getHeightAperture());
            ALUPAINT_SIDE.drawDimensionLines(ALUPAINT_SIDE.getCenterPlaceForDrawing() - ALUPAINT_SIDE.getDeepProtectiveBox() - 10, ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox(), ALUPAINT_SIDE.getCenterPlaceForDrawing(), ALUPAINT_SIDE.getTopApertureY() - ALUPAINT_SIDE.getHeightProtectiveBox());
            ALUPAINT_SIDE.drawDimensionLines(ALUPAINT_SIDE.getCenterPlaceForDrawing() - ALUPAINT_SIDE.getDeepProtectiveBox() - 10, ALUPAINT_SIDE.getTopApertureY() + ALUPAINT_SIDE.getHeightAperture(), ALUPAINT_SIDE.getCenterPlaceForDrawing(), ALUPAINT_SIDE.getTopApertureY() + ALUPAINT_SIDE.getHeightAperture());
            alurollBodySide.text('Высота роллеты').rotate(-90).move(-ALUPAINT_SIDE.getMiddlePlaceForDrawing(), ALUPAINT_SIDE.getCenterPlaceForDrawing() - 70);
            alurollBodySide.text(HEIGHT_ROLLET + ' мм').rotate(-90).move(-ALUPAINT_SIDE.getMiddlePlaceForDrawing(), ALUPAINT_SIDE.getCenterPlaceForDrawing() - 70);
        },

    };

    ALUPAINT_SIDE.drawFreePlace();
    ALUPAINT_SIDE.drawProfileSide();
    ALUPAINT_SIDE.drawProtectiveBox();
    ALUPAINT_SIDE.showDimensionHeightAperture();
    ALUPAINT_SIDE.showDimensionProtectiveBox();
    ALUPAINT_SIDE.showDeepDimensionProtectiveBox();
    ALUPAINT_SIDE.showDimensionRolletHeight();

    return alurollBodySide.svg();

};

//Функция масштабирования svg для отрисовки
function checkScale(width, height) {
    if (width < 1500 && height < 2000) {
        scaleFromRealSize = 2.5;
    } else {
        scaleFromRealSize = 4
    }
}

exports.paintSideView = drawPleaseSide;