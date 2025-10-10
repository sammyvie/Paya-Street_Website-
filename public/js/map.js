//map centered in Philippines
var map = L.map('map').setView([12.8797, 121.7740], 6);

//OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

// Most Paya Street branches across the Philippines
var branches = [
  { name: "Paya Street - Angeles, Pampanga", coords: [15.1525, 120.5887] },
  { name: "Paya Street - San Fernando, Pampanga", coords: [15.0333, 120.6844] },
  { name: "Paya Street - Quezon City", coords: [14.6760, 121.0437] },
  { name: "Paya Street - Makati City", coords: [14.5547, 121.0244] },
  { name: "Paya Street - Taguig (BGC)", coords: [14.5243, 121.0792] },
  { name: "Paya Street - Pasig City", coords: [14.5735, 121.0851] },
  { name: "Paya Street - Cebu City", coords: [10.3157, 123.8854] },
  { name: "Paya Street - Davao City", coords: [7.1907, 125.4553] },
  { name: "Paya Street - Baguio City", coords: [16.4023, 120.5960] },
  { name: "Paya Street - Iloilo City", coords: [10.7202, 122.5621] },
  { name: "Paya Street - Cagayan de Oro", coords: [8.4542, 124.6319] },
  { name: "Paya Street - Bacolod City", coords: [10.6765, 122.9509] },
  { name: "Paya Street - General Santos", coords: [6.1164, 125.1716] }
];

//interactive markers
branches.forEach(branch => {
  const marker = L.marker(branch.coords).addTo(map);

  //clickable links direction
  const directionsHTML = `
    <b>${branch.name}</b><br>
    <a href="https://www.google.com/maps/dir/?api=1&destination=${branch.coords[0]},${branch.coords[1]}"
       target="_blank"
       style="color:#0078ff;text-decoration:underline;">
       Get Directions
    </a>
  `;
  marker.bindPopup(directionsHTML);
});

//auto zoom 
var group = new L.featureGroup(branches.map(b => L.marker(b.coords)));
map.fitBounds(group.getBounds(), { padding: [40, 40] });

//mobile navigation menu
const menuToggle = document.createElement('div');
menuToggle.classList.add('menu-toggle');
menuToggle.innerHTML = '☰';
document.querySelector('.navbar').prepend(menuToggle);

menuToggle.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// search control
L.Control.geocoder({
  defaultMarkGeocode: false
})
.on('markgeocode', function(e) {
  var latlng = e.geocode.center;
  L.marker(latlng).addTo(map)
    .bindPopup(`<b>${e.geocode.name}</b>`)
    .openPopup();
  map.setView(latlng, 13);
})
.addTo(map);