onload = function () {
    this.fetch("/data.json").then((res) => {
        return res.json()
    })
    .then((data) => {
            create(data, "weekly");
            document.getElementById("clone").remove();
    })
}


function create(data, type) {
    for (let item of data) {
        let dataBlock = document.getElementById("clone").cloneNode(true);
        dataBlock.classList.remove("hidden");
        dataBlock.removeAttribute("id");
        dataBlock.querySelector(".data__type").innerText = item.title;
        switch (item.title) {
            case "Work":
                dataBlock.classList.add("bg", "bg---work");
                break;
            case "Social":
                dataBlock.classList.add("bg", "bg---social");
                break;
            case "Play":
                dataBlock.classList.add("bg", "bg---play");
                break;
            case "Exercise":
                dataBlock.classList.add("bg", "bg---exercise");
                break;
            case "Study":
                dataBlock.classList.add("bg", "bg---study");
                break;
            case "Self Care":
                dataBlock.classList.add("bg", "bg---selfCare");
                break;
        }
        load(dataBlock, item.timeframes, type);
        document.querySelector(".timeTracker").appendChild(dataBlock);

    }
}

function reload(type) {
    fetch("/data.json").then((res) => {
        return res.json();
    })
    .then((data) => {
            let dataBlocks = document.querySelectorAll(".data");
            for (let dataBlock of dataBlocks) {
                let title = dataBlock.querySelector(".data__type").innerText
                let item = findItem(title, data);
                load(dataBlock, item, type);
            }
    })
}

function findItem(title, data) {
    let item = undefined;
    for (let d of data) {
        if (d.title = title) {
            item = d.timeframes;
            return item;
        }
    }
}

function load(dataBlock, item, type) {
    dataBlock.querySelector(".data__currentTime").innerText = item[type].current + "hrs";
    let message = "";
    switch (type) {
        case "daily":
            message = "Yestarday - ";
            break;
        case "monthly":
            message = "Last Month - ";
            break;
        case "weekly":
            message = "Last Week - "
            break;
    }
    dataBlock.querySelector(".data__previous").innerText = message + item[type].previous + "hrs";
}

function change(block) {
    let dataBlock = block.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    let type = block.innerText.toLowerCase();
    fetch("/data.json").then(res => res.json()).then((data) => {
        load(dataBlock, findItem(dataBlock.querySelector(".data__type").innerText, data), type);
    })

}

function showMenu(btn) {
    btn.querySelector(".submenu").classList.toggle("active");
}