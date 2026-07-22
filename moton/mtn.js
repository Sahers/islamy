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
let mtnPlace = document.getElementById("themtn")
let tkrar = 0;
let abyatNum = 0
let bytNow;
let playstatus = false
let ready = false;
let startTime,endTime;
let speedind = 2
let times;
let mtnPartMode = false;
let soundLink = ""
let chosenShiekh;
let babname = ""
let endtimebyt,starttimebyt,currentByt;
let abyat = [];
async function mtnShow(mtnName) {
  let data = await fetch("moton.json").then((r)=>r.json()).then((r)=>r[mtnName]).catch(()=>{
    let content =  document.querySelector("main")
    content.innerHTML = `<div class="center-image"><img loading="lazy" src="../icons/error.png" class="imagee error-hadith"></div>هناك خلل في الصفحة <br> </a>أعد تحميل الصفحة أو <a href="../about.html" style="color:var(--sec-color);">بلغنا`
    content.style.cssText = `
    display:flex;
    flex-direction:column;
    align-items:center;
    `
  })
  let abyatcontent = data["abyat"] || undefined
  let keys = Object.keys(abyatcontent)
  // put abyats
  for(let i=0;i<keys.length;i++){
    let bab = abyatcontent[keys[i]]
   for(let j=0;j<bab.length;j++){
    if(j == 0){
      mtnPlace.innerHTML += `<div class="bab-title">${bab[j]}</div>`
      babname = `<div class="bab-title">${bab[j]}</div>`
    }else{
      abyatNum++;
      let bytText = bab[j]["text"]
      let bytshatr = bab[j]["shatr"] - 1
      let txtArr = bytText.split(" ")
      let shatr1split = txtArr.slice(0,bytshatr)
      let shatr2split = txtArr.slice(bytshatr)
      let shatr1,shatr2;
      let eleSh1,eleSh2;
      if(bab[j]["corrections"]){
        let corrects = bab[j]["corrections"];
        let correctkeys = Object.keys(corrects);
        for(let k=0;k<correctkeys.length;k++){
          if(correctkeys[k] < bytshatr + 1){
            shatr1split[correctkeys[k]-1] = `<div class="correct"data-correct="${corrects[correctkeys[k]]}">${shatr1split[correctkeys[k]-1]}</div>`
          }else{
            shatr2split[correctkeys[k]-bytshatr-1] = `<div class="correct"data-correct="${corrects[correctkeys[k]]}">${shatr2split[correctkeys[k]-bytshatr-1]}</div>`
          }
        }
      }
      shatr1 = shatr1split.join(" ")
      shatr2 = shatr2split.join(" ")
      eleSh1 = `<div class="shatr1" data-byt="${bab[j]["id"]}">${bab[j]["id"]}.${shatr1}</div>`
        eleSh2 = `<div class="shatr2">${shatr2}</div>`
        mtnPlace.innerHTML += `<div class="byt">
        ${eleSh1}
        ${eleSh2}
      </div>`
      abyat.push(`${((babname != "")?babname:"")}
        <div class="the-byt">
        ${eleSh1}
        ${eleSh2}
      </div>`)
      babname = "";
    }
   }
  }
  let abyatoptions = document.getElementById("abyat-options")
  let bytShown = document.getElementsByClassName("the-byt-container")[0]
  window.addEventListener("click",(e)=>{
    if(e.target.classList.contains("byt")){
      if(!playstatus){
        abyatoptions.style.display = "flex"
      bytShown.innerHTML = `<div class="the-byt">${e.target.innerHTML}</div>`
      bytNow = bytShown.children[0].children[0].getAttribute("data-byt")
            audioplayer.style.display = "none"
      }
      console.log(bytNow)
    }else if((e.target.classList.contains("shatr1") ||e.target.classList.contains("shatr2"))  && !e.target.parentElement.classList.contains("the-byt-container")){
      if(!playstatus){
        abyatoptions.style.display = "flex"
      bytShown.innerHTML = `<div class="the-byt">${e.target.parentElement.innerHTML}</div>`
      bytNow = bytShown.children[0].children[0].getAttribute("data-byt")
            audioplayer.style.display = "none"
      }
      console.log(bytNow)
    }
  })
  // sound manage
    let sounds = data["sounds"]
    let sheikhs = Object.keys(sounds)
    let listenplace = document.getElementById("listenplace")
    let listenbtn = document.getElementById("listen-mtn")
    let choosesheikh = document.getElementById("choose-sheikh")
    let sheikhchoosing = document.getElementById("sheikh")
    for(let i = 0;i<sheikhs.length;i++){
      sheikhchoosing.innerHTML += `<option value="${sheikhs[i]}" selected="selected">${sheikhs[i]}</option>`
    }
    let chooseendbyt = document.getElementById("to-any-byt")
    let repeatContainer = document.getElementById("repeattimes")
    let audioplayer = document.getElementById("audio-player")
    let audioplayerplay = document.querySelector("#audio-player audio")
    listenbtn.addEventListener("click",function(e){
      choosesheikh.style.display = "flex"
      chooseendbyt.style.display = "none"
      repeatContainer.style.display = "none"
      restartAudio()
      audioplayer.style.display = "none"
    })
    let openaudio = document.getElementById("open-audio")
    openaudio.addEventListener("click",function(e){
      let select = sheikhchoosing.options[sheikhchoosing.selectedIndex].value
      console.log(select)
      chosenShiekh = select
      console.log(chosenShiekh)
      let sheikhdata = sounds[select]
      times = sheikhdata["times"]
      choosesheikh.style.display = "none"
      listenplace.style.display = "flex"
      soundLink = sheikhdata["link"]
    })
    let startfromit = document.getElementById("start-from")
    let allmtnbtn = document.getElementById("all-mtn")
    allmtnbtn.addEventListener("click",function(e){
      listenplace.style.display = "none"
      repeatContainer.style.display = "flex"
      startTime = 0;
      starttimebyt = 0;
      currentByt = 0;
      endtimebyt = times[0][1]
      endTime = times[abyatNum-1][1]
      bytShown.innerHTML = abyat[currentByt];
      mtnPartMode = false
    })
    let inputend = document.getElementById("endbyt")
    startfromit.addEventListener("click",function(e){
      listenplace.style.display = "none"
      chooseendbyt.style.display = "flex"
      document.getElementById("this-byt").onclick = function(e){
        inputend.value = bytNow
      }
      document.getElementById("to-end").onclick = function(e){
        inputend.value = abyatNum
      }
      mtnPartMode = true;
    })
    let btnBeforeTkrar = document.getElementById("gototkrar")
    btnBeforeTkrar.addEventListener("click",(e)=>{
      if(!isNaN(inputend.value) && Number(+inputend.value) >= bytNow && Number(+inputend.value) <= abyatNum){
        if(mtnPartMode){
          startTime = times[Number(bytNow) - 1][0]
          starttimebyt = times[Number(bytNow) - 1][0]
          currentByt = Number(bytNow) - 1;
          endtimebyt = times[Number(bytNow) - 1][1]
          endTime = times[Number(inputend.value) - 1][1]
        }
        document.getElementsByClassName("error-byt")[0].style.display = "none"
        chooseendbyt.style.display = "none"
        repeatContainer.style.display = "flex"
      }else{
          document.getElementsByClassName("error-byt")[0].style.display = "block"
      }
    })
    let timesinput = document.getElementById("times")
    let startbtn = document.getElementById("start-audio")
    let audiostatus = document.getElementById("audio-status")
    startbtn.addEventListener("click",(e)=>{
      if(!isNaN(+timesinput.value) && Number(timesinput.value) > 0 && Number(timesinput.value) <= 20){
        document.getElementsByClassName("error")[0].style.display = "none"
        tkrar = Math.floor(Number(+timesinput.value))
        repeatContainer.style.display = "none";
        audioplayer.style.display = "flex"
        audioplayerplay.onloadedmetadata = function(){
        if(typeof startTime !== 'undefined' && Number.isFinite(startTime)){
          audioplayerplay.currentTime = startTime;
        }
    }
          if (audioplayerplay.src.includes(soundLink) && audioplayerplay.readyState >= 1) {
            if(typeof startTime !== 'undefined' && Number.isFinite(startTime)){
          audioplayerplay.currentTime = startTime;
        }
        } else {
            audioplayerplay.src = soundLink;
        }
        if (audioplayerplay.readyState >= 3) {
      if(!ready){
        audioplayerplay.currentTime = startTime
        ready = true
      }
      if(audiostatus) audiostatus.innerText = `جاهز للاستماع`
    }
      document.getElementById("reader").innerHTML = "الشيخ " + chosenShiekh
      }else{
        document.getElementsByClassName("error")[0].style.display = "block"
      }
    })
    // audioplayer settings
    let playbtn = document.getElementById("play")
    let pausebtn = document.getElementById("pause")
    let speedbtn = document.getElementById("speed")
    // tkrar times
     audioplayerplay.onwaiting = function(){
       if(audiostatus) audiostatus.innerText = `جار التحميل...`
    }
        audioplayerplay.oncanplay = function(e){
      if(!ready){
        ready = true
      }
      if(audiostatus) audiostatus.innerText = `جاهز للاستماع`
    }
    audioplayerplay.ontimeupdate = function(e){
      if(audioplayerplay.currentTime >= endtimebyt){
        if(currentByt < abyatNum - 1){
          currentByt++;
          starttimebyt = times[currentByt][0];
        endtimebyt = times[currentByt][1]
        bytShown.innerHTML = abyat[currentByt];
        }
      }
      if(audioplayerplay.currentTime >= endTime){
          if(tkrar > 1){
            tkrar--;
          resetAudioTimeline();
          if(!mtnPartMode){
            currentByt = 0;
          }
            bytShown.innerHTML = abyat[currentByt];
          }else{
            audioplayerplay.pause()
            playstatus = false
            tkrar = 0
            resetAudioTimeline();
          }
        }
    }
    audioplayerplay.onerror = function(e){
      if(audioplayerplay.src.readyState === 3){
        audiostatus.innerText = `هناك خطأ في الصوت`
      }
    }
    playbtn.addEventListener("click",function(e){
      if(!playstatus){
        if(tkrar == 0)tkrar = 1;
        audioplayerplay.play()
        playstatus = true
      }
    })
    pausebtn.addEventListener("click",function(e){
      if(playstatus){
        audioplayerplay.pause()
        playstatus = false
      }
    })
    let speeds = [0.5,0.75,1,1.25,1.5,2]
    speedbtn.addEventListener("click",function(e){
      audioplayerplay.playbackRate = speeds[++speedind % 6]
      e.target.innerText = `السرعة:${speeds[speedind % 6]}`
    })
    function resetAudioTimeline() {
  audioplayerplay.currentTime = startTime;
  starttimebyt = startTime;
  
  if (mtnPartMode) {
    currentByt = Number(bytNow) - 1;
  } else {
    currentByt = 0;
  }
    if (times[currentByt]) {
    endtimebyt = times[currentByt][1];
  }
  if (abyat[currentByt]) {
    bytShown.innerHTML = abyat[currentByt];
  }
}
    function restartAudio(){
      audioplayerplay.pause()
      audioplayerplay.src = ""
      playstatus = false
      document.getElementById("speed").innerText = `السرعة:1`
      speedind = 2
      ready = false
      tkrar = 0
    }
}