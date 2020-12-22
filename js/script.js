
 class DefaultView {
    constructor(params) {
        this.params = params;
    }

    setTitle(title) {
        document.title = title;
    }

    async getHtml() {
        return "";
    }

    async additionalHtml() {
        return;
    }
}
const implementPromo = async function() {
    promisedPromo.then((promo_content) => {
        if (promo_content.length > 0) {
            for (let key in promo_content) {
                document.querySelector('.promo-list').innerHTML += `
                <div class="promo-list__item">
                    <div class="promo-image">
                        <img src="`+ (promo_content[key].image).replace('$', promo_content[key].id) +`" alt="`+ promo_content[key].alt +`">
                    </div>
                    <div class="promo-ingridients">
                        <div class="promo-ingridients__text">
                           
                            <div class="text-title">
                                `+ promo_content[key].promoName +`
                            </div>
                            <div class="text-main">
                                <span>
                                    `+ promo_content[key].promoingridients +`
                                </span>
                            </div>
                            <div class="text-date">
                            `+ promo_content[key].promoDate +`
                        </div>
                        </div>
                        <div class="promo-ingridients__button">
                            <div class="button-block">
                                <a class="show-more" href="`+ (promo_content[key].url).replace('$', promo_content[key].id) +`">Подробнее</a>
                            </div>
                        </div>
                    </div>
                </div>
                `
            }

        }
    }).catch(function(error) {
        console.log('Request failed', error)
      });
}


