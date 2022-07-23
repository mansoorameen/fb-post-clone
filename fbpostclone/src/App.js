import "./App.css";
import Main from "./components/Main";
import PostMessage from "./components/PostMessage";
import MessageList from "./components/MessageList";
import { useState } from "react";

function App() {
  const [postData, setPostData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="App">
      <Main setOpenDialog={setOpenDialog} />
      <PostMessage
        setPostData={setPostData}
        postData={postData}
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
      />
      <MessageList postData={postData} />
    </div>
  );
}

export default App;
