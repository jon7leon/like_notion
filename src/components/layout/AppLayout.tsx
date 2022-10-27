import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { authUtils } from "../../utils/authUtils";
import Sidebar from "../common/Sidebar";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    (async() => {
      const user = await authUtils.isAuthenticated();
      console.log(`user ${__dirname}`, user);
      if (user) {
        dispatch(setUser(user));
        console.log('ログインOK!!!!');
      } else {
        navigate('/login');
      }

    })();
  }, [navigate]);

  return (
    <div>
      <Box sx={{
        // marginTop: 6,
        display: 'flex',
        // alignItems: 'center',
        // flexDirection: 'column'
      }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  )
}

export default AppLayout