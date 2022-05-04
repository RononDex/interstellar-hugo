$(function () {
  if (
    window.functionsAfterDocumentReady &&
    window.functionsAfterDocumentReady !== undefined
  ) {
    for (var i = 0; i < functionsAfterDocumentReady.length; i++) {
      functionsAfterDocumentReady[i]();
    }
  }

  MakeImagePostsClickable();
});


function MakeImagePostsClickable() {
  $(".img-post-entry").each(function (t) {
    $(this).attr("style", "cursor: pointer;");

    $(this).click(function () {
      var postPermalink = $(this).find("a.permalink").attr("href");
      window.location = postPermalink;
    });
  });
}
