import React, { useEffect, createRef, useState } from "react";
import "./Canvas.css";
function Canvas() {
    let canvas; //캔버스
    let canvasRef = createRef(); //캔버스의 DOM값을 가져옴

    const blackButton = createRef();
    const redButton = createRef();
    const blueButton = createRef();

    let pos = {
        //사용될 좌표값
        drawable: false,
        x: -1,
        y: -1,
    };
    const [strokeColor, setStrokeColor] = useState(null);

    let ctx; //컨텍스트
    useEffect(() => {
        canvas = canvasRef.current;
        ctx = canvas.getContext("2d");
        canvas.addEventListener("mousedown", initDraw);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", finishDraw);
        canvas.addEventListener("mouseout", finishDraw);
        //각각 캔버스 이벤트에 대한 함수를 지정
    }, []);

    function getPos(e) {
        //커서의 좌표값을 얻는 함수
        return {
            x: e.offsetX,
            y: e.offsetY,
        };
    }

    function changeStrokeColor(e) {
        ctx.strokeStyle = e.target.value;
        console.log("changed color", e.target.value);
    }

    function initDraw(e) {
        ctx.beginPath(); //시작점
        pos = { drawable: true, ...getPos(e) };
        ctx.moveTo(pos.x, pos.y);
    }

    function draw(e) {
        if (pos.drawable) {
            pos = {
                ...pos,
                ...getPos(e),
            };
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        }
    }
    function finishDraw() {
        pos = {
            drawable: false,
            x: -1,
            y: -1,
        };
    }

    return (
        <>
            <canvas
                ref={canvasRef}
                width="1200"
                height="800"
                className="canvas"
            ></canvas>
            <button onClick={changeStrokeColor} value="black">
                검은색
            </button>
            <button onClick={changeStrokeColor} value="red">
                빨간색
            </button>
            <button onClick={changeStrokeColor} value="blue">
                파란색
            </button>
        </>
    );
}

export default Canvas;
