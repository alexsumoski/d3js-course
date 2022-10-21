async function draw(el, scale) {

    const dataset = await d3.json('data2.json')

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
      
