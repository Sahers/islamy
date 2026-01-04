// animation handling in menu
let menu = document.getElementById('topic')
let men = document.getElementsByClassName('menu')[0]
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
  if(e.target != menu){
  if(menu.classList.contains('visible')){

    menu.classList.remove('visible')
  }
}
})
// copyright year
let daten = document.getElementById('date')
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
// add doaas
let doaacontainer = document.querySelectorAll(".doaa .doaas")
async function doaa() {
    let link = `doaa/doaa.json`
    fetch(link).then((r)=> r.json()).then((r)=>{
        let cont = ["","","",""]
        let parts = Object.values(r)
        for(let i = 0;i<parts.length;i++){
            for(let j = 0;j < parts[i].length;j++){
                cont[i] += `<div class="cont">
                <div class="text">${parts[i][j]["text"]}</div>
                <button class="paste"><img loading="lazy" src="icons/paste.png" alt="لصق" class="pastee"></button>
                </div>
                `
            }
            doaacontainer[i].innerHTML = cont[i]
        }
    })
}
doaa()
// add pasting for any doaa
let imgs = document.getElementsByClassName("pastee")
let active = false
let element;
window.addEventListener("click",(e)=>{
    if(e.target.classList.contains("paste")){
    let ele = e.target.previousElementSibling
        navigator.clipboard.writeText(ele.innerText)
        if(active){
            element.src = "icons/paste.png"
        }
        e.target.children[0].src = "icons/check-mark.png"
        active = true
        element = e.target.children[0]
    }else if(e.target.classList.contains("pastee")){
        let ele = e.target.parentElement.previousElementSibling
        navigator.clipboard.writeText(ele.innerText)
        if(active){
            element.src = "icons/paste.png"
        }
        e.target.src = "icons/check-mark.png"
        active = true
        element = e.target
    }
})
