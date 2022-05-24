(function () {

  function getVariant(){
    const url = new URL(window.location.href);
    const params = url.searchParams;
    return params.get("variant");
  }

  async function submitFavorite(handle, variant, customerId) {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        handle: handle,
        variant: variant,
        customerId: customerId,
      }),
    };
    return await fetch("/tools/jreview/api/addFavorite", fetchOptions);
  }

  async function initFavorite({ target }) {
    if (!target.dataset.customerId) {
      if (confirm(target.dataset.alert)) {
        location.href = `/account/login?checkout_url=${window.location.pathname}`;
      }
      return;
    }

    target.disabled = true;
    target.innerText = target.dataset.sending

    const variant = getVariant() || target.dataset.defaultVariantId;

    await submitFavorite(target.dataset.handle, variant, target.dataset.customerId);

    target.style.display = "none";
    const existsMessage = document.getElementById("mxpr-already-exists");
    existsMessage.style.display = "none";
    const message = document.getElementById("mxpr-complete-message");
    message.style.display = "block";

  }

  const buttons = document.getElementsByClassName("mxpr-favorites-button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", initFavorite);
  }
})();
