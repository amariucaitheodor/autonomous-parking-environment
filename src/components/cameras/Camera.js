import React from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 330;

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
        marginRight: drawerWidth,
    }
}));

export default function Camera() {
    const classes = useStyles();

    return (
        <main
            className={classes.content}
        >
            <div className={classes.toolbar} />
            <Container>
                <iframe
                    className="mt-4 mx-auto"
                    style={{ display: "block" }}
                    title="cctv"
                    src="http://127.0.0.1:8081/stream.ogg"
                    width={window.innerHeight}
                    height={window.innerHeight * 0.85}
                />
            </Container>
        </main>
    );
}
