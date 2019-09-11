// @TODO: YOUR CODE HERE!
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("#scatter");
  
    // // clear svg is not empty
    // if (!svgArea.empty()) {
    //   svgArea.remove();
    // }
  
    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;
  
    var margin = {
      top: 50,
      bottom: 50,
      right: 50,
      left: 50
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
        var xLinearScale = d3.scaleTime()
          .domain(d3.extent(healthData, d => d.povertyMoe))
          .range([0, width]);
  
        var yLinearScale = d3.scaleLinear()
          .domain([0, d3.max(healthData, d => d.healthcare)])
          .range([height, 0]);
  
        // create axes
        var xAxis = d3.axisBottom(xLinearScale);
        var yAxis = d3.axisLeft(yLinearScale).ticks(6);
  
        // // append axes
        // chartGroup.append("g")
        //   .attr("transform", `translate(0, ${height})`)
        //   .call(xAxis);
  
        // chartGroup.append("g")
        //   .call(yAxis);
  
        // // line generator
        // var line = d3.line()
        //   .x(d => xScale(d.date))
        //   .y(d => yScale(d.medals));
  
        // // append line
        // chartGroup.append("path")
        //   .data([healthData])
        //   .attr("d", line)
        //   .attr("fill", "none")
        //   .attr("stroke", "red");
  
        // // append circles
        // var circlesGroup = chartGroup.selectAll("circle")
        //   .data(healthData)
        //   .enter()
        //   .append("circle")
        //   .attr("cx", d => xTimeScale(d.date))
        //   .attr("cy", d => yLinearScale(d.medals))
        //   .attr("r", "10")
        //   .attr("fill", "gold")
        //   .attr("stroke-width", "1")
        //   .attr("stroke", "black");
  
  
        // // Step 1: Initialize Tooltip
        // var toolTip = d3.tip()
        //   .attr("class", "tooltip")
        //   .offset([80, -60])
        //   .html(function(d) {
        //     return (`<strong>${dateFormatter(d.date)}<strong><hr>${d.medals}
        //     medal(s) won`);
        //   });
  
        // // Step 2: Create the tooltip in chartGroup.
        // chartGroup.call(toolTip);
  
        // // Step 3: Create "mouseover" event listener to display tooltip
        // circlesGroup.on("mouseover", function(d) {
        //   toolTip.show(d, this);
        // })
        // // Step 4: Create "mouseout" event listener to hide tooltip
        //   .on("mouseout", function(d) {
        //     toolTip.hide(d);
        //   });
      });
  }
  
  // When the browser loads, makeResponsive() is called.
  makeResponsive();
  
  // When the browser window is resized, makeResponsive() is called.
  d3.select(window).on("resize", makeResponsive);
  
  
//   // Create the rectangles using data binding
//   var barsGroup = chartGroup.selectAll("rect")
//       .data(dataArray)
//       .enter()
//       .append("rect")
//       .attr("x", (d, i) => xScale(dataCategories[i]))
//       .attr("y", d => yScale(d))
//       .attr("width", xScale.bandwidth())
//       .attr("height", d => chartHeight - yScale(d))
//       .attr("fill", "green");
  
//   // Create the event listeners with transitions
//   barsGroup.on("mouseover", function() {
//     d3.select(this)
//               .transition()
//               .duration(500)
//               .attr("fill", "red");
//   })
//       .on("mouseout", function() {
//         d3.select(this)
//               .transition()
//               .duration(500)
//               .attr("fill", "green");
//       });
  
  