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
    BLOCKED: 'blockedTile'
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

export { lightTheme, darkTheme, tileType, tileCarStatus, drawerWidth, MATERIAL_UI_APP_BAR_HEIGHT };