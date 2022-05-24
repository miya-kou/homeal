// script is loaded with product-reviews.liquid block
// it is responsible for dynamically creating new review form
(function () {
  function selectElement(selector, node) {
    return (node || document).querySelector(selector);
  }

  function submitReview(productId, customerId) {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review: {
          productId: productId,
          rating: selectElement("#mxpr-form__rating").value,
          name: selectElement("#mxpr-form__name").value,
          customerId: customerId,
          title: selectElement("#mxpr-form__title").value,
          body: selectElement("#mxpr-form__body").value,
        },
      }),
    };

    return fetch("/tools/jreview/api/postReview", fetchOptions);
  }

  // 入力チェック。エラーの場合は true を返す
  function checkInput() {
    const review = {
      name: selectElement("#mxpr-form__name").value,
      title: selectElement("#mxpr-form__title").value,
      body: selectElement("#mxpr-form__body").value,
    };
    const alerts = document.getElementsByClassName("mxpr-form-alert-message");
    for (let i = 0; i < alerts.length; i++) {
      alerts[i].style.display = "none";
    }
    if (!review.name) {
      document.getElementById("mxpr-form__name-alert").style.display = "block";
    } else if (!review.title) {
      document.getElementById("mxpr-form__title-alert").style.display = "block";
    } else if (!review.body) {
      document.getElementById("mxpr-form__body-alert").style.display = "block";
    } else if (review.body.length < 5) {
      document.getElementById("mxpr-form__body-alert-short").style.display = "block";
    } else if (review.body.length > 4000) {
      document.getElementById("mxpr-form__body-alert-long").style.display = "block";
    } else {
      return false;
    }
    return true;
  }

  function initWriteReview({ target }) {
    const rootBlock = target.closest(".mxpr-block[data-product-id]");
    const { productId, customerId } = rootBlock.dataset;
    if (!customerId) {
      if (confirm(target.dataset.alert)) {
        location.href = `/account/login?checkout_url=${window.location.pathname}`;
      }
      return;
    }
    const el = target.parentNode.classList.contains(
      "mxpr-summary__no-reviews"
    )
      ? target.parentNode
      : target;
    el.parentNode.removeChild(el);

    const form = document.getElementById("mxpr-product-reviews-form");
    form.style.display = "block";

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (checkInput()) {
        return;
      }

      const submitButton = document.getElementById("mxpr-form-submit-button");
      submitButton.disabled = true;
      submitButton.textContent = submitButton.dataset.sending;
      submitButton.classList.add("mxpr-form__submit--loading");

      const result = await submitReview(productId, customerId);

      event.target.parentNode.removeChild(event.target);

      if(result.status === 200){
        const thankyou = document.getElementById("mxpr-form-message-thankyou");
        thankyou.style.display = "block";
      }else{
        const errorMessage = document.getElementById("mxpr-form-message-error");
        errorMessage.style.display = "block";
      }

    });

  }

  document.querySelector(".mxpr-summary__write-review").addEventListener("click", initWriteReview);
})();
