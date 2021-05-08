import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ky from "ky";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                CourseWiki
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function User(props) {
    const classes = useStyles();
    const [email, SetEmail] = useState('');
    const [nickName, SetNickName] = useState('');
    const [password, SetPassword] = useState('');
    const [oldPassword, SetOldPassword] = useState('');
    const [alertMessage, SetAlertMessage] = useState('');
    const [succeedMessage, SetSucceedMessage] = useState(false);
    const [failedMessage, SetFailedMessage] = useState(false);
    const [isWaiting, SetIsWaiting] = useState(false);
    const jwt_token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    function CleanReq(obj) {
        var propNames = Object.getOwnPropertyNames(obj);
        for (var i = 0; i < propNames.length; i++) {
            var propName = propNames[i];
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
                delete obj[propName];
            }
        }
        return obj;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        SetIsWaiting(true)
        await ky.put("http://127.0.0.1:5000/Users/" + props.profile.id, {
            json: CleanReq({
                "nickName": nickName,
                "email": email,
                "oldPassword": oldPassword,
                "password": password,
                "confirmPassword": password
            }),
            hooks: {
                beforeRequest: [
                    request => {
                        request.headers.set('Authorization', `Bearer ${jwt_token}`)
                    }

                ],
                afterResponse: [
                    async (request, options, response) => {
                        if (response.status === 401 || response.status === 400) {
                            await response.json().then((data) => SetAlertMessage(data.message));
                            SetIsWaiting(false);
                            SetFailedMessage(true);
                        } else if (response.status === 200) {
                            await response.json().then((data) => SetAlertMessage(data.message));
                            SetFailedMessage(false);
                            SetSucceedMessage(true);
                        } else {
                            SetAlertMessage("Unknown Error please try again!");
                            SetFailedMessage(true);
                            SetIsWaiting(false);
                        }
                    }
                ]
            }
        }).then(resp => resp.json()).catch((err) => {
            console.log(err);
        });

    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                {/*<Avatar className={classes.avatar}>*/}
                {/*    <LockOutlinedIcon />*/}
                {/*</Avatar>*/}
                <Typography component="h1" variant="h5">
                    Edit your profile and Password
                </Typography>
                <Snackbar open={succeedMessage} autoHideDuration={1000}>
                    <MuiAlert elevation={6} variant="filled" severity="success" action={<IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            SetSucceedMessage(false);
                            window.location.href = "/";
                        }}
                    >
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>}>{alertMessage}</MuiAlert>
                </Snackbar>
                <Snackbar open={failedMessage} autoHideDuration={1000}>
                    <MuiAlert elevation={6} variant="filled" severity="error" action={<IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            SetFailedMessage(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>}>{alertMessage}</MuiAlert>
                </Snackbar>
                <form className={classes.form}>
                    <TextField
                        autoComplete="name"
                        name="nickName"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        id="nickName"
                        label="Nickname"
                        autoFocus
                        value={nickName}
                        onChange={e => SetNickName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Old Password"
                        type="password"
                        id="oldPassword"
                        autoComplete="current-password"
                        value={oldPassword}
                        onChange={e => SetOldPassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e => SetEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => SetPassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Repeat Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        disabled={isWaiting}
                    >
                        Update Information
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}