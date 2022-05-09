
var cartarray=JSON.parse(localStorage.getItem("cartdata"))||[] 


console.log(cartarray)
displayData(cartarray);
function displayData(cartarray) {
   document.querySelector("#body").innerHTML = "";
    cartarray.forEach(function(elem,index){
        var row = document.createElement("tr");
          row.setAttribute("id","hovertorow");
        var div = document.createElement("div");
        div.setAttribute("id","imgCon");
      
        var img = document.createElement("img");
        img.setAttribute("src",elem.productImg);
        img.setAttribute("id","imgIn");
        div.append(img);
        var td1 = document.createElement("td");
        td1.setAttribute("id","name");

       

        td1.innerText = elem.productName;


        var td2 = document.createElement("td");
        td2.innerText = elem.Price;
        var td3 = document.createElement("td");
        let divQ = document.createElement("div");
        divQ.setAttribute("id","divQ");
        
        divQ.style.display = "flex"
        let increase = document.createElement("button")
         increase.addEventListener("click",function(){
             incQuant(elem,index);
         })
         increase.innerText = "+";
         increase.setAttribute("class", "incdc");
         let qunt = document.createElement("p");
         qunt.innerText = elem.quantity;
         qunt.setAttribute("id","qunt");
         let decrease = document.createElement("button");
            decrease.addEventListener("click",function(){
                decQuant(elem,index);
            });
            decrease.innerText = "-";
            decrease.setAttribute("class","incdc");
            divQ.append(decrease,qunt,increase);
            td3.append(divQ);


            var td6 = document.createElement("td");
            var split = elem.Price.trim().split(" ");
        
           
            
            td6.innerText = Math.floor(+split[0]*elem.quantity)+" MYR";
             td6.setAttribute("id","totalQP");
             var td7 = document.createElement("td");
             let btn = document.createElement("button");
            btn.setAttribute("id", "delete");
            btn.innerText = "Remove";
        
            td7.append(btn);
            btn.addEventListener("click",function(){
                deleteItem(index);
            })
            row.setAttribute("class","spaceBetweenTd");
            row.append(div,td1,td2,td3,td6,td7);
            document.querySelector("#body").append(row);
    })
}
showTotal();
function incQuant(elem,index){
    document.querySelector("#qunt").innerText = elem.quantity++;
 localStorage.setItem("cartdata",JSON.stringify(cartarray));
 console.log(elem.quantity)
    showTotal();
  
    displayData(cartarray);
}
function decQuant(elem,index) {
    if (elem.quantity > 1) {
        document.querySelector("#qunt").innerText = elem.quantity--;
    // here we have to send data to local storage
    showTotal();
   
} else{
  
  document.querySelector("#qunt")[index].innerText = 1;
 localStorage.setItem("cartdata",JSON.stringify(cartarray));
}

displayData(cartarray)
}
function showTotal(){
    var total = cartarray.reduce(function(acc,ele){
        var split = ele.Price.trim().split(" ");
        
        return acc+ +split[0] *ele.quantity;
    },0);

    document.querySelector("#total-p").innerText = Math.floor(total) + " MYR";
    localStorage.setItem("totalprice",total);
    var count = 0;
    document.querySelector("#Apply").addEventListener("click", check)
    function check(){
       
        var value= document.querySelector("#promo").value
      
         if(value == "kindmeal30" ){
             document.querySelector("#totalcontainer").style.height= "auto";
            document.querySelector("#total-p").style.textDecoration = "line-through"
            document.querySelector("#total-p").style.color = "gray"
            document.querySelector("#total-p").style.fontWeight = "400"
            count++;
            if(count == 1){
                var  dis = total*30/100
                document.querySelector("#discoun").innerText = "Discount :"
                document.querySelector("#discount").innerText = "- "+dis + " MYR";
              
            total = total-dis
            console.log(total)
            document.querySelector("#realprice").innerText = "Estimated Total :";
            document.querySelector("#totalr").innerText = Math.floor(total) + " MYR";
         
            localStorage.setItem("totalprice",total);
            }
           
         }
         else{
            document.querySelector("#total-p").innerText = Math.floor(total) + " MYR";
            localStorage.setItem("totalprice",total);
         }
    }


    // send all the data into the local storage
   
}
function deleteItem(index){
   cartarray.splice(index,1);
        //here set the local storage 
        localStorage.setItem("cartdata", JSON.stringify(cartarray));
      displayData(cartarray);
      showTotal();
    }

