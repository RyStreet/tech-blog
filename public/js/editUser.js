const editUser = async (event) => {
    event.preventDefault();
    console.log("Hit")

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1]
    
    const username= document.querySelector('input[name="editUserName"]').value;
    const email= document.querySelector('input[name="editUserEmail"]').value;

    if(username && email) {
        const editUser = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                username,
                email
            }),
            headers: {'Content-type': 'application/json'}
        });
        if (editUser.ok) {
            alert('User Edited')
            document.location.replace('/dashboard')
        }
        else{
            alert("Include both Username and Email")
        }
    }
}
document
.querySelector('#editUserForm')
.addEventListener("submit", editUser)