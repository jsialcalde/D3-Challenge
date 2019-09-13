// @TODO: YOUR CODE HERE!
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");
  
    // clear svg is not empty
    if (!svgArea.empty()) {
      svgArea.remove();
    }
  
    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;
  
    var margin = {
      top: 50,
      bottom: 50,
      right: 50,
      left: 25
    };
  
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;
  
    // Append SVG element
    var svg = d3
      .select("#scatter")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);
  
    // Append group element
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    // Read CSV
    d3.csv("assets/data/data.csv")
      .then(function(healthData) {
  
  
        // parse data
        healthData.forEach(function(data) {
                  data.poverty = +data.poverty;
                  data.povertyMoe = +data.povertyMoe;
                  data.age = +data.age;
                  data.ageMoe = +data.ageMoe;
                  data.income = +data.income;
                  data.incomeMoe = +data.incomeMoe;
                  data.healthcare = +data.healthcare;
                  data.healthcareLow = +data.healthcareLow;
                  data.healthcareHigh = +data.healthcareHigh;
                  data.obesity = +data.obesity;
                  data.obesityLow = +data.obesityLow;
                  data.obesityHigh = +data.obesityHigh;
                  data.smokes = +data.smokes;
                  data.smokesLow = +data.smokesLow;
                  data.smokesHigh = +data.smokesHigh;
               
        });

        
        // create scales
        var xLinearScale = d3.scaleLinear()
          .domain(d3.extent(healthData, d => d.poverty))
          .range([0, width]);
  
        var yLinearScale = d3.scaleLinear()
          .domain([0, d3.max(healthData, d => d.healthcare)])
          .range([height, 0]);
  
        // create axes
        var xAxis = d3.axisBottom(xLinearScale);
        var yAxis = d3.axisLeft(yLinearScale);
  
        // append axes
        chartGroup.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis);
  
        chartGroup.append("g")
          .call(yAxis);
  

        // append circles
        var circlesGroup = chartGroup.selectAll("circle")
          .data(healthData)
          .enter()
          .append("circle")
          .attr("cx", d => xLinearScale(d.poverty))
          .attr("cy", d => yLinearScale(d.healthcare))
          .attr("r", "15")
          .attr("fill", "lightblue")
          .attr("stroke-width", "1")
          .attr("stroke", "black")
          
         
          
        
          //Add the SVG Text Element to the svgContainer
          var text = chartGroup
                          .selectAll("scatter")
                          .data(healthData)
                          .enter()
                          .append("text");
          
          //Add SVG Text Element Attributes
          var textLabels = text
                           .attr("x", function(d) {return xLinearScale(d.poverty)-10; })
                           .attr("y", function(d) {return yLinearScale(d.healthcare)+5; })
                           .text( function (d) { return d.abbr})
                          //  .attr("font-family", "sans-serif")
                          //  .attr("font-size", "12px")
                           .attr("fill", "white");          
   


            // Create axes labels
          chartGroup.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x", 0 - (height / 2))
          .attr("dy", "1em")
          .attr("class", "axisText")
          .text("Lacks Healthcare (%)");

           chartGroup.append("text")
          .attr("transform", `translate(${width / 2}, ${height + margin.top})`)
          .attr("class", "axisText")
          .text("in Poverty (%)");
  
  
        // Step 1: Initialize Tooltip
        var toolTip = d3.tip()
          .attr("class", "tooltip")
          .offset([80, -60])
          .html(function(d) {
            return (`
            <h6>${(d.state)}</h6>
            Poverty: ${(d.poverty)} <hr>
            Healthcare: ${d.healthcare}`);
          });
  
        // Step 2: Create the tooltip in chartGroup.
        chartGroup.call(toolTip);
  
        // Step 3: Create "mouseover" event listener to display tooltip
        circlesGroup.on("mouseover", function(d) {
          toolTip.show(d, this);
        })
        // Step 4: Create "mouseout" event listener to hide tooltip
          .on("mouseout", function(d) {
            toolTip.hide(d);
          });
      });
  }
  
  // When the browser loads, makeResponsive() is called.
  makeResponsive();
  
  // When the browser window is resized, makeResponsive() is called.
  d3.select(window).on("resize", makeResponsive);
  
  