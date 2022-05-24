(function () {
  async function executeHelpful({ target }) {
    if (!target.dataset.customerId) {
      if (confirm(target.dataset.alert)) {
        location.href = `/account/login?checkout_url=${window.location.pathname}`;
      }
      return;
    }
    target.innerText = target.dataset.sending;
    target.style.cursor = "default";
    target.disabled = true;
    const postData = {
      id: target.dataset.reviewId,
      customerId: target.dataset.customerId,
    };
    const res = await fetch("/tools/jreview/api/executeHelpful", {
      method: "POST",
      headers: {
        Accept: "application/json, */*",
        "Content-type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    // 
    target.style.display = "none";
    const message = document.createElement("div");
    message.classList.add("mxpr-helpful-message");
    message.innerText = target.dataset.thankyou;
    target.parentNode.parentNode.parentNode.append(message);
    const countSpan = document.getElementById(
      `mxpr-helpful-count-${target.dataset.reviewId}`
    );
    if (countSpan) {
      const count = Number(countSpan.innerText) || 0;
      countSpan.innerText = String(count + 1);
    }
  }

  const buttons = document.getElementsByClassName(
    "mxpr-review__list-item-votes-button"
  );
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", executeHelpful);
  }

  function getReviewItem(review) {
    const listItem = document.querySelector(".mxpr-review__list-item").cloneNode(true);
    const helpfulMessage = listItem.querySelector(".mxpr-helpful-message");
    if(helpfulMessage){
      helpfulMessage.remove();
    }
    listItem.querySelector(".mxpr-review__list-item-icon").innerText = review.name.slice(0, 1);
    listItem.querySelector(".mxpr-review__list-item-name").innerText = review.name;
    const width = (Number(review.rating) * 100) / 5;
    listItem.querySelector(".star-ratings-css-top").style.width = `${width}%`;
    listItem.querySelector(".mxpr-review__list-item-meta-title").innerText = review.title;
    listItem.querySelector(".mxpr-review__list-item-createdat").innerText = Intl.DateTimeFormat(navigator.language, { dateStyle: "long", timeStyle: "short", }).format(new Date(review.createdAt));
    listItem.querySelector(".mxpr-review__list-item-body > p").innerHTML = review.body;
    const replyDiv = listItem.querySelector(".mxpr-review__list-item-reply");
    if (review.reply?.body) {  // レビューあり
      if (replyDiv.classList.contains("mxpr-review__list-item-reply-hidden")) {
        replyDiv.classList.remove("mxpr-review__list-item-reply-hidden");
      }
    } else {  // レビューなし
      if (!replyDiv.classList.contains("mxpr-review__list-item-reply-hidden")) {
        replyDiv.classList.add("mxpr-review__list-item-reply-hidden");
      }
    }
    const replyNameDiv = listItem.querySelector(".mxpr-review__list-item-reply-name");
    if (review.reply?.name) { // 名前あり
      if (replyNameDiv.classList.contains("mxpr-review__list-item-reply-name-hidden")) {
        replyNameDiv.classList.remove("mxpr-review__list-item-reply-name-hidden");
      }
    } else {// 名前なし
      if (!replyNameDiv.classList.contains("mxpr-review__list-item-reply-name-hidden")) {
        replyNameDiv.classList.add("mxpr-review__list-item-reply-name-hidden");
      }
    }
    const bestReviewDiv = listItem.querySelector(".mxpr-review__list-item-top-review");
    if (review.priority > 0) {
      // ベストレビュー
      if (bestReviewDiv.classList.contains("mxpr-review__list-item-top-review-hidden")) {
        bestReviewDiv.classList.remove("mxpr-review__list-item-top-review-hidden");
      }
    } else {
      if (!bestReviewDiv.classList.contains("mxpr-review__list-item-top-review-hidden")) {
        bestReviewDiv.classList.add("mxpr-review__list-item-top-review-hidden");
      }
    }
    listItem.querySelector(".mxpr-review__list-item-reply-name").innerText = review.reply?.name;
    listItem.querySelector(".mxpr-review__list-item-reply-body").innerHTML = review.reply?.body;
    listItem.querySelector(".mxpr-review__list-item-votes-message > span").id = `mxpr-helpful-count-${review.id}`;
    listItem.querySelector(".mxpr-review__list-item-votes-message > span").innerText = Number(review.helpful || 0);
    const helpfulButton = listItem.querySelector(".mxpr-review__list-item-votes-button");
    helpfulButton.dataset.reviewId = review.id;
    helpfulButton.addEventListener("click", executeHelpful);
    return listItem;
  }

  async function loadMore({ target }) {
    const loader = document.getElementById("mxpr-loader");
    loader.style.display = "block";
    target.style.display = "none";
    const rootBlock = target.closest(".mxpr-block[data-product-id]");
    const { productId, limit } = rootBlock.dataset;
    const { page } = target.dataset;

    const postData = {
      conditions: {
        productId: productId,
        published: true
      },
      limit: Number(limit),
      offset: Number(limit) * Number(page),
    };
    const orderSelect = document.getElementById("mxpr-summary__order-select");
    if (orderSelect.value) {
      const [orderType, sortDirection] = orderSelect.value.split("-");
      postData.order = [orderType, sortDirection];
    } else {
      postData.order = ["priority", "desc"];
    }
    const res = await fetch("/tools/jreview/api/getReviews", {
      method: "POST",
      headers: {
        Accept: "application/json, */*",
        "Content-type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const result = await res.json();
    const { reviews, hasNext, hasPrevious } = result;
    const ul = document.querySelector(".mxpr-review__list");
    reviews.forEach((review) => {
      const listItem = getReviewItem(review);
      ul.appendChild(listItem);
    });
    loader.style.display = "none";
    if (hasNext) {
      target.dataset.page = String(Number(page) + 1);
    } else {
      const loadMore = document.getElementById("mxpr-review__load-more");
      loadMore.classList.add("mxpr-review__has-not-next");
    }
    target.style.display = "inline-block";
  }

  const button = document.getElementById("mxpr-review__load-more-button");
  if (button) {
    button.addEventListener("click", loadMore);
  }

  async function sortChange({ target }) {
    const loadMore = document.getElementById("mxpr-review__load-more");
    if (loadMore) {
      if (loadMore.classList.contains("mxpr-review__has-not-next")) {
        loadMore.classList.remove("mxpr-review__has-not-next");
      }
    }

    const loader = document.getElementById("mxpr-loader");
    loader.style.display = "block";
    const loadMoreButton = document.getElementById("mxpr-review__load-more-button");
    loadMoreButton.style.display = "none";
    const ul = document.querySelector(".mxpr-review__list");
    const cloneUl = ul.cloneNode(false);
    ul.style.display = "none";
    const rootBlock = target.closest(".mxpr-block[data-product-id]");
    const { productId, limit } = rootBlock.dataset;

    const postData = {
      conditions: {
        productId: productId,
        published: true
      },
      limit: Number(limit),
      offset: 0,
    };
    if (target.value) {
      const [orderType, sortDirection] = target.value.split("-");
      postData.order = [orderType, sortDirection];
    } else {
      postData.order = ["priority", "desc"];
    }
    const res = await fetch("/tools/jreview/api/getReviews", {
      method: "POST",
      headers: {
        Accept: "application/json, */*",
        "Content-type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const result = await res.json();
    const { reviews, hasNext, hasPrevious } = result;
    reviews.forEach((review) => {
      const listItem = getReviewItem(review);
      cloneUl.appendChild(listItem);
    });

    loader.style.display = "none";
    if (hasNext) {
      loadMoreButton.dataset.page = "1";
    } else {
      if (!loadMore.classList.contains("mxpr-review__has-not-next")) {
        loadMore.classList.add("mxpr-review__has-not-next");
      }
    }
    loadMoreButton.style.display = "inline-block";
    ul.parentNode.replaceChild(cloneUl, ul);
  }

  // 並べ替え
  const select = document.getElementById("mxpr-summary__order-select");
  if (select) {
    select.addEventListener("change", sortChange);
  }

})();
