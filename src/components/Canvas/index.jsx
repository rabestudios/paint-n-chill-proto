import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import CanvasContext from "context/canvas.context";
import useWindowSize from "hooks/useWindowSize";

const Canvas = (props) => {
  const {
    isDrawing,
    strokeStyle,
    lineWidth,
    scale,
    setIsDrawing,
    drawStack,
    pushToDrawStack,
  } = props;
  const [curPath, setCurPath] = useState([]);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const size = useWindowSize();

  const renderDrawStack = useCallback(
    (context) => {
      for (const item of drawStack) {
        context.strokeStyle = item.strokeStyle;
        context.lineWidth = item.lineWidth;
        context.beginPath();
        const initCoord = item.path[0];
        context.moveTo(initCoord.x, initCoord.y);
        for (let i = 1; i < item.path.length; i++) {
          const coord = item.path[i];
          context.lineTo(coord.x, coord.y);
          context.stroke();
        }
        context.closePath();
      }
    },
    [drawStack],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = size[0] * 2;
    canvas.height = size[1] * 2;
    canvas.style.width = `${size[0]}px`;
    canvas.style.height = `${size[1]}px`;

    const context = canvas.getContext("2d");
    context.scale(scale, scale);
    context.lineCap = "round";
    renderDrawStack(context);
    contextRef.current = context;
  }, [strokeStyle, lineWidth, scale, size]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.strokeStyle = strokeStyle;
    contextRef.current.lineWidth = lineWidth;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setCurPath([{ x: offsetX, y: offsetY }]);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    pushToDrawStack({
      path: curPath,
      strokeStyle,
      lineWidth,
    });
    setCurPath([]);
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    const prevPath = curPath[curPath.length - 1];
    if (!prevPath) {
      return;
    }
    if (prevPath.x === offsetX && prevPath.y === offsetY) {
      return;
    }
    // draw and record
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setCurPath([...curPath, { x: offsetX, y: offsetY }]);
  };

  return (
    <CanvasContext.Provider value={contextRef.current}>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onBlur={finishDrawing}
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
  drawStack: PropTypes.array.isRequired,
  pushToDrawStack: PropTypes.func.isRequired,
};

export default Canvas;
