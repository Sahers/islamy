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
    document.getElementsByClassName('top')[0].style.animationName = 'load'
    document.getElementsByClassName('top')[0].style.animationDuration = '2.5s'
  },1000)
})
let topi = document.getElementById("topics");
let con = document.getElementById("content");
let qsmabudawud = [
  "الطهارة",
  "الصلاة",
  "الاستسقاء",
  "صلاة السفر",
  "صلاة التطوع",
  "شهر رمضان",
  "قراءة القرآن",
  "صلاة الوتر",
  "الزكاة",
  "اللقطة",
  "المناسك",
  "النكاح",
  "الطلاق",
  "الصوم",
  "الجهاد",
  "الضحايا",
  "الصيد",
  "الوصايا",
  "الفرائض",
  "الخراج والفئ والإمارة",
  "الجنائز",
  "الأيمان والنذور",
  "البيوع",
  "الإجارة",
  "الأقضية",
  "العلم",
  "الأشربة",
  "الأطعمة",
  "الطب",
  "باب في الكهن والطيرة",
"العتق","الحروف والقراءات","الحمام","اللباس","الترجل","الخاتم","الفتن والملاحم","المهدي","الملاحم","الحدود","الديات","السنة","الأدب",];
let qsmbukhari = ["الوحي","الإيمان","العلم","الوضوء","الغسل","الحيض","التيمم","الصلاة","مواقيت الصلاة","الأذان","الجمعة","الخوف","العيدين","الوتر","الاستسقاء","الكسوف","سجود القرآن","تقصير الصلاة","التهجد","فضل الصلاة في مسجد مكة والمدينة","العمل في الصلاة","السهو","الجنائز","الزكاة","الحج","العمرة","المحصر وجزاء الصيد","جزاء الصيد ونحوه","فضائل المدينة","الصوم","صلاة التراويح","فضل ليلة القدر","الاعتكاف","البيوع","السلم","الشفعة","الإجارة","الحولة","الكفالة","الوكالة","الحرث والمزارعة","الشرب والمشاربة","الاستقراض","الإشخاص والخصومات","اللقطة","المظالم","الشركة","الرهن","العتق","المكاتب","الهبة وفضلها","الشهادات","الصلح","الشروط","الوصايا","الجهاد والسير","فرض الخمس","الجزية","بدء الخلق","أحاديث الأنبياء","المناقب","فضائل الصحابة","مناقب الأنصار","المغازي","تفسير القرآن","فضائل القرآن","النكاح","الطلاق","النفقات","الأطعمة","العقيقة","الذبائح والصيد","الأضاحي","الأشربة","المرضى","الطب","اللباس","الأدب","الاستئذان","الدعوات","الرقاق","القدر","الأيمان والنذور","كفارات الأيمان","الفرائض","الحدود","الديات","استتابة المرتدين والمعاندين وقتالهم","الإكراه","الحيل","التعبير","الفتن","الأحكام","التمني","أخبار الآحاد","الاعتصام بالكتاب والسنة","التوحيد"]
let qsmnasai = ["الطهارة","المياه","الحيض والاستحاضة","الغسل والتيمم","الصلاة","المواقيت","الأذان","المساجد","القبلة","الإمامة","الافتتاح","التطبيق","السهو","الجمعة","تقصير الصلاة في السفر","الكسوف","الاستسقاء","صلاة الخوف","صلاة العيدين","قيام الليل وطلوع النهار","الجنائز","الصيام","الزكاة","مناسك الحج","الجهاد","النكاح","الطلاق","الخيل","الأحباس","الوصايا","النحل","الهبة","الرقبى","العمرى","الأيمان والنذور","المزارعة","عشرة النساء","تحريم الدم","الفيء","البيعة","العقيقة","الفرع والعتيرة","الصيد والذبائح","الضحايا","البيوع","القسامة","قطع السارق","الإيمان وشرائعه","الزينة","آداب القضاة","الاستعاذة","الأشربة"]
let qsmibnmajah = ["افتتاح الكتاب في الإيمان وفضائل الصحابة والعلم","الطهارة وسننها","الصلاة","الأذان والسنة فيه","المساجد والجماعات","إقامة الصلاة والسنة فيها","الجنائز","الصيام","الزكاة","النكاح","الطلاق","الكفارات","التجارات","الأحكام","الهبات","الصدقات","الرهون","الشفعة","اللقطة","العتق","الحدود","الديات","الوصايا","الفرائض","الجهاد","المناسك","الأضاحي","الذبائح","الصيد","الأطعمة","الأشربة","الطب","اللباس","الأدب","الدعاء","تعبير الرؤيا","الفتن","الزهد"]
let qsmmalik = ["وقوت الصلاة","الطهارة","الصلاة","السهو","الجمعة","الصلاة في رمضان","صلاة الليل","صلاة الجماعة","قصر الصلاة في السفر","العيدين","صلاة الخوف","صلاة الكسوف","الاستسقاء","القبلة","القرآن","الجنائز","الزكاة","الصيام","الاعتكاف","الحج","الجهاد","النذور والأيمان","الضحايا","الذبائح","الصيد","العقيقة","الفرائض","النكاح","الطلاق","الرضاع","البيوع","القراض","المساقاة","كراء الأرض","الشفعة","الأقضية","الوصية","العتق والولاء","المكاتب","المدبر","الحدود","الأشربة","العقول","القسامة","الجامع","القدر","حسن الخلق","اللباس","صفة النبي صلى الله عليه وسلم","العين","الشعر","الرؤيا","السلام","الاستئذان","البيعة","الكلام","جهنم","الصدقة","العلم","دعوة المظلوم","أسماء النبي صلى الله عليه وسلم"]
let qsmmuslim = ["المقدمة","الإيمان","الطهارة","الحيض","الصلاة","المساجد ومواضع الصلاة","صلاة المسافرين وقصرها","الجمعة","صلاة العيدين","الاستسقاء","الكسوف","الجنائز","الزكاة","الصيام","الاعتكاف","الحج","النكاح","الرضاع","الطلاق","اللعان","العتق","البيوع","المساقاة","الفرائض","الهبات","الوصية","النذر","الأيمان","القسامة والمحاربين والقصاص والديات","الحدود","الأقضية","اللقطة","الجهاد والسير","الإمارة","الصيد والذبائح وما يؤكل من الحيوان","الأضاحي","الأشربة","اللباس والزينة","الآداب","السلام","الألفاظ من الأدب وغيرها","الشعر","الرؤيا","الفضائل","فضائل الصحابة رضي الله تعالى عنهم","البر والصلة والأداب","القدر","العلم","الذكر والدعاء والتوبة والاستغفار","الرقاق","التوبة","صفات المنافقين وأحكامهم","صفة القيامة والجنة والنار","الجنة، وصفة نعيمها وأهلها","الفتن وأشراط الساعة","الزهد والرقائق","التفسير"]
let qsmtirmidhi = ["الطهارة","الصلاة","الوتر","الجمعة","العيدين","السفر","الزكاة","الصوم","الحج","الجنائز","النكاح","الرضاع","الطلاق واللعان","البيوع","الأحكام","الديات","الحدود","الصيد والأطعمة والأحكام والفوائد","الأضاحي","النذور والأيمان","السير","فضائل الجهاد","الجهاد","اللباس","الأطعمة","الأشربة","البر والصلة","الطب","الفرائض","الوصايا","الولاء والهبة","القدر","الفتن","الرؤيا","الشهادات","الزهد","صفة القيامة والرقائق والورع","صفة الجنة","صفة جهنم","الإيمان","العلم","الاستئذان والآداب","الأدب","الأمثال","فضائل القرآن","القراءات","تفسير القرآن","الدعوات","المناقب"]
// 35 => المزارعة
let imams = ["abudawud", "bukhari","nasai","ibnmajah","malik","muslim","tirmidhi"];
let showw = document.getElementById("show");
let hadithplace = document.getElementById("hadis");
let hadithcontainer = document.getElementsByClassName("topics")[0];
function secs(imam, id) {
  for (let i = 0; i < imam.length; i++) {
    let ele = document.createElement("div");
    ele.classList.add("center");
    ele.classList.add("section");
    let text = imam[i];
    ele.innerHTML = text;
    ele.setAttribute("num", i);
    ele.style.cursor = "pointer";
    topi.appendChild(ele);
    ele.addEventListener("click", async function (e) {
      hadithcontainer.style["grid-template-areas"] = '"a b"';
      showw.style.display = "block";
      showw.style["animation"] = "opacityy 1s ease-in";
      setTimeout(() => {
        showw.style.opacity = "1";
      }, 800);
      ele.innerHTML = `
      <div id="tit center">${imam[i]}</div>
    `;

      let word = imams[id];
      let data = await hadith(word, i + 1)
        .then((m) => {
          console.log(m)
          mark(ele, imam);
          let par = document.querySelector(".show p");
          par.innerHTML = `باب ${e.target.innerText}`;
          let ret = "";
          let dif =
            m["hadiths"].length
            // استثناءات للضبط
            if(word == "ibnmajah" && i == 10){
              dif = 74
            }
            if(word == "muslim" && i == 0){
              dif = 15
            }
          console.log(dif);
          for (let j = 0; j < dif; j++) {
            if(m["hadiths"][j]["text"] != ""){
            ret +=
              `<div class="hadithcontainer">
              <div data="${m["hadiths"][j]["text"]}" class="one-hadith">${m["hadiths"][j]["arabicnumber"]}-` +
              m["hadiths"][j]["text"] +
              `</div><button class="paste"><img src="../icons/paste.png" alt="لصق" class="pastee"></button></div>`;
            }
          }
          return ret;
        }).catch((e) => {
          console.log(e)
          showw.innerHTML = `<div class="center-image"><img src="../../icons/error.png" class="imagee error-hadith"></div>
      <p class="center">هناك خطأ في الموقع حاليًا،يمكنك الرجوع إلى <span onclick="back();" style="color:white;text-decoration:none;cursor:pointer;">الصفحة الرئيسية</span></p>
        `;
        });
        hadithplace.innerHTML = `
      ${data}
      `;
      if(data == ""){
        showw.innerHTML = `<div class="center-image"><img src="../../icons/error.png" class="imagee error-hadith"></div>
      <p class="center">هناك خطأ في الموقع حاليًا،يمكنك الرجوع إلى <span onclick="back();" style="color:white;text-decoration:none;cursor:pointer;">الصفحة الرئيسية</span></p>
        `;
      }
    });
  }
}
let active = false
let ele;
function mark(element, imam) {
    if(active){
      ele.classList.remove("mark");
    }
  element.classList.add("mark");
  active = true
  ele = element
}
function hadith(imam, num) {
  let url;
  if(imam == "nasai" && num == 36){
    url = "files-error/nasai36.json";
  }else if(imam == "nasai" && num > 36){
  url = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${imam}/sections/${num-1}.json`;
  }else if(imam == "ibnmajah" || imam == "muslim"){
    url = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${imam}/sections/${num-1}.json`;
  }
  else{
  url = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${imam}/sections/${num}.json`;
  }
  console.log(url)
  return fetch(url).then((r) => r.json());
}
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
let element;
let active2 = false;
window.addEventListener("click",(e)=>{
  if(e.target.classList.contains("paste")){
  let ele = e.target.previousElementSibling
      navigator.clipboard.writeText(ele.getAttribute("data"))
      if(active2){
          element.src = "../icons/paste.png"
      }
      e.target.children[0].src = "../icons/check-mark.png"
      active2 = true
      element = e.target.children[0]
  }else if(e.target.classList.contains("pastee")){
      let ele = e.target.parentElement.previousElementSibling
      navigator.clipboard.writeText(ele.getAttribute("data"))
      if(active2){
          element.src = "../icons/paste.png"
      }
      e.target.src = "../icons/check-mark.png"
      active2 = true
      element = e.target
  }
})