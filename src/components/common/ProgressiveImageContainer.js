import React from "react";
import useIntersectionObserver from "./useIntersectionObserver";
import ProgressiveImage from "./ProgressiveImage";

const ProgressiveImageContainer = (props) => {
  const ref = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);

  const progressiveImageContainerStyle = {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "100%",
  };

  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        setIsVisible(true);
        observerElement.unobserve(ref.current);
      }
    },
  });

  return (
    <div ref={ref} style={progressiveImageContainerStyle}>
      {isVisible && (
        <ProgressiveImage
          className="image"
          src={props.src}
          width={props.width}
          height={props.height}
          thumb={props.thumb}
          containerWidth={props.containerWidth}
          containerHeight={props.containerHeight}
        />
      )}
    </div>
  );
};
export default ProgressiveImageContainer;
