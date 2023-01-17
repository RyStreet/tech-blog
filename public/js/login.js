const loginHandler = async (event) =>{
    event.preventDefault();
    //login form values
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if(email && password) {
        const logUser = await fetch('/api/users/auth/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-type': 'application/json'}
        });
        if (logUser.ok){
            document.location.replace('/dashboard')
            alert('Welcome Back!')
        }
        else{
            console.log(logUser.statusText)
        }
    }
}
document.querySelector('#login-user').addEventListener('submit', loginHandler)