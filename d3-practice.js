
$(document).ready(function(){

//flag variables 

		var labels = false
		$("#labels").change(function(){
				if ($(this).is(':checked')){
					labels = true;
				}
				else {
					labels = false;
				}
			})
		var axes = true
		$("#axes").change(function(){
			if ($(this).is(':checked')){
				axes = true
		}
			else {
				axes = false
			}
		})
	  $("form#height").submit(function(event){
	  	event.preventDefault();
	

//input variables

	  	var datasetRaw = $("#dataset").val();
	  	var dataset = datasetRaw.split(",");
	  	var numberData = dataset.map(function(d){
	  		return parseInt(d)
	  	})
	  	var dataShape = $("#shapeGroup input[type='radio']:checked").val();
	  	var backgroundClass = $("#bgGroup input[type='radio']:checked").val();
	  	var itemColor = $("#itemGroup input[type='radio']:checked").val();
	  	var wideChoice = parseInt($("input#mySlider").val());
	  	var heightChoice = parseInt($("input#heightSlider").val());
	  	var stroke = $("#strokeGroup input[type='radio']:checked").val();
		var w = (500 * (wideChoice * .1))
		var h = (500 * (heightChoice * .1))
		var padding = 30
		

//scale variables

	var heightScale = d3.scale.linear()
				.domain([0, (_.max(numberData) * 1.5)])
				.range([0, h])
	var radiusScale = d3.scale.linear()
				.domain([0, (_.max(numberData))])
				.range([0, ( 2 * (w / dataset.length))])
	var xScale = d3.scale.linear()
				.domain([0, (_.max(numberData) * 1.5)])
				.range([0, w])
	var yScale = d3.scale.linear()
				.domain([0, (_.max(numberData) * 1.1)])
				.range([h, 0])

//axis variables

	var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient("bottom")
				.ticks(5);
	var yAxis = d3.svg.axis()
				.scale(yScale)
				.orient("left")
				.ticks(5);

// d3 container object

	var svg = d3.select("#dataBox")
			.append("svg")
			.attr("class", backgroundClass)
			.attr("width", w)
			.attr("height", h)

	if (dataShape === "rect") {
		svg.selectAll("rect")
			.data(dataset)
			.enter()
			.append("rect")
						.attr("fill", itemColor)
						.attr("opacity", function(d){
							 if (d < (_.max(numberData) / 2)){
								return .5;
							}
							else if(d < (_.max(numberData) / 3)){
								return .25
							}
							else if(d < (_.max(numberData))){
								return .85
							}
							else{
								return 1;
							}
						})
						.attr("stroke", stroke)
						.attr("x", function(d, i){
							return padding + (i * (w / dataset.length));
						})
						.attr("width", 20)
						.attr("y", function(d){
							return (h - padding) - heightScale(d);
						})
						.attr("height", function(d){
							return heightScale(d);
						})
					if(labels) {
					svg.selectAll("text")
						.data(dataset)
						.enter()
						.append("text")
							.attr("x", function(d, i){
								return padding + (i * (w / dataset.length));
							})
							.attr("y", function(d){
								return (h - padding) - heightScale(d);
							})
							.text(function(d){
								return (Math.floor((heightScale(d)/h)*100)) + "% or " + d + " people"
							})
					}
					if(axes){
						svg.append("g")
							.attr("class", "axis")
							.attr("transform", "translate(0," + (h - padding) + ")")
							.call(xAxis)
						svg.append("g")
							.attr("class", "axis")
							.attr("transform", "translate(" + padding + ",0)")
							.call(yAxis)
					}
		}

	else if (dataShape === "circle") {
		svg.selectAll("circle")
			.data(dataset)
			.enter()
			.append("circle")
						.attr("fill", itemColor)
						.attr("stroke", stroke)
						.attr("class", "anim")
						.attr("opacity", function(d){
							 if (d < (_.max(numberData) / 2)){
								return .5;
							}
							else if(d < (_.max(numberData) / 3)){
								return .25
							}
							else if(d < (_.max(numberData))){
								return .85
							}
							else{
								return 1;
							}
						})
						.attr("cx", function(d, i){
							return (i * (w / dataset.length + 10));
						})
						.attr("cy", function(d){
							return heightScale(d);
						})
						.attr("r", function(d){
							return radiusScale(d);
						})
			if(labels) {
				svg.selectAll("text")
					.data(dataset)
					.enter()
					.append("text")
						.attr("x", function(d, i){
							return (i * (w / dataset.length + 10));
						})
						.attr("y", function(d){
							return heightScale(d);

						})
						.text(function(d){
							return (Math.floor((heightScale(d)/h)*100)) + "% or " + d + " people"
						})
				}
				if(axes){
						svg.append("g")
							.attr("class", "axis")
							.attr("transform", "translate(0," + (h - padding) + ")")
							.call(xAxis)
						svg.append("g")
							.attr("class", "axis")
							.attr("transform", "translate(" + padding + ",0)")
							.call(yAxis)
					}
		};
	});
});