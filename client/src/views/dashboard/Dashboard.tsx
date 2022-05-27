import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

export const Dashboard: React.FC<{}> = ({}) => {
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [newAnnotation, setNewAnnotation] = useState<any[]>([]);

  const handleMouseDown = (event: any) => {
    if (newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
    }
  };

  const handleMouseUp = (event: any) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: annotations.length + 1,
      };
      annotations.push(annotationToAdd);
      setNewAnnotation([]);
      setAnnotations(annotations);
    }
  };

  const handleMouseMove = (event: any) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: "0",
        },
      ]);
    }
  };

  const annotationsToDraw = [...annotations, ...newAnnotation];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: "red",
        flexDirection: "column"
      }}
    >
      <div>
      <Stage
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        width={640}
        height={640}
        style={{
          backgroundImage: `url(https://storage.googleapis.com/artifacts.logiq-health-333910.appspot.com/test/1ffa92ba-8d87-11e8-9daf-6045cb817f5b..JPG)`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <Layer>
          {annotationsToDraw.map((value) => (
            <Rect
              x={value.x}
              y={value.y}
              width={value.width}
              height={value.height}
              fill="rgba(255,255,255,0.1)"
              strokeWidth={2}
              draggable
              stroke="black"
            />
          ))}
        </Layer>
      </Stage>
      </div>
      <div>
      {annotationsToDraw.map((value, index) => (
        <p
          onClick={() =>
            setAnnotations(
              annotations.filter((item, index2) => index2 !== index)
            )
          }
        >
          {JSON.stringify(value)}
        </p>
      ))}
      </div>
      
      
    </div>
  );
};

export default Dashboard;
