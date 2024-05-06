import React from "react";

const Avatar = ({ name, src, backgroundColor }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: backgroundColor || "#ccc",
         marginRight: "15px",
         marginLeft:"10px" ,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          style={{ width: "100%", height: "100%", borderRadius: "50%" }}
        />
      ) : (
        <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff" }}>
          {name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default Avatar;
