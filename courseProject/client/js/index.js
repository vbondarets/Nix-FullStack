async function postReq(url, body) {
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    let resp = await res.json(); //Otvet ot servera
    return resp;
}
async function getReq(url, body) {
    let res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    let resp = await res.json(); //Otvet ot servera
    return resp;
}


// document.querySelectorAll(".productPreviewImg").forEach(el => {
//     el.addEventListener("click", function () {
//         console.log(this.parentNode);
//     });
// });
async function setCatalog() {
    let classes = await getReq('http://localhost:5000/api/class');
    let classesArr = classes.resp;
    await classesArr.forEach(el => {
        let leftBarDiv = document.querySelector(".LeftBarContainer");
        let DropedListDiv = document.createElement("div");
        DropedListDiv.className = "DropedList";
        DropedListDiv.id = "DropedList_" + el.id;
        leftBarDiv.append(DropedListDiv);
        let listTitleA = document.createElement("a");
        listTitleA.className = "ListTitle";
        listTitleA.id = "ListTitle_" + el.id;
        listTitleA.innerHTML = el.name;
        DropedListDiv.append(listTitleA);
        let SubListDiv = document.createElement('div');
        SubListDiv.className = "SubList";
        SubListDiv.id = "SubList_" + el.id;
        // SubListDiv.style.height = "0px"
        DropedListDiv.append(SubListDiv);
    })
    let cetegories = await getReq('http://localhost:5000/api/categories');
    let cetegoriesArr = cetegories.resp;
    await cetegoriesArr.forEach(el => {
        let SubListDiv = document.querySelector("#SubList_" + el.classId);
        let SubTitleA = document.createElement("a");
        SubTitleA.className = "SubTitle";
        SubTitleA.id = "SubTitle_" + el.id;
        SubTitleA.innerHTML = el.name;
        SubListDiv.append(SubTitleA);
        // console.log(el);
    });
    // console.log(cetegoriesArr.resp);
    //////CATEGORY ADDING/////////
    document.querySelectorAll(".ListTitle").forEach(el => {
        el.addEventListener("click", function listKlick() {
            let step = 3;
            let element;
            let height;
            function heightIncrement() {
                let childs = element.childNodes;
                if (height != (childs.length * 30)) {
                    height += step;
                    element.style.height = height + "px";
                    setTimeout(heightIncrement, 1);
                }
            }
            function heihgtDecrement() {
                if (height != 0) {
                    height = height - step;
                    element.style.height = height + "px";
                    setTimeout(heihgtDecrement, 1);
                }
            }
            // console.log(this);
            element = this.parentNode.children[1];
            if (element.childNodes.length === 0) {
                return;
            }
            height = element.clientHeight;
            if (height > step) {
                this.childNodes[1].style = "border-width: 0px 2px 2px 0px;"
                heihgtDecrement(element, height);
            }
            else if (height <= step) {
                this.childNodes[1].style = "border-width: 2px 0px 0px 2px;"
                heightIncrement(element, height);
            }
        });
    });

    document.querySelectorAll(".ListTitle").forEach(el => {
        // console.log(el);
        element = el.parentNode.children[1];
        // console.log(element);
        if (element.childNodes.length != 0) {
            //    el.innerHTML += "  >";
            let i = document.createElement("i");
            i.className = "arrow down";
            el.append(i);
            //    console.log(el.innerHTML);
        }
    })

}
setCatalog();
async function getProducts() {
    let { products } = await getReq('http://localhost:5000/api/product');
    // let text = products[0].name;
    // let new_text = split(" ", text);
    // console.log(products);
    products.forEach((element, index) => {
        let ProductListDiv = document.querySelector(".ProductList");
        //////////////////////////////////////////////{
        let ProductContainerDiv = document.createElement("div");
        ProductContainerDiv.className = "ProductContainer";
        ProductListDiv.prepend(ProductContainerDiv);
        ////////////////////////////////////////////////////{
        let productPreviewImg = document.createElement("div");
        productPreviewImg.className = "productPreviewImg";
        productPreviewImg.id = element.id;
        productPreviewImg.style = "background-image: url('" + location.origin + "/" + element.img + "')";
        ProductContainerDiv.append(productPreviewImg);
        /////////////////////////////////////////////{
        let productPreviewTitle = document.createElement('p');
        productPreviewTitle.className = "productPreviewTitle";
        productPreviewTitle.innerHTML = element.name;
        productPreviewImg.append(productPreviewTitle);

        let productPreviewLike = document.createElement('button');
        productPreviewLike.className = "productPreviewLike";
        productPreviewImg.append(productPreviewLike);
        //////////////////////////////////////////////////////////////}
        let productPreviewInfo = document.createElement('div');
        productPreviewInfo.className = "productPreviewInfo";
        ProductContainerDiv.append(productPreviewInfo);
        ///////////////////////////////////////////////{
        let productPreviewName = document.createElement('div');
        productPreviewName.className = "productPreviewName";
        productPreviewInfo.append(productPreviewName);
        ///////////////////////////////////////////////{
        let pName = document.createElement('p');
        pName.innerHTML = element.name;
        productPreviewName.append(pName);
        ///////////////////////////////////////////////}
        let productPreviewCeneter = document.createElement('div');
        productPreviewCeneter.className = "productPreviewCeneter";
        productPreviewInfo.append(productPreviewCeneter);
        ///////////////////////////////////////////////{
        let productPreviewColors = document.createElement('div');
        productPreviewColors.className = "productPreviewColors";
        productPreviewCeneter.append(productPreviewColors);
        ///////////////////////////////////////////////{
        let productPreviewColorGray = document.createElement('button');
        productPreviewColorGray.className = "productPreviewColor gray";
        productPreviewColors.append(productPreviewColorGray);

        let productPreviewColorBlack = document.createElement('button');
        productPreviewColorBlack.className = "productPreviewColor black";
        productPreviewColorBlack.style = "margin-left: 3%";
        productPreviewColors.append(productPreviewColorBlack);

        let productPreviewColorBlue = document.createElement('button');
        productPreviewColorBlue.className = "productPreviewColor blue";
        productPreviewColorBlue.style = "margin-left: 3%";
        productPreviewColors.append(productPreviewColorBlue);
        ///////////////////////////////////////////////}
        let productPreviewPricing = document.createElement('div');
        productPreviewPricing.className = "productPreviewPricing";
        productPreviewCeneter.append(productPreviewPricing);
        ///////////////////////////////////////////////{
        let productPreviewPrice = document.createElement('div');
        productPreviewPrice.className = "productPreviewPrice";
        productPreviewPricing.append(productPreviewPrice);
        ///////////////////////////////////////////////{
        let productPreviewPriceInt = document.createElement('p');
        productPreviewPriceInt.className = "productPreviewPriceInt";
        productPreviewPriceInt.innerHTML = element.price + "$";
        productPreviewPrice.append(productPreviewPriceInt);

        let productPreviewPriceTitle = document.createElement('p');
        productPreviewPriceTitle.className = "productPreviewPriceTitle";
        productPreviewPriceTitle.innerHTML = "PRICE";
        productPreviewPrice.append(productPreviewPriceTitle);
        ///////////////////////////////////////////////}
        let productPreviewWholePrice = document.createElement('div');
        productPreviewWholePrice.className = "productPreviewWholePrice";
        productPreviewPricing.append(productPreviewWholePrice);
        ///////////////////////////////////////////////{
        let productPreviewWholePriceInt = document.createElement('p');
        productPreviewWholePriceInt.className = "productPreviewWholePriceInt";
        productPreviewWholePriceInt.innerHTML = element.price - (element.price / 100 * 20) + "$";
        productPreviewWholePrice.append(productPreviewWholePriceInt);

        let productPreviewWholePriceTitle = document.createElement('p');
        productPreviewWholePriceTitle.className = "productPreviewWholePriceTitle";
        productPreviewWholePriceTitle.innerHTML = "adv from 5000$";
        productPreviewWholePrice.append(productPreviewWholePriceTitle);
        ///////////////////////////////////////////////}
        let productPreviewCount = document.createElement('div');
        productPreviewCount.className = "productPreviewCount";
        productPreviewPricing.append(productPreviewCount);
        ///////////////////////////////////////////////{
        let productPreviewCountDecriment = document.createElement('button');
        productPreviewCountDecriment.className = "productPreviewCountDecriment";
        productPreviewCountDecriment.innerHTML = "&lt";
        productPreviewCount.append(productPreviewCountDecriment);

        let productPreviewCountTitle = document.createElement('p');
        productPreviewCountTitle.className = "productPreviewCountTitle";
        productPreviewCountTitle.innerHTML = "1";
        productPreviewCount.append(productPreviewCountTitle);

        let productPreviewCountIncrement = document.createElement('button');
        productPreviewCountIncrement.className = "productPreviewCountIncrement";
        productPreviewCountIncrement.innerHTML = "&gt";
        productPreviewCount.append(productPreviewCountIncrement);
        ///////////////////////////////////////////////}}}
        let productPreviewBottom = document.createElement('div');
        productPreviewBottom.className = "productPreviewBottom";
        productPreviewInfo.append(productPreviewBottom);
        ///////////////////////////////////////////////{
        let productPreviewAddToBasket = document.createElement('button');
        productPreviewAddToBasket.className = "productPreviewAddToBasket";
        productPreviewAddToBasket.innerHTML = "TO BASKET";
        productPreviewBottom.append(productPreviewAddToBasket);

        let productPreviewRating = document.createElement('p');
        productPreviewRating.className = "productPreviewRating";
        productPreviewRating.innerHTML = "4";
        productPreviewBottom.append(productPreviewRating);

        let productPreviewRatingImg = document.createElement('img');
        productPreviewRatingImg.className = "productPreviewRatingImg";
        productPreviewRatingImg.src = "https://www.svgrepo.com/show/172818/star-outline.svg";
        productPreviewRatingImg.alt = "star";
        productPreviewBottom.append(productPreviewRatingImg);
        ///////////////////////////////////////////////}}}

    });

    document.querySelectorAll(".productPreviewImg").forEach(el => {
        el.addEventListener("click", function (e) {
            // e.preventDefault;
            if (this.id) {
                // console.log(this.id);
                window.location.href="http://localhost:5000/product/" + this.id;
                return;
            }
            else {
                // console.log(1);
                window.location.href="http://localhost:5000/product/" + 1;
                return;
            }


        });
    });
    document.querySelectorAll(".productPreviewCountIncrement").forEach((element, index) => {
        element.addEventListener("click", function (){
            // console.log(this.parentNode.childNodes);
            let num;
            if(this.parentNode.childNodes[3]){
                num = this.parentNode.childNodes[3];
            }
            else{
                num = this.parentNode.childNodes[1];
            }
            

            let value = parseInt(num.innerHTML);
            value += 1;
            num.innerHTML = value;
        });
    });
    document.querySelectorAll(".productPreviewCountDecriment").forEach((element, index) => {
        element.addEventListener("click", function (){
            // console.log(this.parentNode.childNodes);
    
            let num;
            if(this.parentNode.childNodes[3]){
                num = this.parentNode.childNodes[3];
            }
            else{
                num = this.parentNode.childNodes[1];
            }
            let value = parseInt(num.innerHTML);
            if(value <= 1){
                return;
            }
            value -= 1;
            num.innerHTML = value;
        });
    });
}
getProducts();

document.querySelectorAll(".productPreviewLike").forEach((element, index) => {
    element.addEventListener("click", function(e){
        e.preventDefault();
        console.log(this);
    });
});

