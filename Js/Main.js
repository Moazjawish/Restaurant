// Variables:
let CardSwiper = document.querySelector(".cards-swiper");
let basket = document.querySelector(".basket .badge");
let basketBtn = document.querySelector(".basket ");
let total = document.querySelector(".total-price");

let AddedItem = [];
let Foods = [
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

// Create Foods Slider Items
function FoodCards() {
    Foods.forEach((Food)=>{    
    CardSwiper.innerHTML +=
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
    if(CardSwiper)
    {
        FoodCards()
    }

// Add Items
function AddTotCart(id)
{
    if(AddedItem.some((item) => item.id === id))
    {
        changeQuantity('plus' , id)
    }
    else
    {
        let item = Foods.find((item)=> item.id === id)
        AddedItem.push({
            ...item,
            Quantity:1
        })
    }
    UpdateFood();
}

function UpdateFood()
{
    RenderFoodType();
    RenderSubTotal();
    SendToStorage(AddedItem);
}

// Calculate Total Price :
function RenderSubTotal()
{
    let FoodDisplay = document.querySelector(".food-display");
    let totalPrice = 0 , totlaItems = 0;
    AddedItem.forEach((ele)=>{
        totalPrice += ele.price * ele.Quantity;
        totlaItems += ele.Quantity;
        basket.innerHTML = totlaItems;
        if(FoodDisplay)
        {
        total.innerHTML = 
        `
        <p class="totaly">Total Price is : ${totalPrice.toFixed(2)}$</p><p class="totalItems">(${totlaItems})Items</p>
        `
        }
 
    
    })
    SendPrice(totalPrice , totlaItems);
}

//  Creat Added Item : 
function RenderFoodType()
{
    let FoodDisplay = document.querySelector(".food-display");
    if(FoodDisplay)
    { 
    FoodDisplay.innerHTML = "";
    AddedItem.forEach((ele)=>
    {
        FoodDisplay.innerHTML +=
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
function changeQuantity(action , id)
{
    AddedItem = AddedItem.map((item)=>{
        let Quantity = item.Quantity;
        if(item.id === id)
        {
            if(action === 'minus' && Quantity > 1)
            {
                Quantity--;
            }
            else if(action === 'plus')
            {
                Quantity++;
            }

        }
        return{
                ...item,
                Quantity,
            }
    })
    UpdateFood();
}

// RemoveItem :
function RemoveItem(id)
{
    AddedItem = AddedItem.filter((ele)=>ele.id !== id); 
    UpdateFood();
}

// local storage : 
function SendToStorage(AddedItem)
{
    localStorage.setItem("Foods" ,JSON.stringify(AddedItem))
}

// Total price :
function SendPrice(totalprice , totalItems)
{
    localStorage.setItem("TotalPrice",JSON.stringify(totalprice)) ;
    localStorage.setItem("TotalItems",JSON.stringify(totalItems)) ;

}

function GetFromStorage()
{
    let getFood = localStorage.getItem("Foods");
    getFood = JSON.parse(getFood);
    if(getFood)
    {
        AddedItem = getFood
    }
    let Price = JSON.parse(localStorage.getItem("TotalPrice"))
    let items = JSON.parse(localStorage.getItem("TotalItems"))
    if(items === 0)
    {
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

    window.onscroll = ()=>
    {
    if(this.scrollY >= 400)
    {
    span.classList.add("show")
    }
    else
    {
        span.classList.remove("show")
    }
}
span.onclick = ()=>
{
    this.scrollTo({
        top:0,
        behavior:"smooth",
    })
}

let printBtn  = document.querySelector(".print");
$(document).ready(function(){
    $(printBtn).click(()=>{
        $('.cofod').printThis();
        })
})


