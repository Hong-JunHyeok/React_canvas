import React, { useEffect, createRef, useState } from "react";
import "./Canvas.css";
function Canvas() {
    let canvas; //캔버스
    let canvasRef = createRef(); //캔버스의 DOM값을 가져옴
    let currentColor;
    let pos = {
        //사용될 좌표값
        drawable: false,
        x: -1,
        y: -1,
    };

    let ctx; //컨텍스트
    useEffect(() => {
        canvas = canvasRef.current;
        ctx = canvas.getContext("2d");
        ctx.lineCap = "round"; //선의 끝을 둥글게 설정
        canvas.addEventListener("mousedown", initDraw);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", finishDraw);
        canvas.addEventListener("mouseout", draw);
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
        currentColor = e.target.value;
        console.log("changed color", e.target.value);
    }

    function changeStrokeSize(e) {
        ctx.lineWidth = e.target.value;
    }

    function fillCanvas(e) {
        ctx.fillStyle = currentColor;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
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
            <div>
                <button onClick={changeStrokeColor} value="black">
                    검은색
                </button>
                <button onClick={changeStrokeColor} value="red">
                    빨간색
                </button>
                <button onClick={changeStrokeColor} value="blue">
                    파란색
                </button>
            </div>
            <div>
                선 크기 :<input type="range" onChange={changeStrokeSize} />
            </div>
            <div>
                <button onClick={fillCanvas}>색 채우기</button>
            </div>
        </>
    );
}

export default Canvas;
