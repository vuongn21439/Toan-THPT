/* Hàm dùng chung: ngẫu nhiên, ước chung, định dạng số, tạo câu hỏi (Q, N, Z), hiển thị phân số/lũy thừa (H) */
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),P=a=>a[R(0,a.length-1)],
sh=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]),
gcd=(a,b)=>b?gcd(b,a%b):a,
iz=v=>String(v).replace('-','−'),
pa=v=>v<0?'(−'+(-v)+')':''+v,
dc=v=>(v/10).toFixed(1).replace('.',','),
dd=v=>(v/100).toFixed(2).replace('.',','),
rom=n=>{let s='';[[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']].forEach(([v,r])=>{while(n>=v){s+=r;n-=v}});return s},
Q=(q,a,w,e)=>tq({q,a,w,e}),
nums=(c,z)=>{const ok=v=>Number.isInteger(v)&&v!=c&&(z||v>=0),typ=[];if(z&&c!=0)typ.push(-c);if(c!=0)typ.push(2*c);if(c%2==0&&c!=0)typ.push(c/2);const near=[1,-1,2,-2,3,-3,5,-5,10,-10].map(d=>c+d).filter(ok),s=new Set(),t0=typ.filter(ok);if(t0.length&&c!=0&&Math.abs(c)<=500)s.add(P(t0));let g=0;while(s.size<3&&g++<99)s.add(P(near.length?near:[c+1,c+2,c+3]));return[...s].slice(0,3)},
N=(q,c,e,f=String,z)=>Q(q,f(c),nums(c,z).map(f),e),
cop=(lo,hi)=>{let x,y;do{x=R(lo,hi);y=R(lo,hi)}while(x==y||gcd(x,y)!=1);return[x,y]},
/* H: hiển thị. a/b (kể cả số thập phân 0,3/0,8) thành phân số; không đụng vào số mũ như x^2/3 */
H=s=>String(s).replace(/(?<![\d.,^])(\d+(?:[.,]\d+)?)\/(\d+(?:[.,]\d+)?)/g,'<span class="fr"><b>$1</b><b>$2</b></span>').replace(/\^(\d+)/g,'<sup>$1</sup>');

/* ===== Dọn lỗi hiển thị chung cho đề, đáp án, lời giải (chạy tự động trong Q và I) =====
   "x + −4" → "x − 4", "m − −1" → "m + 1", dấu - thường → dấu − đẹp, "1x" → "x", "+ 0x" bị bỏ,
   "(x+3)^1" → "(x+3)", số thập phân dùng dấu phẩy, số dài 0,3333333 được làm tròn. Chỉ sửa phần chữ, không đụng thẻ HTML. */
const OPD='[\\d(√a-zA-Zπα-ω]',
tidyP=p=>{
 p=p.replace(/(^|[\s(\[=·\/;,:^×+−→])-(?=[\d(√a-zA-Zπα-ω])/g,'$1−').replace(/(\s)-(\s)/g,'$1−$2').replace(/(\s)-(\s)/g,'$1−$2');
 p=p.replace(new RegExp('([+−])\\s*([+−])\\s*(?='+OPD+')','g'),(m,a,b,o,str)=>(a==b?'+':'−')+(o>0&&/\s/.test(str[o-1])?' ':''));
 p=p.replace(/(^|[^\d.,a-zA-Zα-ωπ_⟦\/^²³])1(?=(?:[xyzt](?![a-zA-Zα-ω])|π|sin|cos|tan|cot|ln|log|e\^))/g,'$1');
 p=p.replace(/\^1(?!\d)/g,'');
 p=p.replace(/(?<![\d.,])(\d+)\.(\d+)(?![\d]*[.,]\d)/g,(m,i,d)=>(d.length==3&&i.length<=3&&i[0]!='0')?m:i+','+d);
 p=p.replace(/(\d+)[.,](\d{10,})/g,(m,i,d)=>(+(i+'.'+d)).toFixed(4).replace(/0+$/,'').replace(/\.$/,'').replace('.',','));
 return p.replace(/ {2,}/g,' ')},
tidy=s=>{if(typeof s!=='string')return s;
 s=s.split(/(<[^>]*>)/).map((p,i)=>i%2?p:tidyP(p)).join('');
 return s.replace(/\s[+−]\s0[xyzt]0?(?:[²³]|\^\d|<sup>[^<]*<\/sup>)?(?:<sub>[^<]*<\/sub>)?(?![\w])/g,'').replace(/(^|[:=(]\s|\s|\()0([xyz])\s([+−])\s/g,(m,q,v,g)=>q+(g=='−'?'−':''))},
/* giá trị số của một đáp án (số nguyên có dấu chấm ngăn cách nghìn, số thập phân dấu phẩy, phân số a/b); null nếu không phải số */
nkey=s=>{s=String(s).replace(/<[^>]*>/g,'').replace(/\s/g,'').replace(/[−–]/g,'-');if(/^-?\d{1,3}(\.\d{3})+$/.test(s))return +s.replace(/\./g,'');const m=s.match(/^(-?\d+)\/(\d+)$/);if(m)return +m[2]?+m[1]/+m[2]:null;s=s.replace(',','.');return /^-?\d+(\.\d+)?$/.test(s)?+s:null},
/* loại đáp án nhiễu trùng đáp án đúng hoặc trùng nhau (kể cả "0,5" và "0,50", "1/2" và "0,5") */
dstn=(c,w)=>{const seen=new Set([String(c),String(nkey(c))]),o=[];for(const x of w){const k=nkey(x),t=k===null?'s'+x:'n'+k;if(x==c||seen.has(String(x))||(k!==null&&seen.has(String(k))))continue;seen.add(String(x));if(k!==null)seen.add(String(k));o.push(x)}return o},
padn=(c,w)=>{if(w.length>=3)return w;const na=nkey(c),s=String(c).replace(/<[^>]*>/g,'').trim();if(na===null||/\//.test(s))return w;
 const th=/^-?\d{1,3}(\.\d{3})+$/.test(s.replace('−','-')),dp=th?0:((s.match(/[.,](\d+)$/)||[,''])[1]).length,st=th?10**Math.min(3,String(Math.abs(na)).match(/0*$/)[0].length):10**-dp,o=[...w],seen=new Set([String(c),String(na),...w.map(x=>String(nkey(x)))]);
 const fmtn=v=>{let t=dp?v.toFixed(dp).replace('.',','):String(Math.round(v));if(th)t=t.replace(/\B(?=(\d{3})+(?!\d))/g,'.');return t.replace('-','−')};
 for(const d of sh([1,-1,2,-2,3,-3,5,-5])){const v=na+d*st;if(v<0&&na>=0)continue;const t=fmtn(v),k=String(nkey(t));if(!seen.has(t)&&!seen.has(k)){seen.add(t);seen.add(k);o.push(t)}if(o.length>=3)break}return o},
tq=o=>{o.q=tidy(o.q);o.e=tidy(o.e);if(!o.inp){o.a=tidy(o.a);o.w=dstn(o.a,o.w.map(tidy))}return o};

const fs=(a,b)=>{const g=gcd(a,b);return b/g==1?''+a/g:`${a/g}/${b/g}`},
Z=(q,c,w,e)=>{c=tidy(c);return Q(q,c,padn(c,dstn(c,w.map(tidy))).slice(0,3),e)},
isP=n=>{for(let i=2;i*i<=n;i++)if(n%i==0)return false;return n>1},
nz=()=>{let v;do v=R(-9,9);while(!v);return v},
A=(id,...f)=>T.find(t=>t.id==id).g.push(...f);
