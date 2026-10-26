(async()=>{try{
const API='https://script.google.com/macros/s/AKfycbykhlZR0j8kdNRAeC3wV8OhBTh97AkPHpMw8QgGTO6vbx_MxEXWdBzO23G_kBAQtsJL/exec',K='__KEY__';
const DJ=[['shalev','שלו','שלו וזאנה'],['ofek','אופק','אופק אדטו'],['nariz','רון נאריז','רון נאריז'],['omer','עומר','עומר כחלון']];
const m0=location.pathname.match(/company_events\/(\d+)/);if(!m0){alert('צריך להיות בתוך כרטיס אירוע ב-iPlan');return}
const T=document.body.innerText;
const fld=l=>{const m=T.match(new RegExp('\\n'+l+'\\s*\\n\\s*([^\\n]+)'));return m?m[1].trim():''};
const couple=(document.title||'').split(' - #')[0].trim();const venue=fld('מקום');const ed=(fld('מועד').match(/(\d{2})\/(\d{2})\/(\d{4})/)||[]);
const date=ed.length?ed[3]+'-'+ed[2]+'-'+ed[1]:'';
const ci=T.indexOf('אנשי קשר'),ce=T.indexOf('לקוחות',ci);const cb=ci>=0?T.slice(ci,ce>0?ce:ci+1500):'';
const emails=[...new Set(cb.match(/[\w.+-]+@[\w-]+\.[\w.]+/g)||[])];
const phones=[...new Set((cb.match(/0\d{1,2}-?\d{3}-?\d{4}/g)||[]).map(p=>p.replace(/\D/g,'')))].filter(p=>p.length===10);
const guess=(DJ.find(d=>d[0]!=='omer'&&T.includes(d[2]))||DJ[3])[0];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
document.getElementById('mu-box')?.remove();const box=document.createElement('div');box.id='mu-box';box.dir='rtl';
box.style.cssText='position:fixed;z-index:99999;top:20px;left:50%;transform:translateX(-50%);width:min(460px,94vw);background:#fff;border:1px solid #ccc;border-radius:14px;box-shadow:0 10px 40px rgba(0,0,0,.3);padding:16px;font:15px/1.5 Arial,sans-serif;color:#222';
const inp='font:inherit;width:100%;padding:6px 8px;border:1px solid #ccc;border-radius:8px;margin:2px 0 8px;box-sizing:border-box';
box.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:17px">שליחת לינק לתיאום מוזיקה</b><button id="mu-x" style="border:0;background:none;font-size:22px;cursor:pointer">×</button></div>
<label>שמות הזוג<input id="mu-n" style="${inp}" value="${esc(couple)}"></label>
<label>מקום<input id="mu-v" style="${inp}" value="${esc(venue)}"></label>
<label>תאריך האירוע<input id="mu-d" type="date" style="${inp}" value="${esc(date)}"></label>
<label>דיג׳יי<select id="mu-dj" style="${inp}">${DJ.map(d=>`<option value="${d[0]}"${d[0]===guess?' selected':''}>${d[1]}</option>`).join('')}</select></label>
<label>טלפון לשליחה<select id="mu-p" style="${inp}">${phones.map(p=>`<option>${p}</option>`).join('')}<option value="">בלי מספר – לבחור צ׳אט בוואטסאפ</option></select></label>
<p id="mu-msg" style="color:#8a1c14;margin:4px 0"></p>
<button id="mu-go" style="font:inherit;font-weight:700;background:#1fa855;color:#fff;border:0;border-radius:10px;padding:10px 18px;cursor:pointer">שליחה בוואטסאפ</button>
<button id="mu-cp" style="font:inherit;background:#f2f2f2;border:1px solid #ccc;border-radius:10px;padding:10px 14px;cursor:pointer;margin-inline-start:6px">העתקת הודעה</button>`;
document.body.appendChild(box);box.querySelector('#mu-x').onclick=()=>box.remove();
const q=id=>box.querySelector(id);
async function make(){const p={api:'mk',k:K,id:m0[1],n:q('#mu-n').value.trim(),v:q('#mu-v').value.trim(),d:q('#mu-d').value,dj:q('#mu-dj').value,p:q('#mu-p').value};if(emails[0])p.m=emails[0];
 const r=await fetch(API+'?'+new URLSearchParams(p),{credentials:'omit'});const j=await r.json();if(!j.ok)throw new Error(j.error||'שגיאה');return j}
q('#mu-go').onclick=async()=>{const w=window.open('about:blank','_blank');q('#mu-msg').textContent='מכין את הלינק…';
 try{const j=await make();if(j.booked){q('#mu-msg').textContent='שימי לב: הזוג כבר קבע – '+j.booked+'. הלינק יראה להם את המועד שנקבע.'}else q('#mu-msg').textContent='';
  const ph=q('#mu-p').value.replace(/^0/,'972');w.location='https://wa.me/'+ph+'?text='+encodeURIComponent(j.msg);if(!j.booked)setTimeout(()=>box.remove(),800)}
 catch(e){w&&w.close();q('#mu-msg').textContent='לא הצליח: '+e.message}};
q('#mu-cp').onclick=async()=>{try{const j=await make();await navigator.clipboard.writeText(j.msg);q('#mu-msg').style.color='#14532d';q('#mu-msg').textContent='ההודעה הועתקה ✓'}catch(e){q('#mu-msg').textContent='לא הצליח: '+e.message}};
}catch(e){alert('שגיאה: '+e.message)}})();
