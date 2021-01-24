import React, { useState, useEffect } from "react";

import { Typography, Button, Paper, Avatar } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import firebase from "../Firebase";

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: ` ${theme.spacing.unit * 2}px   ${theme.spacing.unit * 3}px   ${
      theme.spacing.unit * 2
    }px `,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit * 1,
  },
});

function Dashboard(props) {
  const { classes } = props;
  const [userInfo, setUserInfo] = useState();
  const [question, setQuestion] = useState();

  useEffect(() => {
    setInfo();
  }, []);

  const setInfo = async () => {
    await setUserInfo(firebase.getUserInfo());

    if (!firebase.getUserInfo()) {
      alert("Please Login");
      return null;
    }
    const userQuestion = await firebase
      .getQuestion()
      .then((response) => {
        setQuestion(response);
      })
      .catch((res) => {
        props.history.replace("/login");
      });
  };

  const onLogOut = async () => {
    try {
      await firebase.logOut();
      props.history.replace("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Name : {userInfo}
        </Typography>
        <Typography component="h1" variant="h5">
          Question : {question}
        </Typography>
        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={onLogOut}
        >
          LogOut
        </Button>
      </Paper>
    </main>
  );
}

export default withRouter(withStyles(styles)(Dashboard));
