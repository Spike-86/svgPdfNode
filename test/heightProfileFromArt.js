//Справочник высоты профиля в мм.

let HeightProfileFromArt = function(value, scale) {
    switch (value) {
        case 'AR/37':
        case 'AR/37N':
            return (37 / scale);


        case 'AR/375':
        case 'AR/375N':
            return (37.55 / scale);


        case 'AR/377':
        case 'AR/377N':
            return (37.7 / scale);


        case 'AR/39':
        case 'AR/39N':
        case 'PD/39':
        case 'PD/39N':
            return (39 / scale);


        case 'AR/40':
        case 'AR/40N':
        case 'ARH/40':
        case 'ARH/40N':
            return (40 / scale);


        case 'AER42':
            return (42 / scale);


        case 'AR/41':
        case 'AR/41N':
        case 'AR/41T':
        case 'AR/41TN':
            return (41 / scale);


        case 'AER44/S':
        case 'AER44m/S':
            return (44 / scale);


        case 'AR/45':
        case 'AR/45N':
        case 'PD/45':
        case 'PD/45N':
            return (45 / scale);


        case 'AR/52':
        case 'AR/52N':
            return (52 / scale);


        case 'AER55/S':
        case 'AER55m/S':
        case 'AR/55':
        case 'AR/55N':
        case 'AR/55m':
        case 'AR/55mN':
        case 'ARH/55':
        case 'ARH/55N':
        case 'PD/55m':
        case 'PD/55mN':
            return (55 / scale);


        case 'AR/555':
        case 'AR/555N':
            return (55.55 / scale);


        case 'AEG56':
        case 'AEG56/P':
        case 'AEG56m':
        case 'AEG56m/P':
        case 'AER56':
        case 'AER56m':
            return (56 / scale);


        case 'AG/77':
        case 'AG/77H':
        case 'PD/77':
            return (77 / scale);


        case 'AEG84':
            return (84 / scale);

    }
};


module.exports = HeightProfileFromArt;

