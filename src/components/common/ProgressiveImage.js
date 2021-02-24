import React from "react";
import "./ProgressiveImage.css";
const ProgressiveImage = (props) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const containerHeight = props.containerHeight.replace("px", "");
  const containerWidth = props.containerWidth.replace("px", "");

  const aspectRatio = props.width / props.height;
  const paddingTop =
    aspectRatio > 1
      ? containerHeight / 2 - containerHeight / (2 * aspectRatio)
      : 0;
  const paddingLeft =
    aspectRatio > 1
      ? 0
      : containerWidth / 2 - containerWidth / 2 / (props.height / props.width);

  return (
    <React.Fragment>
      <img
        width={containerWidth}
        height={containerHeight}
        className="image thumb"
        src={props.thumb}
        style={{ visibility: isLoaded ? "hidden" : "visible" }}
      />
      <img
        onLoad={() => {
          setIsLoaded(true);
        }}
        className="image full"
        style={{
          opacity: isLoaded ? 1 : 0,
          left: paddingLeft + "px",
          top: paddingTop + "px",
          width: aspectRatio > 1 ? "100%" : "auto",
          height: aspectRatio > 1 ? "auto" : "100%",
        }}
        src={props.src}
      />
    </React.Fragment>
  );
};
export default ProgressiveImage;
