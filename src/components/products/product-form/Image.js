import React from "react";
import "./Image.css";
const Image = (props) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const aspectRatio = props.width / props.height;
  const paddingTop = aspectRatio > 1 ? 75 - 75 / aspectRatio : 0;
  const paddingLeft =
    aspectRatio > 1 ? 0 : 75 - 75 / (props.height / props.width);

  return (
    <React.Fragment>
      <img
        onLoad={() => {
          setIsLoaded(true);
        }}
        className="image full"
        style={{
          opacity: isLoaded ? 1 : 0,
          left: (paddingLeft ? paddingLeft : 0) + "px",
          top: (paddingTop ? paddingTop : 0) + "px",
          width: aspectRatio > 1 ? "100%" : "auto",
          height: aspectRatio > 1 ? "auto" : "100%",
        }}
        src={props.src}
      />
    </React.Fragment>
  );
};
export default Image;
