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

async function getProduct(){
    let path = location.pathname.split('/');
    let {product, info} = await getReq('http://localhost:5000/api/product/' + path[2]);
    if(!product){
        console.log("aboba");
        return;
    }
    // console.log(location.origin + "/" + product[0].img);
    let productTitle = document.querySelector(".productPageTitleP");
    productTitle.innerHTML = product[0].name;
    let adress = document.querySelector(".CurentAdress");
    // console.log(adress.childNodes);
    adress.childNodes[1].innerHTML= "MAIN/CATALOG/" + product[0].name.toUpperCase();
    let productTitlePhoto = document.querySelector(".productPageTitlePhoto");
    productTitlePhoto.style = "background-image: url('" + location.origin + "/" + product[0].img + "')";
    let firstElsePhoto = document.querySelector(".productPhoto_1");
    firstElsePhoto.style = "background-image: url('" + location.origin + "/" + product[0].img + "')";

    let arr = document.querySelectorAll(".productDescription");
    arr.forEach((el, index) =>{
        el.innerHTML = info[index].title +": "+ info[index].description;
    });
    document.querySelectorAll(".productPageCollor").forEach(el =>{
        el.style = "background-image: url('" + location.origin + "/" + product[0].img + "')";
    });
    document.querySelector(".productPagePriceInt").innerHTML = product[0].price + "$";
    document.querySelector(".productPageWholePriceInt").innerHTML = product[0].price - (product[0].price/100*20) + "$";





    let {photos} = await getReq('http://localhost:5000/api/product/photo/' + path[2]);
    // console.log(photos);
    let elsePhotoContainers = document.querySelectorAll(".productPageElsePhotoContainer");
    // console.log(elsePhotoContainers[0]);
    for(let i = 1; i < elsePhotoContainers.length; i++){
        elsePhotoContainers[i].style = "background-image: url('" + location.origin + "/" + photos[i-1].img + "')";
    }

}
getProduct();


document.querySelector(".productPageReviewsTitle").addEventListener("click", function (){
    let DescriptionDiv = document.querySelector(".productPageDescription");
    let ReviewsDiv = document.querySelector(".productPageReviews");
    let maxWidth = document.querySelector(".productPageDescription").clientWidth;
    let DescriptionDivWidth = document.querySelector(".productPageDescription").clientWidth;
    let ReviewsDivWidth = document.querySelector(".productPageReviews").clientWidth;
    let step = 8;
    function divChanging(){
        if(ReviewsDiv.clientWidth <= maxWidth){
            DescriptionDivWidth -= step;
            ReviewsDivWidth += step;
            DescriptionDiv.style.width = DescriptionDivWidth + "px";
            ReviewsDiv.style.width = ReviewsDivWidth + "px";
            setTimeout(divChanging, 1);
        }
        else{
            DescriptionDiv.style = "display:none;";
            DescriptionDiv.style.width = 0 + "px";
            ReviewsDiv.style.width = maxWidth + "px";
        }

    }
    if(document.querySelector(".productPageDescription").clientWidth > 0){
        document.querySelector(".productPageReviewsTitle").style ="border-bottom: 2px solid black; color: #000000";
        document.querySelector(".productPageDescriptionTitle").style = "border: none; color: #8A8A8A";
        ReviewsDiv.style = "display: flex; height: fit-content; max-height: fit-content;";
        let maxHeight = 0;
        ReviewsDiv.childNodes.forEach(el => {
            if(el.clientHeight == undefined){
                maxHeight += 0;
            }
            else{
                maxHeight += el.clientHeight;
            }
        });
        DescriptionDiv.style.width = DescriptionDivWidth + "px";
        ReviewsDiv.style.width = ReviewsDivWidth + "px";
        divChanging();
    }
    else{
        console.log("width is ok")
        return;
    }
});


