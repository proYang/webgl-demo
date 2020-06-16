
const canvas = document.querySelector('.webgl');

const gl = canvas.getContext('webgl');

// 设置背景色
gl.clearColor(0.0, 0.0, 0.0, 1.0);

// 清除颜色缓冲区
gl.clear(gl.COLOR_BUFFER_BIT);

// 顶点着色器
const VSHADER_SOURCE = `
void main() {
	gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
	gl_PointSize = 10.0;
}
`

// 片段着色器
const FSHADER_SOURCE = `
void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

const loadShader = (gl, type, source) => {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);

    gl.compileShader(shader);

    gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    return shader;

}


loadShader(gl, VSHADER_SOURCE, FSHADER_SOURCE);