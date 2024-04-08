

var container = d3.select("#my_dataviz");

var width = 450
height = 450
margin = 60

var radius = Math.min(width, height) / 2 - margin

var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var data = { a: 20, b: 40, c: 10 }

var color = d3.scaleOrdinal()
    .domain(data)
    .range(d3.schemeCategory10);

var pie = d3.pie()
    .value(function (d) { return d.value; })
var data_ready = pie(d3.entries(data))
var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

var mislead = ["49%", "60%", "22%"]

svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function (d) { return (color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

var idx = -1;
var grade = ["Action", "SciFi", "Comedy"]
svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function (i) {
        idx++;
        return grade[idx] + ' - ' + mislead[idx]
    })
    .attr("transform", function (d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
    .style("text-anchor", "middle")
    .style("font-size", 17)

svg.append("text")
    .attr("transform", "translate(2, -200)")
    .attr("x", -110)
    .attr("y", 5)
    .attr("font-size", "22px")
    .text("Movie Categories")