//chart setup
var svgHeight = 500;
var svgWidth = 960;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//svg wrapper
var svg = d3
    .select('#scatter')
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//import data.csv + format data
d3.csv("./assets/data/data.csv").then(function(riskData){
    riskData.forEach(function(data) {
        data.poverty =+ data.poverty;
        data.healthcare =+ data.healthcare;
    });

    // scales for chart
    var xScale = d3.scaleLinear()
    .range([0, width]);

    var yScale = d3.scaleLinear()
    .range([height, 0]);
    
    //axes
    var left = d3.axisLeft(yScale);
    var bottom = d3.axisBottom(xScale);

    var xMin = d3.min(riskData, d => d.healthcare);
    // console.log(xMin);
    var xMax = d3.max(riskData, d => d.healthcare);
    // console.log(xMax);
    var yMin = d3.min(riskData, d => d.poverty);
    // console.log(yMin);
    var yMax = d3.max(riskData, d => d.poverty);
    // console.log(yMax);

    xScale.domain([xMin, xMax]);
    yScale.domain([yMin, yMax]);

    chartGroup.append("g")
        .attr("transform", 'translate(0, ${height})')
        .call(bottom);

    chartGroup.append("g")
        .call(left);
    
    var circles = chartGroup.selectAll("circle")
    .data(riskData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.healthcare +1.5))
    .attr("cy", d => yScale(d.poverty +0.3))
    .attr("r", "12")
    .attr("fill", "skyblue")
    .attr("opacity", .5)

    // axes labels
    chartGroup.append("text")
        .style("font-size", "12px")
        .selectAll("tspan")
        .data(riskData)
        .enter()
        .append("tspan")
            .attr("x", function(data) {
                return xScale(data.healthcare +1.3);
            })
            .attr("y", function(data) {
                return yScale(data.poverty +.1);
            })
            .text(function(data) {
                return data.abbr
            });

});