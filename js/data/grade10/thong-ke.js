/* LỚP 10 · THỐNG KÊ & XÁC SUẤT: Số gần đúng & sai số, Số đặc trưng của mẫu số liệu, Xác suất cổ điển */
(()=>{const {fr,fq,fh,add,addH,uniq,nzr}=GH;

/* ===== Số gần đúng & sai số ===== */
/* n4 = giá trị × 10^4. rnd(n,k): làm tròn đến k chữ số thập phân (trả về số nguyên theo đơn vị 10^-k) */
const rnd=(n,k)=>{const u=10**(4-k);return Math.floor((n+u/2)/u)},
 fmt=(v,k)=>{const s=String(Math.abs(v)).padStart(k+1,'0');return(v<0?'−':'')+(k?s.slice(0,-k)+','+s.slice(-k):s)},
 HG={0:'hàng đơn vị',1:'hàng phần mười',2:'hàng phần trăm',3:'hàng phần nghìn'},
 PL={10:'hàng chục',100:'hàng trăm',1000:'hàng nghìn'},
 RT=[[0.5,20],[0.5,25],[0.5,40],[0.5,50],[1,20],[1,25],[1,40],[1,50],[1,80],[1,100],[2,40],[2,50],[2,80],[2,100],[0.2,50],[0.2,40],[0.1,20],[0.25,50],[0.25,100],[0.5,100],[2,200],[1,200]].filter(([d,a])=>{const x=d*100/a*100;return Math.abs(x-Math.round(x))<1e-9});
add('t10sg',
()=>{const n=R(1,99)*10000+R(1,9999),k=R(1,3),r=rnd(n,k);return Z(`Quy tròn số ${fmt(n,4)} đến ${HG[k]}, ta được`,fmt(r,k),[fmt(Math.floor(n/10**(4-k)),k),fmt(r+1,k),fmt(r-1,k),fmt(rnd(n,k+1),k+1),fmt(rnd(n,k-1),k-1)],`Nhìn chữ số ngay sau ${HG[k]}: nếu từ 5 trở lên thì tăng chữ số hàng giữ lại thêm 1, ngược lại giữ nguyên. Kết quả ${fmt(r,k)}.`)},
()=>{const n=R(1000,99999),u=P([10,100,1000]),r=Math.floor((n+u/2)/u)*u;return Z(`Quy tròn số ${n} đến ${PL[u]}, ta được`,''+r,[Math.floor(n/u)*u,r+u,r-u,r+2*u,r-2*u,Math.floor(n/(u*10))*u*10].map(String),`Chữ số ngay sau ${PL[u]} quyết định: ${n} làm tròn đến ${PL[u]} là ${r}.`)},
()=>{let n,a10,d;do{n=R(100,999);a10=Math.round(n/10);d=Math.abs(a10*10-n)}while(!d);return Z(`Số đúng là ā = ${fd(n/100,2)} được xấp xỉ bởi số gần đúng a = ${fd(a10/10,1)}. Sai số tuyệt đối Δ của a là`,fd(d/100,2),[d+1,d+2,d+3,Math.abs(d-1)||d+4].map(x=>fd(x/100,2)),`Δ = |a − ā| = |${fd(a10/10,1)} − ${fd(n/100,2)}| = ${fd(d/100,2)}.`)},
()=>{const[d,a]=P(RT),x=d*100/a,w=[x*2,x/2,x*4,x+1].map(f2);return Z(`Đo chiều dài một thanh sắt được a = ${f2(a)} cm với độ chính xác d = ${f2(d)} cm. Sai số tương đối δ tối đa của phép đo là`,f2(x)+'%',w.map(s=>s+'%'),`δ ≤ d/|a| = ${f2(d)}/${a} = ${fd(x/100,5)} = ${f2(x)}%.`)},
()=>{const n=P([2,3,5,6,7,8,10,11,12,13,14,15,17,19,20,21,22,23,24,26,28,29,30]),v=Math.sqrt(n),k=P([2,3]),t=x=>x.toFixed(k).replace('.',',');return Z(`Dùng máy tính được √${n} ≈ ${v.toFixed(7).replace('.',',')}. Quy tròn kết quả đến ${HG[k]} ta được`,t(v),[(Math.floor(v*10**k)/10**k).toFixed(k).replace('.',','),v.toFixed(k+1).replace('.',','),v.toFixed(k-1).replace('.',','),(Math.round(v*10**k+1)/10**k).toFixed(k).replace('.',',')],`Chữ số thập phân thứ ${k+1} của ${v.toFixed(7).replace('.',',')} cho biết có làm tròn lên hay không. Kết quả ${t(v)}.`)},
()=>{const a10=R(100,990),d10=P([1,2,5]),f=x=>fd(x/10,1);return Z(`Chiều dài một tờ giấy đo được là a = ${f(a10)} cm với độ chính xác d = ${f(d10)} cm. Chiều dài đúng ā nằm trong khoảng`,`[${f(a10-d10)}; ${f(a10+d10)}]`,[`[${f(a10-2*d10)}; ${f(a10+2*d10)}]`,`[${f(a10-d10)}; ${f(a10)}]`,`[${f(a10)}; ${f(a10+d10)}]`,`[${f(a10-d10)}; ${f(a10+2*d10)}]`],`|ā − a| ≤ d nên a − d ≤ ā ≤ a + d, tức là ${f(a10-d10)} ≤ ā ≤ ${f(a10+d10)}.`)}
);
addH('t10sg',
()=>{let n,k,u,r,df;do{n=R(1,99)*10000+R(1,9999);k=R(1,3);u=10**(4-k);r=rnd(n,k);df=Math.abs(n-r*u)}while(!df);return I(`Quy tròn số a = ${fmt(n,4)} đến ${HG[k]} được số a'. Sai số tuyệt đối của số quy tròn a' so với a bằng (nhập số)`,dn(df/10000),`a' = ${fmt(r,k)}. Sai số tuyệt đối |a' − a| = |${fmt(r*u,4)} − ${fmt(n,4)}| = ${fd(df/10000,4)}.`)},
()=>{const a=R(100,300)/10,b=R(50,150)/10,da=P([1,2,5]),db=P([1,2,5]);return I(`Chiều dài và chiều rộng một mảnh vườn hình chữ nhật đo được là a = ${fd(a,1)} m ± ${fd(da/10,1)} m và b = ${fd(b,1)} m ± ${fd(db/10,1)} m. Sai số tuyệt đối tối đa của chu vi (đơn vị m) là`,dn(2*(da+db)/10),`Chu vi P = 2(a + b), sai số tối đa của P bằng 2·(${fd(da/10,1)} + ${fd(db/10,1)}) = ${fd(2*(da+db)/10,1)}.`)},
()=>{const[d1,a1]=P(RT),[d2,a2]=P(RT),s=d1*100/a1+d2*100/a2;return I(`Cho a = ${a1} ± ${f2(d1)} và b = ${a2} ± ${f2(d2)}. Sai số tương đối tối đa của tích a·b xấp xỉ bằng tổng các sai số tương đối của a và b. Giá trị đó (đơn vị %) là`,dn(s),`δ<sub>a</sub> = ${f2(d1)}/${a1} = ${f2(d1*100/a1)}%, δ<sub>b</sub> = ${f2(d2)}/${a2} = ${f2(d2*100/a2)}%. Tổng: ${f2(s)}%.`)},
()=>{const u=P([10,100,1000]);return I(`Quy tròn một số tự nhiên đến ${PL[u]}. Sai số tuyệt đối của số quy tròn không vượt quá bao nhiêu?`,u/2,`Khi quy tròn đến ${PL[u]}, số bị đổi tối đa nửa đơn vị hàng đó: ${u}/2 = ${u/2}.`)},
()=>{const p=P([1,2,4,5]),a=P([50,100,200,250,400]);return I(`Số gần đúng a = ${a} có sai số tương đối không vượt quá ${p}%. Độ chính xác d của a (nhập số) bằng`,p*a/100,`Sai số tương đối δ = d/|a| ≤ ${p}% nên d ≤ ${p}%·${a} = ${p*a/100}. Độ chính xác là ${p*a/100}.`)}
);

/* ===== Số đặc trưng của mẫu số liệu ===== */
const sr=a=>[...a].sort((x,y)=>x-y),med=a=>{const s=sr(a),n=s.length;return n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2},
 lst=a=>a.join('; '),rv=(n,a,b)=>Array.from({length:n},()=>R(a,b)),
 meanArr=n=>{let a;do a=rv(n,1,10);while(a.reduce((x,y)=>x+y)%n);return a},
 dist=(n,a,b)=>sh(Array.from({length:b-a+1},(_,i)=>a+i)).slice(0,n);
add('t10dt',
()=>{const a=meanArr(P([5,6,8,10]));return N(`Số trung bình cộng của mẫu số liệu ${lst(a)} là`,a.reduce((x,y)=>x+y)/a.length,`Tổng các số liệu: ${a.reduce((x,y)=>x+y)}. Chia cho số phần tử ${a.length}: ${a.reduce((x,y)=>x+y)/a.length}.`)},
()=>{const a=rv(P([5,7,9]),1,20);return N(`Trung vị của mẫu số liệu ${lst(a)} là`,med(a),`Sắp xếp tăng dần: ${lst(sr(a))}. Mẫu có ${a.length} số (lẻ) nên trung vị là số ở giữa: ${med(a)}.`)},
()=>{const a=rv(P([6,8]),1,20),m=med(a);return Z(`Trung vị của mẫu số liệu ${lst(a)} là`,f2(m),[m+0.5,m-0.5,m+1,m-1,sr(a)[a.length/2]+1].map(f2),`Sắp xếp tăng dần: ${lst(sr(a))}. Mẫu có ${a.length} số (chẵn) nên trung vị là trung bình cộng của hai số ở giữa: ${f2(m)}.`)},
()=>{const[m,v1,v2,v3,v4]=dist(5,1,12);const a=sh([m,m,m,v1,v1,v2,v2,v3,v4]);return Z(`Mốt của mẫu số liệu ${lst(a)} là`,''+m,[v1,v2,v3,v4].map(String),`Số ${m} xuất hiện 3 lần, nhiều nhất, nên mốt là ${m}.`)},
()=>{const a=rv(P([6,8]),1,30);return N(`Khoảng biến thiên của mẫu số liệu ${lst(a)} là`,Math.max(...a)-Math.min(...a),`R = giá trị lớn nhất − giá trị nhỏ nhất = ${Math.max(...a)} − ${Math.min(...a)} = ${Math.max(...a)-Math.min(...a)}.`)},
()=>{const n=P([7,11]),s=sr(rv(n,1,40)),iL=n==7?1:2,iU=n==7?5:8;return N(`Khoảng tứ phân vị của mẫu số liệu ${lst(sh(s))} là`,s[iU]-s[iL],`Sắp xếp: ${lst(s)}. Trung vị Q<sub>2</sub> = ${s[(n-1)/2]}. Q<sub>1</sub> là trung vị của nửa dưới (không chứa Q<sub>2</sub>) = ${s[iL]}, Q<sub>3</sub> là trung vị của nửa trên = ${s[iU]}.\nΔQ = Q<sub>3</sub> − Q<sub>1</sub> = ${s[iU]-s[iL]}.`)},
()=>{const s=sr(rv(8,1,40)),q1=(s[1]+s[2])/2,q3=(s[5]+s[6])/2,d=q3-q1;return Z(`Khoảng tứ phân vị của mẫu số liệu ${lst(sh(s))} là`,f2(d),[d+0.5,d+1,Math.abs(d-0.5)+0.5,d+2,s[7]-s[0]].map(f2),`Sắp xếp: ${lst(s)}. Nửa dưới gồm 4 số đầu: Q<sub>1</sub> = (${s[1]} + ${s[2]})/2 = ${f2(q1)}. Nửa trên gồm 4 số cuối: Q<sub>3</sub> = (${s[5]} + ${s[6]})/2 = ${f2(q3)}.\nΔQ = ${f2(q3)} − ${f2(q1)} = ${f2(d)}.`)},
()=>{const m=R(3,12),k=P([2,3,-1,4]),c=R(-5,8);return N(`Mẫu số liệu có số trung bình cộng bằng ${m}. Nếu nhân mỗi số liệu với ${iz(k)} rồi cộng thêm ${iz(c)} thì số trung bình cộng mới bằng`,k*m+c,`Số trung bình biến đổi giống từng số liệu: ${iz(k)}·${m} + ${pa(c)} = ${iz(k*m+c)}.`,iz,1)}
);
addH('t10dt',
()=>{const n=P([4,5]),m=R(5,12);let d;do{d=rv(n-1,-3,3);d.push(-d.reduce((x,y)=>x+y,0))}while(Math.abs(d[n-1])>6);const a=sh(d.map(x=>m+x)),v=d.reduce((x,y)=>x+y*y,0)/n;return I(`Mẫu số liệu: ${lst(a)}. Phương sai của mẫu số liệu này bằng (nhập số)`,dn(v),`Số trung bình x̄ = ${m}. Độ lệch: ${lst(d.map(x=>iz(x)))}. Phương sai s² = (Σ(x<sub>i</sub> − x̄)²)/n = ${d.reduce((x,y)=>x+y*y,0)}/${n} = ${f2(v)}.`)},
()=>{const m=R(6,20),s=R(1,5),n=P([4,6]),a=sh(Array.from({length:n},(_,i)=>i%2?m+s:m-s));return I(`Mẫu số liệu: ${lst(a)}. Độ lệch chuẩn của mẫu số liệu này bằng`,s,`Số trung bình x̄ = ${m}. Mỗi số lệch khỏi x̄ đúng ${s} đơn vị nên phương sai s² = ${s*s}, độ lệch chuẩn s = ${s}.`)},
()=>{const s=P([1.5,2,2.5,3,4]),k=P([2,3,-2,-3]);return I(`Mẫu số liệu có độ lệch chuẩn bằng ${f2(s)}. Nếu nhân mỗi số liệu với ${iz(k)} rồi cộng thêm 5 thì độ lệch chuẩn mới bằng`,dn(Math.abs(k)*s),`Cộng thêm một hằng số không đổi độ lệch chuẩn; nhân với k thì độ lệch chuẩn nhân với |k|. Vậy s' = ${Math.abs(k)}·${f2(s)} = ${f2(Math.abs(k)*s)}.`)},
()=>{const tot=P([10,20,25,40,50]),n1=R(3,tot-3),n2=tot-n1,m1=R(50,95)/10,m2=R(50,95)/10,v=(n1*m1*10+n2*m2*10)/(tot*10);return I(`Lớp A có ${n1} học sinh, điểm trung bình môn Toán là ${fd(m1,1)}. Lớp B có ${n2} học sinh, điểm trung bình là ${fd(m2,1)}. Điểm trung bình chung của cả hai lớp là (nhập số)`,dn(v),`Tổng điểm: ${n1}·${fd(m1,1)} + ${n2}·${fd(m2,1)} = ${f2(n1*m1+n2*m2)}. Chia cho ${tot} học sinh: ${f2(v)}.`)},
()=>{const s=sr(rv(8,1,40)),q1=(s[1]+s[2])/2,q3=(s[5]+s[6])/2;return I(`Mẫu số liệu: ${lst(sh(s))}. Khoảng tứ phân vị ΔQ của mẫu là (nhập số)`,dn(q3-q1),`Sắp xếp: ${lst(s)}. Q<sub>1</sub> = (${s[1]} + ${s[2]})/2 = ${f2(q1)}, Q<sub>3</sub> = (${s[5]} + ${s[6]})/2 = ${f2(q3)}. ΔQ = ${f2(q3-q1)}.`)}
);

/* ===== Xác suất cổ điển ===== */
const cb=(n,k)=>{let r=1;for(let i=0;i<k;i++)r=r*(n-i)/(i+1);return Math.round(r)},
 DS=[['số chấm chẵn',[2,4,6]],['số chấm lẻ',[1,3,5]],['số chấm chia hết cho 3',[3,6]],['số chấm là số nguyên tố',[2,3,5]],['số chấm lớn hơn 4',[5,6]],['số chấm nhỏ hơn 3',[1,2]],['số chấm là ước của 6',[1,2,3,6]],['số chấm không nhỏ hơn 2',[2,3,4,5,6]]],
 rd=(n,d)=>fr(n,d)==n+'/'+d?'':' = '+fr(n,d),
 FR6=['1/6','1/3','1/2','2/3','5/6'];
add('t10xs',
()=>{const[t,s]=P(DS),a=fr(s.length,6);return Z(`Gieo một con xúc xắc cân đối, đồng chất. Xác suất để mặt xuất hiện có ${t} là`,a,FR6.filter(x=>x!=a),`Có ${s.length} kết quả thuận lợi (${s.join(', ')}) trên 6 kết quả có thể. P = ${s.length}/6 = ${a}.`)},
()=>{const a=R(3,8),b=R(2,7),p=fr(a,a+b);return Z(`Một hộp có ${a} bi đỏ và ${b} bi xanh, cùng kích thước. Lấy ngẫu nhiên một bi. Xác suất để lấy được bi đỏ là`,p,[fr(b,a+b),fr(a,b),fr(1,a),fr(a+1,a+b+1),fr(a,a+b+1)],`P = số bi đỏ / tổng số bi = ${a}/${a+b}${rd(a,a+b)}.`)},
()=>{const a=R(2,5),b=R(2,4),p=fr(cb(a,2),cb(a+b,2));return Z(`Một hộp có ${a} bi đỏ và ${b} bi xanh. Lấy ngẫu nhiên đồng thời 2 bi. Xác suất để cả hai bi đều đỏ là`,p,[fr(a*a,(a+b)**2),fr(a*(a-1),(a+b)**2),fr(a,a+b),fr(cb(a,2),cb(a+b,2)+1),fr(b*(b-1)/2,cb(a+b,2)+0)].filter(x=>x!='1'),`Số cách lấy 2 bi: C(${a+b}, 2) = ${cb(a+b,2)}. Số cách lấy 2 bi đỏ: C(${a}, 2) = ${cb(a,2)}. P = ${cb(a,2)}/${cb(a+b,2)}${rd(cb(a,2),cb(a+b,2))}.`)},
()=>{const L=[['Tung hai đồng xu cân đối. Xác suất để cả hai đồng xu đều sấp là',1,4],['Tung ba đồng xu cân đối. Xác suất để có đúng 2 đồng xu ngửa là',3,8],['Tung ba đồng xu cân đối. Xác suất để có ít nhất một đồng xu sấp là',7,8],['Tung hai đồng xu cân đối. Xác suất để có ít nhất một đồng xu ngửa là',3,4],['Tung ba đồng xu cân đối. Xác suất để cả ba đồng xu cùng mặt là',1,4],['Tung hai đồng xu cân đối. Xác suất để hai đồng xu ra mặt khác nhau là',1,2]],[q,n,d]=P(L),a=fr(n,d);return Z(q,a,['1/4','3/8','7/8','3/4','1/2','1/8','5/8'].filter(x=>x!=a),`Liệt kê không gian mẫu (${d>4||q.includes('ba')?8:4} kết quả), đếm kết quả thuận lợi: ${a}.`)},
()=>{const s=R(2,12),w=6-Math.abs(s-7),a=fr(w,36);return Z(`Gieo hai con xúc xắc cân đối. Xác suất để tổng số chấm bằng ${s} là`,a,[fr(w+1,36),fr(Math.max(1,w-1),36),fr(w+2,36),fr(1,s),fr(w,12),fr(w+3,36),fr(w+4,36)],`Có ${w} cặp (a; b) có tổng bằng ${s}, trên 36 kết quả. P = ${w}/36${rd(w,36)}.`)},
()=>{const p=P([15,20,35,40,60,65,70,85]),c=f2((100-p)/100);return Z(`Biết xác suất của biến cố A là P(A) = ${f2(p/100)}. Xác suất của biến cố đối Ā là`,c,[f2(p/100),f2(1+p/100),f2(100/p),f2((100-p)/50)],`P(Ā) = 1 − P(A) = 1 − ${f2(p/100)} = ${c}.`)},
()=>{const L=[['Gieo đồng thời hai con xúc xắc. Số phần tử của không gian mẫu là',36,[12,6,18,24,30]],['Tung ba đồng xu. Số phần tử của không gian mẫu là',8,[6,9,3,16,4]],['Gieo một con xúc xắc ba lần. Số phần tử của không gian mẫu là',216,[18,36,108,729,72]],['Tung bốn đồng xu. Số phần tử của không gian mẫu là',16,[8,12,4,32,24]]],[q,a,w]=P(L);return Z(q,''+a,w.map(String),`Mỗi lần gieo (tung) là một bước; theo quy tắc nhân, n(Ω) = ${a}.`)}
);
addH('t10xs',
()=>{const a=R(3,6),b=R(3,6),p=fr(cb(a,3)+cb(b,3),cb(a+b,3));return I(`Một hộp có ${a} bi đỏ và ${b} bi xanh. Lấy ngẫu nhiên đồng thời 3 bi. Xác suất để ba bi lấy được cùng màu là (nhập phân số tối giản)`,p,`n(Ω) = C(${a+b}, 3) = ${cb(a+b,3)}. Ba bi cùng màu: C(${a}, 3) + C(${b}, 3) = ${cb(a,3)} + ${cb(b,3)} = ${cb(a,3)+cb(b,3)}. P = ${p}.`)},
()=>{const n=R(4,8);return I(`Xếp ngẫu nhiên ${n} bạn thành một hàng ngang. Xác suất để hai bạn A và B đứng cạnh nhau là (nhập phân số tối giản)`,fr(2,n),`Số cách xếp: ${n}!. Số cách xếp A, B cạnh nhau: 2·${n-1}!. P = 2·${n-1}!/${n}! = 2/${n}${rd(2,n)}.`)},
()=>{const s=R(8,11);let c=0;for(let x=1;x<=6;x++)for(let y=1;y<=6;y++)if(x+y>=s)c++;return I(`Gieo hai con xúc xắc cân đối. Xác suất để tổng số chấm không nhỏ hơn ${s} là (nhập phân số tối giản)`,fr(c,36),`Có ${c} cặp có tổng ≥ ${s}. P = ${c}/36 = ${fr(c,36)}.`)},
()=>{const n=R(5,12),o=Math.ceil(n/2),e=n-o,c=cb(o,2)+cb(e,2);return I(`Chọn ngẫu nhiên hai số khác nhau từ các số 1, 2, …, ${n}. Xác suất để tổng hai số là số chẵn là (nhập phân số tối giản)`,fr(c,cb(n,2)),`Tổng chẵn khi hai số cùng chẵn hoặc cùng lẻ. Có ${o} số lẻ, ${e} số chẵn: C(${o}, 2) + C(${e}, 2) = ${c}. Tổng số cách chọn C(${n}, 2) = ${cb(n,2)}. P = ${fr(c,cb(n,2))}.`)},
()=>{const k=P([2,3,4,5,6]);let c=0;for(let x=1;x<=6;x++)for(let y=1;y<=6;y++)if((x*y)%k==0)c++;return I(`Gieo hai con xúc xắc cân đối. Xác suất để tích hai số chấm chia hết cho ${k} là (nhập phân số tối giản)`,fr(c,36),`Đếm các cặp (x; y) có tích chia hết cho ${k}: ${c} cặp trên 36. P = ${fr(c,36)}.`)}
);
})();
