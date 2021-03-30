
const select = (selector) => {
    return document.querySelectorAll(selector)
}

const pythagora = (xPair) => {

}

const getCoordinates = (element) => {
    const coordinates = element.getBoundingClientRect();
    console.log(coordinates)
    return coordinates;
};

const setStartLineAttribute = (el, coordinates) => {
    el.setAttribute('x1', coordinates.x + 'px');
    el.setAttribute('y1', coordinates.y + 'px');
}

const setEndLineAttribute = (el, coordinates) => {
    el.setAttribute('x2', coordinates.x + 'px');
    el.setAttribute('y2', coordinates.y + 'px');
}


document.addEventListener('DOMContentLoaded', () => {
    const roadline = select('#roadline')[0]
    const roadReferenceEl = select('[el="road-ref"]')
    const start = getCoordinates(roadReferenceEl[0])
    const end = getCoordinates(roadReferenceEl[1])

    setStartLineAttribute(roadline, start)
    setEndLineAttribute(roadline, end)

    // roadline.setAttribute('x3', '400px');
    // roadline.setAttribute('y3', '900px')
    // console.log(getCoordinates(roadReferenceEl[0]))
    
})