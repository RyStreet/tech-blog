const blogSelect = async (event) => {
    event.preventDefault();
    console.log("clicked Blog")

}

document
.querySelector('#blogPosts')
.addEventListener('click', blogSelect)