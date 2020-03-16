# Finitech Operations Monitor ![](https://github.com/Finitech-SDP/operations-monitor/workflows/Node.js%20CI/badge.svg)

## Features
- Parking lot real-time visual updates for operators and receptionists to more efficiently manage the parking spaces and communicate essential information and statistics when needed
- Autonomous parking simulation using an [adaptation](https://github.com/theodor1289/pddl-planner-backend) of an [open-source](https://bitbucket.org/planning-researchers/cloud-solver/src/master/) project, [Solver.Planning.Domains](http://solver.planning.domains/). It is an artificial intelligence system for automated planning, and consists of an initial state, actions, and a goal state. By applying the actions over the initial state and all child states, a goal can be found.
- Live stream from parking lot CCTV cameras
- Thoroughly tested in various different scenarios (available at `src/assets/planner/tests.js`)

## This project is a member of the architecture shown below, which I helped develop as part of [FinitechSDP](https://github.com/Finitech-SDP) (University of Edinburgh project) 2019-2020
![architecture](finitech-system-architecture.png)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Our app is ready for deployment!

### `npm run deploy`

Deploys the app to our organization's [Github Pages](https://finitech-sdp.github.io/operations-monitor/#/ "Finitech-SDP").

### `sudo sysctl fs.inotify.max_user_watches=524288`

Increases the kernel inotify watch limit
