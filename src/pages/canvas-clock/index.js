const $canvas = document.querySelector('.webgl')
const context = $canvas.getContext('2d')

// 移动原点到 画布中心
context.translate(400, 300)

// 画半径 200 的圆
context.beginPath()
context.arc(0, 0, 200, 0, Math.PI * 2, true)
context.closePath();
// 绘制轮廓
context.stroke()

for (let index = 0; index < 12; index++) {
    // 将坐标系保存
    context.save();
    // 旋转坐标系
    context.rotate(index * Math.PI / 6);
    context.beginPath()
    context.moveTo(0, -200)
    context.lineTo(0, -150)
    context.closePath();
    context.stroke()
    // 将坐标系恢复到原有正常的状态
    context.restore();
}