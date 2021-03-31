
// const select = (selector, single) => {
//     if (!single)
//         return document.querySelectorAll(selector)
//     return document.querySelector(selector)
// }

// const pythagora = (xPair) => {

// }

// const getCoordinates = (element) => {
//     const coordinates = element.getBoundingClientRect();
//     return coordinates;
// };


// const selectors = {
//     roadEl: '[el="road-path"]'
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const roadline = select('#roadline')[0]
//     const roadReferenceEl = select('[el="road-ref"]')
//     const start = getCoordinates(roadReferenceEl[0])
//     const end = getCoordinates(roadReferenceEl[1])


//     const pathElement = select(selectors.roadEl, true)

//     // const moveTo = {
//     //     x: 
//     // }

//     pathElement.setAttribute('d', `M ${start.x} ${start.y} Q ${(end.x + start.x / 2)} ${(end.y + start.y) / 2} ${end.x} ${end.y}`)
//     console.log(start, end)
//     console.log(pathElement)

//     // roadline.setAttribute('x3', '400px');
//     // roadline.setAttribute('y3', '900px')
//     // console.log(getCoordinates(roadReferenceEl[0]))
    
// })