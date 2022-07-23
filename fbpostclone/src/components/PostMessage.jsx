import React, { useState } from "react";
import { Input, Button, Dialog, Popper, CircularProgress } from "@mui/material";
import GifBoxIcon from "@mui/icons-material/GifBox";

const PostMessage = (props) => {
  const [gifList, setGifList] = useState([]);
  const [selectedGif, setSelectedGif] = useState("");
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(false);
  const [gitButtonColor, setGifButtonColor] = useState("grey");

  // gif popup box state
  const [anchorEl, setAnchorEl] = useState(null);
  let openGifPop = Boolean(anchorEl);

  // on Post button click
  const postMessageHandler = () => {
    props.setOpenDialog(false);
    // creating a new array which has the postData and adds the new data
    // postData is an array of objects which holds the message and gif data
    let newarr = props.postData;
    newarr.push({ message: message, gifUrl: selectedGif });
    props.setPostData(newarr);
    setMessage("");
    setSelectedGif("");
    setGifButtonColor("grey");
  };

  // giphy api key stored in .env file
  const apiKey = process.env.REACT_APP_GIPHY_KEY;

  // fetching gif
  const fetchGif = async (search) => {
    // in progress circle
    setProgress(true);
    let url;

    if (search) {
      // if search query is done
      url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=25&offset=0&rating=g&lang=en`;
    } else {
      // else load this by default
      url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25`;
    }
    try {
      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setGifList(data.data);
          setProgress(false);
        });
    } catch (error) {
      setProgress(false);
      console.log(error);
    }
  };

  // reading the gif search value after the user stops typing for one second gap using setTimeout
  // rather than fetching the gif on every input character, avoiding multiple unnecessary api calls
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
      {/* model for new post view */}
      <Dialog
        open={props.openDialog}
        onClose={() => {
          props.setOpenDialog(false);
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disableUnderline
            autoFocus
            style={{ margin: "20px" }}
            placeholder="Type something here..."
          />
          <Button
            // coloring to show whether gif is selected
            style={{ alignSelf: "flex-start", color: `${gitButtonColor}` }}
            onClick={(event) => {
              // opens gif popup box
              setAnchorEl(anchorEl ? null : event.currentTarget);
              // fetching gifs on click
              fetchGif();
            }}
          >
            <GifBoxIcon /> GIF
          </Button>

          {/* enabling Post button only if either a message or gif is selected */}
          {message || selectedGif ? (
            <Button
              style={{
                alignSelf: "flex-end",
                backgroundColor: "blue",
                color: "white",
                padding: "10px",
                cursor: "pointer",
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
              disabled
            >
              Post
            </Button>
          )}
        </div>
      </Dialog>

      {/* gif popup box */}
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
                padding: "5px",
              }}
              onKeyUp={handleKeyUp}
              disableUnderline
              autoFocus
            />
          </div>

          {/* if gif api is running show loading circle */}
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
                key={eachGif.id}
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
            // if api fails or gif list is empty
            <span>Couldn't load gifs..</span>
          )}
        </div>
      </Popper>
    </>
  );
};

export default PostMessage;
