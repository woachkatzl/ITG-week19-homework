const titleInput = document.querySelector("#title-input");
const textInput = document.querySelector("#text-input");
const postsContainer = document.querySelector("#posts-container");
const button = document.querySelector(".btn");

// Функция создать новый пост
const createNewPost = (title, text) => {

    //create html elements
    const newPost = document.createElement("div");
    const postTitle = document.createElement("h2");
    const postBody = document.createElement("p");

    //fill in content
    postTitle.textContent = title;
    postBody.textContent = text;

    //style elements
    newPost.classList.add("my-3");
    postTitle.classList.add("fs-4", "text-primary");

    newPost.append(postTitle, postBody);
    return newPost;
};

// Функция сделать POST-запрос серверу и добавить пост на страницу
const addPostThroughServer = (title, text) => {

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            body: text
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(postObject => {
            const post = createNewPost(postObject.title, postObject.body);
            postsContainer.append(post);
        })
        .catch(error => console.log("Ошибка: ", error));
};

// Функция обработчик события кнопки для создания поста
const post = (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const text = textInput.value;

    addPostThroughServer(title, text);

    titleInput.value = "";
    textInput.value = "";
};

button.addEventListener("click", post);