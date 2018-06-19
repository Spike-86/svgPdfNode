const OBJECT = require('./objectForPaint');

global.scaleFromRealSize = checkScale(2000, 2000);
global.GUIDE_RAIL_REAL_SIZE = 53;
global.GUIDE_RAIL_WIDTH = GUIDE_RAIL_REAL_SIZE / scaleFromRealSize;
global.DEEP_PROTECTIVE_BOX_REAL_SIZE = objectForPaint.PROTECTIVE_BOX_HEIGHT;
global.PROFILE_THICKNESS = 9 / scaleFromRealSize;
global.DEEP_PROTECTIVE_BOX = objectForPaint.PROTECTIVE_BOX_HEIGHT / scaleFromRealSize;
global.GUIDE_RAIL_COLOR = '#3d3533';
global.PROTECTIVE_BOX_COLOR = '#3d3533';
global.WHITE_COLOR = '#fff';
global.LIGHT_GRAY_COLOR = '#8D8A8B';
global.PROTECTIVE_BOX_HEIGHT_REAL_SIZE = objectForPaint.PROTECTIVE_BOX_HEIGHT;
global.PROTECTIVE_BOX_HEIGHT = objectForPaint.PROTECTIVE_BOX_HEIGHT / scaleFromRealSize;
global.HEIGHT_ROLLET = objectForPaint.HEIGHT_APERTURE + objectForPaint.PROTECTIVE_BOX_HEIGHT;
global.WIDTH_APERTURE = 2500 / scaleFromRealSize;
global.WIDTH_APERTURE_REAL_SIZE = 2500;
global.HEIGHT_APERTURE = 2500 / scaleFromRealSize;
global.HEIGHT_APERTURE_REAL_SIZE = 2500;
global.WIDTH_ROLLET = WIDTH_APERTURE_REAL_SIZE + (53 * 2);
global.ROLLET_INSTALL_TYPE = objectForPaint.ROLLET_INSTALL_TYPE;
global.ROLLET_TYPEOF_BOX = objectForPaint.ROLLET_TYPEOF_BOX;

//Функция масштабирования svg для отрисовки
function checkScale(width, height) {
    if (width < 1500 && height < 2000) {
        return 2.5;
    } else {
        return  4;
    }
}