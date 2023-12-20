var siteName = document.getElementById("sName")
var siteUrl = document.getElementById("sUrl")
var exampleModal = document.getElementById("exampleModal")
var urlAlertText = document.getElementById("urlAlert")
var nameAlertText = document.getElementById("nameAlert")

var container = []
if (localStorage.getItem("siteData") != null) {
    container = JSON.parse(localStorage.getItem("siteData"))
}
display()
function add() {
     if (validationName() == true && validationUrl() == true ){
        if(siteUrl.value.includes(("https" || "http" || "ftp") && '://' )){
            var site = {
                name : siteName.value,
                url : siteUrl.value
            }
        }
        
        else {
            var site = {
                name : siteName.value,
                url : "https://"+siteUrl.value
            }
            siteUrl.value = "https://"+siteUrl.value
        }
        container.push(site)
        localStorage.setItem("siteData" , JSON.stringify(container))
        display()
        clear()
    }
    else if (validationName() == false || validationUrl() == false  )
    {
        document.getElementById("exampleModal").classList.add( "d-block")
        document.getElementById("close").classList.add( "position-fixed")
    }

}

function display() {
    var box = ""
    for (var i = 0; i < container.length; i++) {  
        box+=
        `<tr class="align-middle">
            <th>${i+1}</th>
            <td>${container[i].name}</td>
            <td><a href="${siteUrl.value}" target="_blank"><button class="visit-button   text-white"><i class="fa-solid fa-eye eye-icon me-2"></i>Visit</button></a></td>
            <td><button onclick="deleteR(${i})" class=" delete-button "><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
        </tr>`
    }
    document.getElementById("table").innerHTML = box
}

function clear() {
    siteName.value=""
    siteUrl.value=""
    siteName.classList.remove("is-valid")
    siteUrl.classList.remove("is-valid")
    urlAlertText.classList.add("d-none")
}

function deleteR(rowNumber) {
    container.splice( rowNumber , 1)
    localStorage.setItem("siteData" , JSON.stringify(container))
    display()
}


function validationName() {
    var text = siteName.value ; 
    var regexName = /^[\w]{3,50}$/
    if (regexName.test(text) == true) {
        //siteName.classList.replace("is-invalid","is-valid")
        siteName.classList.add("is-valid")
        siteName.classList.remove("is-invalid")
        nameAlertText.classList.add("d-none")
        return true
    }
    else if(regexName.test(text) == false && validationUrl()==true )
     {
        siteName.classList.add("is-invalid")
        siteName.classList.remove("is-valid")
        urlAlertText.classList.add("d-none")
        siteUrl.classList.add("is-valid")
        siteUrl.classList.remove("is-invalid")
        nameAlertText.classList.remove("d-none")
        return false
    }
    else if(regexName.test(text) == false && validationUrl()==false )
     {
        siteName.classList.add("is-invalid")
        siteName.classList.remove("is-valid")
        urlAlertText.classList.add("d-none")
        siteUrl.classList.add("is-invalid")
        siteUrl.classList.remove("is-valid")
        nameAlertText.classList.remove("d-none")
        return false
    }
}
function validationUrl() {
    var text = siteUrl.value ; 
    var regexName = /^(https:|http:|ftp:)?(\/\/)?(www\.)?[A-z]{3,50}\.[A-z]{2,3}\/?$/i
    if (regexName.test(text) == true) {
        siteUrl.classList.add("is-valid")
        siteUrl.classList.remove("is-invalid")
        urlAlertText.classList.add("d-none")
        return true
    }
    else {
        siteUrl.classList.add("is-invalid")
        siteUrl.classList.remove("is-valid")
        urlAlertText.classList.remove("d-none")
        return false
    }
}

function closeButton() {
    document.getElementById("exampleModal").classList.remove( "d-block")
    document.getElementById("close").classList.remove( "position-fixed")
}

document.addEventListener('click' , function(e){
  if(e.target.getAttribute('id')=='exampleModal'){closeButton()};
})