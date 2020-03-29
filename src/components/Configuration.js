import { createMuiTheme } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#6d4c41',
        },
        secondary: {
            main: '#9e9d24',
        },
        type: 'dark'
    },
});

const lightTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#6d4c41',
        },
        secondary: {
            main: '#9e9d24',
        },
        type: 'light'
    },
});

const tileType = {
    PARKING: 'parkingTile',
    ROAD: 'roadTile',
    HUB: 'hubTile',
    INACCESSIBLE: 'inaccessibleTile'
};
Object.freeze(tileType);

const tileCarStatus = {
    AWAITING_PARKING: 'AwaitingParking',
    AWAITING_DELIVERY: 'AwaitingDelivery',
    IDLE: 'Idle',
    AWAITING_OWNER: 'AwaitingOwner'
};
Object.freeze(tileCarStatus);

const drawerWidth = 315;

const MATERIAL_UI_APP_BAR_HEIGHT = 64;

const randomLicensePlate = () => {
    const list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var res = "";
    for (var i = 0; i < 7; i++) {
        if (i === 3) {
            res = res + " ";
            continue;
        }

        var rnd = Math.floor(Math.random() * list.length);
        res = res + list.charAt(rnd);
    }
    return res;
}

export { lightTheme, darkTheme, tileType, tileCarStatus, randomLicensePlate, drawerWidth, MATERIAL_UI_APP_BAR_HEIGHT };