const fillPage = async function() {
    promisedCategory.then((category) => {
        if (category.length > 0) {
            for (let key in category) {
                document.querySelector('.product-list__container').innerHTML += `
                <div class="product-list-wrapper">
                    <div class="product-list__title">  `+category[key].Name+ `</div>
                    <div class="product-list" id="`+ category[key].id +`">
                        
                    </div>
                </div>
                `
            }
        }
       promisedPizza.then((pizza_content) => {
            if (pizza_content.length > 0) {
                for (let key in pizza_content) {
                    let url = "#pizza/" + pizza_content[key].category + "/" + pizza_content[key].url;
                    document.getElementById(pizza_content[key].categoryId).innerHTML += `
                    <div class="product-list__item">
                        <div class="product-block">
                            <div class="product-block__image">
                                <a href="`+ url + `"><img src="`+ (pizza_content[key].images).replace('$', pizza_content[key].url) +`" alt="`+ pizza_content[key].productName+`"></a>
                            </div>
                            <div class="product-block__ingridients">
                                <div class="block-ingridients__title">
                                    <a href="`+ url +`">` + pizza_content[key].productName + `</a>
                                </div>
                                <div class="block-ingridients__ingridients">
                                    <span id="ingridients-list`+pizza_content[key].id+`">` + "" + `</span>
                                </div>
                                <div class="block-ingridients__options">
    
                                    <div class="options-block">
                                        <div class="ingridientss-options__size">
                                            <button class="size-options active-size-option">Маленькая</button>
                                            <button class="size-options" >Средняя</button>
                                            <button class="size-options" >Большая</button>
                                        </div>
                                    </div>
    
                                </div>
                                <div class="block-ingridients__buy">
                                    <div class="price-block">
                                        <span class="pizza-price-number">`+pizza_content[key].price +`</span>
                                        <span class="pizza-price-text">&#8372</span>
                                    </div>
                                    <div class="button-block">
                                        <button class="button-block__cart" data-id="`+pizza_content[key].id +`">В корзину</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                    let id = 'ingridients-list' + pizza_content[key].id;
                    let array = pizza_content[key].ingridients;
                    let str = '';
                    promisedIngridients.then(ingridients => {
                        for (let key in ingridients) {
                            if (array.includes(ingridients[key].id)) {
                                str += (ingridients[key].name) + ", ";
                            }
                            
                        }
                        document.getElementById(id).innerHTML += str.substr(0, str.length-2);
                    }).catch(function(error) {
                        console.log('Request failed', error)
                      })
                   
                }
            }
        })  
        .catch(function(error) {
            console.log('Request failed', error)
        })
        
    })
    .catch(function(error) {
        console.log('Request failed', error)
    })
    window.onclick = event => {
        if (event.target.classList.contains('button-block__cart')) {
            addToCart(Number(event.target.dataset.id));
        }
    }
}



 const showCard = async function(params)  {
    let url = (params.id)
    let category = url.split('/')[0];
    let name = url.split('/')[1];
    var validUrl = false;
    var keys;
   promisedPizza.then(pizza => {
        if (pizza.length > 0) {
            for (let key in pizza) {
                if (pizza[key].url === name && pizza[key].category === category)  {
                    validUrl = true;
                    document.querySelector('.product-name').innerHTML += `
                        <span>`+ pizza[key].productName +`</span>
                    `
                    document.querySelector('.product-image').innerHTML += `
                        <img src="`+ (pizza[key].images).replace('$', pizza[key].url) + `" alt="`+pizza[key].productName+`">
                    `
                    document.querySelector('.product-buy').innerHTML =`
                    <div class="button-block">
                        <button class="button-block__cart" data-id="`+pizza[key].id +`">В корзину</button>
                    </div>
                    `            

                   
                                
                            
                        
                    

                    keys = pizza[key].relatedProductIds;
                } 
            }
            if (!validUrl) {
                navigateTo('#');
            }
        }
       promisedPizza.then(pizza => {
            if (pizza.length > 0) {
                for (let key in pizza) {
                    if (keys.includes(pizza[key].id))  {
                        document.querySelector('.related-products__list').innerHTML += `
                            <div class="related-list__item">
                                <div class="related-item__img">
                                    <a href="` + "#pizza/" + pizza[key].category + "/" + pizza[key].url + `">
                                        <img src="`+ (pizza[key].images).replace('$', pizza[key].url) + `" alt="`+pizza[key].productName +`">
                                    </a>
                                </div>
                                <div class="related-item__title">
                                    <span>`+pizza[key].productName +`</span>
                                </div>
                            </div>
                        `
                    } 
                }
            }
        }).catch(function(error) {
            console.log('Request failed', error)
        })
    }).catch(function(error) {
        console.log('Request failed', error)
    })
    window.onclick = event => {
        if (event.target.classList.contains('button-block__cart')) {
            addToCart(Number(event.target.dataset.id));
        }
    }
}

const showPromo = async function(params) {
    let url = (params.id)
    let id = url.split('/')[1];
    var validUrl = false;
    promisedPromo.then((promo_content) => {
        if (promo_content.length > 0) {
            for (let key in promo_content) {
                if (promo_content[key].id === Number(id)) {
                    validUrl = true;
                    document.querySelector('.promo-list').innerHTML += `
                    <div class="promo-list__item">
                        <div class="promo-image">
                            <img src="`+ (promo_content[key].image).replace('$', promo_content[key].id) +`" alt="`+ promo_content[key].alt +`">
                        </div>
                        <div class="promo-ingridients">
                            <div class="promo-ingridients__text">
                               
                                <div class="text-title">
                                    `+ promo_content[key].promoName +`
                                </div>
                                <div class="text-main">
                                    <span>
                                        `+ promo_content[key].promoingridients +`
                                    </span>
                                </div>
                                <div class="text-date">
                                `+ promo_content[key].promoDate +`
                            </div>
                            </div>
                        </div>
                    </div>
                    `
                }
            }

        }
        if (!validUrl) {
            navigateTo('#');
        }
    }).catch(function(error) {
        console.log('Request failed', error)
      })
}

 const implementOrder = async function() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart !== null) {
       promisedPizza.then(pizza_content => {
            for (let key in pizza_content) {
                cart.forEach(element => {
                    if (pizza_content[key].id === element.id) {
                        let url = "#pizza/" + pizza_content[key].category + "/" + pizza_content[key].url;
                        document.querySelector('.cart-block').innerHTML += `
                        <div class="cart-list__item">
                            <div class="product-block">
                                <div class="product-block__image">
                                    <a href="`+ url + `"><img src="`+ (pizza_content[key].images).replace('$', pizza_content[key].url) +`" alt="`+ pizza_content[key].productName+`"></a>
                                </div>
                                <div class="product-block__ingridients">
                                    <div class="block-ingridients__title">
                                        <a href="`+ url +`">` + pizza_content[key].productName + `</a>
                                    </div>
                                    <div class="price-block">
                                        <span class="pizza-price-number">`+pizza_content[key].price +`</span>
                                        <span class="pizza-price-text">&#8372</span>
                                    </div>
                                    <div class="cart-ingridients__buy">
                                        
                                        <div class="cart-button-block">
                                            <span>Кол-во: </span><span id="quantity`+pizza_content[key].id+`">`+ element.quantity +`</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                    }
                });
                
            } 
        })
        document.querySelector('.order-block').innerHTML += `
        <div class="total-cost">
            <span>Общая стоимость: </span><span id="total-cost"></span><span > &#8372</span>
        </div>
        <div class="order-button">
            <input type="submit" class="button-block__cart" value="Заказать"></input>
        </div>
        `
        

        document.querySelector('.button-block__cart').addEventListener('click', ()=> {
            if(!ifEmpty()) {
                let body = getInfo();
                sendOrder(body).then(data => success(data)).catch(err => alert('Error! Try again later'));
            } else {
                alert('Форма заказа не должна содержать пустых полей');
            }
            
        })
        updateTotalCost();
    }
}

