let menu = document.getElementById("topic");
let men = document.getElementsByClassName("menu")[0];
men.addEventListener("click", function (e) {
  let contain = menu.classList.contains("visible");
  if (contain) {
    men.children[0].style.transform = `rotate(0)`;
    men.children[0].style.top = "-25px";
    men.children[2].style.transform = `rotate(0)`;
    men.children[2].style.top = "5px";
    men.children[1].style.display = `block`;
    menu.classList.remove("visible");
  } else {
    men.children[0].style.transform = `rotate(45deg)`;
    men.children[0].style.top = "-10px";
    men.children[2].style.transform = `rotate(-45deg)`;
    men.children[2].style.top = "-10px";
    men.children[1].style.display = `none`;
    menu.classList.add("visible");
  }
});
let daten = document.getElementById("date");
let datee = new Date();
console.log();
daten.innerText = datee.getFullYear();
window.addEventListener('load', function(e) {
  setTimeout(()=>{
    document.getElementsByClassName('content')[0].style.display = 'block'
    document.getElementsByClassName('content')[0].style.animation = "openpage 1.5s ease-in-out"
    document.getElementsByClassName('content')[0].style.opacity = 1
    document.getElementsByClassName('loading')[0].style.display = 'none'
  },1000)
})
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
        azkarplace.innerHTML = `<div class="center-image"><img src="../../icons/error.png" class="imagee error-hadith"></div>
      <p class="center">هناك خطأ في الموقع حاليًا،يمكنك الرجوع إلى <span onclick="back();" style="color:white;text-decoration:none;cursor:pointer;">الصفحة الرئيسية</span></p>
        `;
    })
}
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
function back() {
    document.body.innerHTML = `<div class="loading">
      <p>جار التحميل</p>
      <div></div>
    </div>`;
    // مهم
    setTimeout(() => {
      location.href = "../../index.html";
    }, 1000);
  }