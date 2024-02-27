async function loadDocs(url) {
    try {
        const response = await fetch(url);
    
        if(!response.ok) {
            throw new Error(' Failed to fetch data ');
        }

        const html = await response.text();

        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;

        const fileLinks = tempElement.querySelectorAll('a');

        const fileNames = Array.from(fileLinks).map(link => link.getAttribute('href'));

        // Filter out directories and parent links
        const filteredFileNames = fileNames.filter(name => !name.endsWith('/') && name !== '../');

        return filteredFileNames;

    } catch (error) {
        console.error('Error loading data:', error)
        return [];
    }


}

var multiSelect = false;
const url = "http://127.0.0.1:8080";

function toggleMultiSelect(){
    multiSelect = !multiSelect;

    var button = d3.select("#multiSelect");
    if(multiSelect) {
        button.style("border", "3px solid green");
    }else {
        button.style("border", "3px solid red");
    }
}


async function listMain() {
    const stuff = await loadDocs(url);
    console.log(stuff);

    d3.select("#multiSelect").on("click", function(event) {
        toggleMultiSelect();
        console.log("Multiselect is now" + multiSelect);
    });

    var ul = d3.select("#docList");

    // Bind data to list items
    var list = ul.selectAll("li")
        .data(stuff)
        .enter()
        .append("li")
        .attr("draggable", true)
        .attr("class", "listItems")
        .text(function(d) { return d; })
        .on("click", function(event, d) {
            viewMain(d, multiSelect);
        });

    // Initialize sortable on the list
    $("#docList").sortable({
        //axis: "y",
        //containment: "parent",
        //update: function(event, ui) {
            // This event is triggered when the user stopped sorting and the DOM position has changed.
        //}
    });

}




listMain();











