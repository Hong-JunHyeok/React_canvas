import React from "react";
import { Stage, Layer, Line, Text } from "react-konva";

function Konva() {
    const [tool, setTool] = React.useState("pen");
    const [lines, setLines] = React.useState([]);
    const isDrawing = React.useRef(false); //그림 그릴수 있는 상태일때를 판단하기 위함

    const handleMouseDown = (e) => {
        isDrawing.current = true; //마우스 눌림이 감지되었을때 true로 설정
        const pos = e.target.getStage().getPointerPosition(); //마우스 포인터의 위치를 설정
        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e) => {
        // no drawing - skipping
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    return (
        <div>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
            >
                <Layer>
                    <Text text="Just start drawing" x={5} y={30} />
                    {lines.map((line, i) => (
                        <Line
                            key={i}
                            points={line.points}
                            stroke="black"
                            strokeWidth={5}
                            tension={0.5}
                            lineCap="round"
                            globalCompositeOperation={
                                line.tool === "eraser"
                                    ? "destination-out"
                                    : "source-over"
                            }
                        />
                    ))}
                </Layer>
            </Stage>
            <select
                value={tool}
                onChange={(e) => {
                    setTool(e.target.value);
                }}
            >
                <option value="pen">Pen</option>
                <option value="eraser">Eraser</option>
            </select>
        </div>
    );
}

export default Konva;
