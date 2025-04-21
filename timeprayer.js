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
// copyright year
let daten = document.getElementById('date')
let datee = new Date();daten.innerText = datee.getFullYear()
// loading animation
window.addEventListener('load', function(e) {
  setTimeout(()=>{
    document.getElementsByClassName('content')[0].style.display = 'block'
    document.getElementsByClassName('content')[0].style.animation = "openpage 1.5s ease-in-out"
    document.getElementsByClassName('content')[0].style.opacity = 1
    document.getElementsByClassName('loading')[0].style.display = 'none'
  },1000)
})
// prayers time handling
let maincontainer = document.getElementsByClassName("prayers")[0]
async function salah() {
    let url = `https://alquran.vip/APIs/getPrayerTimes`
    let data = await fetch(url).then((r)=>r.json())
    .then((r)=>{
      let city = r["region"]
      let co = r["country"]
      let names={AF:"أفغانستان",AL:"ألبانيا",DZ:"الجزائر",AD:"أندورا",AO:"أنغولا",AR:"الأرجنتين",AM:"أرمينيا",AU:"أستراليا",AT:"النمسا",AZ:"أذربيجان",BS:"جزر الباهاما",BH:"البحرين",BD:"بنغلاديش",BB:"بربادوس",BY:"بيلاروسيا",BE:"بلجيكا",BZ:"بليز",BJ:"بنين",BT:"بوتان",BO:"بوليفيا",BA:"البوسنة والهرسك",BW:"بوتسوانا",BR:"البرازيل",BN:"بروناي",BG:"بلغاريا",BF:"بوركينا فاسو",BI:"بوروندي",CV:"الرأس الأخضر",KH:"كامبوديا",CM:"الكاميرون",CA:"كندا",KY:"جزر كايمان",CF:"جمهورية أفريقيا الوسطى",TD:"تشاد",CL:"تشيلي",CN:"الصين",CO:"كولومبيا",KM:"جزر القمر",CG:"الكونغو",CD:"الكونغو (جمهورية الكونغو الديمقراطية)",CR:"كوستاريكا",HR:"كرواتيا",CU:"كوبا",CY:"قبرص",CZ:"جمهورية التشيك",DK:"الدنمارك",DJ:"جيبوتي",DM:"دومينيكا",DO:"جمهورية الدومينيكان",EC:"الإكوادور",EG:"مصر",SV:"السلفادور",GQ:"غينيا الاستوائية",ER:"إريتريا",EE:"إستونيا",SZ:"إيسواتيني",ET:"إثيوبيا",FJ:"فيجي",FI:"فنلندا",FR:"فرنسا",GA:"غابون",GM:"غامبيا",GE:"جورجيا",DE:"ألمانيا",GH:"غانا",GR:"اليونان",GD:"غرينادا",GT:"غواتيمالا",GN:"غينيا",GW:"غينيا بيساو",GY:"غويانا",HT:"هايتي",HN:"هندوراس",HU:"هنغاريا",IS:"آيسلندا",IN:"الهند",ID:"إندونيسيا",IR:"إيران",IQ:"العراق",IE:"أيرلندا",IT:"إيطاليا",CI:"كوت ديفوار",JM:"جامايكا",JP:"اليابان",JO:"الأردن",KZ:"كازاخستان",KE:"كينيا",KI:"كيريباتي",KW:"الكويت",KG:"قيرغيزستان",LA:"لاوس",LV:"لاتفيا",LB:"لبنان",LS:"ليسوتو",LR:"ليبيريا",LY:"ليبيا",LI:"ليختنشتاين",LT:"ليتوانيا",LU:"لوكسمبورغ",MG:"مدغشقر",MW:"مالاوي",MY:"ماليزيا",MV:"المالديف",ML:"مالي",MT:"مالطا",MH:"جزر مارشال",MQ:"مارتينيك",MR:"موريتانيا",MU:"موريشيوس",MX:"المكسيك",FM:"ميكرونيزيا",MD:"مولدوفا",MC:"موناكو",MN:"منغوليا",ME:"الجبل الأسود",MA:"المغرب",MZ:"موزمبيق",MM:"ميانمار",NA:"ناميبيا",NR:"ناورو",NP:"نيبال",NL:"هولندا",NC:"كاليدونيا الجديدة",NZ:"نيوزيلندا",NI:"نيكاراغوا",NE:"النيجر",NG:"نيجيريا",MK:"مقدونيا الشمالية",NO:"النرويج",OM:"عمان",PK:"باكستان",PW:"بالاو",PA:"بنما",PG:"بابوا غينيا الجديدة",PY:"باراغواي",PE:"بيرو",PH:"الفلبين",PL:"بولندا",PT:"البرتغال",QA:"قطر",RE:"ريونيون",RO:"رومانيا",RU:"روسيا",RW:"رواندا",ST:"ساو تومي وبرينسيب",SA:"المملكة العربية السعودية",SN:"السنغال",RS:"صربيا",SC:"سيشل",SL:"سيراليون",SG:"سنغافورة",SK:"سلوفاكيا",SI:"سلوفينيا",SB:"جزر سليمان",SO:"الصومال",ZA:"جنوب أفريقيا",KR:"كوريا الجنوبية",SS:"جنوب السودان",ES:"إسبانيا",LK:"سريلانكا",SD:"السودان",SR:"سورينام",SE:"السويد",CH:"سويسرا",SY:"سوريا",TW:"تايوان",TJ:"طاجيكستان",TZ:"تنزانيا",TH:"تايلاند",TL:"تيمور الشرقية",TG:"توغو",TK:"توكيلو",TO:"تونغا",TT:"ترينيداد وتوباغو",TN:"تونس",TR:"تركيا",TM:"تركمانستان",TC:"جزر توركس وكايكوس",TV:"توفالو",UG:"أوغندا",UA:"أوكرانيا",AE:"الإمارات العربية المتحدة",GB:"المملكة المتحدة",US:"الولايات المتحدة",UY:"أوروغواي",UZ:"أوزبكستان",VU:"فانواتو",VE:"فنزويلا",VN:"فيتنام",WF:"جزر وواليس وفوتونا",EH:"الصحراء الغربية",YE:"اليمن",ZM:"زامبيا",ZW:"زيمبابوي"};
      let country = names[co];
      let details = document.querySelectorAll(".info div span")
      let day = datee.getDay()
      let month = datee.getMonth()
      const daysInArabic = [
        "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"
    ];
    const monthsInArabic = [
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];
  // location details and time
details[0].innerHTML = country
details[1].innerHTML = city
details[2].innerHTML = `${daysInArabic[day]} ${datee.getDate()} ${monthsInArabic[month]} ${datee.getFullYear()} م`
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
details[3].innerHTML =`${hourss}:${minutess} ${(eveningg?"م":"ص")}`
// prayers time handling
      let prays = document.getElementsByClassName("time")
      let times = Object.values(r["prayer_times"])
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
      mainncontainer.innerHTML = `<div class="center-image"><img src="../../icons/error.png" class="imagee error-hadith"></div>
      <p class="center">هناك خطأ في الموقع حاليًا،يمكنك الرجوع إلى <span onclick="back();" style="color:white;text-decoration:none;cursor:pointer;">الصفحة الرئيسية</span></p>
        `;
    })
}
salah()
// back to main page on error
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