window.onload = function() {
    const signUpBtn = document.getElementById("signUp")
    signUpBtn.onclick = signUp
    const signInBtn = document.getElementById("signIn")
    signInBtn.onclick = signIn
    const githubBtn = document.getElementById("githubSign")
    githubBtn.onclick = github
    const guestLogin = document.getElementById("guestLogin")
    guestLogin.onclick = guest
    if(document.cookie){
      console.log(document.cookie);
      document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
      window.location = "/"
      return false
    }
    if(localStorage.getItem("token")) localStorage.clear()
}

async function signUp(event) {
    if(event) event.preventDefault();
    const user = document.querySelector("#signUpUser"),
          email = document.querySelector("#signUpEmail"),
          pass = document.querySelector("#signUpPass")
    let body = {username: user.value, email: email.value, password: pass.value}
    body = JSON.stringify(body);
    if(user.value !== ""&& email.value !== "" && pass.value !== ""){
        
        const response = await fetch( "/add", {
            method:'POST',
            headers: { 'Content-Type': 'application/json'},
            body
        }).then(async (response) =>{
            if(response.status == 200){
                const rsp = await(
                    "/login/auth", {
                        method:'POST',
                        headers: { 'Content-Type': 'application/json'},
                        body
                    })
            }
    
        }).then(response => {
            if(response !== "bad login"){
                document.cookie = `token=${response}`;
                window.location = "/play-game"
                return false;
            }
            else console.log("bad login");
        });
        console.log(await response);
    }else{
        //todo add message
    }
}

async function signIn(event) {
    event.preventDefault()
    let username = null
    let email = null    
    const userEmail = document.querySelector("#signInName"),
    pass = document.querySelector("#signInPass")
    let parsedName = userEmail.value.match( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    
    if(parsedName != null) {
        email = parsedName[0]
    } else {
        username = userEmail.value
    }
    
    let body = {username: username, email: email, password: pass.value}
    if(userEmail.value !== "" && pass.value !== ""){
        body = JSON.stringify(body);
        const response = await fetch( "/login/auth", {
            method:'POST',
            headers: { 'Content-Type': 'application/json'},
            body
        }).then(response => response.json())
        .then(response =>{
            if(response !== "bad login"){
                document.cookie = `token=${response}`;
                window.location = "/play-game"
                return false;
            }
            else console.log("bad login");
        })
    }
}

function github() {
    try {
        window.location = "/auth/github";
        return false;
    } catch (error) {
        console.error("Error redirecting to GitHub authentication:", error);
    }   
}

function guest() {
    window.location = "/play-game"
    return false
}
