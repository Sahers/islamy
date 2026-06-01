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
let pa = document.querySelector('.loading p')
pa.innerText = 'طيِّب وقت فراغك بذكر الله'
// copyright year
let daten = document.getElementById('date')
let datee = new Date();
daten.innerText = datee.getFullYear()
// add links in menu
let logo = document.querySelector('header .container .logo img')
logo.src = '../logo.png'
let links = document.querySelectorAll("ul a")
let lin = ['../index.html','../quran.html','../hadith.html',"../azkar.html","../timeprayer.html","../doaa.html","../question.html","../about.html"]
for(let i = 0;i < links.length;i++){
  links[i].href = lin[i]
}
// loading animation
window.addEventListener('load', function(e) {
  setTimeout(()=>{
    document.getElementsByClassName('content')[0].style.display = 'block'
    document.getElementsByClassName('content')[0].style.animation = "openpage 1.5s ease-in-out"
    document.getElementsByClassName('content')[0].style.opacity = 1
    document.getElementsByClassName('loading')[0].style.display = 'none'
  },1000)
})
// add quran content for any sura
let numa = document.getElementById('num-aya')
let ranks = document.getElementById('rank')
let name = document.querySelector(".title .container h2")
let typ = document.getElementById('type')
let sura = document.getElementById('su')
let ayatt = document.getElementById('ayas')
let ayats = [];
let pages = {};
// pages that we need for rendering
let pagesEles = [];
// control pages
let controlling = document.getElementsByClassName("controls")[0]
let arrows = controlling.children
let currentpage = 0;
// sound media
let readers = {};
let numay;
let sheikhs;
let numsurah;
let surahname;
let selectplace;
async function info(num) {
  // buttons after and before
  let arwsplace = document.getElementById("arrows")
  let nextsura,prevsura;
  let nextlink,prevlink
  let titles =["الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال","التوبة","يونس","هود","يوسف","الرعد","إبراهيم","الحجر","النحل","الإسراء","الكهف","مريم","طه","الأنبياء","الحج","المؤمنون","النور","الفرقان","الشعراء","النمل","القصص","العنكبوت","الروم","لقمان","السجدة","الأحزاب","سبأ","فاطر","يس","الصافات","ص","الزمر","غافر","فصلت","الشورى","الزخرف","الدخان","الجاثية","الأحقاف","محمد","الفتح","الحجرات","ق","الذاريات","الطور","النجم","القمر","الرحمن","الواقعة","الحديد","المجادلة","الحشر","الممتحنة","الصف","الجمعة","المنافقون","التغابن","الطلاق","التحريم","المُلك","القلم","الحاقة","المعارج","نوح","الجن","المزمل","المدثر","القيامة","الإنسان","المرسلات","النبأ","النازعات","عبس","التكوير","الانفطار","المطففين","الانشقاق","البروج","الطارق","الأعلى","الغاشية","الفجر","البلد","الشمس","الليل","الضحى","الشرح","التين","العلق","القدر","البينة","الزلزلة","العاديات","القارعة","التكاثر","العصر","الهمزة","الفيل","قريش","الماعون","الكوثر","الكافرون","النصر","المسد","الإخلاص","الفلق","الناس"]
  let links = ['alfatiha','albaqarah','aal imran','al nessa\'','alma\'eda','al anaam','al aaraf','al anfal','al tawba','younous','hod','yousouf','al raad','ibrahem','al hijr','al nahl','al israa\'','al kahf','maream','taha','al anbiaa\'','al haj','al momenon','al nor','al forqan','al shoaraa\'','al naml','al qss','al ankbot','al rom','loqman','al sajda','al ahzab','saba\'','fater','yasen','al saffat','sad','al zmar','ghafer','fosselat','al shoraa','al zokhrof','al dokhan','al gathya','al ahqaf','mohamed','al fath','al hojorat','qaf','al zaryat','al tor','al najm','al qamar','al rahman','al waqeeah','al hadid','al mojadalah','al hashr','al momtahena','al saff','al gomaa','al monafeqon','al taghabon','al talaq','al tahrim','al molk','al qalam','al haaqa','al maareg','noh','al jen','al mozzamel','al moddather','al qyama','al insan','al morsalat','al nabaa\'','al nazeaat','aabas','al takwir','al infetar','al motaffefen','al insheqaq','al brog','al tareq','al aala','al ghashya','al fagr','al balad','al shams','al lael','al doha','al sharh','al ten','al aalaq','al qadr','al baeenah','al zalzala','al aadyat','al qareaa','al takathor','al asr','al homaza','al fel','qoraysh','al maoon','al kawthar','al kaferon','al nasr','al masad','al ikhlas','al falaq','al nas']
  if(num == 1){
    prevsura = "الناس"
    prevlink = "al nas"
    nextsura = "البقرة"
    nextlink = "albaqarah"
  }else if(num == 114){
    prevsura = "الفلق"
    prevlink = "al falaq"
    nextsura = "الفاتحة"
    nextlink = "alfatiha"
  }else{
    prevsura = titles[num - 2]
    prevlink = links[num - 2]
    nextsura = titles[num]
    nextlink = links[num]
  }
 arwsplace.innerHTML += `
 <a href="${prevlink}.html" id="prev">
  <button>
    <div>قراءة السورة السابقة</div>
    <div>سورة ${prevsura}</div>
  </button>
</a>
<a href="${nextlink}.html" id="next">
  <button>
    <div>قراءة السورة التالية</div>
    <div>سورة ${nextsura}</div>
  </button>
</a>
  `
  // add sura data
  numsurah = num 
  let url = `https://api.alquran.cloud/v1/surah/${num}`
  // add quran with many sheikhs
  let file = `surahaudio/surah_${num}.json`
  let ayatfile = `suraayat/surah_${num >= 10?(num>100?num:"0"+num):"00"+num}.json`
  console.log(num,ayatfile)
  await fetch(file).then((r)=>r.json()).then((r)=>{
     sheikhs = r
  })
  await fetch(ayatfile).then((r)=>r.json()).then((r)=>{
    let sheikhss = Object.keys(r)
    sheikhss.shift();
    sheikhss.shift();
    sheikhss.pop();
    for(let i=0;i<sheikhss.length;i++){
      readers[sheikhss[i]] = {"id":r[sheikhss[i]]["reader_id"],"name":sheikhss[i],"ayat-times":r[sheikhss[i]]["ayat"],"link":(r[sheikhss[i]]["folder_url"]+`${num >= 10?num>100?num:"0"+num:"00"+num}.mp3`)}
    }
  }).catch(()=>{
      su.innerHTML = '<div class="center-image"><img loading="lazy" src="../icons/error.png" class="imagee error-hadith"></div>هناك خلل في الصفحة <br>أعد تحميل الصفحة<br> أو بلغنا'
      su.style.textAlign = 'center'
      su.style.backgroundColor = 'var(--third-color)'
      su.style.padding = '40px'
  })
  // add sura ayats
  await fetch(url)
    .then(response => response.json())
    .then(function(data) {
      let nam = data.data.name
      name.innerHTML = nam
      surahname = nam
      let rank = data.data.number
      ranks.innerHTML = rank
      let type = data.data.revelationType
      if (type == 'Meccan') { type = 'مَكِّيَة' }
      if (type == 'Medinan') { type = 'مَدَنِيَّة' }
      typ.innerHTML = type
      let numayas = data.data.numberOfAyahs
      numay = numayas
      let word = 'آيات'
      if (numayas > 10) { word = 'آية' }
      numa.innerHTML = numayas + " " + word
      for (let i = 0; i < numayas; i++) {
        let aya = data.data.ayahs[i].text
        let pag = data.data.ayahs[i].page
        let ayanumm = i + 1;
        let word = "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ "
        let w2 = "بِّسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ "
        let bsmala = true
        if (i == 0 && num != 1) {
          for (let i = 0; i < word.length; i++) {
            if (word[i] != aya[i]) {
              bsmala = false
              break;
            }
          }
          if(aya[1] == 'ّ'){
            bsmala = true
          }
       if (bsmala == true) {
            aya = aya.slice(40)
            ayats.push({"aya":w2,"page":pag,"ayanum":"non"})
         }else{
         }
        }
        //eles.push(aya)
        ayats.push({"aya":aya,"page":pag,"ayanum":ayanumm})
      }
    })
    .catch(error => {
      su.innerHTML = '<div class="center-image"><img loading="lazy" src="../icons/error.png" class="imagee error-hadith"></div>هناك خلل في الصفحة <br>أعد تحميل الصفحة<br> أو بلغنا'
      su.style.textAlign = 'center'
      su.style.backgroundColor = 'var(--third-color)'
      su.style.padding = '40px'
    });
    // add tafsir for any aya in sura
    let prevpage;
      pages[ayats[0]["page"]] = []
      // tajheez pages
      for (let i = 0; i < ayats.length; i++){
        let startpage = ayats[i]["page"]
        if(i > 1){
          if(startpage != prevpage){
            pages[startpage] = []
          }
        }
        pages[startpage].push({"ayaa":ayats[`${i}`]["aya"],"tafser":ayats[i]["tafsir"],"ayanum":ayats[i]["ayanum"]})
          prevpage = startpage
      }
      let pagenumbers = Object.keys(pages)
      for(let i = 0;i<pagenumbers.length;i++){
        let ele = "";
        for(let j = 0;j < pages[pagenumbers[i]].length;j++){
          if(pagenumbers[i] == 1 && j == 0){
            ele += `<span class="aya-container"><span class="aya-text center" style="display:block !important;" data-num="${pages[pagenumbers[i]][j]["ayanum"]}">${pages[pagenumbers[i]][j]["ayaa"]}(${pages[pagenumbers[i]][j]["ayanum"]})</span></span>`
          }else if(pages[pagenumbers[i]][j]["ayanum"] == "non"){
            ele += `<div class="bsm center">بِسْمِ ٱللّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>`
          }else{
          ele += `<span class="aya-container"><span class="aya-text" data-num="${pages[pagenumbers[i]][j]["ayanum"]}">${pages[pagenumbers[i]][j]["ayaa"]}</span><span class="aya-num">(${pages[pagenumbers[i]][j]["ayanum"]})</span></span>`
          }
        }
        ele += `<div class="page-num center">${pagenumbers[i]}</div>`
        pagesEles.push(ele)
      }
      if(pagesEles.length < 2){
      arrows[0].style.display = "none"
      arrows[1].style.display = "none"
       }
      ayatt.innerHTML = pagesEles[currentpage]
    let pgsoundplayer = document.querySelector(".control audio")
    arrows[0].addEventListener("click",(e)=>{
    ayatt.innerHTML = pagesEles[--currentpage]
    if(currentpage == 0){
      arrows[0].style.visibility = "hidden"
    }else{
      arrows[0].style.visibility = "visible"
    }
    if(currentpage == pagesEles.length - 1){
      arrows[1].style.visibility = "visible"
    }
    arrows[1].style.visibility = "visible"
    pgsoundplayer.play()
  })
arrows[1].addEventListener("click",(e)=>{
    ayatt.innerHTML = pagesEles[++currentpage]
    if(currentpage == pagesEles.length - 1){
      arrows[1].style.visibility = "hidden"
    }else{
      arrows[1].style.visibility = "visible"
    }
    if(currentpage == 1){
      arrows[0].style.visibility = "visible"
    }
    arrows[0].style.visibility = "visible"
    pgsoundplayer.play()
  })
    let r = sheikhs
    let sheiokh = Object.keys(r)
    let numS = numsurah
    for(let i = 0;i<sheiokh.length;i++){
      for(let j = 0;j<r[`${sheiokh[i]}`]["riwayat"].length;j++){
        let numero;
        if(numS< 10){
          numero = `00${numS}`
        }else if(numS < 100){
          numero = `0${numS}`
        }else{
          numero = numS
        }
        let rewaaya = r[sheiokh[i]]["riwayat"][j]["riwaya"]
        let audiourl = `${r[sheiokh[i]]["riwayat"][j]["server"]}${numero}.mp3`
        selectplace += `<option value="${audiourl}">${sheiokh[i]} (${rewaaya})</option>`
      }
    }
}
// show aya properties
let ayapropertiescontainer = document.getElementsByClassName("details-container")[0]
let ayacontainer = document.getElementsByClassName("theaya")[0]
let actionplace = document.getElementsByClassName("detail")[0]
window.addEventListener("click",(e)=>{
  if(e.target.classList.contains("aya-container")){
    let aya = e.target.children[0]
    let ayanum = aya.getAttribute("data-num")
    let ayatext = aya.innerHTML
    ayapropertiescontainer.style.display = "block"
    if(ayatext == `بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ
(1)`){
      ayacontainer.innerHTML = ayatext
    }else{
    ayacontainer.innerHTML = `${ayatext} (${ayanum})`
    }
    ayacontainer.setAttribute("data-num",ayanum)
    actionplace.style.display = "none"
  }else if(e.target.classList.contains("aya-text")){
    let aya = e.target
    let ayanum = aya.getAttribute("data-num")
    let ayatext = aya.innerHTML
    ayapropertiescontainer.style.display = "block"
    if(ayatext == `بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ
(1)`){
      ayacontainer.innerHTML = ayatext
    }else{
    ayacontainer.innerHTML = `${ayatext} (${ayanum})`
    }
    ayacontainer.setAttribute("data-num",ayanum)
    actionplace.style.display = "none"
  }
})
let audiosource = document.getElementById("audio-source")
let audioplayer = document.getElementById("audio-player")
let choicesaudio = document.getElementById("choicesaudio")
let repeatTimes = -1
let playPromise = null;
let readingsheikh;
let ayanumber;
let controller;
let repeated = false
async function GetTafsir(taftype,sura,ayanum){
  actionplace.innerHTML = `يرجى الانتظار..`
 let link = `https://dev.surahapp.com/api/v1/aya/${taftype}/${sura}/${ayanum}`
 return fetch(link).then((r)=>r.json()).then((r)=>{
  return (r!== null || r!== undefined)?r.content:"هناك مشكلة في التحميل";
 }).catch(()=>{
  return "هناك مشكلة في جلب التفسير"
 })
}
// typebtns: ch1 -> 0 ,ch2 -> 1,ch3 -> 2,ch4 -> 3
// types: 0-single aya 1-repeated aya 2-repeated ayas 3-start from it
window.addEventListener("click",async (e)=>{
  /* Tafsir showing */
  if(e.target.classList.contains("thetafsir")){
    ayanumber = ayacontainer.getAttribute("data-num")
    actionplace.classList.add("flex-select-and-btn")
    actionplace.innerHTML = `<p>اختر التفسير</p>
    <select dir="rtl" id="select-tafsir">
    <option selected="selected" id="tafsir-mokhtasar">التفسير المختصر</option>
    <option id="tafsir-saadi">تفسير السعدي</option>
    <option id="tafsir-katheer">تفسير ابن كثير</option>
    <option id="tafsir-baghawy">تفسير البغوي</option>
    <option id="tafsir-tabary">تفسير الطبري</option>
    <option id="eerab-word-aya">إعراب الآية</option>
    </select>
    <button class="thetafsir-open">اختر</button>
    `
    /* 
    actionplace.style.display = "block"
    actionplace.style.fontFamily = "tafsir" 
    actionplace.innerHTML = `<p>التفسير</p>
    <div dir="rtl">${ayacontainer.getAttribute("data-tafsir")}</div>
    `*/
  }
   if(e.target.classList.contains("thetafsir-open")){
    let selection= document.getElementById("select-tafsir")
    let choice = selection.options[selection.selectedIndex].getAttribute("id")
    let tafcontent = await GetTafsir(choice,numsurah,ayanumber)
    actionplace.innerHTML = tafcontent
    actionplace.classList.remove("flex-select-and-btn")
    actionplace.style.display = "block"
    actionplace.style.fontFamily = "tafsir"
   }
  /* quran audio */
  if(e.target.classList.contains("thesound")){
    // choose listening type (full-surah / part-of-surah)
    playPromise = null;
    ayanumber = ayacontainer.getAttribute("data-num")
    choicesaudio.style.display = "flex"
    choicesaudio.style.justifyContent = "space-around"
    choicesaudio.style.flexDirection = "row"
    choicesaudio.style.flexWrap = "wrap"
    choicesaudio.style.alignItems = "center"
    choicesaudio.style.gap = "10px"
    choicesaudio.innerHTML = `
    <div class="sura-part">قراءة جزء من السورة</div>
    <div class="sura-full">السورة كاملة</div>
    `
  }
  /* Full surah audio */
  if(e.target.classList.contains("sura-full")){
    // choose sheikh for full-surah
    choicesaudio.style.flexDirection = "column"
    choicesaudio.innerHTML = `
    <p class="center">اختر الشيخ الذي تحب أن تسمع له</p>
    <select id="qaree">
        <option disabled value="--">--</option>
      </select>
      <div class="ch-full">اختر</div>
    `
    let selectqaree= document.getElementById("qaree")
    selectqaree.innerHTML = selectplace
  }
  if(e.target.classList.contains("ch-full")){
    // Full-surah-playing
    let started = false;
    let selectt = document.getElementById("qaree")
    let link = selectt.options[selectt.selectedIndex].getAttribute("value")
    let readingsheikh = document.getElementById("qaree").options[selectt.selectedIndex].innerText
    audiosource.pause();
    audiosource.oncanplay = null;
    audiosource.onwaiting = null;
    audiosource.ontimeupdate = null;
    audiosource.src = ""
    choicesaudio.style.display = "none";
    audioplayer.style.display = "block";
    audioplayer.innerHTML = `
        <p class="center">الشيخ ${readingsheikh}</p>
        <div class="type-1">
             <p id="audio-status" style="font-size:15px; color:red;">جارٍ تهيئة الصوت...</p>
             <div class="div-flex">
                <div id="play">تشغيل</div>
                <div id="pause">إيقاف</div>
             </div>
        </div>`;
    audiosource.src = link;
    audiosource.load()
    // Changing ready status for audio
    const status = document.getElementById("audio-status");
    audiosource.oncanplay = () => {
      if(!started){
        audiosource.currentTime = 0;
        started=true;
      }
        if(status) status.innerText = "جاهز للاستماع";
        status.style.color = "black";
    };
    audiosource.onwaiting = () => {
        if(status) status.innerText = "جارٍ تهيئة الصوت...";
        status.style.color = "red";
    }
  }
  if(e.target.classList.contains("sura-part")){
    // Choose sheikh for part-sura listening
    choicesaudio.style.flexDirection = "column"
    choicesaudio.innerHTML = `
    <p class="center">اختر الشيخ الذي تحب أن تسمع له</p>
    `
    let sheikhs = Object.keys(readers)
    let a = "";
    for(let i=0;i<sheikhs.length;i++){
     a += `<option value="${readers[sheikhs[i]]["name"]}">${readers[sheikhs[i]]["name"]}</option>`
    }
    choicesaudio.innerHTML += `
    <select id="select-reader">
    <option disabled value="--">--</option>
    ${a}
    </select>
    <div id="error">من فضلك اختر شيخًا</div>
    <div class="thesound-open">تأكيد</div>
    `
  }
  if(e.target.classList.contains("thesound-open")){
    // Choose part-surah type for listening
    if(document.getElementById("select-reader").value == "--"){
      document.getElementById("error").style.display = "block"
    }else{
      document.getElementById("error").style.display = "none"
      audiosource.ontimeupdate = null
      audiosource.onloadedmetadata = null
    readingsheikh = document.getElementById("select-reader").value
    choicesaudio.style.display = "block"
    choicesaudio.innerHTML = `
        <p class="center">اختر طريقة السماع التي تريدها</p>
        <div class="div-flex">
        <div class="ch1">سماع الآية لوحدها</div>
        <div class="ch2">تكرار الآية</div>
        <div class="ch3">تكرار من آية لآية معينة</div>
        <div class="ch4">البدء منها</div>
        </div>`
  }
  }
  // Part-surah sound choices
  if(e.target.classList.contains("ch1")){
    // single aya listening
    let timestart = readers[readingsheikh]["ayat-times"][ayanumber]["start_time"] / 1000
    let timeend = readers[readingsheikh]["ayat-times"][ayanumber]["end_time"] / 1000
    audiosource.src = `${readers[readingsheikh]["link"]}`
    audiosource.onloadedmetadata = ()=>{
      audiosource.currentTime = timestart
    }
    audiosource.ontimeupdate = ()=>{
      if(audiosource.currentTime >= timeend){
        if(playPromise){
        playPromise.then(()=>{
            audiosource.pause()
          })
        }
    audiosource.currentTime = timestart
        }
    }
    audioplayer.innerHTML = `
    <p class="center">الشيخ ${readingsheikh}</p>
    <p id="audio-status" style="font-size:15px; color:red;">جارٍ تهيئة الصوت...</p>
    <div class="type-0">
          <div id="play">تشغيل</div>
          <div id="pause">إيقاف</div>
    </div>`
    choicesaudio.style.display = "none"
    readystatus();
  }
  if(e.target.classList.contains("ch2")){
    // Choosing repeating times for aya
    choicesaudio.innerHTML = `
    <p class="center">اختر عدد مرات تكرار الآية</p>
    <div class="div-flex" style="flex-direction:column;align-items:center;">
    <input id="repeat-times" type="number" inputmode="numeric">
    <div id="error-repeat">من فضلك اختر رقمًا بين 1 و 20</div>
    <div class="repeat-aya">اضغط</div>
    </div>
    `
  }
   if(e.target.classList.contains("repeat-aya")){
    // Input checking for single-aya repeating
  audiosource.pause();
  audiosource.ontimeupdate = null;
  audiosource.onloadedmetadata = null;
    repeatTimes = Number(document.getElementById("repeat-times").value)
    if(isNaN(Number(document.getElementById("repeat-times").value))){
        document.getElementById("error-repeat").style.display = "block"
      document.getElementById("error-repeat").innerHTML = `من فضلك اكتب رقمًا`
    }else if(Number(document.getElementById("repeat-times").value) < 1 || Number(document.getElementById("repeat-times").value) > 20){
      document.getElementById("error-repeat").style.display = "block"
      document.getElementById("error-repeat").innerHTML = `من فضلك اختر رقمًا بين 1 و 20`
    }else{
      // single-aya repeating listening
    document.getElementById("error-repeat").style.display = "none"
    let timestart = readers[readingsheikh]["ayat-times"][ayanumber]["start_time"] / 1000
    let timeend = readers[readingsheikh]["ayat-times"][ayanumber]["end_time"] / 1000
    audiosource.src = `${readers[readingsheikh]["link"]}`
    audiosource.onloadedmetadata = ()=>{
      audiosource.currentTime = timestart
    }
    audiosource.ontimeupdate = () => {
  if (audiosource.currentTime >= timeend && !repeated) {
    repeated = true
    repeatTimes--
    document.querySelector(".repeat-num").textContent =
      repeatTimes > 0 ? repeatTimes : 0
    if (repeatTimes > 0) {
      audiosource.currentTime = timestart
      audiosource.play()
    } else {
      audiosource.pause()
    }
  }
  if (audiosource.currentTime < timeend) {
    repeated = false
  }
}
    audioplayer.innerHTML = `
    <p class="center">الشيخ ${readingsheikh}</p>
    <div class="type-1">
          <div class="repeat-times">
            عدد مرات التكرار المتبقية:
            <span class="repeat-num">${repeatTimes>0?repeatTimes:0}</span>
          </div>
          <p id="audio-status" style="font-size:15px; color:red;">جارٍ تهيئة الصوت...</p>
          <div class="div-flex">
          <div id="play">تشغيل</div>
          <div id="pause">إيقاف</div>
          </div>
        </div>`
    choicesaudio.style.display = "none"
    readystatus();
    }
   }
   if(e.target.classList.contains("ch3")){
    // Choosing repeating times for ayats
    choicesaudio.innerHTML = `
    <div class="div-flex" style="flex-direction:column;align-items:center;">
    <p class="center">اكتب رقم الآية التي تود أن تقف عندها</p>
    <div class="limit-repeat">
      الآية <input type="number" input-mode="numeric" id="endaya">
    </div>
    <div id="error-repeat-ayats"></div>
    <p class="center">اختر عدد مرات تكرار الآيات</p>
    <input id="repeat-times" type="number" inputmode="numeric">
    <div id="error-repeat">من فضلك اختر رقمًا بين 1 و 20</div>
    <div class="repeat-ayats">اضغط</div>
    </div>
    `
  }
  if(e.target.classList.contains("repeat-ayats")){
    // Input checking for ayats repeating
    let ok1 = true,ok2=true
    let ayanumber = document.getElementsByClassName("theaya")[0].getAttribute("data-num")
  audiosource.pause();
  audiosource.ontimeupdate = null;
  audiosource.onloadedmetadata = null;
    repeatTimes = Number(document.getElementById("repeat-times").value)
    if(isNaN(Number(document.getElementById("repeat-times").value))){
      document.getElementById("error-repeat").style.display = "block"
      document.getElementById("error-repeat").innerHTML = `من فضلك اكتب رقمًا`
      ok1=false;
    }else if(Number(document.getElementById("repeat-times").value) < 1 || Number(document.getElementById("repeat-times").value) > 20){
      document.getElementById("error-repeat").style.display = "block"
      document.getElementById("error-repeat").innerHTML = `من فضلك اختر رقمًا بين 1 و 20`
      ok1=false;
    }else{
      document.getElementById("error-repeat").style.display = "none"
      ok1=true;
    }
     if(isNaN(Number(document.getElementById("endaya").value))){
        document.getElementById("error-repeat-ayats").style.display = "block"
        document.getElementById("error-repeat-ayats").innerHTML = `من فضلك أدخل رقمًا`
        ok2=false;
      }else if(Number(document.getElementById("endaya").value) <= ayanumber || Number(document.getElementById("endaya").value) > numay){
        document.getElementById("error-repeat-ayats").style.display = "block"
        document.getElementById("error-repeat-ayats").innerHTML = `من فضلك أدخل رقم آية يكون بعد الآية التي تريدها`
        ok2=false;
      }else{
        document.getElementById("error-repeat-ayats").style.display = "none"
        ok2=true
      }
      if(ok1&&ok2){
        // Aya repeating audio listening
    let timestart = readers[readingsheikh]["ayat-times"][ayanumber]["start_time"] / 1000
    let timeend = readers[readingsheikh]["ayat-times"][Number(document.getElementById("endaya").value)]["end_time"] / 1000
    audiosource.src = `${readers[readingsheikh]["link"]}`
    audiosource.onloadedmetadata = ()=>{
      audiosource.currentTime = timestart
    }
    audiosource.ontimeupdate = ()=>{
      if(audiosource.currentTime >= timeend){
        repeatTimes--;
      document.querySelector(".repeat-num").textContent =
      repeatTimes > 0 ? repeatTimes : 0;
        if(repeatTimes > 0){
          audiosource.currentTime = timestart
          audiosource.play()
        }else{
          if(playPromise){
            playPromise.then(()=>{
              audiosource.pause()
            })
          }
        audiosource.currentTime = timestart
    }
        }
    }
    audioplayer.innerHTML = `
    <p class="center">الشيخ ${readingsheikh}</p>
    <div class="type-1">
          <div class="repeat-times">
            عدد مرات التكرار المتبقية:
            <span class="repeat-num">${repeatTimes>0?repeatTimes:0}</span>
          </div>
           <p id="audio-status" style="font-size:15px; color:red;">جارٍ تهيئة الصوت...</p>
          <div class="div-flex">
          <div id="play">تشغيل</div>
          <div id="pause">إيقاف</div>
          </div>
        </div>`
    choicesaudio.style.display = "none"
    readystatus();
      }
  }
  if(e.target.classList.contains("ch4")){
    // Remaining of sura listening
  audiosource.pause();
  audiosource.oncanplay = null;
  audiosource.onloadeddata = null;
  audiosource.ontimeupdate = null;
  audiosource.onloadedmetadata = null;
  let timestart = readers[readingsheikh]["ayat-times"][ayanumber]["start_time"] / 1000
  let timeend = readers[readingsheikh]["ayat-times"][numay]["end_time"] / 1000
    audiosource.src = `${readers[readingsheikh]["link"]}`
    audiosource.onloadedmetadata = ()=>{
      audiosource.currentTime = timestart
    }
    audiosource.ontimeupdate = ()=>{
      if(audiosource.currentTime >= timeend){
        audiosource.currentTime = timestart
        }
    }
    audioplayer.innerHTML = `
    <p class="center">الشيخ ${readingsheikh}</p>
    <div class="type-1">
     <p id="audio-status" style="font-size:15px; color:red;">جارٍ تهيئة الصوت...</p>
          <div class="div-flex">
          <div id="play">تشغيل</div>
          <div id="pause">إيقاف</div>
          </div>
        </div>`
    choicesaudio.style.display = "none"
    readystatus();
  }
 if(e.target.id =="play"){
      playPromise = audiosource.play()
  }
    if(e.target.id =="pause"){
        if(playPromise){
          playPromise.then(()=>{
            audiosource.pause()
          })
        }
    }
  function readystatus(){ // Showing audio's ready status
    let status = document.getElementById("audio-status")
    audiosource.oncanplay = () => {
        if(status) status.innerText = "جاهز للاستماع";
        status.style.color = "black";
    };
    audiosource.onwaiting = () => {
        if(status) status.innerText = "جارٍ تهيئة الصوت...";
        status.style.color = "red";
    }
  }
  // Choosing copy type
  if(e.target.classList.contains("thecopy")){
    actionplace.style.display = "block"
    actionplace.style.fontFamily = "islam !important"
    actionplace.innerHTML = `
    <div class="copy-container">
    <div class="aya-copy">نسخ الآية</div>
    <div class="aya-tafsir-copy">نسخ الآية والتفسير</div>
    </div>
    `
  }
  function triggerPopup(text) {
    if (window.activePopupTimeout) {
        clearTimeout(window.activePopupTimeout);
    }

    actionplace.style.display = "block";
    actionplace.innerHTML = `<div class="pop-up-message">${text}</div>`;
    const popupElement = actionplace.querySelector(".pop-up-message");
    if (popupElement) {
        popupElement.style.display = "block";
    }
    window.activePopupTimeout = setTimeout(() => {
        actionplace.innerHTML = "";
        actionplace.style.display = "none";
    }, 2000);
}
  if(e.target.classList.contains("aya-copy")){
    let ayatxt = ayacontainer.innerHTML
   navigator.clipboard.writeText(`${ayatxt} \n(${surahname})`);
   triggerPopup("تم نسخ الآية")
  }
  if(e.target.classList.contains("aya-tafsir-copy")){
    ayanumber = ayacontainer.getAttribute("data-num")
    actionplace.classList.add("flex-select-and-btn")
    actionplace.innerHTML = `<p>اختر التفسير</p>
    <select dir="rtl" id="select-tafsir">
    <option selected="selected" id="tafsir-mokhtasar">التفسير المختصر</option>
    <option id="tafsir-saadi">تفسير السعدي</option>
    <option id="tafsir-katheer">تفسير ابن كثير</option>
    <option id="tafsir-baghawy">تفسير البغوي</option>
    <option id="tafsir-tabary">تفسير الطبري</option>
    <option id="eerab-word-aya">إعراب الآية</option>
    </select>
    <button class="aya-tafsir-copy2">اختر</button>
    `
  }
  if(e.target.classList.contains("aya-tafsir-copy2")){
    let selection= document.getElementById("select-tafsir")
    let choice = selection.options[selection.selectedIndex].getAttribute("id")
    actionplace.classList.remove("flex-select-and-btn")
    actionplace.innerHTML = `<div class="pop-up-message" style="display: block;" dir="rtl">جارٍ جلب التفسير والنسخ...</div>`;
    let tafsirtxt = await GetTafsir(choice,numsurah,ayanumber)
    let ayatxt = ayacontainer.innerHTML
    navigator.clipboard.writeText(`${ayatxt} \n${tafsirtxt} \n(${surahname})`);
        triggerPopup("تمت عملية النسخ")
  }
  // Sharing
  if(e.target.classList.contains("theshare")){
    actionplace.style.display = "block"
    actionplace.style.fontFamily = "islam !important"
    actionplace.innerHTML = `
    <div class="copy-container">
    <div class="aya-share">مشاركة الآية</div>
    <div class="aya-tafsir-share">مشاركة الآية والتفسير</div>
    </div>
    `
  }
  if(e.target.classList.contains("aya-share")){
    let ayatxt = ayacontainer.innerHTML
    actionplace.innerHTML = `
    <p class="center">اختر المنصة التي تريد المشاركة عليها <br> ملاحظة:عند المشاركة عبر فيسبوك سوف يتم نسخ النص تلقائيًا ثم تلصقه في منشور فيسبوك الذي سيتم إنشاءه</p>
    <div class="sites">
          <button class="site face"></button>
          <button class="site whatsapp"></button>
          <button class="site x"></button>
          <button class="site telegram"></button>
      </div>`
    share(`${ayatxt} \n(${surahname})`)
  }
  if(e.target.classList.contains("aya-tafsir-share")){
    ayanumber = ayacontainer.getAttribute("data-num")
    actionplace.classList.add("flex-select-and-btn")
    actionplace.innerHTML = `<p>اختر التفسير</p>
    <select dir="rtl" id="select-tafsir">
    <option selected="selected" id="tafsir-mokhtasar">التفسير المختصر</option>
    <option id="tafsir-saadi">تفسير السعدي</option>
    <option id="tafsir-katheer">تفسير ابن كثير</option>
    <option id="tafsir-baghawy">تفسير البغوي</option>
    <option id="tafsir-tabary">تفسير الطبري</option>
    <option id="eerab-word-aya">إعراب الآية</option>
    </select>
    <button class="aya-tafsir-share2">اختر</button>
    `
  }
  if(e.target.classList.contains("aya-tafsir-share2")){
    let selection= document.getElementById("select-tafsir")
    let choice = selection.options[selection.selectedIndex].getAttribute("id")
    let tafsirtxt = await GetTafsir(choice,numsurah,ayanumber)
    let ayatxt = ayacontainer.innerHTML
    actionplace.innerHTML = `
    <p class="center">اختر المنصة التي تريد المشاركة عليها <br> ملاحظة:عند المشاركة عبر فيسبوك سوف يتم نسخ النص تلقائيًا ثم تلصقه في منشور فيسبوك الذي سيتم إنشاءه</p>
    <div class="sites">
          <button class="site face"></button>
          <button class="site whatsapp"></button>
          <button class="site x"></button>
          <button class="site telegram"></button>
    </div>`
    actionplace.classList.remove("flex-select-and-btn")
    actionplace.style.display = "block"
     share(`${ayatxt} \n${tafsirtxt} \n(${surahname})`)
    }
    function share(sharetxt){
      let btns = document.querySelectorAll(".sites button")
      const pageUrl = "https://sahers.github.io/islamy";
      btns[0].onclick = function(){
      const url = "https://www.facebook.com/sharer/sharer.php?u=" 
            + encodeURIComponent(pageUrl);
      navigator.clipboard.writeText(sharetxt)
      window.open(url, "_blank");
    }
    // 2- whatsapp sharing
    btns[1].onclick = function(){
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(sharetxt + " " + pageUrl)}`;
  window.open(shareUrl, "_blank");
    }
    // 3 - x sharing
    btns[2].onclick = function(){
      const shareUrl = "https://x.com/intent/post?text=" + encodeURIComponent(sharetxt);
      window.open(shareUrl, "_blank");
    }
    // 4 - telegram sharing
    btns[3].onclick = function(){
      const url = "https://t.me/share/url?url=" + encodeURIComponent(pageUrl) + "&text=" + encodeURIComponent(sharetxt);
      window.open(url, "_blank");
    }
    }
})