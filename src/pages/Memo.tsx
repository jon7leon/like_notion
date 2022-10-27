import { DeleteOutline, StarBorderOutlined } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import memoApi from "../api/memoApi";
import { setMemo } from "../redux/features/memoSlice";
import { RootState } from "../redux/store";

const Memo = () => {
  const navigate = useNavigate();
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const memos = useSelector((state: RootState) => state.memo.value);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      try {
        const res = await memoApi.getOne(memoId!);
        setTitle(res.data.title!);
        setDescription(res.data.description!);
        setIcon(res.data.icon!);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [memoId]);

  let timer: NodeJS.Timeout | undefined;
  const timeout = 500;

  const titleHandler = async(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    clearTimeout(timer);
    e.preventDefault();
    const newTitle = e.target.value;
    setTitle(newTitle);

    timer = setTimeout(async() => {
      try {
        await memoApi.update(memoId!, {title: newTitle});
      } catch (error) {
        console.log(error);
      }
    }, timeout);
  }
  const descriptionHandler = async(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    e.preventDefault();
    setDescription(newDescription);
    timer = setTimeout(async() => {
      try {
        await memoApi.update(memoId!, {description: newDescription});
      } catch (error) {
        console.log(error);
      }
    }, timeout);
  }

  const deleteHandler = async() => {
    try {
      const deletedMemo = await memoApi.deleteOne(memoId!);
      const newMemos = memos.filter((memo) => memo._id !== memoId!);

      console.log(deletedMemo);
      dispatch(setMemo(newMemos));

      if (newMemos.length > 0) {
        navigate(`/memo/${newMemos[0]._id}`);
      } else {
        navigate(`/memo`);
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Box sx={{
        width: "100%",
        display: "flex",
        alignItems: 'center'
      }}>
        <IconButton>
          <StarBorderOutlined />
        </IconButton>
        <IconButton color="error" onClick={() => deleteHandler()}>
          <DeleteOutline />
        </IconButton>
      </Box>
      <Box sx={{padding: "10px 50px"}}>
        <Box sx={{}}>
          <TextField
            onChange={(e) => titleHandler(e)}
            value={title}
            placeholder="無題"
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": {padding: 0},
              ".MuiOutlinedInput-notchedOutline": {border: "none"},
              ".MuiOutlinedInput-root": {fontSize: "2rem", fontWeight: "700"}
            }}
          />
          <TextField
            onChange={(e) => descriptionHandler(e)}
            value={description}
            placeholder="追加"
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": {padding: 0},
              ".MuiOutlinedInput-notchedOutline": {border: "none"},
              ".MuiOutlinedInput-root": {fontSize: "1rem"}
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export default Memo