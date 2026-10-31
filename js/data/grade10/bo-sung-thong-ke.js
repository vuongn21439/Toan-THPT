/* LỚP 10 · BỔ SUNG THỐNG KÊ & XÁC SUẤT (theo các dạng bài trong tài liệu): Số gần đúng & sai số, Số đặc trưng của mẫu số liệu, Xác suất cổ điển. */
(()=>{const {fr,fq,fh,add,addH,uniq,nzr}=GH,
 cb=(n,k)=>{if(k<0||k>n)return 0;let r=1;for(let i=0;i<k;i++)r=r*(n-i)/(i+1);return Math.round(r)},
 dots=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.'),
 sr=a=>[...a].sort((x,y)=>x-y),rv=(n,a,b)=>Array.from({length:n},()=>R(a,b)),lst=a=>a.join('; '),
 mean=a=>a.reduce((x,y)=>x+y,0)/a.length,
 vari=a=>{const n=a.length,s=a.reduce((x,y)=>x+y,0),s2=a.reduce((x,y)=>x+y*y,0);return(n*s2-s*s)/(n*n)},
 isP=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i==0)return false;return true},
 rd=(n,d)=>fr(n,d)==n+'/'+d?'':' = '+fq(n,d),
 UN={1000:'hàng nghìn',10000:'hàng chục nghìn',100000:'hàng trăm nghìn',1000000:'hàng triệu'},
 /* bảng tần số: giá trị x (mảng) và tần số f, tổng tần số n ∈ {10, 20} */
 ft=()=>{const n=P([10,20]),k=P([4,5]);for(;;){const x=sr(sh([5,6,7,8,9,10,4,3]).slice(0,k)),f=x.map(()=>R(1,Math.floor(n/2)));if(f.reduce((a,b)=>a+b)==n){const o={x,f,n};o.txt=x.map((v,i)=>`${v} (${f[i]} lần)`).join('; ');o.sum=x.reduce((a,v,i)=>a+v*f[i],0);o.mean=o.sum/n;o.sum2=x.reduce((a,v,i)=>a+v*v*f[i],0);return o}}};

