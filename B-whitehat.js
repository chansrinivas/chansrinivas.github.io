
var canvasWidth = 1200;
var canvasHeight = 800;
var margin = 600;

var container = d3.select('#d3-viz-container');

var svg = d3
    .select('body')
    .append('svg')
    .attr('width', canvasWidth)
    .attr('height', canvasHeight);

    var width = svg.attr('width') - margin - 70;
    var height = svg.attr('height')  - margin + 100 ;
    

svg
    .append('text')
    .attr('transform', 'translate(100,0)')
    .attr('x', 500)
    .attr('y', 20)
    .attr('font-size', '24px')
    .text(
        'Wins per year for the Arkansas Football team',
    );

var xScale = d3
    .scaleLinear()
    .range([0, width])
    .domain([2000, 2016]);
var yScale = d3.scaleLinear().range([height, 0]);

var container_g = svg
    .append('g')
    .attr(
        'transform',
        'translate(' + margin + ',' + (margin - 550) + ')',
    );

d3.csv(
    'https://gist.githubusercontent.com/chansrinivas/232255b203bcb2208318681d8b58e672/raw/23bd62dca20ac669c6836039ea170a7b3a5ab8ec/wins.csv',
).then((data) => {
    yScale.domain([0, 13]);

    container_g
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#8B0000')
        .attr('stroke-width', 3.5)
        .attr(
            'd',
            d3
                .line()
                .x(function (d) {
                    return xScale(d.year);
                })
                .y(function (d) {
                    return yScale(d.winsperyear);
                }),
        );

    container_g
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function (d) {
            return xScale(d.year);
        })
        .attr('cy', function (d) {
            return yScale(d.winsperyear);
        })
        .attr('r', 5)
        .attr('fill', '#8B0000')
        .on('mouseover', function (event, d) {
            d3.select(this).attr('r', 8); // Increase the circle size 
            showTooltip(d);
        })
        .on('mouseout', function (event, d) {
            d3.select(this).attr('r', 5); // Reset the circle size
            hideTooltip();
        });

    function showTooltip(d) {
        svg
            .append('text')
            .attr('id', 'tooltip')
            .attr('x', xScale(d.year) + 90)
            .attr('y', yScale(d.winsperyear) + 85)
            .attr('text-anchor', 'middle')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold')
            .attr('fill', 'red')
            .text('Wins: ' + d.winsperyear);
    }

    function hideTooltip() {
        d3.select('#tooltip').remove();
    }

    // Display the X-axis
    container_g
        .append('g')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(
            d3
                .axisBottom(xScale)
                .ticks(data.length)
                .tickFormat(d3.format('d')),
        )
        .append('text')
        .attr('y', height - 254)
        .attr('x', width - 300)
        .attr('font-family', 'sans-serif')
        .attr('font-size', '11px')
        .attr('fill', 'black')
        .text('Year');


    // Display the Y-axis
    container_g
        .append('g')
        .call(
            d3
                .axisLeft(yScale)
                .tickFormat(function (d) {
                    return d;
                })
                .ticks(6),
        )
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 11)
        .attr('x', -109)
        .attr('dy', '-5.1em')
        .attr('font-family', 'sans-serif')
        .attr('font-size', '11px')
        .attr('fill', 'black')
        .text('Wins');
            });
