import React from "react";

// main component that loads first
const Main = (props) => {
  return (
    <>
      <div
        style={{
          margin: "40px",
        }}
      >
        <span
          onClick={() => {
            props.setOpenDialog(true);
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
    </>
  );
};

export default Main;
