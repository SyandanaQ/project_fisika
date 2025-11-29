// ====== ANIMATION SETUP ======
const canvas1 = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');
const canvas3 = document.getElementById('canvas3');

const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');
const ctx3 = canvas3.getContext('2d');

// Set canvas size
function resizeCanvas() {
    [canvas1, canvas2, canvas3].forEach(canvas => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ====== ANIMATION VARIABLES ======
let anim1 = { x: 50, velocity: 2, force: 0, active: false };
let anim2 = { x: 50, velocity: 0, acceleration: 0, mass: 1, active: false };
let anim3 = { x1: 40, x2: 60, force: 0, active: false, pushing: false };

// ====== HUKUM NEWTON 1 - ANIMATION ======
function animateNewton1() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    
    const centerY = canvas1.height / 2;
    
    // Ground line
    ctx1.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx1.lineWidth = 2;
    ctx1.beginPath();
    ctx1.moveTo(0, centerY + 30);
    ctx1.lineTo(canvas1.width, centerY + 30);
    ctx1.stroke();
    
    if (anim1.force === 0) {
        // Benda bergerak konstan (GLB)
        anim1.x += anim1.velocity;
        if (anim1.x > canvas1.width + 30) anim1.x = -30;
        
        // Draw object
        ctx1.fillStyle = '#93c5fd';
        ctx1.fillRect(anim1.x - 25, centerY - 25, 50, 50);
        ctx1.strokeStyle = '#333';
        ctx1.lineWidth = 2;
        ctx1.strokeRect(anim1.x - 25, centerY - 25, 50, 50);
        
        // Velocity arrow
        drawArrow(ctx1, anim1.x + 25, centerY, anim1.x + 65, centerY, '#4ade80', 3);
        ctx1.fillStyle = '#fff';
        ctx1.font = 'bold 12px Poppins';
        ctx1.fillText('v konstan', anim1.x + 70, centerY + 5);
        
        // Text ΣF = 0
        ctx1.fillStyle = '#ffd93d';
        ctx1.font = 'bold 16px Poppins';
        ctx1.fillText('ΣF = 0', 20, 30);
        
    } else {
        // Benda diam
        anim1.x = canvas1.width / 2;
        
        // Draw object
        ctx1.fillStyle = '#93c5fd';
        ctx1.fillRect(anim1.x - 25, centerY - 25, 50, 50);
        ctx1.strokeStyle = '#333';
        ctx1.lineWidth = 2;
        ctx1.strokeRect(anim1.x - 25, centerY - 25, 50, 50);
        
        // Force arrows (balanced)
        drawArrow(ctx1, anim1.x - 80, centerY, anim1.x - 30, centerY, '#ff5757', 3);
        drawArrow(ctx1, anim1.x + 80, centerY, anim1.x + 30, centerY, '#ff5757', 3);
        
        // Text
        ctx1.fillStyle = '#ffd93d';
        ctx1.font = 'bold 16px Poppins';
        ctx1.fillText('ΣF ≠ 0', 20, 30);
        ctx1.fillStyle = '#fff';
        ctx1.font = '12px Poppins';
        ctx1.fillText('Benda mengalami percepatan', 20, 50);
    }
    
    if (anim1.active) requestAnimationFrame(animateNewton1);
}

// ====== HUKUM NEWTON 2 - ANIMATION ======
function animateNewton2() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    
    const centerY = canvas2.height / 2;
    
    // Ground line
    ctx2.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx2.lineWidth = 2;
    ctx2.beginPath();
    ctx2.moveTo(0, centerY + 30);
    ctx2.lineTo(canvas2.width, centerY + 30);
    ctx2.stroke();
    
    // Update position based on acceleration
    anim2.velocity += anim2.acceleration * 0.05;
    anim2.x += anim2.velocity;
    
    // Reset if out of bounds
    if (anim2.x > canvas2.width + 30) {
        anim2.x = 50;
        anim2.velocity = 0;
    }
    
    // Draw object (size based on mass)
    const size = Math.min(30 + anim2.mass * 5, 60);
    ctx2.fillStyle = '#96f9a3';
    ctx2.fillRect(anim2.x - size/2, centerY - size/2, size, size);
    ctx2.strokeStyle = '#333';
    ctx2.lineWidth = 2;
    ctx2.strokeRect(anim2.x - size/2, centerY - size/2, size, size);
    
    // Force arrow (length based on force)
    const arrowLength = Math.min(Math.abs(anim2.acceleration) * 20, 100);
    drawArrow(ctx2, anim2.x + size/2, centerY, anim2.x + size/2 + arrowLength, centerY, '#ff5757', 4);
    
    // Text
    ctx2.fillStyle = '#ffd93d';
    ctx2.font = 'bold 16px Poppins';
    ctx2.fillText('F = m × a', 20, 30);
    ctx2.fillStyle = '#fff';
    ctx2.font = '12px Poppins';
    ctx2.fillText(`a = ${anim2.acceleration.toFixed(1)} m/s²`, 20, 50);
    
    if (anim2.active) requestAnimationFrame(animateNewton2);
}

