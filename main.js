"use strict";

let gl;
let canvas;

// const vertices2 = [
//   0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5,
//   0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,
//   -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5, -0.5,
//   0.5, -0.5, 0.5, -0.5, 0.5,
// ];
// draw tetrahedrom
// gl.drawArrays(gl.TRIANGLES, 0, 12);

const vertices = generateMesh();
var numTimesToSubdivide = 0;

var index = 0;

const vertices2 = [
  // Front face (3x2)
  0,
  2,
  0,
  1, // Origin
  0,
  0,
  0,
  1, // Point on x-axis
  3,
  0,
  0,
  1, // Point on x and y axes
  3,
  0,
  0,
  1, // Origin
  3,
  2,
  0,
  1, // Point on x and y axes
  0,
  2,
  0,
  1, // Point on y-axis

  // Back face (3x2)
  3,
  2,
  1,
  1, // Origin
  3,
  0,
  1,
  1, // Point on x-axis
  0,
  0,
  1,
  1, // Point on x and y axes
  0,
  0,
  1,
  1, // Origin
  0,
  2,
  1,
  1, // Point on x and y axes
  3,
  2,
  1,
  1, // Point on y-axis

  // Left face (2x1)
  0,
  2,
  1,
  1, // Origin
  0,
  0,
  1,
  1, // Point on y-axis
  0,
  0,
  0,
  1, // Point on y and z axes
  0,
  0,
  0,
  1, // Origin
  0,
  2,
  0,
  1, // Point on y and z axes
  0,
  2,
  1,
  1, // Point on z-axis

  // Right face (2x1)
  3,
  2,
  0,
  1, // Point on x-axis
  3,
  0,
  0,
  1, // Point on x and y axes
  3,
  0,
  1,
  1, // Point on x, y, and z axes
  3,
  0,
  1,
  1, // Point on x-axis
  3,
  2,
  1,
  1, // Point on x, y, and z axes
  3,
  2,
  0,
  1, // Point on x and z axes

  // Top face (3x1)
  0,
  2,
  0,
  1, // Point on y-axis
  0,
  2,
  1,
  1, // Point on x and y axes
  3,
  2,
  1,
  1, // Point on x, y, and z axes
  3,
  2,
  1,
  1, // Point on y-axis
  3,
  2,
  0,
  1, // Point on x, y, and z axes
  0,
  2,
  0,
  1, // Point on y and z axes

  // Bottom face (3x1)
  0,
  0,
  0,
  1, // Origin
  3,
  0,
  0,
  1, // Point on x-axis
  3,
  0,
  1,
  1, // Point on x and z axes
  0,
  0,
  0,
  1, // Origin
  3,
  0,
  1,
  1, // Point on x and z axes
  0,
  0,
  1,
  1, // Point on z-axis
];

function computeNormals(array) {
  let nArray = [];
  let pArray = [];
  for (let i = 0; i < array.length; i = i + 12) {
    let a = vec4(array[i], array[i + 1], array[i + 2], 1.0);
    let b = vec4(array[i + 4], array[i + 5], array[i + 6], 1.0);
    let c = vec4(array[i + 8], array[i + 9], array[i + 10], 1.0);
    var t1 = subtract(b, a);
    var t2 = subtract(c, a);
    var n1 = cross(t1, t2);
    let n2 = normalize(n1);
    let normal = vec4(-n2[0], -n2[1], -n2[2], 0.0);
    nArray.push(normal);
    nArray.push(normal);
    nArray.push(normal);
    pArray.push(a);
    pArray.push(b);
    pArray.push(c);
  }
  return { p: pArray, n: nArray };
}

let positionsArray = computeNormals(vertices).p;
let normalsArray = computeNormals(vertices).n;
let positionsArray2 = computeNormals(vertices2).p;
let normalsArray2 = computeNormals(vertices2).n;

// variables for model view and projection matrices
var near = 0.1;
var far = 100.0;
var radius = 1.5;
var theta = 0.0;
var phi = 0.0;
var dr = (5.0 * Math.PI) / 180.0;

var fovy = 80;
var aspect = 16.0 / 9 / 0;
var left = -32.0;
var right = 32.0;
var theTop = 18.0;
var bottom = -18.0;

