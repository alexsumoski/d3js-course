async function draw(el, scale) {

    const dataset = await d3.json('data2.json')
    dataset.sort((a, b) => a - b)

    let dimensions = {
        width: 600,
        height: 150,
    };
    
    const box = 30

    let colorScale;

    if (scale === 'linear') {
        colorScale = d3.scaleLinear()
            .domain(d3.extent(dataset))
            .range(['white', 'red'])
    } else if (scale === 'quantize') {
        colorScale = d3.scaleQuantize()
            .domain(d3.extent(dataset))
            .range(['white', 'pink', 'red'])
    } else if (scale === 'quantile') {
        colorScale = d3.scaleQuantile()
            .domain(dataset)
            .range(d3.schemeReds[3])
    } else if (scale === 'threshold') {
        colorScale = d3.scaleThreshold()
            .domain([45200, 135600])
            .range(['white', 'pink', 'red '])
    }
     
    const svg = d3.select(el)
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)

    svg.append('g')
        .attr('transform', 'translate(2, 2)')
        .attr('stroke', 'black')
        .selectAll('rect')
        .data(dataset)
        .join('rect')
        .attr('width', box -3)
        .attr('height', box -3)
        .attr('x', (d, i) => box * (i % 20))
        .attr('y', (d, i) => box * ((i / 20) | 0))
        .attr('fill', colorScale)
}

draw('#heatmap1', 'linear')
draw('#heatmap2', 'quantize')
draw('#heatmap3', 'quantile')
draw('#heatmap4', 'threshold')
      
