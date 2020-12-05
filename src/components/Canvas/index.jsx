import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import CanvasContext from "context/canvas.context";
import useWindowSize from "hooks/useWindowSize";

const Canvas = (props) => {
  const { isDrawing, strokeStyle, lineWidth, scale, setIsDrawing } = props;
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const size = useWindowSize();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = size[0] * 2;
    canvas.height = size[1] * 2;
    canvas.style.width = `${size[0]}px`;
    canvas.style.height = `${size[1]}px`;

    const context = canvas.getContext("2d");
    context.scale(scale, scale);
    context.lineCap = "round";
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    contextRef.current = context;
  }, [strokeStyle, lineWidth, scale, size]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <CanvasContext.Provider value={contextRef.current}>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </CanvasContext.Provider>
  );
};

Canvas.propTypes = {
  isDrawing: PropTypes.bool.isRequired,
  strokeStyle: PropTypes.string.isRequired,
  lineWidth: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  setIsDrawing: PropTypes.func.isRequired,
};

export default Canvas;
