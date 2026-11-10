// Kiểm tra số học trong lời giải: tìm chuỗi "biểu thức số = biểu thức số" và kiểm tra hai vế có bằng nhau không.
const plain=s=>String(s)
  .replace(/<span class="fr"><b>(.*?)<\/b><b>(.*?)<\/b><\/span>/g,'⟦$1∕$2⟧')
  .replace(/<sub>(.*?)<\/sub>/g,'_$1').replace(/<sup>(.*?)<\/sup>/g,'^$1').replace(/<br\s*\/?>/g,'\n').replace(/<[^>]*>/g,'')
  .replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
function tokenize(t){
  t=t.replace(/⟦([^∕]*)∕([^⟧]*)⟧/g,'($1)/($2)').replace(/[−–]/g,'-').replace(/[·×]/g,'*').replace(/÷/g,'/').replace(/²/g,'^2').replace(/³/g,'^3');
  const out=[];let i=0;
  while(i<t.length){
    const c=t[i];
    if(/\s/.test(c)){out.push({k:'ws'});i++;continue}
    let m;
    if(m=t.slice(i).match(/^\d+(?:[.,]\d+)?/)){out.push({k:'num',v:+m[0].replace(',','.'),s:m[0]});i+=m[0].length;continue}
    if('+-*/^()'.includes(c)){out.push({k:'op',v:c});i++;continue}
    if(c==='='||c==='≈'){out.push({k:'eq',v:c});i++;continue}
    if(c==='√'){out.push({k:'sqrt'});i++;continue}
    out.push({k:'other',v:c});i++;
  }
  return out;
}
function parse(toks){ // trả về số hoặc null
  toks=toks.filter(x=>x.k!=='ws');let p=0;
  const peek=()=>toks[p];
  function expr(){let v=term();while(peek()&&peek().k==='op'&&(peek().v==='+'||peek().v==='-')){const o=toks[p++].v;const r=term();v=o==='+'?v+r:v-r}return v}
  function term(){let v=unary();for(;;){const t=peek();if(!t)break;if(t.k==='op'&&(t.v==='*'||t.v==='/')){p++;const r=unary();v=t.v==='*'?v*r:v/r}else if((t.k==='op'&&t.v==='(')||t.k==='sqrt'){v=v*unary()}else break}return v}
  function unary(){const t=peek();if(t&&t.k==='op'&&(t.v==='-'||t.v==='+')){p++;const v=unary();return t.v==='-'?-v:v}return power()}
  function power(){const b=atom();const t=peek();if(t&&t.k==='op'&&t.v==='^'){p++;const e=unary();return Math.pow(b,e)}return b}
  function atom(){const t=toks[p++];if(!t)throw 0;if(t.k==='num')return t.v;if(t.k==='sqrt'){const a=atom();if(a<0)throw 0;return Math.sqrt(a)}if(t.k==='op'&&t.v==='('){const v=expr();const c=toks[p++];if(!c||c.v!==')')throw 0;return v}throw 0}
  try{const v=expr();if(p!==toks.length||!Number.isFinite(v))return null;return v}catch(e){return null}
}
function checkArith(html){
  const txt=plain(html),res=[];
  for(const line of txt.split('\n')){
    const T=tokenize(line);
    // tách thành các đoạn liên tục không có 'other'
    let i=0;
    while(i<T.length){
      if(T[i].k==='other'){i++;continue}
      let j=i;while(j<T.length&&T[j].k!=='other')j++;
      const seg=T.slice(i,j),before=i>0?T[i-1]:null,after=j<T.length?T[j]:null;
      // chia theo dấu = / ≈
      const parts=[],eqs=[];let cur=[];
      for(const t of seg){if(t.k==='eq'){parts.push(cur);eqs.push(t.v);cur=[]}else cur.push(t)}
      parts.push(cur);
      if(eqs.length){
        const okBefore=!before||/[:;,.⇒⇔→(\[]|^$/.test(before.v)&&!/[)\]]/.test(before.v);
        const okAfter=!after||/[:;,.⇒⇔→)\]]/.test(after.v);
        for(let k=0;k<eqs.length;k++){
          const L=parts[k],Rr=parts[k+1];
          const lText=L.map(x=>x.s||x.v||(x.k==='sqrt'?'√':'')).join('').trim(),rText=Rr.map(x=>x.s||x.v||(x.k==='sqrt'?'√':'')).join('').trim();
          if(!lText||!rText)continue;
          if(k===0&&!okBefore)continue;
          if(k+1===parts.length-1&&!okAfter)continue;
          if(/^[*\/^]/.test(lText)||/^[*\/^]/.test(rText)||/[+\-*\/^]$/.test(lText)||/[+\-*\/^]$/.test(rText))continue;
          const a=parse(L),b=parse(Rr);
          if(a===null||b===null)continue;
          let ok;
          if(eqs[k]==='='){
            const m=rText.match(/[.,](\d+)$/),d=m?m[1].length:0,tol=Math.max(1e-9,Math.abs(b)*1e-9);
            ok=Math.abs(a-b)<=tol||(d>0&&Math.abs(a-b)<=0.5*Math.pow(10,-d)+1e-12);
          }else{
            const m=rText.match(/[.,](\d+)$/),d=m?m[1].length:0;ok=Math.abs(a-b)<=0.51*Math.pow(10,-d)+1e-12;
          }
          if(!ok)res.push({expr:lText+' '+eqs[k]+' '+rText,l:a,r:b});
        }
      }
      i=j;
    }
  }
  return res;
}
module.exports={checkArith,plain};
if(require.main===module){
  const tests=['Bước 2: 12·(−9) + −5·(−12) = −48.','Thay x = 3: 2·3 + 1 = 8','x − 3 = 5','S4 = 2·(24 − 1)/(2 − 1) = 2·15/1 = 30','0,5/200 = 0,0025','4 + 9 + 1 = 15'];
  for(const t of tests)console.log(t,'=>',JSON.stringify(checkArith(t)));
}
