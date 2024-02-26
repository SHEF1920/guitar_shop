document.addEventListener("DOMContentLoaded", () => {
    var preloader = document.getElementById("preloader");
    preloader.style.display = "block";

    const randomFilter = Math.ceil(Math.random() * 50);
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${randomFilter}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            preloader.style.display = "none";
            renderData(data);
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            preloader.innerHTML = "⚠️ Что-то пошло не так";
        });
});

function renderData(data) {
    var targetElement = document.getElementById("temp");
    var template = document.getElementById("commentTemplate");

    targetElement.innerHTML = "";

    data.forEach(function(item) {
        var clone = document.importNode(template.content, true);

        clone.querySelector("li").innerHTML = clone.querySelector("li").innerHTML
            .replace("{{email}}", item.email)
            .replace("{{body}}", item.body);

        targetElement.appendChild(clone);
    });
}

