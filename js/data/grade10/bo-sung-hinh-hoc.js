/* LỚP 10 · BỔ SUNG HÌNH HỌC (theo các dạng bài trong tài liệu): Hệ thức lượng, Vectơ, Đường thẳng & đường tròn, Conic.
   Có nhiều bài toán thực tế: đo khoảng cách, neo cột, lực, vận tốc, tàu thuyền, radar, cổng vòm, gương parabol. */
(()=>{const {fr,fq,fh,add,addH,sg,pt,ps,ln,uniq,nzr,PY,TV}=GH,
 T60=[[3,8,7],[5,8,7],[8,15,13],[7,15,13]],T120=[[3,5,7],[5,16,19],[7,8,13],[8,7,13]],
 TRI=[[3,4,5],[5,12,13],[6,8,10],[13,14,15],[9,10,17],[10,17,21],[7,24,25],[8,15,17],[4,13,15],[11,13,20]].map(([a,b,c])=>{const p=(a+b+c)/2,S=Math.sqrt(p*(p-a)*(p-b)*(p-c));return{a,b,c,p,S}}).filter(t=>Number.isInteger(t.S)),
 /* giá trị lượng giác hữu tỉ [tử, mẫu] */
 RV={sin:{0:[0,1],30:[1,2],90:[1,1],150:[1,2],180:[0,1]},cos:{0:[1,1],60:[1,2],90:[0,1],120:[-1,2],180:[-1,1]},tan:{0:[0,1],45:[1,1],135:[-1,1],180:[0,1]}},
 addF=(a,b)=>[a[0]*b[1]+b[0]*a[1],a[1]*b[1]],mulF=(k,a)=>[k*a[0],a[1]],
 cir=(a,b,r2)=>{const q=(v,c)=>c?`(${v} ${sg(-c)})<sup>2</sup>`:`${v}<sup>2</sup>`;return `${q('x',a)} + ${q('y',b)} = ${r2}`};

/* ===== Hệ thức lượng trong tam giác ===== */
add('t10hl',
()=>{const[a,b,c]=P(T60),k=P([1,2,3]),t=P([0,1]);return N(t?`Hai vị trí A và B nằm ở hai bên bờ một cái hồ. Từ điểm C người ta đo được CA = ${a*k} m, CB = ${b*k} m và góc ACB = 60°. Khoảng cách AB (mét) là`:`Hai tàu A và B xuất phát cùng lúc từ cảng C theo hai hướng tạo với nhau một góc 60°. Sau một thời gian tàu A đi được ${a*k} km, tàu B đi được ${b*k} km. Khoảng cách giữa hai tàu lúc đó (km) là`,c*k,`Áp dụng định lí côsin trong tam giác ABC để tính độ dài cạnh đối diện góc 60°:
AB² = CA² + CB² − 2·CA·CB·cos(C)
AB² = (${a*k})² + (${b*k})² − 2·(${a*k})·(${b*k})·cos(60°).
Thay giá trị cos(60°) = 1/2 vào biểu thức, ta được:
AB² = ${(a*k)**2} + ${(b*k)**2} − 2·${(a*k)*(b*k)}·(1/2) = ${(a*k)**2} + ${(b*k)**2} − ${(a*k)*(b*k)} = ${(c*k)**2}.
Lấy căn bậc hai, độ dài đoạn AB = ${c*k} (m/km).`)},
()=>{const[a,b,c]=P(T120),k=P([1,2]);return N(`Hai con đường thẳng cùng xuất phát từ ngã ba O và tạo với nhau góc 120°. Hai người đi từ O, một người theo đường thứ nhất ${a*k} km, người kia theo đường thứ hai ${b*k} km. Khoảng cách giữa hai người (km) là`,c*k,`Gọi d là khoảng cách giữa hai người. Ba điểm (ngã ba O và vị trí 2 người) tạo thành một tam giác. Áp dụng định lí côsin cho góc xen giữa 120°:
d² = (${a*k})² + (${b*k})² − 2·(${a*k})·(${b*k})·cos(120°).
Ta biết cos(120°) = -1/2. Thay số vào ta có:
d² = ${(a*k)**2} + ${(b*k)**2} − 2·${a*b*k*k}·(-1/2) = ${(a*k)**2} + ${(b*k)**2} + ${a*b*k*k} = ${(c*k)**2}.
Lấy căn bậc hai, khoảng cách d = ${c*k} (km).`)},
()=>{const up=P([0,1]),[a,b,c]=P(up?T60:T120),k=P([1,2]);return N(`Một cột thẳng đứng cao ${a*k} m dựng trên sườn dốc nghiêng 30° so với mặt phẳng ngang. Một sợi dây cáp nối đỉnh cột với điểm trên sườn dốc cách chân cột ${b*k} m, về phía ${up?'trên':'dưới'} dốc. Độ dài sợi dây cáp (mét) là`,c*k,`Giả sử mặt đất nằm ngang. Sườn dốc tạo với mặt ngang một góc 30°, cột đứng thì vuông góc (90°) với mặt ngang.
Góc tạo bởi cột thẳng đứng và sườn dốc (hướng ${up?'lên':'xuống'}) sẽ là: α = ${up?'90° − 30° = 60°':'90° + 30° = 120°'}.
Ta có tam giác tạo bởi cột (${a*k} m), đoạn dốc (${b*k} m) và sợi dây cáp. Áp dụng định lí côsin để tính chiều dài sợi dây:
Dây² = Cột² + Dốc² − 2·Cột·Dốc·cos(α)
Dây² = (${a*k})² + (${b*k})² − 2·(${a*k})·(${b*k})·cos(${up?'60°':'120°'}).
Với cos(${up?'60°':'120°'}) = ${up?'1/2':'-1/2'}, ta tính được: Dây² = ${(a*k)**2} + ${(b*k)**2} ${up?'−':'+'} ${a*b*k*k} = ${(c*k)**2}.
Vậy chiều dài sợi dây cáp là ${c*k} mét.`)},
()=>{const L=2*R(2,6);return N(`Một chiếc thang dài ${L} m dựa vào tường và tạo với mặt đất một góc 60°. Chân thang cách tường bao nhiêu mét?`,L/2,`Gọi khoảng cách từ chân thang đến chân tường là x. Chiếc thang, mặt đất và bức tường vuông góc tạo thành một tam giác vuông.
Trong tam giác vuông này, cạnh huyền là chiếc thang = ${L} m. Góc giữa cạnh huyền và cạnh kề mặt đất là 60°.
Theo định nghĩa tỉ số lượng giác cosin: cos(60°) = Cạnh kề / Cạnh huyền = x / ${L}.
Thay cos(60°) = 1/2 vào: 1/2 = x / ${L} ⇒ x = ${L} · 1/2 = ${L/2} m. Vậy chân thang cách tường ${L/2} mét.`)},
()=>{const t=P(TRI),k=P([1,2]);return N(`Một mảnh đất hình tam giác có độ dài ba cạnh là ${t.a*k} m, ${t.b*k} m, ${t.c*k} m. Diện tích mảnh đất (m²) là`,t.S*k*k,`Áp dụng công thức Heron để tính diện tích tam giác khi biết độ dài 3 cạnh (a, b, c).
Bước 1: Tính nửa chu vi p = (a + b + c) / 2 = (${t.a*k} + ${t.b*k} + ${t.c*k}) / 2 = ${t.p*k} m.
Bước 2: Tính diện tích S theo công thức: S = √(p·(p−a)·(p−b)·(p−c))
S = √(${t.p*k} · (${t.p*k} - ${t.a*k}) · (${t.p*k} - ${t.b*k}) · (${t.p*k} - ${t.c*k}))
S = √(${t.p*k} · ${t.p*k - t.a*k} · ${t.p*k - t.b*k} · ${t.p*k - t.c*k}) = √(${(t.S*k*k)**2}) = ${t.S*k*k} m².`)},
()=>{const[a,b,c]=P(PY),neg=P([0,1]);return Z(`Cho góc α tù với sin α = ${a}/${c}. Giá trị của cos α là`,fq(-b,c),[fq(b,c),fq(-a,c),fq(b,a),fq(-c,b)],`Áp dụng hệ thức lượng giác cơ bản: sin²α + cos²α = 1.
Thay sin α = ${a}/${c} vào: (${a}/${c})² + cos²α = 1 ⇔ ${a*a}/${c*c} + cos²α = 1.
Suy ra cos²α = 1 − ${a*a}/${c*c} = ${b*b}/${c*c}.
Vì α là góc tù (90° < α < 180°) nên điểm biểu diễn trên đường tròn lượng giác nằm ở góc phần tư thứ II, nơi giá trị cosin mang dấu âm (cos α < 0).
Lấy căn bậc hai và chọn giá trị âm: cos α = -√(${b*b}/${c*c}) = -${b}/${c} = ${fq(-b,c)}.`)},
()=>{const A=P([30,90,150]),r=R(2,9),a=A==90?2*r:r;return N(`Một công viên hình tam giác ABC nội tiếp một hồ nước hình tròn. Biết BC = ${a} m và góc A = ${A}°. Bán kính của hồ (m) là`,A==90?r:a,`Đường tròn chứa hồ nước chính là đường tròn ngoại tiếp tam giác ABC. Gọi R là bán kính của nó.
Áp dụng định lí sin trong tam giác ABC: a / sin(A) = 2R (với a là cạnh BC đối diện góc A).
Từ đó suy ra: R = BC / (2 · sin A) = ${a} / (2 · sin ${A}°).
Với giá trị sin(${A}°) = ${A==90?'1':'1/2'}, ta tính được: R = ${a} / (2 · ${A==90?'1':'1/2'}) = ${a} / ${A==90?'2':'1'} = ${A==90?r:a} m.`)}
);
addH('t10hl',
()=>{const f=P(['sin','cos','tan']),g=P(['sin','cos','tan']),a=P(Object.keys(RV[f]).map(Number)),b=P(Object.keys(RV[g]).map(Number)),c=P(Object.keys(RV.sin).map(Number)),k1=nzr(-4,5),k2=nzr(-4,5);let t=addF(mulF(k1,RV[f][a]),mulF(k2,RV[g][b]));return I(`Giá trị của biểu thức E = ${iz(k1)}·${f} ${a}° ${sg(k2)}·${g} ${b}° bằng (nhập số hoặc phân số tối giản)`,fr(t[0],t[1]),`Tra bảng giá trị lượng giác của các góc đặc biệt:
- ${f}(${a}°) = ${fq(...RV[f][a])}.
- ${g}(${b}°) = ${fq(...RV[g][b])}.
Thay các giá trị này vào biểu thức E:
E = ${iz(k1)} · (${fq(...RV[f][a])}) ${sg(k2)} · (${fq(...RV[g][b])}).
Thực hiện phép tính nhân và cộng phân số: E = (${k1 * RV[f][a][0]}/${RV[f][a][1]}) + (${k2 * RV[g][b][0]}/${RV[g][b][1]}) = ${fq(t[0], t[1])}.`)},
()=>{const d=2*R(10,40);return I(`Từ hai điểm A và B nằm trên cùng một đường thẳng đi qua chân một toà tháp, cách nhau ${d} m (A xa tháp hơn B), người ta nhìn thấy đỉnh tháp với góc nâng lần lượt là 30° và 60° (bỏ qua chiều cao của người đo). Chiều cao của tháp bằng k√3 (m). Giá trị của k là`,d/2,`Gọi h là chiều cao tháp, H là vị trí chân tháp.
Trong tam giác vuông ở H chứa điểm A: tan(30°) = h / AH ⇒ AH = h / tan(30°) = h / (1/√3) = h√3.
Trong tam giác vuông ở H chứa điểm B: tan(60°) = h / BH ⇒ BH = h / tan(60°) = h / √3 = h√3 / 3.
Vì A, B, H thẳng hàng và A xa tháp hơn B nên: Khoảng cách AB = AH - BH.
Thay số: ${d} = h√3 - h√3 / 3 = h√3 · (1 - 1/3) = h√3 · (2/3).
Suy ra: 2h√3 / 3 = ${d} ⇔ 2h√3 = ${3*d} ⇔ h = ${3*d} / (2√3) = ${3*d/6}√3 = ${d/2}√3 m.
Đề bài cho h = k√3, đối chiếu hệ số ta có k = ${d/2}.`)},
()=>{const[R_,h,half]=P([[5,1,3],[5,2,4],[10,2,6],[10,4,8],[13,8,12],[25,18,24]]);return I(`Một vòm cổng có dạng một cung tròn. Dây cung nối hai chân cổng dài ${2*half} m và chiều cao của vòm (từ trung điểm dây cung đến đỉnh vòm) là ${h} m. Bán kính của đường tròn chứa cung đó là (mét)`,R_,`Gọi R là bán kính đường tròn. Cắt vòm cổng bởi đường kính đi qua đỉnh vòm vuông góc với dây cung nối 2 chân cổng.
Trong tam giác vuông tạo bởi tâm đường tròn, trung điểm dây cung và một điểm ở chân vòm:
- Cạnh huyền là bán kính R.
- Cạnh góc vuông thứ nhất là nửa dây cung: a = ${half} m.
- Cạnh góc vuông thứ hai là đoạn từ tâm đến dây cung: bằng R trừ đi chiều cao vòm (h = ${h} m), tức là (R - ${h}).
Định lí Pythagore: R² = a² + (R - h)² ⇔ R² = ${half}² + (R - ${h})².
Khai triển: R² = ${half*half} + R² - 2·${h}·R + ${h*h} ⇔ 2·${h}·R = ${half*half + h*h}.
Suy ra R = ${half*half + h*h} / (2·${h}) = ${R_} m.`)},
()=>{const t=P(TRI),x=P([t.a,t.b,t.c]);return I(`Cạnh ${x} m là cạnh lớn nhất của một mảnh vườn tam giác có ba cạnh ${t.a} m, ${t.b} m, ${t.c} m (m). Biết diện tích mảnh vườn là ${t.S} m². Bán kính đường tròn nội tiếp của mảnh vườn là (nhập số)`,dn(t.S/t.p),`Bán kính đường tròn nội tiếp (r) được tính thông qua diện tích S và nửa chu vi p của tam giác theo công thức: S = p·r.
Bước 1: Tính nửa chu vi mảnh vườn: p = (a + b + c) / 2 = (${t.a} + ${t.b} + ${t.c}) / 2 = ${t.p} m.
Bước 2: Thay diện tích S = ${t.S} m² vào công thức: ${t.S} = ${t.p} · r.
Bước 3: Tính bán kính: r = S / p = ${t.S} / ${t.p} = ${f2(t.S/t.p)} m. (Ghi chú: Việc cạnh lớn nhất bằng ${x} m chỉ là dữ kiện gây nhiễu, không dùng tới).`)
}
);

/* ===== Vectơ ===== */
const rp=()=>[R(-6,6),R(-6,6)],dot=(a,b)=>a[0]*b[0]+a[1]*b[1],
 ID=[['ABCD là hình bình hành. Khi đó vectơ AB + vectơ AD bằng','vectơ AC',['vectơ BD','vectơ DB','vectơ CA']],['ABCD là hình bình hành. Khi đó vectơ AC − vectơ AD bằng','vectơ AB',['vectơ BD','vectơ DC + vectơ BC','vectơ BA']],['I là trung điểm của đoạn AB. Khi đó vectơ IA + vectơ IB bằng','vectơ 0',['vectơ AB','vectơ BA','2 lần vectơ AI']],['G là trọng tâm của tam giác ABC. Khi đó vectơ GA + vectơ GB + vectơ GC bằng','vectơ 0',['vectơ AB + vectơ AC','3 lần vectơ GA','vectơ ABC']],['Với ba điểm A, B, C bất kì, vectơ AB + vectơ BC bằng','vectơ AC',['vectơ CA','vectơ AB − vectơ BC','vectơ BA + vectơ CB']],['Với ba điểm A, B, C bất kì, vectơ AB − vectơ AC bằng','vectơ CB',['vectơ BC','vectơ AB + vectơ AC','vectơ BA']]];
add('t10vt',
()=>{const[q,a,w]=P(ID);return Z(q,a,w,`Theo các quy tắc cơ bản của phép toán vectơ: quy tắc hình bình hành (tổng 2 cạnh kề bằng đường chéo), quy tắc ba điểm (nối đuôi hoặc trừ chung gốc), tính chất trung điểm (tổng 2 vectơ đối bằng 0) và trọng tâm. Kết quả rút gọn đúng đắn nhất là ${a}.`)},
()=>{const[u,v,h]=P(PY),k=P([1,2]);return N(`Hai lực F<sub>1</sub> và F<sub>2</sub> có độ lớn ${u*k} N và ${v*k} N cùng tác dụng lên một vật tại điểm O, hai lực này vuông góc với nhau. Độ lớn của hợp lực (N) là`,h*k,`Khi hai lực tác dụng vuông góc (góc 90°), theo quy tắc hình bình hành, hợp lực sẽ là đường chéo của một hình chữ nhật có hai kích thước là ${u*k} N và ${v*k} N.
Áp dụng định lý Pythagore cho hình chữ nhật này, độ lớn hợp lực là:
|F| = √(|F<sub>1</sub>|² + |F<sub>2</sub>|²) = √(${(u*k)**2} + ${(v*k)**2}) = √(${u*u*k*k+v*v*k*k}) = ${h*k} N.`)},
()=>{const F=R(5,40),ang=P([0,120,180]),v=ang==0?2*F:ang==120?F:0;return N(`Hai lực kéo cùng độ lớn ${F} N cùng tác dụng lên một vật, hai lực này hợp với nhau một góc ${ang}°. Độ lớn của hợp lực (N) là`,v,`Áp dụng công thức tính độ lớn hợp lực của hai lực bất kỳ: |F|² = |F<sub>1</sub>|² + |F<sub>2</sub>|² + 2|F<sub>1</sub>||F<sub>2</sub>|cos(α).
Thay |F<sub>1</sub>| = |F<sub>2</sub>| = ${F} và góc α = ${ang}° vào:
|F|² = ${F}² + ${F}² + 2·${F}·${F}·cos(${ang}°) = ${2*F*F} + ${2*F*F}·cos(${ang}°).
${ang==0?`Vì cos(0°) = 1, nên |F|² = ${4*F*F} ⇒ |F| = ${2*F} N (hai lực cùng hướng nên cộng trực tiếp).`:ang==180?`Vì cos(180°) = -1, nên |F|² = 0 ⇒ |F| = 0 N (hai lực ngược hướng triệt tiêu nhau).`:`Vì cos(120°) = -1/2, nên |F|² = ${2*F*F} - ${F*F} = ${F*F} ⇒ |F| = ${F} N (chúng tạo thành một tam giác đều khi tổng hợp).`}`)},
()=>{const[u,v,h]=P(PY),k=P([1,2]);return N(`Một chiếc thuyền chạy với vận tốc ${u*k} km/h so với nước theo hướng vuông góc với dòng chảy. Vận tốc dòng nước là ${v*k} km/h. Vận tốc thực của thuyền so với bờ (km/h) là`,h*k,`Vận tốc thực của thuyền so với bờ là tổng vectơ của vận tốc thuyền so với nước và vận tốc của dòng nước.
Do hướng thuyền chạy vuông góc với dòng chảy nên hai vectơ vận tốc này vuông góc với nhau (góc 90°).
Áp dụng định lý Pythagore (tương tự quy tắc hình bình hành cho 2 vectơ vuông góc):
V<sub>thực</sub> = √(V<sub>thuyền</sub>² + V<sub>nước</sub>²) = √(${(u*k)**2} + ${(v*k)**2}) = √(${u*u*k*k+v*v*k*k}) = ${h*k} (km/h).`)},
()=>{const p=R(2,9),q=R(2,9),ang=P([0,60,90,120,180]),mb=ang==60||ang==120?2*q:q,v=ang==0?p*q:ang==90?0:ang==180?-p*q:ang==60?p*q:-p*q,cs={0:'1',60:'1/2',90:'0',120:'(−1/2)',180:'(−1)'}[ang];return N(`Cho hai vectơ a, b có |a| = ${p}, |b| = ${mb} và góc giữa hai vectơ bằng ${ang}°. Tích vô hướng a·b bằng`,v,`Tích vô hướng của hai vectơ được định nghĩa bằng tích của độ dài hai vectơ nhân với côsin của góc xen giữa chúng.
Công thức: a · b = |a| · |b| · cos(a, b).
Thay số: a · b = ${p} · ${mb} · cos(${ang}°).
Biết cos(${ang}°) = ${cs}, ta tính được: a · b = ${p} · ${mb} · ${cs} = ${iz(v)}.`,iz,1)},
()=>{let a,b;do{a=R(-9,9);b=R(-9,9)}while(a==b);return N(`Trên trục số, điểm A có tọa độ ${iz(a)} và điểm B có tọa độ ${iz(b)}. Độ dài đoạn AB bằng`,Math.abs(b-a),`Trên trục số 1 chiều, khoảng cách (độ dài đoạn thẳng) giữa hai điểm có tọa độ a và b được tính bằng giá trị tuyệt đối của hiệu hai tọa độ đó.
Công thức: AB = |x<sub>B</sub> - x<sub>A</sub>|.
Thay số: AB = |${iz(b)} − (${iz(a)})| = |${b-a}| = ${Math.abs(b-a)} đơn vị.`)},
()=>{const F=R(10,60),d=2*R(2,10);return N(`Một lực không đổi có độ lớn ${F} N kéo một vật di chuyển một đoạn ${d} m, hướng của lực hợp với hướng di chuyển một góc 60°. Công của lực (J) là`,F*d/2,`Công (A) của một lực sinh ra khi làm dịch chuyển vật được tính bằng tích vô hướng của vectơ Lực và vectơ độ dời.
Công thức: A = F · d · cos(α), với α là góc giữa hướng của lực và hướng dịch chuyển.
Thay các số liệu: F = ${F} N, d = ${d} m, α = 60°.
Tính toán: A = ${F} · ${d} · cos(60°) = ${F} · ${d} · (1/2) = ${F*d/2} J (Joule).`)},
()=>{const k=R(1,6),t=P([0,1]);return N(t?`Cho tam giác ABC đều cạnh ${2*k}. Tích vô hướng AB·AC (hai vectơ cùng gốc A) bằng`:`Cho tam giác ABC đều cạnh ${2*k}. Tích vô hướng AB·BC (vectơ AB và vectơ BC) bằng`,t?2*k*k:-2*k*k,t?`Tam giác đều nên 3 cạnh bằng nhau (AB = AC = ${2*k}) và 3 góc bằng 60°.
Góc giữa 2 vectơ AB và AC xuất phát từ cùng gốc A chính là góc A = 60°.
Tích vô hướng: AB · AC = |AB| · |AC| · cos(A) = ${2*k} · ${2*k} · cos(60°) = ${4*k*k} · (1/2) = ${2*k*k}.`:`Tam giác đều nên các cạnh bằng ${2*k} và các góc bằng 60°.
Để tìm góc giữa vectơ AB và vectơ BC, ta trượt vectơ AB dọc theo đường thẳng của nó tới điểm B (gọi là Bx). Góc giữa tia Bx và BC là góc kề bù với góc trong B. Vậy góc(AB, BC) = 180° - 60° = 120°.
Tích vô hướng: AB · BC = |AB| · |BC| · cos(120°) = ${2*k} · ${2*k} · (-1/2) = ${iz(-2*k*k)}.`,iz,1)}
);
addH('t10vt',
()=>{let m,n,a,b;do{m=nzr(-4,4);n=nzr(-4,4);a=[R(1,4),R(-3,3)];b=[R(-3,3),R(1,4)]}while(a[0]*b[1]-a[1]*b[0]==0);const c=[m*a[0]+n*b[0],m*a[1]+n*b[1]];return I(`Cho a = ${pt(...a)}, b = ${pt(...b)} và c = ${pt(...c)}. Biết c = m·a + n·b. Giá trị của m + n bằng`,m+n,`Sử dụng biểu thức tọa độ của vectơ. Khi c = m·a + n·b, ta lập hệ phương trình theo từng thành phần tọa độ x và y:
- Phương trình theo hoành độ x: m·(${iz(a[0])}) + n·(${pa(b[0])}) = ${iz(c[0])}.
- Phương trình theo tung độ y: m·(${iz(a[1])}) + n·(${pa(b[1])}) = ${iz(c[1])}.
Giải hệ phương trình bậc nhất 2 ẩn này (có thể dùng phương pháp thế hoặc cộng đại số), ta tìm được nghiệm: m = ${iz(m)} và n = ${iz(n)}. 
Do đó tổng cần tìm là: m + n = ${iz(m+n)}.`)},
()=>{let dx,dy;do{dx=R(-3,3);dy=R(-3,3)}while(!dx||!dy);const A=rp(),t=R(2,4),B=[A[0]+dx,A[1]+dy],C=[A[0]+t*dx,A[1]+t*dy],m=C[1];return I(`Cho ba điểm A${pt(...A)}, B${pt(...B)} và C(${iz(C[0])}; m). Để ba điểm A, B, C thẳng hàng thì m bằng`,m,`Điều kiện để 3 điểm A, B, C thẳng hàng là vectơ AB và vectơ AC cùng phương.
Bước 1: Tính tọa độ vectơ AB = (x<sub>B</sub> - x<sub>A</sub>; y<sub>B</sub> - y<sub>A</sub>) = (${iz(B[0]-A[0])}; ${iz(B[1]-A[1])}).
Bước 2: Tính tọa độ vectơ AC = (x<sub>C</sub> - x<sub>A</sub>; y<sub>C</sub> - y<sub>A</sub>) = (${iz(C[0]-A[0])}; m - (${iz(A[1])})).
Bước 3: Hai vectơ cùng phương khi tọa độ của chúng tỷ lệ với nhau: x<sub>C</sub> / x<sub>B</sub> = y<sub>C</sub> / y<sub>B</sub>.
Lập tỷ số: ${iz(C[0]-A[0])} / ${iz(B[0]-A[0])} = (m - (${iz(A[1])})) / ${iz(B[1]-A[1])}.
Bên trái tỷ số bằng ${t}. Vậy (m - (${iz(A[1])})) / ${iz(B[1]-A[1])} = ${t} ⇔ m - (${iz(A[1])}) = ${t} · (${iz(B[1]-A[1])}) ⇔ m = ${iz(m)}.`)},
()=>{const[u,v,h]=P(PY),A=rp();return I(`Một máy bay bay thẳng từ vị trí A${pt(...A)} đến vị trí B${pt(A[0]+u,A[1]+v)} trên mặt phẳng toạ độ (đơn vị 10 km). Quãng đường bay (đơn vị km) là`,10*h,`Quãng đường bay chính là độ dài của đoạn thẳng AB, hay độ dài của vectơ AB.
Bước 1: Tính vectơ AB = (x<sub>B</sub> - x<sub>A</sub>; y<sub>B</sub> - y<sub>A</sub>) = (${iz(u)}; ${iz(v)}).
Bước 2: Tính độ dài vectơ: |AB| = √(x² + y²) = √(${u}² + ${v}²) = √(${u*u+v*v}) = ${h} (đơn vị trên trục).
Bước 3: Đổi đơn vị. Vì mỗi đơn vị tọa độ ứng với 10 km, nên quãng đường thực tế là: ${h} · 10 = ${10*h} km.`)},
()=>{let p,k,q,m,s;do{p=P([1,2]);k=nzr(-4,4);q=nzr(-4,4);s=R(-3,3);m=-(k*q)/p-s}while(!Number.isInteger(m));return I(`Cho a = (m ${sg(s)}; ${iz(k)}) và b = (${p}; ${iz(q)}). Tìm m để a vuông góc với b.`,m,`Hai vectơ a và b vuông góc với nhau khi và chỉ khi tích vô hướng của chúng bằng 0 (a · b = 0).
Công thức tích vô hướng theo tọa độ là: x<sub>a</sub>·x<sub>b</sub> + y<sub>a</sub>·y<sub>b</sub> = 0.
Thay tọa độ vào: (m ${sg(s)})·${p} + (${iz(k)})·(${iz(q)}) = 0.
Khai triển và giải phương trình: ${p}m ${sg(s*p)} ${sg(k*q)} = 0 ⇔ ${p}m = ${iz(-s*p-k*q)} ⇔ m = ${iz(m)}.`)},
()=>{const F1=rp(),F2=rp(),k=P([1,2]);return I(`Ba lực F<sub>1</sub> = ${pt(...F1)}, F<sub>2</sub> = ${pt(...F2)} và F<sub>3</sub> cùng tác dụng lên một vật đứng yên (cân bằng). Tổng hai toạ độ của lực F<sub>3</sub> là`,-(F1[0]+F2[0]+F1[1]+F2[1]),`Theo định luật I Newton, khi vật đứng yên (cân bằng) thì tổng các lực tác dụng lên vật bằng 0 (vectơ không).
Ta có: vectơ F<sub>1</sub> + vectơ F<sub>2</sub> + vectơ F<sub>3</sub> = 0.
Suy ra vectơ lực thứ ba: F<sub>3</sub> = -(F<sub>1</sub> + F<sub>2</sub>).
Tính tổng F<sub>1</sub> + F<sub>2</sub> theo tọa độ: (${iz(F1[0]+F2[0])}; ${iz(F1[1]+F2[1])}).
Do đó F<sub>3</sub> = (${iz(-(F1[0]+F2[0]))}; ${iz(-(F1[1]+F2[1]))}).
Tổng của hai thành phần tọa độ của F<sub>3</sub> là: (${iz(-(F1[0]+F2[0]))}) + (${iz(-(F1[1]+F2[1]))}) = ${iz(-(F1[0]+F2[0]+F1[1]+F2[1]))}.`)
}
);

/* ===== Đường thẳng & đường tròn (+ thực tế: radar, tàu thuyền) ===== */
const nab=()=>{let A,B;do{A=nzr(-4,4);B=nzr(-4,4)}while(Math.abs(A)==Math.abs(B));return[A,B]};
add('t10td',
()=>{const R_=R(2,7),I_=[R(-4,4),R(-4,4)],t=P([0,1,2]),[u,v,h]=P(PY),M=t==0?[I_[0]+u,I_[1]+v]:t==1?[I_[0]+u+1,I_[1]+v+1]:[I_[0]+1,I_[1]];const d2=(M[0]-I_[0])**2+(M[1]-I_[1])**2,L=['Nằm trong vùng phủ sóng','Nằm ngoài vùng phủ sóng','Nằm đúng trên biên vùng phủ sóng'],r=t==0?h:t==1?h:R_;const ans=d2<r*r?0:d2==r*r?2:1;return Z(`Một trạm phát sóng đặt tại điểm I${pt(...I_)} và phủ sóng trong hình tròn bán kính ${r} (đơn vị km). Một người đứng tại điểm M${pt(...M)}. Người đó`,L[ans],L.filter((_,i)=>i!=ans).concat('Không xác định được'),`Ta cần so sánh khoảng cách từ vị trí người đứng M đến trạm I (độ dài đoạn IM) với bán kính phủ sóng R.
Bình phương khoảng cách IM² = (x<sub>M</sub> - x<sub>I</sub>)² + (y<sub>M</sub> - y<sub>I</sub>)² = (${iz(M[0])} - (${iz(I_[0])}))² + (${iz(M[1])} - (${iz(I_[1])}))² = ${d2}.
Bình phương bán kính phủ sóng R² = ${r}² = ${r*r}.
So sánh: IM² ${d2<r*r?'&lt;':d2==r*r?'=':'&gt;'} R². Vì khoảng cách ${d2<r*r?'nhỏ hơn':d2==r*r?'bằng':'lớn hơn'} bán kính nên người đó ${L[ans].toLowerCase()}.`)},
()=>{const[u,v,h]=P(PY),A=P([-1,1])*u,B=P([-1,1])*v,x=R(-4,4),y=R(-4,4),r=R(2,15),k=P([-1,1])*P([1,2,3]),C=k*h-(A*x+B*y),d=Math.abs(k),cnt=d<r?'2':d==r?'1':'0';return Z(`Trạm radar đặt tại điểm I${pt(x,y)} có tầm quan sát ${r} km. Một tàu chạy trên đường thẳng ${ln(A,B,C)} (đơn vị km). Số điểm chung của đường đi của tàu và vùng quan sát của radar là`,cnt,['0','1','2','3'].filter(z=>z!=cnt),`Vùng quan sát là một hình tròn tâm I, bán kính R = ${r}. Đường đi của tàu là một đường thẳng (d).
Số điểm chung được xác định bằng cách so sánh khoảng cách (h) từ tâm I đến đường thẳng (d) với bán kính R.
Áp dụng công thức tính khoảng cách từ 1 điểm đến đường thẳng: h = |Ax₀ + By₀ + C| / √(A² + B²).
h = |${A}·(${x}) + ${B}·(${y}) + (${C})| / √(${A}² + ${B}²) = |${A*x+B*y+C}| / √(${A*A+B*B}) = ${Math.abs(A*x+B*y+C)} / ${h} = ${d}.
So sánh h = ${d} với R = ${r}: Vì h ${d<r?'&lt;':d==r?'=':'&gt;'} R nên đường thẳng ${d<r?'cắt đường tròn tại 2 điểm phân biệt':d==r?'tiếp xúc với đường tròn tại 1 điểm':'không giao với đường tròn (0 điểm chung)'}.`)},
()=>{const[u,v,h]=P(PY),a=R(-4,4),b=R(-4,4),su=P([-1,1]),sv=P([-1,1]),x0=a+su*u,y0=b+sv*v,A=su*u,B=sv*v,C=-(A*x0+B*y0);return Z(`Tiếp tuyến của đường tròn ${cir(a,b,h*h)} tại điểm M${pt(x0,y0)} thuộc đường tròn là đường thẳng`,ln(A,B,C),[ln(A,B,-C||1),ln(B,A,C),ln(A,-B,C),ln(-A,B,C)].filter(s=>s!=ln(A,B,C)),`Đường tròn có tâm là I(${iz(a)}; ${iz(b)}).
Tiếp tuyến tại điểm M nằm trên đường tròn luôn vuông góc với bán kính đi qua tiếp điểm (vuông góc với IM).
Vì vậy, tiếp tuyến nhận vectơ IM làm vectơ pháp tuyến n.
Tính n = vectơ IM = (x<sub>M</sub> - x<sub>I</sub>; y<sub>M</sub> - y<sub>I</sub>) = (${iz(x0-a)}; ${iz(y0-b)}) = (${A}; ${B}).
Phương trình đường thẳng đi qua M(${iz(x0)}; ${iz(y0)}) nhận n = (${A}; ${B}) làm pháp tuyến:
${A}·(x - (${iz(x0)})) + ${B}·(y - (${iz(y0)})) = 0 ⇔ ${A}x + ${B}y ${sg(C)} = 0, hay ${ln(A,B,C)}.`)},
()=>{const[u,v,h]=P(PY),r1=R(2,6),k=P([0,1,2,3,4]);let r2,L=['Ngoài nhau','Tiếp xúc ngoài','Cắt nhau','Tiếp xúc trong','Đường tròn này nằm trong đường tròn kia'],d=h;if(k==0)r2=Math.max(1,h-r1-1)||1;else if(k==1)r2=h-r1;else if(k==2)r2=h+1;else if(k==3)r2=h+r1;else r2=h+r1+2;if(r2<=0)r2=1;const s=r1+r2,df=Math.abs(r1-r2);const act=d>s?0:d==s?1:d>df?2:d==df?3:4;const a=R(-3,3),b=R(-3,3);return Z(`Cho hai đường tròn (C<sub>1</sub>): ${cir(a,b,r1*r1)} và (C<sub>2</sub>): ${cir(a+u,b+v,r2*r2)}. Vị trí tương đối của hai đường tròn là`,L[act],L.filter((_,i)=>i!=act),`Xác định tâm và bán kính của hai đường tròn:
- (C<sub>1</sub>) có tâm I<sub>1</sub>(${iz(a)}; ${iz(b)}), bán kính R<sub>1</sub> = √${r1*r1} = ${r1}.
- (C<sub>2</sub>) có tâm I<sub>2</sub>(${iz(a+u)}; ${iz(b+v)}), bán kính R<sub>2</sub> = √${r2*r2} = ${r2}.
Tính khoảng cách giữa hai tâm (đoạn nối tâm d): 
d = I<sub>1</sub>I<sub>2</sub> = √(${u}² + ${v}²) = ${h}.
Ta tính tổng R<sub>1</sub> + R<sub>2</sub> = ${s} và hiệu |R<sub>1</sub> − R<sub>2</sub>| = ${df}.
So sánh d với tổng và hiệu trên: Do ${act==0?'d > R1 + R2':act==1?'d = R1 + R2':act==2?'|R1 - R2| < d < R1 + R2':act==3?'d = |R1 - R2|':'d < |R1 - R2|'}, vị trí tương đối là ${L[act].toLowerCase()}.`)},
()=>{let A,B;do{A=[R(-5,5),R(-5,5)];B=[R(-5,5),R(-5,5)]}while((A[0]+B[0])%2||(A[1]+B[1])%2||(A[0]==B[0]&&A[1]==B[1]));const I_=[(A[0]+B[0])/2,(A[1]+B[1])/2],r2=((A[0]-B[0])**2+(A[1]-B[1])**2)/4;return Z(`Phương trình đường tròn có đường kính AB với A${pt(...A)} và B${pt(...B)} là`,cir(I_[0],I_[1],r2),[cir(-I_[0],-I_[1],r2),cir(I_[0],I_[1],4*r2),cir(I_[0],I_[1],Math.sqrt(r2)),cir(I_[0]+1,I_[1],r2),cir(I_[0],I_[1]+1,r2),cir(I_[0]+2,I_[1]-1,r2),cir(I_[0],I_[1],r2+1)].filter(s=>s!=cir(I_[0],I_[1],r2)),`Đường tròn có đường kính AB nên tâm I của đường tròn chính là trung điểm của đoạn thẳng AB.
Tọa độ tâm I: x<sub>I</sub> = (x<sub>A</sub> + x<sub>B</sub>) / 2 = (${iz(A[0])} + ${iz(B[0])}) / 2 = ${I_[0]}. y<sub>I</sub> = (y<sub>A</sub> + y<sub>B</sub>) / 2 = (${iz(A[1])} + ${iz(B[1])}) / 2 = ${I_[1]}.
Bán kính đường tròn bằng nửa đường kính AB: R = AB / 2.
Suy ra R² = (AB / 2)² = AB² / 4 = [(${iz(B[0]-A[0])})² + (${iz(B[1]-A[1])})²] / 4 = ${r2}.
Thay vào phương trình chính tắc của đường tròn (x - a)² + (y - b)² = R², ta có: ${cir(I_[0],I_[1],r2)}.`)},
()=>{const[A,B]=nab(),x1=R(-4,4),y1=R(-4,4),x2=x1+B*R(1,3)*P([-1,1]),y2=y1-A*(x2-x1)/B;if(!Number.isInteger(y2)||x1==x2)return;const dx=x2-x1,dy=y2-y1,g=gcd(Math.abs(dx),Math.abs(dy)),a=-dy/g,b=dx/g,c=-(a*x1+b*y1),s=a<0?-1:1,E=ln(s*a,s*b,s*c);return Z(`Đường thẳng đi qua hai điểm A${pt(x1,y1)} và B${pt(x2,y2)} có phương trình`,E,[ln(s*a,-s*b,s*c),ln(s*b,s*a,s*c),ln(s*a,s*b,-s*c||1),ln(s*a,s*b,s*c+1)].filter(x=>x!=E),`Đường thẳng đi qua A và B nhận vectơ AB làm vectơ chỉ phương u.
Ta tính vectơ u = vectơ AB = (${iz(x2-x1)}; ${iz(y2-y1)}) = (${dx}; ${dy}).
Để phương trình gọn, ta chia các thành phần của u cho ước chung lớn nhất (nếu có): u' = (${b}; ${-a}).
Vectơ pháp tuyến n vuông góc với vectơ chỉ phương. Đổi chỗ tọa độ u' và đổi dấu 1 cái, ta có n = (${s*a}; ${s*b}).
Phương trình tổng quát đi qua A${pt(x1,y1)} nhận n làm pháp tuyến: ${s*a}·(x - (${iz(x1)})) + ${s*b}·(y - (${iz(y1)})) = 0 ⇔ ${E}.`)
}
);
addH('t10td',
()=>{const[u,v,h]=P(PY),W=[-v,u],t0=R(2,6),s=P([1,2,3]);const V=[u,v],D0=[-t0*V[0]+s*W[0],-t0*V[1]+s*W[1]];return I(`Hai tàu chuyển động thẳng đều. Tại thời điểm t = 0 (giờ), tàu B ở vị trí cách tàu A theo vectơ ${pt(...D0)} (km), và vận tốc của tàu B so với tàu A là ${pt(u,v)} (km/h). Hai tàu gần nhau nhất tại thời điểm t (giờ) bằng`,t0,`Gọi hệ tọa độ sao cho tàu A ở gốc tọa độ (0;0). Khi đó, tọa độ tàu B ở thời điểm t chính là vectơ AB.
Vị trí ban đầu của tàu B (lúc t=0) là M₀${pt(...D0)}. 
Tàu B chuyển động với vận tốc so với A là v = ${pt(u,v)}.
Tọa độ của B tại thời điểm t là: AB(t) = M₀ + v·t = (${iz(D0[0])} + ${u}t; ${iz(D0[1])} + ${v}t).
Khoảng cách nhỏ nhất đạt được khi vectơ vị trí AB(t) vuông góc với quỹ đạo chuyển động (vectơ vận tốc v).
Tích vô hướng bằng 0: AB(t) · v = 0 ⇔ (${iz(D0[0])} + ${u}t)·${u} + (${iz(D0[1])} + ${v}t)·${v} = 0.
Giải phương trình bậc nhất theo t: ${D0[0]*u+D0[1]*v} + ${u*u+v*v}t = 0 ⇔ t = ${t0} (giờ).`)},
()=>{const[u,v,h]=P(PY),W=[-v,u],t0=R(2,6),s=P([1,2,3]),V=[u,v],D0=[-t0*V[0]+s*W[0],-t0*V[1]+s*W[1]];return I(`Hai tàu chuyển động thẳng đều. Tại thời điểm t = 0 (giờ), tàu B ở vị trí cách tàu A theo vectơ ${pt(...D0)} (km), và vận tốc của tàu B so với tàu A là ${pt(u,v)} (km/h). Khoảng cách nhỏ nhất giữa hai tàu (km) là`,s*h,`Tương tự câu trước, thiết lập phương trình tọa độ tương đối của B so với A: AB(t) = (${iz(D0[0])} + ${u}t; ${iz(D0[1])} + ${v}t).
Khoảng cách bình phương d² = (${iz(D0[0])} + ${u}t)² + (${iz(D0[1])} + ${v}t)².
Đây là một tam thức bậc hai theo t. Giá trị nhỏ nhất của d² xảy ra tại đỉnh parabol, tương ứng với thời điểm đạo hàm bằng 0 (hoặc t tính bằng tích vô hướng vuông góc).
Ta tính được t_min = ${t0} giờ.
Thay t = ${t0} ngược lại vào công thức khoảng cách để tính khoảng cách thực:
Tại t = ${t0}, vectơ AB = (${iz(D0[0]+u*t0)}; ${iz(D0[1]+v*t0)}). 
Độ dài d_min = √(${iz(D0[0]+u*t0)}² + ${iz(D0[1]+v*t0)}²) = ${s*h} km.`)},
()=>{const p=R(2,9),q=R(2,9);return I(`Đường thẳng d: ${q}x + ${p}y − ${p*q} = 0 cắt hai trục toạ độ Ox, Oy lần lượt tại A và B. Diện tích tam giác OAB bằng (nhập số)`,dn(p*q/2),`Tìm giao điểm của d với các trục tọa độ:
- Giao với trục hoành Ox (cho y = 0): ${q}x - ${p*q} = 0 ⇒ x = ${p}. Tọa độ A(${p}; 0). Độ dài đoạn OA = |${p}| = ${p}.
- Giao với trục tung Oy (cho x = 0): ${p}y - ${p*q} = 0 ⇒ y = ${q}. Tọa độ B(0; ${q}). Độ dài đoạn OB = |${q}| = ${q}.
Tam giác OAB vuông tại gốc tọa độ O. Diện tích tam giác vuông bằng nửa tích hai cạnh góc vuông:
S = 1/2 · OA · OB = 1/2 · ${p} · ${q} = ${f2(p*q/2)}.`)},
()=>{const[R_,k,half]=P([[5,3,4],[10,6,8],[13,5,12],[13,12,5],[17,8,15],[15,9,12]]),a=R(-4,4),b=R(-4,4),[u,v,h]=P([[3,4,5]]),A=u,B=v,C=-(A*a+B*b)+k*5;return I(`Đường tròn tâm I${pt(a,b)} bán kính ${R_} cắt đường thẳng ${ln(A,B,C)} tại hai điểm phân biệt M, N. Độ dài đoạn MN bằng`,2*half,`Bài toán yêu cầu tính độ dài dây cung MN của đường tròn bị cắt bởi một cát tuyến.
Bước 1: Tính khoảng cách d từ tâm I(${iz(a)}; ${iz(b)}) đến đường thẳng (d):
d = |${A}·(${iz(a)}) + ${B}·(${iz(b)}) + (${C})| / √(${A}² + ${B}²) = ${k*5} / 5 = ${k}.
Bước 2: Áp dụng định lý Pythagore trong tam giác vuông tạo bởi bán kính, khoảng cách từ tâm đến dây cung và một nửa dây cung:
R² = d² + (MN / 2)² ⇔ (MN / 2)² = R² - d² = ${R_}² - ${k}² = ${R_*R_} - ${k*k} = ${half*half}.
Lấy căn bậc hai hai vế, ta được nửa độ dài dây cung: MN / 2 = ${half}.
Vậy độ dài đoạn MN = 2 · ${half} = ${2*half}.`)
}
);

/* ===== Ba đường conic (+ thực tế) ===== */
const ELL=[[5,3,4],[5,4,3],[10,6,8],[10,8,6],[13,12,5],[13,5,12],[17,15,8],[17,8,15],[15,12,9],[15,9,12]],HYP=[[3,4,5],[4,3,5],[6,8,10],[8,6,10],[5,12,13],[12,5,13],[8,15,17],[15,8,17],[9,12,15],[12,9,15]];
add('t10cn',
()=>{const[a,b,c]=P(ELL);return N(`Quỹ đạo của một vệ tinh là một elip có độ dài trục lớn ${2*a} (nghìn km) và tiêu cự ${2*c} (nghìn km); Trái Đất ở một tiêu điểm. Khoảng cách gần nhất từ vệ tinh đến Trái Đất (nghìn km) là`,a-c,`Trong elip, độ dài trục lớn là 2a, nên a = ${a}. Tiêu cự là khoảng cách giữa 2 tiêu điểm 2c, nên c = ${c}.
Trái Đất nằm tại một tiêu điểm. Vệ tinh di chuyển trên vành elip.
Khoảng cách từ một điểm M trên elip tới tiêu điểm sẽ đạt giá trị NHỎ NHẤT khi M nằm ở đỉnh gần tiêu điểm đó nhất (đỉnh nằm trên trục lớn).
Khoảng cách nhỏ nhất bằng: a - c = ${a} - ${c} = ${a-c} (nghìn km).`)},
()=>{const[a,b,c]=P(ELL);return N(`Quỹ đạo của một thiên thể là elip có độ dài trục lớn ${2*a} (đơn vị thiên văn) và tiêu cự ${2*c}; Mặt Trời ở một tiêu điểm. Khoảng cách xa nhất từ thiên thể đến Mặt Trời là`,a+c,`Tương tự bài trên, độ dài trục lớn 2a = ${2*a} ⇒ a = ${a}. Tiêu cự 2c = ${2*c} ⇒ c = ${c}.
Mặt Trời nằm tại một tiêu điểm.
Khoảng cách từ thiên thể trên elip tới Mặt Trời đạt giá trị LỚN NHẤT khi nó nằm ở đỉnh xa nhất trên trục lớn đối diện qua tâm.
Khoảng cách lớn nhất bằng: a + c = ${a} + ${c} = ${a+c} (đơn vị thiên văn).`)},
()=>{const[a,b,c]=P(HYP);return N(`Điểm M thuộc hypebol x²/${a*a} − y²/${b*b} = 1 có hai tiêu điểm F<sub>1</sub>, F<sub>2</sub>. Hiệu |MF<sub>1</sub> − MF<sub>2</sub>| bằng`,2*a,`Theo định nghĩa của Hypebol, tập hợp tất cả các điểm M nằm trên hypebol là những điểm có giá trị tuyệt đối của hiệu khoảng cách tới hai tiêu điểm luôn bằng một hằng số 2a.
Từ phương trình chính tắc của hypebol x²/a² - y²/b² = 1, ta nhận diện a² = ${a*a} ⇒ a = ${a}.
Do đó, |MF<sub>1</sub> − MF<sub>2</sub>| = 2a = 2 · ${a} = ${2*a}.`)},
()=>{const[h,d,f]=P([[6,3,3],[8,4,4],[12,6,6],[10,5,5],[12,4,9],[8,2,8]]);return N(`Một chiếc gương đèn pha có mặt cắt là một parabol, miệng gương có đường kính ${2*h} cm và gương sâu ${d} cm. Bóng đèn đặt tại tiêu điểm của parabol. Khoảng cách từ bóng đèn đến đỉnh gương (cm) là`,f,`Chọn hệ trục tọa độ Oxy sao cho đỉnh gương trùng với gốc tọa độ O(0,0), trục đối xứng của gương nằm dọc theo chiều dương của trục Ox. 
Phương trình parabol có dạng: y² = 2px (với p là tham số tiêu).
Miệng gương có đường kính ${2*h} cm nên bán kính miệng là ${h} cm. Gương sâu ${d} cm, nghĩa là khi hoành độ x = ${d}, tung độ tương ứng là y = ±${h}.
Điểm M(${d}; ${h}) nằm trên parabol. Thay vào phương trình: ${h}² = 2p·(${d}) ⇔ ${h*h} = ${2*d}p ⇔ p = ${h*h} / ${2*d} = ${h*h/(2*d)}.
Tiêu điểm của parabol có tọa độ F(p/2; 0). Khoảng cách từ bóng đèn (tiêu điểm) đến đỉnh gương chính là p/2.
Khoảng cách = p / 2 = (${h*h/(2*d)}) / 2 = ${f} cm.`)},
()=>{const[a,b,c]=P(ELL);return Z(`Elip có phương trình ${a*a}x² + ${b*b}y² = ${a*a*b*b} có các tiêu điểm là`,`F<sub>1</sub>(0; ${iz(-c)}), F<sub>2</sub>(0; ${c})`,[`F<sub>1</sub>(${iz(-c)}; 0), F<sub>2</sub>(${c}; 0)`,`F<sub>1</sub>(0; ${iz(-b)}), F<sub>2</sub>(0; ${b})`,`F<sub>1</sub>(${iz(-a)}; 0), F<sub>2</sub>(${a}; 0)`],`Để tìm tiêu điểm, trước hết đưa phương trình elip về dạng chính tắc bằng cách chia cả hai vế cho ${a*a*b*b}:
(${a*a}x²)/${a*a*b*b} + (${b*b}y²)/${a*a*b*b} = 1 ⇔ x²/${b*b} + y²/${a*a} = 1.
Nhận xét: Mẫu số của y² là a² = ${a*a} đang LỚN HƠN mẫu số của x² là b² = ${b*b}. 
Điều này chứng tỏ trục lớn của elip nằm trên trục tung Oy.
Tính tiêu cự: c² = a² - b² = ${a*a} - ${b*b} = ${c*c} ⇒ c = ${c}.
Vì trục lớn nằm trên Oy, các tiêu điểm phải nằm trên trục Oy, có tọa độ dạng (0; ±c). Vậy F<sub>1</sub>(0; -${c}), F<sub>2</sub>(0; ${c}).`)},
()=>{const k=R(1,3),m=R(1,3);return N(`Cổng vòm có dạng nửa elip, rộng ${10*k} m và cao ${5*m} m. Chiều cao của cổng tại điểm cách tâm đáy ${3*k} m (đo theo chiều ngang) là (mét)`,4*m,`Chọn hệ trục Oxy với gốc O là tâm đáy cổng. Trục lớn dọc theo Ox, nửa trên elip là đường biểu diễn vòm cổng.
Chiều rộng cổng là độ dài trục lớn 2a = ${10*k} ⇒ a = ${5*k}.
Chiều cao cổng là nửa độ dài trục nhỏ b = ${5*m}.
Phương trình chính tắc của elip: x²/a² + y²/b² = 1 ⇔ x²/${25*k*k} + y²/${25*m*m} = 1.
Tại vị trí cách tâm ${3*k} m, ta thay x = ${3*k} vào phương trình để tìm chiều cao y:
(${3*k})²/${25*k*k} + y²/${25*m*m} = 1 ⇔ ${9*k*k}/${25*k*k} + y²/${25*m*m} = 1 ⇔ 9/25 + y²/${25*m*m} = 1.
Suy ra y²/${25*m*m} = 1 - 9/25 = 16/25.
y² = (16/25) · ${25*m*m} = ${16*m*m}.
Lấy căn bậc hai (vì chiều cao y > 0): y = ${4*m} m.`)}
);
addH('t10cn',
()=>{const[a,b,c]=P(ELL),e=fr(c,a);return I(`Quỹ đạo của một vệ tinh là elip có độ dài trục lớn ${2*a} và tiêu cự ${2*c}. Tâm sai của quỹ đạo là (nhập phân số tối giản)`,e,`Độ dài trục lớn 2a = ${2*a} ⇒ a = ${a}. Tiêu cự 2c = ${2*c} ⇒ c = ${c}.
Tâm sai e của elip là một đại lượng đặc trưng cho độ "dẹt", được tính bằng tỉ số giữa một nửa tiêu cự và một nửa trục lớn.
Công thức: e = c / a = ${c} / ${a} = ${fq(c,a)}.`)},
()=>{const[h,d,f]=P([[6,3,3],[8,4,4],[12,6,6],[10,5,5]]);return I(`Một ăng-ten parabol có mặt cắt là parabol y² = 2px, miệng ăng-ten rộng ${2*h} m và sâu ${d} m. Giá trị của p là (nhập số)`,dn(h*h/(2*d)),`Miệng ăng-ten rộng ${2*h} m, do tính đối xứng nên phần biên nằm ở độ cao y = ±${h}.
Độ sâu của ăng-ten tương ứng với giá trị x = ${d}.
Vậy điểm (${d}; ${h}) nằm trên đường parabol y² = 2px.
Thay tọa độ x, y vào phương trình: (${h})² = 2p·(${d}) ⇔ ${h*h} = ${2*d}p.
Giải phương trình tìm p: p = ${h*h} / ${2*d} = ${f2(h*h/(2*d))}.`)},
()=>{const[a,b,c]=P(HYP);return I(`Hypebol x²/${a*a} − y²/${b*b} = 1 có một đường tiệm cận là y = kx với k &gt; 0. Giá trị của k là (nhập phân số tối giản hoặc số nguyên)`,fr(b,a),`Từ phương trình chính tắc của hypebol x²/a² - y²/b² = 1, ta rút ra a = √${a*a} = ${a} và b = √${b*b} = ${b}.
Hypebol có 2 đường tiệm cận giao nhau tại gốc tọa độ, với phương trình là y = (b/a)x và y = -(b/a)x.
Đường tiệm cận có dạng y = kx với hệ số góc k > 0 chính là đường y = (b/a)x.
Vậy k = b / a = ${b} / ${a} = ${fq(b,a)}.`)},
()=>{const[a,b,c]=P(ELL);return I(`Một sân vận động có dạng elip với độ dài trục lớn ${2*a} m và độ dài trục nhỏ ${2*b} m. Diện tích sân (m²) bằng kπ. Giá trị của k là`,a*b,`Độ dài trục lớn 2a = ${2*a} ⇒ a = ${a}. Độ dài trục nhỏ 2b = ${2*b} ⇒ b = ${b}.
Diện tích của một hình elip được tính theo công thức S = π · a · b.
Thay số liệu vào: S = π · ${a} · ${b} = ${a*b}π.
So sánh với dạng kπ theo đề bài, ta suy ra giá trị hệ số k = ${a*b}.`)
}
);
})();