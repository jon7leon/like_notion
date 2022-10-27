import { Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import assets from '../../assets';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import memoApi from '../../api/memoApi';
import { setMemo } from '../../redux/features/memoSlice';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.value);
  const memos = useSelector((state: RootState) => state.memo.value);
  const { memoId } = useParams();
  const [ activeIndex, setActiveIndex ] = useState<null | number>(null);
  console.log('global管理memo', memos)

  useEffect(() => {
    (async() => {
      const getMemos = await memoApi.getAll();
      dispatch(setMemo(getMemos.data));
    })();
  }, []);

  // activeIndex
  useEffect(() => {
    const hilightIndex = memos.findIndex((memo) => memo._id === memoId);
    setActiveIndex(hilightIndex);
  }, [navigate, activeIndex, memos]);

  const addMemo = async() => {
    try {
      const res = await memoApi.create();
      const newMemos = [res.data, ...memos];
      dispatch(setMemo(newMemos));
      navigate(`memo/${res.data._id}`);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(activeIndex);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, []);
  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open
      sx={{width: 250, height: "100vh"}}
    >
      <List sx={{width: 250, height: "100vh", backgroundColor: assets.colors.secondary}}>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: 'center',
              justifyContent: "space-between"
            }}>
            <Typography variant="body2" fontWeight="700">{user!.username}</Typography>
            <IconButton onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </ListItemButton>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: 'center',
              justifyContent: "space-between"
            }}>
            <Typography variant="body2" fontWeight="700">お気に入り</Typography>
          </Box>
        </ListItemButton>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: 'center',
              justifyContent: "space-between"
            }}>
            <Typography variant="body2" fontWeight="700">プライベート</Typography>
            <IconButton onClick={() => addMemo()}>
              <AddIcon />
            </IconButton>
          </Box>
        </ListItemButton>
        {memos.map((memo, index) => (
          <ListItemButton
            key={memo._id}
            sx={{ pl: "20px" }}
            component={Link}
            to={`/memo/${memo._id}`}
            selected={index === activeIndex}
          >
            <Typography>{memo.icon} {memo.title}</Typography>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar