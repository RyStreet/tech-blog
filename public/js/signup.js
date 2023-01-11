const signUpHandler = async (event) =>{
    event.preventDefault();

    const username = document.querySelector('#username-sign').value.trim();
    const email = document.querySelector('#email-sign').value.trim();
    const password = document.querySelector('#password-sign').value.trim();

    if(username && email && password){
        const newUser = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        if(newUser.ok){
            alert('User Created! Welcome to the Tech Blog!');
            document.location.replace('/dashboard');
        } else{
            alert(response.statusText)
        }
    }
}

document.querySelector('#create-user').addEventListener("submit", signUpHandler);
