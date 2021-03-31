
const select = (selector, single) => {
    if (!single)
        return document.querySelectorAll(selector)
    return document.querySelector(selector)
}

const pythagora = (xPair) => {

}

const getCoordinates = (element) => {
    const coordinates = element.getBoundingClientRect()
    return coordinates
}


const selectors = {
    roadEl: '[el="road-path"]',
    roadRef: '[el="road-ref"]'
}

document.addEventListener('DOMContentLoaded', () => {
    const roadline = select('#roadline')[0]
    const roadReferenceEl = select(selectors.roadRef)
    const start = getCoordinates(roadReferenceEl[0])
    const middle = getCoordinates(roadReferenceEl[1])
    const end = getCoordinates(roadReferenceEl[2])
    const roadMap = getCoordinates(select('.roadmap', true))

    const pathElement = select(selectors.roadEl, true)
   

    const startDx = start.left;
    const startDy = roadMap.top - start.top + start.height / 2;
    
    const middleDx = middle.left;
    const middleDy =  middle.top - roadMap.top  + middle.height / 2;

    const endDx = end.left;
    const endDy = roadMap.bottom - end.height / 2;

     pathElement.setAttribute('d',
            `M ${startDx} ${startDy} C ${startDx} ${startDy + 300} ${middleDx + 50} ${middleDy - 200} ${middleDx} ${middleDy} S 300 300 ${endDx} ${endDy}`)
})