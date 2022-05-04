class AstroImageViewer {
  number = 1;
  displayAnnotationBtn = false;
  container = "";
  folderPath = "";
  viewer = null;

  constructor(container, number, displayAnnotationBtn, folderPath) {
    this.number = number;
    this.displayAnnotationBtn = displayAnnotationBtn;
    this.container = container;
    this.folderPath = folderPath;

    this.injectHtml();

    this.initViewer();
  }

  injectHtml() {
    var annotationButton = "";
    if (this.displayAnnotationBtn) {
      annotationButton =
        "			<div" +
        "				id='annotations-btn{{number}}'" +
        "				class='annotations-btn seadragonButton'>" +
        "				<img src='/images/annotations-icon.webp' />" +
        "			</div>";
    }
    var html =
      "		<div class='zoomableImage'>" +
      "		<h4>Zoomable, full-resolution image:</h4>" +
      "			<div class='hoverwrap'>" +
      "				<div" +
      "					class='hovercap'" +
      "					data-toggle='modal'" +
      "				    data-target='#zoomableImageDialog{{number}}'>" +
      "					Click me" +
      "				</div>" +
      "				<img src='{{folderPath}}/thumb.webp' />" +
      "			</div>" +
      "		</div>" +
      "		<div" +
      "			class='modal fade modal-fullscreen'" +
      "			id='zoomableImageDialog{{number}}'" +
      "			class='zoomableImageDialog'" +
      "			tabindex='-1'" +
      "			aria-labelledby='zoomableImage'" +
      "			aria-hidden='true'>" +
      "			<div class='modal-dialog'>" +
      "				<div class='modal-content'>" +
      "					<div class='modal-header'>" +
      "						<button" +
      "							type='button'" +
      "							class='close'" +
      "							data-dismiss='modal'" +
      "							aria-label='Close'>" +
      "							<span aria-hidden='true'>&times;</span>" +
      "						</button>" +
      "					</div>" +
      "					<div class='modal-body'>" +
      "						<div class='seadragonToolbarDiv' id='seadragonToolbarDiv{{number}}'>" +
      "							<div id='zoom-in-btn{{number}}' class='seadragonButton'>" +
      "								<img src='/plugins/openseadragon/images/zoomin_rest.png' />" +
       "							</div>" +
      "							<div id='zoom-out-btn{{number}}' class='seadragonButton'>" +
      "								<img src='/plugins/openseadragon/images/zoomout_rest.png' />" +
      "							</div>" +
      "							{{annotationButton}}" +
      "							<div id='home-btn{{number}}' class='home-btn seadragonButton'>" +
      "								<img src='/plugins/openseadragon/images/home_rest.png' />" +
      "							</div>" +
      "							<div id='full-page-btn{{number}}' class='full-page-btn seadragonButton'>" +
      "								<img src='/plugins/openseadragon/images/fullpage_rest.png' />" +
      "							</div>" +
      "						</div>" +
      "						<div class='zoomPercentDisplay' id='zoomPercentDisplay{{number}}'></div>" +
      "						<div class='zoomableImageDisplay' id='zoomableImageDisplay{{number}}'></div>" +
      "					</div>" +
      "				</div>" +
      "			</div>" +
      "		</div>";

    html = html
      .replaceAll("{{number}}", this.number)
      .replaceAll("{{folderPath}}", this.folderPath)
      .replaceAll("{{annotationButton}}", annotationButton);

    $(this.container).append(html);

    // Add event handlers
    $(this.container).on("click", ".annotations-btn", function() { this.toggleSvgOverlay() }.bind(this));
  }

  initViewer() {
    this.viewer = OpenSeadragon({
      id: "zoomableImageDisplay" + this.number,
      autoHideControls: false,
      imageSmoothingEnabled: false,
      showNavigator: false,
      defaultZoomLevel: 0,
      toolbar: "seadragonToolbarDiv" + this.number,
      zoomInButton: "zoom-in-btn" + this.number,
      zoomOutButton: "zoom-out-btn" + this.number,
      homeButton: "home-btn" + this.number,
      fullPageButton: "full-page-btn" + this.number,
      prefixUrl: "/plugins/openseadragon/images/",
      visibilityRatio: 0.9,
      tileSources: this.folderPath + "/tiled_photo.dzi",
    });

    this.addZoomDisplay(this.viewer);
  }

  svgOverlayActive = false;

  toggleSvgOverlay() {
    if (this.svgOverlayActive) {
      var overlay = this.viewer.svgOverlay();
      var node = overlay.node();
      while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
      }
      this.svgOverlayActive = false;
    } else {
      this.addSvgOverlayToOpenSeadragonViewer(
        this.folderPath + "/annotations.svg"
      );
      this.svgOverlayActive = true;
    }
  }

  addZoomDisplay() {
    this.viewer.addHandler(
      "resize",
      function () {
        this.updatePercentageZoom();
      }.bind(this)
    );
    this.viewer.addHandler(
      "animation",
      function () {
        this.updatePercentageZoom();
      }.bind(this)
    );
    this.viewer.addHandler(
      "open",
      function () {
        this.updatePercentageZoom();
      }.bind(this)
    );
  }

  addSvgOverlayToOpenSeadragonViewer(svgPath) {
    var overlay = this.viewer.svgOverlay();

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

  updatePercentageZoom() {
    var tiledImage = this.viewer.world.getItemAt(0);
    var originalZoom =
      tiledImage.source.dimensions.x /
      this.viewer.viewport.getContainerSize().x;
    var currentZoom = this.viewer.viewport.getZoom();

    var zoomInPercent = (currentZoom / originalZoom) * 100;
    $("#zoomPercentDisplay" + this.number).html(
      "Zoom: " + Math.round(zoomInPercent) + "%"
    );
  }
}
