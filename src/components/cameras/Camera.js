import React from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar
}));


export default function Camera() {
    const classes = useStyles();

    return (
        <>
            <div className={classes.toolbar} />
            <Container>
                <iframe
                    className="mt-5"
                    title="cctv"
                    src="http://127.0.0.1:8081/stream.ogg"
                    width={window.innerHeight}
                    height={window.innerHeight * 0.8}
                />
            </Container>
        </>
    );
}
