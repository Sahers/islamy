// animation handling in menu
let menu = document.getElementById("topic");
let men = document.getElementsByClassName("menu")[0];
men.addEventListener("click", function (e) {
  let contain = menu.classList.contains("visible");
  if (contain) {
    menu.classList.remove("visible");
  } else {
    menu.classList.add("visible");
  }
});
// copyright year
let daten = document.getElementById("date");
let datee = new Date();
daten.innerText = datee.getFullYear();
// loading animation
window.addEventListener('load', function(e) {
  setTimeout(()=>{
    document.getElementsByClassName('content')[0].style.display = 'block'
    document.getElementsByClassName('content')[0].style.animation = "openpage 1.5s ease-in-out"
    document.getElementsByClassName('content')[0].style.opacity = 1
    document.getElementsByClassName('loading')[0].style.display = 'none'
  },1000)
})