
const select = (selector, single) => {
    if (!single)
        return document.querySelectorAll(selector)
    return document.querySelector(selector)
}

const selectors = {
    roadEl: '[el="road-path"]',
    roadRef: '[el="road-ref"]',
    scrollTrigger: '[el="scroll-trigger"]'
}

const getCoordinates = (element) => {
    
    return element.getBoundingClientRect()
}

const getRelativeY = (parentCoord, elCoord) => {
    return (parentCoord.height - elCoord.height / 2) - (parentCoord.bottom - elCoord.bottom);
}


window.addEventListener('DOMContentLoaded', () => {

    const roadTriggerEl = select(selectors.scrollTrigger, true)
    const roadReferenceEl = select(selectors.roadRef)
    const start = getCoordinates(roadReferenceEl[0])
    const middle = getCoordinates(roadReferenceEl[1])
    const end = getCoordinates(roadReferenceEl[2])
    const roadMap = getCoordinates(select('.roadmap', true))
    const pathElement = select(selectors.roadEl, true)


    
    const startDx = start.left;
    const startDy = getRelativeY(roadMap, start)

    const middleDx = middle.left;
    const middleDy = getRelativeY(roadMap, middle);

    const endDx = end.left;
    const endDy = getRelativeY(roadMap, end);

    pathElement.setAttribute('d',
            `M ${startDx} ${startDy} C ${startDx} ${startDy + 140} ${middleDx + 50} ${middleDy - 200} ${middleDx} ${middleDy} S 500 700 ${endDx} ${endDy + 100}`)


    
    const controller = new ScrollMagic.Controller({ globalSceneOptions: { duration: 1000 } })
    new ScrollMagic.Scene({
        triggerElement: selectors.scrollTrigger
    })
    .addTo(controller)
    .on('enter', () => {
        roadTriggerEl.classList.add('animate')
    })
})