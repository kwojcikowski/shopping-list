import React from "react";
import useIntersectionObserver from "./useIntersectionObserver";
import ProgressiveImage from "./ProgressiveImage";
import PropTypes from "prop-types";

const ProgressiveImageContainer = (props) => {
    const ref = React.useRef();
    const [isVisible, setIsVisible] = React.useState(false);

    const progressiveImageContainerStyle = {
        overflow: "hidden",
        margin: "auto"
    };

    useIntersectionObserver({
        target: ref,
        onIntersect: ([{isIntersecting}], observerElement) => {
            if (isIntersecting) {
                setIsVisible(true);
                observerElement.unobserve(ref.current);
            }
        },
    });

    const wrapperHeight = parseInt(props.containerHeight.replace("px", ""));
    const wrapperWidth = parseInt(props.containerWidth.replace("px", ""));

    const imageWidth = props.width ? props.width : wrapperWidth;
    const imageHeight = props.height ? props.height : wrapperHeight;

    const imageAspectRatio = props.width / props.height;
    const wrapperAspectRatio = wrapperWidth / wrapperHeight;

    const containerWidth = imageAspectRatio >= wrapperAspectRatio
        ? wrapperWidth
        : (wrapperHeight / imageHeight) * imageWidth

    const containerHeight = imageAspectRatio < wrapperAspectRatio
        ? wrapperHeight
        : (wrapperWidth / imageWidth) * imageHeight

    progressiveImageContainerStyle.width = containerWidth;
    progressiveImageContainerStyle.height = containerHeight;

    return (
        <div ref={ref} style={progressiveImageContainerStyle}>
            {isVisible && (
                <ProgressiveImage
                    className="image"
                    src={props.src}
                    width={props.width}
                    height={props.height}
                    thumb={props.thumb}
                    containerWidth={containerWidth}
                    containerHeight={containerHeight}
                />
            )}
        </div>
    );
};

ProgressiveImageContainer.propTypes = {
    containerWidth: PropTypes.string.isRequired,
    containerHeight: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired
}

export default ProgressiveImageContainer;
