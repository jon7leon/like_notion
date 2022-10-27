import { Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from 'react-router-dom';
import authApi from "../api/authApi";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [usernameErrorText, setUsernameErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameErrorText('');
    setPasswordErrorText('');
    const item = new FormData(e.target as HTMLFormElement);

    const username = item.get('username')!.toString().trim();
    const password = item.get('password')!.toString().trim();
    let error = false;
    if (username === '') {
      error = true;
      setUsernameErrorText('名前を入力してください');
    }
    if (password === '') {
      error = true;
      setPasswordErrorText('パスワードを入力してください');
    }
    if (error) {
      return;
    }

    try {
      const res = await authApi.login({
        username,
        password
      });
      console.log(res)
      if (res.data.errors) {
        res.data.errors.map((item) => {
          if (item.param === 'username') {
            setUsernameErrorText(item.msg);
          }
          if (item.param === 'password') {
            setPasswordErrorText(item.msg);
          }
        })
        return;
      }
      const { user, token } = res.data;
      localStorage.setItem('token', token!);
      navigate('/');
    } catch (error: any) {
      console.log('error', error);
    }
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
          helperText={usernameErrorText}
          error={usernameErrorText !== ''}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
          helperText={passwordErrorText}
          error={passwordErrorText !== ''}
        />
        <LoadingButton sx={{mt: 3, mb: 2}} fullWidth type="submit" loading={false} color="primary" variant="outlined">アカウントを作成</LoadingButton>
      </Box>
      <Button component={Link} to="/login">アカウントの新規登録</Button>
    </>
  )
}

export default Login