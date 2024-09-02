let searchInput = document.getElementById("searchInput");
let resultContainer = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppend(result){
    let {link, title, description} = result;

    let resultEl = document.createElement("div");
    resultEl.classList.add("result-item");
    
    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultEl.appendChild(titleEl);

    let breakEl = document.createElement("br");
    resultEl.appendChild(breakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultEl.appendChild(urlEl);

    let linkBreak = document.createElement("br");
    resultEl.appendChild(linkBreak);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("result-description");
    descriptionEl.textContent = description;
    resultEl.appendChild(descriptionEl);

    resultContainer.appendChild(resultEl);
}

function displayResults(searchResults){
    spinnerEl.classList.add("d-none");

    for(let result of searchResults){
        createAndAppend(result);
    }
}

function searchWiki(event){
    if(event.key === "Enter"){

        spinnerEl.classList.remove("d-none");
        resultContainer.textContent = "";

        let searching = searchInput.value;
        let url = "https://apis.ccbp.in/wiki-search?search="+ searching;

        let options = {
            method : "GET"
        };

        fetch(url, options)
        .then(function(response){
            return response.json();
        }).then(function(jsonData){
            let { search_results } = jsonData;
            displayResults(search_results);
        });
    }
}

searchInput.addEventListener("keydown", searchWiki);