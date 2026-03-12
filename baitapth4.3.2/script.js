const steps = document.querySelectorAll(".step")
let currentStep = 0

const fullname = document.getElementById("fullname")
const dob = document.getElementById("dob")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirm = document.getElementById("confirm")

const progressBar = document.getElementById("progressBar")
const progressText = document.getElementById("progressText")

function showStep(index){

steps.forEach((step,i)=>{
step.style.display = i === index ? "block" : "none"
})

updateProgress()

}

function updateProgress(){

let percent = ((currentStep+1)/steps.length)*100
progressBar.style.width = percent+"%"
progressText.innerText = "Bước "+(currentStep+1)+" / "+steps.length

}

function showError(id,msg){
document.getElementById(id+"Error").innerText = msg
}

function clearError(id){
document.getElementById(id+"Error").innerText = ""
}

/* STEP 1 VALIDATE */

function validateFullname(){

let val = fullname.value.trim()
let regex = /^[A-Za-zÀ-ỹ\s]+$/

if(val===""){
showError("fullname","Không được để trống")
return false
}

if(val.length<3){
showError("fullname","Ít nhất 3 ký tự")
return false
}

if(!regex.test(val)){
showError("fullname","Chỉ chứa chữ")
return false
}

clearError("fullname")
return true

}

function validateDob(){

if(dob.value===""){
showError("dob","Chọn ngày sinh")
return false
}

clearError("dob")
return true

}

function validateGender(){

let g=document.querySelector("input[name='gender']:checked")

if(!g){
showError("gender","Chọn giới tính")
return false
}

clearError("gender")
return true

}

/* STEP 2 VALIDATE */

function validateEmail(){

let regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!regex.test(email.value)){
showError("email","Email không hợp lệ")
return false
}

clearError("email")
return true

}

function validatePassword(){

let regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

if(!regex.test(password.value)){
showError("password","≥8 ký tự gồm hoa thường và số")
return false
}

clearError("password")
return true

}

function validateConfirm(){

if(password.value!==confirm.value){
showError("confirm","Mật khẩu không khớp")
return false
}

clearError("confirm")
return true

}

/* NEXT */

function nextStep(){

let valid=false

if(currentStep===0){
valid = validateFullname() & validateDob() & validateGender()
}

if(currentStep===1){
valid = validateEmail() & validatePassword() & validateConfirm()
}

if(valid){

currentStep++

if(currentStep===2){
showSummary()
}

showStep(currentStep)

}

}

/* BACK */

function prevStep(){

currentStep--

showStep(currentStep)

}

/* SUMMARY */

function showSummary(){

let gender = document.querySelector("input[name='gender']:checked").value

document.getElementById("sumName").innerText = fullname.value
document.getElementById("sumDob").innerText = dob.value
document.getElementById("sumGender").innerText = gender
document.getElementById("sumEmail").innerText = email.value

}

/* FINISH */

function finish(){

document.querySelector(".container").style.display="none"

document.getElementById("success").innerText="Đăng ký thành công 🎉"

}

showStep(currentStep)