// ====== HUKUM NEWTON 3 - ANIMATION ======
function animateNewton3() {
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    
    const centerY = canvas3.height / 2;
    const centerX = canvas3.width / 2;
    
    // Ground line
    ctx3.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx3.lineWidth = 2;
    ctx3.beginPath();
    ctx3.moveTo(0, centerY + 30);
    ctx3.lineTo(canvas3.width, centerY + 30);
    ctx3.stroke();
    
    // Kecepatan berdasarkan gaya (semakin besar gaya, semakin cepat)
    const speed = Math.min(Math.abs(anim3.force) * 0.05, 1);
    
    // Animation of pushing
    if (anim3.pushing) {
        anim3.x1 = Math.min(anim3.x1 + speed, 45);
        anim3.x2 = Math.max(anim3.x2 - speed, 55);
        if (anim3.x1 >= 45) anim3.pushing = false;
    } else {
        anim3.x1 = Math.max(anim3.x1 - speed, 40);
        anim3.x2 = Math.min(anim3.x2 + speed, 60);
        if (anim3.x1 <= 40) anim3.pushing = true;
    }
    
    const pos1 = (canvas3.width * anim3.x1) / 100;
    const pos2 = (canvas3.width * anim3.x2) / 100;
    
    // Draw objects
    ctx3.fillStyle = '#93c5fd';
    ctx3.fillRect(pos1 - 25, centerY - 25, 50, 50);
    ctx3.strokeStyle = '#333';
    ctx3.lineWidth = 2;
    ctx3.strokeRect(pos1 - 25, centerY - 25, 50, 50);
    
    ctx3.fillStyle = '#ff9f43';
    ctx3.fillRect(pos2 - 25, centerY - 25, 50, 50);
    ctx3.strokeStyle = '#333';
    ctx3.strokeRect(pos2 - 25, centerY - 25, 50, 50);
    
    // Force arrows (action-reaction)
    const arrowLength = Math.min(Math.abs(anim3.force) * 2, 60);
    drawArrow(ctx3, pos1 + 25, centerY, pos1 + 25 + arrowLength, centerY, '#5b9cff', 4);
    drawArrow(ctx3, pos2 - 25, centerY, pos2 - 25 - arrowLength, centerY, '#ff5757', 4);
    
    // Text
    ctx3.fillStyle = '#ffd93d';
    ctx3.font = 'bold 16px Poppins';
    ctx3.fillText('Aksi = Reaksi', 20, 30);
    ctx3.fillStyle = '#fff';
    ctx3.font = '12px Poppins';
    ctx3.fillText(`F = ${Math.abs(anim3.force)} N`, 20, 50);
    
    if (anim3.active) requestAnimationFrame(animateNewton3);
}

// ====== HELPER FUNCTION - DRAW ARROW ======
function drawArrow(ctx, x1, y1, x2, y2, color, width) {
    const headlen = 10;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    
    // Line
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
    // Arrow head
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
}

// ====== CALCULATION FUNCTIONS ======
function calcNewton1() {
    const F = parseFloat(document.getElementById("n1_force").value);
    const result = document.getElementById("n1_result");

    if (isNaN(F)) {
        result.textContent = "Masukkan nilai gaya terlebih dahulu.";
        return;
    }

    anim1.force = F;
    anim1.active = true;
    
    if (F === 0) {
        result.textContent = "Benda akan tetap diam atau bergerak lurus beraturan (ΣF = 0).";
        anim1.velocity = 2;
    } else {
        result.textContent = "Resultan gaya tidak nol, benda mengalami percepatan.";
        anim1.velocity = 0;
    }
    
    animateNewton1();
}

function calcNewton2() {
    const m = parseFloat(document.getElementById("n2_mass").value);
    const a = parseFloat(document.getElementById("n2_acc").value);
    const result = document.getElementById("n2_result");

    if (isNaN(m) || isNaN(a)) {
        result.textContent = "Masukkan nilai massa dan percepatan.";
        return;
    }

    const F = m * a;
    result.textContent = `Gaya total: ${F.toFixed(2)} N`;
    
    // Reset semua nilai animasi
    anim2.mass = m;
    anim2.acceleration = a;
    anim2.velocity = 0;  // Reset velocity ke 0
    anim2.x = 50;        // Reset posisi ke awal
    
    // Stop animasi lama jika masih berjalan
    anim2.active = false;
    
    // Tunggu sebentar lalu mulai animasi baru
    setTimeout(() => {
        anim2.active = true;
        animateNewton2();
    }, 50);
}

function calcNewton3() {
    const F = parseFloat(document.getElementById("n3_force").value);
    const result = document.getElementById("n3_result");

    if (isNaN(F)) {
        result.textContent = "Masukkan gaya aksi terlebih dahulu.";
        return;
    }

    result.textContent = `Gaya reaksi = ${F} N (berlawanan arah)`;
    
    // Reset animasi sebelum set nilai baru
    anim3.force = F;
    anim3.x1 = 40;
    anim3.x2 = 60;
    anim3.pushing = false;
    anim3.active = true;
    
    animateNewton3();
}

// ====== START INITIAL ANIMATIONS ======
anim1.active = true;
anim2.acceleration = 2;
anim2.mass = 2;
anim2.active = true;
anim3.force = 10;
anim3.active = true;

animateNewton1();
animateNewton2();
animateNewton3();