const getInfo = function() {
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let mail = document.getElementById('mail').value;
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    let payment = document.getElementById('payment').value;
    let totalCost = document.getElementById('total-cost').innerHTML;
    return { 
        name : name,
        phone : phone, 
        mail : mail,
        date : date,
        time : time,
        payment : payment,
        total : totalCost,
        cart : cart
    }    
}

const ifEmpty = () => {
    let body = getInfo();
    if (body.name ===  '') {
        return true;
    }
    if (body.phone ===  '') {
        return true;
    }
    if (body.mail ===  '') {
        return true;
    }
    if (body.date ===  '') {
        return true;
    }
    if (body.payment ===  '') {
        return true;
    }
    if (body.totalCost ===  0) {
        return true;
    }
    return false
}

const success = (data) => {
    document.getElementById('root').innerHTML = `
    <div class="container">
        <div class="info-wrap">
            <div class="person-info">
                <div class="person-name">`+"Имя: "+data.name +`</div>
                <div class="person-phone">`+"Телефон: "+data.phone+`</div>
                <div class="person-mail">`+"Почта: "+data.mail+`</div>
                <div class="date-of-order">`+"Дата: "+data.date+`</div>
                <div class="time-of-order">`+"Время: "+data.time+`</div>
                <div class="payment-option">`+"Способ оплаты: "+data.payment+`</div>
                <div class="total-cost">`+"Общая стоимость: "+data.total+" .грн"+`</div>
            </div>
            <div class="products-block">
                
            </div>
        </div>
    </div>
    `
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart !== null) {
       promisedPizza.then(pizza_content => {
            for (let key in pizza_content) {
                cart.forEach(element => {
                    if (pizza_content[key].id === element.id) {
                        let url = "#pizza/" + pizza_content[key].category + "/" + pizza_content[key].url;
                        document.querySelector('.products-block').innerHTML += `
                        <div class="cart-list__item">
                            <div class="product-block">
                                <div class="product-block__image">
                                    <a href="`+ url + `"><img src="`+ (pizza_content[key].images).replace('$', pizza_content[key].url) +`" alt="`+ pizza_content[key].productName+`"></a>
                                </div>
                                <div class="product-block__ingridients">
                                    <div class="block-ingridients__title">
                                        <a href="`+ url +`">` + pizza_content[key].productName + `</a>
                                    </div>
                                    <div class="price-block">
                                        <span class="pizza-price-number">`+pizza_content[key].price +`</span>
                                        <span class="pizza-price-text">&#8372</span>
                                    </div>
                                    <div class="cart-ingridients__buy">
                                        
                                        <div class="cart-button-block">
                                            <span>Кол-во: </span><span id="quantity`+pizza_content[key].id+`">`+ element.quantity +`</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                    }
                });
                
            } 
        })
    }
}

const implementCart = async function() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart !== null) {
       promisedPizza.then(pizza_content => {
            for (let key in pizza_content) {
                cart.forEach(element => {
                    if (pizza_content[key].id === element.id) {
                        let url = "#pizza/" + pizza_content[key].category + "/" + pizza_content[key].url;
                        document.querySelector('.cart-list__container').innerHTML += `
                        <div class="cart-list__item">
                            <div class="product-block">
                                <div class="product-block__image">
                                    <a href="`+ url + `"><img src="`+ (pizza_content[key].images).replace('$', pizza_content[key].url) +`" alt="`+ pizza_content[key].productName+`"></a>
                                </div>
                                <div class="product-block__ingridients">
                                    <div class="block-ingridients__title">
                                        <a href="`+ url +`">` + pizza_content[key].productName + `</a>
                                    </div>
                                    <div class="price-block">
                                            <span class="pizza-price-number">`+pizza_content[key].price +`</span>
                                            <span class="pizza-price-text">&#8372</span>
                                        </div>
                                    <div class="cart-ingridients__buy">
                                        
                                        <div class="cart-button-block">
                                            <button class="quantity-button plus" data-id="`+pizza_content[key].id +`">+</button>
                                            <button class="quantity-button minus" data-id="`+pizza_content[key].id +`">-</button>
                                            <span>Кол-во: </span><span id="quantity`+pizza_content[key].id+`">`+ element.quantity +`</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                        
                    }
                });
                
            } 
        })
        document.querySelector('.cart-order').innerHTML += `
        <div class="total-cost">
            <span>Общая стоимость: </span><span id="total-cost"></span><span > &#8372</span>
        </div>
        <div class="order-button">
            <a href="#order">
                <button class="button-block__cart"> Заказать </button>
            </a>
        </div>
        `
        updateTotalCost()
    }
    window.onclick = event => {
        if (event.target.classList.contains('plus')) {
            plusQuantity(Number(event.target.dataset.id));
            updateTotalCost();
        }
        if (event.target.classList.contains('minus')) {
            minusQuantity(Number(event.target.dataset.id));
            updateTotalCost();
        }
    }
}



