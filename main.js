// animation handling in menu
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
// put a random aya
window.addEventListener('load',async function(e) {
let ayacont = document.getElementsByClassName("aya")[0];
let ayaplace = document.querySelector(".aya .text")
let suraplace = document.querySelectorAll(".aya .sura span")
let suralinkplace = this.document.querySelector(".aya a")
let numsurah = Math.max(Math.floor(Math.random() * 114),1)
let api = `https://api.alquran.cloud/v1/surah/${numsurah}`
await fetch(api).then((r)=>r.json()).then((data)=>{
  let numayas = data.data.numberOfAyahs
let numaya = Math.min(Math.floor(Math.random() * numayas),numayas - 1)
  let aya = data.data.ayahs[numaya].text
        let word = "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ "
        let w2 = "بِّسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ "
        let ok = true
        if (numaya == 0 && numsurah != 1) {
          for (let i = 0; i < word.length; i++) {
            if (word[i] != aya[i] && w2[i] != aya[i]) {
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
          ayaplace.innerText = aya
          let titles =["الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال","التوبة","يونس","هود","يوسف","الرعد","إبراهيم","الحجر","النحل","الإسراء","الكهف","مريم","طه","الأنبياء","الحج","المؤمنون","النور","الفرقان","الشعراء","النمل","القصص","العنكبوت","الروم","لقمان","السجدة","الأحزاب","سبأ","فاطر","يس","الصافات","ص","الزمر","غافر","فصلت","الشورى","الزخرف","الدخان","الجاثية","الأحقاف","محمد","الفتح","الحجرات","ق","الذاريات","الطور","النجم","القمر","الرحمن","الواقعة","الحديد","المجادلة","الحشر","الممتحنة","الصف","الجمعة","المنافقون","التغابن","الطلاق","التحريم","المُلك","القلم","الحاقة","المعارج","نوح","الجن","المزمل","المدثر","القيامة","الإنسان","المرسلات","النبأ","النازعات","عبس","التكوير","الانفطار","المطففين","الانشقاق","البروج","الطارق","الأعلى","الغاشية","الفجر","البلد","الشمس","الليل","الضحى","الشرح","التين","العلق","القدر","البينة","الزلزلة","العاديات","القارعة","التكاثر","العصر","الهمزة","الفيل","قريش","الماعون","الكوثر","الكافرون","النصر","المسد","الإخلاص","الفلق","الناس"]
          let surapage = ['alfatiha','albaqarah','aal imran','al nessa\'','alma\'eda','al anaam','al aaraf','al anfal','al tawba','younous','hod','yousouf','al raad','ibrahem','al hijr','al nahl','al israa\'','al kahf','maream','taha','al anbiaa\'','al haj','al momenon','al nor','al forqan','al shoaraa\'','al naml','al qss','al ankbot','al rom','loqman','al sajda','al ahzab','saba\'','fater','yasen','al saffat','sad','al zmar','ghafer','fosselat','al shoraa','al zokhrof','al dokhan','al gathya','al ahqaf','mohamed','al fath','al hojorat','qaf','al zaryat','al tor','al najm','al qamar','al rahman','al waqeeah','al hadid','al mojadalah','al hashr','al momtahena','al saff','al gomaa','al monafeqon','al taghabon','al talaq','al tahrim','al molk','al qalam','al haaqa','al maareg','noh','al jen','al mozzamel','al moddather','al qyama','al insan','al morsalat','al nabaa\'','al nazeaat','aabas','al takwir','al infetar','al motaffefen','al insheqaq','al brog','al tareq','al aala','al ghashya','al fagr','al balad','al shams','al lael','al doha','al sharh','al ten','al aalaq','al qadr','al baeenah','al zalzala','al aadyat','al qareaa','al takathor','al asr','al homaza','al fel','qoraysh','al maoon','al kawthar','al kaferon','al nasr','al masad','al ikhlas','al falaq','al nas']
          suraplace[0].innerText = titles[numsurah - 1];
          suraplace[1].innerText = numaya + 1
          suralinkplace.href = `suras/${surapage[numsurah-1]}.html`
}).catch(()=>{
  ayaplace.innerText = "ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَـٰلَمِینَ"
  suraplace[0].innerText = "الفاتحة";
  suraplace[1].innerText = 2
  suralinkplace.href = `suras/alfatiha.html`
})
  setTimeout(()=>{
      document.getElementsByClassName('content')[0].style.display = 'block'
      document.getElementsByClassName('content')[0].style.animation = "openpage 1.5s ease-in-out"
      document.getElementsByClassName('content')[0].style.opacity = 1
      document.getElementsByClassName('loading')[0].style.display = 'none'
      document.getElementsByClassName('top')[0].style.animationName = 'load2'
      document.getElementsByClassName('top')[0].style.animationDuration = '2.5s'
  },1000)
})
// copyright year
let daten = document.getElementById('date')
let datee = new Date();
daten.innerText = datee.getFullYear()
