import React from "react";
import "./ProgressiveImage.css";
import PropTypes from "prop-types";

const ProgressiveImage = (props) => {
    const [isLoaded, setIsLoaded] = React.useState(false);

    const containerHeight = props.containerHeight;
    const containerWidth = props.containerWidth;

    return (
        <React.Fragment>
            <img
                width={containerWidth}
                height={containerHeight}
                className="image thumb"
                src={props.thumb}
                style={{visibility: isLoaded ? "hidden" : "visible"}}
                alt=""/>
            <img
                onLoad={() => {
                    setIsLoaded(true);
                }}
                className="image full"
                style={{
                    opacity: isLoaded ? 1 : 0,
                    width: containerWidth,
                    height: containerHeight,
                }}
                src={props.src}
                alt=""/>
        </React.Fragment>
    );
};

ProgressiveImage.propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired
}

export default ProgressiveImage;
