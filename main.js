let menu = document.getElementById('topic')
let men = document.getElementsByClassName('menu')[0]
men.addEventListener('click',function(e) {
e.stopPropagation()
  let contain = menu.classList.contains('visible')
  if(contain){
    men.children[0].style.transform = `rotate(0)`
    men.children[0].style.top = '-25px'
    men.children[2].style.transform = `rotate(0)`
    men.children[2].style.top = '5px'
    men.children[1].style.display = `block`
    menu.classList.remove('visible')
  }else{
    men.children[0].style.transform = `rotate(45deg)`
    men.children[0].style.top = '-10px'
    men.children[2].style.transform = `rotate(-45deg)`
    men.children[2].style.top = '-10px'
    men.children[1].style.display = `none`
    menu.classList.add('visible')
  }
})
window.addEventListener("click",(e)=>{
  e.stopPropagation();
  if(e.target != menu){
  if(menu.classList.contains('visible')){
    men.children[0].style.transform = `rotate(0)`
    men.children[0].style.top = '-25px'
    men.children[2].style.transform = `rotate(0)`
    men.children[2].style.top = '5px'
    men.children[1].style.display = `block`
    menu.classList.remove('visible')
  }
}
})
window.addEventListener('load',function(e) {
  setTimeout(()=>{
      document.getElementsByClassName('content')[0].style.display = 'block'
      document.getElementsByClassName('content')[0].style.animation = "openpage 1.5s ease-in-out"
      document.getElementsByClassName('content')[0].style.opacity = 1
      document.getElementsByClassName('loading')[0].style.display = 'none'
      document.getElementsByClassName('top')[0].style.animationName = 'load2'
      document.getElementsByClassName('top')[0].style.animationDuration = '2.5s'
  },1000)

})

let quran = document.getElementsByClassName('quran')[0];
let hadith = document.getElementsByClassName('hadith')[0]
let azkar = document.getElementsByClassName('azkar')[0]
let doaa = document.getElementsByClassName('doaa')[0]
let salah = document.getElementsByClassName('salah')[0]
let question = document.getElementsByClassName('question')[0]
let about = document.getElementsByClassName('about')[0]
function ani(ele){
  ele.style.animationName = 'load'
  ele.style.opacity = 1
}
let quranani = false
let hadithani = false
let azkarani = false
let salahani = false
let doaaani = false
let questionani = false
let aboutani = false
window.addEventListener('scroll',function(){
  if(scrollY >= 0 && !quranani){
    ani(quran)
    quranani = true
  }
  if(scrollY >= 160 && !hadithani){
    ani(hadith)
    hadithani = true
  }
  if (scrollY >= 460 && !azkarani) {
    ani(azkar)
    azkarani = true
  }
  if (scrollY >= 580 && !salahani) {
    ani(salah)
    salahani = true
  }
  if (scrollY >= 800 && !doaaani) {
    ani(doaa)
    doaaani = true
  }
  if (scrollY >= 990 && !questionani) {
    ani(question)
    questionani = true
  }
  if (scrollY >= 1125 && !aboutani) {
    ani(about)
    aboutani = true
  }
})
let daten = document.getElementById('date')
let datee = new Date()
console.log()
daten.innerText = datee.getFullYear()