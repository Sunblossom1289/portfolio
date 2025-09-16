
document.getElementById("year").textContent = new Date().getFullYear();

(() => {
  const blob = document.getElementById("cursor-blob");
  let cx = innerWidth / 2, cy = innerHeight / 3, tx = cx, ty = cy;
  const loop = () => {
    cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
    blob.style.left = cx + "px"; blob.style.top = cy + "px";
    requestAnimationFrame(loop);
  };
  addEventListener("pointermove", e => { tx = e.clientX; ty = e.clientY; });
  loop();
})();

// Particles
(() => {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let dpr = Math.min(devicePixelRatio || 1, 2);
  function resize(){ dpr = Math.min(devicePixelRatio||1,2); canvas.width = innerWidth*dpr; canvas.height = innerHeight*dpr; }
  addEventListener("resize", resize); resize();
  const n = Math.min(120, Math.floor((innerWidth*innerHeight)/18000));
  const ps = Array.from({length:n}, () => ({
    x: Math.random()*canvas.width, y: Math.random()*canvas.height,
    vx: (Math.random()-.5)*0.25, vy:(Math.random()-.5)*0.25,
    r: 0.7+Math.random()*1.3, h: 190+Math.random()*100
  }));
  function step(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.globalCompositeOperation = "lighter";
    for(const p of ps){
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>canvas.width) p.vx*=-1;
      if(p.y<0||p.y>canvas.height) p.vy*=-1;
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.h},90%,60%,0.35)`;
      ctx.arc(p.x, p.y, p.r*dpr, 0, Math.PI*2);
      ctx.fill();
    }
    for(let i=0;i<ps.length;i++){
      for(let j=i+1;j<ps.length;j++){
        const a=ps[i], b=ps[j], dx=a.x-b.x, dy=a.y-b.y, d2=dx*dx+dy*dy, R=90*dpr;
        if(d2<R*R){
          const alpha = 0.05*(1 - d2/(R*R));
          ctx.strokeStyle = `rgba(124,58,237,${alpha})`; ctx.lineWidth = 0.6*dpr;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(step);
  }
  step();
})();

(() => {
  const els = document.querySelectorAll(".tilt");
  const max = 8;
  function set(el, x, y, r){
    const px = (x - r.left) / r.width, py = (y - r.top) / r.height;
    const rx = (py - .5) * -max, ry = (px - .5) * max;
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    const glow = el.querySelector(".card-glow");
    if(glow){ glow.style.setProperty("--mx", `${px*100}%`); glow.style.setProperty("--my", `${py*100}%`); }
  }
  function reset(el){ el.style.transform = "perspective(800px) rotateX(0) rotateY(0)"; }
  els.forEach(el=>{
    el.addEventListener("pointermove", e=> set(el, e.clientX, e.clientY, el.getBoundingClientRect()));
    el.addEventListener("pointerleave", ()=> reset(el));
    el.addEventListener("blur", ()=> reset(el));
    el.addEventListener("focus", ()=> el.scrollIntoView({block:"nearest", behavior:"smooth"}));
  });
})();

(() => {
  document.querySelectorAll(".magnetic").forEach(btn=>{
    let raf=0;
    function move(e){
      const r=btn.getBoundingClientRect(), mx=e.clientX-(r.left+r.width/2), my=e.clientY-(r.top+r.height/2);
      btn.style.transform = `translate(${mx*0.15}px,${my*0.15}px)`;
    }
    function leave(){ btn.style.transform = "translate(0,0)"; if(raf) cancelAnimationFrame(raf); }
    btn.addEventListener("pointermove", e=>{ if(raf) cancelAnimationFrame(raf); raf=requestAnimationFrame(()=>move(e)); });
    btn.addEventListener("pointerleave", leave);
  });
})();
