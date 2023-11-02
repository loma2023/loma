
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    let btn_remove = document.querySelectorAll(".rem_heart");
    btn_remove.forEach(allbtn => { allbtn.addEventListener("click", removeData) });
}
//==================================

let favtData;
if (localStorage.itemFav != null) {
    favtData = JSON.parse(localStorage.itemFav)
} else {
    favtData = [];
}
function showData() {
    let table = '';
    for (let i = 0; i < favtData.length; i++) {
        table += `
        <div class="box">
            <div class="image">
                <img src="${favtData[i].img}" class="main-img" alt="">
                <img src="${favtData[i].imghover}" class="hover-img" alt="">
                <div class="icons">
                    <a class="fas fa-shopping-cart"></a>
                    <a class="fas rem_heart fa-heart"></a>
                </div>
            </div>
            <div class="content">
                <h3 class="title">${favtData[i].title}</h3>
                <div class="price"><a class="priceItme">${favtData[i].price} </a></div>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
            </div>
        </div>`
    }
    document.querySelector('.box-container').innerHTML = table
}

function removeData(event) {
    let btn = event.target;
    let parentbtn = btn.parentElement.parentElement.parentElement;
    let title = parentbtn.querySelector(".title");
    for (let i = 0; i < favtData.length; i++) {
        if (favtData[i].title == title.innerText) {
            favtData.splice(i, 1);
            localStorage.itemFav = JSON.stringify(favtData);
            showData()
            ready()
            return
        }
    }
}
showData()