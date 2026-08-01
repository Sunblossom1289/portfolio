// ============================
// Current Year
// ============================

document.getElementById("year").textContent = new Date().getFullYear();

// ============================
// Smooth Scrolling
// ============================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({

behavior:"smooth"

});

});

});

// ============================
// Cursor Glow
// ============================

const blob=document.getElementById("cursor-blob");

let mouseX=window.innerWidth/2;

let mouseY=window.innerHeight/2;

let currentX=mouseX;

let currentY=mouseY;

window.addEventListener("mousemove",e=>{

mouseX=e.clientX;

mouseY=e.clientY;

});

function animateBlob(){

currentX+=(mouseX-currentX)*0.12;

currentY+=(mouseY-currentY)*0.12;

blob.style.left=currentX+"px";

blob.style.top=currentY+"px";

requestAnimationFrame(animateBlob);

}

animateBlob();

// ============================
// Particle Background
// ============================

const canvas=document.getElementById("particles");

const ctx=canvas.getContext("2d");

function resize(){

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

}

resize();

window.addEventListener("resize",resize);

const particles=[];

for(let i=0;i<100;i++){

particles.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

r:Math.random()*2+1,

dx:(Math.random()-0.5)*0.5,

dy:(Math.random()-0.5)*0.5

});

}

function animateParticles(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

p.x+=p.dx;

p.y+=p.dy;

if(p.x<0||p.x>canvas.width)p.dx*=-1;

if(p.y<0||p.y>canvas.height)p.dy*=-1;

ctx.beginPath();

ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

ctx.fillStyle="rgba(0,212,255,.6)";

ctx.fill();

});

requestAnimationFrame(animateParticles);

}

animateParticles();

// ============================
// Animated Counter
// ============================

const stats=document.querySelectorAll(".stat h2");

function runCounter(){

stats.forEach(stat=>{

const target=parseInt(stat.innerText);

let count=0;

const speed=target/100;

function update(){

count+=speed;

if(count<target){

stat.innerText=Math.floor(count)+"+";

requestAnimationFrame(update);

}

else{

stat.innerText=target+"+";

}

}

update();

});

}

const counterSection=document.querySelector(".stats");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

runCounter();

observer.disconnect();

}

});

});

observer.observe(counterSection);

// ============================
// Scroll Reveal
// ============================

const reveal=document.querySelectorAll(

".skill-card,.project-card,.achievement-card,.timeline-card,.contact-card"

);

const revealObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});

reveal.forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(40px)";

card.style.transition=".8s";

revealObserver.observe(card);

});

// ============================
// Navbar Highlight
// ============================

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-120;

if(pageYOffset>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

// ============================
// Typing Effect
// ============================

const heading=document.querySelector(".hero-left h2");

const text="Software Engineer & Full Stack Developer";

let i=0;

heading.innerHTML="";

function type(){

if(i<text.length){

heading.innerHTML+=text.charAt(i);

i++;

setTimeout(type,45);

}

}

type();

// ============================
// Card Tilt
// ============================

document.querySelectorAll(".project-card").forEach(card=>{

card.addEventListener("mousemove",e=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateY=(x-rect.width/2)/18;

const rotateX=(rect.height/2-y)/18;

card.style.transform=`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="perspective(1000px) rotateX(0deg) rotateY(0deg)";

});

});

// ============================
// Resume Button Animation
// ============================

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="scale(1.05)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="scale(1)";

});

});

// ============================
// Console Message
// ============================

console.log("Portfolio by Shivangi Mishra 🚀");
