import React from "react";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import ZoomIn from '@material-ui/icons/ZoomIn';
import Edit from '@material-ui/icons/Edit';
import PauseCircleFilled from '@material-ui/icons/PlayCircleFilled';
import Replay from '@material-ui/icons/Replay';
import Save from '@material-ui/icons/Save';
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
import { drawerWidth, tileCarStatus } from '../Configuration';

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

export default function MonitorPanel({ simulatorPanel, saveConfiguration, resetConfiguration, spacesTotal, spacesAvailable, simulationButtonsDisabled, carriedCar, logs, simulationOn, debugMode, toggleDebugMode, toggleSimulation }) {
  const classes = useStyles();

  let robotStatus = null;
  if (carriedCar === null)
    robotStatus = simulationOn ? "Moving" : "Standby";
  else {
    if (carriedCar.status === tileCarStatus.AWAITING_DELIVERY)
      robotStatus = "Delivering " + carriedCar.license;
    else
      robotStatus = "Parking " + carriedCar.license;
  }

  function generateLogs() {
    return logs.map((event, index) =>
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
            secondary={event === null ? null : <ReactTimeAgo date={event.time} />}
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
          {simulatorPanel ? "Simulator" : "Parking Lot"}
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
      {!simulatorPanel ?
        <Typography color='error' variant='h6' className={"m-auto "} >
          {"Server: Disconnected"}
        </Typography> :
        null
      }
      <Button
        className={"m-auto"}
        startIcon={simulationOn ? <ZoomIn /> : <Edit />}
        variant="contained"
        color="primary"
        onClick={() => { toggleDebugMode(simulatorPanel); }}
      >
        {debugMode ? "Disable" : "Enable"} {simulatorPanel ? (simulationOn ? "Detail" : "Edit") : "Debug"} mode
      </Button >
      {simulatorPanel ?
        <Button
          className={"m-auto"}
          startIcon={<Build />}
          variant="contained"
          color="primary"
          disabled={simulationButtonsDisabled}
        >
          Run test
      </Button > :
        null
      }
      {simulatorPanel ?
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
          className={"m-auto"}>
          <Button
            startIcon={<Save />}
            disabled={simulationButtonsDisabled}
            onClick={() => { saveConfiguration() }}
          >
            Save
          </Button >
          <Button
            startIcon={<Replay />}
            disabled={simulationButtonsDisabled}
            onClick={() => { resetConfiguration() }}
          >
            Reset
        </Button >
        </ButtonGroup>
        :
        null
      }
      {simulatorPanel ?
        <Button
          className={"mx-auto mb-3 mt-auto"}
          startIcon={simulationButtonsDisabled ? <PauseCircleFilled /> : <PlayCircleFilled />}
          variant="contained"
          color="primary"
          disabled={simulationButtonsDisabled}
          onClick={() => { simulationOn ? toggleSimulation(true) : toggleSimulation(false) }}
        >
          {simulationOn ? "Simulating..." : "Start simulation"}
        </Button > :
        null
      }
    </Drawer>
  );
}
