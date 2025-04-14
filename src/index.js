import _ from 'lodash';
import $ from 'jquery';
// import printMe from './print.js';
// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { b } from './b'
// import Folder from './folder.png';
// function component() {
//   const element = document.createElement("div");
//   const btn = document.createElement("button");
//   element.innerHTML = "Hello webpack";
//   btn.innerHTML = "Click me and check the console!";
//   btn.onclick = printMe;

//   element.appendChild(btn);

//   // const myIcon = new Image();
//   // myIcon.src = Folder;

//   // element.appendChild(myIcon);

//   return element;
// }

// document.body.appendChild(component());

export function numToWord(num) {
  return _.join(['a', 'b', 'c'], num);
}



