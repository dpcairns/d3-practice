var dataset = [4,76,23,44,88,55,3,67,2,76,9,67,3,56]

d3.select("body").selectAll("div")
	.data(dataset)
	.enter()
	.append("div")
	.attr("class", "bar")
	.style("heigh", function(d){
		var barHeight = d * 5;
		return barHeight + "px"
	});