// // lighting
// var lightPosition = vec4(2.0, 4.0, 2.0, 1.0);
// var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0);
// var lightDiffuse = vec4(0.8, 0.8, 0.8, 1.0);
// var lightSpecular = vec4(0.3, 0.3, 0.3, 1.0);

// // material
// var materialAmbient = vec4(0.2, 0.2, 0.2, 1.0);
// var materialDiffuse = vec4(0.1, 0.2, 0.3, 1.0);
// var materialSpecular = vec4(0.2, 0.2, 0.2, 1.0);
// var materialShininess = 10.0;

// lighting
var lightPosition = vec4(5.0, 10.0, 5.0, 1.0);
var lightAmbient = vec4(0.3, 0.3, 0.3, 1.0);
var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
var lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);

// material
var materialAmbient = vec4(0.1, 0.1, 0.3, 1.0);
var materialDiffuse = vec4(0.2, 0.2, 0.6, 1.0);
var materialSpecular = vec4(0.8, 0.8, 0.8, 1.0);
var materialShininess = 50.0;

// variables for gui
let camX = 13;
let camY = 7;
let camZ = -11;
let arm1X = 0;
let arm1Y = 2;
let arm1Z = 0;
let armR = 0;
let j1Ang = 0;
let j2Ang = 0;
let lightX = 2;
let lightY = 4;
let lightZ = 2;
lightPosition = vec4(lightX, lightY, lightZ, 0.0);

// view matricies
var modelViewMatrix, projectionMatrix;
var uModelViewMatrixLoc, uProjectionMatrixLoc;
var normalsMatrix, uNormalMatrixLoc;
var uLightPositionLoc;
var vertexBuffer1, normalsBuffer1;
var vertexBuffer1Loc, normalsBuffer1Loc;
var vertexBuffer2, normalsBuffer2;
var vertexBuffer2Loc, normalsBuffer2Loc;
var uLightPositionLoc;
var uAmbientProductLoc;
var uDiffuseProductLoc;
var uSpecularProductLoc;
var uShininessLoc;

var eye;
var at = vec3(0.0, 0.0, 0.0);
var up = vec3(0.0, 1.0, 0.0);

initialize();

//init
function initialize() {
  // context
  canvas = document.getElementById("gl-canvas");
  gl = canvas.getContext("webgl2");
  if (!gl) {
    alert("WebGL 2.0 not available");
  }
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0.1, 0.1, 0.1, 1.0);

  gl.enable(gl.DEPTH_TEST);

  // program
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  //for terrain meash
  normalsBuffer1 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer1);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    flatten(normalsArray) /*normals*/,
    gl.STATIC_DRAW
  );
  normalsBuffer1Loc = gl.getAttribLocation(program, "aNormal");
  gl.vertexAttribPointer(normalsBuffer1Loc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(normalsBuffer1Loc);

  vertexBuffer1 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer1);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    flatten(positionsArray) /*vertices*/,
    gl.STATIC_DRAW
  );
  vertexBuffer1Loc = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(vertexBuffer1Loc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vertexBuffer1Loc);

  // for arm1
  normalsBuffer2 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer2);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    flatten(normalsArray2) /*normals*/,
    gl.STATIC_DRAW
  );
  normalsBuffer2Loc = gl.getAttribLocation(program, "aNormal");

  // bind buffers for each mesh
  vertexBuffer2 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer2);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    flatten(positionsArray2) /*vertices*/,
    gl.STATIC_DRAW
  );
  vertexBuffer2Loc = gl.getAttribLocation(program, "aPosition");

  // Get the location of the uniform variables
  uModelViewMatrixLoc = gl.getUniformLocation(program, "uModelViewMatrix");
  uProjectionMatrixLoc = gl.getUniformLocation(program, "uProjectionMatrix");
  uNormalMatrixLoc = gl.getUniformLocation(program, "uNormalMatrix");
  uLightPositionLoc = gl.getUniformLocation(program, "uLightPosition");
  uAmbientProductLoc = gl.getUniformLocation(program, "uAmbientProduct");
  uDiffuseProductLoc = gl.getUniformLocation(program, "uDiffuseProduct");
  uSpecularProductLoc = gl.getUniformLocation(program, "uSpecularProduct");
  uShininessLoc = gl.getUniformLocation(program, "uShininess");

  // wire up the gui controls
  addEventListeners();

  // Start the render loop
  render();
}

