# Toán THPT

Game luyện Toán lớp 10, 11, 12 chạy trên trình duyệt/điện thoại, cài được như app (PWA), chơi được khi mất mạng.
Giao diện và cách chơi giống hệt app **Toán Vui Vẻ**; chỉ thay nội dung: **33 chủ đề**, mỗi chủ đề có mức **Cơ bản** và **Nâng cao**,
hơn **700 dạng câu hỏi** sinh số ngẫu nhiên nên chơi mãi không hết đề (gồm các dạng bài trong sách bài tập và nhiều bài toán thực tế).

## Chạy thử
Không mở file bằng cách bấm đúp (file:// chặn các module). Chạy máy chủ tĩnh trong thư mục này:

    python3 -m http.server 8000      # rồi mở http://localhost:8000

Khi đưa lên mạng (GitHub Pages, Firebase Hosting…) chỉ cần tải nguyên thư mục.

## Cấu trúc
    index.html              khung trang, chỉ nạp CSS và JS
    css/style.css           toàn bộ giao diện (màu theo lớp: body[data-gr="10|11|12"])
    js/core/helpers.js      hàm dùng chung (ngẫu nhiên, tạo câu hỏi Q/N/Z, hiển thị phân số)
    js/data/common.js       T (danh sách chủ đề), I, F và bộ hàm hỗ trợ GH (phân số, đa thức, toạ độ, bảng lượng giác…)
    js/data/topics.js       33 chủ đề: tên, màu, mẹo, lớp
    js/data/grades.js       danh mục lớp: 3 nhóm chủ đề mỗi lớp (cũng là 3 đề thi thử của lớp đó)
    js/data/grade10/        dai-so, hinh-hoc, thong-ke (bộ câu hỏi đầu tiên) và bo-sung-dai-so, bo-sung-hinh-hoc, bo-sung-thong-ke
    js/data/grade11/        dai-so, giai-tich, hinh-hoc (hình học không gian + thống kê + xác suất) và bo-sung-luong-giac-day-so, bo-sung-gioi-han-dao-ham, bo-sung-hinh-hoc
    js/data/grade12/        giai-tich, hinh-hoc (Oxyz), thong-ke và bo-sung-giai-tich, bo-sung-hinh-hoc, bo-sung-thong-ke
    js/audio/sound.js       âm thanh tổng hợp bằng WebAudio
    js/app/                 state, hub (các tab), grade (chọn lớp), game, install, account, exam (phòng thi), boot
    js/fx/                  pháo giấy, nền 3D
    js/firebase/            kết nối Firebase (đăng nhập, bảng xếp hạng)
    assets/icons/           biểu tượng app
    sw.js, manifest.webmanifest

## Nội dung theo chương trình
| Lớp | Đại số & Giải tích | Hình học & Đo lường | Thống kê & Xác suất |
|---|---|---|---|
| 10 | Mệnh đề & Tập hợp · Hàm số & tập xác định · Hàm số bậc hai · BPT bậc nhất hai ẩn · Tam thức bậc hai · Đại số tổ hợp | Hệ thức lượng trong tam giác · Vectơ · Đường thẳng & đường tròn (Oxy) · Ba đường conic | Số gần đúng & sai số · Số đặc trưng của mẫu số liệu · Xác suất cổ điển |
| 11 | Góc & công thức lượng giác · Hàm số & PT lượng giác · Dãy số, CSC, CSN · Giới hạn & hàm liên tục · Đạo hàm · Hàm số mũ & lôgarit | Quan hệ song song · Quan hệ vuông góc & khoảng cách | Mẫu số liệu ghép nhóm (xu thế trung tâm) · Biến cố, quy tắc cộng & nhân |
| 12 | Ứng dụng đạo hàm · Nguyên hàm · Tích phân & ứng dụng · Số phức | Vectơ, mặt phẳng, đường thẳng, mặt cầu trong Oxyz | Độ phân tán (mẫu ghép nhóm) · Xác suất có điều kiện (Bayes, kì vọng, phương sai) |

Chủ đề **Số phức** (lớp 12) có trong danh sách chủ đề được cung cấp. Nếu chương trình lớp em không học phần này, xoá `t12sp` khỏi `topics.js` và khỏi nhóm của lớp 12 trong `grades.js`.

## Các file bổ sung (bo-sung-*)
Các file `bo-sung-*.js` viết thêm câu hỏi theo từng dạng bài của các tài liệu "Các dạng bài tập Toán 10, 11, 12" và "Bài tập toán thực tế Toán 10, 11, 12" (như quy tắc đếm, thiết diện, tiệm cận xiên, tối ưu hoá, lãi kép, vùng phủ sóng, bán rã, hạ cánh…). Mọi đề đều là câu viết mới theo dạng bài, số liệu sinh ngẫu nhiên; không sao chép nguyên văn đề trong sách.

## Thêm câu hỏi
Mỗi câu hỏi là một hàm trả về câu hỏi mới (số ngẫu nhiên). Trong file của lớp, thêm vào `add('mã-chủ-đề', ...)` (mức Cơ bản) hoặc `addH('mã-chủ-đề', ...)` (mức Nâng cao):

    add('t10th', ()=>{const n=R(5,10);return N(`Tính C(${n}; 2)`, n*(n-1)/2, `C(n; 2) = n(n−1)/2`)});

- `N(đề, đáp án, lời giải, định dạng, cho-phép-số-âm)`: trắc nghiệm số, tự sinh 3 đáp án nhiễu.
- `Z(đề, đáp án, [đáp án sai…], lời giải)`: trắc nghiệm tự đặt đáp án sai (đáp án là chuỗi).
- `I(đề, đáp án, lời giải)`: học sinh tự nhập đáp án (phân số nhập dạng a/b tối giản, số thập phân dùng dấu phẩy hoặc chấm).
- Trong đề và lời giải: `x^2` hiện thành x², `1/2` hiện thành phân số, `<sub>`/`<sup>` dùng được, `<` viết là `&lt;`. Phân số có chữ dùng `GH.fh(tử, mẫu)`.
- Bộ hàm hỗ trợ trong `GH`: `fr/fq` (phân số tối giản), `ps` (đa thức), `pt` (toạ độ), `ln` (đường thẳng), `TV` (bảng sin, cos, tan góc đặc biệt), `NT` (bộ ba có độ dài nguyên), `PY` (bộ ba Pytago)…

Mỗi lần thêm câu hỏi nên chạy thử hàng nghìn lần để chắc không có đáp án nhiễu trùng nhau hoặc chia cho 0 (một đoạn Node dùng `vm` nạp các file dữ liệu rồi gọi từng hàm là đủ).

## Ghi chú kỹ thuật
- **Lưu trữ riêng**: tiến độ lưu ở `localStorage` khoá `thpt`, phòng thi ở `thptx`, nút cài app ở `thptinst`; service worker dùng bộ nhớ `thpt-v1`. Nhờ vậy chạy cùng tên miền với app Toán Vui Vẻ (ví dụ cùng `username.github.io`) vẫn không đè dữ liệu của nhau.
- **Firebase**: `js/firebase/firebase.js` đang dùng **cùng dự án Firebase** với Toán Vui Vẻ, nên cùng tài khoản và cùng bảng xếp hạng XP (sao và tiến độ theo chủ đề thì tách vì mã chủ đề khác nhau). Muốn tách hẳn: tạo dự án Firebase mới, thay `firebaseConfig` trong file đó và đặt Firestore rules cho dự án mới (giống rules của app Toán Vui Vẻ).
- Thử thách ngày của từng lớp (`dc10`, `dc11`, `dc12`) chỉ lưu trên máy, **không** đồng bộ, nên không cần đổi Firestore rules đang dùng. Phần `dc`, `dc7` của app Toán Vui Vẻ trên cùng tài khoản vẫn được giữ nguyên khi đồng bộ.
- Chọn lớp: lần đầu mở app hiện màn Chọn lớp (`pickGrade`), sau đó đổi lớp bằng banner ở đầu các tab Học, Ôn tập, Thi thử, Thử thách.
- `sw.js`: danh sách file lưu offline tự đọc từ `index.html`, nên thêm file script mới chỉ cần khai báo trong `index.html`. Các file `.js`/`.css` và trang chính ưu tiên bản mới khi có mạng (quá 6 giây hoặc mất mạng thì dùng bản đã lưu). Muốn ép máy học sinh tải lại toàn bộ thì đổi `V`.
- **Thi thử & thử thách ngày**: đếm giờ (8 phút / 5 câu, 25 phút / 15 câu), chọn đáp án không hiện đúng/sai ngay, phải **Nộp bài** mới chấm điểm và hiện lời giải. Phòng thi (`js/app/exam.js`) tự lưu bài làm dở, có bản đồ câu hỏi, đánh dấu xem lại, màn Xem lại bài & lời giải. Luyện tập (tab Học, Ôn tập) vẫn có phản hồi ngay.
