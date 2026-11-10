const {ctx,run}=require('./load.js');
const K=+process.argv[2]||300;
const norm=s=>String(s).replace(/<[^>]*>/g,'').replace(/[−–]/g,'-').replace(/\s+/g,'').replace(/,/g,'.');
const {checkArith,plain}=require('./arith.js');
const strip=s=>plain(s);
const num=s=>{s=norm(s);let m;if(/^-?\d+(\.\d+)?$/.test(s))return +s;if(m=s.match(/^(-?\d+)\/(\d+)$/))return +m[1]/+m[2];return null};
const gcd=(a,b)=>b?gcd(b,a%b):a;
const ALLOWED=new Set(['sub','sup','span','b','br','i','u','em','small','svg','path','circle','line','text','rect','g','polygon','polyline','ellipse','defs','marker','tspan','div','p','strong']);
const Hh=run('H');
const issues={};
const add=(key,sample)=>{const o=issues[key]=issues[key]||{n:0,s:[]};o.n++;if(o.s.length<2&&!o.s.includes(sample))o.s.push(sample)};
const tags=['sub','sup','span','b','i','u'];
function checkText(where,txt,k,q,isHtmlOK){
  if(typeof txt!=='string'){add(k+'|NOT_STRING '+where,String(txt));return}
  if(/NaN|undefined|Infinity|\[object|\bnull\b/.test(txt))add(k+'|BADTOKEN '+where,txt.slice(0,160));
  // unbalanced tags
  for(const t of tags){const o=(txt.match(new RegExp('<'+t+'[\\s>]','g'))||[]).length,c=(txt.match(new RegExp('</'+t+'>','g'))||[]).length;if(o!==c)add(k+'|UNBALANCED <'+t+'> '+where,txt.slice(0,160))}
  // stray < that would be parsed as tag
  for(const m of txt.matchAll(/<\/?([a-zA-Z][a-zA-Z0-9]*)/g)){if(!ALLOWED.has(m[1].toLowerCase()))add(k+'|STRAY_TAG <'+m[1]+'> '+where,txt.slice(0,160))}
  // after H: leftover caret or fraction glitches
  const h=Hh(txt);
  if(/\^/.test(h.replace(/<[^>]*>/g,'')))add(k+'|CARET_LEFT '+where,strip(txt).slice(0,160));
  if(/\^<span/.test(h))add(k+'|CARET_BEFORE_FRACTION '+where,txt.slice(0,160));
  if(/[\d,.]<span class="fr">/.test(h)&&/[\d][,.]\d+\/\d+/.test(txt))add(k+'|DECIMAL_FRACTION_GLUED '+where,txt.slice(0,160));
  if(/<\/span>[\d]/.test(h)&&/\d+\/\d+[.,]\d/.test(txt))add(k+'|FRACTION_THEN_DECIMAL '+where,txt.slice(0,160));
  const p=strip(txt);
  if(/[+−-]\s*[+−]\s*[\d(a-z]|\+\s*-\s*[\d(a-z]|--/.test(p.replace(/->|-->|—/g,'')))add(k+'|DOUBLE_SIGN '+where,p.slice(0,160));
  if(/(^|[^\d.,/a-zA-Zα-ωπ°²³_])1([xyzt])(?![a-zA-Zα-ω²])/.test(p))add(k+'|COEFF_1 '+where,p.slice(0,160));
  if(/(^|[^\d.,a-zA-Z])0([xyz])(?![a-zA-Z])/.test(p))add(k+'|COEFF_0 '+where,p.slice(0,160));
  if(/\^1(?!\d)/.test(txt)&&!/e\^1|10\^1/.test(txt))add(k+'|POW_1 '+where,p.slice(0,160));
  if(/\^0(?!\d)/.test(txt))add(k+'|POW_0 '+where,p.slice(0,160));
  if(/\/\s*[−-]\d/.test(p))add(k+'|NEG_DENOM '+where,p.slice(0,160));
  if(/\/0(?!\d|[.,])/.test(p))add(k+'|DIV_BY_ZERO '+where,p.slice(0,160));
  if(/\d+\/1(?!\d)/.test(p)&&!/\/1\d/.test(p))add(k+'|DENOM_ONE '+where,p.slice(0,160));
  if(/&(?!lt;|gt;|amp;|nbsp;|quot;|#\d+;)[a-zA-Z]*/.test(txt))add(k+'|ENTITY '+where,txt.slice(0,160));
  if(/\n/.test(txt)&&where!=='e')add(k+'|NEWLINE_IN_'+where,txt.slice(0,160));
  if(/ {2,}/.test(p)&&where!=='e')add(k+'|DOUBLE_SPACE '+where,p.slice(0,160));
  if(/(^|\s)[,.;:](?!\d)/.test(p)&&where!=='e')add(k+'|SPACE_BEFORE_PUNCT '+where,p.slice(0,160));
  if(/\(\s*\)|\[\s*\]/.test(p))add(k+'|EMPTY_BRACKETS '+where,p.slice(0,160));
  if(/\(\s*[+−]\s*\d/.test(p)&&/\(\s*\+\s*\d/.test(p))add(k+'|PAREN_PLUS '+where,p.slice(0,160));
  if(/-\d|\s-\s/.test(p)&&/−/.test(p))add(k+'|MIXED_MINUS '+where,p.slice(0,160));
  if(/\d\.\d/.test(p)&&/,\d/.test(p)===false&&where!=='e'&&!/v\d\.\d/.test(p))add(k+'|DOT_DECIMAL '+where,p.slice(0,120));
  if(/0[.,]\d*000\d?|\d{3,}\d{6,}|\d[.,]\d{7,}/.test(p))add(k+'|LONG_DECIMAL '+where,p.slice(0,160));
}
const meta=run(`T.map(t=>[t.id,t.g.length,t.h.length])`);
let total=0,t0=Date.now();
const stats={};
for(const [id,ng,nh] of meta){
  for(const [lvl,n] of [['g',ng],['h',nh]]){
    for(let i=0;i<n;i++){
      const k=`${id}.${lvl}${i}`;
      let few=0,ok=0,thrown=0;
      for(let r=0;r<K;r++){
        let q;
        try{q=run(`T.find(t=>t.id=='${id}').${lvl}[${i}]()`)}catch(e){thrown++;add(k+'|THROWS',String(e.message).slice(0,120));if(/timed out/.test(e.message))break;continue}
        total++;
        if(!q||typeof q!=='object'){add(k+'|NOT_OBJECT',String(q));continue}
        checkText('q',q.q,k);checkText('a',q.a,k);checkText('e',q.e,k);
        if(q.f!==undefined){if(typeof q.f!=='string')add(k+'|FIG_NOT_STRING','');else if(/NaN|undefined|Infinity|\[object/.test(q.f))add(k+'|FIG_BADTOKEN',q.f.slice(0,100))}
        if(typeof q.q==='string'&&!q.q.trim())add(k+'|EMPTY_Q','');
        if(typeof q.e==='string'&&!q.e.trim())add(k+'|EMPTY_E','');
        if(typeof q.a!=='string'||q.a==='')add(k+'|BAD_A',String(q.a));
        if(!Array.isArray(q.w)){add(k+'|W_NOT_ARRAY','');continue}
        if(q.inp){
          if(q.w.length)add(k+'|INP_HAS_W','');
          const a=q.a;
          if(typeof a==='string'){
            if(a.includes('/')){
              const m=a.match(/^(-?\d+)\/(\d+)$/);
              if(!m)add(k+'|INP_BAD_FRACTION_FORMAT (khong the nhap dung)',a);
              else{ if(gcd(Math.abs(+m[1]),+m[2])!==1)add(k+'|INP_FRACTION_NOT_REDUCED',a); if(+m[2]===1)add(k+'|INP_FRACTION_DENOM_1',a)}
            }else{
              if(!Number.isFinite(Number(a.replace(',','.')))||/[^\d.,\-]/.test(a))add(k+'|INP_ANSWER_UNTYPEABLE (Number NaN)',a);
              else if(/−/.test(a))add(k+'|INP_UNICODE_MINUS',a);
              else if(/,/.test(a))add(k+'|INP_COMMA_IN_ANSWER',a);
              else if(/\.\d{5,}/.test(a))add(k+'|INP_LONG_DECIMAL',a);
              else if(/\.\d*0$/.test(a)&&/\./.test(a))add(k+'|INP_TRAILING_ZERO',a);
              if(Object.is(Number(a),-0)||a==='-0')add(k+'|INP_NEG_ZERO',a);
            }
            if(!/[?]|…|\.\.\.|Tính|Tìm|Hỏi|Có bao|Cho|Xác định|Biết|Hãy|Giá|Số|Tổng|Độ|Khoảng|Thể|Diện|Chu/.test(q.q)&&false)add(k+'|NO_PROMPT','');
          }
        }else{
          if(q.w.length<3){few++;}
          const set=new Set();
          for(const w of q.w){
            if(typeof w!=='string'){add(k+'|W_NOT_STRING',String(w));continue}
            checkText('w',w,k);
            if(w===q.a)add(k+'|W_EQUALS_A',w);
            if(norm(w)===norm(q.a)&&w!==q.a)add(k+'|W_EQUIV_STR_A',w+' ~ '+q.a);
            if(set.has(w))add(k+'|W_DUP',w);set.add(w);
            const nw=num(w),na=num(q.a);
            if(nw!==null&&na!==null&&Math.abs(nw-na)<1e-9&&w!==q.a)add(k+'|W_EQUIV_NUM_A',w+' ~ '+q.a);
          }
          // distractors duplicates numerically
          const ws=q.w.map(num);for(let x=0;x<ws.length;x++)for(let y=x+1;y<ws.length;y++)if(ws[x]!==null&&ws[y]!==null&&Math.abs(ws[x]-ws[y])<1e-9&&q.w[x]!==q.w[y])add(k+'|W_EQUIV_W',q.w[x]+' ~ '+q.w[y]);
          // mixed minus among options
          const opts=[q.a,...q.w];if(opts.some(o=>/^-\d/.test(o))&&opts.some(o=>/^−\d/.test(o)))add(k+'|MIXED_MINUS_OPTIONS',opts.join(' | '));
          // options format inconsistent decimal separators
          if(opts.some(o=>/\d\.\d/.test(strip(o)))&&opts.some(o=>/\d,\d/.test(strip(o))))add(k+'|MIXED_DECIMAL_SEP',opts.join(' | '));
          // answer length giveaway (only a is much longer / unique format) - skip
          // trailing zero
        }
        try{const ar=checkArith(q.e);for(const x of ar.slice(0,2))add(k+'|ARITH_MISMATCH',x.expr+'  [l='+(+x.l.toFixed(4))+' r='+(+x.r.toFixed(4))+']  :: '+strip(q.e).replace(/\n/g,' ⏎ ').slice(0,260))}catch(e){}
        {const pe=strip(q.e).replace(/[−–]/g,'-').replace(/\s+/g,'').replace(/,/g,'.');const pa=strip(q.a).replace(/[−–]/g,'-').replace(/\s+/g,'').replace(/,/g,'.');if(pa&&!pe.includes(pa))add(k+'|ANSWER_NOT_IN_EXPLANATION',q.a+'  :: '+strip(q.e).replace(/\n/g,' ⏎ ').slice(0,200))}
        ok++;
      }
      if(few>0)add(k+'|MCQ_LT3_DISTRACTORS (retry in game) x'+few+'/'+K,'');
      if(few===K)add(k+'|MCQ_ALWAYS_LT3 (cau khong bao gio xuat hien)','');
    }
  }
}
console.log('questions generated',total,'in',((Date.now()-t0)/1000).toFixed(1)+'s');
const byType={};
for(const key of Object.keys(issues)){const t=key.split('|')[1].split(' ')[0];byType[t]=(byType[t]||0)+1}
console.log('issue types (distinct generators):',byType);
require('fs').writeFileSync('fuzz-report.json',JSON.stringify(issues,null,1));
