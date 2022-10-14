async function draw() {
    const dataset = await d3.json('data.json')

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

    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)

    const container = svg.append('g')
        .attr('transform', 
            `translate(${dimensions.margin.left}, ${dimensions.margin.top})`)

    container.append('circle')
        .attr('r', 15)
}

draw()