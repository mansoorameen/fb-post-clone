import React from "react";

const MessageList = (props) => {
  return (
    <>
      {props.postData.length ? (
        props.postData.map((eachPost) => (
          <>
            <hr style={{ width: "30%" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {eachPost.message && (
                <span style={{ margin: "10px" }}>{eachPost.message}</span>
              )}
              {eachPost.gifUrl && (
                <img
                  src={eachPost.gifUrl}
                  style={{
                    height: "300px",
                    width: "300px",
                    margin: "10px",
                  }}
                />
              )}
            </div>
          </>
        ))
      ) : (
        <span>Your posts will be displayed here</span>
      )}
    </>
  );
};

export default MessageList;
