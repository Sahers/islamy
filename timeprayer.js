// animation handling in menu
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
let daten = document.getElementById('date')
let datee = new Date();daten.innerText = datee.getFullYear()
let lat,lon;
// loading animation
window.addEventListener('load', function(e) {
  setTimeout(()=>{
    document.getElementsByClassName('content')[0].style.display = 'block'
    document.getElementsByClassName('content')[0].style.animation = "openpage 1.5s ease-in-out"
    document.getElementsByClassName('content')[0].style.opacity = 1
    document.getElementsByClassName('loading')[0].style.display = 'none'
  },1000)
     navigator.geolocation.getCurrentPosition(position => {
     lat = position.coords.latitude;
     lon = position.coords.longitude;
     salah()
})
})
// prayers time handling
let maincontainer = document.getElementsByClassName("prayers")[0]
async function salah() {
  let topcontainer = document.getElementsByClassName("cont-salah")[0]
  topcontainer.style.display = "flex"
  let permcontainer = document.getElementsByClassName("cont-permission")[0]
  permcontainer.style.display = "none"
    let url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=5`
    await fetch(url).then((r)=>r.json())
    .then((r)=>{
      let details = document.querySelectorAll(".info div span")
      let day = datee.getDay()
      let month = datee.getMonth()
      let hijridate = r["data"]["date"]["hijri"]
      console.log(hijridate)
      const daysInArabic = [
        "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"
    ];
    const monthsInArabic = [
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];
  
  // location details and time
details[0].innerHTML = `${daysInArabic[day]} ${datee.getDate()} ${monthsInArabic[month]} ${datee.getFullYear()} م`
details[1].innerHTML = `${hijridate["day"]} ${hijridate["month"]["ar"]} ${hijridate["year"]} ھ`
        let eveningg = false
        let hourss = datee.getHours()
        let minutess = datee.getMinutes()
        let timenow = [hourss,minutess]
        if(hourss >= 12){
          hourss -= 12
          eveningg = true
        }
        if(hourss == 0){
          hourss = 12
        }
        if(hourss < 10){
          hourss = "0" + hourss
        }
        if(minutess < 10){
          minutess = "0" + minutess
        }
details[2].innerHTML =`${hourss}:${minutess} ${(eveningg?"م":"ص")}`
// prayers time handling
      let prays = document.getElementsByClassName("time")
      let timestable = r["data"]["timings"]
      let times = [timestable["Fajr"],timestable["Sunrise"],timestable["Dhuhr"],timestable["Asr"],timestable["Maghrib"],timestable["Isha"]]
      let prayers = [];
        for(let i = 0;i<prays.length;i++){
        let timee = times[i]
        let evening = false
        let hours = timee.split("").splice(0,2)
        let minutes = timee.split("").splice(3,2).join("")
        let hoursnum = hours[0] * 10 + +hours[1]
        prayers.push([hoursnum,Number(minutes)])
        if(hoursnum >= 12){
          hoursnum -= 12
          evening = true
        }
        if(hoursnum == 0){
          hoursnum = 12
        }
        if(hoursnum < 10){
          hoursnum = "0" + hoursnum
        }
        prays[i].innerHTML =`${hoursnum}:${minutes} ${(evening?"م":"ص")}`
      }
      // next prayer handling
      let nextsalah = "";
      let difhours;
      let difmins;
      if(timenow[0] < prayers[0][0] || (timenow[0] == prayers[0][0] && timenow[1] < prayers[0][1]) || ((timenow[0] > prayers[5][0] || (timenow[0] == prayers[5][0] && timenow[1] > prayers[5][1])))){
        nextsalah = "الفجر"
        if((timenow[0] > prayers[5][0] || (timenow[0] == prayers[5][0] && timenow[1] > prayers[5][1]))){
          difhours = prayers[0][0] - timenow[0] + 24
          difmins = prayers[0][1] - timenow[1]
        }else{
        difhours = prayers[0][0] - timenow[0]
        difmins = prayers[0][1] - timenow[1]
      }
      if(difmins < 0){
        difmins += 60
        difhours--
      }
      }else if(timenow[0] < prayers[1][0] || (timenow[0] == prayers[1][0] && timenow[1] < prayers[1][1])){
        nextsalah = "الشروق"
        difhours = prayers[1][0] - timenow[0]
        difmins = prayers[1][1] - timenow[1]
        if(difmins < 0){
          difmins += 60
          difhours--
        }
      }else if(timenow[0] < prayers[2][0] || (timenow[0] == prayers[2][0] && timenow[1] < prayers[2][1])){
        nextsalah = "الظهر"
        difhours = prayers[2][0] - timenow[0]
        difmins = prayers[2][1] - timenow[1]
        if(difmins < 0){
          difmins += 60
          difhours--
        }
      }else if(timenow[0] < prayers[3][0] || (timenow[0] == prayers[3][0] && timenow[1] < prayers[3][1])){
        nextsalah = "العصر"
        difhours = prayers[3][0] - timenow[0]
        difmins = prayers[3][1] - timenow[1]
        if(difmins < 0){
          difmins += 60
          difhours--
        }
      }else if(timenow[0] < prayers[4][0] || (timenow[0] == prayers[4][0] && timenow[1] < prayers[4][1])){
        nextsalah = "المغرب"
        difhours = prayers[4][0] - timenow[0]
        difmins = prayers[4][1] - timenow[1]
        if(difmins < 0){
          difmins += 60
          difhours--
        }
      }else if(timenow[0] < prayers[5][0] || (timenow[0] == prayers[5][0] && timenow[1] < prayers[5][1])){
        nextsalah = "العشاء"
        difhours = prayers[5][0] - timenow[0]
        difmins = prayers[5][1] - timenow[1]
        if(difmins < 0){
          difmins += 60
          difhours--
        }
      }
      if(difhours < 1){difhours = ""}else if(difhours == 1){difhours = `ساعة و`}else if(difhours == 2){difhours = `ساعتين و`}else if(difhours < 10){difhours = `${difhours}ساعات و`}else{difhours = `${difhours}ساعة و`}
      if(difmins < 1){difmins = ""}else if(difmins == 1){difmins = `دقيقة`}else if(difmins == 2){difmins = `دقيقتين`}else if(difmins < 10){difmins = `${difmins}دقائق`}else{difmins = `${difmins}دقيقة`}
      let nxtsalahcontainer = document.getElementsByClassName("next-salah")[0]
      let praysnames = ["الفجر","الشروق","الظهر","العصر","المغرب","العشاء"]
      if(nextsalah == ""){
        for(let i = 0;i<6;i++){
          if(timenow[0] == prayers[i][0] && timenow[1] == prayers[i][0]){
            nxtsalahcontainer.innerHTML = `حان الآن موعد صلاة ${praysnames[i]}`
            return;
          }
        }
      }else{
        nxtsalahcontainer.innerHTML = `تبقى على صلاة ${nextsalah} ${difhours}${difmins}`
      }
    }).catch((e)=>{
      let mainncontainer = document.getElementsByClassName("cont")[0]
      mainncontainer.style.flexDirection = "column"
      mainncontainer.style.backgroundColor = "var(--sec-color)"
      mainncontainer.innerHTML = `<div class="center-image"><img loading="lazy" src="../../icons/error.png" class="imagee error-hadith"></div>
      <p class="center">هناك خطأ في الموقع حاليًا،يمكنك الرجوع إلى <span onclick="back();" style="color:white;text-decoration:none;cursor:pointer;">الصفحة الرئيسية</span></p>
        `;
        console.log(e)
    })
}
// back to main page on error
function back() {
  document.body.innerHTML = `<div class="loading">
    <p>جار التحميل</p>
    <div></div>
  </div>`;
  // مهم
  setTimeout(() => {
    location.href = "index.html";
  }, 1000);
}