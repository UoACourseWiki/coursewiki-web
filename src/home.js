import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 250,
        margin: 20,
        display: "inline-block",
        background: "rgb(255,255,255)",
        color: "black",
        [theme.breakpoints.down('xs')]: {
            maxWidth: "100%",
            marginLeft: 30,
            marginRight: 30
        }
    },
    container: {
        width: "90%",
        margin: "auto"
    },
    media: {
        height: 375,
        filter: "brightness(0.7)"
    },
    plot: {
        letterSpacing: 2,
        color: "lightgrey",
        marginTop: 10,
        marginBottom: 15
    }
}));

export default function Home() {
    const classes = useStyles();
    const [movies, setMovies] = useState(0);

    // useEffect(() => {
    //     fetch("https://popcritic.herokuapp.com/movies").then(resp => resp.json()).then((data) => setMovies(data));
    // },[])

    return (
        <Container className={classes.container}>
            <CircularProgress style={{display: movies ? "none" : "block", margin: "20px auto"}}/>
            <h1>this is a test!</h1>
        </Container>
    );
}