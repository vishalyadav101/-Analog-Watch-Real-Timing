 // Pura ka pura tumhara <script> yaha paste karo — NO CHANGE

const canvas = document.getElementById('marker-canvas');
const ctx = canvas.getContext('2d');
const cx = 121, cy = 121, r = 121;

const romanNumerals = ['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];

function drawMarkers() {
  ctx.clearRect(0, 0, 242, 242);

  for (let i = 0; i < 60; i++) {
    const angle = (i * 6 - 90) * Math.PI / 180;
    const isHour = i % 5 === 0;
    const len = isHour ? 14 : 6;
    const width = isHour ? 1.5 : 0.8;
    const outerR = r - 10;
    const innerR = outerR - len;

    const x1 = cx + outerR * Math.cos(angle);
    const y1 = cy + outerR * Math.sin(angle);
    const x2 = cx + innerR * Math.cos(angle);
    const y2 = cy + innerR * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = isHour ? 'rgba(201,169,110,0.9)' : 'rgba(201,169,110,0.35)';
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  const numR = r - 34;
  romanNumerals.forEach((num, i) => {
    const angle = (i * 30 - 90) * Math.PI / 180;
    const x = cx + numR * Math.cos(angle);
    const y = cy + numR * Math.sin(angle);
    const size = (num === 'XII' || num === 'VI') ? 10 : 9;
    ctx.font = `300 ${size}px 'Cormorant Garamond', serif`;
    ctx.fillStyle = 'rgba(232,213,163,0.85)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(num, x, y);
  });
}

drawMarkers();

const hourHand   = document.getElementById('hand-hour');
const minuteHand = document.getElementById('hand-minute');
const secondHand = document.getElementById('hand-second');
const digitalTime = document.getElementById('digital-time');
const dateFull   = document.getElementById('date-full');
const dateNum    = document.getElementById('date-num');

const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function pad(n) { return String(n).padStart(2,'0'); }

function tick() {
  const now = new Date();
  const h = now.getHours() % 12;
  const m = now.getMinutes();
  const s = now.getSeconds();
  const ms = now.getMilliseconds();

  const secDeg  = (s + ms / 1000) * 6;
  const minDeg  = (m + s / 60) * 6;
  const hourDeg = (h + m / 60) * 30;

  secondHand.style.transform = `rotate(${secDeg}deg)`;
  minuteHand.style.transform = `rotate(${minDeg}deg)`;
  hourHand.style.transform   = `rotate(${hourDeg}deg)`;

  const hh = now.getHours();
  digitalTime.innerHTML = `${pad(hh)}<span>:</span>${pad(m)}<span>:</span>${pad(s)}`;

  const d = now.getDate();
  dateFull.textContent = `${days[now.getDay()]} · ${months[now.getMonth()]} ${d}, ${now.getFullYear()}`;
  dateNum.textContent  = pad(d);

  requestAnimationFrame(tick);
}

tick();