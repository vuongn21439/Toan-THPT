/* TOÁN THPT: dữ liệu chung. T = danh sách chủ đề (lớp 10, 11, 12), I/F = kiểu câu hỏi, GH = hàm hỗ trợ viết câu hỏi.
   Q, N, Z (trắc nghiệm) nằm ở js/core/helpers.js. I = học sinh tự nhập đáp án. */
const T=[],CD={},
I=(q,a,e,f)=>({q:tidy(q),a:''+a,w:[],e:tidy(e),inp:1,f}),
F=(o,f)=>(o.f=f,o),
M2=x=>Math.round(x*100)/100,
f2=x=>String(M2(x)).replace('.',','),
fd=(x,k=4)=>String(+(+x).toFixed(k)).replace('.',','),   /* số thập phân dùng dấu phẩy */
dn=x=>String(+(+x).toFixed(6));                           /* đáp án nhập: số thập phân dùng dấu chấm (chk chấp nhận cả dấu phẩy) */

/* ZE: trắc nghiệm có đáp án nhiễu được thiết kế theo lỗi hay gặp.
   errs = [[đáp án sai, lý do sai], ...] (nên đưa nhiều hơn 3, hàm chọn ngẫu nhiên 3 đáp án khác nhau, khác đáp án đúng).
   steps = mảng các bước giải (tự đánh số "Bước 1:", "Bước 2:", …) hoặc chuỗi.
   Lời giải hiện thêm phần "Lỗi hay gặp" giải thích vì sao 3 đáp án nhiễu trên màn hình là sai. */
const bodyOf=(steps,a)=>(Array.isArray(steps)?steps.map((s,i)=>`Bước ${i+1}: ${s}`).join('\n'):steps)+(a!==undefined?`\n✅ Kết quả: ${a}`:''),
ZE=(q,a,errs,steps)=>{const sk=v=>{v=tidy(String(v));const k=nkey(v);return k===null?'s'+v:'n'+k},seen=new Set([sk(a)]),pick=[];
 for(const[v,r]of sh(errs)){const t=String(v),k=sk(t);if(!seen.has(k)){seen.add(k);pick.push([t,r])}if(pick.length==3)break}
 /* thiếu đáp án nhiễu thì thêm số lệch ±; số có dấu chấm ngăn cách nghìn (37.370) được hiểu là số nguyên chứ không phải 37,37 */
 const A=String(a),th=/^-?\d{1,3}(\.\d{3})+$/.test(A.replace('−','-')),na=th?+A.replace('−','-').replace(/\./g,''):Number(A.replace('−','-').replace(',','.'));
 if(pick.length<3&&Number.isFinite(na)&&A.trim()!==''&&!/[a-zA-Z\/]/.test(A.replace(/<[^>]*>/g,''))){
  const sc=th?10**Math.min(3,String(Math.abs(na)).match(/0*$/)[0].length):1,
  fmt=v=>th?iz(String(v)).replace(/\B(?=(\d{3})+(?!\d))/g,'.'):Number.isInteger(na)?iz(v):String(+v.toFixed(4)).replace('.',',').replace('-','−');
  for(const d of sh([1,-1,2,-2,3,-3,10,-10])){const v=na+(Number.isInteger(na)?d*sc:d/10),t=fmt(v),k=sk(t);if(!seen.has(k)){seen.add(k);pick.push([t,'sai số học ở bước tính cuối (đáp án gần đúng nhưng không đúng)'])}if(pick.length==3)break}}
 return Q(q,A,pick.map(x=>x[0]),bodyOf(steps,a)+(pick.length?'\n⚠️ Lỗi hay gặp:\n'+pick.map(x=>`• ${x[0]}: ${x[1]}`).join('\n'):''))},
/* IE: câu tự nhập đáp án, lời giải từng bước */
IE=(q,a,steps)=>I(q,a,bodyOf(steps,undefined)+`\n✅ Kết quả: ${a}`);

