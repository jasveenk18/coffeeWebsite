// Sample Data of Coffee Shops
const coffeeShops = [
    {
      name: "Cafe Delhi Heights",
      address: "Connaught Place, Delhi",
      pincode: "110001",
      instagram: "@cafedelhiheights",
      ratingZomato: 4.5,
      ratingSwiggy: 4.6,
      priceRange: "₹₹",
      menu: "Coffee, Sandwich, Pasta",
      lat: 28.6328,
      lng: 77.2197
    },
    {
      name: "Blue Tokai",
      address: "Saket, Delhi",
      pincode: "110017",
      instagram: "@bluetokaicoffee",
      ratingZomato: 4.3,
      ratingSwiggy: 4.4,
      priceRange: "₹₹₹",
      menu: "Espresso, Muffins, Tea",
      lat: 28.5245,
      lng: 77.2066
    },
    {
      name: "Perch Wine & Coffee Bar",
      address: "Khan Market, Delhi",
      pincode: "110003",
      instagram: "@perchwinecoffee",
      ratingZomato: 4.2,
      ratingSwiggy: 4.1,
      priceRange: "₹₹₹",
      menu: "Coffee, Wine, Bruschetta",
      lat: 28.6002,
      lng: 77.2270
    }
  ];
  
  // Initialize Map
  const map = L.map('map').setView([28.6139, 77.2090], 12);
  
  // Add Tile Layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  
  // Add Coffee Shops Markers
  coffeeShops.forEach(shop => {
    L.marker([shop.lat, shop.lng])
      .addTo(map)
      .bindPopup(`<b>${shop.name}</b><br>${shop.address}<br>${shop.instagram}<br>Zomato: ${shop.ratingZomato} ⭐ | Swiggy: ${shop.ratingSwiggy} ⭐<br>Price: ${shop.priceRange}<br>Menu: ${shop.menu}`);
  });
  
  // Filter Function
  function applyFilters() {
    const nameFilter = document.getElementById('searchName').value.toLowerCase();
    const locationFilter = document.getElementById('searchLocation').value.toLowerCase();
    const pincodeFilter = document.getElementById('searchPincode').value;
    const ratingFilter = parseFloat(document.getElementById('searchRating').value);
    const priceFilter = document.getElementById('searchPrice').value;
  
    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
  
    // Add filtered markers
    coffeeShops.forEach(shop => {
      let match = true;
      if (nameFilter && !shop.name.toLowerCase().includes(nameFilter)) match = false;
      if (locationFilter && !shop.address.toLowerCase().includes(locationFilter)) match = false;
      if (pincodeFilter && shop.pincode !== pincodeFilter) match = false;
      if (ratingFilter && (shop.ratingZomato < ratingFilter && shop.ratingSwiggy < ratingFilter)) match = false;
      if (priceFilter && shop.priceRange !== priceFilter) match = false;
  
      if (match) {
        L.marker([shop.lat, shop.lng])
          .addTo(map)
          .bindPopup(`<b>${shop.name}</b><br>${shop.address}<br>${shop.instagram}<br>Zomato: ${shop.ratingZomato} ⭐ | Swiggy: ${shop.ratingSwiggy} ⭐<br>Price: ${shop.priceRange}<br>Menu: ${shop.menu}`);
      }
    });
  }
  