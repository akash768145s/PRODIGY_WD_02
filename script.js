const playButton = document.querySelector(".play");
    const lapButton = document.querySelector(".lap");
    const resetButton = document.querySelector(".reset");
    const clearButton = document.querySelector(".lap-clear-button");
    const minute = document.querySelector(".minute");
    const second = document.querySelector(".sec");
    const centiSecond = document.querySelector(".msec");
    const laps = document.querySelector(".laps");
    const bg = document.querySelector(".outer-circle");

    let isPlay = false;
    let isReset = false;
    let secCounter = 0;
    let minCounter = 0;
    let centiCounter = 0;
    let lapItem=0;
    let intervalMinute, intervalSecond, intervalCentiSecond;

    const toggleButton = () => {
      lapButton.classList.toggle("hidden");
      resetButton.classList.toggle("hidden");
    };

    const play = () => {
      if (!isPlay && !isReset) {

        playButton.innerHTML = 'Pause';
        bg.classList.add("animation-bg");
        intervalMinute = setInterval(() => {
          minute.innerHTML = `&nbsp;${++minCounter}:`;
        }, 60 * 1000);
        intervalSecond = setInterval(() => {
          if (secCounter === 60) {
            secCounter = 0;
          }
          second.innerHTML = `&nbsp;${++secCounter}:`;
        }, 1000);
        intervalCentiSecond = setInterval(() => {
          if (centiCounter === 99) {
            centiCounter = 0;
          }
          centiSecond.innerHTML = `&nbsp;${++centiCounter}`;
        }, 10);
        isPlay = true;
        isReset = true;
      } else {
        playButton.innerHTML = 'Play';
        clearInterval(intervalMinute);
        clearInterval(intervalSecond);
        clearInterval(intervalCentiSecond);
        isPlay = false;
        isReset = false;
        bg.classList.add("animation-bg");
      }
      toggleButton();
    };

    const reset = () => {
        isReset = false;
        play();
        lapButton.classList.add("hidden");
        resetButton.classList.add("hidden");
        secCounter = 0;
        minCounter = 0;
        centiCounter = 0;
        second.innerHTML = '&nbsp;0 :';
        centiSecond.innerHTML = '&nbsp;0';
        minute.innerHTML = "0 :";
        clearButton.classList.add("hidden");
        lapItem = 0;
      };
    const lap = () => {
      const li = document.createElement("li");
      const number = document.createElement("span");
      const timeStamp = document.createElement("span");

      li.setAttribute("class", "lap-item");
      number.setAttribute("class", "number");
      timeStamp.setAttribute("class", "time-stamp");

      number.innerText = `#${++lapItem}  `;

      const formattedMin = String(minCounter).padStart(2, '0');
      const formattedSec = String(secCounter).padStart(2, '0');
      const formattedCenti = String(centiCounter).padStart(2, '0');

      timeStamp.innerHTML = ` ${formattedMin} : ${formattedSec} : ${formattedCenti}`;

      li.append(number, timeStamp);
      laps.append(li);
      clearButton.classList.remove("hidden");
    };

    const clearAll = () => {
      laps.innerHTML = '';
      laps.append(clearButton);
      clearButton.classList.add("hidden");
      lapItem = 0;
    };

    playButton.addEventListener("click", play);
    resetButton.addEventListener("click", reset);
    lapButton.addEventListener("click", lap);
    clearButton.addEventListener("click", clearAll);