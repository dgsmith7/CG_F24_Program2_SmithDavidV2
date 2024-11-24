function generateMesh() {
  let meshVertices = [];
  let size = 10;
  let step = 0.1; // smoothness
  let offset = -5;
  function elevation(x, z) {
    // Elevation function,replace this with any other function
    return Math.sin(x) * Math.atan(z);
    // let r = 0.75; // minor radius of half-bagel
    // let bigR = 2.75; // major radius of half-bagel
    // let radiusDiff = Math.sqrt(x ** 2 + z ** 2) - bigR;
    // let y = Math.sqrt(Math.max(0, r ** 2 - radiusDiff ** 2));
    // return y - offset;
  }

  for (let x = -size / 2; x < size / 2; x += step) {
    for (let z = -size / 2; z < size / 2; z += step) {
      // Four adjacent points on the data field (a quad)
      let p1 = [x, elevation(x, z) + offset, z, 1.0];
      let p2 = [x, elevation(x, z + step) + offset, z + step, 1.0];
      let p3 = [x + step, elevation(x + step, z) + offset, z, 1.0];
      let p4 = [
        x + step,
        elevation(x + step, z + step) + offset,
        z + step,
        1.0,
      ];

      // First triangle (p1, p3, p2) - left-hand winding for positive y normals
      meshVertices.push(...p2);
      meshVertices.push(...p1);
      meshVertices.push(...p3);

      // Second triangle (p3, p4, p2) - left-hand winding for positive y normals
      meshVertices.push(...p3);
      meshVertices.push(...p4);
      meshVertices.push(...p2);
    }
  }

  return meshVertices;
}
