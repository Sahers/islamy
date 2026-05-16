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
// loading animation
window.addEventListener('load', function(e) {
  setTimeout(()=>{
    document.getElementsByClassName('content')[0].style.display = 'block'
    document.getElementsByClassName('content')[0].style.animation = "openpage 1.5s ease-in-out"
    document.getElementsByClassName('content')[0].style.opacity = 1
    document.getElementsByClassName('loading')[0].style.display = 'none'
    // handle username
    let nameplace = document.getElementById("name-place")
    if(localStorage.getItem("name") === null){
      nameplace.innerHTML = `ما هو اسمك؟ <input type="text" id="name"> <button>أدخل</button>
      `
    document.querySelector("#name-place button").onclick = () =>{
    let name = document.getElementById("name").value
      if(isNaN(name) && name != ""){
        localStorage.setItem("name",name)
        nameplace.innerHTML = "مرحبًا بك يا " + name
    document.getElementById("err").style.display = "none"
    }else{
      document.getElementById("err").style.display = "block"
    }
    }
    }else{
      let name = this.localStorage.getItem("name")
      nameplace.innerHTML = "مرحبًا بك يا " + name
    }
    // save rate
    let ratenum = document.querySelector(".rate-detail span")
    if(localStorage.getItem("percent") !== null){
      ratenum.innerHTML = localStorage.getItem("percent")
      UpdateRate(localStorage.getItem("percent"))
    }else{
      localStorage.setItem("percent",0)
      UpdateRate(0)
    }
    Perparesuras();
  },1000)
})
// copyright year
let daten = document.getElementById('date')
let datee = new Date();
daten.innerText = datee.getFullYear()
// rate handle
function UpdateRate(rate){
  let percentcircle = document.getElementsByClassName("percent")[0]
  percentcircle.style.background = `conic-gradient(
    var(--third-color) 0% ${rate}%,
    white ${rate}% 100%
  )`
  let ratenum = document.querySelector(".rate-detail span")
  ratenum.innerHTML = `${rate}`
}
let surascont = document.getElementsByClassName("suras")[0];
function Perparesuras(){
  let suras = ["الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال","التوبة","يونس","هود","يوسف","الرعد","إبراهيم","الحجر","النحل","الإسراء","الكهف","مريم","طه","الأنبياء","الحج","المؤمنون","النور","الفرقان","الشعراء","النمل","القصص","العنكبوت","الروم","لقمان","السجدة","الأحزاب","سبأ","فاطر","يس","الصافات","ص","الزمر","غافر","فصلت","الشورى","الزخرف","الدخان","الجاثية","الأحقاف","محمد","الفتح","الحجرات","ق","الذاريات","الطور","النجم","القمر","الرحمن","الواقعة","الحديد","المجادلة","الحشر","الممتحنة","الصف","الجمعة","المنافقون","التغابن","الطلاق","التحريم","المُلك","القلم","الحاقة","المعارج","نوح","الجن","المزمل","المدثر","القيامة","الإنسان","المرسلات","النبأ","النازعات","عبس","التكوير","الانفطار","المطففين","الانشقاق","البروج","الطارق","الأعلى","الغاشية","الفجر","البلد","الشمس","الليل","الضحى","الشرح","التين","العلق","القدر","البينة","الزلزلة","العاديات","القارعة","التكاثر","العصر","الهمزة","الفيل","قريش","الماعون","الكوثر","الكافرون","النصر","المسد","الإخلاص","الفلق","الناس"]
  let linksnames = ['alfatiha','albaqarah','aal imran','al nessa\'','alma\'eda','al anaam','al aaraf','al anfal','al tawba','younous','hod','yousouf','al raad','ibrahem','al hijr','al nahl','al israa\'','al kahf','maream','taha','al anbiaa\'','al haj','al momenon','al nor','al forqan','al shoaraa\'','al naml','al qss','al ankbot','al rom','loqman','al sajda','al ahzab','saba\'','fater','yasen','al saffat','sad','al zmar','ghafer','fosselat','al shoraa','al zokhrof','al dokhan','al gathya','al ahqaf','mohamed','al fath','al hojorat','qaf','al zaryat','al tor','al najm','al qamar','al rahman','al waqeeah','al hadid','al mojadalah','al hashr','al momtahena','al saff','al gomaa','al monafeqon','al taghabon','al talaq','al tahrim','al molk','al qalam','al haaqa','al maareg','noh','al jen','al mozzamel','al moddather','al qyama','al insan','al morsalat','al nabaa\'','al nazeaat','aabas','al takwir','al infetar','al motaffefen','al insheqaq','al brog','al tareq','al aala','al ghashya','al fagr','al balad','al shams','al lael','al doha','al sharh','al ten','al aalaq','al qadr','al baeenah','al zalzala','al aadyat','al qareaa','al takathor','al asr','al homaza','al fel','qoraysh','al maoon','al kawthar','al kaferon','al nasr','al masad','al ikhlas','al falaq','al nas']
  for(let i=0;i<114;i++){
    let suracheck;
    if(localStorage.getItem(`${linksnames[i]}`) !== null){
      suracheck = localStorage.getItem(`${linksnames[i]}`);
    }else{
      suracheck = false;
    }
    surascont.innerHTML += `
    <div class="sura">
          <p>سورة ${suras[i]}</p>
          <div class="btns">
            <a href="suras/${linksnames[i]}.html"><button>قراءة السورة</button></a>
            <div><button id="check-save" data-check="${suracheck}" data-sura="${linksnames[i]}">${suracheck?"✔️":""}</button></div>
          </div>
        </div>
    `
  }
}
window.addEventListener("click",function(e){
  if(e.target.id == "check-save"){
    let prevprecent = Number(localStorage.getItem("percent"))
    if(e.target.getAttribute("data-check") == "true"){
      console.log(11)
      e.target.innerHTML = ""
      e.target.setAttribute("data-check","false")
      localStorage.setItem(`${e.target.getAttribute("data-sura")}`,"false")
      localStorage.setItem("percent",Number(prevprecent - 100 / 114).toFixed(2))
      UpdateRate(Number(prevprecent - 100/114).toFixed(2))
    }else{
      e.target.innerHTML = "✔️"
      e.target.setAttribute("data-check","true")
      localStorage.setItem(`${e.target.getAttribute("data-sura")}`,"true")
      localStorage.setItem("percent",Number(prevprecent + 100 / 114).toFixed(2))
      UpdateRate(Number(prevprecent + 100/114).toFixed(2))
    }
  }
})