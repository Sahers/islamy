// animation handling in menu
let menu = document.getElementById('topic')
let men = document.getElementsByClassName('menu')[0]
// open menu
men.addEventListener('click',function(e) {
e.stopPropagation()
  let contain = menu.classList.contains('visible')
  if(contain){
    menu.classList.remove('visible')
  }else{
    menu.classList.add('visible')
  }
})
window.addEventListener("click",(e)=>{
  e.stopPropagation();
  if(e.target.id == "close-menu-btn"){
  if(menu.classList.contains('visible')){
    menu.classList.remove('visible')
  }
}
})
// copyright year
let daten = document.getElementById("date");
let datee = new Date();
daten.innerText = datee.getFullYear()
// loading animation
window.addEventListener('load', function(e) {
  setTimeout(()=>{
    document.getElementsByClassName('content')[0].style.display = 'block'
    document.getElementsByClassName('content')[0].style.animation = "openpage 1.5s ease-in-out"
    document.getElementsByClassName('content')[0].style.opacity = 1
    document.getElementsByClassName('loading')[0].style.display = 'none'
  },1000)
})
let start = document.getElementById("go")
let input = document.querySelector(".inp input")
let err = document.getElementsByClassName("error-none")[0]
let counterplace = document.getElementsByClassName("place")[0]
let azkarmenu = document.getElementsByClassName("azkar-menu")[0]
// get azkar menu from local storage
function getAzkar(){
    let azkarprevious = ""
    for(let i=0;i<localStorage.length;i++){
        let key = localStorage.key(i)
        let value = localStorage.getItem(key)
        azkarprevious += `
        <div class="zkr">
        <p class="zkr-text">${key}</p>
          <p class="zkr-num">${value}</p>
          <button id="continue" class="continue">أكمل</button>
          <button id="delete" class="delete">مسح</button>
          </div>`
    }
    if(azkarprevious == ""){
        azkarprevious = "<p class=\"center\">لا يوجد أذكار مسجلة</p>"
    }
    azkarmenu.innerHTML = azkarprevious
}
getAzkar()

let zkr_ok = false;
// remove and continue the zekr from local storage
window.addEventListener("click",function(e){
    if(e.target.id == "delete"){
    let div = e.target.parentElement
    localStorage.removeItem(div.children[0].innerHTML)
    div.remove()
    }else if(e.target.id== "continue"){
        if(zkr_ok){
            let child = e.target.parentElement.children
            let zkrnow = document.getElementsByClassName("the-zekr")[0]
            let numbtn = document.getElementsByClassName("counter")[0]
            localStorage.setItem(zkrnow.innerHTML,numbtn.innerHTML)
            if(child[0].innerHTML == zkrnow.innerHTML){
                numbtn.innerHTML = numbtn.innerHTML
            }else{
                numbtn.innerHTML = child[1].innerHTML
            }
            zkrnow.innerHTML = child[0].innerHTML
            getAzkar()
        }else{
            let child = e.target.parentElement.children
        counterplace.innerHTML = `<div class="counterplace center">
        <p class="the-zekr">${child[0].innerHTML}</p>
        <div class="counter">${child[1].innerHTML}</div>
        <div class="repeat">إعادة</div>
      </div>
        </div>`
        zkr_ok = true
        let numbtn = document.getElementsByClassName("counter")[0]
        numbtn.onclick = function(e){
            e.target.innerHTML++
        }
        document.getElementsByClassName("repeat")[0].onclick = function(e){
            numbtn.innerHTML = 0
        }
        getAzkar()
        }
    }
})
// start new zekr
start.onclick = function(e){
    let val = input.value
    if(val != ""){
        if(err.classList.contains("error-ok")){
            err.classList.remove("error-ok")
            err.classList.add("error-none")
        }
        localStorage.setItem(val,0)
        getAzkar()
        zkr_ok = true
        counterplace.innerHTML = `<div class="counterplace center">
        <p class="the-zekr">${val}</p>
        <div class="counter">0</div>
        <div class="repeat">إعادة</div>
        </div>
        </div>`
        let numbtn = document.getElementsByClassName("counter")[0]
        numbtn.onclick = function(e){
            e.target.innerHTML++
        }
        document.getElementsByClassName("repeat")[0].onclick = function(e){
            numbtn.innerHTML = 0
        }
    }else{
        if(err.classList.contains("error-none")){
        err.classList.remove("error-none")
        err.classList.add("error-ok")
        }
    }
}
// save azkar progress before unload
window.onbeforeunload = function(){
if(zkr_ok){
    let zkrnow = document.getElementsByClassName("the-zekr")[0]
    let numbtn = document.getElementsByClassName("counter")[0]
    localStorage.setItem(zkrnow.innerHTML,numbtn.innerHTML)
}
}