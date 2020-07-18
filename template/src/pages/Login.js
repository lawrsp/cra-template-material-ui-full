import React from 'react';
import {
  Avatar,
  Checkbox,
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import Copyright from 'layouts/Copyright';
import LoadButton from 'components/LoadButton/LoadButton';
import { accountLogin } from 'api/account';
import { loginSucceed } from 'reducers/account';

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

const LoginIn = () => {
  const classes = useStyles();
  const [inLogin, setInLogin] = React.useState();
  const { register, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (values) => {
    console.log('login values:', values);
    setInLogin(!inLogin);
    try {
      const result = await accountLogin(values);
      enqueueSnackbar('登录成功', { variant: 'success' });
      loginSucceed(result);
    } catch (err) {
      enqueueSnackbar(`登录失败:${err.message}`, {
        variant: 'error',
      });
    } finally {
      setInLogin(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          登录
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(handleLogin)}>
          <TextField
            inputRef={register({ required: true })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="用户名"
            name="username"
            autoFocus
            autoComplete="username"
          />
          <TextField
            inputRef={register({ required: true })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="密码"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <input type="hidden" ref={register} name="type" value="username" />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="记住我"
          />
          <LoadButton
            loading={inLogin}
            loadingPosition="end"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            登录
          </LoadButton>
          {/* <Grid container> */}
          {/*   <Grid item xs> */}
          {/*     <Link href="#" variant="body2"> */}
          {/*       忘记密码? */}
          {/*     </Link> */}
          {/*   </Grid> */}
          {/*   <Grid item> */}
          {/*     <Link href="#" variant="body2"> */}
          {/*       {'需要创建账户? 联系客服'} */}
          {/*     </Link> */}
          {/*   </Grid> */}
          {/* </Grid> */}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default LoginIn;
