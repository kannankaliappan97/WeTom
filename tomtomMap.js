// Define your product name and version
tomtom.setProductInfo('Codepen Examples', '4.37.1');
var trafficFlowOptions = {
    key: 'wmvifwPgZH15AYpBjS6OAVCyfKGi5ryP',
    style: 'relative'
};
var vectorTrafficFlowOptions = {
    key: 'wmvifwPgZH15AYpBjS6OAVCyfKGi5ryP',
    refresh: 180000,
    basePath: 'https://api.tomtom.com/maps-sdk-js/4.37.1/examples/sdk',
    style: 'relative'
};
var map = tomtom.map('map', {
    key: 'YblwQ08gCsd29GA8T28K8wmVDmYXylxD',
    source: ['vector', 'raster'],
    basePath: 'https://api.tomtom.com/maps-sdk-js/4.37.1/examples/sdk',
    vectorTrafficFlow: vectorTrafficFlowOptions,
    center: [51.50276, -0.12634],
    zoom: 15
});
var languageLabel = L.DomUtil.create('label');
languageLabel.innerHTML = 'Maps language';
var languageSelector = tomtom.languageSelector.getHtmlElement(tomtom.globalLocaleService, 'maps');
languageLabel.appendChild(languageSelector);
var languageWarning = L.DomUtil.create('label', 'warning');
languageWarning.innerHTML = 'Language selection is only possible for vector map tiles.';
tomtom.controlPanel({
    position: 'bottomright',
    title: 'Settings',
    collapsed: true,
    closeOnMapClick: false
})
    .addTo(map)
    .addContent(languageLabel)
    .addContent(languageWarning);
tomtom.controlPanel({
    position: 'topright',
    title: null,
    show: null,
    close: null,
    collapsed: false,
    closeOnMapClick: false
})
    .addTo(map)
    .addContent(document.getElementById('map').nextElementSibling);
function isFlowLayer(name) {
    return name.toLowerCase().indexOf('flow') >= 0;
}
function isVectorLayer(name) {
    return name.toLowerCase().indexOf('vector') >= 0;
}
function updateTrafficFlowStyle() {
    var selectedOption = this.value;
    vectorTrafficFlowOptions.style = selectedOption;
    trafficFlowOptions.style = selectedOption;
    map.eachLayer(function(layer) {
        if (!isFlowLayer(layer.name)) {
            return;
        }
        if (isVectorLayer(layer.name)) {
            layer.updateOptions({style: selectedOption});
        } else {
            layer.options.style = selectedOption;
            layer.redraw();
        }
    });
}
var trafficLayer = L.MapUtils.findLayersByName('vectorTrafficFlow', map)[0];
function updateBaseLayer() {
    map.setMapSource(this.value);
    if (this.value === 'vector') {
        languageLabel.classList.remove('disabled');
        languageSelector.disabled = false;
    } else if (this.value === 'raster') {
        languageLabel.classList.add('disabled');
        languageSelector.disabled = true;
    }
    if (trafficLayer) {
        trafficLayer.bringToFront();
    }
}
function createTrafficLayer(name) {
    switch (name) {
    case 'vectorTrafficFlow':
        return new L.TomTomVectorTrafficFlowLayer(vectorTrafficFlowOptions);
    case 'trafficFlow':
        return new L.TomTomTrafficFlowLayer(trafficFlowOptions);
    default:
        return null;
    }
}
function switchTraffic(event) {
    var layerName = event.target.value;
    map.removeLayer(trafficLayer);
    trafficLayer = createTrafficLayer(layerName);
    map.addLayer(trafficLayer);
    if (trafficLayer) {
        trafficLayer.bringToFront();
    }
}
document.getElementById('trafficStyle').onchange = updateTrafficFlowStyle;
document.getElementById('baseLayer').onchange = updateBaseLayer;
document.getElementById('trafficLayer').onchange = switchTraffic;
(function initializeTileSwitcher() {
    var baseLayerSelect = document.getElementById('baseLayer');
    var layers = map.getBaseLayers();
    function newOption(value, label, selected) {
        var option = document.createElement('option');
        option.value = value;
        option.text = label;
        if (selected) {
            option.selected = 'selected';
        }
        return option;
    }
    if (layers.raster) {
        baseLayerSelect.appendChild(newOption('raster', 'Raster'));
    }
    if (layers.vector) {
        baseLayerSelect.appendChild(newOption('vector', 'Vector', true));
    }
})();
