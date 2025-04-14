// lib/nprogress.ts
import { NProgress } from 'nprogress-v2'
// import 'nprogress-v2/nprogress.css'

NProgress.configure({
    showSpinner: true,     // Ẩn spinner
    minimum: 0.1,           // Giá trị bắt đầu từ 10% (cảm giác "nhanh")
    speed: 2000,             // Tốc độ chuyển trạng thái (ms)
    trickleSpeed: 100,      // Tốc độ tự động tăng tiến mỗi lần trickle (ms)
    // delay: 100,             // (chỉ nprogress-v2) → Delay trước khi hiện
    // easing: 'ease',     // Có thể dùng easing nếu muốn mượt
    // template: `<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>`
})

export default NProgress