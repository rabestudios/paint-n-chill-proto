import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import CanvasContext from "context/canvas.context";
import useWindowSize from "hooks/useWindowSize";
import useSocket from "hooks/useSocket";
import { v4 as uuidv4 } from "uuid";

const Canvas = (props) => {
  const {
    isDrawing,
    strokeStyle,
    lineWidth,
    scale,
    setIsDrawing,
    // drawStack,
    // pushToDrawStack,
    room,
  } = props;
  const [curPath, setCurPath] = useState([]);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const size = useWindowSize();
  const socket = useSocket();

  const renderDrawStack = useCallback(
    (context) => {
      for (const item of room.drawStack) {
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
    [room.drawStack],
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
  }, [strokeStyle, lineWidth, scale, size, renderDrawStack]);

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
    const event = {
      id: uuidv4(),
      path: curPath,
      strokeStyle,
      lineWidth,
    };
    // pushToDrawStack(event);
    if (socket) {
      socket.emit("draw", { roomCode: room.code, event });
    }
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
  // pushToDrawStack: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired,
};

export default Canvas;
