# Bộ kiểm thử Toán THPT

Chạy từ thư mục này (cần Node 18+; `ui.js` cần `npm i jsdom`):

    node fuzz.js 200     # sinh 200 câu cho MỖI dạng (~855 dạng), kiểm tra cấu trúc, đáp án nhiễu, hiển thị, số học trong lời giải
    node ui.js           # chơi thử giao diện thật bằng jsdom: luyện tập, thi thử, thử thách ngày, nộp bài, xem lại lời giải

`fuzz.js` ghi chi tiết vào `fuzz-report.json`. Các cảnh báo còn lại là kiểu "có thể chấp nhận" (đáp án chữ không lặp lại trong lời giải, phân số mẫu 1 trong lời giải...).
Mục tiêu: không có `THROWS`, `BADTOKEN`, `W_EQUIV_*`, `INP_ANSWER_UNTYPEABLE`, `DOUBLE_SIGN`, `COEFF_1`, `DECIMAL_FRACTION_GLUED`, `ARITH_MISMATCH` (trừ các báo nhầm đã biết ở dạng t10hl.g15).
