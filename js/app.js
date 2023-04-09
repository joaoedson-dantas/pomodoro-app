const config = document.getElementById("configIcon");
const btnConfig = document.getElementById("btnSetConfig");
btnConfig.addEventListener("click", activeFunctions);

/* Variáveis Pomodoro */

let cicloDefaut = 4;
let segundos;
let sessoesValue = cicloDefaut;
let titleSection = document.getElementById("titleSection");
let sessoes = document.getElementById("sessoes");

/* Variáveis de áudio */
const audioRegresivo = new Audio("./audio/regresiva.mp3");
const audioBell = new Audio("./audio/audio_bell.mp3");
const audioVolta = new Audio("./audio/audio_volta.mp3");
const audioFinal = new Audio("./audio/audio_final.mp3");

function activeFunctions() {
  /*   setLocal(); */
  startPomdoro();
}
function ativarConfig() {
  const containerRelogio = document.querySelector(".containerRelogio");
  containerRelogio.classList.toggle("none");
  const modalContainer = document.querySelector(".modalContainer");
  modalContainer.classList.toggle("ativo");
}

function setLocal() {
  //localStorage -- Salvar na memória do computador name, valor.
  //Pegando os valores do select acão

  const selectAcao = document.getElementById("ciclo");
  const acaoValue = selectAcao.value;

  //Pegando os valores do select intervalo

  const selectInterval = document.getElementById("intervalCurto");
  const intervalValue = selectInterval.value;

  //Pegando os valores do select intervalo

  const intervalLong = document.getElementById("intervalLong");
  const LongValue = intervalLong.value;
  localStorage.setItem("acao", acaoValue);
  localStorage.setItem("intervalPause", intervalValue);
  localStorage.setItem("longPause", LongValue);
  console.log("Ativo");
}

function startPomdoro() {
  if (localStorage.getItem("acao")) {
    titleSection.innerHTML = "AÇÃO";

    //Verificação inicial

    if (sessoesValue != 1) {
      sessoes.innerHTML = sessoesValue + " sessões restantes";
    } else {
      sessoes.innerHTML = sessoesValue + " sessão restante";
    }

    // CSS do relogio
    const relogioAcao = document.querySelector(".relogioAcao");
    relogioAcao.classList.add("ativo");
    //Relogio
    audioBell.play();
    let min = Number(localStorage.getItem("acao"));
    min = min - 1;
    segundos = 59;
    console.log(localStorage.getItem("acao"));

    // Adicionado os minutos no HTML
    document.getElementById("minutos_ok").innerHTML = min;
    document.getElementById("segundos_ok").innerHTML = segundos;

    let minInterval = setInterval(minTimer, 60000); // A cada 60s ative a função minTimer;
    let segInrterval = setInterval(segTimer, 1000); // A cada 1s ative a function segTimer;

    //Funções que que seram ativadas com o setInteval ==
    console.log(localStorage.getItem("acao"));

    function minTimer() {
      min = min - 1;
      document.getElementById("minutos_ok").innerHTML = min;
    }

    function segTimer() {
      segundos = segundos - 1;
      document.getElementById("segundos_ok").innerHTML = String(
        segundos
      ).padStart(2, 0);
      if (segundos == 10 && min == 0) {
        audioRegresivo.play();
      }

      if (segundos <= 0) {
        if (min <= 0) {
          clearInterval(minInterval);
          clearInterval(segInrterval);
          audioBell.play();

          if (sessoesValue == 1) {
            PausaLonga();
          } else {
            momentoPausa();
          }
        }
        segundos = 60;
      }
    }
  } else {
    setLocal();
    startPomdoro();
  }
}

function momentoPausa() {
  titleSection.innerHTML = "DESCANSO";

  /* Relogio */

  minPausa = Number(localStorage.getItem("intervalPause"));
  minPausa = minPausa - 1;
  segundos = 59;

  // Adicionado os minutos no HTML
  document.getElementById("minutos_ok").innerHTML = minPausa;
  document.getElementById("segundos_ok").innerHTML = segundos;

  let minInterval = setInterval(minTimer, 60000); // A cada 60s ative a função minTimer;
  let segInrterval = setInterval(segTimer, 1000); // A cada 1s ative a function segTimer;

  function minTimer() {
    minPausa = minPausa - 1;
    document.getElementById("minutos_ok").innerHTML = minPausa;
  }

  function segTimer() {
    console.log("Segundos ativo");
    segundos = segundos - 1;
    document.getElementById("segundos_ok").innerHTML = String(
      segundos
    ).padStart(2, 0);
    if (segundos == 10 && min == 0) {
      audioRegresivo.play();
    }
    if (segundos <= 0) {
      if (minPausa <= 0) {
        clearInterval(minInterval);
        clearInterval(segInrterval);
        sessoesValue = sessoesValue - 1;

        startPomdoro();
      }
      segundos = 60;
    }
  }
}

function PausaLonga() {
  // Adicionado as informações no HMTL
  titleSection.innerHTML = "DESCANSO LONGO";
  sessoes.innerHTML = "Aproveite o seu descanso Longo";

  // Pegando o valor da pausa longa e definindo o relogio
  let minPausalonga = Number(localStorage.getItem("longPause"));
  minPausalonga = minPausalonga - 1;
  segundos = 59;

  // Adicionado os minutos no HTML
  document.getElementById("minutos_ok").innerHTML = minPausalonga;
  document.getElementById("segundos_ok").innerHTML = segundos;

  // Definindo o tempo de intervalo
  let minInterval = setInterval(minTimer, 60000); // A cada 60s ative a função minTimer;
  let segInrterval = setInterval(segTimer, 1000); // A cada 1s ative a function segTimer;
  // funcão para difinir os mínutos
  function minTimer() {
    minPausalonga = minPausalonga - 1;
    document.getElementById("minutos_ok").innerHTML = minPausalonga;
  }
  // funcão para difinir os segundos;
  function segTimer() {
    segundos = segundos - 1;
    document.getElementById("segundos_ok").innerHTML = String(
      segundos
    ).padStart(2, 0);
    if (segundos == 10 && min == 0) {
      audioRegresivo.play();
    }
    if (segundos <= 0) {
      if (minPausalonga <= 0) {
        clearInterval(minInterval);
        clearInterval(segInrterval);
        sessoesValue = sessoesValue - 1;
        if (sessoesValue <= 0) {
          localStorage.clear();
          audioFinal.play();
          // Alterando o HTML para o final.
          const titleSection = document.getElementById("titleSection");
          titleSection.innerHTML = "FIM!";
          titleSection.classList.add("ativo");

          const sessoes = document.getElementById("sessoes");
          sessoes.innerHTML = "Parabéns! Você finalizou suas tarefas.";
          sessoes.classList.add("ativo");

          const timerClicle = document.querySelector(".timerCicle");
          timerClicle.classList.add("ativo");
        }
      }
      segundos = 60;
    }
  }
}
