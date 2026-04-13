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
let datee = new Date();
daten.innerText = datee.getFullYear()
// loading animation
window.addEventListener('load', function(e) {
  setTimeout(()=>{
    document.getElementsByClassName('content')[0].style.display = 'block'
    document.getElementsByClassName('content')[0].style.animation = "openpage 1.5s ease-in-out"
    document.getElementsByClassName('content')[0].style.opacity = 1
    document.getElementsByClassName('loading')[0].style.display = 'none'
  },1000)
})
// start questions
let startbtn = document.getElementById("start")
let quescontainer = document.getElementsByClassName("quescont")[0]
let errorshowed = false
let m;
let counter = 0;
let points = 0;
let event;
document.body.addEventListener("click",(e)=>{
  if(e.target && e.target.id == "start"){
  let numofques = +document.querySelector(".choic input").value
  if(numofques < 1 || numofques > 20 || numofques === "" || isNaN(numofques)){
    errorshowed = false
    if(!errorshowed){
      document.getElementsByClassName("err")[0].classList.remove("off")
      document.getElementsByClassName("err")[0].classList.add("on")
      errorshowed = true
    }
  }else{
    document.getElementsByClassName("err")[0].classList.remove("on")
    document.getElementsByClassName("err")[0].classList.add("off")
    errorshowed = false
    // get questions
    let link = `https://islamicquiz.i8x.net/api/questions/random?count=${numofques}`
    fetch(link).then((r)=>r.json()).then((r)=>{
      // ques = r[i][q]
      // ans = r[i][answers][0->2][answer]
      m = r;
      counter=0,points=0;
      printquestion()
      window.removeEventListener("click",event)
      event = eventt
      window.addEventListener("click",event)
    }).catch((e)=>{
      quescontainer.innerHTML = `<div class="center-image"><img loading="lazy" src="../../icons/error.png" class="imagee error-hadith"></div>
      <p class="center">هناك خطأ في الموقع حاليًا،يمكنك الرجوع إلى <span onclick="back();" style="color:white;text-decoration:none;cursor:pointer;">الصفحة الرئيسية</span></p>
        `;
    })
    // question correction and actions
    function eventt(e){
      if(counter < m.length){
        let answers = document.getElementsByClassName("choice")
      if(e.target.classList.contains("choice")){
        answers[0].style.backgroundColor = "";
        answers[1].style.backgroundColor = "";
        answers[2].style.backgroundColor = "";
        let ans = m[counter]["answers"][Number(e.target.getAttribute("num"))]["t"]
        if(ans){
          e.target.style.backgroundColor = "var(--third-color)";
        }else{
          e.target.style.backgroundColor = "red"
        }
        counter++
        points += ans
        setTimeout(() => {
          if (counter >= m.length) {
            window.removeEventListener("click", event); // إزالة الحدث بعد نهاية اللعبة
            showResult(numofques, points);
          } else {
            printquestion();
          }
        }, 1000);
  }
}
    }
    // add question
  function printquestion(){
    quescontainer.innerHTML = `
      <div class="num-of-ques">السؤال ${counter + 1}</div>
     <div class="ques-text">${m[counter]["q"]}</div>
     <div class="choices">
       <div num="0" class="choice">${m[counter]["answers"][0]["answer"]}</div>
       <div num="1" class="choice">${m[counter]["answers"][1]["answer"]}</div>
       <div num="2" class="choice">${m[counter]["answers"][2]["answer"]}</div>
     </div>
     <div class="result-now">
       النتيجة:<span class="questions">${numofques}</span>/<span class="points">${points}</span>
     </div>
    `
  }
  // show final result
  function showResult(total, score) {
    quescontainer.innerHTML = `
      <div class="result">نتيجتك هي</div>
      <h2>${score}/${total}</h2>
    `;

    if (score / total === 1) {
      quescontainer.innerHTML += `<div>بارك الله فيك، أسأل الله أن يزيدك علمًا</div>`;
    } else if (score / total > 0.7) {
      quescontainer.innerHTML += `<div>مستواك جيد، لكن تحتاج للمزيد من المعلومات</div>`;
    } else if (score / total >= 0.5) {
      quescontainer.innerHTML += `<div>مستواك يحتاج لتحسن، لكنك حاولت</div>`;
    } else {
      quescontainer.innerHTML += `<div>أنصحك بالتزود بالعلم، عد قريبًا</div>`;
    }

    quescontainer.innerHTML += `
      <div>أتريد المحاولة مرة أخرى؟</div>
      <div class="start-questions">
        <div class="choic">
          <p>اختر عدد الأسئلة</p>
          <input min="1" max="20" inputmode="numeric" type="number"/>
        </div>
        <button id="start">ابدأ</button>
      </div>
      <div class="err off center">من فضلك اكتب عددًا صحيحًا أكبر من صفر ولا يتجاوز 20</div>
    `;
  }
  }
}
})
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