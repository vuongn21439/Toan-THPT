/* Danh mục lớp: mỗi lớp có 3 nhóm chủ đề (3 tab ở mục Học, và 3 đề thi riêng ở mục Thi thử).
   Lớp 10 (12 chủ đề) · Lớp 11 (10 chủ đề) · Lớp 12 (10 chủ đề). */
const GRADES={
 10:{label:'Lớp 10',e:'🧭',c:'#2f6fe0',tag:'Vững nền tảng THPT',sub:'theo chương trình mới',groups:[['🔢 Đại số',['t10mt','t10hs','t10bh','t10bpt','t10tam','t10th']],['📐 Hình học',['t10hl','t10vt','t10td','t10cn']],['📊 Thống kê & XS',['t10sg','t10dt','t10xs']]]},
 11:{label:'Lớp 11',e:'🔭',c:'#10ac84',tag:'Giải tích và không gian',sub:'theo chương trình mới',groups:[['🔢 Đại số & Giải tích',['t11lg','t11pt','t11ds','t11gh','t11dh','t11ml']],['📐 Hình học không gian',['t11ss','t11vg']],['📊 Thống kê & XS',['t11tk','t11xs']]]},
 12:{label:'Lớp 12',e:'🏆',c:'#8e44ec',tag:'Chinh phục kì thi tốt nghiệp',sub:'theo chương trình mới',groups:[['🔢 Giải tích',['t12ud','t12ng','t12tp','t12sp']],['📐 Hình học Oxyz',['t12vt','t12mp','t12dt','t12mc']],['📊 Thống kê & XS',['t12tk','t12xs']]]}};
T.forEach(t=>{if(t.gr===undefined)t.gr=10});