let cart = [

];
if (localStorage.getItem('cart') !== '') {
    let local_cart = JSON.parse(localStorage.getItem('cart'));
    if (local_cart !== null ) {
        local_cart.forEach(element => {
            cart.push(element);
        })
    }
}


async function addToCart(id) {
    let alreadyInCart = false;
    cart.forEach(element => {
        if(id === element.id) {
            alreadyInCart = true;
            element.quantity++;
        }
    });
    if (!alreadyInCart) {
        cart.push({id : id, quantity : 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}


function plusQuantity(id) {
    cart.forEach(element => {
        if (element.id === id) {
            element.quantity++;
            localStorage.setItem('cart', JSON.stringify(cart));
            document.getElementById('quantity'+id).innerHTML = element.quantity;
        }
    })
}


function minusQuantity(id) {
    cart.forEach(element => {
        if (element.id === id) {
            element.quantity--;
            if (element.quantity === 0) {
                cart = deleteFromCart(id);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            document.querySelector('.cart-list__container').innerHTML = "";
            document.querySelector('.cart-order').innerHTML = "";
            implementCart();
        }
    })
}

function deleteFromCart(id) {
    let temp_cart = [];
    cart.forEach(element => {
        if (element.id !== id) {
            temp_cart.push(element);
        }
    })
    return temp_cart;
}

function updateTotalCost() {
    let totalCost = 0;
   promisedPizza.then(pizza_content => {
        for (let key in pizza_content) {
            cart.forEach(element => {
                if (pizza_content[key].id === element.id) {
                    totalCost += (pizza_content[key].price * element.quantity);
                    
                }
            });
            
        }
        document.getElementById('total-cost').innerHTML = totalCost.toFixed(2);
    })
    
}


const router = async () => {
    const routes = [
        { path: "#", view: HomeView },
        { path: "#pizza", view: PizzaView },
        { path: "#pizza/:id", view: PizzaProductView },
        { path: "#discounts", view: DiscountsView },
        { path: "#discounts/:id", view: DiscountPromoView },
        { path: "#cart", view: CartView },
        { path: "#order", view: OrderView }
    ];

    const potentialMatches = routes.map(route => {
        let url = "/" + location.href.split('#')[1];
        return {
            route: route,
            result: url.match(pathToRegex(route.path.replace('#', "/")))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
        window.history.replaceState(null, null, "#");
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#root").innerHTML = await view.getHtml();
    await view.additionalHtml();
    window.scroll({
        left: 0,
        top: 0, 
        behavior: 'smooth'
    });
};

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.replace('#', "/").matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

 const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        };
    });
    router();
});

async function sendOrder(body) {
    const url = 'https://my-json-server.typicode.com/SupWithCancer/db-pizzatime/pizza';
    let headers = {
        'Content-Type' : 'application/json'
    }
    return fetch(url, {
        method : 'POST',
        body : JSON.stringify(body),
        headers : headers
    }).then(response => {
        return response.json();
    })
}

const link = 'https://my-json-server.typicode.com/SupWithCancer/db-pizzatime';
const link2 = 'https://my-json-server.typicode.com/SupWithCancer/db-offers';
const link3 = 'https://my-json-server.typicode.com/SupWithCancer/db-ing';

 const promisedPromo = getContent(`${link2}/promo`);
 const promisedCategory = getContent(`${link}/category`);
 const promisedPizza = getContent(`${link}/pizza`);
 const promisedIngridients = getContent(`${link3}/ingridients`);

function getContent(url) {
    return fetch(url).then(content => content.json());
}


class CartView extends DefaultView {
    constructor(params) {
        console.log(super(params));
        this.setTitle('Корзина');
    }

    async getHtml() {
        let response = await fetch('js/cart.html');
        let content = await response.text();
        return content;
    }

    async additionalHtml() {
        implementCart();
    }
}

class DiscountPromoView extends DefaultView {
    constructor(params) {
        super(params);
        this.setTitle('Промо');
    }

    async getHtml() {
        let response = await fetch('js/discounts_promo.html');
        let content = await response.text();
        return content;
    }

    async additionalHtml() {
        showPromo(this.params);
    }
}

class DiscountsView extends DefaultView {
    constructor(params) {
        super(params);
        this.setTitle('Акции');
    }

    async getHtml() {
        let response = await fetch('js/discounts.html');
        let content = await response.text();
        return content;
    }

    async additionalHtml() {
        implementPromo();
    }
}

class HomeView extends DefaultView {
    constructor(params) {
        super(params);
        this.setTitle('Главная страница');
    }

    async getHtml() {
        let response = await fetch('js/home.html');
        let content = await response.text();
        return content;
    }

    async additionalHtml() {
        
        fillPage();
    }
}

class OrderView extends DefaultView {
    constructor(params) {
        super(params);
        this.setTitle('Заказ');
    }

    async getHtml() {
        let response = await fetch('js/order.html');
        let content = await response.text();
        return content;
    }

    async additionalHtml() {
        implementOrder();
    }
}

class PizzaView extends DefaultView {
    constructor(params) {
        super(params);
        this.setTitle('Пицца');
    }

    async getHtml() {
        let response = await fetch('js/pizza.html');
        let content = await response.text();
        return content;
    }

    async additionalHtml() {
       fillPage();
    }
}

class PizzaProductView extends DefaultView {
    constructor(params) {
        super(params);
        this.setTitle('Пицца');
    }

    async getHtml() {
        let response = await fetch('js/pizza_product.html');
        let content = await response.text();
        return content;
    }

    async additionalHtml() {
        showCard(this.params);
    }
}