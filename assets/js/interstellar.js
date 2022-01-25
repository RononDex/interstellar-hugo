$(function () {
  if (window.functionsAfterDocumentReady && window.functionsAfterDocumentReady !== undefined) {
    for (var i = 0; i < functionsAfterDocumentReady.length; i++) {
      functionsAfterDocumentReady[i]();
    }
  }

  MakeImagePostsClickable();
});

function addSvgOverlayToOpenSeadragonViewer(svgPath, viewer) {
  var overlay = viewer.svgOverlay();

  function _loadSVG(svgPath, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function (e) {
      try {
        if (xhr.readyState == 4 && xhr.status == 200) {
          callback(xhr.responseXML.documentElement);
        }
      } catch (e) {
        console.log(e);
      }
    };
    //
    xhr.open("GET", svgPath, true);
    xhr.overrideMimeType("text/xml");
    xhr.responseType = "document";
    xhr.send();
  }

  _loadSVG(svgPath, function (data) {
    var gArray = $(data).find("g");
    var viewBox = data.getAttribute("viewBox");
    var width = parseInt(viewBox.split(" ")[2]);

    var scaleFactor = 1 / width;

    for (var i = 0; i < gArray.length; i++) {
      gArray[i].setAttribute("transform", "scale(" + scaleFactor + ")");
      overlay.node().appendChild(gArray[i]);
      //var nestedObjects = $(gArray[i]).find("g");
      //for (var j = 0; j < nestedObjects.length; j++)
      //{
      //  overlay.node().appendChild(nestedObjects[j]);
      //}
    }
  });
}

function MakeImagePostsClickable() {
    $(".img-post-entry").each(function(t) {

        $(this).attr("style", "cursor: pointer;");

        $(this).click(function() { 
            var postPermalink = $(this).find("a.permalink").attr("href");
            window.location = postPermalink;
        })
    });
}
