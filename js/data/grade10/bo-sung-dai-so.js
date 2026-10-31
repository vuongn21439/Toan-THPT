/* LỚP 10 · BỔ SUNG ĐẠI SỐ (theo các dạng bài trong tài liệu): Mệnh đề & Tập hợp, Hàm số, Hàm số bậc hai, BPT bậc nhất hai ẩn, Tam thức bậc hai, Đại số tổ hợp.
   Có thêm các bài toán thực tế: tối ưu, lợi nhuận, chuyển động ném, đếm số. */
(()=>{const {fr,fq,fh,add,addH,sg,pt,ps,lh,uniq,nzr}=GH,
 cb=(n,k)=>{if(k<0||k>n)return 0;let r=1;for(let i=0;i<k;i++)r=r*(n-i)/(i+1);return Math.round(r)},
 fct=n=>n<2?1:n*fct(n-1),
 sub=(u,k)=>sh([...Array(u)].map((_,i)=>i+1)).slice(0,k).sort((a,b)=>a-b),
 setS=a=>a.length?'{'+a.join('; ')+'}':'∅',
 perms=(d,L)=>{const r=[];const go=(cur,used)=>{if(cur.length==L){r.push(cur);return}for(const x of d)if(!used.has(x)){used.add(x);go([...cur,x],used);used.delete(x)}};go([],new Set());return r},
 fx=(a,b,c)=>ps([c,b,a]),fac=p=>p?`(x ${sg(-p)})`:'x',
 TC=['Nếu a và b là hai số chẵn thì a + b là số chẵn','Nếu tứ giác ABCD là hình chữ nhật thì ABCD có hai đường chéo bằng nhau','Nếu một số tự nhiên có chữ số tận cùng là 5 thì nó chia hết cho 5','Nếu a ≥ b thì a + c ≥ b + c','Số tự nhiên n chia hết cho 6 khi và chỉ khi n chia hết cho 2 và chia hết cho 3'],
 FC=['Nếu a² = b² thì a = b','Nếu số tự nhiên n chia hết cho 3 thì n chia hết cho 9','Nếu tứ giác có hai đường chéo bằng nhau thì nó là hình chữ nhật','Nếu tam giác ABC cân thì nó là tam giác đều','Số tự nhiên n chia hết cho 4 khi và chỉ khi n chia hết cho 2','Nếu a &gt; b thì a² &gt; b²'];

/* ===== Mệnh đề & Tập hợp ===== */
add('t10mt',
()=>{const m=R(2,7),n=m*R(3,9)+R(0,m-1);return N(`Tập hợp A = {x ∈ ℕ* | x ≤ ${n} và x chia hết cho ${m}} có số phần tử là`,Math.floor(n/m),`Các số tự nhiên dương x chia hết cho ${m} và x ≤ ${n} tạo thành một cấp số cộng: ${m}, ${2*m}, ${3*m}, …, ${m*Math.floor(n/m)}. Số lượng phần tử của tập hợp A được tính bằng công thức: (Số lớn nhất - Số bé nhất) / Khoảng cách + 1 = (${m*Math.floor(n/m)} - ${m}) / ${m} + 1 = ⌊${n}/${m}⌋ = ${Math.floor(n/m)} phần tử.`)},
()=>{const a=sub(12,R(5,8)),b=sub(12,R(5,8)),d=a.filter(x=>!b.includes(x));return N(`Cho A = ${setS(a)} và B = ${setS(b)}. Số phần tử của tập hợp A \\ B là`,d.length,`Phép toán A \\ B (hiệu của hai tập hợp) lấy ra các phần tử thuộc tập hợp A nhưng KHÔNG thuộc tập hợp B. Từ A = ${setS(a)}, ta loại bỏ đi các phần tử có mặt trong B. Các phần tử còn lại là: ${setS(d)}. Vậy tập hợp A \\ B có ${d.length} phần tử.`)},
()=>{const c=R(2,8),a=c+R(2,12),b=c+R(2,12);return N(`Một lớp có ${a} bạn chơi bóng đá, ${b} bạn chơi bóng rổ, trong đó có ${c} bạn chơi cả hai môn. Số bạn chỉ chơi đúng một môn là`,a+b-2*c,`Số bạn CHỈ chơi môn bóng đá (không chơi bóng rổ) là: Tổng số bạn chơi bóng đá trừ đi số bạn chơi cả hai môn = ${a} − ${c} = ${a-c} bạn. Tương tự, số bạn CHỈ chơi bóng rổ là: ${b} − ${c} = ${b-c} bạn. Vậy số học sinh chỉ chơi đúng một trong hai môn này là: ${a-c} + ${b-c} = ${a+b-2*c} bạn.`)},
()=>{let p,q;do{p=R(-5,6);q=R(-5,6)}while(p==q);const x=P([p,q]),w=uniq(x,[p+1,q-1,-p,p+q,p*q,q+2,p-2,q+3,-q-1]).map(iz);return Z(`Mệnh đề chứa biến P(x): "${ps([p*q,-(p+q),1])} = 0" là mệnh đề đúng khi x bằng`,iz(x),w,`Mệnh đề P(x) đúng khi giá trị x thay vào làm cho phương trình bậc hai xảy ra dấu bằng. Giải phương trình: ${ps([p*q,-(p+q),1])} = 0 ⇔ (x ${sg(-p)})(x ${sg(-q)}) = 0. Phương trình này có hai nghiệm là x = ${iz(p)} hoặc x = ${iz(q)}. Trong các đáp án đã cho, chỉ có x = ${iz(x)} là nghiệm đúng của phương trình.`)},
()=>{const t=P([0,1]),a=t?P(FC):P(TC),w=sh(t?TC:FC).slice(0,3);return Z(`Mệnh đề nào sau đây ${t?'sai':'đúng'}?`,a,w,t?'Mệnh đề này sai vì ta có thể chỉ ra một phản ví dụ thực tế. (Chẳng hạn với a = 2, b = −2 thì a² = b² nhưng a ≠ b; hoặc n = 3 thì 3 chia hết cho 3 nhưng không chia hết cho 9). Các mệnh đề còn lại đều đúng với mọi trường hợp.':'Đây là mệnh đề luôn đúng theo tính chất toán học. Ba mệnh đề còn lại đều sai vì tồn tại các phản ví dụ (trường hợp ngoại lệ làm cho mệnh đề sai).')},
()=>{const n=R(4,9),t=P([0,1]);return N(t?`Tập hợp A có ${n} phần tử. Số tập con của A không chứa một phần tử a cho trước là`:`Tập hợp A có ${n} phần tử. Số tập con của A có đúng 2 phần tử là`,t?2**(n-1):cb(n,2),t?`Khi yêu cầu tập con không chứa một phần tử a cố định, ta loại phần tử a đó ra khỏi tập A. Tập A lúc này còn lại ${n-1} phần tử tự do. Số lượng tập con có thể tạo ra từ ${n-1} phần tử này là 2<sup>${n-1}</sup> = ${2**(n-1)} tập con.`:`Mỗi tập con có đúng 2 phần tử tương ứng với một cách chọn 2 phần tử từ ${n} phần tử của tập A (không quan tâm thứ tự). Số cách chọn là tổ hợp chập 2 của ${n}: C(${n}, 2) = ${cb(n,2)} tập con.`)},
()=>{const a=R(-6,3),b=a+R(3,10);return N(`Số số nguyên thuộc nửa khoảng [${iz(a)}; ${iz(b)}) là`,b-a,`Nửa khoảng [${iz(a)}; ${iz(b)}) bao gồm các số thực x sao cho ${iz(a)} ≤ x < ${iz(b)}. Do x là số nguyên nên x sẽ lấy các giá trị từ ${iz(a)} đến ${iz(b-1)}. Số lượng số nguyên thỏa mãn là: ${iz(b-1)} - (${iz(a)}) + 1 = ${b-a} số.`)}
);
addH('t10mt',
()=>{const a=R(-4,0),b=a+R(6,12),k=R(1,3);return I(`Cho A = [m; m + ${k}] và B = (${iz(a)}; ${iz(b)}). Có bao nhiêu giá trị nguyên của m để A ⊂ B?`,Math.max(0,b-k-a-1),`Để đoạn A nằm hoàn toàn trong khoảng B (A ⊂ B), thì điểm đầu và điểm cuối của A phải nằm lọt hẳn bên trong khoảng B. Tức là: m > ${iz(a)} và m + ${k} < ${iz(b)}. Giải hệ bất phương trình này ta được: ${iz(a)} < m < ${iz(b-k)}. Vì m là số nguyên nên m ∈ {${a+1}, ${a+2}, ..., ${b-k-1}}. Vậy có tổng cộng ${Math.max(0,b-k-a-1)} giá trị nguyên của m.`)},
()=>{let n,a,b,c,both;do{n=R(30,50);a=R(18,28);b=R(16,26);c=R(1,5);both=a+b-(n-c)}while(both<1||both>Math.min(a,b));return I(`Khảo sát ${n} học sinh thì có ${a} bạn thích bóng đá, ${b} bạn thích cầu lông và ${c} bạn không thích môn nào trong hai môn đó. Số bạn thích cả hai môn là`,both,`Đầu tiên, số bạn thích ÍT NHẤT một môn (bóng đá hoặc cầu lông hoặc cả hai) là tổng số học sinh trừ đi những bạn không thích môn nào: ${n} − ${c} = ${n-c} bạn. Theo công thức tính số phần tử của hợp hai tập hợp n(A ∪ B) = n(A) + n(B) - n(A ∩ B), ta có số bạn thích cả hai môn là: (số bạn thích bóng đá) + (số bạn thích cầu lông) − (số bạn thích ít nhất 1 môn) = ${a} + ${b} − ${n-c} = ${both} bạn.`)},
()=>{const n=R(3,9);return I(`Tập hợp A có ${2**n} tập con. Số phần tử của A là`,n,`Theo lý thuyết, một tập hợp có n phần tử thì số tập con của nó được tính bằng công thức 2<sup>n</sup>. Ở đây bài cho số tập con là ${2**n}. Giải phương trình 2<sup>n</sup> = ${2**n}, ta dễ dàng suy ra n = ${n}. Vậy tập A có ${n} phần tử.`)
});

/* ===== Hàm số & tập xác định ===== */
add('t10hs',
()=>{const k=nzr(-6,6),t=P([0,1]),ans=t?`[${iz(k)}; +∞)`:`(−∞; ${iz(k)}]`;return Z(`Tập xác định của hàm số y = √(${t?`x ${sg(-k)}`:`${iz(k)} − x`}) là`,ans,[t?`(${iz(k)}; +∞)`:`(−∞; ${iz(k)})`,t?`[${iz(-k)}; +∞)`:`(−∞; ${iz(-k)}]`,'ℝ',t?`(−∞; ${iz(k)}]`:`[${iz(k)}; +∞)`],`Để hàm số chứa căn bậc hai xác định, biểu thức dưới dấu căn phải lớn hơn hoặc bằng 0. Ta có điều kiện: ${t?`x ${sg(-k)} ≥ 0 ⇔ x ≥ ${iz(k)}`:`${iz(k)} − x ≥ 0 ⇔ x ≤ ${iz(k)}`}. Chuyển sang kí hiệu khoảng/đoạn, tập xác định là ${ans}.`)},
()=>{const k=nzr(-6,6),ans=`ℝ∖{${iz(k)}}`;return Z(`Tập xác định của hàm số y = ${fh(P([1,3,5,-2]),`x ${sg(-k)}`)} là`,ans,[`ℝ∖{${iz(-k)}}`,'ℝ',`(${iz(k)}; +∞)`,`ℝ∖{0; ${iz(k)}}`],`Hàm số phân thức xác định khi và chỉ khi mẫu số khác 0. Điều kiện là: x ${sg(-k)} ≠ 0 ⇔ x ≠ ${iz(k)}. Do đó, tập xác định là toàn bộ tập số thực ℝ loại bỏ đi giá trị ${iz(k)}, kí hiệu là ${ans}.`)},
()=>{let a,b;do{a=R(-4,3);b=R(-4,5)}while(b<=a);const ans=`[${iz(a)}; +∞)∖{${iz(b)}}`;return Z(`Tập xác định của hàm số y = √(x ${sg(-a)}) + ${fh(1,`x ${sg(-b)}`)} là`,ans,[`(${iz(a)}; +∞)∖{${iz(b)}}`,`[${iz(a)}; +∞)`,`[${iz(a)}; +∞)∖{${iz(a)}}`,`ℝ∖{${iz(b)}}`],`Hàm số có chứa cả căn bậc hai và phân thức. Ta có 2 điều kiện cần thỏa mãn đồng thời: 1) Trong căn phải không âm: x ${sg(-a)} ≥ 0 ⇔ x ≥ ${iz(a)}. 2) Mẫu số phải khác 0: x ${sg(-b)} ≠ 0 ⇔ x ≠ ${iz(b)}. Vì ${iz(b)} nằm trong khoảng [${iz(a)}; +∞) (do ${iz(b)} > ${iz(a)}), nên ta lấy [${iz(a)}; +∞) loại đi điểm ${iz(b)}. Tập xác định là: ${ans}.`)},
()=>{const p=R(-4,4),q=R(-6,6),a=R(1,4),b=R(1,5),v=(a*-1+p)+(b*b-q);return N(`Cho hàm số f(x) = { ${ps([p,1])} nếu x &lt; 0 ; ${ps([-q,0,1])} nếu x ≥ 0 }. Giá trị của f(${iz(-a)}) + f(${b}) bằng`,v,`Hàm số được định nghĩa theo từng khoảng. Để tính f(${iz(-a)}), do ${iz(-a)} &lt; 0 nên ta thay vào nhánh trên: f(${iz(-a)}) = ${iz(-a)} ${sg(p)} = ${iz(-a+p)}. Để tính f(${b}), do ${b} ≥ 0 nên ta thay vào nhánh dưới: f(${b}) = ${b}² ${sg(-q)} = ${iz(b*b-q)}. Cuối cùng, tổng f(${iz(-a)}) + f(${b}) = ${iz(-a+p)} + ${iz(b*b-q)} = ${iz(v)}.`,iz,1)},
()=>{const t=R(0,2),L=['Hàm số chẵn','Hàm số lẻ','Hàm số vừa chẵn vừa lẻ','Hàm số không chẵn, không lẻ'];let f,ans;if(t==0){const a=nzr(-3,3),b=R(-4,4);f=ps([0,b,0,a]);ans=1}else if(t==1){const a=nzr(-3,3),c=R(-5,5);f=P([ps([c,0,a]),ps([c,0,-1,0,a])]);ans=0}else{const a=nzr(-3,3),b=nzr(-4,4),c=R(-5,5);f=ps([c,b,a]);ans=3}const w=L.filter((_,i)=>i!=ans);return Z(`Xét tính chẵn, lẻ của hàm số y = f(x) = ${f}.`,L[ans],w,ans==1?'Tập xác định D = ℝ là tập đối xứng. Ta có f(−x) = −f(x) với mọi x ∈ D. Do đó đây là hàm số lẻ.':ans==0?'Tập xác định D = ℝ là tập đối xứng. Ta có f(−x) = f(x) với mọi x ∈ D. Do đó đây là hàm số chẵn.':'Tập xác định D = ℝ đối xứng, nhưng khi thay x bằng −x, ta thấy f(−x) khác f(x) và cũng khác −f(x). Do đó hàm số này không chẵn, không lẻ.')},
()=>{const a=nzr(-5,5),b=R(-6,6),inc=a>0,ans=inc?'Đồng biến trên ℝ':'Nghịch biến trên ℝ';return Z(`Hàm số y = ${ps([b,a])} có tính chất nào sau đây?`,ans,[inc?'Nghịch biến trên ℝ':'Đồng biến trên ℝ','Đồng biến trên (0; +∞)','Không đơn điệu trên ℝ'],`Hàm số bậc nhất y = ax + b có tính đơn điệu phụ thuộc vào hệ số góc a. Ở đây, hệ số a = ${iz(a)}. Vì a = ${iz(a)} ${inc?'&gt;':'&lt;'} 0 nên hàm số ${inc?'đồng biến':'nghịch biến'} trên toàn trục số ℝ.`)},
()=>{const a=R(-5,5),b=R(-6,6);return N(`Giá trị nhỏ nhất của hàm số y = |x ${sg(-a)}| ${sg(b)} là`,b,`Ta biết rằng giá trị tuyệt đối luôn không âm: |x ${sg(-a)}| ≥ 0 với mọi x. Cộng cả hai vế cho ${iz(b)}, ta được: |x ${sg(-a)}| ${sg(b)} ≥ ${iz(b)} với mọi x. Dấu bằng xảy ra khi x = ${iz(a)}. Do đó giá trị nhỏ nhất của hàm số là ${iz(b)}.`,iz,1)}
);
addH('t10hs',
()=>{const a=R(-3,6);return I(`Tìm giá trị nguyên lớn nhất của tham số m để hàm số y = √(x − m) xác định với mọi x ∈ (${iz(a)}; +∞).`,a,`Hàm số xác định khi và chỉ khi biểu thức trong căn không âm: x − m ≥ 0 ⇔ x ≥ m. Để hàm số xác định trên khoảng (${iz(a)}; +∞), thì tập (${iz(a)}; +∞) phải là tập con của tập xác định [m; +∞). Điều này xảy ra khi và chỉ khi m ≤ ${iz(a)}. Do bài toán hỏi giá trị NGUYÊN LỚN NHẤT của m thỏa mãn m ≤ ${iz(a)}, nên đáp án chính là ${iz(a)}.`)},
()=>{const b=R(-6,2),a=b+R(2,9);return I(`Có bao nhiêu số nguyên thuộc tập xác định của hàm số y = √(${iz(a)} − x) + √(x ${sg(-b)})?`,a-b+1,`Hàm số xác định khi cả hai căn thức đều có nghĩa. Ta có hệ điều kiện: 1) ${iz(a)} − x ≥ 0 ⇔ x ≤ ${iz(a)}. 2) x ${sg(-b)} ≥ 0 ⇔ x ≥ ${iz(b)}. Kết hợp lại, tập xác định là đoạn [${iz(b)}; ${iz(a)}]. Các số nguyên x thỏa mãn là ${iz(b)}, ${iz(b+1)}, ..., ${iz(a)}. Số lượng số nguyên bằng: (Số cuối - Số đầu) + 1 = ${iz(a)} - (${iz(b)}) + 1 = ${a-b+1} số.`)},
()=>{const k=R(-4,5),t=P([0,1]);return I(t?`Có bao nhiêu giá trị nguyên của m thuộc đoạn [−10; 10] để hàm số y = (m − ${iz(k)})x + 3 đồng biến trên ℝ?`:`Có bao nhiêu giá trị nguyên của m thuộc đoạn [−10; 10] để hàm số y = (${iz(k)} − m)x + 3 đồng biến trên ℝ?`,t?10-k:k+10,t?`Hàm số bậc nhất y = ax + b đồng biến trên ℝ khi và chỉ khi hệ số góc a > 0. Ở đây a = m − ${iz(k)}, ta cần m − ${iz(k)} > 0 ⇔ m > ${iz(k)}. Vì m là số nguyên thuộc đoạn [−10; 10], nên m ∈ {${k+1}, ${k+2}, ..., 10}. Số lượng các giá trị này là 10 - (${k+1}) + 1 = ${10-k} số.`:`Hàm số bậc nhất đồng biến trên ℝ khi hệ số góc dương. Tức là ${iz(k)} − m > 0 ⇔ m < ${iz(k)}. Vì m nguyên và thuộc đoạn [−10; 10] nên m ∈ {−10, −9, ..., ${k-1}}. Số lượng giá trị m là: ${k-1} - (-10) + 1 = ${k+10} số.`)},
()=>{const a=nzr(-3,3),b=R(-5,5),x=R(-3,3);return I(`Cho hàm số f(x) = ${ps([b,a])}. Giá trị của f(f(${iz(x)})) bằng`,a*(a*x+b)+b,`Đầu tiên, ta tính giá trị lớp bên trong là f(${iz(x)}) bằng cách thay x = ${iz(x)} vào hàm f: f(${iz(x)}) = ${iz(a)}·(${iz(x)}) ${sg(b)} = ${iz(a*x+b)}. Tiếp theo, ta thay kết quả vừa tính được vào lại hàm f để tìm lớp bên ngoài: f(f(${iz(x)})) = f(${iz(a*x+b)}) = ${iz(a)}·(${iz(a*x+b)}) ${sg(b)} = ${iz(a*(a*x+b)+b)}.`)},
()=>{const a=nzr(-4,4),b=R(-6,6),x1=R(-3,0),x2=R(1,4);return I(`Đường thẳng y = ax + b đi qua hai điểm A${pt(x1,a*x1+b)} và B${pt(x2,a*x2+b)}. Giá trị của a + b bằng`,a+b,`Hệ số góc của đường thẳng đi qua A và B được tính bằng công thức: a = (y<sub>B</sub> − y<sub>A</sub>) / (x<sub>B</sub> − x<sub>A</sub>) = (${iz(a*x2+b)} − (${iz(a*x1+b)})) / (${iz(x2)} − (${iz(x1)})) = ${iz(a)}. Sau khi có a = ${iz(a)}, phương trình đường thẳng là y = ${iz(a)}x + b. Thay toạ độ điểm A vào: ${iz(a*x1+b)} = ${iz(a)}·(${iz(x1)}) + b ⇔ b = ${iz(b)}. Vậy tổng a + b = ${iz(a)} + ${iz(b)} = ${iz(a+b)}.`)
});

/* ===== Hàm số bậc hai ===== */
add('t10bh',
()=>{const a=nzr(-4,4),b=R(-5,5),c=R(-6,6);return N(`Parabol y = ax² + bx + c đi qua A(0; ${iz(c)}), B(1; ${iz(a+b+c)}) và C(−1; ${iz(a-b+c)}). Hệ số a bằng`,a,`Thay toạ độ 3 điểm vào hàm số, ta có hệ phương trình:
- Qua A(0; ${iz(c)}) ⇔ a·0² + b·0 + c = ${iz(c)} ⇔ c = ${iz(c)}.
- Qua B(1; ${iz(a+b+c)}) ⇔ a·1² + b·1 + c = ${iz(a+b+c)} ⇔ a + b + ${iz(c)} = ${iz(a+b+c)} (1).
- Qua C(−1; ${iz(a-b+c)}) ⇔ a·(-1)² + b·(-1) + c = ${iz(a-b+c)} ⇔ a - b + ${iz(c)} = ${iz(a-b+c)} (2).
Cộng vế theo vế phương trình (1) và (2), ta triệt tiêu được b: 2a + 2·(${iz(c)}) = ${iz(a+b+c)} + ${pa(a-b+c)} ⇔ 2a = ${iz(a+b+c+a-b+c)} - ${iz(2*c)} = ${iz(2*a)}. Suy ra a = ${a}.`,iz,1)},
()=>{let p,q;do{p=R(-5,5);q=R(-5,5)}while(p==q);const t=P([0,1,2]),f=t==0?ps([p*q,-(p+q),1]):t==1?ps([p*p,-2*p,1]):ps([p*p+1,-2*p,1]),ans=['2','1','0'][t];return Z(`Số giao điểm của parabol y = ${f} với trục hoành là`,ans,['0','1','2','3'].filter(x=>x!=ans),`Để tìm số giao điểm với trục hoành (trục Ox có phương trình y = 0), ta giải phương trình hoành độ giao điểm: ${f} = 0.
Tính biệt thức Δ = b² - 4ac = ${t==0?`(${iz(-(p+q))})² − 4·1·${pa(p*q)} = ${(p-q)**2} &gt; 0`:t==1?'0':'−4 &lt; 0'}.
${t==0?'Vì Δ &gt; 0, phương trình có 2 nghiệm phân biệt nên parabol cắt trục hoành tại 2 điểm.':t==1?'Vì Δ = 0, phương trình có nghiệm kép nên parabol tiếp xúc với trục hoành tại 1 điểm.':'Vì Δ &lt; 0, phương trình vô nghiệm nên parabol không cắt trục hoành (0 điểm).'}`)},
()=>{const k=R(-6,6),t=R(0,2),L=['0','1','2'],f=2*(k+1)+0;const cnt=1+k>0?2:1+k==0?1:0;return Z(`Số giao điểm của parabol y = x² và đường thẳng y = 2x ${sg(k)} là`,''+cnt,['0','1','2','3'].filter(x=>x!=cnt),`Lập phương trình hoành độ giao điểm của parabol và đường thẳng: x² = 2x ${sg(k)} ⇔ x² − 2x ${sg(-k)} = 0.
Tính biệt thức Δ′ = b′² - ac = (-1)² - 1·(${iz(-k)}) = 1 + ${iz(k)} = ${1+k}.
${1+k>0?'Vì Δ′ &gt; 0, phương trình có 2 nghiệm phân biệt. Vậy có 2 giao điểm.':1+k==0?'Vì Δ′ = 0, phương trình có nghiệm kép. Vậy có 1 giao điểm.':'Vì Δ′ &lt; 0, phương trình vô nghiệm. Vậy không có giao điểm.'}`)},
()=>{const b=2*nzr(-5,5),c=R(-6,6);return N(`Giá trị lớn nhất của hàm số y = −x² ${sg(b)}x ${sg(c)} là`,c+b*b/4,`Hàm số bậc hai có hệ số a = -1 &lt; 0 nên đồ thị là parabol bề lõm hướng xuống, do đó hàm số sẽ đạt giá trị lớn nhất tại đỉnh của parabol.
Hoành độ đỉnh là x = −b/(2a) = −${iz(b)} / (2·(−1)) = ${iz(b/2)}.
Tung độ đỉnh (giá trị lớn nhất) là y = y(${iz(b/2)}) = −(${iz(b/2)})² + ${iz(b)}·(${iz(b/2)}) ${sg(c)} = ${iz(c+b*b/4)}.`,iz,1)},
()=>{const p=nzr(-4,4),q=nzr(-5,5),ans=ps([q+p*p,-2*p,1]);return Z(`Tịnh tiến đồ thị hàm số y = x² sang ${p>0?'phải':'trái'} ${Math.abs(p)} đơn vị, rồi ${q>0?'lên trên':'xuống dưới'} ${Math.abs(q)} đơn vị được đồ thị hàm số`,ans,[ps([q+p*p,2*p,1]),ps([-q+p*p,-2*p,1]),ps([q,-2*p,1]),ps([q-p*p,-2*p,1])],`Quy tắc tịnh tiến đồ thị y = f(x):
- Sang phải p đơn vị: thay x bằng (x − p); sang trái p đơn vị: thay x bằng (x + p). Do ta tịnh tiến sang ${p>0?'phải':'trái'} ${Math.abs(p)} đơn vị, ta thay x bằng (x ${sg(-p)}).
- Lên trên q đơn vị: cộng thêm q vào f(x); xuống dưới q đơn vị: trừ đi q. Do ta tịnh tiến ${q>0?'lên trên':'xuống dưới'} ${Math.abs(q)} đơn vị, ta cộng thêm ${iz(q)}.
Vậy hàm số mới là y = (x ${sg(-p)})² ${sg(q)} = x² ${sg(-2*p)}x + ${iz(p*p)} ${sg(q)} = ${ans}.`)},
()=>{let h,x0;do{h=R(-4,4);x0=R(-5,5)}while(x0==h);const y0=R(-6,6),ans=pt(2*h-x0,y0);return Z(`Parabol (P) có trục đối xứng là đường thẳng x = ${iz(h)}. Điểm đối xứng với A${pt(x0,y0)} qua trục đối xứng là`,ans,[pt(x0,-y0-1),pt(-x0,y0+1),pt(2*h+x0,y0),pt(h-x0,y0),pt(x0+1,y0),pt(2*h-x0+2,y0)],`Phép đối xứng qua đường thẳng đứng x = ${iz(h)} sẽ giữ nguyên tung độ của điểm (y không đổi), và hoành độ mới x' thỏa mãn trung điểm của đoạn thẳng nối hai điểm chính là trục đối xứng: (x + x')/2 = ${iz(h)} ⇔ x' = 2h − x.
Áp dụng: Tung độ mới y' = y<sub>A</sub> = ${iz(y0)}. Hoành độ mới x' = 2·(${iz(h)}) − (${iz(x0)}) = ${iz(2*h-x0)}. Vậy điểm đối xứng là ${ans}.`)},
()=>{const sa=P([1,-1]),sb=P([1,-1]),sc=P([1,-1]),dir=sa>0?'bề lõm hướng lên':'bề lõm hướng xuống',pos=sa*sb<0?'nằm bên phải trục tung':'nằm bên trái trục tung',cy=sc>0?'phía trên':'phía dưới',all=[[1,-1,1],[1,1,1],[-1,1,-1],[-1,-1,1],[1,-1,-1],[-1,1,1],[1,1,-1],[-1,-1,-1]],f=t=>`a ${t[0]>0?'&gt;':'&lt;'} 0, b ${t[1]>0?'&gt;':'&lt;'} 0, c ${t[2]>0?'&gt;':'&lt;'} 0`;return Z(`Parabol y = ax² + bx + c có ${dir}, đỉnh ${pos} và cắt trục tung ở ${cy} gốc toạ độ. Khẳng định nào sau đây đúng?`,f([sa,sb,sc]),all.filter(t=>!(t[0]==sa&&t[1]==sb&&t[2]==sc)).map(f),`Phân tích từng dấu hiệu:
1. Parabol có ${dir} nên hệ số a ${sa>0?'&gt;':'&lt;'} 0.
2. Hoành độ đỉnh là x = −b/(2a). Do đỉnh ${pos} nên hoành độ x ${sa*sb<0?'&gt; 0':'&lt; 0'}. Vì a ${sa>0?'&gt;':'&lt;'} 0 nên −b phải ${sa>0?(sa*sb<0?'&gt; 0':'&lt; 0'):(sa*sb<0?'&lt; 0':'&gt; 0')}, suy ra b ${sb>0?'&gt;':'&lt;'} 0.
3. Giao điểm với trục tung là C(0; c). Vì nó cắt ${cy} trục hoành nên c ${sc>0?'&gt;':'&lt;'} 0. Kết luận: ` + f([sa,sb,sc]) + `.`)}
);
addH('t10bh',
()=>{const k=R(1,4),h0=R(0,3),v=10*k;return I(`Một quả bóng được ném lên từ độ cao ${h0} m. Độ cao của bóng (tính bằng mét) sau t giây là h(t) = −5t² + ${v}t + ${h0}. Độ cao lớn nhất mà bóng đạt được là (mét)`,h0+5*k*k,`Hàm số độ cao h(t) là một hàm số bậc hai với biến t, có hệ số a = -5 < 0 nên đồ thị là một parabol quay bề lõm xuống dưới.
Bóng đạt độ cao lớn nhất tại đỉnh của parabol. Thời điểm đạt cực đại là t = −b/(2a) = −${v} / (2·(−5)) = ${k} (giây).
Thay t = ${k} vào phương trình chuyển động, ta tính được độ cao cực đại lớn nhất là: h(${k}) = −5·(${k})² + ${v}·(${k}) + ${h0} = ${h0+5*k*k} (m).`)},
()=>{const a=2*R(2,5),h=4*R(1,4),x=a/2;return I(`Một cổng có dạng parabol, chân cổng rộng ${2*a} m và đỉnh cổng cao ${h} m. Chiều cao của cổng tại vị trí cách trục đối xứng ${x} m là (mét)`,h*3/4,`Chọn hệ trục tọa độ Oxy sao cho đỉnh cổng trùng với gốc tọa độ, trục Oy là trục đối xứng (hướng xuống). Khi đó parabol có dạng y = kx².
Vì chân cổng rộng ${2*a} m nên mỗi nửa là ${a} m. Điểm chân cổng có tọa độ (${a}; -${h}) nằm trên đồ thị.
Thay vào ta có: -${h} = k·(${a})² ⇔ k = -${h}/${a*a}. Phương trình parabol là y = -${h}x²/${a*a}.
Hoặc nếu chọn gốc tọa độ ở chân trục đối xứng, phương trình là y = ${h}(1 − x²/${a*a}).
Tại vị trí cách trục đối xứng x = ${x} m, ta thay x = ${x} vào hàm số: y = ${h}·(1 − (${x})²/${a*a}) = ${h}·(1 - 1/4) = ${h}·3/4 = ${h*3/4} m.`)},
()=>{const k=R(1,4),m=R(2,6),Nn=2*k*m;return I(`Một cửa hàng bán một món hàng với giá x (nghìn đồng) thì mỗi ngày bán được ${Nn} − ${k}x sản phẩm (0 &lt; x &lt; ${Nn/k}). Giá bán x (nghìn đồng) để doanh thu mỗi ngày lớn nhất là`,Nn/(2*k),`Doanh thu (kí hiệu là R(x)) được tính bằng Giá bán nhân với Số lượng sản phẩm bán được.
Ta có hàm doanh thu: R(x) = x·(${Nn} − ${k}x) = −${k}x² + ${Nn}x.
Đây là hàm số bậc hai với a = -${k} < 0, nên nó đạt giá trị lớn nhất tại hoành độ đỉnh parabol: x = −b/(2a) = −${Nn} / (2·(−${k})) = ${Nn/(2*k)} (nghìn đồng).`)},
()=>{const j=R(2,8),L=4*j;return I(`Một người dùng ${L} m lưới để rào ba cạnh của một mảnh vườn hình chữ nhật (cạnh còn lại là bức tường sẵn có). Diện tích lớn nhất của mảnh vườn là (m²)`,2*j*j,`Gọi x (m) là chiều dài của hai cạnh góc vuông song song với nhau và vuông góc với tường (x > 0).
Tổng 3 cạnh rào là ${L} m, nên cạnh còn lại song song với tường sẽ có độ dài là ${L} − 2x (m).
Diện tích mảnh vườn là hàm bậc hai theo x: S(x) = x·(${L} − 2x) = −2x² + ${L}x.
Hàm số này đạt giá trị lớn nhất tại đỉnh parabol x = −b/(2a) = −${L} / (2·(−2)) = ${j} (m).
Khi x = ${j}, diện tích lớn nhất đạt được là S(${j}) = −2·(${j})² + ${L}·${j} = ${2*j*j} m².`)},
()=>{let k,m,c;do{k=R(1,3);m=R(4,10);c=R(2,6)}while((m+c)%2);return I(`Giá bán x (triệu đồng) của một sản phẩm có giá vốn ${c} triệu đồng. Số sản phẩm bán được là ${k*m} − ${k==1?'':k}x. Giá bán x (triệu đồng) để lợi nhuận lớn nhất là`,(m+c)/2,`Lợi nhuận được tính bằng: Lợi nhuận = (Giá bán - Giá vốn) × Số lượng.
Hàm lợi nhuận P(x) = (x − ${c})·(${k*m} − ${k==1?'':k}x) = ${k==1?'':k+'·'}(x − ${c})(${m} − x) = ${k==1?'':k+'·'}(-${k}x² + ${k*(m+c)}x - ${k*m*c}).
Đây là parabol có hệ số a âm, quay bề lõm xuống. Nó cắt trục hoành tại 2 điểm là x = ${c} và x = ${m}.
Hoành độ đỉnh parabol (nơi đạt lợi nhuận lớn nhất) chính là trung bình cộng của 2 nghiệm này: x = (${c} + ${m}) / 2 = ${(m+c)/2} (triệu đồng).`)},
()=>{const m=R(2,6);return I(`Tìm giá trị nguyên nhỏ nhất của m để hàm số y = x² − 2mx + 1 nghịch biến trên khoảng (−∞; ${m}).`,m,`Hàm số bậc hai y = x² − 2mx + 1 có hệ số a = 1 > 0 nên đồ thị là parabol quay lên. Hàm số sẽ nghịch biến trên khoảng (−∞; x_đỉnh) và đồng biến trên khoảng (x_đỉnh; +∞).
Tọa độ đỉnh là x = −b/(2a) = 2m / 2 = m. Vậy hàm số nghịch biến trên khoảng (−∞; m).
Để hàm số nghịch biến trên khoảng đã cho (−∞; ${m}), thì tập (−∞; ${m}) phải là tập con của khoảng nghịch biến thực sự (−∞; m).
Điều này tương đương với: ${m} ≤ m. 
Do yêu cầu tìm giá trị nguyên nhỏ nhất của m thỏa mãn bất phương trình m ≥ ${m}, nên đáp án là m = ${m}.`)
});

/* ===== Bất phương trình bậc nhất hai ẩn (+ bài toán thực tế) ===== */
const lp=()=>{let a1,b1,c1,a2,b2,c2,p,q,best=0;do{a1=R(1,4);b1=R(1,4);a2=R(1,4);b2=R(1,4)}while(a1*b2==a2*b1);c1=R(14,40);c2=R(14,40);p=R(2,9);q=R(2,9);for(let x=0;x<=40;x++)for(let y=0;y<=40;y++)if(a1*x+b1*y<=c1&&a2*x+b2*y<=c2)best=Math.max(best,p*x+q*y);return{a1,b1,c1,a2,b2,c2,p,q,best}};
add('t10bpt',
()=>{const A=R(60,150),a=R(8,20),B=R(20,60),b=a+R(5,20),x=Math.floor((A-B)/(b-a))+1;return N(`Gói cước A có phí cố định ${A} nghìn đồng và ${a} nghìn đồng mỗi GB. Gói cước B có phí cố định ${B} nghìn đồng và ${b} nghìn đồng mỗi GB. Để gói A rẻ hơn gói B thì mỗi tháng phải dùng ít nhất bao nhiêu GB (số nguyên)?`,x,`Gọi x (GB) là số dung lượng dùng trong một tháng (x là số nguyên dương).
Chi phí hàng tháng khi dùng gói A là: ${A} + ${a}x (nghìn đồng).
Chi phí hàng tháng khi dùng gói B là: ${B} + ${b}x (nghìn đồng).
Để gói A rẻ hơn gói B, ta lập bất phương trình: ${A} + ${a}x < ${B} + ${b}x.
Giải bất phương trình: ${b}x - ${a}x > ${A} - ${B} ⇔ ${b-a}x > ${A-B} ⇔ x > ${f2((A-B)/(b-a))}.
Vì x là số nguyên (số GB ít nhất), nên x nhận giá trị nhỏ nhất thỏa mãn là x = ${x}.`)},
()=>{const s=R(8,20),a=R(1,4),b=R(1,4);let ok=[],no=[];for(let x=0;x<=s;x++)for(let y=0;y<=s;y++)(x+y<=s&&x>=a&&y>=b?ok:no).push([x,y]);const o=P(ok),w=sh(no.filter(([x,y])=>x<=s+3&&y<=s+3)).slice(0,3);return Z(`Một người mua x bút bi và y quyển vở thoả mãn: tổng số đồ không quá ${s}, mua ít nhất ${a} bút và ít nhất ${b} quyển vở. Cặp (x; y) nào sau đây thoả mãn điều kiện đó?`,pt(...o),w.map(v=>pt(...v)),`Từ các giả thiết của bài toán, ta lập được hệ bất phương trình ràng buộc x và y:
- "Tổng số đồ không quá ${s}" nghĩa là: x + y ≤ ${s}.
- "Mua ít nhất ${a} bút" nghĩa là: x ≥ ${a}.
- "Mua ít nhất ${b} quyển vở" nghĩa là: y ≥ ${b}.
Thay lần lượt các đáp án vào hệ bất phương trình này. Chỉ có cặp ${pt(...o)} thỏa mãn đồng thời cả 3 điều kiện trên.`)},
()=>{const a=R(2,9),b=R(2,9),c=R(2,9),d=R(2,9),x=R(1,9),y=R(1,9);return N(`Một xưởng làm x chiếc bàn và y chiếc ghế. Mỗi bàn lãi ${a} trăm nghìn đồng, mỗi ghế lãi ${b} trăm nghìn đồng. Nếu xưởng làm ${x} bàn và ${y} ghế thì tổng lãi (trăm nghìn đồng) là`,a*x+b*y,`Gọi F là tổng tiền lãi xưởng thu được.
Tiền lãi thu được từ x chiếc bàn là: ${a} × x (trăm nghìn đồng).
Tiền lãi thu được từ y chiếc ghế là: ${b} × y (trăm nghìn đồng).
Vậy hàm tính tổng lãi là F(x, y) = ${a}x + ${b}y. 
Với x = ${x} và y = ${y}, thay số vào ta có F = ${a}·${x} + ${b}·${y} = ${a*x+b*y} (trăm nghìn đồng).`)}
);
addH('t10bpt',
()=>{const o=lp();return I(`Một xưởng sản xuất hai loại sản phẩm A và B (số lượng x, y là các số tự nhiên). Mỗi sản phẩm A cần ${o.a1} giờ máy cắt và ${o.a2} giờ máy sơn; mỗi sản phẩm B cần ${o.b1} giờ máy cắt và ${o.b2} giờ máy sơn. Mỗi ngày máy cắt làm tối đa ${o.c1} giờ, máy sơn làm tối đa ${o.c2} giờ. Lãi mỗi sản phẩm A là ${o.p} trăm nghìn đồng, mỗi sản phẩm B là ${o.q} trăm nghìn đồng. Lãi lớn nhất mỗi ngày là (trăm nghìn đồng)`,o.best,`Gọi x, y lần lượt là số lượng sản phẩm A và B cần sản xuất (x, y ≥ 0, nguyên).
Ta có hệ bất phương trình ràng buộc về thời gian sử dụng máy:
- Số giờ máy cắt: ${o.a1}x + ${o.b1}y ≤ ${o.c1}.
- Số giờ máy sơn: ${o.a2}x + ${o.b2}y ≤ ${o.c2}.
Hàm mục tiêu tính tổng lợi nhuận là: F(x, y) = ${o.p}x + ${o.q}y.
Để tối ưu hóa hàm F, ta vẽ miền nghiệm của hệ bất phương trình trên mặt phẳng tọa độ (đây là một đa giác). Hàm bậc nhất hai ẩn sẽ đạt giá trị lớn nhất tại một trong các đỉnh của đa giác miền nghiệm (hoặc các điểm nguyên lân cận nếu tọa độ đỉnh không nguyên). Thử các đỉnh, ta tìm được giá trị lớn nhất là ${o.best} trăm nghìn đồng.`)},
()=>{const S=R(30,80)*100,cap=R(20,S/100-8)*100,mn=R(5,12)*100,r1=R(12,20),r2=R(5,r1-2),B=Math.max(mn,S-cap),A=S-B,v=(r1*A+r2*B)/100;if(A>cap||A<0||B>S)return;return I(`Một nhà đầu tư có ${S} triệu đồng để chia vào hai quỹ: quỹ cổ phiếu A (lãi ${r1}%/năm) và quỹ trái phiếu B (lãi ${r2}%/năm). Tổng số tiền đầu tư không vượt quá ${S} triệu đồng, đầu tư vào quỹ A không quá ${cap} triệu đồng và vào quỹ B ít nhất ${mn} triệu đồng. Tổng lợi nhuận một năm lớn nhất là (triệu đồng, nhập số)`,dn(v),`Gọi x, y (triệu đồng) là số tiền đầu tư vào quỹ A và quỹ B. Điều kiện: x + y ≤ ${S}; 0 ≤ x ≤ ${cap}; y ≥ ${mn}.
Hàm lợi nhuận là F(x, y) = ${r1}%·x + ${r2}%·y.
Vì tiền đầu tư không quá ${S} triệu và quỹ A mang lại tỷ suất lợi nhuận cao hơn quỹ B (${r1}% > ${r2}%), nhà đầu tư nên phân bổ tối đa có thể vào quỹ A. Tuy nhiên quỹ A bị giới hạn không quá ${cap} triệu và quỹ B bắt buộc phải có ít nhất ${mn} triệu.
Vậy phương án tối ưu là ưu tiên dùng toàn bộ vốn (x + y = ${S}) và lấy quỹ A tối đa: Chọn x = ${A} triệu (để lại đúng ${B} triệu cho quỹ B, thỏa mãn y ≥ ${mn} và x ≤ ${cap}).
Lợi nhuận lớn nhất thu được: ${r1}%·${A} + ${r2}%·${B} = ${f2(v)} triệu đồng.`)},
()=>{let a1,b1,c1,a2,b2,c2,p,q,best=1e9;a1=R(1,5);b1=R(1,5);c1=R(8,20);a2=R(1,5);b2=R(1,5);c2=R(8,20);p=R(2,6);q=R(2,6);for(let x=0;x<=30;x++)for(let y=0;y<=30;y++)if(a1*x+b1*y>=c1&&a2*x+b2*y>=c2)best=Math.min(best,p*x+q*y);return I(`Mỗi ngày một người cần ít nhất ${c1} đơn vị protein và ${c2} đơn vị vitamin. Mỗi gói thực phẩm X chứa ${a1} đơn vị protein và ${a2} đơn vị vitamin, giá ${p} nghìn đồng; mỗi gói thực phẩm Y chứa ${b1} đơn vị protein và ${b2} đơn vị vitamin, giá ${q} nghìn đồng. Số gói mua là số tự nhiên. Chi phí nhỏ nhất mỗi ngày là (nghìn đồng)`,best,`Gọi x, y là số gói thực phẩm X và Y cần mua (x, y là số tự nhiên).
Hệ điều kiện dinh dưỡng:
- Lượng protein: ${a1}x + ${b1}y ≥ ${c1}.
- Lượng vitamin: ${a2}x + ${b2}y ≥ ${c2}.
Hàm mục tiêu chi phí cần cực tiểu: F(x, y) = ${p}x + ${q}y (nghìn đồng).
Biểu diễn miền nghiệm của hệ bất phương trình trên đồ thị, nó là một miền không bị chặn. Hàm F(x,y) sẽ đạt giá trị nhỏ nhất tại một trong các điểm nguyên là đỉnh (hoặc gần đỉnh) của đa giác giới hạn miền nghiệm. Kiểm tra các điểm góc, ta thu được chi phí nhỏ nhất là ${best} nghìn đồng.`)},
()=>{const s=R(10,30),p=R(2,8),q=R(2,8),a=R(1,Math.floor(s/3));let best=0;for(let x=a;x<=s;x++)for(let y=0;x+y<=s;y++)best=Math.max(best,p*x+q*y);return I(`Một cửa hàng bán hai loại áo: loại I lãi ${p} nghìn đồng/chiếc, loại II lãi ${q} nghìn đồng/chiếc. Cửa hàng nhập tối đa ${s} chiếc (cả hai loại), trong đó phải có ít nhất ${a} chiếc loại I. Lãi lớn nhất có thể đạt được là (nghìn đồng)`,best,`Gọi x, y (chiếc) lần lượt là số áo loại I và loại II cửa hàng nhập bán.
Các điều kiện của bài toán: 
- Tổng số áo tối đa ${s} chiếc: x + y ≤ ${s}.
- Ít nhất ${a} chiếc loại I: x ≥ ${a}.
- Số áo không âm: y ≥ 0.
Hàm tính tổng lợi nhuận là: F(x, y) = ${p}x + ${q}y.
Vẽ miền nghiệm (là một tam giác có các đỉnh giới hạn bởi các đường x + y = ${s}, x = ${a}, y = 0). Lãi F lớn nhất sẽ đạt được tại một trong các đỉnh nguyên của tam giác miền nghiệm này. Tính toán tại các đỉnh đó, ta được lãi lớn nhất là ${best} nghìn đồng.`)}
);

/* ===== Tam thức bậc hai & phương trình quy về bậc hai ===== */
add('t10tam',
()=>{let p,q;do{p=R(-5,5);q=R(-5,5)}while(p>=q);const a=nzr(-3,3),pos=P([0,1]),f=ps([a*p*q,-a*(p+q),a]),inside=(a>0)!=!!pos?false:true;const out=`(−∞; ${iz(p)}) ∪ (${iz(q)}; +∞)`,mid=`(${iz(p)}; ${iz(q)})`,isPos=a>0?out:mid,isNeg=a>0?mid:out,ans=pos?isPos:isNeg;return Z(`Tam thức f(x) = ${f} nhận giá trị ${pos?'dương':'âm'} khi và chỉ khi x thuộc tập hợp nào?`,ans,[pos?isNeg:isPos,`[${iz(p)}; ${iz(q)}]`,`(−∞; ${iz(p)}] ∪ [${iz(q)}; +∞)`,'ℝ'],`Để xét dấu tam thức f(x), ta tìm nghiệm của f(x) = 0. Phương trình có hai nghiệm phân biệt là x = ${iz(p)} và x = ${iz(q)}.
Hệ số bậc cao nhất là a = ${a} ${a>0?'&gt;':'&lt;'} 0. 
Áp dụng quy tắc "Trong trái, ngoài cùng" (trong khoảng 2 nghiệm thì trái dấu a, ngoài khoảng 2 nghiệm thì cùng dấu a):
- f(x) mang dấu cùng với a (${a>0?'+':'-'}) khi x thuộc ${out}.
- f(x) mang dấu trái với a (${a>0?'-':'+'}) khi x thuộc ${mid}.
Yêu cầu bài toán là f(x) ${pos?'dương (&gt; 0)':'âm (&lt; 0)'}, đối chiếu quy tắc trên, ta thấy f(x) thỏa mãn khi x thuộc ${ans}.`)},
()=>{const a=nzr(-3,3),b=R(-6,6),c=nzr(-5,5),d=b*b-4*a*c,ans=d>0?'2':d==0?'1':'0';if(d==0){}return Z(`Số nghiệm thực của phương trình ${fx(a,b,c)} = 0 là`,ans,['0','1','2','3'].filter(x=>x!=ans),`Đây là phương trình bậc hai dạng ax² + bx + c = 0. Ta đi tính biệt thức Delta: 
Δ = b² − 4ac = (${iz(b)})² − 4·(${iz(a)})·(${iz(c)}) = ${iz(b*b)} − ${iz(4*a*c)} = ${iz(d)}.
Vì Δ ${d>0?'&gt; 0, nên phương trình có đúng 2 nghiệm thực phân biệt.':d==0?'= 0, nên phương trình có đúng 1 nghiệm (nghiệm kép).':'&lt; 0, nên phương trình vô nghiệm (0 nghiệm) trên tập số thực.'}`)},
()=>{let a,c,x0,b,d,v;do{a=R(1,4);c=R(1,4);if(a==c)continue;x0=R(-4,6);b=R(-5,5);d=a*x0+b-c*x0;v=a*x0+b}while(a==c||v<0);return N(`Nghiệm của phương trình √(${ps([b,a])}) = √(${ps([d,c])}) là x bằng`,x0,`Phương trình có dạng √A = √B.
Bước 1: Bình phương hai vế để làm mất căn, ta được phương trình hệ quả: ${ps([b,a])} = ${ps([d,c])}.
Bước 2: Giải phương trình này: (${a} - ${c})x = ${d} - (${b}) ⇔ ${a-c}x = ${d-b} ⇔ x = ${iz(x0)}.
Bước 3: Thử lại nghiệm (Bắt buộc). Thay x = ${iz(x0)} vào một trong hai biểu thức dưới căn (ví dụ vế trái): ${a}·(${iz(x0)}) + ${b} = ${iz(v)}. Vì ${iz(v)} ≥ 0 nên biểu thức căn có nghĩa. Vậy x = ${iz(x0)} là nghiệm hợp lệ.`,iz,1)},
()=>{const t=P([0,1,2]),p=R(1,4),q=R(p+1,6),a=R(1,9),b=R(1,9);const L=[[`x^4 + ${a}x^2 + ${b} = 0`,0,'Phương trình trùng phương. Đặt ẩn phụ t = x² (điều kiện t ≥ 0), ta đưa về pt bậc hai: t² + at + b = 0. Vì các hệ số a, b đều > 0 nên vế trái luôn > 0 với t ≥ 0. Phương trình không có nghiệm t nào ≥ 0 thỏa mãn. Suy ra phương trình ban đầu vô nghiệm (0 nghiệm).'],[`x^4 − ${a}x^2 − ${b} = 0`,2,`Phương trình trùng phương. Đặt ẩn phụ t = x² (điều kiện t ≥ 0). Phương trình trở thành t² − ${a}t − ${b} = 0. Nhận xét hệ số: a' = 1 và c' = -${b}, tức là a'·c' < 0. Do đó phương trình bậc hai theo t này có hai nghiệm trái dấu (chắc chắn có một nghiệm âm bị loại và một nghiệm t dương được nhận). Với 1 nghiệm t > 0, thay ngược lại x² = t ta được 2 nghiệm phân biệt x.`],[`x^4 − ${p*p+q*q}x^2 + ${p*p*q*q} = 0`,4,`Đây là phương trình trùng phương. Đặt t = x² (điều kiện t ≥ 0). Phương trình trở thành phương trình bậc hai: t² − ${p*p+q*q}t + ${p*p*q*q} = 0. Bằng cách tính Δ hoặc dùng Vi-et, ta dễ dàng giải ra 2 nghiệm là t = ${p*p} và t = ${q*q}. Cả hai nghiệm t này đều dương, mỗi giá trị t sinh ra 2 nghiệm x (ví dụ x² = ${p*p} ⇔ x = ±${p}). Vậy tổng cộng có 4 nghiệm thực phân biệt.`]][t];return N(`Số nghiệm thực của phương trình ${L[0]} là`,L[1],L[2])}
);
addH('t10tam',
()=>{const p=R(1,3),q=R(p+2,p+5),H=5*p*q;return I(`Một vật được ném lên từ mặt đất, độ cao (mét) sau t giây là h(t) = −5t² + ${5*(p+q)}t. Vật ở độ cao không thấp hơn ${H} m trong khoảng thời gian bao nhiêu giây?`,q-p,`Vật ở độ cao không thấp hơn (tức là cao hơn hoặc bằng) ${H} m, ta thiết lập bất phương trình:
h(t) ≥ ${H} ⇔ −5t² + ${5*(p+q)}t ≥ ${H} ⇔ −5t² + ${5*(p+q)}t − ${H} ≥ 0.
Chia hai vế cho -5 (nhớ đổi chiều bất đẳng thức): t² − ${p+q}t + ${p*q} ≤ 0.
Vế trái là tam thức bậc hai có hai nghiệm là t = ${p} và t = ${q}. Áp dụng quy tắc "Trong trái, ngoài cùng", bất phương trình ≤ 0 được thỏa mãn trong đoạn 2 nghiệm: ${p} ≤ t ≤ ${q}.
Khoảng thời gian duy trì được độ cao này là lấy thời điểm kết thúc trừ thời điểm bắt đầu: ${q} − ${p} = ${q-p} (giây).`)},
()=>{const p=R(-6,2),q=p+R(3,9),lo=Math.max(p+1,1),c=Math.max(0,q-1-lo+1);return I(`Lợi nhuận (triệu đồng) khi sản xuất x sản phẩm là P(x) = −x² ${sg(p+q)}x ${sg(-p*q)} (x nguyên dương). Có bao nhiêu giá trị nguyên dương của x để doanh nghiệp có lãi (P(x) &gt; 0)?`,c,`Doanh nghiệp có lãi khi lợi nhuận lớn hơn 0, tức là P(x) > 0.
Ta có bất phương trình: −x² ${sg(p+q)}x ${sg(-p*q)} > 0.
Tam thức bậc hai này có a = -1 < 0 và có hai nghiệm là x = ${iz(p)} và x = ${iz(q)}. 
Theo định lý về dấu tam thức bậc hai (trong trái dấu a), nó dương trong khoảng hai nghiệm. Vậy: ${iz(p)} < x < ${iz(q)}.
Vì x là số sản phẩm nên x phải là SỐ NGUYÊN DƯƠNG (x ≥ 1). Tập hợp các số nguyên x thỏa mãn nằm trong khoảng từ $\\max(${iz(p)}, 0)$ đến ${iz(q)}$, tức là các số nguyên từ ${lo} đến ${q-1}. 
Số lượng giá trị x là: (${q-1}) - (${lo}) + 1 = ${c} giá trị.`)},
()=>{const k=R(1,8);let c=0;for(let m=-10;m<=10;m++)if(m*m-m-k>0)c++;return I(`Có bao nhiêu giá trị nguyên của m thuộc đoạn [−10; 10] để phương trình x² − 2mx + m + ${k} = 0 có hai nghiệm phân biệt?`,c,`Phương trình bậc hai có 2 nghiệm phân biệt khi và chỉ khi biệt thức thu gọn Δ′ > 0.
Ta có: Δ′ = m² − 1·(m + ${k}) = m² − m − ${k}.
Điều kiện: m² − m − ${k} > 0. 
Vì m thuộc đoạn [−10; 10] và m nguyên, ta có thể thử trực tiếp các giá trị của m từ -10 đến 10 vào tam thức, hoặc giải bất phương trình m² - m - ${k} > 0 để lấy các khoảng nghiệm rồi đếm số lượng m. Kết quả đếm được có đúng ${c} giá trị nguyên của m thỏa mãn.`)},
()=>{let p,q;do{p=R(-5,6);q=R(-5,6)}while(p==q);return I(`Gọi x<sub>1</sub>, x<sub>2</sub> là hai nghiệm của phương trình ${ps([p*q,-(p+q),1])} = 0. Giá trị của (x<sub>1</sub> − x<sub>2</sub>)² bằng`,(p-q)**2,`Theo định lý Viète cho phương trình ax² + bx + c = 0, ta có:
Tổng hai nghiệm S = x<sub>1</sub> + x<sub>2</sub> = −b/a = ${iz(p+q)}.
Tích hai nghiệm P = x<sub>1</sub>x<sub>2</sub> = c/a = ${iz(p*q)}.
Ta cần tính biểu thức A = (x<sub>1</sub> − x<sub>2</sub>)². 
Khai triển hằng đẳng thức: A = x<sub>1</sub>² − 2x<sub>1</sub>x<sub>2</sub> + x<sub>2</sub>² = (x<sub>1</sub>² + 2x<sub>1</sub>x<sub>2</sub> + x<sub>2</sub>²) − 4x<sub>1</sub>x<sub>2</sub> = (x<sub>1</sub> + x<sub>2</sub>)² − 4x<sub>1</sub>x<sub>2</sub>.
Thay S và P vào: A = S² − 4P = (${iz(p+q)})² − 4·(${iz(p*q)}) = ${(p+q)**2} − ${pa(4*p*q)} = ${(p-q)**2}.`)},
()=>{let p,q;do{p=nzr(-5,6);q=nzr(-5,6)}while(p==q);return I(`Gọi x<sub>1</sub>, x<sub>2</sub> là hai nghiệm của phương trình ${ps([p*q,-(p+q),1])} = 0. Giá trị của 1/x<sub>1</sub> + 1/x<sub>2</sub> bằng (nhập phân số tối giản hoặc số nguyên)`,fr(p+q,p*q),`Áp dụng định lý Viète, ta có:
S = x<sub>1</sub> + x<sub>2</sub> = −b/a = ${iz(p+q)}.
P = x<sub>1</sub>x<sub>2</sub> = c/a = ${iz(p*q)}.
Biểu thức cần tính là: 1/x<sub>1</sub> + 1/x<sub>2</sub>.
Tiến hành quy đồng mẫu số chung là x<sub>1</sub>x<sub>2</sub>: 
1/x<sub>1</sub> + 1/x<sub>2</sub> = (x<sub>2</sub> + x<sub>1</sub>) / (x<sub>1</sub>x<sub>2</sub>) = S / P.
Thay số liệu vào, ta được kết quả: ${iz(p+q)} / ${pa(p*q)} = ${fq(p+q,p*q)}.`)}
);

/* ===== Đại số tổ hợp (+ bài toán đếm thực tế) ===== */
add('t10th',
()=>{const n=R(3,6);return N(`Từ các chữ số 0, 1, 2, …, ${n} lập được bao nhiêu số tự nhiên có 3 chữ số đôi một khác nhau?`,n*n*(n-1),`Gọi số cần tìm có dạng abc (với a ≠ 0 và a,b,c phân biệt). Tập hợp các chữ số cho trước có ${n+1} chữ số.
- Chọn chữ số hàng trăm a: vì a ≠ 0 nên a có ${n} cách chọn (loại số 0).
- Chọn chữ số hàng chục b: b phải khác a nên b có (${n+1} - 1) = ${n} cách chọn (bây giờ có thể chọn số 0).
- Chọn chữ số hàng đơn vị c: c phải khác cả a và b nên c có (${n+1} - 2) = ${n-1} cách chọn.
Theo quy tắc nhân, tổng số cách lập được số là: ${n} × ${n} × ${n-1} = ${n*n*(n-1)} số.`)},
()=>{const a=R(4,8),b=R(3,7);return N(`Một nhóm có ${a} học sinh nam và ${b} học sinh nữ. Có bao nhiêu cách chọn một tổ gồm 2 nam và 1 nữ?`,cb(a,2)*b,`Công việc chọn tổ được chia thành 2 công đoạn:
- Công đoạn 1: Chọn 2 bạn nam từ ${a} bạn nam. Vì vai trò của 2 bạn này bình đẳng (không phân công chức vụ) nên đây là một tổ hợp chập 2 của ${a}. Số cách chọn là C(${a}, 2) = ${cb(a,2)}.
- Công đoạn 2: Chọn 1 bạn nữ từ ${b} bạn nữ. Có tổ hợp chập 1 của ${b}, tức là có C(${b}, 1) = ${b} cách.
Áp dụng quy tắc nhân, số cách chọn đội như mong muốn là: ${cb(a,2)} × ${b} = ${cb(a,2)*b} cách.`)},
()=>{const k=R(2,3);return N(`Một mật khẩu gồm 1 chữ cái in hoa (trong 26 chữ cái) rồi đến ${k} chữ số (mỗi chữ số từ 0 đến 9, được lặp lại). Số mật khẩu có thể tạo ra là`,26*10**k,`Để tạo mật khẩu, ta thực hiện các bước chọn liên tiếp:
- Chọn 1 chữ cái in hoa đứng đầu: có 26 cách (vì có 26 chữ cái).
- Chọn lần lượt ${k} chữ số đứng sau: Mỗi vị trí chữ số có 10 lựa chọn (từ 0 đến 9). Vì các chữ số được phép lặp lại nên ${k} vị trí này tạo ra 10 × 10 × ... × 10 = 10<sup>${k}</sup> cách chọn.
Áp dụng quy tắc nhân cho toàn bộ quá trình: 26 × 10<sup>${k}</sup> = ${26*10**k} mật khẩu.`)},
()=>{const n=R(5,12),t=P([0,1]);return N(t?`Đa giác lồi có ${n} cạnh có bao nhiêu đường chéo?`:`Cho ${n} điểm phân biệt trên một đường tròn. Có bao nhiêu tam giác có ba đỉnh thuộc các điểm đó?`,t?cb(n,2)-n:cb(n,3),t?`Cứ 2 đỉnh bất kỳ nối với nhau sẽ tạo thành 1 đoạn thẳng (có thể là cạnh hoặc đường chéo). Số đoạn thẳng nối 2 đỉnh là tổ hợp chập 2 của ${n}, bằng C(${n}, 2) = ${cb(n,2)}. Tuy nhiên, trong số ${cb(n,2)} đoạn thẳng này đã bao gồm cả ${n} cạnh của đa giác. Vậy số đường chéo (chỉ nối các đỉnh không kề nhau) là: ${cb(n,2)} - ${n} = ${cb(n,2)-n} đường chéo.`:`Để tạo thành một tam giác, ta cần chọn ra 3 điểm không thẳng hàng. Vì các điểm cùng nằm trên một đường tròn nên không có bất kỳ 3 điểm nào thẳng hàng. Số cách chọn ra 3 điểm bất kỳ từ ${n} điểm (không quan tâm thứ tự) chính là tổ hợp chập 3 của ${n}: C(${n}, 3) = ${cb(n,3)} tam giác.`)},
()=>{const n=R(6,14);return N(`Một lớp có ${n} học sinh. Có bao nhiêu cách chọn một lớp trưởng và một lớp phó (hai người khác nhau)?`,n*(n-1),`Việc chọn 2 bạn học sinh vào 2 chức vụ (Lớp trưởng và Lớp phó) là một công việc CÓ QUAN TÂM ĐẾN THỨ TỰ (chức vụ khác nhau là các phân công khác nhau).
Do đó, đây là bài toán tính chỉnh hợp chập 2 của ${n} phần tử. 
Số cách chọn là: A(${n}, 2) = ${n}! / (${n}-2)! = ${n} × ${n-1} = ${n*(n-1)} cách. 
(Hoặc dùng quy tắc nhân: Có ${n} cách chọn Lớp trưởng, sau đó có ${n-1} cách chọn Lớp phó -> ${n}×${n-1} = ${n*(n-1)}).`)},
()=>{const n=R(5,12),k=R(2,n-2);return N(`Trong khai triển (a + b)<sup>${n}</sup>, hệ số của số hạng thứ ${k+1} (theo luỹ thừa giảm dần của a) là`,cb(n,k),`Theo công thức khai triển Nhị thức Newton: (a + b)<sup>${n}</sup> = C(${n}, 0)a<sup>${n}</sup> + C(${n}, 1)a<sup>${n-1}</sup>b + ... + C(${n}, k)a<sup>${n-k}</sup>b<sup>k</sup> + ... + C(${n}, ${n})b<sup>${n}</sup>.
Khi sắp xếp các số hạng theo lũy thừa giảm dần của a, số hạng tổng quát thứ (k+1) là: T<sub>k+1</sub> = C(${n}, k)·a<sup>${n-k}</sup>·b<sup>k</sup>.
Áp dụng công thức trên với số hạng thứ ${k+1}, ta có k = ${k}. Hệ số của số hạng này chính là tổ hợp chập ${k} của ${n}: C(${n}, ${k}) = ${cb(n,k)}.`)
}
);
addH('t10th',
()=>{const n=R(5,7),L=P([3,4]),cond=P(['chẵn','lẻ','chia hết cho 5']),d=[...Array(n+1).keys()],c=perms(d,L).filter(a=>a[0]!=0&&(cond=='chẵn'?a[L-1]%2==0:cond=='lẻ'?a[L-1]%2==1:a[L-1]%5==0)).length;return I(`Từ các chữ số ${d.join(', ')} lập được bao nhiêu số tự nhiên ${cond} có ${L} chữ số đôi một khác nhau?`,c,`Gọi số cần tìm có dạng a<sub>1</sub>a<sub>2</sub>...a<sub>${L}</sub> (với a<sub>1</sub> ≠ 0). 
Đây là bài toán đếm có điều kiện chia hết, cần xử lý chữ số tận cùng trước:
1. Vì số là số ${cond} nên chữ số tận cùng a<sub>${L}</sub> phải thỏa mãn điều kiện đó (VD: số chẵn thì kết thúc bằng 0, 2, 4...).
2. Sau khi chọn xong chữ số tận cùng, ta chọn chữ số đầu tiên a<sub>1</sub>. Cần cẩn thận: a<sub>1</sub> phải khác 0 và khác a<sub>${L}</sub>. Nếu tập các số chọn a<sub>${L}</sub> có chứa số 0, ta nên chia trường hợp (TH1: a<sub>${L}</sub> = 0; TH2: a<sub>${L}</sub> ≠ 0) để đếm số cách chọn a<sub>1</sub> cho chuẩn xác.
3. Cuối cùng chọn các chữ số ở giữa bằng cách lấy chỉnh hợp của các chữ số còn lại. Áp dụng quy tắc cộng và quy tắc nhân cho từng trường hợp, ta tính được tổng số cách thỏa mãn là ${c} cách.`)},
()=>{const a=R(3,6),b=R(2,4);return I(`Xếp ${a} bạn nam và ${b} bạn nữ thành một hàng ngang sao cho các bạn nữ đứng cạnh nhau. Số cách xếp là`,fct(b)*fct(a+1),`Bài toán yêu cầu "đứng cạnh nhau", ta dùng kỹ thuật "buộc".
Bước 1: Buộc ${b} bạn nữ lại thành 1 "khối". Số cách hoán vị chỗ đứng của các bạn nữ ở bên trong khối này là: ${b}! = ${fct(b)} cách.
Bước 2: Xem "khối" nữ này như 1 bạn học sinh đặc biệt. Lúc này ta có bài toán: Xếp hàng cho ${a} bạn nam và 1 bạn "khối" nữ. Tổng cộng là ${a+1} người.
Số cách hoán vị ${a+1} người này xếp thành 1 hàng là: (${a+1})! = ${fct(a+1)} cách.
Áp dụng quy tắc nhân, tổng số cách xếp hàng thỏa mãn yêu cầu bài toán là: ${fct(b)} × ${fct(a+1)} = ${fct(b)*fct(a+1)} cách.`)},
()=>{const a=R(4,7),b=R(4,7),k=R(3,5);let c=0;for(let j=2;j<=k;j++)c+=cb(b,j)*cb(a,k-j);return I(`Từ ${a} bạn nam và ${b} bạn nữ chọn ra ${k} bạn lập một đội sao cho có ít nhất 2 bạn nữ. Số cách chọn là`,c,`Để có "ít nhất 2 bạn nữ" trong đội gồm ${k} người, ta chia các trường hợp có thể xảy ra:
- Trường hợp 1: Có đúng 2 bạn nữ, phần còn lại là (${k} - 2) bạn nam. Số cách = C(${b}, 2) × C(${a}, ${k}-2).
- Trường hợp 2: Có đúng 3 bạn nữ, phần còn lại là (${k} - 3) bạn nam. Số cách = C(${b}, 3) × C(${a}, ${k}-3).
- ... Tiếp tục tăng số lượng nữ lên cho đến khi đạt đủ ${k} bạn hoặc hết bạn nữ.
Tổng hợp (cộng) số cách của tất cả các trường hợp rời rạc đó lại, ta được kết quả cuối cùng là ${c} cách.`)},
()=>{const n=R(8,14),m=R(3,5);return I(`Cho ${n} điểm phân biệt trong mặt phẳng, trong đó có đúng ${m} điểm thẳng hàng, ngoài ra không có ba điểm nào thẳng hàng. Số tam giác có đỉnh là các điểm đã cho là`,cb(n,3)-cb(m,3),`Sử dụng phương pháp phần bù:
Bước 1: Giả sử không có 3 điểm nào thẳng hàng, cứ lấy bừa 3 điểm từ ${n} điểm sẽ tạo thành 1 tam giác. Tổng số cách lấy bừa là tổ hợp chập 3 của ${n}: C(${n}, 3) = ${cb(n,3)}.
Bước 2: Tuy nhiên, do có ${m} điểm thẳng hàng nằm trên một đường thẳng d, nên nếu ta vô tình chọn 3 điểm bất kỳ trong số ${m} điểm này thì sẽ KHÔNG tạo thành tam giác. Số bộ 3 điểm lỗi (không tạo được tam giác) là: C(${m}, 3) = ${cb(m,3)}.
Bước 3: Trừ đi các trường hợp lỗi, số tam giác thực sự tạo thành là: ${cb(n,3)} - ${cb(m,3)} = ${cb(n,3)-cb(m,3)} tam giác.`)},
()=>{const n=R(5,12);return I(`Biết A<sub>n</sub><sup>2</sup> = ${n*(n-1)}. Giá trị của n là`,n,`Ký hiệu A<sub>n</sub><sup>2</sup> (hoặc A(n, 2)) là chỉnh hợp chập 2 của n phần tử.
Theo định nghĩa công thức chỉnh hợp: A<sub>n</sub><sup>2</sup> = n! / (n - 2)! = n × (n − 1).
Đề bài cho biết A<sub>n</sub><sup>2</sup> = ${n*(n-1)}.
Ta có phương trình: n(n - 1) = ${n*(n-1)} ⇔ n² - n - ${n*(n-1)} = 0. Giải phương trình bậc 2 này (với n là số tự nhiên, n ≥ 2), ta tìm được nghiệm hợp lý là n = ${n}.`)
}
);
})();