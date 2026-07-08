const inpu = document.getElementById(`inp`);
const weather = document.querySelector(`.form`);
const detail = document.querySelector(`.detail`);
const apikey ="641c51fe8ed59e1a856617ac3379486c";

weather.addEventListener("submit", async event => {
    event.preventDefault();
    let cityval = inpu.value;

    if (cityval){
        try{
            let result = await getWether(cityval);
            console.log(result);
            displayWeather(result);
        }
        catch(error){
            displayError(error);
        }
    }
    else {
        displayError("Please Enter a city");
    }
});

getWether = async (city) => {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    let result = await fetch(api);
    
    if (!result.ok)
        throw new Error ("Couldnt get your request!");
    return await result.json();
}

displayWeather = response => {
    let {name: city, main: {temp, humidity}, weather: [{description, id}]} = response;
    
    const cit = document.createElement("h1");
    cit.textContent = city;
    cit.id = "city";

    const humud = document.createElement("p");
    humud.textContent = `Humidity: ${humidity}%`;
    humud.classList.add("humid");

    const temper = document.createElement("p");
    temper.textContent = `${(9/5 * (temp - 273.15) + 32).toFixed(1)} F`;
    temper.classList.add("tem");

    const describe = document.createElement("p");
    describe.textContent = description;
    describe.classList.add("describe");

    const emoji = document.createElement("p");
    emoji.textContent = picture(id);
    emoji.classList.add("emoji");

    detail.textContent = "";
    detail.style.display = "flex";
    detail.append(cit);
    detail.append(temper);
    detail.append(humud);
    detail.append(describe);
    detail.append(emoji);
}

picture = (id) => {
    console.log(id);
    switch (true) {
        case (id < 300) :
            return "⛈";
        case (id < 400):
            return "🌧";
        case (id < 600):
            return "🌧";
        case (id < 700):
            return "❄";
        case (id < 800):
            return "🌫";
        case (id === 800):
            return "☀";
        case (id < 900):
            return "☁";
        default:
            return "❓";
    }
}

displayError = (mes) => {
    const ele = document.createElement("p");
    ele.textContent = mes;
    ele.classList.add("err");

    detail.textContent = "";
    detail.style.display = "flex";
    detail.appendChild(ele);
}

