import "./App.css";
import PostMessage from "./components/PostMessage";
import MessageList from "./components/MessageList";
import { useState } from "react";

function App() {
  const [postData, setPostData] = useState([]);
  const [refresh, setRefresh] = useState(1);

  return (
    <div className="App">
      <PostMessage
        setPostData={setPostData}
        postData={postData}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <MessageList postData={postData} />
    </div>
  );
}

export default App;