const GH=(()=>{
 /* fr: phân số tối giản 'a/b' (dấu - thường, dùng làm đáp án nhập); fq: như fr nhưng dấu − đẹp; fh: phân số có chữ (html) */
 const fr=(n,d=1)=>{if(d<0){n=-n;d=-d}const g=gcd(Math.abs(n),d)||1;return d/g==1?''+n/g:n/g+'/'+d/g},
 fq=(n,d=1)=>fr(n,d).replace('-','−'),
 fh=(n,d)=>`<span class="fr"><b>${n}</b><b>${d}</b></span>`,
 add=(id,...f)=>T.find(t=>t.id==id).g.push(...f),
 addH=(id,...f)=>T.find(t=>t.id==id).h.push(...f),
 /* sg: dấu + số hạng, ví dụ sg(-3) = '− 3', sg(5) = '+ 5' */
 sg=a=>a<0?'− '+(-a):'+ '+a,
 /* pt: toạ độ '(1; −2)' */
 pt=(...v)=>'('+v.map(iz).join('; ')+')',
 /* ps: đa thức từ mảng hệ số c[i] của x^i, ví dụ [5,-2,0,3] → 3x^3 − 2x + 5 */
 ps=(c,v='x')=>{let s='';for(let i=c.length-1;i>=0;i--){const a=c[i];if(!a)continue;const m=Math.abs(a),t=i?(m==1?'':m)+v+(i>1?'^'+i:''):''+m;s+=(s?(a<0?' − ':' + '):(a<0?'−':''))+t}return s||'0'},
 /* ax + by (A, B khác 0) và ax + by + c = 0 */
 lh=(A,B)=>(A==1?'':A==-1?'−':iz(A))+'x '+(B<0?'− ':'+ ')+(Math.abs(B)==1?'':Math.abs(B))+'y',
 ln=(A,B,C)=>lh(A,B)+(C?' '+sg(C):'')+' = 0',
 /* nhiều đáp án sai, bỏ trùng với đáp án đúng */
 uniq=(c,w)=>[...new Set(w.map(String))].filter(x=>x!=c),
 /* số nguyên ngẫu nhiên khác 0 */
 nzr=(a,b)=>{let v;do v=R(a,b);while(!v);return v},
 /* bộ ba (a,b,c) có √(a²+b²+c²) nguyên: dùng cho độ dài vectơ, khoảng cách trong không gian */
 NT=[[1,2,2,3],[2,4,4,6],[2,3,6,7],[1,4,8,9],[2,6,9,11],[3,6,6,9],[4,4,7,9],[3,4,12,13],[2,10,11,15],[6,6,7,11]],
 /* cặp (a,b,c) nguyên với a²+b²=c² */
 PY=[[3,4,5],[4,3,5],[6,8,10],[8,6,10],[5,12,13],[12,5,13],[9,12,15],[8,15,17],[15,8,17],[7,24,25]],
 /* bảng giá trị lượng giác đặc biệt: góc (độ) → [sin, cos, tan] dạng html; null = không xác định */
 V2=fh('√2',2),V3=fh('√3',2),V33=fh('√3',3),
 TV={0:['0','1','0'],30:[fh(1,2),V3,V33],45:[V2,V2,'1'],60:[V3,fh(1,2),'√3'],90:['1','0',null],120:[V3,'−'+fh(1,2),'−√3'],135:[V2,'−'+V2,'−1'],150:[fh(1,2),'−'+V3,'−'+V33],180:['0','−1','0']},
 /* góc đặc biệt dưới dạng rad (html) */
 RD={0:'0',30:fh('π',6),45:fh('π',4),60:fh('π',3),90:fh('π',2),120:fh('2π',3),135:fh('3π',4),150:fh('5π',6),180:'π',270:fh('3π',2),360:'2π'},
 /* số phức a + bi */
 cx=(a,b)=>{if(!b)return iz(a);const bi=(Math.abs(b)==1?'':Math.abs(b))+'i';if(!a)return(b<0?'−':'')+bi;return iz(a)+(b<0?' − ':' + ')+bi},
 /* hạng tử bậc hai theo biến v (ví dụ 'sin x'): a·v² + b·v + c */
 qd=(a,b,c,v,v2)=>{let s='';const t=(k,x)=>{if(!k)return;const m=Math.abs(k),u=(m==1?'':m)+x;s+=(s?(k<0?' − ':' + '):(k<0?'−':''))+u};t(a,v2);t(b,v);if(c)s+=(s?(c<0?' − ':' + '):(c<0?'−':''))+Math.abs(c);return s||'0'};
 return{fr,fq,fh,add,addH,sg,pt,ps,lh,ln,uniq,nzr,NT,PY,TV,RD,cx,qd}
})();
