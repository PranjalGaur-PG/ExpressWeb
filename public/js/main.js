const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById('city-name');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp-status');
const dataHide = document.querySelector(".middle-layer");

const getInfo = async(event) => {
    event.preventDefault();
    
    console.log(cityName.value);
    let cityVal = cityName.value;
    if(cityVal === "") {
        city_name.innerText = "Please write the city name before search";
        dataHide.classList.add("data-hide");
    }
    else {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=b54a167695a33af965599c0c239f1db4`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            temp.innerText = arrData[0].main.temp;

            const tempMood = arrData[0].weather[0].main;
            if(tempMood == "Clear") {
                temp_status.innerHTML = "<i class='fa-solid fa-sun' style='color: #eccc68'></i>";
            } 
            else if(tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fa-solid fa-clouds' style='color: #f1f2f6;'></i>";
            } 
            else if(tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fa-solid fa-cloud-rain' style='color: #a4b0be;'></i>";
            } 
            else {
                temp_status.innerHTML = "<i class='fa-solid fa-clouds' style='color: #f1f2f6;'></i>";
            } 

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            dataHide.classList.remove("data-hide");

        } catch {
            city_name.innerText = "Please write the city name properly";
            dataHide.classList.add("data-hide");
        }
    }
}
submitBtn.addEventListener('click', getInfo);