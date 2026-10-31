/* LỚP 11 · ĐẠI SỐ & GIẢI TÍCH (phần 1): Góc & công thức lượng giác, Hàm số & phương trình lượng giác, Dãy số - CSC - CSN */
(()=>{const {fr,fq,fh,add,addH,sg,pt,ps,qd,uniq,nzr,PY,TV,RD}=GH,
 ANG=[0,30,45,60,90,120,135,150,180],ANT=[0,30,45,60,120,135,150,180],DEG=[30,45,60,90,120,135,150,180,270,360];

/* ===== Góc & công thức lượng giác ===== */
add('t11lg',
()=>{const d=P(DEG);return Z(`Đổi ${d}° sang radian, ta được`,RD[d],DEG.filter(x=>x!=d).map(x=>RD[x]),`Nhân với π/180: ${d}° = ${d}π/180 = ${RD[d]} rad.`)},
()=>{const d=P(DEG);return Z(`Đổi ${RD[d]} rad sang độ, ta được`,d+'°',DEG.filter(x=>x!=d).map(x=>x+'°'),`Nhân với 180°/π: ${RD[d]} rad = ${d}°.`)},
()=>{const f=P([0,1,2]),n=['sin','cos','tan'][f],L=f<2?ANG:ANT,a=P(L),ans=TV[a][f],pool=[...new Set(L.map(x=>TV[x][f]))].filter(v=>v!=ans);return Z(`Giá trị của ${n}(${RD[a]}) bằng`,ans,pool,`${RD[a]} rad = ${a}°. Theo bảng giá trị đặc biệt: ${n} ${a}° = ${ans}.`)},
()=>{const[a,b,c]=P(PY),neg=P([0,1]),ask=P([0,1]),sc=fq(neg?-b:b,c),tn=fq(neg?-a:a,b);return Z(ask?`Cho sin α = ${a}/${c} với ${neg?'π/2 &lt; α &lt; π':'0 &lt; α &lt; π/2'}. Giá trị của cos α là`:`Cho sin α = ${a}/${c} với ${neg?'π/2 &lt; α &lt; π':'0 &lt; α &lt; π/2'}. Giá trị của tan α là`,ask?sc:tn,ask?[fq(neg?b:-b,c),fq(a,c),fq(c,b),fq(b,a)].filter(x=>x!=sc):[fq(neg?a:-a,b),fq(b,a),fq(neg?-b:b,a),fq(a,c)].filter(x=>x!=tn),`cos²α = 1 − sin²α = 1 − ${a*a}/${c*c} = ${b*b}/${c*c}, nên |cos α| = ${b}/${c}. ${neg?'α thuộc góc phần tư thứ hai nên cos α &lt; 0':'α thuộc góc phần tư thứ nhất nên cos α &gt; 0'}: cos α = ${sc}.${ask?'':'\ntan α = sin α / cos α = '+tn+'.'}`)},
()=>{const[a,b,c]=P(PY),ans=fq(2*a*a-c*c,c*c);return Z(`Cho cos α = ${a}/${c}. Giá trị của cos 2α là`,ans,[fq(2*a,c),fq(a*a,c*c),fq(c*c-2*a*a,c*c),fq(2*a*b,c*c),fq(4*a*a,c*c)],`cos 2α = 2cos²α − 1 = 2·${a*a}/${c*c} − 1 = ${ans}.`)},
()=>{const t=P([30,45,60,90,120,135,150]),k=P([0,1,2]),a=R(10,t-5),b=t-a,ba=t+R(5,25),bb=ba-t;let q,i,e;if(k==0){q=`sin ${a}°·cos ${b}° + cos ${a}°·sin ${b}°`;i=0;e=`= sin(${a}° + ${b}°) = sin ${t}°`}else if(k==1){q=`cos ${a}°·cos ${b}° − sin ${a}°·sin ${b}°`;i=1;e=`= cos(${a}° + ${b}°) = cos ${t}°`}else{q=`sin ${ba}°·cos ${bb}° − cos ${ba}°·sin ${bb}°`;i=0;e=`= sin(${ba}° − ${bb}°) = sin ${t}°`}const f=k==1?1:0,ans=TV[t][f],pool=[...new Set(ANG.map(x=>TV[x][f]))].filter(v=>v!=ans);return Z(`Giá trị của biểu thức ${q} bằng`,ans,pool,`Dùng công thức cộng: ${q} ${e} = ${ans}.`)},
()=>{let p,q;do{p=R(2,7);q=R(2,7)}while(p==q);const neg=P([0,1]),s=neg?-p:p;return Z(`Cho tan α = ${fq(s,q)}. Giá trị của cot α là`,fq(q,s),[fq(-q,s),fq(s,q),fq(-s,q),fq(q+1,s),fq(q,s+1)],`cot α = 1/tan α = ${fq(q,s)}.`)}
);
addH('t11lg',
()=>{const L=[[1,2],[3,4],[5,4],[1,3],[2,3],[6,5],[7,5]],[p,q]=P(L);return I(`Biết sin α + cos α = ${p}/${q}. Giá trị của sin α·cos α là (nhập phân số tối giản)`,fr(p*p-q*q,2*q*q),`Bình phương hai vế: 1 + 2sin α·cos α = ${p*p}/${q*q}, nên sin α·cos α = (${p*p}/${q*q} − 1)/2 = ${fq(p*p-q*q,2*q*q)}.`)},
()=>{const t=P([2,3,4,5,-2,-3]);return I(`Biết tan α = ${iz(t)}. Giá trị của biểu thức (sin α + cos α)/(sin α − cos α) là (nhập phân số tối giản hoặc số nguyên)`,fr(t+1,t-1),`Chia tử và mẫu cho cos α: (tan α + 1)/(tan α − 1) = (${iz(t)} + 1)/(${iz(t)} − 1) = ${fq(t+1,t-1)}.`)},
()=>{const t=P([2,3,4,5,6]);return I(`Biết tan α = ${t}. Giá trị của cos 2α là (nhập phân số tối giản)`,fr(1-t*t,1+t*t),`cos 2α = (1 − tan²α)/(1 + tan²α) = (1 − ${t*t})/(1 + ${t*t}) = ${fq(1-t*t,1+t*t)}.`)},
()=>{const r=6*R(1,4),al=P([30,60,90,120,180]);return I(`Một cung của đường tròn bán kính ${r} có số đo ${al}°. Độ dài cung đó bằng kπ. Giá trị của k là`,r*al/180,`Độ dài cung l = R·α với α = ${RD[al]} rad: l = ${r}·${RD[al]} = ${r*al/180}π.`)},
()=>{const k=R(2,8),x=P([30,45,60]),c=x==30?1:x==45?0:-1;return I(`Giá trị của biểu thức ${k}(cos²${x}° − sin²${x}°) bằng (nhập số hoặc phân số tối giản)`,fr(k*c,2),`cos²x − sin²x = cos 2x = cos ${2*x}° = ${c==1?'1/2':c==0?'0':'−1/2'}. Nhân với ${k}: ${fq(k*c,2)}.`)}
);

/* ===== Hàm số & phương trình lượng giác ===== */
const pi=(n,d)=>{const g=gcd(n,d);n/=g;d/=g;const t=n==1?'π':n+'π';return d==1?t:fh(t,d)},
 SOL=[['sin x = 0','x = kπ'],['sin x = 1','x = π/2 + k2π'],['sin x = −1','x = −π/2 + k2π'],['cos x = 1','x = k2π'],['cos x = −1','x = π + k2π'],['cos x = 0','x = π/2 + kπ'],['sin x = 1/2','x = π/6 + k2π hoặc x = 5π/6 + k2π'],['cos x = 1/2','x = ±π/3 + k2π'],['tan x = 1','x = π/4 + kπ'],['tan x = √3','x = π/3 + kπ'],['sin x = √3/2','x = π/3 + k2π hoặc x = 2π/3 + k2π'],['cos x = √2/2','x = ±π/4 + k2π'],['cos x = −1/2','x = ±2π/3 + k2π']],
 CNT=[['sin x = 1/2',2],['sin x = 1',1],['sin x = −1',1],['sin x = 0',3],['sin x = −1/2',2],['cos x = 1',2],['cos x = −1',1],['cos x = 0',2],['cos x = 1/2',2],['tan x = 1',2],['cos x = −√3/2',2]],
 RT=[[1,1],[-1,1],[1,2],[-1,2],[0,1]];
add('t11pt',
()=>{const f=P(['sin','cos','tan','cot']),k=P([2,3,4,6]),b=f=='sin'||f=='cos'?2:1,ans=pi(b,k);return Z(`Chu kỳ của hàm số y = ${f} ${k}x là`,ans,[pi(2*b,k),pi(b,2*k),pi(b*k,1),pi(3-b,k)],`Hàm ${f}(ax) tuần hoàn với chu kỳ ${b==2?'2π':'π'}/|a|. Với a = ${k}: ${ans}.`)},
()=>{const a=R(2,6),b=R(-5,5),f=P(['sin','cos']),c=P([0,1]);return N(`Giá trị ${c?'nhỏ':'lớn'} nhất của hàm số y = ${a}${f} x ${sg(b)} là`,c?b-a:b+a,`−1 ≤ ${f} x ≤ 1 nên ${c?'GTNN':'GTLN'} của y là ${c?`${iz(b)} − ${a}`:`${iz(b)} + ${a}`} = ${iz(c?b-a:b+a)}.`,iz,1)},
()=>{const[u,v,h]=P(PY);return N(`Giá trị lớn nhất của hàm số y = ${u}sin x ${sg(v)}cos x là`,h,`Với y = a·sin x + b·cos x, GTLN = √(a² + b²) = √(${u*u} + ${v*v}) = ${h}.`)},
()=>{const L=[['y = tan x','ℝ∖{π/2 + kπ, k ∈ ℤ}'],['y = cot x','ℝ∖{kπ, k ∈ ℤ}'],['y = 1/sin x','ℝ∖{kπ, k ∈ ℤ}'],['y = 1/cos x','ℝ∖{π/2 + kπ, k ∈ ℤ}']],[f,a]=P(L),all=['ℝ∖{π/2 + kπ, k ∈ ℤ}','ℝ∖{kπ, k ∈ ℤ}','ℝ∖{k2π, k ∈ ℤ}','ℝ','ℝ∖{π/4 + kπ, k ∈ ℤ}'];return Z(`Tập xác định của hàm số ${f} là`,a,all.filter(x=>x!=a),`Hàm số xác định khi mẫu số khác 0, tức là ${f.includes('cos')||f.includes('tan')?'cos x ≠ 0':'sin x ≠ 0'}. Do đó tập xác định là ${a}.`)},
()=>{const[e,s]=P(SOL);return Z(`Nghiệm của phương trình ${e} là (k ∈ ℤ)`,s,SOL.filter(x=>x[1]!=s).map(x=>x[1]),`Đây là phương trình lượng giác cơ bản với giá trị đặc biệt: ${e} ⇔ ${s}.`)},
()=>{const[e,n]=P(CNT);return N(`Số nghiệm của phương trình ${e} trên đoạn [0; 2π] là`,n,`Xét trên đường tròn lượng giác, trong một vòng từ 0 đến 2π (kể cả hai đầu mút) phương trình ${e} có ${n} nghiệm.`)},
()=>{const a=R(2,6),b=R(-4,4);return N(`Giá trị lớn nhất của hàm số y = ${a}cos²x ${sg(b)} là`,a+b,`0 ≤ cos²x ≤ 1 nên GTLN của y đạt khi cos²x = 1: ${a} + ${pa(b)} = ${iz(a+b)}.`,iz,1)}
);
addH('t11pt',
()=>{const[e,n]=P([['sin x = 1/2',2],['cos x = 1/3',2],['sin x = −1/4',2],['cos x = −2/3',2],['tan x = 2',2]]),k=P([2,3,4]);return I(`Số nghiệm của phương trình ${e} trên đoạn [0; ${2*k}π] (đã bỏ trường hợp trùng đầu mút) là`,n*k,`Trên mỗi chu kì 2π phương trình có ${n} nghiệm, đoạn [0; ${2*k}π] gồm ${k} chu kì: ${n}·${k} = ${n*k}.`)},
()=>{const L=[['sin x = 1/2',1],['sin x = √3/2',1],['cos x = 1/2',2],['cos x = √2/2',2],['sin x = −1/2',3],['cos x = −1/2',2],['sin x = −√2/2',3]],[e,k]=P(L);return I(`Tổng các nghiệm của phương trình ${e} trên khoảng (0; 2π) bằng kπ. Giá trị của k là`,k,`Hai nghiệm của phương trình trên (0; 2π) đối xứng nhau; cộng lại được ${k}π.`)},
()=>{let r1,r2;do{r1=P(RT);r2=P(RT)}while(r1==r2);const[p1,q1]=r1,[p2,q2]=r2,cnt=r=>Math.abs(r[0])==1&&r[1]==1?1:2;return I(`Số nghiệm của phương trình ${qd(q1*q2,-(q1*p2+q2*p1),p1*p2,'sin x','sin<sup>2</sup>x')} = 0 trên nửa khoảng [0; 2π) là`,cnt(r1)+cnt(r2),`Coi t = sin x: phương trình có hai nghiệm t = ${fq(p1,q1)} và t = ${fq(p2,q2)}.\nsin x = ±1 cho 1 nghiệm, các giá trị còn lại trong (−1; 1) cho 2 nghiệm trên [0; 2π). Tổng cộng ${cnt(r1)+cnt(r2)} nghiệm.`)},
()=>{const g=P([1,2,4]),[u,v]=P([[1,2],[2,3],[1,3],[3,4],[1,1]]),a=g*u,b=g*v;return I(`Hàm số y = sin ${a}x + cos ${b}x tuần hoàn với chu kỳ nhỏ nhất bằng kπ. Giá trị của k là (nhập số hoặc phân số tối giản)`,fr(2,g),`Chu kỳ của sin ${a}x là 2π/${a}, của cos ${b}x là 2π/${b}. Chu kỳ chung nhỏ nhất là 2π/ƯCLN(${a}; ${b}) = 2π/${g}.`)},
()=>{const[u,v,h]=P(PY),c=R(-4,4);return I(`Giá trị lớn nhất của hàm số y = ${u}sin x ${sg(v)}cos x ${sg(c)} bằng`,h+c,`GTLN của ${u}sin x ${sg(v)}cos x là √(${u*u} + ${v*v}) = ${h}; cộng với ${iz(c)} được ${iz(h+c)}.`)}
);

/* ===== Dãy số, cấp số cộng, cấp số nhân ===== */
const seq=a=>a.join('; ');
add('t11ds',
()=>{const u=R(-8,10),d=nzr(-5,6),n=R(5,12);return N(`Cấp số cộng (u<sub>n</sub>) có u<sub>1</sub> = ${iz(u)} và công sai d = ${iz(d)}. Số hạng u<sub>${n}</sub> bằng`,u+(n-1)*d,`u<sub>n</sub> = u<sub>1</sub> + (n − 1)d = ${iz(u)} + ${n-1}·${pa(d)} = ${iz(u+(n-1)*d)}.`,iz,1)},
()=>{const u=R(-8,10),d=nzr(-5,6),k=R(4,9);return N(`Cấp số cộng (u<sub>n</sub>) có u<sub>1</sub> = ${iz(u)} và u<sub>${k}</sub> = ${iz(u+(k-1)*d)}. Công sai d bằng`,d,`u<sub>${k}</sub> = u<sub>1</sub> + ${k-1}d nên d = (${iz(u+(k-1)*d)} − ${pa(u)})/${k-1} = ${iz(d)}.`,iz,1)},
()=>{const u=R(-5,8),d=nzr(-4,5),n=R(6,15),S=n*(2*u+(n-1)*d)/2;return N(`Cấp số cộng có u<sub>1</sub> = ${iz(u)}, công sai d = ${iz(d)}. Tổng S<sub>${n}</sub> của ${n} số hạng đầu bằng`,S,`S<sub>n</sub> = n[2u<sub>1</sub> + (n − 1)d]/2 = ${n}·[${2*u} + ${n-1}·${pa(d)}]/2 = ${iz(S)}.`,iz,1)},
()=>{const u=nzr(-4,5),q=P([2,3,-2,-3]),n=R(4,6);return N(`Cấp số nhân (u<sub>n</sub>) có u<sub>1</sub> = ${iz(u)} và công bội q = ${iz(q)}. Số hạng u<sub>${n}</sub> bằng`,u*q**(n-1),`u<sub>n</sub> = u<sub>1</sub>·q<sup>n−1</sup> = ${iz(u)}·${pa(q)}<sup>${n-1}</sup> = ${iz(u*q**(n-1))}.`,iz,1)},
()=>{const u=nzr(-4,5),q=P([2,3,4,-2,-3,5]);return N(`Cấp số nhân (u<sub>n</sub>) có u<sub>1</sub> = ${iz(u)} và u<sub>2</sub> = ${iz(u*q)}. Công bội q bằng`,q,`q = u<sub>2</sub>/u<sub>1</sub> = ${iz(u*q)}/${pa(u)} = ${iz(q)}.`,iz,1)},
()=>{const k=R(2,6),m=R(-6,6),p=R(3,8);return N(`Cho dãy số (u<sub>n</sub>) với u<sub>n</sub> = n² ${sg(-k)}n ${sg(m)}. Số hạng u<sub>${p}</sub> bằng`,p*p-k*p+m,`u<sub>${p}</sub> = ${p}² ${sg(-k)}·${p} ${sg(m)} = ${iz(p*p-k*p+m)}.`,iz,1)},
()=>{const geo=P([0,1]),a=R(1,4),d=R(2,5),q=P([2,3]),A=[0,1,2,3].map(i=>a+i*d),G=[0,1,2,3].map(i=>a*q**i),S=[0,1,2,3].map(i=>(i+a)**2),M=geo?[a,a*q,a*q*q+1,a*q**3]:[a,a+d,a+2*d+1,a+3*d];const ans=geo?seq(G):seq(A),w=geo?[seq(A),seq(S),seq(M)]:[seq(G),seq(S),seq(M)];return Z(`Dãy số nào sau đây là ${geo?'cấp số nhân':'cấp số cộng'}?`,ans,w,geo?`Dãy ${ans} có thương hai số hạng liên tiếp không đổi (bằng ${q}).`:`Dãy ${ans} có hiệu hai số hạng liên tiếp không đổi (bằng ${d}).`)},
()=>{const a=R(1,9),d=R(1,6);return N(`Ba số ${a}, x, ${a+2*d} theo thứ tự đó lập thành một cấp số cộng. Giá trị của x bằng`,a+d,`Ba số a, b, c lập cấp số cộng ⇔ b = (a + c)/2: x = (${a} + ${a+2*d})/2 = ${a+d}.`)}
);
addH('t11ds',
()=>{const u=R(-8,10),d=nzr(-4,5),n=R(8,30);return I(`Cấp số cộng có u<sub>1</sub> = ${iz(u)}, công sai d = ${iz(d)} và số hạng u<sub>n</sub> = ${iz(u+(n-1)*d)}. Số hạng thứ n có n bằng`,n,`u<sub>n</sub> = u<sub>1</sub> + (n − 1)d ⇒ n = (u<sub>n</sub> − u<sub>1</sub>)/d + 1 = (${iz(u+(n-1)*d)} − ${pa(u)})/${pa(d)} + 1 = ${n}.`)},
()=>{const u=R(1,5),q=P([2,3,-2]),n=R(4,6),S=u*(q**n-1)/(q-1);return I(`Cấp số nhân có u<sub>1</sub> = ${u}, công bội q = ${iz(q)}. Tổng của ${n} số hạng đầu bằng`,S,`S<sub>n</sub> = u<sub>1</sub>(q<sup>n</sup> − 1)/(q − 1) = ${u}·(${pa(q)}<sup>${n}</sup> − 1)/(${iz(q-1)}) = ${iz(S)}.`)},
()=>{const m=R(3,12),k=R(1,5);return I(`Ba số hạng liên tiếp của một cấp số cộng tăng có tổng bằng ${3*m} và hiệu giữa số hạng lớn nhất và số hạng nhỏ nhất bằng ${2*k}. Số hạng lớn nhất bằng`,m+k,`Gọi ba số là x − d, x, x + d. Tổng 3x = ${3*m} nên x = ${m}. Hiệu lớn nhất − nhỏ nhất = 2d = ${2*k} nên d = ${k}. Số lớn nhất: ${m} + ${k} = ${m+k}.`)},
()=>{const m=R(2,4),d=R(2,5),a=R(-5,6),b=a+(m+1)*d;return I(`Chèn ${m} số vào giữa hai số ${iz(a)} và ${iz(b)} để được một cấp số cộng có ${m+2} số hạng. Tổng của ${m} số vừa chèn bằng`,m*(a+b)/2,`Cấp số cộng có ${m+2} số hạng, u<sub>1</sub> = ${iz(a)}, u<sub>${m+2}</sub> = ${iz(b)}, công sai d = ${iz(d)}. Tổng ${m} số ở giữa = ${m}·(${a} + ${b})/2 = ${iz(m*(a+b)/2)}.`)},
()=>{const k=P([3,4,5,6,7]),m=R(8,18),N_=m*k+R(0,k-1);return I(`Tổng của tất cả các số tự nhiên chia hết cho ${k} và không vượt quá ${N_} bằng`,k*m*(m+1)/2,`Các số là ${k}, ${2*k}, …, ${m*k}: cấp số cộng có ${m} số hạng, tổng = ${m}·(${k} + ${m*k})/2 = ${k*m*(m+1)/2}.`)}
);
})();
