const editBlog = async (event) =>{
    event.preventDefault();
    console.log("Hit")

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    const title = document.querySelector('input[name="editPostTitle"]').value;
    const content = document.querySelector('input[name="editPostText"]').value;

    if(title && content) {
        const editBlog = await fetch(`/api/blogs/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                content
            }),
            headers: {'Content-type': 'application/json'}
        });
        if (editBlog.ok) {
            alert('Blog Edited!')
            document.location.replace('/dashboard')
        }
        else{
            console.log(editBlog.statusText)
        }
    } 


}

const deleteBlog = async (event) =>{
    event.preventDefault();
    console.log("HIT")

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    const deleteBlog = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE'
    });
    if(deleteBlog.ok){
        alert('Blog Deleted'),
        document.location.replace('/dashboard')
    } else {
        alert(deleteBlog.statusText)
    }
};

document.querySelector('#deletePostBtn').addEventListener('click', deleteBlog)

document
.querySelector('#editBlogForm')
.addEventListener('submit', editBlog);