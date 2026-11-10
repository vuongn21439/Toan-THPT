const {JSDOM,VirtualConsole}=require('jsdom');
const fs=require('fs'),path=require('path');
const root=process.argv[2]||path.join(__dirname,'..');
const errors=[],found={};
const note=(k,s)=>{(found[k]=found[k]||[]);if(found[k].length<3)found[k].push(s)};
const inline=h=>h.replace(/<script type="module"[^>]*><\/script>/g,'').replace(/<link[^>]*>/g,'').replace(/<script src="([^"]+)"[^>]*><\/script>/g,(m,src)=>'<script>'+fs.readFileSync(path.join(root,src),'utf8').replace(/<\/script>/g,'<\\/script>')+'</script>');
const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push('jsdomError: '+(e.detail&&e.detail.stack||e.message).toString().split('\n').slice(0,3).join(' | ')));vc.on('error',(...a)=>errors.push('console.error: '+a.join(' ').slice(0,200)));
(async()=>{
const dom=new JSDOM(inline(fs.readFileSync(root+'/index.html','utf8')),{url:'http://localhost/',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,
 beforeParse(w){w.scrollTo=()=>{};w.matchMedia=w.matchMedia||(()=>({matches:false,addListener(){},removeListener(){},addEventListener(){}}));w.HTMLCanvasElement.prototype.getContext=()=>null;w.addEventListener('error',e=>errors.push('window.onerror: '+e.message))}});
const w=dom.window,doc=w.document;
await new Promise(r=>setTimeout(r,1500));
const ev=c=>w.eval(c);
console.log('khởi động: app.innerHTML dài',doc.getElementById('app').innerHTML.length,'| topics',ev('T.length'),'| hàm home',ev('typeof home'),'| pickGrade',ev('typeof pickGrade'));
const BAD=/undefined|NaN|\[object|Infinity/;
function inspect(where,el){
  if(!el)return;const t=el.textContent;
  if(BAD.test(t))note('TEXT_BAD @'+where,t.slice(0,200));
  if(/<\/?(sub|sup|span|b|br|i)\b/.test(t))note('RAW_TAG_VISIBLE @'+where,t.slice(0,200));
  if(/&(lt|gt|amp|quot);/.test(t))note('DOUBLE_ESCAPED @'+where,t.slice(0,200));
  if(/\^/.test(t))note('CARET @'+where,t.slice(0,200));
  el.querySelectorAll('.fr').forEach(f=>{const b=f.querySelectorAll('b');if(b.length!==2||!b[0].textContent.trim()||!b[1].textContent.trim()||b[1].textContent.trim()==='0')note('BAD_FRACTION @'+where,f.parentElement.textContent.slice(0,150))});
  if(/(\d)\s*[−-]\s*[−-]\s*\d|\+\s*−|−\s*−/.test(t.replace(/\s+/g,' ')))note('DOUBLE_SIGN @'+where,t.slice(0,160));
}
let nq=0,nRight=0,nWrongPicked=0;
function playPractice(id,lv){
  ev(`go('${id}','${lv}')`);
  const n=ev('S.q.length');
  for(let i=0;i<n;i++){
    const q=ev('S.q[S.i]');
    inspect('q '+id+lv,doc.querySelector('.card'));
    if(q.inp){doc.getElementById('in').value=(i%3===0)?'0':q.a;ev('sub()')}
    else{const opts=ev('S.o');
      const wantRight=(i%3!==0);let k=opts.indexOf(q.a);if(k<0)note('ANSWER_MISSING_FROM_OPTIONS @'+id,q.q);
      if(!wantRight)k=(k+1)%opts.length;
      if(new Set(opts).size!==opts.length)note('DUP_OPTIONS_ON_SCREEN @'+id,opts.join(' | '));
      doc.querySelectorAll('.o')[k].click();}
    nq++;
    const fb=doc.getElementById('fb');inspect('fb '+id+lv,fb);
    const isOk=fb.className.includes('ok');const shouldOk=(i%3!==0)||(q.inp?false:false);
    if(i%3!==0){if(!isOk)note('CORRECT_ANSWER_MARKED_WRONG @'+id+lv,q.q+' | a='+q.a);else nRight++}
    else{if(isOk&&!q.inp)note('WRONG_ANSWER_MARKED_RIGHT @'+id+lv,q.q+' | a='+q.a);nWrongPicked++}
    if(i===n-1)ev('end()');else ev('next()');
  }
  inspect('result '+id+lv,doc.getElementById('app'));
}
for(const g of [10,11,12]){
  ev(`setGr(${g})`);
  inspect('home g'+g,doc.getElementById('app'));
  const ids=ev(`gT().map(t=>t.id)`);
  for(const id of ids){ev(`intro('${id}')`);inspect('intro '+id,doc.getElementById('app'));for(const lv of ['b','h'])playPractice(id,lv)}
  // ôn thông minh + thi thử 3 đề + thử thách ngày
  for(const m of ['smart','all','ex1','ex2','ex3','daily']){
    try{
      if(m==='daily')ev(`D.dc${g}=null;start('daily')`);else ev(`go('${m}','m')`);
      const isExam=ev('!!S.exam');
      if(isExam){
        const n=ev('S.q.length');
        for(let i=0;i<n;i++){inspect('exam '+m+g,doc.getElementById('app'));const q=ev('S.q[S.i]');
          if(q.inp){const el=doc.getElementById('in');el.value=q.a;ev('saveInp('+JSON.stringify(q.a)+')')}
          else{const k=ev('S.o').indexOf(q.a);ev('pickExam('+k+')')}
          if(i<n-1)ev('examNext()')}
        ev('submitExam(false)');
        const okc=ev('S.ok');if(okc!==n)note('EXAM_ALL_CORRECT_BUT_SCORE_LOW @'+m+g,okc+'/'+n);
        inspect('exam result '+m+g,doc.getElementById('app'));
        ev('exReview(0)');inspect('review '+m+g,doc.getElementById('app'));ev('exReview(1)');
      }else{
        const n=ev('S.q.length');for(let i=0;i<n;i++){const q=ev('S.q[S.i]');
          if(q.inp){doc.getElementById('in').value=q.a;ev('sub()')}else doc.querySelectorAll('.o')[ev('S.o').indexOf(q.a)].click();
          if(i===n-1)ev('end()');else ev('next()')}
      }
    }catch(e){errors.push('FLOW '+m+g+': '+e.message)}
  }
}
console.log('câu đã chơi trong giao diện:',nq,'| chọn đúng được chấm đúng:',nRight,'| chọn sai/0 đã thử:',nWrongPicked);
console.log('LỖI JS:',errors.length?errors.slice(0,10):'không có');
console.log('PHÁT HIỆN HIỂN THỊ:',Object.keys(found).length?JSON.stringify(found,null,1):'không có');
process.exit(0);
})();
