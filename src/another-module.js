import _ from 'lodash';

console.log(_.join(['Another', 'module', 'loaded!'], ' '));

function getComponent() {
    return import("lodash")
      .then((module) => {
        console.log('getComponent module', module)
        const { default: _ } = module;
        const element = document.createElement("div");
  
        element.innerHTML = _.join(["Hello", "webpack"], " ");
  
        return element;
      })
      .catch((error) => "An error occurred while loading the component");
  }
  
  function getESMComponent() {
    return import("./print.js")
      .then((module) => {
        console.log('getESMComponent module', module)
      })
      .catch((error) => "An error occurred while loading the component");
  }
  
  function getCommonJSComponent() {
    return import("./common.js")
     .then((module) => {
        console.log('getCommonJSComponent module', module)
        console.log(module.default.test1); // 通过default访问
        console.log(module.default.test2);
        // module.default.test1(); // 调用方法
      })
     .catch((error) => "An error occurred while loading the component");
  }
  
  // getComponent().then((component) => {
  //   document.body.appendChild(component);
  // });
  
  // getESMComponent();
  
  // getCommonJSComponent();
