
    var titel = document.getElementById('titel');
    var price = document.getElementById('price');
    var type = document.getElementById('type');
    var desc = document.getElementById('desc');
     var add = document.getElementById('add');
     var searchInput = document.getElementById('searchInput');

     var mood = 'create';
     var tempIndex;
    //  console.log(titel, price, type, desc, add)
    // array
   var datapro = [];
    if (localStorage.getItem("products") != null) {
      datapro = JSON.parse(localStorage.getItem("products"));
    }
  
// create

add.onclick = function(event) {  
    event.preventDefault();
    var errorTitle = document.getElementById("error-title");
    var errorPrice = document.getElementById("error-price");
    var errorType = document.getElementById("error-type");

    var isValid = true;
    if (titel.value === "") {
        errorTitle.style.display = "block";
        isValid = false;
    } else {
        errorTitle.style.display = "none";
    }
    if(price.value===""){
        errorPrice.style.display="block";
        isValid = false;
    } else{
        errorPrice.style.display="none";
    }
    if (type.value === "") {
        errorType.style.display = "block";
        isValid = false;
    } else {
        errorType.style.display = "none";
    }
    if (isValid) {
        var newpro = {
            titel: titel.value,
            price: price.value,
            type: type.value,
            desc: desc.value,
        };

        if (mood === 'create') {
            datapro.push(newpro);
        } else {
            datapro[tempIndex] = newpro;
            mood = 'create';
            add.textContent = "Add Product";
        }

        localStorage.setItem("products", JSON.stringify(datapro));
        console.log(datapro);

        clearForm();
        show();
    }
};

       


// clear
function clearForm() {
    titel.value = "";
    price.value = "";
    type.value = "";
    desc.value = "";
  }
// read
function show(){
    var tabl='';
    for (var i = 0; i < datapro.length; i++) {
        tabl += `<tr>
                   <td>${i}</td>
                    <td>${datapro[i].titel}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].type}</td>
                    <td>${datapro[i].desc}</td>
                    <td>
                        <button type="button" class="btn btn-success" onclick="update(${i})" >edit</button>
                        <button  class="btn btn-danger" onclick="delet(${i})">delete</button>
                    </td>
                </tr>`;
        
    }
document.getElementById('tbody').innerHTML=tabl;
}
  show();

//   delete
function delet(i) {
datapro.splice(i,1)
localStorage.products=JSON.stringify(datapro)
show();
}

// update
function update(i){  
titel.value=datapro[i].titel;
price.value=datapro[i].price;
type.value=datapro[i].type;
desc.value=datapro[i].desc;
add.innerHTML='update';
mood = 'update'; 
tempIndex = i; 
add.textContent ="update";
scroll({
    top:0,
    behavior:'smooth',
});
localStorage.products=JSON.stringify(datapro)
}
// search
function searchProduct(){
    var term=searchInput.value
   var tabl = "";
   var productItem="";
   for (var i = 0; i < datapro.length; i++) {
    productItem=datapro[i].titel
    if (productItem.toLowerCase().includes(term.toLowerCase())) {
        tabl += `<tr>
        <td>${i}</td>
         <td>${datapro[i].titel}</td>
         <td>${datapro[i].price}</td>
         <td>${datapro[i].type}</td>
         <td>${datapro[i].desc}</td>
         <td>
             <button type="button" class="btn btn-success" onclick="update(${i})" >edit</button>
             <button  class="btn btn-danger" onclick="delet(${i})">delete</button>
         </td>
     </tr>`;
    }
  
   }
   tbody.innerHTML = tabl;
    
  }

