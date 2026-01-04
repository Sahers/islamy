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
// add quran content for any sura
let numa = document.getElementById('num-aya')
let ranks = document.getElementById('rank')
let name = document.querySelector(".title .container h2")
let typ = document.getElementById('type')
let sura = document.getElementById('su')
let ayatt = document.getElementById('ayas')
let eles = []
let tafsir = []
let numay;
let selectqaree= document.getElementById("qaree")
let numsurah;
let surahname;
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
  let tafs = `https://quranenc.com/api/v1/translation/sura/arabic_moyassar/${num}`
  // add quran with many sheikhs
  let file = `surahaudio/surah_${num}.json`
  fetch(file).then((r)=>r.json()).then((r)=>{
    let sheikhs = Object.keys(r)
    for(let i = 0;i<sheikhs.length;i++){
      for(let j = 0;j<r[`${sheikhs[i]}`]["riwayat"].length;j++){
        let numero;
        if(num < 10){
          numero = `00${num}`
        }else if(num < 100){
          numero = `0${num}`
        }else{
          numero = num
        }
        let rewaaya = r[sheikhs[i]]["riwayat"][j]["riwaya"]
        let audiourl = `${r[sheikhs[i]]["riwayat"][j]["server"]}${numero}.mp3`
        selectqaree.innerHTML += `<option value="${r[sheikhs[i]]["id"]}" data-url="${audiourl}">${sheikhs[i]} (${rewaaya})</option>`
      }
    } 
  })
  // add sura ayats
  await fetch(url)
    .then(response => response.json())
    .then(function(data) {
      //console.log(data.data)
      let nam = data.data.name
      name.innerHTML = nam
      surahname = nam
      let rank = data.data.number
      //console.log(rank)
      ranks.innerHTML = rank
      let type = data.data.revelationType
      //console.log(type)
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
        let word = "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ "
        let w2 = "بِّسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ "
        let ok = true
        if (i == 0 && num != 1) {
          for (let i = 0; i < word.length; i++) {
            if (word[i] != aya[i]) {
              ok = false
              break;
            }
          }
          if(aya[1] == 'ّ'){
            ok = true
          }
       if (ok == true) {
            aya = aya.slice(40)
         }
        }
       // console.log(aya, word.length)
        eles.push(aya)
      }
    })
    .catch(error => {
      //console.log(error)
      su.innerHTML = '<div class="center-image"><img loading="lazy" src="../icons/error.png" class="imagee error-hadith"></div>هناك خلل في الصفحة <br>أعد تحميل الصفحة<br> أو بلغنا'
      su.style.textAlign = 'center'
      su.style.backgroundColor = 'var(--third-color)'
      su.style.padding = '40px'
    });
    // add tafsir for any aya in sura
  await fetch(tafs)
    .then(res => res.json())
    .then(function(data) {
      //  console.log(data)
      for (let i = 0; i < numay; i++) {
        let ay = data.result[i]["translation"]
        tafsir.push(ay)
      }
      ayatt.innerHTML = ''
      //  console.log(tafsir)
      for (let i = 0; i < numay; i++) {
        // console.log(eles[i])
        ayatt.innerHTML += `
        <div class="ayaa">
        <div class="ayacont">
                <div class="aya-text" data-aya="${i+1}">${eles[i]} (${i + 1})</div>
                <div class="tools-flex" id="qurantext">
                <button class="share"><img loading="lazy" src="../icons/share.png" alt="مشاركة" class="sharee"></button>
                <button class="paste"><img loading="lazy" src="../icons/paste.png" alt="لصق" class="pastee"></button>
                </div>
                </div>
                <hr>
        <div class="tafsircont">
                <div class="tafsir-text">
                  <p>التفسير</p>
              </div>
                <hr>
                <div class="tafsir">${tafsir[i]}</div>
                <div class="tools-flex" id="tafsirtext">
                <button class="share"><img loading="lazy" src="../icons/share.png" alt="مشاركة" class="sharee"></button>
                <button class="paste"><img loading="lazy" src="../icons/paste.png" alt="لصق" class="pastee"></button>
                </div>
                </div>
              </div>`
      }
    })
    .catch(function(error) {
      //console.log(error)
      su.innerHTML = '<div class="center-image"><img loading="lazy" src="../icons/error.png" class="imagee error-hadith"></div>هناك خلل في الصفحة <br>اعد تحميل الصفحة<br> أو بلغنا'
      su.style.textAlign = 'center'
      su.style.backgroundColor = 'var(--third-color)'
      su.style.padding = '40px'
      
    })
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
// add pasting and sharing for any aya or it tafsir
let element;
let type = 0;
window.addEventListener("click",(e)=>{
  if(e.target.classList.contains("paste") || e.target.classList.contains("share")){
  let ele = e.target.parentElement.previousElementSibling
    if(e.target.classList.contains("paste")){
      navigator.clipboard.writeText(ele.innerText)
      if(type != 0){
        if(type == 1){
          element.src = "../icons/paste.png"
        }else if(type == 2){
          element.src = "../icons/share.png"
        }
      }
        e.target.children[0].src = "../icons/check-mark.png"
        type = 1;
        element = e.target.children[0]
    }else if(e.target.classList.contains("share")){
     let textplacecont = document.querySelector(".pop-up-share")
     let textplace = document.querySelector(".content-shared")
     let exitbtn = document.querySelector(".exit-pop-up")
     let btns = document.querySelectorAll(".sites button")
     textplacecont.style.display = "flex"
     let sharetxt;
     let eleid = e.target.parentElement.id
     if(eleid == "tafsirtext"){
      let ayatxt = e.target.parentElement.parentElement.parentElement.children[0].children[0]
      let ayatxtcontent = ayatxt.innerHTML
      let tafsirtxt = e.target.parentElement.parentElement.innerText
      sharetxt = `${ayatxtcontent} \n${tafsirtxt}\n${surahname}`
     }
     else if(eleid == "qurantext"){
      sharetxt = `${ele.innerText} \n(${surahname})`
    }
    textplace.innerText = sharetxt
    // sharing
    const pageUrl = "https://sahers.github.io/islamy";
    // 1-facebook sharing
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
    // exit button
     exitbtn.onclick = function(){
      textplacecont.style.display = "none"
     }
     if(type != 0){
        if(type == 1){
          element.src = "../icons/paste.png"
        }else if(type == 2){
          element.src = "../icons/share.png"
        }
      }
      e.target.children[0].src = "../icons/check-mark.png"
        type = 2;
        element = e.target.children[0]
    }
  }else if(e.target.classList.contains("pastee") || e.target.classList.contains("sharee")){
      let ele = e.target.parentElement.parentElement.previousElementSibling
      if(e.target.classList.contains("pastee")){
      navigator.clipboard.writeText(ele.innerText)
      if(type != 0){
        if(type == 1){
          element.src = "../icons/paste.png"
        }else if(type == 2){
          element.src = "../icons/share.png"
        }
      }
      e.target.src = "../icons/check-mark.png"
        type = 1;
        element = e.target
      }else if(e.target.classList.contains("sharee")){
     let textplacecont = document.querySelector(".pop-up-share")
     let textplace = document.querySelector(".content-shared")
     let exitbtn = document.querySelector(".exit-pop-up")
     let btns = document.querySelectorAll(".sites button")
     textplacecont.style.display = "flex"
     let sharetxt;
     let eleid = e.target.parentElement.parentElement.id
     if(eleid == "tafsirtext"){
      let ayatxt = e.target.parentElement.parentElement.parentElement.parentElement.children[0].children[0]
      let ayatxtcontent = ayatxt.innerHTML
      let tafsirtxt = e.target.parentElement.parentElement.parentElement.innerText
      sharetxt = `${ayatxtcontent} \n${tafsirtxt}\n${surahname}`
     }
     else if(eleid == "qurantext"){
      sharetxt = `${ele.innerText} \n(${surahname})`
    }
    textplace.innerText = sharetxt
    // sharing
    const pageUrl = "https://sahers.github.io/islamy";
    // 1-facebook sharing
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
    // exit button
     exitbtn.onclick = function(){
      textplacecont.style.display = "none"
     }
     if(type != 0){
        if(type == 1){
          element.src = "../icons/paste.png"
        }else if(type == 2){
          element.src = "../icons/share.png"
        }
      }
      e.target.src = "../icons/check-mark.png"
        type = 2;
        element = e.target
    }
  }else{
    if(type != 0){
        if(type == 1){
          element.src = "../icons/paste.png"
        }else if(type == 2){
          element.src = "../icons/share.png"
        }
      }
      type = 0;
  }
})
// play the sura with any sheikh handling
let audioopener = document.querySelector("audio")
let audioopen = false
selectqaree.addEventListener("change",async(e)=>{
  if(selectqaree.value != "--"){
    if(!audioopen){
      audioopener.style.animation = "openaudio 1s ease-out" 
      audioopener.style.display = "inline-block"
      audioopen = true
      }
    audioopener.src = selectqaree.options[selectqaree.selectedIndex].getAttribute("data-url")
  }else{
    if(audioopen){
      audioopener.style.animation = "" 
      audioopener.style.display = "none"
      audioopen = false
      audioopener.src = ""
    }
  }
})