document.querySelector(".productPageDescriptionTitle").addEventListener("click", function (){
    let DescriptionDiv = document.querySelector(".productPageDescription");
    let ReviewsDiv = document.querySelector(".productPageReviews");
    let maxWidth = document.querySelector(".productPageReviews").clientWidth;
    let DescriptionDivWidth = document.querySelector(".productPageDescription").clientWidth;
    let ReviewsDivWidth = document.querySelector(".productPageReviews").clientWidth;
    let step = 8;
    function divChanging(){
        if(DescriptionDivWidth <= maxWidth){
            ReviewsDivWidth -= step;
            DescriptionDivWidth += step;
            ReviewsDiv.style.width = ReviewsDivWidth + "px";
            DescriptionDiv.style.width = DescriptionDivWidth + "px";
            setTimeout(divChanging, 1);
        }
        else{
            ReviewsDiv.style = "display:none;";
            DescriptionDiv.style.width = maxWidth + "px";
            ReviewsDiv.style.width = 0 + "px";
        }

    }
    if(document.querySelector(".productPageReviews").clientWidth > 0){
        document.querySelector(".productPageDescriptionTitle").style ="border-bottom: 2px solid black; color: #000000";
        document.querySelector(".productPageReviewsTitle").style = "border: none; color: #8A8A8A";
        DescriptionDiv.style.width = DescriptionDivWidth + "px";
        ReviewsDiv.style.width = ReviewsDivWidth + "px";
        DescriptionDiv.style = "display: flex; flex-direction:column;";
        divChanging();
    }
    else{
        console.log("width is ok")
        return;
    }
});

document.querySelector(".productCounterIncrement").addEventListener("click", function (){
    let num = document.querySelector(".productCounterNumber");
    let value = parseInt(num.innerHTML);
    value += 1;
    num.innerHTML = value;
});
document.querySelector(".productCounterDecriment").addEventListener("click", function (){
    let num = document.querySelector(".productCounterNumber");
    let value = parseInt(num.innerHTML);
    if(value <= 1){
        return;
    }
    value -= 1;
    num.innerHTML = value;
});

document.querySelectorAll(".productPageSizesButton").forEach(element => {
    element.addEventListener("click", function (){
        let buttonsArr = document.querySelectorAll(".productPageSizesButton");
        buttonsArr.forEach(el => {
            el.id = "";
        });
        console.log(this);
        this.id = "clickedSizeBtn";
    });
});

