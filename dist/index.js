"use strict";
var draw = document.getElementById('draw');
var ctx = draw.getContext('2d');
var save = document.getElementById('save');
var saveCtx = save.getContext('2d');
var drawBtn = document.querySelector('button#drawBtn');
var dot0 = document.getElementById('dot1');
var dot1 = document.getElementById('dot2');
var dot2 = document.getElementById('dot3');
var dot3 = document.getElementById('dot4');
// 캔버스 사이즈 코드 =======================================================================================================
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
saveCtx.canvas.width = window.innerWidth;
saveCtx.canvas.height = window.innerHeight;
window.onresize = function (e) {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    saveCtx.canvas.width = window.innerWidth;
    saveCtx.canvas.height = window.innerHeight;
};
// 베지어 곡선의 식 ========================================================================================================
var cubicBezierExp = function (t, n1, n2, n3, n4) { return ((Math.pow(1 - t, 3) * n1)
    + (3 * Math.pow(1 - t, 2) * t * n2)
    + (3 * (1 - t) * Math.pow(t, 2) * n3)
    + (Math.pow(t, 3) * n4)); };
// 베지어 곡선을 계산해서 반환하는 함수 ==========================================================================================
function cubicBezier(t, P0, P1, P2, P3) {
    var x = cubicBezierExp(t, P0.x, P1.x, P2.x, P3.x);
    var y = cubicBezierExp(t, P0.y, P1.y, P2.y, P3.y);
    return { x: x, y: y };
}
// 베지어 곡선를 그리는 함수 ==================================================================================================
function DrawCBezier(P0, P1, P2, P3) {
    ctx.beginPath();
    ctx.strokeStyle = '#2383bf';
    ctx.moveTo(P0.x, P0.y);
    ctx.lineTo(P1.x, P1.y);
    ctx.stroke();
    ctx.moveTo(P2.x, P2.y);
    ctx.lineTo(P3.x, P3.y);
    ctx.stroke();
    for (var i = 0; i <= 50; i++) {
        var _a = cubicBezier(i / 50, P0, P1, P2, P3), x = _a.x, y = _a.y;
        ctx.fillRect(x, y, 3, 3);
    }
}
// 점을 옮기는 코드 ========================================================================================================
function mvDot(dot, Point) {
    dot.style.left = Point.x - 5 + "px";
    dot.style.top = Point.y - 5 + "px";
}
;
// event adder =========================================================================================================
function eventAdder(dot, Point) {
    dot.addEventListener('drag', function (event) {
        Point.x = event.clientX;
        Point.y = event.clientY;
        ctx.clearRect(0, 0, draw.width, draw.height);
        DrawCBezier(P0, P1, P2, P3);
        console.log(Point);
        mvDot(dot, Point);
    });
    dot.addEventListener('dragover', function (event) {
        event.preventDefault();
    });
    console.log('added');
}
// 사용한 코드 ============================================================================================================
var P0 = { x: 10, y: 10, };
var P1 = { x: 310, y: 10, };
var P2 = { x: 310, y: 610, };
var P3 = { x: 610, y: 610, };
mvDot(dot0, P0);
mvDot(dot1, P1);
mvDot(dot2, P2);
mvDot(dot3, P3);
eventAdder(dot0, P0);
eventAdder(dot1, P1);
eventAdder(dot2, P2);
eventAdder(dot3, P3);
// 그리기 버튼
drawBtn.addEventListener('click', function () {
    for (var i = 0; i <= 1000; i++) {
        var _a = cubicBezier(i / 1000, P0, P1, P2, P3), x = _a.x, y = _a.y;
        saveCtx.fillRect(x, y, 1, 1);
    }
});
DrawCBezier(P0, P1, P2, P3);
