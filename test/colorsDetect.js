//Определяем цвет RAL по внутреннему коду Aluroll
let codeToRal = function (code) {
    switch (code) {
        case '00':
        case '01':
        case '101':
        case '201':
            return 'RAL9016';

        case '02':
        case '102':
        case '202':
            return 'RAL8014';

        case '03':
        case '103':
        case '203':
            return 'RAL7038';

        case '04':
        case '104':
        case '204':
            return 'RAL1019';

        case '06':
        case '106':
        case '206':
            return 'RAL5015';

        case '07':
        case '107':
        case '207':
            return 'RAL3004';

        case '08':
        case '108':
        case '208':
            return 'RAL9006';

        case '10':
        case '110':
        case '210':
            return 'RAL9011';

        case '13':
        case '113':
        case '213':
            return 'RAL7016';

        case '15':
        case '115':
        case '215':
            return 'RAL6009';

        case '16':
        case '116':
        case '216':
            return 'RAL5005';

        case '120':
        case '220':
            return 'RAL1007';

        case '21':
        case '121':
        case '221':
            return 'RAL1013';

        case '22':
        case '122':
        case '222':
            return 'RAL8019';

        case '23':
        case '123':
        case '223':
            return 'RAL1015';

        case '24':
        case '124':
        case '224':
            return "RAL1019";

        case '25':
        case '125':
        case '225':
            return 'RAL6005';

        case '26':
        case '126':
        case '226':
            return 'RAL5011';

        case '131':
        case '188':
        case '231':
            return 'RAL9010';

    }
}

//Определяеи цвет HEX по коду RAL
function ralToHex(ral) {
    switch (ral) {
        case 'RAL9016':
            return '#f1f0ea';

        case 'RAL8014':
            return '#4a3526';

        case 'RAL7038':
            return '#b0b0a9';

        case 'RAL5015':
            return '#007cb0';

        case 'RAL3004':
            return '#6b1c23';

        case 'RAL9006':
            return '#a1a1a0';

        case 'RAL9011':
            return '#27292b';

        case 'RAL7016':
            return '#383e42';

        case 'RAL8019':
            return '#3d3635';

        case 'RAL6009':
            return '#27352a';

        case 'RAL5005':
            return '#005387';

        case 'RAL1007':
            return '#e88c00';

        case 'RAL1013':
            return '#e3d9c6';

        case 'RAL1015':
            return '#e6d2b5';

        case 'RAL1019':
            return '#a48f7a';

        case 'RAL6005':
            return '#114232';

        case 'RAL5011':
            return '#1a2b3c';

        case 'RAL9010':
            return '#f1ece1';
    }
}

function colorsDetect(code) {
    return ralToHex(codeToRal(code));
}

//зазор просвета для профилей
let contrastColors = function (code) {
    switch (code) {
        case '02':
        case '102':
        case '202':
        case '03':
        case '103':
        case '203':
        case '04':
        case '104':
        case '204':
        case '06':
        case '106':
        case '206':
        case '07':
        case '107':
        case '207':
        case '08':
        case '108':
        case '208':
        case '110':
        case '210':
        case '113':
        case '213':
        case '115':
        case '215':
        case '116':
        case '216':
        case '120':
        case '220':
        case '21':
        case '22':
        case '122':
        case '222':
        case '121':
        case '221':
        case '23':
        case '123':
        case '223':
        case '25':
        case '125':
        case '225':
        case '126':
        case '226':
        case '229':
            return '#fff';

        case '00':
        case '01':
        case '101':
        case '201':
        case '131':
        case '188':
        case '231':
            return '#000';

    }
};

module.exports = colorsDetect;
module.exports = contrastColors;