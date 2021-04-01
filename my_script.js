mapboxgl.accessToken = YOUR_ACCESS_TOKEN; //take care not to expose this publicly!

myToken = mapboxgl.accessToken;

var map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-98.35, 39.50], // starting position [lng, lat], geographic center of contiguous US
  zoom: 3 // starting zoom
});

function addMarker(event) {
  let location = document.getElementById('mb-gc').value;
  if (location!="") {
    fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?limit=2&access_token=' + myToken)
  .then(response => response.json())
  .then(data => {
    console.log(data); // optional sanity check
    var marker = new mapboxgl.Marker()
      .setLngLat([data.features[0].center[0], data.features[0].center[1]])
      .addTo(map);
    });
  } else {
    event.preventDefault();
  }  
}

const btn = document.getElementById('add-marker').addEventListener('click', addMarker, false);
