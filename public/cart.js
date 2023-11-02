
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    let btn_remove = document.querySelectorAll(".fa-times");
    btn_remove.forEach(allbtn => { allbtn.addEventListener("click", removeData) });

}
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('box-container')[0]
    var cartRows = cartItemContainer.getElementsByClassName('box')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total + ' EG'

}
//==================================
let reciptData;
if (localStorage.itemCart != null) {
    reciptData = JSON.parse(localStorage.itemCart)
} else {
    reciptData = [];
}
function showData() {
    let table = '';
    for (let i = 0; i < reciptData.length; i++) {
        table += `
        <div class="box">
        <i class="fas fa-times"></i>
        <img src="${reciptData[i].img}" alt="">
        <div class="content">
            <h3 class="title">${reciptData[i].title}</h3>
            <form action="">
                <span>quantity : </span>
                <input class="cart-quantity-input" type="number" name="" value="1" id="">
            </form>
            <div class="price">${reciptData[i].price}</div>
        </div>
    </div>`
    }
    document.querySelector('.box-container').innerHTML = table
    updateCartTotal()
    loma()
}
function loma() {
    let table2 = '';
    for (let i = 0; i < reciptData.length; i++) {
        table2 += `
        <input style="display: none;" id="item" name="item" value="${reciptData[i].title},"> `
    }
    document.querySelector('#looma').innerHTML = table2
    updateCartTotal()
}
function removeData(event) {
    let btn = event.target;
    let parentbtn = btn.parentElement;
    let title = parentbtn.querySelector(".title");
    for (let i = 0; i < reciptData.length; i++) {
        if (reciptData[i].title == title.innerText) {
            reciptData.splice(i, 1);
            localStorage.itemCart = JSON.stringify(reciptData);
            showData()
            ready()
            return
        }
    }
}
showData()