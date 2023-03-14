const config = document.getElementById("configIcon");
const btnConfig = document.getElementById("btnSetConfig");
btnConfig.addEventListener("click", activeFunctions);

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

/* Variáveis Pomodoro */

let cicloDefaut = 4;
let segundos;
let sessoesValue = cicloDefaut;
let titleSection = document.getElementById("titleSection");

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
    let sessoes = document.getElementById("sessoes");
    if (sessoes != 1) {
      sessoes.innerHTML = sessoesValue + " sessões restantes";
    } else {
      sessoesValue + " sessão restante";
    }
    //Relogio

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
      console.log("Segundo ativo");
      segundos = segundos - 1;
      document.getElementById("segundos_ok").innerHTML = segundos;
      if (segundos <= 0) {
        if (min <= 0) {
          clearInterval(minInterval);
          clearInterval(segInrterval);
          momentoPausa();
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
  sessoesValue.innerHTML = "Aproveite a sua pausa!";

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
    document.getElementById("segundos_ok").innerHTML = segundos;
    if (segundos <= 0) {
      if (minPausa <= 0) {
        clearInterval(minInterval);
        clearInterval(segInrterval);
        sessoesValue = sessoesValue - 1;

        if (sessoesValue <= 0) {
          localStorage.clear();
          document.getElementById("titleSection").innerHTML = "FIM!";
          document.getElementById("sessoes").innerHTML =
            "Parabéns! Você finalizou suas tarefas.";
        } else {
          startPomdoro();
        }
      }
      segundos = 60;
    }
  }
}
