async function loadSpecificDocsData(url) {
    try {
        const response = await fetch(url);
    
        if(!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const html = await response.text();
        console.log(html);

       return html;
    } catch (error) {
        console.error('Error loading data:', error);
        return [];
    }
}

async function viewMain(fileID, multiSelect) {
    if(!multiSelect){
        d3.selectAll("svg").remove();
    }
    

    const url = "http://127.0.0.1:8080/" + fileID;

    if (fileID) {
        var thing = await loadSpecificDocsData(url);
        updateVisualization([thing]);
    } else {
        console.log("error: no data");
    }
}

function updateVisualization(data) {

    var svgWidth = 900; // Set SVG width
    var svgHeight = 600; // Set SVG height
    
    var canvas = d3.select("#docView")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth)

    var drag = d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);

    // Create a group for each data element
    var someData = canvas.selectAll("g")
        .data(data) // Bind 'thing' array to the elements
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
            return "translate(0," + (i * 20 + 20) + ")"; // Increment y-coordinate for each group
        })
        .call(drag);

    // Append text to each group and wrap it
    var text = someData.append("text")
        .attr("font-size", "1.5em")
        .attr("id", "rect-text")
        .attr("x", 10) // Position the text inside the rectangle
        .attr("y", 0) // Initial y position
        .text(function(d) { return d; });

    text.each(function() {
        var words = d3.select(this).text().split(/\s+/).reverse(),
            word,
            line = [],
            lineHeight = 1.1, // ems
            dy = parseFloat(d3.select(this).attr("dy")),
            tspan = d3.select(this).text(null).append("tspan").attr("x", 10).attr("y", 0).attr("dy", dy + "em");

        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > svgWidth - 20) { // Adjust width based on the size of the SVG
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = d3.select(this).append("tspan").attr("x", 10).attr("y", function() {
                    return parseFloat(tspan.attr("y")) + lineHeight + "em"; // Increment y-coordinate for new line
                }).attr("dy", dy + "em").text(word);
            }
        }
    });

    // Append a rectangle to each group
    text.each(function() {
        var bbox = this.getBBox();
        var padding = 5;

        d3.select(this.parentNode).insert("rect", "text")
            .attr("x", bbox.x - padding)
            .attr("y", bbox.y - padding)
            .attr("width", bbox.width + (padding * 2))
            .attr("height", bbox.height + (padding * 2))
            .attr("fill", "blanchedalmond")
            .attr("rx", "10")
            .attr("ry", "10")
            .attr("stroke", "#ff8e53")
            .attr("stroke-width", 2)

    });

    function dragstarted(event, d){
        d3.select(this).raise().classed("active", true);
    }

    function dragged(event, d) {
        d3.select(this).attr("transform", "translate(" + event.x + "," + event.y + ")");
    }

    function dragended(event, d) {
        d3.select(this).classed("active", false);
    }
}
