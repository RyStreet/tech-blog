const postComment = async (event) => {
    event.preventDefault();
    console.log("submit comment")

    
    const content = document.querySelector('input[name="commentContent"]').value;
    
    const blog_id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    console.log(blog_id)

    if (content) {
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({
                content,
                blog_id,
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){
            document.location.reload();
        } else {
            alert(response.statusText)
            console.log(response.statusText)
        }
    }
    
}

document
.querySelector('.createComment')
.addEventListener('submit', postComment)

