import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import memoApi from "../api/memoApi";
import { setMemo } from "../redux/features/memoSlice";
import { RootState } from "../redux/store";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const memos = useSelector((state: RootState) => state.memo.value);
  const navigate = useNavigate();
  const createMemo = async() => {
    try {
      setLoading(true);
      const memo = await memoApi.create();
      const newMemos = [memo.data, ...memos];
      dispatch(setMemo(newMemos));
      navigate(`/memo/${memo.data._id}`);

    } catch (error) {
      alert(error)
    } finally {
      setLoading(false);
    }
  }
  return (
    <Box sx={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <LoadingButton variant="outlined" onClick={() => createMemo()} loading={loading}>最初のメモを作成</LoadingButton>
    </Box>
  )
}

export default Home