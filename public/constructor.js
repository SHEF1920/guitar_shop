document.addEventListener("DOMContentLoaded", function () {
    const tableForm = document.getElementById("tableForm");
    const resultContainer = document.getElementById("resultContainer");
    const russianCheckbox = document.getElementById("russian");
    const chinaCheckbox = document.getElementById("中文");

    russianCheckbox.addEventListener("change", function () {
        if (russianCheckbox.checked) {
            chinaCheckbox.checked = false;
        }
    });

    chinaCheckbox.addEventListener("change", function () {
        if (chinaCheckbox.checked) {
            russianCheckbox.checked = false;
        }
    });

    tableForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const days = document.getElementById("days").value;
        const maxLessons = document.getElementById("maxLessons").value;

        var language;
        if (russianCheckbox.checked) {
            language = "russian";
        } else if (chinaCheckbox.checked) {
            language = "中文";
        }


        const table = generateTable(days, maxLessons, language);
        table.classList.add("generated-table");

        resultContainer.innerHTML = "";

        resultContainer.appendChild(table);

        saveToLocalStorage({ days, maxLessons, language, tableData: tableTo2DArray(table)});
    });

    const savedParams = loadFromLocalStorage();
    if (savedParams) {
        document.getElementById("days").value = savedParams.days;
        document.getElementById("maxLessons").value = savedParams.maxLessons;
        if (savedParams.language === "russsian") {
            russianCheckbox.checked = true;
        } else if (savedParams.language === "中文") {
            chinaCheckbox.checked = true;
        }

        if (savedParams.tableData) {
            const storedTable = renderStoredTable(savedParams.tableData);

            storedTable.classList.add("generated-table");
            resultContainer.appendChild(storedTable);
        }
    }
});

function renderStoredTable(dataArray) {
    const table = document.createElement("table");

    dataArray.forEach((rowArray) => {
        const row = document.createElement("tr");

        rowArray.forEach((cellText) => {
            const cell = document.createElement("td");
            cell.textContent = cellText;
            row.appendChild(cell);
        });

        table.appendChild(row);
    });

    return table;
}

function tableTo2DArray(table) {
    const dataArray = [];
    const rows = table.querySelectorAll("tr");

    rows.forEach((row) => {
        const rowArray = [];
        const cells = row.querySelectorAll("td");

        cells.forEach((cell) => {
            rowArray.push(cell.textContent);
        });

        dataArray.push(rowArray);
    });

    return dataArray;
}

function generateTable(days, maxLessons, language) {
    const table = document.createElement("table");
    if (language == "russian") {
        var lessonList = ["физкультура", "математика", "русский язык", "физика", "химия", "биология"];
    } else if (language == "中文") {
        var lessonList = ["化学", "中国语文科", "数学", "物理学", "体育教育", "生物学"];
    }

    for (let i = 0; i < days; i++) {
        const row = document.createElement("tr");
        const dayCell = document.createElement("td");
        dayCell.textContent = `День ${i + 1}`;
        row.appendChild(dayCell);

        for (let j = 1; j <= maxLessons; j++) {
            const lessonNumberCell = document.createElement("td");
            const lessonNameCell = document.createElement("td");

            lessonNumberCell.textContent = j;
            const randomIndex = Math.floor(Math.random() * lessonList.length);
            lessonNameCell.textContent = lessonList[randomIndex];

            row.appendChild(lessonNumberCell);
            row.appendChild(lessonNameCell);
        }

        table.appendChild(row);
    }
    return table;
}

function saveToLocalStorage(params) {
    localStorage.setItem("constructorParams", JSON.stringify(params));
}

function loadFromLocalStorage() {
    const savedParams = localStorage.getItem("constructorParams");
    return savedParams ? JSON.parse(savedParams) : null;
}
