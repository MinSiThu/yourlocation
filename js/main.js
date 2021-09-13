if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition((position) => {
        loadLeafLetMap(position);
    });
}else{
    alert("Geolocation is not available on this device!");
}

const renderProfile = (position)=>{
    let ProfileUI = document.getElementById("profile");

    ProfileUI.innerHTML = `
        <ul>
            <li><em>U Mg Mg</em></li>
            <li>latitude - ${position.coords.latitude}</li>
            <li>longitude - ${position.coords.longitude}</li>
        </ul>
    `
}

const loadLeafLetMap = (position)=>{
    const {coords:{latitude,longitude}} = position;

    let map = L.map('map').setView([latitude, longitude], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup('Your Current Location')
    .openPopup();

    marker.on("click",()=>{
        renderProfile(position)
        marker.openPopup()
    })

}