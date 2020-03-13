import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SportsEsports from '@material-ui/icons/SportsEsports';
import LocalParking from '@material-ui/icons/LocalParking';
import Visibility from '@material-ui/icons/Visibility';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { drawerWidth } from './Configuration';

const useStyles = makeStyles(theme => ({
    menuButtonLeft: {
        marginRight: theme.spacing(2),
    },
    menuButtonRight: {
        marginLeft: theme.spacing(2),
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginRight: drawerWidth,
    },
    title: {
        flexGrow: 1, // for everything but title to right
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
}));

export default function Bar({ simulationOn }) {
    const classes = useStyles();

    return (
        <AppBar
            position="fixed"
            className={classes.appBar}
        >
            <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap align="left">
                    Finitech Operations Monitor
                </Typography>
                <IconButton
                    className={clsx(classes.menuButtonRight)}
                    href="#/parking"
                    aria-label="go to parking lot"
                >
                    <LocalParking />
                </IconButton>
                <IconButton
                    className={clsx(classes.menuButtonRight)}
                    href="#/"
                    aria-label="go to simulator"
                >
                    <SportsEsports />
                </IconButton>
                <IconButton
                    className={clsx(classes.menuButtonRight)}
                    href={simulationOn ? null : "#/surveillance"}
                    aria-label="go to cctv cameras"
                >
                    <Visibility />
                </IconButton>
                <IconButton
                    className={clsx(classes.menuButtonRight)}
                    href={simulationOn ? null : "#/public-interface/pricing"}
                    aria-label="go to public interface"
                >
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}