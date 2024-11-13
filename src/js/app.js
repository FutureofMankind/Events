import HomeWorkMenu from './HomeWorkMenu';

const containerNav = document.getElementById('nav');
const containerNumberOne = document.getElementById('numberOne');
const containerNumberTwo = document.getElementById('numberTwo');
const containerNumberThree = document.getElementById('numberThree');

const homeWorkMenu = new HomeWorkMenu();

homeWorkMenu.bindToDOM(containerNav);
homeWorkMenu.bindTaskOneToDOM(containerNumberOne);
homeWorkMenu.bindTaskTwoToDOM(containerNumberTwo);
homeWorkMenu.bindTaskThreeToDOM(containerNumberThree);

homeWorkMenu.drawUI();

console.log('app started');
