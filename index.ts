const draw = document.getElementById('draw') as HTMLCanvasElement;
const ctx = draw.getContext('2d') as CanvasRenderingContext2D;

const dot1 = document.getElementById('dot1') as HTMLDivElement;
const dot2 = document.getElementById('dot2') as HTMLDivElement;
const dot3 = document.getElementById('dot3') as HTMLDivElement;
const dot4 = document.getElementById('dot4') as HTMLDivElement;

// 캔버스 사이즈 코드 =====================================================================================================
ctx.canvas.width  = window.innerWidth-20;
ctx.canvas.height = window.innerHeight-20;
window.onresize = (e:UIEvent) => {
    ctx.canvas.width  = window.innerWidth-20;
    ctx.canvas.height = window.innerHeight-20;
}

// 타입 선언 =============================================================================================================
interface dot{
    x: number,
    y: number,
}

// 베지어 곡선의 식 =======================================================================================================
const cubicBezierExp = (t:number, n1:number, n2:number, n3:number, n4:number) => (
    (Math.pow(1-t,3) * n1)
    + (3* Math.pow(1-t,2) * t * n2)
    + (3 * (1-t) * Math.pow(t, 2) * n3)
    + (Math.pow(t, 3) * n4)
);

// 베지어 곡선을 계산해서 반환하는 함수 ======================================================================================
function cubicBezier(t:number, P0:dot, P1:dot, P2:dot, P3:dot){
    const x = cubicBezierExp(t, P0.x, P1.x, P2.x, P3.x);
    const y = cubicBezierExp(t, P0.y, P1.y, P2.y, P3.y);
    console.log(`${t} : ${x}, ${y}`);
    return {x, y};
}

// 베지어 곡선를 그리는 함수 ===============================================================================================
function DrawCBezier(P0:dot, P1:dot, P2:dot, P3:dot) {
    for (let i = 0; i <= 1000; i++) {
        const {x, y} = cubicBezier(i / 1000, P0, P1, P2, P3);
        ctx.fillRect(x, y, 1, 1);
    }
}

// 사용한 코드 ===========================================================================================================

const P0: dot = {x:0, y:0};
const P1: dot = {x:300, y:0};
const P2: dot = {x:300, y:600};
const P3: dot = {x:600, y:600};

DrawCBezier(P0, P1, P2, P3);
