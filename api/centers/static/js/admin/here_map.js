(function($) {
  console.log("this was touched");
  // We'll insert the map after this element:
  let prev_el_selector = "#id_lng";

  // The input elements we'll put lat/lon into and use to set the map's initial lat/lon.
  let lat_input_selector = "#id_lat";
  let lon_input_selector = "#id_lng";

  // The input elements we'll put the address string and country code into.
  let street_input_selector = "#id_street_name";
  let street_number_input_selector = "#id_street_number"
  let locality_input_selector = "#id_locality";

  // Initial zoom level for the map.
  let initial_zoom = 12;

  // Initial zoom level if input fields have a location.
  let initial_with_loc_zoom = 18;
  let initial_lat = 44.4268;
  let initial_lon = 26.1025;
  let is_view_testing_center_change_form = false;

  function addDraggableMarker(map, behavior, lat, lng) {
    let marker = new H.map.Marker({lat:lat, lng:lng}, {
      // mark the object as volatile for the smooth dragging
      volatility: true
    });
    // Ensure that the marker can receive drag events
    marker.draggable = true;
    map.addObject(marker);

    // disable the default draggability of the underlying map
    // and calculate the offset between mouse and target's position
    // when starting to drag a marker object:
    map.addEventListener('dragstart', function(ev) {
      let target = ev.target;
      let pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        let targetPosition = map.geoToScreen(target.getGeometry());
        target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
        behavior.disable();
      }
    }, false);

    map.addEventListener('dragend', function(ev) {
      let target = ev.target;
      if (target instanceof H.map.Marker) {
        // update the lat and long input fields with the marker's new coordinates
        let new_lat = Number.parseFloat(marker.getGeometry().lat).toFixed(4);
        let new_lng = Number.parseFloat(marker.getGeometry().lng).toFixed(4);

        $(lat_input_selector).val(new_lat);
        $(lon_input_selector).val(new_lng);

        // re-enable the default draggability of the underlying map
        // when dragging has completed
        behavior.enable();
      }
    }, false);

    // Listen to the drag event and move the position of the marker
    // as necessary
     map.addEventListener('drag', function(ev) {
      let target = ev.target;
      let pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
      }
    }, false);
  }

  function chooseCorrectAddress(items) {
    let items_w_distance = items.map((item) => {
        const startPoint = new H.geo.Point(initial_lat, initial_lon);
        const endPoint = new H.geo.Point(item.position.lat, item.position.lng);

        return {
            ...item,
            distance: startPoint.distance(endPoint)
        }
    })
    let min = Math.min(...items_w_distance.map(item => item.distance));
    return items_w_distance.filter(item => item.distance === min)
  }

  function initMap() {
     let mapConfig =
      typeof here_map_config !== "undefined"
        ? here_map_config
        : false;

     let platform = new H.service.Platform({
        'apikey': mapConfig.api_key
     });
     let defaultLayers = platform.createDefaultLayers();
     let service = platform.getSearchService();
     let $prevEl = $(prev_el_selector);
     if ($prevEl.length === 0) {
        // Can't find where to put the map.
        console.error("Can't find where to insert the map element");
        return;
     }

     $prevEl.after($('<div class="setloc-map js-setloc-map" id="map-container"></div>'));

     let $lat = $(lat_input_selector);
     let $lon = $(lon_input_selector);
     let street = $(street_input_selector).val();
     let streetNumber = parseFloat($(street_number_input_selector).val());
     let city = $(locality_input_selector).val();

     let has_initial_loc = $lat.val() && $lon.val();

     if (has_initial_loc) {
         console.log("this was touched2");

        // There is lat/lon in the fields, so centre the map on that.
          initial_lat = parseFloat($lat.val());
          initial_lon = parseFloat($lon.val());
          initial_zoom = initial_with_loc_zoom;
     }

     $(lat_input_selector).val(initial_lat);
     $(lon_input_selector).val(initial_lon);

     map = new H.Map(document.getElementById('map-container'),
       defaultLayers.vector.normal.map, {
         center: { lat: initial_lat, lng: initial_lon },
         zoom: initial_zoom
       });

     window.addEventListener('resize', () => map.getViewPort().resize());
     let ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');
     let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

     if (!has_initial_loc) {
         console.log("this was touched3");

        // Get an instance of the geocoding service:
        service.geocode({
          q: `${streetNumber} ${street} ${city}`
        }, (result) => {
          let filtered_items = chooseCorrectAddress(result.items);

          filtered_items.forEach((item) => {
            addDraggableMarker(map, behavior, item.position.lat, item.position.lng);
          });
        });
     } else {
         console.log("this was touched4");

        addDraggableMarker(map, behavior, initial_lat, initial_lon);
     }
  }

  $(document).ready(function() {
      is_view_testing_center_change_form = $("#testingcenter_form").length

      if (is_view_testing_center_change_form > 0) {
          initMap();
      }
  });
})(django.jQuery);
