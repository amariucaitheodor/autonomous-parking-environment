import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Build from '@material-ui/icons/Build';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Check from '@material-ui/icons/Receipt';
import MoveToInbox from '@material-ui/icons/MoveToInbox';
import LocalShipping from '@material-ui/icons/LocalShipping';
import HourglassEmpty from '@material-ui/icons/HourglassEmpty';
import DoneOutline from '@material-ui/icons/DoneOutline';
import Close from '@material-ui/icons/Close';
import ReactTimeAgo from 'react-time-ago';

const drawerWidth = 315;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }
}));

export default function ParkingLotDrawer({ spacesTotal, spacesAvailable, simulationButtonsDisabled, carriedCar, parkingLotConfiguration, parkingLogs, simulationOn, debugMode, toggleDebugMode, toggleSimulation }) {
  const classes = useStyles();

  let robotStatus = null;
  if (carriedCar === null)
    robotStatus = simulationOn ? "Moving" : "Standby";
  else {
    if (carriedCar.status === "AwaitingDelivery")
      robotStatus = "Delivering " + carriedCar.license;
    else
      robotStatus = "Parking " + carriedCar.license;
  }

  function generateLogs() {
    return parkingLogs.map((event, index) =>
      React.cloneElement(
        <ListItem>
          {event === null ? <Box m={3.25} /> :
            <ListItemAvatar>
              <Avatar>
                {event.type === "parking" ? <MoveToInbox /> :
                  (event.type === "moving" ? <LocalShipping /> :
                    (event.type === "success" ? <DoneOutline /> :
                      (event.type === "fail" ? <Close /> :
                        (event.type === "standby" ? <HourglassEmpty /> : <Check />))))}
              </Avatar>
            </ListItemAvatar>}
          <ListItemText
            primary={event === null ? null : event.title}
            secondary={event === null ? null : <ReactTimeAgo date={new Date()} />}
          />
        </ListItem>,
        {
          key: index,
        }),
    );
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Typography className={classes.title} variant="h6" noWrap align="center">
          Parking Lot
        </Typography>
      </div>
      <Divider />
      <List dense={true}>
        {generateLogs()}
      </List>
      <Divider />
      <Typography variant='h6' className={"m-auto "} >
        {"Total Parking Spaces: " + spacesTotal}
      </Typography>
      <Typography variant='h6' className={"m-auto "} >
        {"Available Parking Spaces: " + spacesAvailable}
      </Typography>
      <Typography variant='h6' className={"m-auto "} >
        {"Status: " + robotStatus}
      </Typography>
      <Typography color='error' variant='h6' className={"m-auto "} >
        {"Server: Disconnected"}
      </Typography>
      <Button
        className={"mx-auto mb-3 mt-auto"}
        startIcon={<Build />}
        variant="contained"
        color="primary"
        onClick={() => { toggleDebugMode(); }}
      >
        {debugMode ? "Disable" : "Enable"} debug mode
      </Button >
    </Drawer>
  );
}
