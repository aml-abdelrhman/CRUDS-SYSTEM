let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;
let dataPro = JSON.parse(localStorage.getItem("product") || "[]");

function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#93d193";
        total.style.color = "#fff";
    } else {
        total.innerHTML = "Total Amount";
        total.style.background = "#a00d02";
        total.style.color = "#fff";
    }
}


total.onclick = getTotal;

submit.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if(title.value.trim() !== "" && price.value.trim() !== "" && category.value.trim() !== ""){
        if(mood === "create"){
            let cnt = newPro.count > 1 ? newPro.count : 1;
            for(let i=0;i<cnt;i++){
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmp] = newPro;
            mood = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
        }
        localStorage.setItem("product", JSON.stringify(dataPro));
        clearData();
        showData();
    } else {
        alert("Please fill all required fields!");
    }
}

function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

function showData(){
    let table = "";
    for(let i=0;i<dataPro.length;i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})">update</button></td>
            <td><button onclick="deleteData(${i})">delete</button></td>
        </tr>
        `;
    }
    document.getElementById("tbody").innerHTML = table;
    updateDeleteButton();
}

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.setItem("product", JSON.stringify(dataPro));
    showData();
}

function deleteAll(){
    dataPro = [];
    localStorage.removeItem("product");
    showData();
}

function updateDeleteButton(){
    let btnDelete = document.getElementById("deleteAll");
    btnDelete.innerHTML = dataPro.length > 0 ? `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>` : "";
}

function updateData(i){
    let p = dataPro[i];
    title.value = p.title;
    price.value = p.price;
    taxes.value = p.taxes;
    ads.value = p.ads;
    discount.value = p.discount;
    category.value = p.category;
    mood = "update";
    tmp = i;
    count.style.display = "none";
    submit.innerHTML = "Update";
    scroll({top:0, behavior:"smooth"});
    getTotal();
}

let searchMood = "title";
function getSearchMood(id){
    searchMood = id.includes("title") ? "title" : "category";
    let search = document.getElementById("search");
    search.placeholder = "Search By " + searchMood;
    search.value = "";
    search.focus();
    showData();
}

function searchData(value){
    value = value.toLowerCase();
    let table = "";
    for(let i=0;i<dataPro.length;i++){
        if(dataPro[i][searchMood].includes(value)){
            table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})">update</button></td>
                <td><button onclick="deleteData(${i})">delete</button></td>
            </tr>
            `;
        }
    }
    document.getElementById("tbody").innerHTML = table;
}

showData();
