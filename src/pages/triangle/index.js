const $canvas = document.querySelector('.webgl')
// 步骤一：创建 webgl 上下文
const gl = $canvas.getContext('webgl')

// 步骤二：创建webgl程序
//// 顶点着色器
const vertex = `
    attribute vec2 position;
    varying vec3 color;
    void main() {
        gl_PointSize = 1.0;
        color = vec3(0.5 + position * 0.5, 0.0);
        gl_Position = vec4(position * 0.5, 1.0, 1.0);
    }
`;
//// 片段着色器
const fragment = `
    precision mediump float;
    varying vec3 color;

    void main() {
        gl_FragColor = vec4(color, 1.0);
    }
`;
//// 创建 shader
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertex);
gl.compileShader(vertexShader);
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragment);
gl.compileShader(fragmentShader);
//// 创建着色程序
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
//// 启用 WebGLProgram 对象
gl.useProgram(program);

// 步骤三：将数据读入缓冲区
//// 创建缓冲对象
const points = new Float32Array([
    -1, -1,
    0, 1,
    1, -1,
]);
//// 数据写入 webgl 缓冲区
const bufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);


// 步骤四：将缓冲区数据读到GPU
//// 获取顶点着色器中的position变量的地址
const vPosition = gl.getAttribLocation(program, 'position');
//// 给变量设置长度和类
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
//// 激活这个变量
gl.enableVertexAttribArray(vPosition);

// 步骤五：绘制
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, points.length / 2)