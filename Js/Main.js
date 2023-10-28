// Variables:
let cardSwiper = document.querySelector(".cards-swiper");
let basket = document.querySelector(".basket .badge");
let basketBtn = document.querySelector(".basket ");
let total = document.querySelector(".total-price");

let addedItem = [];

let foods = [
    {
        id: 1,
        image: "../Images/food-1.jpg",
        name: "Hot Dog",
        price: "15",

    },
    {
        id: 2,
        image: "../Images/food-2.jpg",
        name: "Pizza",
        price: "35",
        Quantity: 1
    },
    {
        id: 3,
        image: "../Images/food-3.jpg",
        name: "Crispy",
        price: "23",

    },
    {
        id: 4,
        image: "../Images/food-4.jpg",
        name: "Green Salad",
        price: "60",

    },
    {
        id: 5,
        image: "../Images/food-5.jpg",
        name: "Chicken",
        price: "10",

    },
    {
        id: 6,
        image: "../Images/food-6.jpg",
        name: "Corn Flour",
        price: "30",

    },

]

// Create foods Slider Items
function FoodCards() {
    foods.forEach((Food) => {
        cardSwiper.innerHTML +=
            `
    <div class="card card--${Food.id} swiper-slide">
    <div class="card__info-hover">
    </div>
    <div class="card__img">${Food.image}</div>
    <a   class="card_link">
    <div class="card__img--hover"></div>
    </a>
    <div class="card__info">
    <span class="card__category">${Food.name}</span>
    <h3 class="card__title">${Food.name}</h3>
    <button class="btn read" data-toggle="modal" data-target="#staticBackdrop-${Food.id}"><i class='fas fa-book-open'></i></button>
    <button class="btn add" onclick = "AddTotCart(${Food.id})"><i class='fa-solid fa-cart-shopping'></i></button>
    </div>
    </div>
        `
    })
}
if (cardSwiper) {
    FoodCards()
}

// Add Items
function AddTotCart(id) {
    if (addedItem.some((item) => item.id === id)) {
        changeQuantity('plus', id)
    }
    else {
        let item = foods.find((item) => item.id === id)
        addedItem.push({
            ...item,
            Quantity: 1
        })
    }
    UpdateFood();
}

function UpdateFood() {
    RenderFoodType();
    RenderSubTotal();
    SendToStorage(addedItem);
}

// Calculate Total Price :
function RenderSubTotal() {
    let foodDisplay = document.querySelector(".food-display");
    let totalPrice = 0, totlaItems = 0;
    addedItem.forEach((ele) => {
        totalPrice += ele.price * ele.Quantity;
        totlaItems += ele.Quantity;
        basket.innerHTML = totlaItems;

        if (foodDisplay) {
            
            total.innerHTML = `<p class="totaly">Total Price is : ${totalPrice.toFixed(2)}$</p><p class="totalItems">(${totlaItems})Items</p>`
        }
    })
    SendPrice(totalPrice, totlaItems);
}

//  Creat Added Item : 
function RenderFoodType() {
    let foodDisplay = document.querySelector(".food-display");
    if (foodDisplay) {
        foodDisplay.innerHTML = "";
        addedItem.forEach((ele) => {
            foodDisplay.innerHTML +=
                `
    <div class="card CardDisplay card-contact   " style="width:400px">
    <img class="card-img-top" src=${ele.image} alt="Card image" style="width:100%">
    <div class="card-body">
    <h4 class="card-title">${ele.name}</h4>
    <p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>
    <div class="count">
    <button class="btn  minus " onclick = "changeQuantity('minus',${ele.id})" ><i class='fa fa-minus'></i></button>
    <span class = "quantity">${ele.Quantity}</span>
    <button  class="btn  plus "  onclick = "changeQuantity('plus', ${ele.id})" ><i class='fa fa-plus'></i></button>
    </div> 
    <button class="btn  remove" onclick = "RemoveItem(${ele.id})">x</i></button>
    </div>
    <div class="price">
    <span class="priceVal">Price : ${ele.price}$</span>
    </div>
    </div>  
    `
        })
    }
}

// Update Quantity : 
function changeQuantity(action, id) {
    addedItem = addedItem.map((item) => {
        let Quantity = item.Quantity;
        if (item.id === id) {
            if (action === 'minus' && Quantity > 1) {
                Quantity--;
            }
            else if (action === 'plus') {
                Quantity++;
            }
        }
        return {
            ...item,
            Quantity,
        }
    })
    UpdateFood();
}

// RemoveItem :
function RemoveItem(id) {
    addedItem = addedItem.filter((ele) => ele.id !== id);
    UpdateFood();
}

