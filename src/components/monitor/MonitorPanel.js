import React, { useState } from "react";
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
import PauseCircleFilled from '@material-ui/icons/PauseCircleFilled';
import Replay from '@material-ui/icons/Replay';
import Save from '@material-ui/icons/Save';
import Build from '@material-ui/icons/Build';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Check from '@material-ui/icons/Receipt';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import MoveToInbox from '@material-ui/icons/MoveToInbox';
import LocalShipping from '@material-ui/icons/LocalShipping';
import HourglassEmpty from '@material-ui/icons/HourglassEmpty';
import Pause from '@material-ui/icons/Pause';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import DoneOutline from '@material-ui/icons/DoneOutline';
import Close from '@material-ui/icons/Close';
import LanguageIcon from '@material-ui/icons/Language';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ReactTimeAgo from 'react-time-ago';
import SettingsIcon from '@material-ui/icons/Settings';
import { drawerWidth, tileCarStatus } from '../Configuration';
import { noOfTests } from '../../assets/planner/tests';

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

export default function MonitorPanel({ totalLocalPaths, simulatorLocalPathsProgress, showLoader, simulatorPanel, toggleGlobalPlanView, globalPlanView, runTest, saveConfiguration, resetConfiguration, spacesTotal, spacesAvailable, simulationButtonsDisabled, carriedCar, logs, simulationOn, debugMode, toggleDebugMode, toggleSimulation }) {
  const classes = useStyles();
  const [testToRun, setTestToRun] = useState(0);

  let robotStatus = null;
  if (carriedCar === null)
    robotStatus = simulationOn ? "Advancing" : "On Standby";
  else switch (carriedCar.status) {
    case tileCarStatus.AWAITING_DELIVERY:
      robotStatus = "Delivering " + carriedCar.license;
      break;
    case tileCarStatus.AWAITING_PARKING:
      robotStatus = "Parking " + carriedCar.license;
      break;
    default:
      console.error("Unknown carriedCar status when updating Monitor Panel");
      break;
  }

  function generateLogs() {
    return logs.map((event, index) => {
      let logIcon = null;
      if (event !== null)
        switch (event.type) {
          case "parking":
            logIcon = <MoveToInbox />;
            break;
          case "moving":
            logIcon = <LocalShipping />;
            break;
          case "success":
            logIcon = <DoneOutline />;
            break;
          case "fail":
            logIcon = <Close />;
            break;
          case "planning":
            logIcon = <HourglassEmpty />;
            break;
          case "transfer":
            logIcon = <SwapHorizIcon />;
            break;
          case "settings":
            logIcon = <SettingsIcon />;
            break;
          case "standby":
            logIcon = <Pause />;
            break;
          case "external":
            logIcon = <PriorityHighIcon />;
            break;
          default:
            logIcon = <Check />;
            break;
        }

      return React.cloneElement(
        <ListItem>
          {
            event === null ?
              <Box m={3.25} /> :
              <ListItemAvatar>
                <Avatar>
                  {logIcon}
                </Avatar>
              </ListItemAvatar>}
          <ListItemText
            primary={event === null ? null : event.title}
            secondary={event === null ? null : <ReactTimeAgo date={event.time} />}
          />
        </ListItem>,
        {
          key: index,
        });
    }
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
        {robotStatus + (simulatorPanel && simulationOn ? ` (${simulatorLocalPathsProgress + 1}/${totalLocalPaths})` : "")}
      </Typography>
      {!simulatorPanel ?
        <Typography color='error' variant='h6' className={"m-auto "} >
          {"Server: Disconnected"}
        </Typography> :
        null
      }
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="edit grid button group"
        className={"m-auto"}>
        <Button
          startIcon={simulationOn ? <ZoomIn /> : <Edit />}
          onClick={() => { toggleDebugMode(simulatorPanel); }}
        >
          {debugMode ? "Disable" : "Enable"} {simulatorPanel ? (simulationOn ? "Live" : "Edit") : "Debug"} mode
        </Button >
        <Button
          onClick={() => { toggleGlobalPlanView() }}
        >
          {globalPlanView ? <LanguageIcon /> : <TrendingUpIcon />}
        </Button>
      </ButtonGroup>
      {simulatorPanel ?
        <>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="save reset configuration button group"
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
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="test planner button group"
            className={"m-auto"}>
            <Button
              startIcon={<Build />}
              disabled={simulationButtonsDisabled}
              onClick={() => { runTest(testToRun) }}
            >
              Run test
        </Button >
            <Button
              disabled={simulationButtonsDisabled}
              onClick={() => { setTestToRun((testToRun + 1) % noOfTests) }}
            >
              {testToRun}
            </Button >
          </ButtonGroup>
          <Button
            variant="contained"
            color="primary"
            aria-label="run simulation button group"
            className={"mx-auto mb-3 mt-auto"}
            disabled={showLoader}
            startIcon={simulationOn ? <PauseCircleFilled /> : <PlayCircleFilled />}
            onClick={() => { simulationOn ? toggleSimulation("Manual interruption triggered") : toggleSimulation() }}
          >
            {simulationOn ? "Pause simulation" : "Start simulation"}
          </Button>
        </> :
        null
      }
    </Drawer >
  );
}
