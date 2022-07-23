import React, { useState } from "react";
import { Input, Button, Dialog, Popper, CircularProgress } from "@mui/material";
import GifBoxIcon from "@mui/icons-material/GifBox";

const PostMessage = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [gifList, setGifList] = useState([]);
  const [selectedGif, setSelectedGif] = useState("");
  const [inputText, setInputText] = useState("");
  const [progress, setProgress] = useState(false);
  const [gitButtonColor, setGifButtonColor] = useState("grey");

  const [anchorEl, setAnchorEl] = useState(null);
  let openGifPop = Boolean(anchorEl);

  const postMessageHandler = () => {
    setOpenDialog(false);
    let newarr = props.postData;
    newarr.push({ message: inputText, gifUrl: selectedGif });
    props.setPostData(newarr);
    props.setRefresh(props.refresh + 1);
    setInputText("");
    setSelectedGif("");
    setGifButtonColor("grey");
  };

  const apiKey = process.env.REACT_APP_GIPHY_KEY;

  const fetchGif = async (search) => {
    setProgress(true);
    let url;
    if (search) {
      url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=25&offset=0&rating=g&lang=en`;
    } else {
      url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25`;
    }
    try {
      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setGifList(data.data);
          setProgress(false);
          console.log("data", data.data);
        });
    } catch (error) {
      setProgress(false);
      console.log(error);
    }
  };

  let timer;
  const handleKeyUp = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (e.target.value) {
        setProgress(true);
        fetchGif(e.target.value);
      }
    }, 1000);
  };

  return (
    <>
      <div
        style={{
          margin: "40px",
        }}
      >
        <span
          onClick={() => {
            setOpenDialog(true);
          }}
          style={{
            cursor: "pointer",
            padding: "10px",
            background: "lightgrey",
            borderRadius: "50px",
          }}
        >
          What's on your mind ?
        </span>
      </div>

      <div>
        <Dialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
            setAnchorEl(null);
            openGifPop = Boolean(anchorEl);
          }}
          style={{ zIndex: 1 }}
          disableEnforceFocus
        >
          <div
            style={{
              width: "500px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disableUnderline
              autoFocus
              style={{ margin: "20px" }}
              placeholder="Type something here..."
            />
            <Button
              style={{ alignSelf: "flex-start", color: `${gitButtonColor}` }}
              onClick={(event) => {
                setAnchorEl(anchorEl ? null : event.currentTarget);
                fetchGif();
              }}
            >
              <GifBoxIcon /> GIF
            </Button>
            {inputText || selectedGif ? (
              <Button
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px",
                }}
                onClick={postMessageHandler}
              >
                Post
              </Button>
            ) : (
              <Button
                style={{
                  alignSelf: "flex-end",
                  backgroundColor: "grey",
                  color: "white",
                  padding: "10px",
                }}
              >
                Post
              </Button>
            )}
          </div>
        </Dialog>
        <Popper
          id={openGifPop ? "simple-popper" : undefined}
          open={openGifPop}
          anchorEl={anchorEl}
          style={{
            zIndex: 2,
          }}
          placement="bottom-start"
        >
          <div
            style={{
              height: "330px",
              width: "300px",
              overflowY: "auto",
              overflowX: "hidden",
              backgroundColor: "white",
            }}
          >
            <div style={{ padding: "5px" }}>
              <Input
                style={{
                  border: "1px solid lightgrey",
                  width: "100%",
                }}
                onKeyUp={handleKeyUp}
                disableUnderline
                autoFocus
              />
            </div>
            {progress ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress style={{ color: "grey" }} />
              </div>
            ) : gifList.length ? (
              gifList.map((eachGif) => (
                <img
                  src={eachGif.images.downsized.url}
                  style={{ height: "230px", width: "300px" }}
                  onClick={(e) => {
                    openGifPop = Boolean(anchorEl);
                    setSelectedGif(e.target.src);
                    setAnchorEl(null);
                    setGifButtonColor("blue");
                  }}
                />
              ))
            ) : (
              <span>Couldn't load gifs..</span>
            )}
          </div>
        </Popper>
      </div>
    </>
  );
};

export default PostMessage;
