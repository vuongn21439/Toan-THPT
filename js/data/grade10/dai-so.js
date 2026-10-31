/* LỚP 10 · ĐẠI SỐ: Mệnh đề & Tập hợp, Hàm số bậc hai, Bất phương trình bậc nhất hai ẩn, Tam thức bậc hai, Đại số tổ hợp */
(()=>{const {fr,fq,fh,add,addH,sg,pt,ps,lh,uniq,nzr}=GH,
 fct=n=>n<2?1:n*fct(n-1),Cc=(n,k)=>k<0||k>n?0:fct(n)/(fct(k)*fct(n-k)),Aa=(n,k)=>k>n?0:fct(n)/fct(n-k),
 Cn=(n,k)=>`C<sub>${n}</sub><sup>${k}</sup>`,An=(n,k)=>`A<sub>${n}</sub><sup>${k}</sup>`,
 fac=p=>p?`(x ${sg(-p)})`:'x',
 iv=(l,a,b,r)=>`${l?'[':'('}${a}; ${b}${r?']':')'}`;

/* ===== Mệnh đề & Tập hợp ===== */
const sub=(u,k)=>sh([...Array(u)].map((_,i)=>i+1)).slice(0,k).sort((a,b)=>a-b),
 setS=a=>a.length?'{'+a.join('; ')+'}':'∅',
 QT=[['x ∈ ℝ','x² ≥ 0','x² &lt; 0'],['n ∈ ℕ','n chia hết cho 2','n không chia hết cho 2'],['x ∈ ℝ','x + 1 &gt; x','x + 1 ≤ x'],['n ∈ ℕ','n² &gt; n','n² ≤ n'],['x ∈ ℝ','x² − 2x + 1 &gt; 0','x² − 2x + 1 ≤ 0']];
add('t10mt',
()=>{const a=sub(12,R(5,8)),b=sub(12,R(5,8)),both=a.filter(x=>b.includes(x)),un=[...new Set([...a,...b])].sort((x,y)=>x-y),t=R(0,1),r=t?un:both;return N(`Cho A = ${setS(a)} và B = ${setS(b)}. Số phần tử của ${t?'A ∪ B':'A ∩ B'} là`,r.length,`${t?'A ∪ B':'A ∩ B'} = ${setS(r)}.\nTập này có ${r.length} phần tử.`)},
()=>{const c=R(2,8),a=c+R(2,10),b=c+R(2,10);return N(`Lớp có ${a} bạn giỏi Toán, ${b} bạn giỏi Văn, trong đó ${c} bạn giỏi cả hai môn. Số bạn giỏi ít nhất một trong hai môn là`,a+b-c,`|A ∪ B| = |A| + |B| − |A ∩ B| = ${a} + ${b} − ${c} = ${a+b-c}.`)},
()=>{const n=R(3,6);return Z(`Tập hợp A có ${n} phần tử. Số tập con của A là`,''+2**n,[n*n,2*n,2**n-1,2**(n+1),n*(n-1)].map(String),`Tập có n phần tử có 2<sup>n</sup> tập con: 2<sup>${n}</sup> = ${2**n}.`)},
()=>{const[v,p,np]=P(QT),all=P([0,1]),S=all?`Mọi ${v} đều có ${p}`:`Tồn tại ${v} để ${p}`,ans=all?`Tồn tại ${v} để ${np}`:`Mọi ${v} đều có ${np}`,w=all?[`Mọi ${v} đều có ${np}`,`Tồn tại ${v} để ${p}`,`Không có ${v} nào để ${np}`]:[`Tồn tại ${v} để ${np}`,`Mọi ${v} đều có ${p}`,`Không có ${v} nào để ${np}`];return Z(`Phủ định của mệnh đề "${S}" là`,ans,w,`Phủ định đổi "mọi" thành "tồn tại" (và ngược lại), đồng thời phủ định tính chất: ${ans}.`)},
()=>{const n=R(2,12),m=R(2,9),tr=sh([`${n*n} là số chính phương`,`${2*n} chia hết cho 2`,`${n*m} là bội của ${n}`,`${n*n+n} là số chẵn`]),fl=sh([`${n*n+1} là số chính phương`,`${2*n+1} chia hết cho 2`,`${n*m+1} là bội của ${n}`,`${n*n+n+1} là số chẵn`,`${n*m} là ước của ${n}`]);return Z('Mệnh đề nào sau đây đúng?',tr[0],fl.slice(0,3),`Kiểm tra từng mệnh đề: "${tr[0]}" là mệnh đề đúng, các mệnh đề còn lại đều sai.`)},
()=>{const[a,c,b,d]=sh([-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7]).slice(0,4).sort((x,y)=>x-y),u=P([0,1]),ans=u?iv(1,iz(a),iz(d),0):iv(0,iz(c),iz(b),1),w=u?[iv(0,iz(a),iz(d),0),iv(1,iz(a),iz(d),1),iv(1,iz(a),iz(b),1),iv(0,iz(c),iz(b),1)]:[iv(1,iz(c),iz(b),1),iv(0,iz(c),iz(b),0),iv(0,iz(c),iz(d),0),iv(1,iz(a),iz(b),1)];return Z(`Cho A = [${iz(a)}; ${iz(b)}] và B = (${iz(c)}; ${iz(d)}). Tập ${u?'A ∪ B':'A ∩ B'} là`,ans,w,`Vẽ hai khoảng lên trục số. ${u?'Hợp':'Giao'}: ${ans}. Chú ý đầu mút nào lấy (ngoặc vuông), đầu mút nào bỏ (ngoặc tròn).`)},
()=>{let p,q;do{p=R(-6,6);q=R(-6,6)}while(p>=q);const S=p+q,ans=`{${iz(p)}; ${iz(q)}}`;return Z(`Liệt kê các phần tử của A = {x ∈ ℝ | ${ps([p*q,-S,1])} = 0}`,ans,[`{${iz(-q)}; ${iz(-p)}}`,`{${iz(p+1)}; ${iz(q)}}`,`{${iz(p)}; ${iz(q+1)}}`,`{${iz(S)}}`,`{${iz(p*q)}}`],`Phân tích: ${ps([p*q,-S,1])} = ${fac(p)}${fac(q)} = 0, nên x = ${iz(p)} hoặc x = ${iz(q)}.`)}
);
addH('t10mt',
()=>{const a=R(10,20),b=R(10,20),c=R(3,8),r=R(3,10),n=a+b-c+r;return I(`Lớp 10A có ${n} học sinh, trong đó ${a} bạn giỏi Toán, ${b} bạn giỏi Lý, ${c} bạn giỏi cả hai môn. Số bạn không giỏi môn nào trong hai môn đó là`,r,`Số bạn giỏi ít nhất một môn: ${a} + ${b} − ${c} = ${a+b-c}.\nSố bạn không giỏi môn nào: ${n} − ${a+b-c} = ${r}.`)},
()=>{const n=R(4,8);return I(`Tập hợp A có ${n} phần tử. Số tập con khác rỗng của A là`,2**n-1,`Số tập con là 2<sup>${n}</sup> = ${2**n}; bỏ đi tập rỗng còn ${2**n-1}.`)},
()=>{const[a,c,b,d]=sh([-8,-6,-5,-3,-2,0,1,3,4,6,8,10,12]).slice(0,4).sort((x,y)=>x-y);return I(`Cho A = [${iz(a)}; ${iz(b)}] và B = (${iz(c)}; ${iz(d)}). Số số nguyên thuộc A ∩ B là`,b-c,`A ∩ B = (${iz(c)}; ${iz(b)}], gồm các số nguyên từ ${iz(c+1)} đến ${iz(b)}, tức là ${iz(b)} − ${pa(c)} = ${b-c} số.`)},
()=>{const n=R(4,8);return I(`Có bao nhiêu tập hợp X thoả mãn {1; 2} ⊂ X ⊂ {1; 2; 3; …; ${n}}?`,2**(n-2),`X luôn chứa 1 và 2; mỗi phần tử trong ${n-2} phần tử còn lại có thể có hoặc không: 2<sup>${n-2}</sup> = ${2**(n-2)} tập.`)}
);

/* ===== Hàm số bậc hai ===== */
const par=()=>{let a,h,k;do{a=nzr(-3,3);h=R(-4,4);k=R(-8,8)}while(!h);return{a,h,k,b:-2*a*h,c:a*h*h+k}},
 fx=(a,b,c)=>ps([c,b,a]);
add('t10bh',
()=>{const{a,h,k,b,c}=par();return Z(`Toạ độ đỉnh của parabol y = ${fx(a,b,c)} là`,pt(h,k),[pt(-h,k),pt(h,-k),pt(-h,-k),pt(k,h),pt(h+1,k)],`Hoành độ đỉnh x = −b/(2a) = ${iz(h)}.\nThay vào hàm số: y = ${iz(k)}. Đỉnh I${pt(h,k)}.`)},
()=>{const{a,h,b,c}=par();return Z(`Trục đối xứng của parabol y = ${fx(a,b,c)} là đường thẳng`,`x = ${iz(h)}`,[`x = ${iz(-h)}`,`x = ${iz(b)}`,`y = ${iz(h)}`,`x = ${iz(h+1)}`],`Trục đối xứng là x = −b/(2a) = ${iz(h)}.`)},
()=>{const{a,k,b,c}=par();return N(`Giá trị ${a>0?'nhỏ':'lớn'} nhất của hàm số y = ${fx(a,b,c)} là`,k,`a ${a>0?'&gt;':'&lt;'} 0 nên hàm số đạt giá trị ${a>0?'nhỏ':'lớn'} nhất tại đỉnh, bằng tung độ đỉnh: ${iz(k)}.`,iz,1)},
()=>{const a=nzr(-3,3),b=R(-5,5),c=R(-6,6),x=R(-3,3),v=a*x*x+b*x+c;return N(`Cho f(x) = ${fx(a,b,c)}. Giá trị f(${iz(x)}) bằng`,v,`f(${iz(x)}) = ${iz(a*x*x)} ${sg(b*x)} ${sg(c)} = ${iz(v)}.`,iz,1)},
()=>{const a=nzr(-3,3),b=R(-5,5),c=R(-6,6),x=R(-3,3),y=a*x*x+b*x+c;return Z(`Điểm nào sau đây thuộc parabol y = ${fx(a,b,c)}?`,pt(x,y),[pt(x,y+1),pt(x,y-2),pt(x+1,y),pt(x,-y+3)],`Thay x = ${iz(x)} vào hàm số được y = ${iz(y)}, nên điểm ${pt(x,y)} thuộc parabol.`)},
()=>{const{a,h,b,c}=par(),ask=P(['đồng biến','nghịch biến']),right=(a>0)==(ask=='đồng biến'),ans=right?`(${iz(h)}; +∞)`:`(−∞; ${iz(h)})`,w=right?[`(−∞; ${iz(h)})`,`(−∞; ${iz(h+1)})`,`(${iz(h-1)}; +∞)`,`(${iz(h-2)}; ${iz(h+2)})`]:[`(${iz(h)}; +∞)`,`(${iz(h-1)}; +∞)`,`(−∞; ${iz(h+1)})`,`(${iz(h-2)}; ${iz(h+2)})`];return Z(`Hàm số y = ${fx(a,b,c)} ${ask} trên khoảng nào sau đây?`,ans,w,`Hệ số a ${a>0?'&gt;':'&lt;'} 0, đỉnh có hoành độ ${iz(h)}. Hàm số ${a>0?'nghịch biến bên trái, đồng biến bên phải':'đồng biến bên trái, nghịch biến bên phải'} đỉnh. Vậy ${ask} trên ${ans}.`)}
);
addH('t10bh',
()=>{const h=R(-4,4),k=R(-6,6);return I(`Parabol y = x² + bx + c có đỉnh I${pt(h,k)}. Giá trị của b + c bằng`,-2*h+h*h+k,`Đỉnh có hoành độ −b/2 = ${iz(h)} nên b = ${iz(-2*h)}.\nĐỉnh nằm trên parabol: ${iz(k)} = ${h*h} + ${iz(-2*h)}·(${iz(h)}) + c, suy ra c = ${iz(h*h+k)}.\nVậy b + c = ${iz(-2*h+h*h+k)}.`)},
()=>{const s=R(-3,3),h=R(-4,5);return I(`Hàm số y = x² − 2(${ps([s,1],'m')})x + 3 đạt giá trị nhỏ nhất tại x = ${iz(h)}. Giá trị của m là`,h-s,`Hoành độ đỉnh: x = (${ps([s,1],'m')}) = ${iz(h)}, suy ra m = ${iz(h)} ${sg(-s)} = ${iz(h-s)}.`)},
()=>{let p,q;do{p=R(-6,6);q=R(-6,6)}while(p>=q);return I(`Parabol y = ${ps([p*q,-(p+q),1])} cắt trục hoành tại hai điểm A, B. Độ dài đoạn AB bằng`,q-p,`Phương trình hoành độ giao điểm: ${fac(p)}${fac(q)} = 0, x = ${iz(p)} hoặc x = ${iz(q)}.\nAB = |${iz(q)} − ${pa(p)}| = ${q-p}.`)},
()=>{const p=R(2,7);return I(`Đồ thị hàm số y = x² − ${2*p}x + m cắt trục hoành tại đúng một điểm khi m bằng`,p*p,`Cắt trục hoành tại đúng một điểm khi Δ' = 0: ${p*p} − m = 0, nên m = ${p*p}.`)}
);

/* ===== Bất phương trình bậc nhất hai ẩn ===== */
const OPS=['≤','≥','&lt;','&gt;'],sat=(op,v,c)=>op=='≤'?v<=c:op=='≥'?v>=c:op=='&lt;'?v<c:v>c,
 grid=f=>{const ok=[],no=[];for(let x=-4;x<=4;x++)for(let y=-4;y<=4;y++)(f(x,y)?ok:no).push([x,y]);return[ok,no]};
add('t10bpt',
()=>{const a=nzr(-4,4),b=nzr(-4,4),c=R(-6,6),op=P(OPS),[ok,no]=grid((x,y)=>sat(op,a*x+b*y,c)),o=P(ok),w=sh(no).slice(0,3);return Z(`Cặp số (x; y) nào là nghiệm của bất phương trình ${lh(a,b)} ${op} ${iz(c)}?`,pt(...o),w.map(v=>pt(...v)),`Thay từng cặp vào vế trái. Với ${pt(...o)}: ${lh(a,b).replace('x','·('+iz(o[0])+')').replace('y','·('+iz(o[1])+')')} cho ${iz(a*o[0]+b*o[1])}, thoả ${op} ${iz(c)}.`)},
()=>{let a,b,c,op,a2,b2,c2,op2,ok,no;do{a=nzr(-3,3);b=nzr(-3,3);c=R(-5,5);op=P(OPS);a2=nzr(-3,3);b2=nzr(-3,3);c2=R(-5,5);op2=P(OPS);[ok,no]=grid((x,y)=>sat(op,a*x+b*y,c)&&sat(op2,a2*x+b2*y,c2))}while(!ok.length||no.length<3);const o=P(ok);return Z(`Cặp số (x; y) nào là nghiệm của hệ bất phương trình { ${lh(a,b)} ${op} ${iz(c)} ; ${lh(a2,b2)} ${op2} ${iz(c2)} }?`,pt(...o),sh(no).slice(0,3).map(v=>pt(...v)),`Nghiệm của hệ phải thoả cả hai bất phương trình. ${pt(...o)}: ${iz(a*o[0]+b*o[1])} ${op} ${iz(c)} và ${iz(a2*o[0]+b2*o[1])} ${op2} ${iz(c2)}, cả hai đều đúng.`)},
()=>{const a=R(2,8),b=R(2,8),p=R(1,5),q=R(1,5),m=Math.max(0,p*a,q*b);return N(`Biểu thức F = ${p==1?'':p}x + ${q==1?'':q}y đạt giá trị lớn nhất trên miền tam giác OAB với O(0; 0), A(${a}; 0), B(0; ${b}) bằng`,m,`GTLN của F đạt tại một đỉnh: F(O) = 0, F(A) = ${p*a}, F(B) = ${q*b}. Lớn nhất là ${m}.`)},
()=>{const a=nzr(-4,4),b=nzr(-4,4),c=R(-6,6),op=P(OPS),ans=`${lh(a,b)} = ${iz(c)}`;return Z(`Đường thẳng bờ của miền nghiệm bất phương trình ${lh(a,b)} ${op} ${iz(c)} là`,ans,[`${lh(a,-b)} = ${iz(c)}`,`${lh(b,a)} = ${iz(c)}`,`${lh(a,b)} = ${iz(c+1)}`,`${lh(-a,b)} = ${iz(c)}`],`Đường thẳng bờ là đường thẳng ứng với dấu "=": ${ans}.\nDấu ${op} cho biết lấy nửa mặt phẳng nào (${op=='≤'||op=='≥'?'có':'không'} kể bờ).`)}
);
addH('t10bpt',
()=>{const a=R(3,8),c=R(3,8),m=R(1,a),n=R(1,c),p=R(1,4),q=R(1,4),V=[[0,0],[a,0],[m,n],[0,c]],v=V.map(([x,y])=>p*x+q*y);return I(`Tìm giá trị lớn nhất của F = ${p==1?'':p}x + ${q==1?'':q}y trên miền tứ giác OABC với O(0; 0), A(${a}; 0), B(${m}; ${n}), C(0; ${c}).`,Math.max(...v),`GTLN đạt tại một đỉnh. F(O) = ${v[0]}, F(A) = ${v[1]}, F(B) = ${v[2]}, F(C) = ${v[3]}. Giá trị lớn nhất là ${Math.max(...v)}.`)},
()=>{const n=R(4,9);return I(`Có bao nhiêu cặp số nguyên dương (x; y) thoả mãn x + y ≤ ${n}?`,n*(n-1)/2,`Với tổng s = x + y từ 2 đến ${n} có s − 1 cặp. Tổng: 1 + 2 + … + ${n-1} = ${n*(n-1)/2}.`)},
()=>{const a=R(2,9),b=R(2,9);return I(`Diện tích miền nghiệm của hệ { x ≥ 0 ; y ≥ 0 ; ${b}x + ${a}y ≤ ${a*b} } bằng (nhập số)`,a*b/2,`Miền nghiệm là tam giác vuông có hai cạnh góc vuông ${a} và ${b} (cắt các trục tại (${a}; 0) và (0; ${b})).\nDiện tích = ½·${a}·${b} = ${f2(a*b/2)}.`)},
()=>{const a=R(2,6),b=R(2,6),p=R(1,4),q=R(1,4);return I(`Tìm giá trị nhỏ nhất của F = ${p==1?'':p}x + ${q==1?'':q}y trên miền tam giác có các đỉnh A(${a}; 1), B(${a+1}; ${b+1}), C(${a-1}; ${b+2}).`,Math.min(p*a+q,p*(a+1)+q*(b+1),p*(a-1)+q*(b+2)),`Tính F tại ba đỉnh: F(A) = ${p*a+q}, F(B) = ${p*(a+1)+q*(b+1)}, F(C) = ${p*(a-1)+q*(b+2)}. Nhỏ nhất là ${Math.min(p*a+q,p*(a+1)+q*(b+1),p*(a-1)+q*(b+2))}.`)}
);

/* ===== Tam thức bậc hai ===== */
add('t10tam',
()=>{const a=nzr(-3,3),b=R(-6,6),c=R(-5,5);return N(`Biệt thức Δ của tam thức f(x) = ${fx(a,b,c)} bằng`,b*b-4*a*c,`Δ = b² − 4ac = ${pa(b)}² − 4·${pa(a)}·${pa(c)} = ${iz(b*b-4*a*c)}.`,iz,1)},
()=>{let p,q;do{p=R(-5,5);q=R(-5,5)}while(p>=q);const op=P(OPS),pi=iz(p),qi=iz(q),R1={'&lt;':`(${pi}; ${qi})`,'≤':`[${pi}; ${qi}]`,'&gt;':`(−∞; ${pi}) ∪ (${qi}; +∞)`,'≥':`(−∞; ${pi}] ∪ [${qi}; +∞)`},ans=R1[op];return Z(`Tập nghiệm của bất phương trình ${ps([p*q,-(p+q),1])} ${op} 0 là`,ans,Object.values(R1).filter(x=>x!=ans).concat([`(${pi}; ${qi}]`]),`Tam thức có hai nghiệm ${pi} và ${qi}, hệ số a = 1 &gt; 0: trái dấu a (âm) trong khoảng hai nghiệm, cùng dấu a (dương) ngoài khoảng.\nTập nghiệm: ${ans}.`)},
()=>{const p=R(1,4),k=R(1,3),f=ps([p*p+k,2*p,1]);return Z('Tam thức nào sau đây dương với mọi số thực x?',f,[ps([p*p-k,2*p,1]),ps([-(p*p+k),-2*p,-1]),ps([p*p,2*p,1])],`${f} có a = 1 &gt; 0 và Δ = ${4*p*p} − ${4*(p*p+k)} = ${iz(-4*k)} &lt; 0 nên luôn dương.`)},
()=>{let d,r,s,c;do{d=R(1,4);r=d+R(2,5);s=2*d+1-r;c=d*d-r*s}while(!c);return Z(`Nghiệm của phương trình √(x ${sg(c)}) = x − ${d} là`,''+r,[iz(s),''+(r+1),''+(r-1),iz(r+s)],`Bình phương: x ${sg(c)} = (x − ${d})², được x² − ${2*d+1}x + ${d*d-c} = 0, có nghiệm x = ${r} và x = ${iz(s)}.\nĐiều kiện x − ${d} ≥ 0 nên loại x = ${iz(s)}. Nghiệm là x = ${r}.`)},
()=>{const p=R(2,7);return N(`Phương trình x² − ${2*p}x + m = 0 có nghiệm kép khi m bằng`,p*p,`Nghiệm kép khi Δ' = 0: ${p}² − m = 0, nên m = ${p*p}.`)},
()=>{const p=R(2,9),ans=`[${iz(-p)}; ${p}]`;return Z(`Tập nghiệm của bất phương trình x² − ${p*p} ≤ 0 là`,ans,[`(−∞; ${iz(-p)}] ∪ [${p}; +∞)`,`(${iz(-p)}; ${p})`,`[0; ${p}]`,`[${iz(-p*p)}; ${p*p}]`],`x² ≤ ${p*p} ⇔ |x| ≤ ${p} ⇔ ${ans}.`)}
);
addH('t10tam',
()=>{let p,q;do{p=R(-8,6);q=R(-8,8)}while(q-p<2);return I(`Số nghiệm nguyên của bất phương trình ${ps([p*q,-(p+q),1])} ≤ 0 là`,q-p+1,`Tập nghiệm là [${iz(p)}; ${iz(q)}], gồm các số nguyên từ ${iz(p)} đến ${iz(q)}: ${q-p+1} số.`)},
()=>{const p=R(2,8);return I(`Giá trị nguyên nhỏ nhất của tham số m để x² − ${2*p}x + m &gt; 0 với mọi x ∈ ℝ là`,p*p+1,`Cần Δ' = ${p*p} − m &lt; 0, tức là m &gt; ${p*p}. Số nguyên nhỏ nhất là ${p*p+1}.`)},
()=>{let p,q;do{p=R(-8,8);q=R(-8,8)}while(q-p<2);return I(`Có bao nhiêu số nguyên x ∈ [−10; 10] thoả mãn ${ps([p*q,-(p+q),1])} &gt; 0?`,21-(q-p+1),`Bất phương trình có nghiệm ngoài đoạn [${iz(p)}; ${iz(q)}]. Đoạn này chứa ${q-p+1} số nguyên, trong tổng 21 số nguyên của [−10; 10]. Còn lại ${21-(q-p+1)} số.`)},
()=>{let p,q;do{p=R(-5,6);q=R(-5,6)}while(p==q);return I(`Gọi x<sub>1</sub>, x<sub>2</sub> là hai nghiệm của phương trình ${ps([p*q,-(p+q),1])} = 0. Giá trị của x<sub>1</sub>² + x<sub>2</sub>² bằng`,p*p+q*q,`Theo định lí Viète: x<sub>1</sub> + x<sub>2</sub> = ${iz(p+q)}, x<sub>1</sub>x<sub>2</sub> = ${iz(p*q)}.\nx<sub>1</sub>² + x<sub>2</sub>² = (x<sub>1</sub> + x<sub>2</sub>)² − 2x<sub>1</sub>x<sub>2</sub> = ${(p+q)**2} ${sg(-2*p*q)} = ${p*p+q*q}.`)}
);

/* ===== Đại số tổ hợp ===== */
add('t10th',
()=>{const n=R(5,10),k=R(2,4);return N(`Giá trị của ${Cn(n,k)} bằng`,Cc(n,k),`${Cn(n,k)} = ${n}! / (${k}!·${n-k}!) = ${Cc(n,k)}.`)},
()=>{const n=R(5,9),k=R(2,3);return N(`Giá trị của ${An(n,k)} bằng`,Aa(n,k),`${An(n,k)} = ${n}! / ${n-k}! = ${Array.from({length:k},(_,i)=>n-i).join('·')} = ${Aa(n,k)}.`)},
()=>{const n=R(4,7);return Z(`Có bao nhiêu cách xếp ${n} bạn học sinh thành một hàng ngang?`,''+fct(n),[fct(n-1),fct(n+1),n*n,n*(n-1)].map(String),`Mỗi cách xếp là một hoán vị của ${n} phần tử: ${n}! = ${fct(n)}.`)},
()=>{const a=R(3,9),b=R(3,9);return N(`Một nhóm có ${a} bạn nam và ${b} bạn nữ. Có bao nhiêu cách chọn một bạn nam và một bạn nữ để tham gia văn nghệ?`,a*b,`Quy tắc nhân: ${a} × ${b} = ${a*b} cách.`)},
()=>{const n=R(5,7),k=R(2,3);return N(`Từ các chữ số 1, 2, …, ${n} có thể lập được bao nhiêu số tự nhiên có ${k} chữ số khác nhau?`,Aa(n,k),`Chọn ${k} chữ số khác nhau và sắp thứ tự: ${An(n,k)} = ${Aa(n,k)}.`)},
()=>{const a=R(2,5),b=R(2,5),c=R(2,5);return N(`Có ${a} áo, ${b} quần và ${c} đôi giày khác nhau. Có bao nhiêu cách chọn một bộ gồm một áo, một quần và một đôi giày?`,a*b*c,`Quy tắc nhân: ${a} × ${b} × ${c} = ${a*b*c}.`)},
()=>{const a=R(2,6),b=R(2,6),c=R(2,6);return N(`Bữa ăn có ${a} món mặn, ${b} món canh và ${c} món tráng miệng. Em chỉ được chọn một món. Có bao nhiêu cách chọn?`,a+b+c,`Quy tắc cộng: ${a} + ${b} + ${c} = ${a+b+c}.`)},
()=>{const n=R(4,12);return N(`Khai triển (a + b)<sup>${n}</sup> có bao nhiêu số hạng?`,n+1,`Khai triển (a + b)<sup>n</sup> có n + 1 số hạng: ${n} + 1 = ${n+1}.`)}
);
addH('t10th',
()=>{const n=R(3,6),a=R(1,3),k=R(1,n-1);return I(`Hệ số của x<sup>${k}</sup> trong khai triển (x + ${a})<sup>${n}</sup> bằng`,Cc(n,k)*a**(n-k),`Số hạng chứa x<sup>${k}</sup> là ${Cn(n,k)}·x<sup>${k}</sup>·${a}<sup>${n-k}</sup>, hệ số là ${Cc(n,k)}·${a**(n-k)} = ${Cc(n,k)*a**(n-k)}.`)},
()=>{const a=R(1,3),b=P([-2,-1,1,2,3]),n=R(3,5);return I(`Tổng các hệ số trong khai triển (${ps([b,a])})^${n} bằng`,(a+b)**n,`Thay x = 1: tổng các hệ số = (${a} ${sg(b)})<sup>${n}</sup> = ${(a+b)**n}.`)},
()=>{const n=R(4,7);return I(`Có bao nhiêu cách xếp ${n} bạn thành một hàng ngang sao cho hai bạn A và B luôn đứng cạnh nhau?`,2*fct(n-1),`Buộc A, B thành một nhóm: xếp ${n-1} "phần tử" được ${n-1}! cách, đổi chỗ A, B trong nhóm có 2 cách. Tổng: 2·${n-1}! = ${2*fct(n-1)}.`)},
()=>{const a=R(4,7),b=R(3,6),k=R(2,3);return I(`Từ ${a} bạn nam và ${b} bạn nữ, chọn ${k} bạn lập một tổ sao cho có ít nhất một bạn nữ. Số cách chọn là`,Cc(a+b,k)-Cc(a,k),`Tổng số cách chọn ${k} bạn: ${Cn(a+b,k)} = ${Cc(a+b,k)}. Số cách chọn toàn nam: ${Cn(a,k)} = ${Cc(a,k)}.\nCó ít nhất một nữ: ${Cc(a+b,k)} − ${Cc(a,k)} = ${Cc(a+b,k)-Cc(a,k)}.`)},
()=>{const n=R(5,12);return I(`Biết ${Cn('n',2)} = ${Cc(n,2)}. Giá trị của n là`,n,`${Cn('n',2)} = n(n−1)/2 = ${Cc(n,2)} nên n(n−1) = ${2*Cc(n,2)}, suy ra n = ${n}.`)},
()=>{const n=R(4,7);return I(`Có bao nhiêu cách xếp ${n} người ngồi quanh một bàn tròn (hai cách xếp là một nếu trùng nhau sau khi xoay bàn)?`,fct(n-1),`Cố định một người, xếp ${n-1} người còn lại: ${n-1}! = ${fct(n-1)}.`)}
);
})();