// render
function render() {
  // clear the screen
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  //set up for model view and projection matrix calcs
  eye = vec3(camX, camY, camZ);
  modelViewMatrix = lookAt(eye, at, up);
  var fovy = 60;
  var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  var near = 0.1;
  var far = 100.0;
  projectionMatrix = perspective(fovy, aspect, near, far);

  // set up for lighting model
  lightPosition = vec4(lightX, lightY, lightZ, 0.0);

  gl.uniform4fv(uLightPositionLoc, flatten(lightPosition));

  // Pass the updated model-view matrix to the shader
  gl.uniformMatrix4fv(uModelViewMatrixLoc, false, flatten(modelViewMatrix));
  gl.uniformMatrix4fv(uProjectionMatrixLoc, false, flatten(projectionMatrix));
  gl.uniformMatrix3fv(
    uNormalMatrixLoc,
    false,
    flatten(normalMatrix(modelViewMatrix, true))
  );
  gl.uniform4fv(
    uAmbientProductLoc,
    flatten(mult(lightAmbient, materialAmbient))
  );
  gl.uniform4fv(
    uDiffuseProductLoc,
    flatten(mult(lightDiffuse, materialDiffuse))
  );
  gl.uniform4fv(
    uSpecularProductLoc,
    flatten(mult(lightSpecular, materialSpecular))
  );
  gl.uniform1f(uShininessLoc, materialShininess);

  // terrain mesh
  // Pass uniforms for position and normal for terrain mesh
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer1);
  gl.vertexAttribPointer(vertexBuffer1Loc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vertexBuffer1Loc);
  gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer1);
  gl.vertexAttribPointer(normalsBuffer1Loc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(normalsBuffer1Loc);
  // draw terrain mesh
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 4);

  // arm1
  // Pass uniforms for arm1
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer2);
  gl.vertexAttribPointer(vertexBuffer2Loc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vertexBuffer2Loc);
  gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer2);
  gl.vertexAttribPointer(normalsBuffer2Loc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(normalsBuffer2Loc);
  // calculate position of arm1
  modelViewMatrix = mult(modelViewMatrix, translate(arm1X, arm1Y, arm1Z));
  // Translate to the point of rotation
  modelViewMatrix = mult(modelViewMatrix, translate(0.1, 0.5, 1));
  // Apply the rotations
  modelViewMatrix = mult(modelViewMatrix, rotateY(armR));
  // Translate to the point of rotation
  modelViewMatrix = mult(modelViewMatrix, translate(-0.1, -1, -0.5));
  gl.uniformMatrix4fv(uModelViewMatrixLoc, false, flatten(modelViewMatrix));
  // draw arm 1
  gl.drawArrays(gl.TRIANGLES, 0, vertices2.length / 4);

  // arm2
  // calculate position of arm2 from end of arm1
  modelViewMatrix = mult(modelViewMatrix, translate(3, 0, 0));
  // Translate to the point of rotation
  modelViewMatrix = mult(modelViewMatrix, translate(0.1, 0.5, 1));
  // Apply the rotations
  modelViewMatrix = mult(modelViewMatrix, rotateZ(j1Ang));
  // Translate back to the original position
  modelViewMatrix = mult(modelViewMatrix, translate(-0.1, -0.5, -1));
  gl.uniformMatrix4fv(uModelViewMatrixLoc, false, flatten(modelViewMatrix));
  // draw arm 2
  gl.drawArrays(gl.TRIANGLES, 0, vertices2.length / 4);

  //arm3
  // Pass uniforms for arm3
  // calculate position of arm3 from end of arm2
  modelViewMatrix = mult(modelViewMatrix, translate(3, 0, 0));
  // Translate to the point of rotation
  modelViewMatrix = mult(modelViewMatrix, translate(0.1, 0.5, 1));
  // Apply the rotations
  modelViewMatrix = mult(modelViewMatrix, rotateZ(j2Ang));
  // Translate back to the original position
  modelViewMatrix = mult(modelViewMatrix, translate(-0.1, -0.5, -1));
  gl.uniformMatrix4fv(uModelViewMatrixLoc, false, flatten(modelViewMatrix));
  // draw arm 3
  gl.drawArrays(gl.TRIANGLES, 0, vertices2.length / 4);

  // Request the next frame
  requestAnimationFrame(render);
}
