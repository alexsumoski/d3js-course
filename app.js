async function draw() {
    const dataset = await d3.json('data.json')

    const xAccessor = (data) => data.currently.humidity
    const yAccessor = (data) => data.currently.apparentTemperature

    let dimensions = {
        width: 800,
        height: 800,
        margin: {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50
        }
    }

    dimensions.containerWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
    dimensions.containerHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)

    const container = svg.append('g')
        .attr('transform', 
            `translate(${dimensions.margin.left}, ${dimensions.margin.top})`)

    const xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, xAccessor))
        .range([0, dimensions.containerWidth])
        .clamp(true)
    
    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor))
        .range([dimensions.containerHeight, 0])
        .nice()
        .clamp(true)

    container.selectAll('circle')
        .data(dataset)
        .join('circle')
        .attr('cx', i => xScale(xAccessor(i)))
        .attr('cy', i => yScale(yAccessor(i)))
        .attr('r', 5)
        .attr('fill', 'blue')
        .attr('data-temp', yAccessor)

    const xAxis = d3.axisBottom(xScale)
        .ticks(5)
        .tickFormat((i) => i * 100 + '%')

    const yAxis = d3.axisLeft(yScale)

    const xAxisGroup = container.append('g')
        .call(xAxis)
        .style('transform', `translateY(${dimensions.containerHeight}px)`)
        .classed('axis', true)

    xAxisGroup.append('text')
        .attr('x', dimensions.containerWidth / 2)
        .attr('y', dimensions.margin.bottom -10)
        .attr('fill', 'black')
        .text('Humidity')

    const yAxisGroup = container.append('g')
        .call(yAxis)
        .classed('axis', true)

    yAxisGroup.append('text')
        .attr('x', -dimensions.containerHeight / 2)
        .attr('y', -dimensions.margin.left +15)
        .attr('fill', 'black')
        .html('Temperature &deg; F')
        .style('transform', 'rotate(270deg)')
        .style('text-anchor', 'middle')
}

draw()