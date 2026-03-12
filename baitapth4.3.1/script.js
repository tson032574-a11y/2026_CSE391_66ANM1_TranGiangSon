const form = document.getElementById("registerForm")

const fullname = document.getElementById("fullname")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const password = document.getElementById("password")
const confirm = document.getElementById("confirm")

function showError(id, msg) {
    document.getElementById(id + "Error").innerText = msg
}

function clearError(id) {
    document.getElementById(id + "Error").innerText = ""
}

function validateFullname() {
    let name = fullname.value.trim()
    let regex = /^[A-Za-zÀ-ỹ\s]+$/

    if (name === "") {
        showError("fullname", "Không được để trống")
        return false
    }

    if (name.length < 3) {
        showError("fullname", "Ít nhất 3 ký tự")
        return false
    }

    if (!regex.test(name)) {
        showError("fullname", "Chỉ chứa chữ và khoảng trắng")
        return false
    }

    clearError("fullname")
    return true
}

function validateEmail() {
    let val = email.value.trim()
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (val === "") {
        showError("email", "Không được để trống")
        return false
    }

    if (!regex.test(val)) {
        showError("email", "Email không hợp lệ")
        return false
    }

    clearError("email")
    return true
}

function validatePhone() {
    let val = phone.value.trim()
    let regex = /^0\d{9}$/

    if (!regex.test(val)) {
        showError("phone", "SĐT phải 10 số và bắt đầu bằng 0")
        return false
    }

    clearError("phone")
    return true
}

function validatePassword() {
    let val = password.value
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

    if (!regex.test(val)) {
        showError("password", "≥8 ký tự gồm chữ hoa, chữ thường và số")
        return false
    }

    clearError("password")
    return true
}

function validateConfirm() {
    let pass = password.value
    let conf = confirm.value

    if (conf === "") {
        showError("confirm", "Không được để trống")
        return false
    }

    if (pass !== conf) {
        showError("confirm", "Mật khẩu không khớp")
        return false
    }

    clearError("confirm")
    return true
}

function validateGender() {
    let g = document.querySelector("input[name='gender']:checked")

    if (!g) {
        showError("gender", "Chọn giới tính")
        return false
    }

    clearError("gender")
    return true
}

function validateTerms() {
    let t = document.getElementById("terms").checked

    if (!t) {
        showError("terms", "Bạn phải đồng ý điều khoản")
        return false
    }

    clearError("terms")
    return true
}

form.addEventListener("submit", function (e) {

    e.preventDefault()

    let valid =
        validateFullname() &
        validateEmail() &
        validatePhone() &
        validatePassword() &
        validateConfirm() &
        validateGender() &
        validateTerms()

    if (valid) {

        form.style.display = "none"

        document.getElementById("success").innerText =
            "Đăng ký thành công 🎉, Xin chào " + fullname.value
    }

})


fullname.addEventListener("blur", validateFullname)
email.addEventListener("blur", validateEmail)
phone.addEventListener("blur", validatePhone)
password.addEventListener("blur", validatePassword)
confirm.addEventListener("blur", validateConfirm)

document.querySelectorAll("input").forEach(input => {

    input.addEventListener("input", () => {

        let id = input.id

        if (id) {
            clearError(id)
        }

    })

})
password.addEventListener("input", function () {

    let val = password.value
    let bar = document.getElementById("strengthBar")

    let score = 0

    if (val.length >= 8) score++
    if (/[A-Z]/.test(val)) score++
    if (/[0-9]/.test(val)) score++
    if (/[^A-Za-z0-9]/.test(val)) score++

    if (score <= 1) {
        bar.style.width = "33%"
        bar.style.background = "red"
    }
    else if (score <= 3) {
        bar.style.width = "66%"
        bar.style.background = "orange"
    }
    else {
        bar.style.width = "100%"
        bar.style.background = "green"
    }

})

document.getElementById("togglePass").onclick = function () {

    password.type = password.type === "password" ? "text" : "password"

}

fullname.addEventListener("input", function () {

    document.getElementById("nameCount").innerText = this.value.length

})