/* ===== Số gần đúng & sai số ===== */
add('t10sg',
()=>{const u=P([1000,10000,100000,1000000]),n=R(10**7,10**8),r=Math.floor((n+u/2)/u)*u;return Z(`Dân số của một thành phố năm nay là ${dots(n)} người. Quy tròn số này đến ${UN[u]} ta được`,dots(r),[dots(Math.floor(n/u)*u),dots(r+u),dots(r-u),dots(Math.floor((n+u*5)/(u*10))*u*10),dots(r+2*u),dots(r-2*u),dots(r+u*10)],`Quy tắc làm tròn số: Xét chữ số ngay bên phải hàng quy tròn (hàng ${UN[u]}).
- Nếu chữ số đó nhỏ hơn 5 thì ta giữ nguyên chữ số hàng quy tròn và thay các chữ số bên phải bằng 0.
- Nếu chữ số đó lớn hơn hoặc bằng 5 thì ta cộng thêm 1 vào chữ số hàng quy tròn và thay các chữ số bên phải bằng 0.
Áp dụng quy tắc cho số ${dots(n)} làm tròn đến ${UN[u]}, ta được kết quả là ${dots(r)}.`)},
()=>{let a1,d1,a2,d2,e1,e2;do{a1=P([25,40,50,80,120]);d1=P([0.5,1,2]);a2=P([60,100,150,200,300]);d2=P([0.5,1,2,3]);e1=d1/a1;e2=d2/a2}while(Math.abs(e1-e2)<1e-9);const ans=e1<e2?'Phép đo thứ nhất':'Phép đo thứ hai';return Z(`Đo chiều dài của sân bóng được ${a2} m ± ${f2(d2)} m (phép đo thứ hai), đo chiều dài của phòng học được ${a1} m ± ${f2(d1)} m (phép đo thứ nhất). Phép đo nào có độ chính xác cao hơn (sai số tương đối nhỏ hơn)?`,ans,[e1<e2?'Phép đo thứ hai':'Phép đo thứ nhất','Hai phép đo chính xác như nhau','Không thể so sánh được'],`Độ chính xác của một phép đo được đánh giá qua sai số tương đối: δ = d / |a| (với d là sai số tuyệt đối lớn nhất, a là số đo được). Sai số tương đối càng nhỏ thì phép đo càng chính xác.
- Phép đo thứ nhất (phòng học): δ<sub>1</sub> = ${f2(d1)} / ${a1} ≈ ${fd(e1*100,3)}%.
- Phép đo thứ hai (sân bóng): δ<sub>2</sub> = ${f2(d2)} / ${a2} ≈ ${fd(e2*100,3)}%.
So sánh hai kết quả, ta thấy phép đo có sai số tương đối nhỏ hơn là ${ans.toLowerCase()}. Vì vậy ${ans.toLowerCase()} chính xác hơn.`)},
()=>{const a=R(20,90),d=P([1,2,5]),lo=a-d/10,hi=a+d/10;return Z(`Biết số đúng ā nằm trong đoạn [${fd(a-d/10,1)}; ${fd(a+d/10,1)}] và số gần đúng a = ${fd(a,1)}. Độ chính xác d của a là`,fd(d/10,1),[fd(d/5,1),fd(d,1),fd(d/20,2),fd(2*d/10+0.1,1)],`Theo định nghĩa, số đúng ā thỏa mãn: a − d ≤ ā ≤ a + d.
Điều này có nghĩa là tập hợp các giá trị của ā tạo thành một đoạn [a − d; a + d].
Theo đề bài, đoạn này là [${fd(a-d/10,1)}; ${fd(a+d/10,1)}].
Khoảng cách giữa hai đầu mút của đoạn là: (a + d) - (a - d) = 2d.
Suy ra: 2d = ${fd(a+d/10,1)} − ${fd(a-d/10,1)} = ${fd(2*d/10,1)}.
Vậy độ chính xác d = ${fd(2*d/10,1)} / 2 = ${fd(d/10,1)}.`)},
()=>{const r=R(2,12),C=2*3.14*r;return Z(`Dùng π ≈ 3,14, chu vi của đường tròn bán kính ${r} cm xấp xỉ bằng (cm)`,f2(C),[2*3.14*r+0.1,2*3.14*r-0.1,3.14*r,3.14*r*r].map(f2),`Công thức tính chu vi đường tròn là: C = 2πr (trong đó r là bán kính).
Thay số đo bán kính r = ${r} và giá trị gần đúng của π ≈ 3,14 vào công thức:
C ≈ 2 · 3,14 · ${r} = 6,28 · ${r} = ${f2(C)} cm.`)},
()=>{const L=[['1/3','0,33',0.0033],['2/3','0,67',0.0033],['√2','1,41',0.0042],['√3','1,73',0.0021],['√5','2,24',0.0039]],[ex,ap,dv]=P(L);return Z(`Dùng ${ap} làm giá trị gần đúng của ${ex}. Khẳng định nào sau đây về sai số tuyệt đối Δ của phép xấp xỉ là đúng?`,'Δ &lt; 0,005',['Δ &lt; 0,0001','Δ &lt; 0,001','Δ &gt; 0,01'],`Sai số tuyệt đối của phép xấp xỉ được tính bằng công thức: Δ = |Số đúng − Số gần đúng|.
Tính toán: Δ = |${ex} − ${ap}|.
Sử dụng máy tính cầm tay để ước lượng giá trị của ${ex} (khoảng ${fd(Number(ap)+dv, 4)}...), ta có:
Δ = |${ex} − ${ap}| ≈ ${fd(dv,4)}.
So sánh giá trị này với các đáp án, ta thấy ${fd(dv,4)} nhỏ hơn 0,005 nhưng lớn hơn 0,001. Do đó khẳng định Δ &lt; 0,005 là đúng nhất.`)}
);
addH('t10sg',
()=>{const a=R(80,200)/10,d=P([1,2,5])/10;return I(`Cạnh của một hình vuông đo được là ${fd(a,1)} cm với sai số tuyệt đối không quá ${fd(d,1)} cm. Sai số tuyệt đối tối đa của chu vi hình vuông (cm) là`,dn(4*d),`Gọi a là cạnh của hình vuông. Chu vi của hình vuông được tính bằng công thức P = 4a.
Số đúng của chu vi là P_đúng = 4·(a_đúng).
Sai số tuyệt đối của chu vi là: ΔP = |P_đúng − P_gần_đúng| = |4·a_đúng − 4·a_gần_đúng| = 4·|a_đúng − a_gần_đúng| = 4·Δa.
Do sai số tuyệt đối của cạnh không quá ${fd(d,1)} cm (Δa ≤ ${fd(d,1)}), nên sai số tuyệt đối tối đa của chu vi là:
ΔP_max = 4 · ${fd(d,1)} = ${fd(4*d,1)} cm.`)},
()=>{const m=R(10,30),d=P([5,10,20])/100;return I(`Khối lượng mỗi bao gạo là ${m} kg với sai số tuyệt đối không quá ${fd(d,2)} kg. Sai số tuyệt đối tối đa của tổng khối lượng 10 bao gạo (kg) là`,dn(10*d),`Khối lượng tổng cộng M của 10 bao gạo là M = m₁ + m₂ + ... + m₁₀.
Sai số tuyệt đối của tổng bằng tổng các sai số tuyệt đối của từng số hạng (theo nguyên lý sai số):
ΔM ≤ Δm₁ + Δm₂ + ... + Δm₁₀.
Vì mỗi bao gạo có sai số không quá ${fd(d,2)} kg, sai số tối đa của tổng 10 bao là:
ΔM_max = 10 · ${fd(d,2)} = ${fd(10*d,2)} kg.`)},
()=>{const a=R(60,150)/10,d=P([1,2,5])/10;return I(`Cạnh của một hình vuông đo được ${fd(a,1)} cm với sai số tuyệt đối không quá ${fd(d,1)} cm. Sai số tuyệt đối của diện tích xấp xỉ bằng 2a·d. Giá trị đó (cm², nhập số) là`,dn(2*a*d),`Diện tích hình vuông S = a².
Công thức tính gần đúng sai số tuyệt đối của diện tích là ΔS ≈ 2a·Δa (được cho trong đề bài).
Thay số đo cạnh a = ${fd(a,1)} cm và sai số d = Δa = ${fd(d,1)} cm vào công thức:
ΔS ≈ 2 · ${fd(a,1)} · ${fd(d,1)} = ${fd(2*a*d,2)} cm².`)}
);

