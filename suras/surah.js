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
let pa = document.querySelector('.loading p')
pa.innerText = 'طيِّب وقت فراغك بذكر الله'
let daten = document.getElementById('date')
let datee = new Date()
console.log()
daten.innerText = datee.getFullYear()
let logo = document.querySelector('header .container .logo img')
logo.src = '../logo.png'
let links = document.querySelectorAll("li a")
let lin = ['../index.html','../quran.html','../hadith.html',"../azkar.html","../timeprayer.html","../doaa.html","../question.html","../about.html"]
for(let i = 0;i < links.length;i++){
  links[i].href = lin[i]
}
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
async function info(num) {
  numsurah = num
  let dataaudio = `dataaudio.json`
  let url = `https://api.alquran.cloud/v1/surah/${num}`
  let tafs = `https://quranenc.com/api/v1/translation/sura/arabic_moyassar/${num}`
  // Tab to edit
  await fetch(dataaudio).then(r => r.json()).then((r)=>{
    for(let i = 0;i<r[String(num)].length;i++){
      let ele = document.createElement("option")
      ele.value = r[String(num)][i]["reciter_name"]
      console.log(r[String(num)][i]["index"])
      ele["idd"] = r[String(num)][i]["reciter_id"]
      ele["indx"] = r[String(num)][i]["index"]
      ele.innerHTML = ele.value
      document.body.appendChild(ele)
      selectqaree.appendChild(ele)
    }
  })
  await fetch(url)
    .then(response => response.json())
    .then(function(data) {
      //console.log(data.data)
      let nam = data.data.name
      name.innerHTML = nam
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
      console.log(numayas)
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
            console.log(aya[i],word[i])
            if (word[i] != aya[i]) {
              ok = false
              break;
            }
          }
          if(aya[1] == 'ّ'){
            ok = true
          }
          console.log(ok)
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
      su.innerHTML = '<div class="center-image"><img src="../icons/error.png" class="imagee error-hadith"></div>هناك خلل في الصفحة <br>أعد تحميل الصفحة<br> أو بلغنا'
      su.style.textAlign = 'center'
      su.style.backgroundColor = 'var(--third-color)'
      su.style.padding = '40px'
    });

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
                <div class="aya-text">${eles[i]} (${i + 1})</div>
                <button class="paste"><img src="../icons/paste.png" alt="لصق" class="pastee"></button>
                </div>
                <hr>
        <div class="tafsircont">
                <div class="tafsir-text">
                  <p>التفسير</p>
              </div>
                <hr>
                <div class="tafsir">${tafsir[i]}</div>
                <button class="paste"><img src="../icons/paste.png" alt="لصق" class="pastee"></button>
                </div>
              </div>`
      }
    })
    .catch(function(error) {
      //console.log(error)
      su.innerHTML = '<div class="center-image"><img src="../icons/error.png" class="imagee error-hadith"></div>هناك خلل في الصفحة <br>اعد تحميل الصفحة<br> أو بلغنا'
      su.style.textAlign = 'center'
      su.style.backgroundColor = 'var(--third-color)'
      su.style.padding = '40px'
      
    })
}
window.addEventListener('load', function(e) {
  setTimeout(()=>{
    document.getElementsByClassName('content')[0].style.display = 'block'
    document.getElementsByClassName('content')[0].style.animation = "openpage 1.5s ease-in-out"
    document.getElementsByClassName('content')[0].style.opacity = 1
    document.getElementsByClassName('loading')[0].style.display = 'none'
  },1000)
})
let active = false;
let element;
window.addEventListener("click",(e)=>{
  if(e.target.classList.contains("paste")){
  let ele = e.target.previousElementSibling
      navigator.clipboard.writeText(ele.innerText)
      if(active){
          element.src = "../icons/paste.png"
      }
      e.target.children[0].src = "../icons/check-mark.png"
      active = true
      element = e.target.children[0]
  }else if(e.target.classList.contains("pastee")){
      let ele = e.target.parentElement.previousElementSibling
      navigator.clipboard.writeText(ele.innerText)
      if(active){
          element.src = "../icons/paste.png"
      }
      e.target.src = "../icons/check-mark.png"
      active = true
      element = e.target
  }
})
let audioopener = document.querySelector("audio")
let audioopen = false
selectqaree.addEventListener("change",async(e)=>{
  if(selectqaree.value != "--"){
    if(!audioopen){
      audioopener.style.animation = "openaudio 1s ease-out" 
      audioopener.style.display = "block"
      audioopen = true
      }
      let selectedOption = selectqaree.options[selectqaree.selectedIndex];
    await fetch(`https://alquran.vip/APIs/reciterAudio?reciter_id=${selectedOption["idd"]}`).then(r=>r.json())
    .then((r)=>{
      audioopener.src = r["audio_urls"][Number(selectedOption["indx"])]["audio_url"]
    }).catch(e => console.log(e))
  }
})