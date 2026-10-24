(function () {
  var host = window.location.hostname;
  var path = window.location.pathname.split("/").filter(Boolean);
  if (!host.endsWith(".github.io") || path.length === 0) return;

  var owner = host.slice(0, -".github.io".length);
  var repository = path[0];
  var issuesURL = "https://github.com/" + owner + "/" + repository + "/issues";

  document.querySelectorAll(".repository-link").forEach(function (link) {
    link.href = issuesURL;
  });
}());

(function () {
  var cards = document.querySelectorAll(".source-card[data-source-url]");
  if (!cards.length) return;

  var toast = document.querySelector(".toast");
  var toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("visible");
    }, 1800);
  }

  cards.forEach(function (card) {
    var sourceURL = card.dataset.sourceUrl;
    var sourceName = card.dataset.sourceName || "直播源";
    var tubo = card.querySelector(".tubo-button");
    var m3uhub = card.querySelector(".m3uhub-button");
    var copy = card.querySelector(".copy-button");

    if (tubo) {
      tubo.href = "tubo://import?url=" + encodeURIComponent(sourceURL)
        + "&name=" + encodeURIComponent(sourceName);
    }
    if (m3uhub) {
      m3uhub.href = "m3uhub://subscribe?url=" + encodeURIComponent(sourceURL);
    }
    if (copy) {
      copy.addEventListener("click", function () {
        navigator.clipboard.writeText(sourceURL).then(function () {
          showToast("直播源地址已复制");
        }).catch(function () {
          window.prompt("请复制直播源地址", sourceURL);
        });
      });
    }
  });
}());
