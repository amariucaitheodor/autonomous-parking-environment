import React from "react";
// import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 315;

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
        marginRight: drawerWidth,
    }
}));

export default function Payment() {
    const classes = useStyles();

    return (
        <main
            className={classes.content}
        >
            <div className={classes.toolbar} />
            {/* <Container>
            </Container> */}
        </main>
    );
}
