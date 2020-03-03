import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilled from '@material-ui/icons/PlayCircleFilled';
import Build from '@material-ui/icons/Build';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import CheckBox from '@material-ui/icons/CheckBox';

const drawerWidth = 330;

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

export default function ParkingLotDrawer({ simulationOn, debugMode, toggleDebugMode, toggleSimulation }) {
  const classes = useStyles();

  function generate(element) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(value =>
      React.cloneElement(element, {
        key: value,
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
          Parking Lot Logs
        </Typography>
      </div>
      <Divider />
      <div className={classes.demo}>
        <List dense={true}>
          {generate(
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CheckBox />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Single-line item"
                secondary="Just a minute ago"
              />
            </ListItem>,
          )}
        </List>
      </div>
      <Divider />
      <Box fontWeight="fontWeightBold" className={"m-auto "} fontSize="h6.fontSize">
        Total Parking Spaces: 7
      </Box>
      <Box fontWeight="fontWeightBold" className={"m-auto "} fontSize="h6.fontSize">
        Available Parking Spaces: 4
      </Box>
      <Box fontWeight="fontWeightBold" className={"m-auto "} fontSize="h6.fontSize">
        Robot status: Idle
      </Box>
      <Button
        className={"m-auto"}
        startIcon={<Build />}
        variant="contained"
        color="primary"
        onClick={() => { toggleDebugMode(); }}
      >
        {debugMode ? "Disable" : "Enable"} debug mode
      </Button >
      <Button
        className={"m-auto"}
        startIcon={<PlayCircleFilled />}
        variant="contained"
        color="primary"
      >
        Run test suite
      </Button >
      <Button
        className={"mx-auto mb-3 mt-auto"}
        startIcon={simulationOn ? <PauseCircleFilled /> : <PlayCircleFilled />}
        variant="contained"
        color="primary"
        onClick={() => { toggleSimulation(true); }}
      >
        {simulationOn ? "Stop" : "Start"} simulation
      </Button >
    </Drawer>
  );
}

// class Overhead extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             toasts: [],
//         };
//     }

//     sendToastNotification = (message) => {
//         const toastTemplate = (
//             <Toast
//                 key={this.state.toasts.length + 1}
//                 onClose={() => this.closeOldestNotification()}
//                 show={true}
//                 delay={3000}
//                 autohide
//             >
//                 <Toast.Header>
//                     <GoGear />
//                     <strong className="mr-auto ml-2">Replanning...</strong>
//                     just now
//           </Toast.Header>
//                 <Toast.Body>
//                     <h6 style={{ color: "rgb(70, 70, 70)" }}>{message}</h6>
//                 </Toast.Body>
//             </Toast>
//         );

//         var newToasts = this.state.toasts;
//         newToasts.push(toastTemplate)
//         this.setState({
//             toasts: newToasts
//         });
//     }

//     closeOldestNotification() {
//         var newToasts = this.state.toasts;
//         newToasts.shift();
//         this.setState({
//             toasts: newToasts
//         });
//     }

//     componentDidMount() {
//       this.sendToastNotification("A new car has arrived at hub R4C0!");
//       this.sendToastNotification("A car is now awaiting delivery at hub R2C3!");
//       this.sendToastNotification("A new car has arrived at hub R4C0!");
//       this.sendToastNotification("A new obstacle was detected!");
//       this.sendToastNotification("A new obstacle was detected!");
//     }

//     render() {
//         return (
//             <div
//                 aria-live="polite"
//                 aria-atomic="true"
//                 style={{
//                     position: 'absolute',
//                     bottom: 0,
//                     right: 20
//                 }}
//             >
//                 {this.state.toasts}
//             </div>
//         );
//     }
// }

// export default Overhead;


