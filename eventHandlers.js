function addEventListeners() {
  //arm1
  document.querySelector("#arm1X").textContent = arm1X;
  document.querySelector("#arm1-x-axis").value = arm1X;
  document
    .querySelector("#arm1-x-axis")
    .addEventListener("pointermove", (event) => {
      arm1X = parseInt(event.target.value);
      //      console.log("changed arm1 x to ", event.target.value);
      document.querySelector("#arm1X").textContent = event.target.value;
    });
  document.querySelector("#arm1Y").textContent = arm1Y;
  document.querySelector("#arm1-y-axis").value = arm1Y;
  document
    .querySelector("#arm1-y-axis")
    .addEventListener("pointermove", (event) => {
      arm1Y = parseInt(event.target.value);
      //      console.log("changed arm1 x to ", event.target.value);
      document.querySelector("#arm1Y").textContent = event.target.value;
    });
  document.querySelector("#arm1Z").textContent = arm1Z;
  document.querySelector("#arm1-z-axis").value = arm1Z;
  document
    .querySelector("#arm1-z-axis")
    .addEventListener("pointermove", (event) => {
      arm1Z = parseInt(event.target.value);
      //      console.log("changed arm1 x to ", event.target.value);
      document.querySelector("#arm1Z").textContent = event.target.value;
    });

  //arm2
  document.querySelector("#armR").textContent = armR;
  document.querySelector("#arm-rot").value = armR;
  document
    .querySelector("#arm-rot")
    .addEventListener("pointermove", (event) => {
      armR = parseInt(event.target.value);
      //      console.log("changed arm2 x to ", event.target.value);
      document.querySelector("#armR").textContent = event.target.value;
    });
  // document.querySelector("#arm2Y").textContent = arm2Y;
  // document.querySelector("#arm2-y-axis").value = arm2Y;
  // document
  //   .querySelector("#arm2-y-axis")
  //   .addEventListener("pointermove", (event) => {
  //     arm2Y = parseInt(event.target.value);
  //     //      console.log("changed arm2 x to ", event.target.value);
  //     document.querySelector("#arm2Y").textContent = event.target.value;
  //   });
  // document.querySelector("#arm2Z").textContent = arm2Z;
  // document.querySelector("#arm2-z-axis").value = arm2Z;
  // document
  //   .querySelector("#arm2-z-axis")
  //   .addEventListener("pointermove", (event) => {
  //     arm2Z = parseInt(event.target.value);
  //     //      console.log("changed arm2 x to ", event.target.value);
  //     document.querySelector("#arm2Z").textContent = event.target.value;
  //   });

  //arm3
  document.querySelector("#j1Ang").textContent = j1Ang;
  document.querySelector("#j1-ang").value = j1Ang;
  document.querySelector("#j1-ang").addEventListener("pointermove", (event) => {
    j1Ang = parseInt(event.target.value);
    //      console.log("changed arm3 x to ", event.target.value);
    document.querySelector("#j1Ang").textContent = event.target.value;
  });
  document.querySelector("#j2Ang").textContent = j2Ang;
  document.querySelector("#j2-ang").value = j2Ang;
  document.querySelector("#j2-ang").addEventListener("pointermove", (event) => {
    j2Ang = parseInt(event.target.value);
    //      console.log("changed arm3 x to ", event.target.value);
    document.querySelector("#j2Ang").textContent = event.target.value;
  });
  // document.querySelector("#arm3Z").textContent = arm3Z;
  // document.querySelector("#arm3-z-axis").value = arm3Z;
  // document
  //   .querySelector("#arm3-z-axis")
  //   .addEventListener("pointermove", (event) => {
  //     arm3Z = parseInt(event.target.value);
  //     //      console.log("changed arm3 x to ", event.target.value);
  //     document.querySelector("#arm3Z").textContent = event.target.value;
  //   });

  //cam
  document.querySelector("#camX").textContent = camX;
  document.querySelector("#cam-x-axis").value = camX;
  document
    .querySelector("#cam-x-axis")
    .addEventListener("pointermove", (event) => {
      camX = parseInt(event.target.value);
      document.querySelector("#camX").textContent = event.target.value;
    });
  document.querySelector("#camY").textContent = camY;
  document.querySelector("#cam-y-axis").value = camY;
  document
    .querySelector("#cam-y-axis")
    .addEventListener("pointermove", (event) => {
      camY = parseInt(event.target.value);
      //      console.log("changed cam x to ", event.target.value);
      document.querySelector("#camY").textContent = event.target.value;
    });
  document.querySelector("#camZ").textContent = camZ;
  document.querySelector("#cam-z-axis").value = camZ;
  document
    .querySelector("#cam-z-axis")
    .addEventListener("pointermove", (event) => {
      camZ = parseInt(event.target.value);
      //      console.log("changed cam x to ", event.target.value);
      document.querySelector("#camZ").textContent = event.target.value;
    });

  // light
  document.querySelector("#lightX").textContent = lightX;
  document.querySelector("#light-x-axis").value = lightX;
  document
    .querySelector("#light-x-axis")
    .addEventListener("pointermove", (event) => {
      lightX = parseInt(event.target.value);
      //      console.log("changed light x to ", event.target.value);
      document.querySelector("#lightX").textContent = event.target.value;
    });
  document.querySelector("#lightY").textContent = lightY;
  document.querySelector("#light-y-axis").value = lightY;
  document
    .querySelector("#light-y-axis")
    .addEventListener("pointermove", (event) => {
      lightY = parseInt(event.target.value);
      //      console.log("changed light x to ", event.target.value);
      document.querySelector("#lightY").textContent = event.target.value;
    });
  document.querySelector("#lightZ").textContent = lightZ;
  document.querySelector("#light-z-axis").value = lightZ;
  document
    .querySelector("#light-z-axis")
    .addEventListener("pointermove", (event) => {
      lightZ = parseInt(event.target.value);
      //      console.log("changed light x to ", event.target.value);
      document.querySelector("#lightZ").textContent = event.target.value;
    });
}
