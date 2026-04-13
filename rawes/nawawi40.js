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
daten.innerText = datee.getFullYear();
// loading animation
window.addEventListener('load', function(e) {
  setTimeout(()=>{
    document.getElementsByClassName('content')[0].style.display = 'block'
    document.getElementsByClassName('content')[0].style.animation = "openpage 1.5s ease-in-out"
    document.getElementsByClassName('content')[0].style.opacity = 1
    document.getElementsByClassName('loading')[0].style.display = 'none'
    document.getElementsByClassName('top')[0].style.animationName = 'load'
    document.getElementsByClassName('top')[0].style.animationDuration = '2.5s'
  },1000)
})
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // منع الانتقال الفجائي
    let target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
// get hadiths
let hadithscont = document.getElementById("hadithsnawawi")
let hadithbtns = document.getElementById("hadithnum")
let tafsirprev = "";
let ok = false
async function gethadith(){
  for(let i = 0;i<42;i++){
    hadithbtns.innerHTML += `<a href="#hadith${i+1}"><button class="numbtn">${i+1}</button></a>`
  }
  let data = await fetch("40-hadith-nawawi.json").then((r) => r.json()).then((r)=>{
    return r
  }
  )
  for(let j=0;j<data.length;j++){
    let had = data[j]["hadith"]
    let taf = data[j]["description"]
    hadithscont.innerHTML += `
      <div class="hadithnawawi" id="hadith${j+1}">
      <div class="center">الحديث${j+1}</div>
      <p class="hadnaw">${had}</p>
      <button class="tafsir-know">قراءة الشرح</button>
      <p class="hadnawtaf taf-off">${taf}</p>
    </div>
    `
  }
  ok = true;
  if(ok){
let btns = document.getElementsByClassName("tafsir-know")
for(let j=0;j<42;j++){
 btns[j].addEventListener("click",(e)=>{
      let tafopen = e.target.nextElementSibling
      if(tafsirprev != ""){
        tafsirprev.classList.remove("taf-on")
        tafsirprev.classList.add("taf-off")
      }
      tafopen.classList.remove("taf-off")
      tafopen.classList.add("taf-on")
      location.href = `#hadith${j+1}`
      tafsirprev = tafopen
    })
}
    }
}
gethadith()