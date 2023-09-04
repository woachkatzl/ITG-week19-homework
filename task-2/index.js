const blogContainer = document.querySelector(".container");

// Функция создать новый пост
const makePost = (postObject) => {
    //create html elements
    const newPost = document.createElement("div");
    const postTitle = document.createElement("h2");
    const postBody = document.createElement("p");

    //fill in content
    postTitle.textContent = postObject.title;
    postBody.textContent = postObject.body;

    //style elements
    newPost.classList.add("my-3");
    postTitle.classList.add("fs-4", "text-primary");

    newPost.append(postTitle, postBody);
    return newPost;
};

// Функция добавить пост на страницу
const addPost = (post) => {
    blogContainer.append(post);
}

// Функция заполнить страницу постами из API
const populatePosts = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
        if (!response.ok) //Проверка ответа с сервера. Если сервер возвращает неудачный статус, вроде он не выбросит стандартную ошибку и нужно это делать вручную.
            throw new Error(`Ошибка сети: ${response.statusText}`);

        const postsData = await response.json();

        postsData.forEach(postObject => {
            const newPost = makePost(postObject);
            addPost(newPost);
        })
    }
    catch (error) {
        console.log("Ошибка: ", error);
    }
};

window.addEventListener("DOMContentLoaded", populatePosts);