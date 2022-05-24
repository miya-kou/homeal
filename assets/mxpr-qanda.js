(function () {

  function showOther({target}){
    const faqId = target.dataset.faqId;
    const targetClassName = `mxpr-qanda-content-answer-${faqId}`;
    const targetNodes = document.getElementsByClassName(targetClassName);
    for (let i = 0; i < targetNodes.length; i++) {
      targetNodes[i].classList.remove("mxpr-answer-hidden");
    }
    target.style.display = "none";
  }

  async function vote(target, add){
    const faqId = target.dataset.faqId;
    const voteCountElement = document.getElementById(`mxpr-qanda-vote-count-${faqId}`) ;
    let currentNum = Number(voteCountElement.innerText || 0);
    currentNum = currentNum + add;
    voteCountElement.innerText = currentNum;
    const buttons = document.getElementsByClassName(`mxpr-qanda-button-${faqId}`);
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
      buttons[i].style.cursor = "default";
    }
    const postData = {
      id: faqId,
      plus: add
    };
    const res = await fetch("/tools/jreview/api/executeVote", {
      method: "POST",
      headers: {
        Accept: "application/json, */*",
        "Content-type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const message = document.getElementById(`mxpr-qanda-content-thankyou-${faqId}`);
    message.style.display = "block";
  }

  function votePlus({target}){
    vote(target, 1);
  }

  function voteMinus({target}){
    vote(target, -1);
  }


  const buttons = document.getElementsByClassName("mxpr-qanda-content-answer-show-other");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", showOther);
  }

  const plusButtons = document.getElementsByClassName("mxpr-qanda-button-plus");
  for (let i = 0; i < plusButtons.length; i++) {
    plusButtons[i].addEventListener("click", votePlus);
  }
  const minusButtons = document.getElementsByClassName("mxpr-qanda-button-minus");
  for (let i = 0; i < minusButtons.length; i++) {
    minusButtons[i].addEventListener("click", voteMinus);
  }
})();
