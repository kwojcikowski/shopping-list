import React from "react";
import "./ImageContainer.css";
import useIntersectionObserver from "../../common/useIntersectionObserver";
import Image from "./Image";

const ImageContainer = (props) => {
  const ref = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);

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
    <div ref={ref} className="imageContainer">
      {isVisible && (
        <Image
          className="image"
          src={props.src}
          width={props.width}
          height={props.height}
        />
      )}
    </div>
  );
};
export default ImageContainer;
