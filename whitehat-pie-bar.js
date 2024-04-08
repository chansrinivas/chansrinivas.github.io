var container = d3.select("#my_whitedataviz");


const margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width2 = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

const svgWhite = d3.select("#my_whitedataviz")
    .append("svg")
    .attr("width", width2 + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

    svgWhite.append("text")
    .attr("x", (width2 / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("text-decoration", "underline")
    .text("Movie Categories and Viewership");

    d3.csv("https://gist.githubusercontent.com/chansrinivas/5a664e5242b0626de2be05ecca213c21/raw/824eac06b544c31f2ff076dcb72bb4ed93b6f68d/movie.csv", function(data) {

    const x = d3.scaleBand()
        .range([0, width2])
        .domain(data.map(d => d.Category))
        .padding(0.2);
        svgWhite.append("g")
        // .attr("fill", "#000000")

        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(10,0)")
        .attr("fill", "#000000")
        .style("text-anchor", "end");


    const y = d3.scaleLinear()
        .domain([0, 80])
        .range([height, 0]);
        svgWhite.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("dx", "-12em")
        .style("text-anchor", "end")
        .attr("fill", "#000000")
        .text("% of Viewers");;

        svgWhite.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.Category))
        .attr("y", d => y(d.Value))
        .attr("width", x.bandwidth() - 10)
        .attr("height", d => height - y(d.Value))
        .attr("fill", "#CCE1FF")

        svgWhite.selectAll(".text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", d => x(d.Category) + 33)
        .attr("y", d => y(d.Value) - 14)
        .attr("dy", ".75em")
        .style("font", "14px times")
        .text(function (d) { return d.Value; });

})