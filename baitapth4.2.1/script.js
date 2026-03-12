const form = document.getElementById("registerForm");

function showError(id, message){
document.getElementById(id + "Error").textContent = message;
}

function clearError(id){
document.getElementById(id + "Error").textContent = "";
}

// Fullname
function validateFullname(){

let value = document.getElementById("fullname").value.trim();
let regex = /^[A-Za-zÀ-ỹ\s]+$/;

if(value === ""){
showError("fullname","Không được để trống");
return false;
}

if(value.length < 3){
showError("fullname","Ít nhất 3 ký tự");
return false;
}

if(!regex.test(value)){
showError("fullname","Chỉ chứa chữ cái và khoảng trắng");
return false;
}

clearError("fullname");
return true;

}

// Email
function validateEmail(){

let value = document.getElementById("email").value.trim();
let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(value === ""){
showError("email","Không được để trống");
return false;
}

if(!regex.test(value)){
showError("email","Email không đúng định dạng");
return false;
}

clearError("email");
return true;

}

// Phone
function validatePhone(){

let value = document.getElementById("phone").value.trim();
let regex = /^0\d{9}$/;

if(value === ""){
showError("phone","Không được để trống");
return false;
}

if(!regex.test(value)){
showError("phone","Số điện thoại phải 10 số và bắt đầu bằng 0");
return false;
}

clearError("phone");
return true;

}

// Password
function validatePassword(){

let value = document.getElementById("password").value;
let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

if(value === ""){
showError("password","Không được để trống");
return false;
}

if(!regex.test(value)){
showError("password","Ít nhất 8 ký tự, có chữ hoa, chữ thường và số");
return false;
}

clearError("password");
return true;

}

// Confirm Password
function validateConfirmPassword(){

let pass = document.getElementById("password").value;
let confirm = document.getElementById("confirmPassword").value;

if(confirm !== pass){
showError("confirmPassword","Mật khẩu không khớp");
return false;
}

clearError("confirmPassword");
return true;

}

// Gender
function validateGender(){

let gender = document.querySelector('input[name="gender"]:checked');

if(!gender){
showError("gender","Vui lòng chọn giới tính");
return false;
}

clearError("gender");
return true;

}

// Terms
function validateTerms(){

let checked = document.getElementById("terms").checked;

if(!checked){
showError("terms","Bạn phải đồng ý điều khoản");
return false;
}

clearError("terms");
return true;

}

// Submit
form.addEventListener("submit", function(e){

e.preventDefault();

let valid =
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirmPassword() &
validateGender() &
validateTerms();

if(valid){

let name = document.getElementById("fullname").value;

form.style.display = "none";

document.getElementById("successMessage").innerHTML =
"Đăng ký thành công! 🎉<br>Xin chào " + name;

}

});

// Blur validation
document.getElementById("fullname").addEventListener("blur", validateFullname);
document.getElementById("email").addEventListener("blur", validateEmail);
document.getElementById("phone").addEventListener("blur", validatePhone);
document.getElementById("password").addEventListener("blur", validatePassword);
document.getElementById("confirmPassword").addEventListener("blur", validateConfirmPassword);

// Clear error khi input
document.querySelectorAll("input").forEach(input=>{
input.addEventListener("input", function(){
let id = this.id;
if(id) clearError(id);
});
});