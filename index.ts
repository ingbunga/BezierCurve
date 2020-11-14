const draw = document.getElementById('draw') as HTMLCanvasElement;
const ctx = draw.getContext('2d') as CanvasRenderingContext2D;
const save = document.getElementById('save') as HTMLCanvasElement;
const saveCtx = save.getContext('2d') as CanvasRenderingContext2D;
const drawBtn = document.querySelector('button#drawBtn') as HTMLButtonElement;

const dot0 = document.getElementById('dot1') as HTMLDivElement;
const dot1 = document.getElementById('dot2') as HTMLDivElement;
const dot2 = document.getElementById('dot3') as HTMLDivElement;
const dot3 = document.getElementById('dot4') as HTMLDivElement;

// 캔버스 사이즈 코드 =======================================================================================================
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
saveCtx.canvas.width = window.innerWidth
saveCtx.canvas.height = window.innerHeight;
window.onresize = (e:UIEvent) => {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    saveCtx.canvas.width  = window.innerWidth;
    saveCtx.canvas.height = window.innerHeight;
}

// 타입 선언 =============================================================================================================
interface dot{
    x: number,
    y: number,
}

// 베지어 곡선의 식 ========================================================================================================
const cubicBezierExp = (t:number, n1:number, n2:number, n3:number, n4:number) => (
    (Math.pow(1-t,3) * n1)
    + (3* Math.pow(1-t,2) * t * n2)
    + (3 * (1-t) * Math.pow(t, 2) * n3)
    + (Math.pow(t, 3) * n4)
);

// 베지어 곡선을 계산해서 반환하는 함수 ==========================================================================================
function cubicBezier(t:number, P0:dot, P1:dot, P2:dot, P3:dot){
    const x = cubicBezierExp(t, P0.x, P1.x, P2.x, P3.x);
    const y = cubicBezierExp(t, P0.y, P1.y, P2.y, P3.y);
    return {x, y};
}

// 베지어 곡선를 그리는 함수 ==================================================================================================
function DrawCBezier(P0:dot, P1:dot, P2:dot, P3:dot) {
    ctx.beginPath();
    ctx.strokeStyle = '#2383bf'
    ctx.moveTo(P0.x, P0.y);
    ctx.lineTo(P1.x, P1.y);
    ctx.stroke();
    ctx.moveTo(P2.x, P2.y);
    ctx.lineTo(P3.x, P3.y);
    ctx.stroke();
    for (let i = 0; i <= 50; i++) {
        const {x, y} = cubicBezier(i / 50, P0, P1, P2, P3);
        ctx.fillRect(x, y, 3, 3);
    }
}

// 점을 옮기는 코드 ========================================================================================================
function mvDot(dot:HTMLDivElement, Point:dot){
    dot.style.left = `${Point.x - 5}px`;
    dot.style.top = `${Point.y - 5}px`;
};

// event adder =========================================================================================================
function eventAdder(dot:HTMLDivElement, Point:dot){
    dot.addEventListener('drag', (event) => {
        Point.x = event.clientX;
        Point.y = event.clientY;
        ctx.clearRect(0, 0, draw.width, draw.height);
        DrawCBezier(P0, P1, P2, P3);
        console.log(Point);
        mvDot(dot, Point);
    });
    dot.addEventListener('dragover', (event) => {
        event.preventDefault();
    })
    console.log('added');
}

// 사용한 코드 ============================================================================================================

let P0: dot = {x:10, y:10,};
let P1: dot = {x:310, y:10,};
let P2: dot = {x:310, y:610,};
let P3: dot = {x:610, y:610,};

mvDot(dot0, P0);
mvDot(dot1, P1);
mvDot(dot2, P2);
mvDot(dot3, P3);

eventAdder(dot0, P0);
eventAdder(dot1, P1);
eventAdder(dot2, P2);
eventAdder(dot3, P3);

// 그리기 버튼
drawBtn.addEventListener('click', () => {
    for (let i = 0; i <= 1000; i++) {
        const {x, y} = cubicBezier(i / 1000, P0, P1, P2, P3);
        saveCtx.fillRect(x, y, 1, 1);
    }
});

DrawCBezier(P0, P1, P2, P3);