document.querySelectorAll(".productPageCollor").forEach(element => {
    element.addEventListener("click", function (){
        let buttonsArr = document.querySelectorAll(".productPageCollor");
        buttonsArr.forEach(el => {
            el.id = "";
        });
        console.log(this);
        this.id = "clickedColorBtn";
    });
});
document.querySelectorAll(".productPageElsePhotoContainer").forEach(element => {
    element.addEventListener("click", function (){
        let buttonsArr = document.querySelectorAll(".productPageElsePhotoContainer");
        buttonsArr.forEach(el => {
            el.id = "";
        });
        // console.log(this);
        this.id = "selectedProductPhoto";
        let classes = this.className;
        classes = classes.split(' ');
        // console.log(classes);
        const style = window.getComputedStyle(document.querySelector("."+classes[1]), false)
        let img = style.backgroundImage.slice(4, -1).replace(/"/g, "");
        // console.log(img);
        let productPhoto = document.querySelector(".productPageTitlePhoto");
        productPhoto.style.backgroundImage = "url('"+img+"')";
    });
});
document.querySelectorAll(".productPageSameProduct").forEach(element => {
    let num = element.clientWidth;
    element.style.height = num + "px";

});
document.querySelectorAll(".UnfulliedStar").forEach(element => {
    element.addEventListener("click", function (){
        document.querySelectorAll(".UnfulliedStar").forEach(el => {
            el.className = "UnfulliedStar";
        });
        let parent = this.parentNode;
        for(let i =0; i < parent.childNodes.length; i++){
            if(parent.childNodes[i].nodeName == "#text"){
                continue;
            }
            else if(parent.childNodes[i] == this){
                parent.childNodes[i].className = "FulliedStar";
                break;
            }
            parent.childNodes[i].className = "FulliedStar";
        }
        document.querySelectorAll(".FulliedStar").forEach(element => {
            element.addEventListener("click", function (){
                document.querySelectorAll(".FulliedStar").forEach(el => {
                    el.className = "UnfulliedStar";
                });
                let parent = this.parentNode;
                for(let i =0; i < parent.childNodes.length; i++){
                    if(parent.childNodes[i].nodeName == "#text"){
                        continue;
                    }
                    else if(parent.childNodes[i] == this){
                        parent.childNodes[i].className = "FulliedStar";
                        break;
                    }
                    parent.childNodes[i].className = "FulliedStar";
                }
            });
        });
    });
});

document.querySelector(".SocialMedia").addEventListener("click", function(e){
    e.preventDefault();

    // console.log(this);
    let element = this;
    navigator.clipboard.writeText(location.href)
    .then(() => {
        console.log("ok: " + location.href);
        element.src = 'https://img.icons8.com/ios/344/link--v1.png';
        setTimeout(()=>{
            console.log("aboba");
            element.src ='data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNjY2NjY2MiPjxwYXRoIGQ9Ik0xMjcuMjgsMTMuNzZjLTguMjY5NzYsMCAtMTYuMDQxNjksMy4yMjIzMSAtMjEuODg5NjksOS4wNzAzMWwtMTcuMiwxNy4yYy00Ljk3MDgsNC45NzA4IC04LjA0MzQ3LDExLjMzMTI1IC04Ljg1NTMxLDE4LjIwNzgxYy0wLjE0MTA0LDEuMjEwODggLTAuMjE1LDIuNDQzNDcgLTAuMjE1LDMuNjgxODdjMCw0LjcwNTkyIDEuMDc5MDMsOS4yNDI0OCAzLjA1NzAzLDEzLjM2MzZsNS4yNDczNCwtNS4yNTQwNmMtMC45MTg0OCwtMi41NzMxMiAtMS40MjQzNywtNS4yOTkwNSAtMS40MjQzNywtOC4xMDk1M2MwLC02LjQzMjggMi41MDcwMSwtMTIuNDc0MTkgNy4wNTQ2OSwtMTcuMDI1MzFsMTcuMiwtMTcuMmM0LjU1MTEyLC00LjU0NzY4IDEwLjU5MjUxLC03LjA1NDY5IDE3LjAyNTMxLC03LjA1NDY5YzYuNDMyOCwwIDEyLjQ3NDE5LDIuNTA3MDEgMTcuMDI1MzEsNy4wNTQ2OWM0LjU1MTEyLDQuNTQ3NjggNy4wNTQ2OSwxMC41OTI1MSA3LjA1NDY5LDE3LjAyNTMxYzAsNi40MzI4IC0yLjUwNzAxLDEyLjQ3NDE5IC03LjA1NDY5LDE3LjAyNTMxbC0xNy4yLDE3LjJjLTQuNTUxMTIsNC41NDc2OCAtMTAuNTkyNTEsNy4wNTQ2OSAtMTcuMDI1MzEsNy4wNTQ2OWMtMi44MTA0OCwwIC01LjUzNjQxLC0wLjUwNTg5IC04LjEwOTUzLC0xLjQyNDM3bC01LjI1NDA2LDUuMjQ3MzRjNC4xMjExMiwxLjk3OCA4LjY1NzY4LDMuMDU3MDMgMTMuMzYzNiwzLjA1NzAzYzguMjY5NzYsMCAxNi4wNDE2OSwtMy4yMjIzMSAyMS44ODk2OSwtOS4wNzAzMWwxNy4yLC0xNy4yYzUuODQ4LC01Ljg0OCA5LjA3MDMxLC0xMy42MTk5MyA5LjA3MDMxLC0yMS44ODk2OWMwLC04LjI2OTc2IC0zLjIyMjMxLC0xNi4wNDE2OSAtOS4wNzAzMSwtMjEuODg5NjljLTUuODQ4LC01Ljg0OCAtMTMuNjE5OTMsLTkuMDcwMzEgLTIxLjg4OTY5LC05LjA3MDMxek0xMDYuNTcyODEsNjEuODg2NGMtMC44OTM3MSwwLjAyNjYzIC0xLjc0MTk0LDAuNDAwMTQgLTIuMzY1LDEuMDQxNDFsLTQxLjI4LDQxLjI4Yy0wLjg5ODY3LDAuODYyODEgLTEuMjYwNjgsMi4xNDQwNCAtMC45NDY0MSwzLjM0OTU2YzAuMzE0MjcsMS4yMDU1MiAxLjI1NTcsMi4xNDY5NiAyLjQ2MTIyLDIuNDYxMjJjMS4yMDU1MiwwLjMxNDI3IDIuNDg2NzUsLTAuMDQ3NzQgMy4zNDk1NiwtMC45NDY0MWw0MS4yOCwtNDEuMjhjMS4wMTc0MiwtMC45ODg5NyAxLjMyMzMzLC0yLjUwMTExIDAuNzcwMzQsLTMuODA3NzhjLTAuNTUyOTksLTEuMzA2NjcgLTEuODUxNDUsLTIuMTM5ODMgLTMuMjY5NzEsLTIuMDk4ek02MS45Miw3OS4xMmMtOC4yNjk3NiwwIC0xNi4wNDE2OSwzLjIyMjMxIC0yMS44ODk2OSw5LjA3MDMxbC0xNy4yLDE3LjJjLTUuMzgwMTYsNS4zNzY3MiAtOC41Mzg1NiwxMi4zODQzNyAtOS4wMDk4NCwxOS45MDc2NWMtMC4wNDEyOCwwLjY1NzA0IC0wLjA2MDQ3LDEuMzE4MTEgLTAuMDYwNDcsMS45ODIwM2MwLDguMjY5NzYgMy4yMjIzMSwxNi4wNDE2OSA5LjA3MDMxLDIxLjg4OTY5YzUuODQ4LDUuODQ4IDEzLjYxOTkzLDkuMDcwMzEgMjEuODg5NjksOS4wNzAzMWM4LjI2OTc2LDAgMTYuMDQxNjksLTMuMjIyMzEgMjEuODg5NjksLTkuMDcwMzFsMTcuMiwtMTcuMmM1Ljg0OCwtNS44NDggOS4wNzAzMSwtMTMuNjE5OTMgOS4wNzAzMSwtMjEuODg5NjljMCwtNC43MDU5MiAtMS4wNzkwMywtOS4yNDI0OCAtMy4wNTcwMywtMTMuMzYzNmwtNS4yNDczNCw1LjI1NDA2YzAuOTE4NDgsMi41NzMxMiAxLjQyNDM3LDUuMjk5MDUgMS40MjQzNyw4LjEwOTUzYzAsNi40MzI4IC0yLjUwNzAxLDEyLjQ3NDE5IC03LjA1NDY5LDE3LjAyNTMxbC0xNy4yLDE3LjJjLTQuNTUxMTIsNC41NDc2OCAtMTAuNTkyNTEsNy4wNTQ2OSAtMTcuMDI1MzEsNy4wNTQ2OWMtNi40MzI4LDAgLTEyLjQ3NDE5LC0yLjUwNzAxIC0xNy4wMjUzMSwtNy4wNTQ2OWMtNC41NTExMiwtNC41NDc2OCAtNy4wNTQ2OSwtMTAuNTkyNTEgLTcuMDU0NjksLTE3LjAyNTMxYzAsLTYuNDMyOCAyLjUwNzAxLC0xMi40NzQxOSA3LjA1NDY5LC0xNy4wMjUzMWwxNy4yLC0xNy4yYzQuNTUxMTIsLTQuNTQ3NjggMTAuNTkyNTEsLTcuMDU0NjkgMTcuMDI1MzEsLTcuMDU0NjljMi44MTA0OCwwIDUuNTM2NDEsMC41MDU4OSA4LjEwOTUzLDEuNDI0MzdsNS4yNTQwNiwtNS4yNDczNGMtNC4xMjExMiwtMS45NzggLTguNjU3NjgsLTMuMDU3MDMgLTEzLjM2MzYsLTMuMDU3MDN6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=';
        }, 1000)
    })
    .catch(err => {
        console.log('Something went wrong', err);
    });
});
document.querySelector(".productPageShareTg").addEventListener("click", function(e){
    e.preventDefault();
    window.open("https://t.me/share/url?url="+location.href+"&text=Check this amazing thing",'_blank');
});
// console.log("https://t.me/share/url?url={"+location.href+"}&text={Check this amazing thing}");