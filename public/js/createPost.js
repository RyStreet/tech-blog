const createPost = async (event) => {
event.preventDefault();

console.log("HIT")

    const title = document.querySelector('input[name="newPostTitle"]').value;
    const content = document.querySelector('input[name="newPostText"]').value;

    if(title && content) {
        const newBlog = await fetch('/api/blogs/', {
            method: 'POST',
            body: JSON.stringify({
                title,
                content
            }),
            headers: {'Content-type': 'application/json'}
        });
        if (newBlog.ok){
            alert('Blog Posted!')
            document.location.reload('/dashboard')
        }
        else{
            console.log(newBlog.statusText)
        }
    }
}

document.querySelector('#newPostForm').addEventListener('submit', createPost)