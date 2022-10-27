import { Outlet, useNavigate } from "react-router-dom";
import { Container } from '@mui/system';
import { Box } from "@mui/material";
import notionLogo from '../../assets/images/notion-logo.png';
import { useEffect } from "react";
import { authUtils } from "../../utils/authUtils";
const AuthLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async() => {
      const isAuth = await authUtils.isAuthenticated();
      console.log(isAuth);
      if (isAuth) {
        navigate('/');
        console.log('ログインOK!!!!');
      } else {
        navigate('/login');
      }

    })();
  }, [navigate]);

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box sx={{
          marginTop: 6,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <img src={notionLogo} alt="notion-logo" style={{
            width: 100,
            height: 100,
            marginBottom: 3
          }} />
          Notion クローン
          </Box>
        <Outlet />
      </Container>
    </div>
  )
}

export default AuthLayout