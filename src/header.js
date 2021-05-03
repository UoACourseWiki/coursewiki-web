import React, {useEffect, useState} from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import GitHubIcon from '@material-ui/icons/GitHub';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    header: {
        flexGrow: 1,
    },
    bar: {
        background: 'rgb(255,255,255)'
    },
    title: {
        flexGrow: 1,
        display: 'none',
        fontSize: 25,
        fontWeight: "bolder",
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    login: {
        margin: 20,
        fontWeight: "bolder",
        [theme.breakpoints.down('sm')]: {
            padding: 5,
        },
    },
    search: {
        position: 'relative',
        borderRadius: 20,
        backgroundColor: fade(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgb(0,0,0)'
    },
    inputRoot: {
        color: 'primary',
    },
    avatar: {
        marginRight: 20,
        border: "2px solid black"
    },
    user: {
        margin: 25
    },
    gh: {
        color: "black",
        margin: 15,
        [theme.breakpoints.down('sm')]: {
            display: "none"
        }
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
    placeholder: {
        color: 'rgb(0,0,0)'
    }
}));

export default function SearchAppBar() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [profile, setProfile] = useState(1);
    const jwt_token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    useEffect(async () => {
        // await ky.get('http://127.0.0.1:5000/Users/self',{"headers": {"accept": "text/plain", "authorization": `Bearer ${jwt_token}`}
        // }).then(resp => resp.json()).then((data) => setProfile(data)).catch(console.log);
    }, [])

    function search(e) {
        if (e.keyCode == 13) window.location.href = "/search/" + e.target.value
    }

    return (
        <div className={classes.header}>
            <AppBar position="static" className={classes.bar}>
                <Toolbar>
                    <Link href="/">
                        <Avatar alt="CourseWiki" src="/logo512.png" className={classes.avatar}/>
                    </Link>
                    <Typography className={classes.title} variant="h6" color={"textPrimary"} noWrap>
                        CourseWiki
                    </Typography>
                    <Link href="https://github.com/UoACourseWiki/CourseWiki">
                        <GitHubIcon fontSize="large" className={classes.gh}/>
                    </Link>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search Courses"

                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={search}
                        />
                    </div>
                    {
                        profile.pic ? <Link href="/user/me"><Avatar alt="CourseWiki" src={profile ? profile.pic : ""}
                                                                    className={classes.user}/></Link> :
                            <Button variant="outlined" href="/login" className={classes.login}>Log In</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}