// local storage : 
function SendToStorage(addedItem) {
    localStorage.setItem("foods", JSON.stringify(addedItem))
}

// Total price :
function SendPrice(totalprice, totalItems) {
    localStorage.setItem("TotalPrice", JSON.stringify(totalprice));
    localStorage.setItem("TotalItems", JSON.stringify(totalItems));
}

function GetFromStorage() {
    let foodDisplay = document.querySelector(".food-display");

    let getFood = localStorage.getItem("foods");
    getFood = JSON.parse(getFood);
    if (getFood) {
        addedItem = getFood
    }
    let Price = JSON.parse(localStorage.getItem("TotalPrice"))
    let items = JSON.parse(localStorage.getItem("TotalItems"))
    if (items === 0) {
        basket.innerHTML = 0;
    }
    RenderSubTotal()
    RenderFoodType()
}
GetFromStorage()


// Swiper Start
var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: 'true',
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

let span = document.querySelector(".up");

window.onscroll = () => {
    if (this.scrollY >= 400) {
        span.classList.add("show")
    }
    else {
        span.classList.remove("show")
    }
}
span.onclick = () => {
    this.scrollTo({
        top: 0,
        behavior: "smooth",
    })
}


let printBtn = document.querySelector(".print");
$(document).ready(function () {
    $(printBtn).click(() => {
        $('.cofod').printThis();
    })
})


// Form Validation:
function FormValidation()
{
let contact_us_section = document.querySelector(".contact-us"); 
if(contact_us_section)
{
let id = function (id) {
    return document.getElementById(id)
}

let classess = function (classes) {
    return document.getElementsByClassName(classes);
}

let formValid = document.querySelector(".form_validation");

let formInpusts = document.querySelectorAll(".form-control");
let discount = document.querySelectorAll(".discount");
let firstName = id("form_first_name");
let secondName = id("form_second_name");
let emailForm = id("form_emial");
let formMessage = id("form_message");
let ErrorMsg = classess("Error");

formValid.addEventListener("submit", (e) =>{
    formInpusts.forEach((input)=>{
        if (input.value === "") 
        {
            e.preventDefault();
        }
    });

    engine(firstName, 0, "Please Enter the first name");
    engine(secondName, 1, "Please Enter the second name");
    engine(emailForm, 2, "Please Enter the Email");
    engine(formMessage, 3, "Please Enter the message");
});


let engine = function (inputName, index, message) {
    if (inputName.value === "") {
        ErrorMsg[index].innerHTML = message;
        inputName.style.borderBottom = "1px solid red"
    }
    else {
        ErrorMsg[index].innerHTML = "";
        inputName.style.borderBottom = "1px solid green";
    }
}
}
}
FormValidation();

// Shuffle Food Start:
let shuffleBtns = document.querySelectorAll(".suffle_btns");
let shuffleListArr = document.querySelectorAll(".shuffle_list");
let launchBtn = document.querySelector(".launch");
let dinnerBtn = document.querySelector(".dinner");
let sweetBtn  =  document.querySelector(".sweet");
let allBtn    = document.querySelector(".all");
let shuffle_img_container = document.querySelector(".shuffle_img_container")
let image_container  = document.querySelectorAll(".shuffle_img_container .box")
let sweetFoodImages  = document.querySelectorAll("#sweet_food");
let dinnerFoodImages = document.querySelectorAll("#dinner_food");
let launchFoodImages = document.querySelectorAll("#launch_food");

shuffleListArr.forEach((shuffleList)=>{
    shuffleList.addEventListener("click" , ()=>{
        for(let i =0;i<shuffleListArr.length;i++)
        {
            shuffleListArr[i].classList.remove('active');
        }

    image_container.forEach((img)=>{
        img.style.display = 'none';
    })
    if(shuffleList.firstChild.classList.contains("launch"))
    {
        launchFoodImages.forEach((img)=>{
        img.style.display = 'block';
        })
        shuffleListArr[0].classList.add('active');
        
    }

    if(shuffleList.firstChild.classList.contains("dinner"))
    {
        dinnerFoodImages.forEach((img)=>{
            img.style.display = 'block';
        })
        shuffleListArr[1].classList.add('active');
    }

    if(shuffleList.firstChild.classList.contains("sweet"))
    {
        sweetFoodImages.forEach((img)=>{
            img.style.display = 'block';
        })
        shuffleListArr[2].classList.add('active');
    }

    if(shuffleList.firstChild.classList.contains("all"))
    {
        image_container.forEach((img)=>{
            img.style.display = 'block';
        })
        shuffleListArr[3].classList.add('active');
    }
})

})


// Shuffle Food End
