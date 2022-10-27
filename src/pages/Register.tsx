import { Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from 'react-router-dom';
import authApi from "../api/authApi";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [usernameErrorText, setUsernameErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameErrorText('');
    setPasswordErrorText('');
    setConfirmPasswordErrorText('');
    const item = new FormData(e.target as HTMLFormElement);

    const username = item.get('username')!.toString().trim();
    const password = item.get('password')!.toString().trim();
    const confirmPassword = item.get('confirmPassword')!.toString().trim();
    let error = false;
    if (username === '') {
      error = true;
      setUsernameErrorText('名前を入力してください');
    }
    if (password === '') {
      error = true;
      setPasswordErrorText('パスワードを入力してください');
    }
    if (confirmPassword === '') {
      error = true;
      setConfirmPasswordErrorText('確認用パスワードを入力してください');
    }
    if (password !== confirmPassword) {
      error = true;
      setConfirmPasswordErrorText('パスワードと確認用パスワードが異なります');
    }
    if (error) {
      return;
    }

    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword
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
          if (item.param === 'confirmPassword') {
            setConfirmPasswordErrorText(item.msg);
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
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          type="password"
          required
          helperText={confirmPasswordErrorText}
          error={confirmPasswordErrorText !== ''}
        />
        <LoadingButton sx={{mt: 3, mb: 2}} fullWidth type="submit" loading={false} color="primary" variant="outlined">アカウントを作成</LoadingButton>
      </Box>
      <Button component={Link} to="/login">すでにアカウントを持っていますか？</Button>
    </>
  )
}

export default Register