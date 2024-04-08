// set the dimensions and margins of the graph
var margin = { top: 10, right: 50, bottom: 50, left: 90 },
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("https://gist.githubusercontent.com/chansrinivas/3377e2bbd352bd4fbec4efec8139650d/raw/d8441180ef4f29b4b4d620b637d6d3910f56d920/dotplot.csv",
    function (data) {
        // Add X axis
        var x = d3.scaleLinear()
            .domain([4, 5])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

        // Add X axis label
        svg.append("text")
            .attr("transform",
                "translate(" + (width / 2) + " ," +
                (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("Average Magnitude");

        // Y axis
        var y = d3.scaleBand()
            .range([0, height])
            .domain(data.map(function (d) { return d.location_name; }))
            .padding(1);
        svg.append("g")
            .call(d3.axisLeft(y))

        // Lines
        svg.selectAll("myline")
            .data(data)
            .enter()
            .append("line")
            .attr("x1", function (d) { return x(d.impact_magnitude); })
            .attr("x2", x(4)) // ending point of the line at x = 4
            .attr("y1", function (d) { return y(d.location_name); })
            .attr("y2", function (d) { return y(d.location_name); })
            .attr("stroke", "grey")
            .attr("stroke-width", "1px")
            .attr("stroke-dasharray", "4 4"); // make the line dashed

        svg.selectAll("mycircle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.impact_magnitude); })
            .attr("cy", function (d) { return y(d.location_name); })
            .attr("r", "6")
            .style("fill", "#bae1ff")
    })