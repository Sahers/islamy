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
let daten = document.getElementById('date')
let datee = new Date()
console.log()
daten.innerText = datee.getFullYear()
let titles =["الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال","التوبة","يونس","هود","يوسف","الرعد","إبراهيم","الحجر","النحل","الإسراء","الكهف","مريم","طه","الأنبياء","الحج","المؤمنون","النور","الفرقان","الشعراء","النمل","القصص","العنكبوت","الروم","لقمان","السجدة","الأحزاب","سبأ","فاطر","يس","الصافات","ص","الزمر","غافر","فصلت","الشورى","الزخرف","الدخان","الجاثية","الأحقاف","محمد","الفتح","الحجرات","ق","الذاريات","الطور","النجم","القمر","الرحمن","الواقعة","الحديد","المجادلة","الحشر","الممتحنة","الصف","الجمعة","المنافقون","التغابن","الطلاق","التحريم","المُلك","القلم","الحاقة","المعارج","نوح","الجن","المزمل","المدثر","القيامة","الإنسان","المرسلات","النبأ","النازعات","عبس","التكوير","الانفطار","المطففين","الانشقاق","البروج","الطارق","الأعلى","الغاشية","الفجر","البلد","الشمس","الليل","الضحى","الشرح","التين","العلق","القدر","البينة","الزلزلة","العاديات","القارعة","التكاثر","العصر","الهمزة","الفيل","قريش","الماعون","الكوثر","الكافرون","النصر","المسد","الإخلاص","الفلق","الناس"]
    let links = ['alfatiha','albaqarah','aal imran','al nessa\'','alma\'eda','al anaam','al aaraf','al anfal','al tawba','younous','hod','yousouf','al raad','ibrahem','al hijr','al nahl','al israa\'','al kahf','maream','taha','al anbiaa\'','al haj','al momenon','al nor','al forqan','al shoaraa\'','al naml','al qss','al ankbot','al rom','loqman','al sajda','al ahzab','saba\'','fater','yasen','al saffat','sad','al zmar','ghafer','fosselat','al shoraa','al zokhrof','al dokhan','al gathya','al ahqaf','mohamed','al fath','al hojorat','qaf','al zaryat','al tor','al najm','al qamar','al rahman','al waqeeah','al hadid','al mojadalah','al hashr','al momtahena','al saff','al gomaa','al monafeqon','al taghabon','al talaq','al tahrim','al molk','al qalam','al haaqa','al maareg','noh','al jen','al mozzamel','al moddather','al qyama','al insan','al morsalat','al nabaa\'','al nazeaat','aabas','al takwir','al infetar','al motaffefen','al insheqaq','al brog','al tareq','al aala','al ghashya','al fagr','al balad','al shams','al lael','al doha','al sharh','al ten','al aalaq','al qadr','al baeenah','al zalzala','al aadyat','al qareaa','al takathor','al asr','al homaza','al fel','qoraysh','al maoon','al kawthar','al kaferon','al nasr','al masad','al ikhlas','al falaq','al nas']
let suras = document.getElementsByClassName('sur')[0]
for(title in titles){
  let ele = document.createElement('div')
  ele.classList.add('sura')
  let name = titles[title]
  ele.innerHTML = name
  suras.append(ele)
  let link = links[title] 
  ele.style.cursor = "pointer"
  ele.addEventListener('click',function(){
      location.href = `${"suras/" + link + ".html"}`
  })
  document.addEventListener('click',function(e) {
    if(!ele.contains(e.target)){
      ele.innerHTML = name
      
    }
  })
}