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
