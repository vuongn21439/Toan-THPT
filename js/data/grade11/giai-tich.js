/* LỚP 11 · ĐẠI SỐ & GIẢI TÍCH (phần 2): Giới hạn & hàm số liên tục, Đạo hàm, Hàm số mũ & lôgarit */
(()=>{const {fr,fq,fh,add,addH,sg,pt,ps,uniq,nzr}=GH,
 lim=(s,e)=>`lim<sub>${s}</sub> ${e}`,fac=p=>p?`x ${sg(-p)}`:'x';

/* ===== Giới hạn & hàm số liên tục ===== */
const QP=[[1,2],[-1,3],[2,3],[3,2],[1,1]];
add('t11gh',
()=>{const a=nzr(-6,6),c=nzr(-6,6),b=R(-5,5),d=R(-5,5);const ans=fr(a,c);return Z(`Tính ${lim('n→+∞',fh(ps([b,a],'n'),ps([d,c],'n')))}`,ans,[fr(c,a),d?fr(b,d):'0',fr(a+b,c+d||1),'0','+∞','1','−∞',fr(a,c+1||2)],`Chia tử và mẫu cho n: giới hạn bằng tỉ số hai hệ số của n: ${a}/${pa(c)} = ${fq(a,c)}.`)},
()=>{const a=nzr(-5,5),d=nzr(-5,5),b=R(-5,5),c=R(-5,5),e=R(-5,5),f=R(-5,5),ans=fr(a,d);return Z(`Tính ${lim('n→+∞',fh(ps([c,b,a],'n'),ps([f,e,d],'n')))}`,ans,[fr(d,a),fr(b,e||1),'0','+∞',fr(c,f||1),'1','−∞'],`Chia tử và mẫu cho n²: giới hạn bằng tỉ số hai hệ số của n²: ${fq(a,d)}.`)},
()=>{const a=nzr(-3,3),b=R(-5,5),c=R(-6,6),x=R(-3,3);return N(`Tính ${lim(`x→${iz(x)}`,`(${ps([c,b,a])})`)}`,a*x*x+b*x+c,`Hàm đa thức liên tục nên thay x = ${iz(x)}: ${iz(a*x*x+b*x+c)}.`,iz,1)},
()=>{const p=nzr(-5,5);let q;do q=R(-6,6);while(q==p);const ans=p-q;return N(`Tính ${lim(`x→${iz(p)}`,fh(ps([p*q,-(p+q),1]),fac(p)))}`,ans,`Phân tích tử: ${ps([p*q,-(p+q),1])} = (x ${sg(-p)})(x ${sg(-q)}). Rút gọn (x ${sg(-p)}) được x ${sg(-q)}. Thay x = ${iz(p)}: ${iz(p)} ${sg(-q)} = ${iz(ans)}.`,iz,1)},
()=>{const[q,l]=P([['1/2','0'],['−1/3','0'],['2/3','0'],['2','+∞'],['3','+∞'],['3/2','+∞'],['1','1'],['−2','Không tồn tại']]),all=['0','1','+∞','Không tồn tại'];return Z(`Tính ${lim('n→+∞',`(${q})<sup>n</sup>`)}`,l,all.filter(x=>x!=l).concat('−∞'),`${l=='0'?'Với |q| &lt; 1 thì q<sup>n</sup> → 0.':l=='+∞'?'Với q &gt; 1 thì q<sup>n</sup> → +∞.':l=='1'?'1<sup>n</sup> = 1 với mọi n.':'Với q &lt; −1 thì q<sup>n</sup> đổi dấu và tăng về vô cực nên không có giới hạn.'}`)},
()=>{const a=nzr(-5,5),c=nzr(-5,5),b=R(-5,5),d=R(-5,5),t=P([0,1,2]);let q,ans,e;if(t==0){q=fh(ps([b,a],'n'),ps([d,0,c],'n'));ans='0';e='Bậc của tử nhỏ hơn bậc của mẫu nên giới hạn bằng 0.'}else if(t==1){q=fh(ps([b,0,a],'n'),ps([d,c],'n'));ans=a/c>0?'+∞':'−∞';e=`Bậc của tử lớn hơn bậc của mẫu nên giới hạn là vô cực; dấu theo dấu của ${iz(a)}/${pa(c)}: ${ans}.`}else{q=fh(ps([b,a],'n'),ps([d,c],'n'));ans=fr(a,c);e=`Cùng bậc nên giới hạn bằng tỉ số hệ số: ${fq(a,c)}.`}return Z(`Tính ${lim('n→+∞',q)}`,ans,['0','+∞','−∞',fr(a,c),fr(c,a)],e)},
()=>{const a=R(1,6),k=R(2,5),ans=fr(a*k,k-1);return Z(`Tổng của cấp số nhân lùi vô hạn có số hạng đầu u<sub>1</sub> = ${a} và công bội q = 1/${k} là`,ans,[fr(a,k-1),fr(a*k,k+1),fr(a,k),fr(a*(k-1),k)],`S = u<sub>1</sub>/(1 − q) = ${a}/(1 − 1/${k}) = ${a}/(${k-1}/${k}) = ${fq(a*k,k-1)}.`)},
()=>{const p=nzr(-5,5);return N(`Cho hàm số f(x) = ${fh(`x² − ${p*p}`,fac(p))} nếu x ≠ ${iz(p)}, và f(${iz(p)}) = m. Hàm số liên tục tại x = ${iz(p)} khi m bằng`,2*p,`Giới hạn khi x → ${iz(p)}: (x² − ${p*p})/(x ${sg(-p)}) = x ${sg(p)} → ${iz(2*p)}. Liên tục khi m = ${iz(2*p)}.`,iz,1)}
);
addH('t11gh',
()=>{let a,c,s;do{a=nzr(-6,6);s=R(1,5);c=s*s-a}while(!c);return I(`Tính ${lim(`x→${iz(c)}`,fh(`√(x ${sg(a)}) − ${s}`,fac(c)))} (nhập phân số tối giản)`,fr(1,2*s),`Nhân lượng liên hợp: (√(x ${sg(a)}) − ${s})/(x ${sg(-c)}) = 1/(√(x ${sg(a)}) + ${s}). Thay x = ${iz(c)}: 1/(${s} + ${s}) = ${fq(1,2*s)}.`)},
()=>{const a=nzr(-8,8),b=R(-5,5);return I(`Tính ${lim('x→+∞',`(√(x² ${sg(a)}x ${sg(b)}) − x)`)} (nhập số hoặc phân số tối giản)`,fr(a,2),`Nhân lượng liên hợp: (${a}x ${sg(b)})/(√(x² ${sg(a)}x ${sg(b)}) + x). Chia tử và mẫu cho x: giới hạn = ${a}/(1 + 1) = ${fq(a,2)}.`)},
()=>{const k=R(2,6);return I(`Tính ${lim('n→+∞',fh('1 + 2 + 3 + … + n',`${k}n²`))} (nhập phân số tối giản)`,fr(1,2*k),`Ta có 1 + 2 + … + n = n(n + 1)/2. Khi đó giới hạn = lim n(n + 1)/(2·${k}n²) = 1/${2*k}.`)},
()=>{let p,a,c,m;do{p=nzr(-4,5);a=P([1,2,3,-1,-2]);m=nzr(-4,4);c=2*p-a*m}while(!c);return I(`Cho f(x) = ${fh(`x² − ${p*p}`,fac(p))} nếu x ≠ ${iz(p)}, và f(${iz(p)}) = ${a==1?'':a==-1?'−':a}m ${sg(c)}. Hàm số liên tục tại x = ${iz(p)} khi m bằng`,m,`Giới hạn khi x → ${iz(p)} bằng ${iz(2*p)}. Liên tục khi ${a==1?'':a==-1?'−':a}m ${sg(c)} = ${iz(2*p)}, suy ra m = ${iz(m)}.`)},
()=>{const k=R(1,7),p=R(1,7);return I(`Tính ${lim('x→0',fh(`sin ${k}x`,`${p}x`))} (nhập phân số tối giản hoặc số nguyên)`,fr(k,p),`Dùng lim sin(u)/u = 1: sin ${k}x/(${p}x) = (${k}/${p})·sin(${k}x)/(${k}x) → ${fq(k,p)}.`)}
);

/* ===== Đạo hàm ===== */
const fd3=(a,b,c,d)=>ps([d,c,b,a]);
add('t11dh',
()=>{const a=nzr(-3,3),b=R(-4,4),c=R(-5,5),d=R(-5,5),x=R(-2,3),v=3*a*x*x+2*b*x+c;return N(`Cho f(x) = ${fd3(a,b,c,d)}. Giá trị f′(${iz(x)}) bằng`,v,`f′(x) = ${ps([c,2*b,3*a])}. Thay x = ${iz(x)}: f′(${iz(x)}) = ${iz(v)}.`,iz,1)},
()=>{const a=nzr(-3,3),b=R(-4,4),c=R(-5,5),d=R(-5,5),ans=ps([c,2*b,3*a]);return Z(`Đạo hàm của hàm số y = ${fd3(a,b,c,d)} là`,ans,[ps([c,b,3*a]),ps([c,2*b,a]),ps([d,2*b,3*a]),ps([c+1,2*b,3*a]),ps([c,2*b,3*a-1])],`Dùng (x<sup>n</sup>)′ = n·x<sup>n−1</sup> và đạo hàm hằng số bằng 0: y′ = ${ans}.`)},
()=>{const a=nzr(-5,5),b=nzr(-5,5),x=R(-3,3);return N(`Cho f(x) = (x ${sg(a)})(x ${sg(b)}). Giá trị f′(${iz(x)}) bằng`,2*x+a+b,`Khai triển f(x) = ${ps([a*b,a+b,1])}, nên f′(x) = ${ps([a+b,2])}. Tại x = ${iz(x)}: ${iz(2*x+a+b)}.`,iz,1)},
()=>{const a=nzr(-4,4),b=nzr(-4,4),c=nzr(-3,3);return N(`Cho f(x) = ${fh(ps([b,a]),ps([1,c]))}. Giá trị f′(0) bằng`,a-b*c,`f′(x) = [a·(cx + 1) − (ax + b)·c]/(cx + 1)². Tại x = 0: f′(0) = (${pa(a)}·1 − ${pa(b)}·${pa(c)})/1 = ${iz(a-b*c)}.`,iz,1)},
()=>{const a=nzr(-3,3),b=R(-5,5),c=R(-5,5),x=R(-3,3);return N(`Hệ số góc của tiếp tuyến của đồ thị hàm số y = ${ps([c,b,a])} tại điểm có hoành độ x = ${iz(x)} bằng`,2*a*x+b,`Hệ số góc bằng đạo hàm tại điểm đó: y′ = ${ps([b,2*a])}, y′(${iz(x)}) = ${iz(2*a*x+b)}.`,iz,1)},
()=>{const a=nzr(-3,3),b=R(-4,4),c=R(-5,5),x=R(-3,3),k=2*a*x+b,y=a*x*x+b*x+c,m=y-k*x,ans=ps([m,k]);return Z(`Phương trình tiếp tuyến của đồ thị hàm số y = ${ps([c,b,a])} tại điểm có hoành độ x = ${iz(x)} là`,`y = ${ans}`,[ps([m,-k]),ps([y,k]),ps([m+1,k]),ps([-m,k]),ps([m,k+1]),ps([m+2,k]),ps([m-1,k]),ps([m,k+2])].map(s=>'y = '+s),`y′ = ${ps([b,2*a])}, f′(${iz(x)}) = ${iz(k)}, f(${iz(x)}) = ${iz(y)}.\nTiếp tuyến: y = ${iz(k)}(${fac(x)}) ${sg(y)} hay y = ${ans}.`)},
()=>{const a=nzr(-5,5),b=nzr(-5,5),t=R(0,3);const L=[[`y = ${a}sin x ${sg(b)}x`,'y′(0)',a+b,`y′ = ${a}cos x ${sg(b)}, y′(0) = ${iz(a+b)}.`],[`y = ${a}cos x ${sg(b)}x`,'y′(0)',b,`y′ = ${iz(-a)}sin x ${sg(b)}, y′(0) = ${iz(b)}.`],[`y = ${a}ln x ${sg(b)}x`,'y′(1)',a+b,`y′ = ${a}/x ${sg(b)}, y′(1) = ${iz(a+b)}.`],[`y = ${a}e<sup>x</sup> ${sg(b)}x`,'y′(0)',a+b,`y′ = ${a}e<sup>x</sup> ${sg(b)}, y′(0) = ${iz(a+b)}.`]],[f,g,v,e]=L[t];return N(`Cho hàm số ${f}. Giá trị ${g} bằng`,v,e,iz,1)},
()=>{const a=nzr(-3,3),b=R(-4,4),c=R(-5,5),d=R(-5,5),x=R(-3,3),v=6*a*x+2*b;return N(`Cho f(x) = ${fd3(a,b,c,d)}. Giá trị đạo hàm cấp hai f″(${iz(x)}) bằng`,v,`f′(x) = ${ps([c,2*b,3*a])}, f″(x) = ${ps([2*b,6*a])}. Tại x = ${iz(x)}: ${iz(v)}.`,iz,1)}
);
addH('t11dh',
()=>{let n,a,b,x,u;do{n=P([3,4,5]);a=P([1,2,3]);b=R(-3,3);x=R(-2,2);u=a*x+b}while(Math.abs(u)>3);return I(`Cho y = (${ps([b,a])})^${n}. Giá trị y′(${iz(x)}) bằng`,n*a*u**(n-1),`y′ = ${n}·${a}·(${ps([b,a])})^${n-1}. Tại x = ${iz(x)}: ${ps([b,a])} = ${iz(u)}, y′ = ${n*a}·${pa(u)}<sup>${n-1}</sup> = ${iz(n*a*u**(n-1))}.`)},
()=>{const x0=R(-4,5),b=R(-5,5),c=R(-5,5),k=2*x0+b,m=R(-4,4);return I(`Tiếp tuyến của parabol y = ${ps([c,b,1])} song song với đường thẳng y = ${ps([m,k])}. Hoành độ của tiếp điểm bằng`,x0,`Hệ số góc tiếp tuyến bằng ${iz(k)}: y′ = 2x ${sg(b)} = ${iz(k)}, suy ra x = ${iz(x0)}.`)},
()=>{const a=R(1,3),b=R(-3,4),c=R(0,6),t=R(1,4),v=P([0,1]);return I(v?`Một chất điểm chuyển động có phương trình s(t) = ${ps([0,c,b,a],'t')} (s tính bằng mét, t tính bằng giây). Vận tốc tức thời của chất điểm tại thời điểm t = ${t} giây (đơn vị m/s) là`:`Một chất điểm chuyển động có phương trình s(t) = ${ps([0,c,b,a],'t')} (s tính bằng mét, t tính bằng giây). Gia tốc tức thời của chất điểm tại t = ${t} giây (đơn vị m/s²) là`,v?3*a*t*t+2*b*t+c:6*a*t+2*b,v?`Vận tốc v(t) = s′(t) = ${ps([c,2*b,3*a],'t')}. Tại t = ${t}: v = ${iz(3*a*t*t+2*b*t+c)}.`:`Gia tốc a(t) = s″(t) = ${ps([2*b,6*a],'t')}. Tại t = ${t}: a = ${iz(6*a*t+2*b)}.`)},
()=>{let p,q;do{p=R(-4,5);q=R(-4,5)}while(p==q);return I(`Cho hàm số f(x) = ${ps([0,6*p*q,-3*(p+q),2])}. Tổng các nghiệm của phương trình f′(x) = 0 bằng`,p+q,`f′(x) = ${ps([6*p*q,-6*(p+q),6])} = 6(x ${sg(-p)})(x ${sg(-q)}) nên hai nghiệm là ${iz(p)} và ${iz(q)}. Tổng bằng ${iz(p+q)}.`)},
()=>{const a=nzr(-4,4),x=R(-2,3),u=P([1,2,4,5,-1,-2]),b=u-a*x;return I(`Cho y = ln(${ps([b,a])}). Giá trị y′(${iz(x)}) bằng (nhập phân số tối giản hoặc số nguyên)`,fr(a,u),`y′ = a/(ax + b) = ${iz(a)}/(${ps([b,a])}). Tại x = ${iz(x)}: mẫu bằng ${iz(u)}, y′ = ${fq(a,u)}.`)}
);

/* ===== Hàm số mũ & lôgarit ===== */
const lg=(a,x)=>`log<sub>${a}</sub> ${x}`;
add('t11ml',
()=>{const b=R(2,5),k=R(2,5);return N(`Giá trị của ${lg(b,b**k)} bằng`,k,`Vì ${b**k} = ${b}<sup>${k}</sup> nên ${lg(b,b**k)} = ${k}.`)},
()=>{const a=P([2,3]),n=R(2,6),m=R(2,6),k=R(0,n+m-1);return N(`Giá trị của ${fh(`${a}<sup>${n}</sup>·${a}<sup>${m}</sup>`,`${a}<sup>${k}</sup>`)} bằng`,a**(n+m-k),`Cộng số mũ ở tử: ${a}<sup>${n+m}</sup>. Chia: ${a}<sup>${n+m}</sup>/${a}<sup>${k}</sup> = ${a}<sup>${n+m-k}</sup> = ${a**(n+m-k)}.`)},
()=>{const a=P([2,3,5,6]),k=P([2,3]),M=a**k,dv=[];for(let d=2;d<=M/2;d++)if(M%d==0)dv.push(d);const x=P(dv);return N(`Giá trị của ${lg(a,x)} + ${lg(a,M/x)} bằng`,k,`${lg(a,x)} + ${lg(a,M/x)} = ${lg(a,`(${x}·${M/x})`)} = ${lg(a,M)} = ${k}.`)},
()=>{const a=P([2,3,5]),k=R(1,3),y=R(2,5);return N(`Giá trị của ${lg(a,y*a**k)} − ${lg(a,y)} bằng`,k,`${lg(a,y*a**k)} − ${lg(a,y)} = ${lg(a,`(${y*a**k}/${y})`)} = ${lg(a,a**k)} = ${k}.`)},
()=>{const a=P([2,3,5]),k=R(1,4),c=nzr(-3,3);return N(`Nghiệm của phương trình ${a}<sup>x ${sg(c)}</sup> = ${a**k} là x bằng`,k-c,`${a**k} = ${a}<sup>${k}</sup> nên x ${sg(c)} = ${k}, suy ra x = ${iz(k-c)}.`,iz,1)},
()=>{const a=P([2,3,5]),k=R(1,3),c=nzr(-4,4);return N(`Nghiệm của phương trình ${lg(a,`(x ${sg(c)})`)} = ${k} là x bằng`,a**k-c,`x ${sg(c)} = ${a}<sup>${k}</sup> = ${a**k}, suy ra x = ${iz(a**k-c)}. (Thoả điều kiện x ${sg(c)} &gt; 0.)`,iz,1)},
()=>{const c=nzr(-5,5),ans=`x &gt; ${iz(c)}`;return Z(`Điều kiện xác định của biểu thức ${lg(2,`(x ${sg(-c)})`)} là`,ans,[`x ≥ ${iz(c)}`,`x &lt; ${iz(c)}`,`x ≠ ${iz(c)}`,`x &gt; ${iz(-c)}`],`Biểu thức dưới dấu lôgarit phải dương: x ${sg(-c)} &gt; 0 ⇔ ${ans}.`)},
()=>{const a=P([2,3,4,5]),n=R(2,4),ans=fq(1,a**n);return Z(`Giá trị của ${a}<sup>−${n}</sup> bằng`,ans,[fq(-1,a**n),fq(1,a*n),''+(-a*n),fq(1,a**(n+1))],`a<sup>−n</sup> = 1/a<sup>n</sup>: ${a}<sup>−${n}</sup> = 1/${a**n}.`)},
()=>{const b=P(['2','3','5','1/2','1/3','1/5']),inc=!b.includes('/'),ans=inc?'Đồng biến trên ℝ':'Nghịch biến trên ℝ';return Z(`Hàm số y = (${b})<sup>x</sup>`,ans,[inc?'Nghịch biến trên ℝ':'Đồng biến trên ℝ','Đồng biến trên (0; +∞)','Nghịch biến trên (0; +∞)'],`Cơ số ${b} ${inc?'&gt; 1':'thuộc (0; 1)'} nên hàm số mũ ${inc?'đồng biến':'nghịch biến'} trên ℝ.`)}
);
addH('t11ml',
()=>{let a,b;do{a=R(0,4);b=R(0,4)}while(a==b);return I(`Tổng các nghiệm của phương trình 4<sup>x</sup> − ${2**a+2**b}·2<sup>x</sup> + ${2**(a+b)} = 0 bằng`,a+b,`Đặt t = 2<sup>x</sup> (t &gt; 0): t² − ${2**a+2**b}t + ${2**(a+b)} = 0, có nghiệm t = ${2**a} và t = ${2**b}. Suy ra x = ${a} và x = ${b}. Tổng bằng ${a+b}.`)},
()=>{const p=R(2,6);let q;do q=R(2,6);while(q==p);return I(`Biết log<sub>a</sub> b = m. Khi đó log<sub>a<sup>${p}</sup></sub> b<sup>${q}</sup> = k·m. Giá trị của k là (nhập số hoặc phân số tối giản)`,fr(q,p),`log<sub>a<sup>p</sup></sub> b<sup>q</sup> = (q/p)·log<sub>a</sub> b. Với p = ${p}, q = ${q}: k = ${fq(q,p)}.`)},
()=>{const a=P([2,3]),k=R(1,4),c=R(-5,5);return I(`Số nghiệm nguyên của bất phương trình ${lg(a,`(x ${sg(-c)})`)} ≤ ${k} là`,a**k,`Điều kiện x &gt; ${iz(c)}. Bất phương trình tương đương x ${sg(-c)} ≤ ${a**k}, tức ${iz(c)} &lt; x ≤ ${iz(c+a**k)}. Số nguyên: ${a**k}.`)},
()=>{const A=P([100,200,500]),r=P([5,10,20]),n=P([2,3]),v=Math.round(A*(100+r)**n/100**n*1e6)/1e6;return I(`Một người gửi ${A} triệu đồng vào ngân hàng với lãi kép ${r}%/năm. Sau ${n} năm, số tiền cả gốc lẫn lãi (đơn vị triệu đồng) là`,dn(v),`Công thức lãi kép: A(1 + r)<sup>n</sup> = ${A}·(1 + ${f2(r/100)})<sup>${n}</sup> = ${fd(v,4)}.`)},
()=>{const[c,r,m]=P([[1,2,1],[2,4,3],[3,4,2],[4,8,5],[6,8,4],[7,8,3],[12,16,6],[14,16,5]]);return I(`Nghiệm của phương trình ${lg(2,'x')} + ${lg(2,`(x ${sg(-c)})`)} = ${m} là x bằng`,r,`Điều kiện x &gt; ${c}. Phương trình trở thành x(x ${sg(-c)}) = 2<sup>${m}</sup> = ${2**m}, tức x² ${sg(-c)}x ${sg(-(2**m))} = 0, có nghiệm x = ${r} (thoả) và x = ${iz(-(2**m)/r)} (loại).`)}
);
})();
