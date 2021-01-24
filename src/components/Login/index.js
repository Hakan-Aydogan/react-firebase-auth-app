import React, { useState } from "react";

import {
  Typography,
  Button,
  Paper,
  Avatar,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import LockOutlined from "@material-ui/icons/LockOutlined";
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

function Login(props) {
  const { classes } = props;

  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");

  const onLogin = async () => {
    try {
      await firebase.login(mail, password);
      props.history.replace("/dashboard");
    } catch (error) {
      console.log("login");
      alert(error.message);
    }
  };

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="mail">E-Mail</InputLabel>
            <Input
              id="mail"
              name="mail"
              autoComplete="off"
              autoFocus
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            ></Input>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              name="password"
              autoComplete="off"
              autoFocus
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </FormControl>
        </form>
        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={onLogin}
        >
          Login
        </Button>
        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          variant="outlined"
          color="secondary"
          component={Link}
          to="/register"
        >
          Register
        </Button>
      </Paper>
    </main>
  );
}

export default withRouter(withStyles(styles)(Login));