/* ===== Số đặc trưng của mẫu số liệu ===== */
add('t10dt',
()=>{let a,s,q1,q3,out;for(;;){const base=rv(7,40,60);out=P([20,95,100,110]);a=sr([...base,out]);const iq=(a[5]+a[6])/2-(a[1]+a[2])/2;q1=(a[1]+a[2])/2;q3=(a[5]+a[6])/2;const lo=q1-1.5*iq,hi=q3+1.5*iq,o=a.filter(v=>v<lo||v>hi);if(o.length==1&&(o[0]==out))break}const w=a.filter(v=>v!=out);return Z(`Cho mẫu số liệu: ${lst(sh(a))}. Giá trị nào sau đây là giá trị ngoại lệ của mẫu?`,''+out,sh([...new Set(w)]).slice(0,3).map(String),`Bước 1: Sắp xếp mẫu số liệu theo thứ tự tăng dần: ${lst(a)}.
Bước 2: Tìm các tứ phân vị. Mẫu có 8 giá trị (n=8, chẵn).
- Trung vị Q₂ là trung bình cộng của giá trị thứ 4 và 5.
- Tứ phân vị thứ nhất Q₁ là trung vị của nửa đầu (4 phần tử): Q₁ = (x₂ + x₃)/2 = ${f2(q1)}.
- Tứ phân vị thứ ba Q₃ là trung vị của nửa sau (4 phần tử): Q₃ = (x₆ + x₇)/2 = ${f2(q3)}.
Bước 3: Tính khoảng tứ phân vị ΔQ = Q₃ − Q₁ = ${f2(q3-q1)}.
Bước 4: Xác định giới hạn của giá trị ngoại lệ:
- Giới hạn dưới: Q₁ − 1,5·ΔQ = ${f2(q1)} − 1,5·${f2(q3-q1)} = ${f2(q1-1.5*(q3-q1))}.
- Giới hạn trên: Q₃ + 1,5·ΔQ = ${f2(q3)} + 1,5·${f2(q3-q1)} = ${f2(q3+1.5*(q3-q1))}.
Các giá trị nằm ngoài đoạn [${f2(q1-1.5*(q3-q1))}; ${f2(q3+1.5*(q3-q1))}] là giá trị ngoại lệ. Kiểm tra mẫu, chỉ có giá trị ${out} vi phạm, nên nó là giá trị ngoại lệ.`)},
()=>{const o=ft();return Z(`Kết quả kiểm tra của một nhóm học sinh: ${o.txt}. Số trung bình của mẫu số liệu là`,f2(o.mean),[o.mean+0.5,o.mean-0.5,o.mean+1,o.x.reduce((a,v)=>a+v,0)/o.x.length+0.25].map(f2),`Công thức tính số trung bình của bảng tần số: x̄ = (x₁f₁ + x₂f₂ + ... + xₖfₖ) / n.
- Tổng các giá trị điểm (tổng kiểm): ${o.x.map((v,i) => `${v}×${o.f[i]}`).join(' + ')} = ${o.sum}.
- Tổng số học sinh trong mẫu: n = ${o.n}.
Số trung bình: x̄ = ${o.sum} / ${o.n} = ${f2(o.mean)}.`)},
()=>{let o,mx;do{o=ft();mx=Math.max(...o.f)}while(o.f.filter(v=>v==mx).length>1);const m=o.x[o.f.indexOf(mx)];return Z(`Kết quả kiểm tra của một nhóm học sinh: ${o.txt}. Mốt của mẫu số liệu là`,''+m,o.x.filter(v=>v!=m).map(String).concat([''+(m+1)]),`Theo định nghĩa, "mốt" (Mode) là giá trị xuất hiện với tần số lớn nhất trong mẫu số liệu.
Quan sát bảng dữ liệu, ta thấy tần số cao nhất là ${mx} lần.
Giá trị đạt được tần số lớn nhất này là điểm ${m}. Do đó, mốt của mẫu số liệu là ${m}.`)},
()=>{const o=ft(),all=[];o.x.forEach((v,i)=>{for(let j=0;j<o.f[i];j++)all.push(v)});const m=(all[o.n/2-1]+all[o.n/2])/2;return Z(`Kết quả kiểm tra của một nhóm học sinh: ${o.txt}. Trung vị của mẫu số liệu là`,f2(m),[m+0.5,m-0.5,m+1,m-1,o.mean+0.25].map(f2),`Mẫu số liệu có tổng cộng n = ${o.n} giá trị. Vì n là số chẵn, trung vị sẽ là trung bình cộng của 2 giá trị nằm ở chính giữa sau khi sắp xếp tăng dần: giá trị thứ ${o.n/2} và giá trị thứ ${o.n/2+1}.
Dựa vào bảng tần số, tích lũy số lượng từ điểm thấp đến điểm cao:
- Giá trị thứ ${o.n/2} là: ${all[o.n/2-1]}.
- Giá trị thứ ${o.n/2+1} là: ${all[o.n/2]}.
Trung vị Mₑ = (${all[o.n/2-1]} + ${all[o.n/2]}) / 2 = ${f2(m)}.`)},
()=>{let a,b,va,vb;do{a=rv(5,3,15);b=rv(5,3,15);va=vari(a);vb=vari(b)}while(Math.abs(va-vb)<1e-9);const ans=va>vb?'Mẫu A':'Mẫu B';return Z(`Hai mẫu số liệu: A: ${lst(a)}; B: ${lst(b)}. Mẫu nào có độ lệch chuẩn lớn hơn?`,ans,[va>vb?'Mẫu B':'Mẫu A','Hai mẫu có độ lệch chuẩn bằng nhau','Không thể so sánh được'],`Độ lệch chuẩn là căn bậc hai số học của phương sai (S = √s²). Do đó, mẫu nào có phương sai lớn hơn thì độ lệch chuẩn cũng lớn hơn.
Tính phương sai cho từng mẫu:
- Mẫu A: Tính trung bình x̄_A, rồi tính trung bình của bình phương các sai số. Phương sai s²_A = ${f2(va)}.
- Mẫu B: Tính tương tự, phương sai s²_B = ${f2(vb)}.
So sánh: Vì ${f2(va)} ${va>vb?'>':'<'} ${f2(vb)} nên phương sai của ${ans} lớn hơn. Kéo theo độ lệch chuẩn của ${ans} lớn hơn.`)},
()=>{const m=R(60,90)/10,k=R(2,6)/10;return Z(`Mẫu số liệu có số trung bình ${fd(m,1)}. Nếu cộng thêm ${fd(k,1)} vào mọi số liệu thì số trung bình mới là`,fd(m+k,1),[fd(m-k,1),fd(m*k,2),fd(m+2*k,1),fd(m,1)],`Một tính chất quan trọng của số trung bình là: Nếu cộng thêm một hằng số c vào tất cả các giá trị của mẫu số liệu, thì số trung bình mới cũng sẽ bằng số trung bình cũ cộng thêm hằng số c.
Số trung bình cũ là ${fd(m,1)}. Ta cộng thêm hằng số c = ${fd(k,1)}.
Số trung bình mới là: ${fd(m,1)} + ${fd(k,1)} = ${fd(m+k,1)}.`)}
);
addH('t10dt',
()=>{const o=ft();return I(`Kết quả kiểm tra của một nhóm học sinh: ${o.txt}. Phương sai của mẫu số liệu bằng (nhập số)`,dn(o.sum2/o.n-o.mean*o.mean),`Bước 1: Tính số trung bình: x̄ = (Σxᵢfᵢ)/n = ${o.sum}/${o.n} = ${f2(o.mean)}.
Bước 2: Áp dụng công thức tính phương sai biến đổi: s² = (Σxᵢ²fᵢ)/n − x̄².
- Trung bình của các bình phương (Σxᵢ²fᵢ)/n = (${o.x.map((v,i) => `${v}²×${o.f[i]}`).join(' + ')}) / ${o.n} = ${o.sum2} / ${o.n} = ${f2(o.sum2/o.n)}.
- Bình phương của số trung bình x̄² = (${f2(o.mean)})² = ${f2(o.mean**2)}.
Bước 3: Phương sai s² = ${f2(o.sum2/o.n)} − ${f2(o.mean**2)} = ${fd(o.sum2/o.n-o.mean**2,4)}.`)},
()=>{let m,a,b;do{m=R(60,85)/10;a=R(30,70)/10;b=R(30,95)/10}while(a==b);return I(`Điểm trung bình môn Toán của 10 bạn là ${fd(m,1)}. Sau khi chấm lại, điểm của một bạn được sửa từ ${fd(a,1)} thành ${fd(b,1)}. Điểm trung bình mới của 10 bạn là (nhập số)`,dn(m+(b-a)/10),`Tổng điểm ban đầu của 10 bạn là: 10 × ${fd(m,1)} = ${fd(m*10,1)}.
Khi một điểm được sửa từ ${fd(a,1)} thành ${fd(b,1)}, sự chênh lệch là: ${fd(b,1)} − ${fd(a,1)} = ${fd(b-a,1)}.
Tổng điểm mới của 10 bạn sẽ là: ${fd(m*10,1)} + ${fd(b-a,1)} = ${fd(m*10+b-a,1)}.
Điểm trung bình mới được tính bằng cách chia tổng mới cho số lượng (10 bạn): ${fd(m*10+b-a,1)} / 10 = ${fd(m+(b-a)/10,2)}.`)},
()=>{const n=P([4,9]),m=R(50,90)/10,x=R(30,100)/10;return I(`Điểm trung bình môn Toán của ${n} bạn là ${fd(m,1)}. Khi thêm một bạn có điểm ${fd(x,1)} thì điểm trung bình của ${n+1} bạn là (nhập số)`,dn((n*m+x)/(n+1)),`Bước 1: Tính tổng điểm của ${n} bạn ban đầu: Tổng₁ = ${n} × Điểm trung bình = ${n} × ${fd(m,1)} = ${fd(n*m,1)}.
Bước 2: Tính tổng điểm của ${n+1} bạn (sau khi thêm bạn mới): Tổng₂ = Tổng₁ + Điểm bạn mới = ${fd(n*m,1)} + ${fd(x,1)} = ${fd(n*m+x,1)}.
Bước 3: Tính điểm trung bình mới của ${n+1} bạn: Điểm trung bình = Tổng₂ / ${n+1} = ${fd(n*m+x,1)} / ${n+1} = ${fd((n*m+x)/(n+1),3)}.`)},
()=>{const w=P([[1,1,2,3,3],[1,2,2,2,3],[2,2,3,3,0]]);const x=w.map(()=>R(50,100)/10),W=w.reduce((a,b)=>a+b),v=w.reduce((a,wi,i)=>a+wi*x[i],0)/W;return I(`Điểm trung bình môn Toán được tính theo hệ số: điểm các bài kiểm tra lần lượt ${x.map(v=>fd(v,1)).join('; ')} với hệ số tương ứng ${w.join('; ')}. Điểm trung bình môn là (nhập số)`,dn(v),`Điểm trung bình môn (trung bình gia quyền) được tính bằng công thức: (Tổng các [Điểm × Hệ số]) / (Tổng các hệ số).
- Tổng các hệ số: ${w.join(' + ')} = ${W}.
- Tổng điểm nhân hệ số: ${x.map((v,i) => `${fd(v,1)}×${w[i]}`).join(' + ')} = ${fd(v*W,1)}.
Điểm trung bình môn là: ${fd(v*W,1)} / ${W} = ${fd(v,3)}.`)
}
);

