const prices = {
"Áo":150000,
"Quần":200000,
"Giày":500000
};

const form = document.getElementById("orderForm");

function showError(id,msg){
document.getElementById(id+"Error").innerText = msg;
}

function clearError(id){
document.getElementById(id+"Error").innerText="";
}

function validateProduct(){

let val = document.getElementById("product").value;

if(val===""){
showError("product","Vui lòng chọn sản phẩm");
return false;
}

clearError("product");
return true;

}

function validateQuantity(){

let val = document.getElementById("quantity").value;

if(val<1 || val>999){
showError("quantity","Số lượng từ 1-999");
return false;
}

clearError("quantity");
return true;

}

function validateDelivery(){

let val = document.getElementById("delivery").value;

let today = new Date();
let chosen = new Date(val);

let max = new Date();
max.setDate(today.getDate()+30);

if(chosen < today){
showError("delivery","Không được chọn ngày quá khứ");
return false;
}

if(chosen > max){
showError("delivery","Không quá 30 ngày");
return false;
}

clearError("delivery");
return true;

}

function validateAddress(){

let val = document.getElementById("address").value.trim();

if(val.length < 10){
showError("address","Ít nhất 10 ký tự");
return false;
}

clearError("address");
return true;

}

function validateNote(){

let val = document.getElementById("note").value;

if(val.length > 200){
showError("note","Không quá 200 ký tự");
return false;
}

clearError("note");
return true;

}

function validatePayment(){

let checked = document.querySelector('input[name="payment"]:checked');

if(!checked){
showError("payment","Chọn phương thức thanh toán");
return false;
}

clearError("payment");
return true;

}

function updateTotal(){

let product = document.getElementById("product").value;
let quantity = document.getElementById("quantity").value;

if(product && quantity){

let total = prices[product] * quantity;

document.getElementById("total").innerText =
total.toLocaleString("vi-VN");

}

}

document.getElementById("product").addEventListener("change",updateTotal);
document.getElementById("quantity").addEventListener("input",updateTotal);

const note = document.getElementById("note");
const counter = document.getElementById("charCount");

note.addEventListener("input",function(){

let len = note.value.length;

counter.innerText = len + "/200";

if(len>200){
counter.style.color="red";
showError("note","Quá 200 ký tự");
}else{
counter.style.color="black";
clearError("note");
}

});

form.addEventListener("submit",function(e){

e.preventDefault();

let valid =
validateProduct() &
validateQuantity() &
validateDelivery() &
validateAddress() &
validateNote() &
validatePayment();

if(valid){

let product = document.getElementById("product").value;
let quantity = document.getElementById("quantity").value;
let date = document.getElementById("delivery").value;
let total = document.getElementById("total").innerText;

document.getElementById("summary").innerHTML =
"Sản phẩm: "+product+"<br>"+
"Số lượng: "+quantity+"<br>"+
"Tổng tiền: "+total+" VND<br>"+
"Ngày giao: "+date;

document.getElementById("confirmBox").style.display="block";

}

});

document.getElementById("confirmBtn").onclick=function(){

document.getElementById("confirmBox").style.display="none";

document.getElementById("success").innerText=
"Đặt hàng thành công 🎉";

form.style.display="none";

}

document.getElementById("cancelBtn").onclick=function(){

document.getElementById("confirmBox").style.display="none";

}