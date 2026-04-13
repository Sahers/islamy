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
  },1000)
})
// azkar handling from any type(content,num of times)
let azkarplace = document.getElementsByClassName("azkar")[0]
let link = `adkar.json`;
async function zekr(type) {
    let data = await fetch(link)
    .then((r) => r.json()).then((r) =>{
        let con = "";
        for(let i = 0;i<r[type].length;i++){
            let text = r[type][i]["content"]
            let times = r[type][i]["count"]
            con += `
                <div class="zkr">
                <div class="text">${text}</div>
                <div class="counters">
                    <svg width="50" height="50" viewBox="0 0 100 100" class="times">
                        <circle class="outer-circle" cx="50" cy="50" r="50" />
                        <circle class="count-increase" cx="50" cy="50" r="50" />
                        <text class="count" times="0" totaltimes="${Number(times)}" x="50" y="55">${Number(times)}</text>
                    </svg>
                <div class="repeat">إعادة</div>
                </div>
            </div>
            `
        }
        azkarplace.innerHTML = con;
    }).catch(()=>{
        azkarplace.style.backgroundColor = "var(--sec-color)"
        azkarplace.style.display = "flex"
        azkarplace.style.flexDirection = "column"
        azkarplace.innerHTML = `<div class="center-image"><img loading="lazy" src="../../icons/error.png" class="imagee error-hadith"></div>
      <p class="center">هناك خطأ في الموقع حاليًا،يمكنك الرجوع إلى <span onclick="back();" style="color:white;text-decoration:none;cursor:pointer;">الصفحة الرئيسية</span></p>
        `;
    })
}
// azkar num of times handling on click
window.addEventListener("click",(e)=>{ 
    if(e.target.classList.contains("count")){
    let timeess = e.target.getAttribute("times")
    let onetime = 314 / e.target.getAttribute("totaltimes");
    if(e.target.innerHTML > 0){
    e.target.setAttribute("times",Number(timeess) + 1);
    let finalres = (Number(timeess) + 1) * onetime
    e.target.innerHTML--;
    e.target.previousElementSibling.style["stroke-dashoffset"] = `${finalres}px`
    }
    }else if(e.target.classList.contains("times")){
      let elem = e.target.children[2]
      let timeess = elem.getAttribute("times")
      let onetime = 314 / elem.getAttribute("totaltimes");
      if(elem.innerHTML > 0){
      elem.setAttribute("times",Number(timeess) + 1);
      let finalres = (Number(timeess) + 1) * onetime
      elem.innerHTML--;
      elem.previousElementSibling.style["stroke-dashoffset"] = `${finalres}px`
      }
    }else if(e.target.classList.contains("repeat")){
    let counter = e.target.previousElementSibling
    let times = counter.children[2]
    times.setAttribute("times",0)
    times.innerHTML = times.getAttribute("totaltimes")
    let spin = counter.children[1]
    spin.style["stroke-dashoffset"] = `0px`
    }
})
// back to main page on error
function back() {
    document.body.innerHTML = `<div class="loading">
      <p>جار التحميل</p>
      <div></div>
    </div>`;
    // مهم
    setTimeout(() => {
      location.href = "../index.html";
    }, 1000);
  }