/* ===== Xác suất cổ điển ===== */
const DICE=[['tổng số chấm chia hết cho 3',(x,y)=>(x+y)%3==0],['tích số chấm là số chẵn',(x,y)=>(x*y)%2==0],['hiệu hai số chấm có giá trị tuyệt đối bằng 1',(x,y)=>Math.abs(x-y)==1],['hai mặt có số chấm khác nhau',(x,y)=>x!=y],['có ít nhất một mặt 6 chấm',(x,y)=>x==6||y==6],['số chấm lần đầu nhỏ hơn số chấm lần sau',(x,y)=>x<y],['tổng số chấm là số nguyên tố',(x,y)=>isP(x+y)]];
add('t10xs',
()=>{const n=R(20,60),k=R(2,9),c=Math.floor(n/k);return Z(`Chọn ngẫu nhiên một số nguyên dương không vượt quá ${n}. Xác suất để số đó chia hết cho ${k} là`,fr(c,n),[fr(c+1,n),fr(c-1,n),fr(c,n+1),fr(k,n),fr(n-c,n)].filter(x=>x!='0'),`Không gian mẫu Ω là tập hợp các số nguyên dương từ 1 đến ${n}, do đó số phần tử của không gian mẫu n(Ω) = ${n}.
Gọi A là biến cố "Số được chọn chia hết cho ${k}".
Các số chia hết cho ${k} trong khoảng từ 1 đến ${n} là các bội số của ${k}: ${k}, ${2*k}, ${3*k}, ..., ${c*k}.
Số lượng các số này là: ⌊${n}/${k}⌋ = ${c} số, tức là n(A) = ${c}.
Xác suất của biến cố A là: P(A) = n(A) / n(Ω) = ${c}/${n}${rd(c,n)}.`)},
()=>{const[q,f]=P(DICE);let c=0;for(let x=1;x<=6;x++)for(let y=1;y<=6;y++)if(f(x,y))c++;const a=fr(c,36);return Z(`Gieo một con xúc xắc cân đối hai lần. Xác suất để ${q} là`,a,[fr(c+1,36),fr(c-1,36),fr(c+2,36),fr(c,18),fr(c+3,36)].filter(x=>x!=a),`Gieo một con xúc xắc hai lần, mỗi lần có 6 kết quả. Số phần tử của không gian mẫu là: n(Ω) = 6 × 6 = 36.
Gọi A là biến cố "${q}". Ta đếm số các cặp kết quả (x; y) thỏa mãn điều kiện biến cố A (với x, y ∈ {1,2,3,4,5,6}).
Bằng cách liệt kê hoặc tính toán logic, ta tìm được có chính xác ${c} cặp (x; y) thỏa mãn. Do đó n(A) = ${c}.
Xác suất của biến cố A là: P(A) = n(A) / n(Ω) = ${c}/36${rd(c,36)}.`)},
()=>{const a=R(3,8),b=R(3,8),p=fr(a*b,cb(a+b,2));return Z(`Một nhóm có ${a} bạn nam và ${b} bạn nữ. Chọn ngẫu nhiên 2 bạn. Xác suất để chọn được một nam và một nữ là`,p,[fr(cb(a,2),cb(a+b,2)),fr(a*b,(a+b)**2),fr(a,a+b),fr(2*a*b,(a+b)**2),fr(a*b,cb(a+b,2)+1)].filter(x=>x!=p),`Tổng số học sinh trong nhóm là ${a} + ${b} = ${a+b}.
Không gian mẫu: Số cách chọn 2 bạn bất kỳ từ ${a+b} bạn là n(Ω) = C(${a+b}, 2) = ${cb(a+b,2)}.
Gọi A là biến cố "Chọn được 1 nam và 1 nữ".
Công đoạn 1: Chọn 1 nam từ ${a} nam, có ${a} cách.
Công đoạn 2: Chọn 1 nữ từ ${b} nữ, có ${b} cách.
Theo quy tắc nhân, số cách chọn 1 nam và 1 nữ là n(A) = ${a} × ${b} = ${a*b}.
Xác suất cần tìm: P(A) = n(A) / n(Ω) = ${a*b} / ${cb(a+b,2)}${rd(a*b,cb(a+b,2))}.`)},
()=>{const k=R(2,5),a=fr(2**k-1,2**k);return Z(`Tung một đồng xu cân đối ${k} lần. Xác suất để có ít nhất một lần xuất hiện mặt ngửa là`,a,[fr(1,2**k),fr(2**(k-1),2**k),fr(2**k-2,2**k),fr(k,2**k),fr(1,2*k),fr(2**k-1,2**(k+1)),fr(2**k+1,2**(k+1)),fr(3,4+k)].filter(x=>x!=a),`Tung đồng xu ${k} lần, mỗi lần có 2 kết quả (Sấp hoặc Ngửa). Không gian mẫu n(Ω) = 2^${k} = ${2**k}.
Sử dụng biến cố đối: Gọi A là biến cố "Có ít nhất 1 lần xuất hiện mặt ngửa".
Biến cố đối của A (ký hiệu Ā) là "Không có lần nào xuất hiện mặt ngửa", tức là "Tất cả ${k} lần đều ra mặt Sấp".
Chỉ có duy nhất 1 trường hợp như vậy (SSSS...S), nên n(Ā) = 1.
Xác suất của biến cố đối: P(Ā) = 1 / ${2**k}.
Xác suất của biến cố A: P(A) = 1 − P(Ā) = 1 − 1/${2**k} = ${a}.`)},
()=>{const n=R(5,10),t=P([0,1]),a=t?fr(2,n*(n-1)):fr(1,n);return Z(t?`Xếp ngẫu nhiên ${n} bạn thành một hàng ngang. Xác suất để hai bạn A và B đứng ở hai đầu hàng là`:`Xếp ngẫu nhiên ${n} bạn thành một hàng ngang. Xác suất để bạn A đứng đầu hàng là`,a,[fr(1,n-1),fr(2,n),fr(1,n*n),fr(1,n*(n-1)),fr(2,n+1)].filter(x=>x!=a),t?`Không gian mẫu: Xếp ${n} bạn thành hàng ngang có n(Ω) = ${n}! cách.
Xếp để A và B ở 2 đầu: 
- Có 2! = 2 cách xếp A và B vào 2 vị trí đầu và cuối hàng.
- Còn lại ${n-2} bạn, xếp vào ${n-2} vị trí ở giữa có (${n-2})! cách.
Số cách thỏa mãn n(A) = 2 × (${n-2})!.
Xác suất P = [2 × (${n-2})!] / ${n}! = 2 / (${n} × (${n-1})) = ${a}.`:`Không gian mẫu: Xếp ${n} bạn thành hàng ngang có n(Ω) = ${n}! cách.
Để bạn A đứng đầu hàng: 
- Có 1 cách xếp bạn A vào vị trí đầu.
- Còn lại ${n-1} bạn, xếp vào ${n-1} vị trí phía sau có (${n-1})! cách.
Số cách thỏa mãn n(A) = 1 × (${n-1})!.
Xác suất P = (${n-1})! / ${n}! = 1 / ${n}. (Hoặc hiểu nhanh: Mỗi người đều có xác suất 1/${n} để đứng vị trí đầu tiên).`)},
()=>{const n=R(10,30),c=[...Array(n).keys()].filter(x=>isP(x+1)).length,a=fr(c,n);return Z(`Rút ngẫu nhiên một thẻ từ ${n} thẻ được đánh số từ 1 đến ${n}. Xác suất để rút được thẻ ghi số nguyên tố là`,a,[fr(c+1,n),fr(c-1,n),fr(n-c,n),fr(c,n-1),fr(c+2,n)].filter(x=>x!=a),`Không gian mẫu n(Ω) = ${n} (vì có ${n} thẻ).
Liệt kê các số nguyên tố trong phạm vi từ 1 đến ${n}: 2, 3, 5, 7, 11...
Kiểm tra và đếm, ta thấy có tổng cộng ${c} số nguyên tố nằm trong khoảng này.
Vậy số kết quả thuận lợi n(A) = ${c}.
Xác suất cần tìm là: P(A) = n(A) / n(Ω) = ${c}/${n}${rd(c,n)}.`)},
()=>{const n=R(6,12),k=R(2,4);return N(`Có ${n} học sinh, chọn ngẫu nhiên ${k} em. Số phần tử của không gian mẫu là`,cb(n,k),`Phép thử là "Chọn ngẫu nhiên ${k} em từ nhóm ${n} học sinh". Việc chọn này không quan tâm đến thứ tự của học sinh được chọn.
Mỗi kết quả của phép thử là một tổ hợp chập ${k} của ${n} phần tử.
Do đó, số phần tử của không gian mẫu được tính bằng công thức tổ hợp:
n(Ω) = C(${n}, ${k}) = ${cb(n,k)}.`)}
);
addH('t10xs',
()=>{const a=R(2,5),b=R(2,5),c=R(2,5),n=a+b+c,p=fr(a*b*c,cb(n,3));return I(`Một hộp có ${a} bi đỏ, ${b} bi xanh và ${c} bi vàng. Lấy ngẫu nhiên đồng thời 3 bi. Xác suất để lấy được đủ ba màu là (nhập phân số tối giản)`,p,`Tổng số bi trong hộp là: ${a} + ${b} + ${c} = ${n} bi.
Không gian mẫu: Số cách lấy 3 bi bất kỳ từ ${n} bi là n(Ω) = C(${n}, 3) = ${cb(n,3)}.
Để lấy được 3 bi "đủ ba màu" (nghĩa là 1 đỏ, 1 xanh, 1 vàng), ta chọn:
- 1 bi đỏ từ ${a} bi đỏ: C(${a}, 1) = ${a} cách.
- 1 bi xanh từ ${b} bi xanh: C(${b}, 1) = ${b} cách.
- 1 bi vàng từ ${c} bi vàng: C(${c}, 1) = ${c} cách.
Theo quy tắc nhân, số kết quả thuận lợi: n(A) = ${a} × ${b} × ${c} = ${a*b*c}.
Xác suất: P(A) = n(A) / n(Ω) = ${a*b*c} / ${cb(n,3)}${rd(a*b*c,cb(n,3))}.`)},
()=>{const n=P([6,7,8,9,10]);let c=0;for(let x=1;x<=n;x++)for(let y=x+1;y<=n;y++)for(let z=y+1;z<=n;z++)if((x+y+z)%3==0)c++;return I(`Chọn ngẫu nhiên 3 số khác nhau từ các số 1, 2, …, ${n}. Xác suất để tổng ba số đó chia hết cho 3 là (nhập phân số tối giản)`,fr(c,cb(n,3)),`Không gian mẫu: Số cách chọn 3 số từ ${n} số là n(Ω) = C(${n}, 3) = ${cb(n,3)}.
Để tổng 3 số chia hết cho 3, các số này phải thuộc các nhóm theo số dư khi chia cho 3 (dư 0, dư 1, dư 2). Tổng chia hết cho 3 khi:
1) Cả 3 số cùng số dư (3 số chia hết cho 3, hoặc 3 số chia 3 dư 1, hoặc 3 số chia 3 dư 2).
2) Hoặc 3 số có 3 số dư khác nhau (1 số chia hết, 1 số dư 1, 1 số dư 2).
Tính toán bằng tổ hợp dựa trên các nhóm này (hoặc duyệt tất cả các bộ số), ta đếm được tổng cộng có ${c} bộ ba số có tổng chia hết cho 3.
Xác suất: P = n(A) / n(Ω) = ${c} / ${cb(n,3)}${rd(c,cb(n,3))}.`)},
()=>{const s=R(6,15);let c=0;for(let x=1;x<=6;x++)for(let y=1;y<=6;y++)for(let z=1;z<=6;z++)if(x+y+z==s)c++;return I(`Gieo một con xúc xắc cân đối ba lần. Xác suất để tổng số chấm của ba lần gieo bằng ${s} là (nhập phân số tối giản)`,fr(c,216),`Gieo xúc xắc 3 lần, mỗi lần có 6 khả năng. Số phần tử không gian mẫu: n(Ω) = 6 × 6 × 6 = 216.
Biến cố A: "Tổng số chấm ba lần gieo bằng ${s}".
Ta đếm số các bộ 3 số (x, y, z) thuộc {1,2,3,4,5,6} thỏa mãn phương trình x + y + z = ${s}.
Bằng cách liệt kê hệ thống, ta đếm được có chính xác ${c} bộ thỏa mãn. Tức là n(A) = ${c}.
Xác suất: P(A) = n(A) / n(Ω) = ${c} / 216${rd(c,216)}.`)},
()=>{const n=R(6,14);let c=0;for(let x=1;x<=n;x++)for(let y=x+1;y<=n;y++)if((x*y)%2==0)c++;return I(`Chọn ngẫu nhiên hai số khác nhau từ các số 1, 2, …, ${n}. Xác suất để tích hai số đó là số chẵn là (nhập phân số tối giản)`,fr(c,cb(n,2)),`Không gian mẫu n(Ω) = C(${n}, 2) = ${cb(n,2)}.
Thay vì đếm số cặp có tích chẵn (rất nhiều trường hợp), ta dùng biến cố đối.
Biến cố đối Ā: "Tích 2 số là số lẻ". Điều này chỉ xảy ra khi CẢ HAI số được chọn đều là số lẻ.
Từ 1 đến ${n} có ${Math.ceil(n/2)} số lẻ. 
Số cách chọn 2 số lẻ: n(Ā) = C(${Math.ceil(n/2)}, 2) = ${cb(Math.ceil(n/2),2)} cách.
Xác suất biến cố đối: P(Ā) = ${cb(Math.ceil(n/2),2)} / ${cb(n,2)}.
Xác suất cần tìm: P(A) = 1 − P(Ā) = 1 − ${cb(Math.ceil(n/2),2)}/${cb(n,2)} = ${fq(c,cb(n,2))}.`)},
()=>{const a=R(3,7),b=R(3,7),p=fr(cb(a,2)+cb(b,2),cb(a+b,2));return I(`Một hộp có ${a} bi đỏ và ${b} bi xanh. Lấy ngẫu nhiên đồng thời 2 bi. Xác suất để hai bi lấy được cùng màu là (nhập phân số tối giản)`,p,`Tổng số bi: ${a} + ${b} = ${a+b} bi. 
Không gian mẫu: n(Ω) = C(${a+b}, 2) = ${cb(a+b,2)}.
Biến cố "Hai bi cùng màu" được chia làm 2 trường hợp độc lập:
- Trường hợp 1: Cùng lấy được bi màu Đỏ. Có C(${a}, 2) = ${cb(a,2)} cách.
- Trường hợp 2: Cùng lấy được bi màu Xanh. Có C(${b}, 2) = ${cb(b,2)} cách.
Theo quy tắc cộng, số kết quả thuận lợi n(A) = ${cb(a,2)} + ${cb(b,2)} = ${cb(a,2)+cb(b,2)}.
Xác suất: P(A) = n(A) / n(Ω) = ${cb(a,2)+cb(b,2)} / ${cb(a+b,2)}${rd(cb(a,2)+cb(b,2),cb(a+b,2))}.`)
}
);
})();```