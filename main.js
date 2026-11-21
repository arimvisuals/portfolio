// filters
const btns=document.querySelectorAll('.filters button');
btns.forEach(b=>b.addEventListener('click',()=>{
  btns.forEach(x=>x.setAttribute('aria-pressed',x===b));
  const f=b.dataset.f;
  document.querySelectorAll('.shot').forEach(s=>{s.hidden=!(f==='all'||s.dataset.cat===f)});
}));
// copy buttons
document.querySelectorAll('.copy').forEach(b=>b.addEventListener('click',async()=>{
  const t=b.textContent;
  try{await navigator.clipboard.writeText(b.dataset.copy);b.textContent='Copied'}catch(e){b.textContent='Select & copy'}
  setTimeout(()=>b.textContent=t,1600);
}));
// running timecode (24fps)
const tc=document.getElementById('tc');
if(tc && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  const t0=performance.now(),p=n=>String(n).padStart(2,'0');
  const tick=()=>{const f=Math.floor((performance.now()-t0)/1000*24);
    tc.textContent=`${p(Math.floor(f/86400)%24)}:${p(Math.floor(f/1440)%60)}:${p(Math.floor(f/24)%60)}:${p(f%24)}`;requestAnimationFrame(tick)};
  tick();
}
