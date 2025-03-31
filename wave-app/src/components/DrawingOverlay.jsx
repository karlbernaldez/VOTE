import React, { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Pencil, XCircle, Trash2 } from "lucide-react";

const DrawingOverlay = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = () => setIsDrawing(true);
  const stopDrawing = () => setIsDrawing(false);
  const clearDrawing = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
  };

  return (
    <div className="drawing-overlay">
      {isDrawing && (
        <ReactSketchCanvas
          ref={canvasRef}
          strokeWidth={3}
          strokeColor="red"
          canvasColor="transparent"
          width="100vw"
          height="100vh"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 10,
            pointerEvents: "auto",
          }}
        />
      )}
      <div className="controls">
        <button onClick={isDrawing ? stopDrawing : startDrawing} title={isDrawing ? "Stop Drawing" : "Start Drawing"}>
          {isDrawing ? <XCircle size={20} color="black" /> : <Pencil size={20} color="black" />}
        </button>
        <div className="separator"></div> {/* Separator Line */}
        <button onClick={clearDrawing} title="Clear All">
          <Trash2 size={20} color="black" />
        </button>
      </div>
    </div>
  );
};

export default DrawingOverlay;
