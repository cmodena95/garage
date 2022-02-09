import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["carsList"]

  connect() {
    console.log("hello from garage controller!")
    this.garageName = "794"
    this.garageUrl = `https://wagon-garage-api.herokuapp.com/${this.garageName}/cars`
    this.fetchCars()
  }

  fetchCars() {
    fetch(this.garageUrl)
      .then(response => response.json())
      .then((data) => {
        this.carsListTarget.innerHTML = ""
        data.forEach((car) => {
          this.createCard(car)
        })
      })
  }

  createCar(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const myNewCar = Object.fromEntries(formData)
    fetch(this.garageUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(myNewCar)
      })
      .then(() => this.fetchCars())
  }

  createCard(car) {
    this.carsListTarget.insertAdjacentHTML('beforeend',
      `<div class="car">
      <div class="car-image">
        <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
      </div>
      <div class="car-info">
        <h4>${car.brand} ${car.model}</h4>
        <p><strong>Owner:</strong> ${car.owner}</p>
        <p><strong>Plate:</strong> ${car.plate}</p>
      </div>
      </div>`)
  }
}

{/* <div class="car">
<div class="car-image">
  <img src="http://loremflickr.com/280/280/Ferrari 308 GTS" />
</div>
<div class="car-info">
  <h4>Ferrari 308 GTS</h4>
  <p><strong>Owner:</strong> Thomas Magnum</p>
  <p><strong>Plate:</strong> 56E-478</p>
</div>
</div> */}

// get all cars
// 1. fetch all cars from API with an AJAX request
// 2. iterate over the cars/data we receive
// 3. for each car, insert a new car card

// create a car
// 1. create a new function
// 2. on form submit, we will make a post request to API with information in the form
// 3. refresh our cars list