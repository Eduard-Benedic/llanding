var selectors = {
    roadPathEmployer: '[el="road-path-employer"]',
    roadPathJobseeker: '[el="road-path-jobseeker"]',
    roadRefEmployer: '[el="road-ref-employer"]',
    roadRefJobseeker:  '[el="road-ref-jobseeker"]',
    scrollTrigger: '[el="scroll-trigger"]',
    shiftController: '[el="shiftControllerBtn"]'
}

// General Utility Functions
var toggleClass = function (el, className) {
    if (el.classList.contains(className)) return el.classList.remove(className)
    return el.classList.add(className)    
}

var select = function (selector, single) {
    if (!single)
        return document.querySelectorAll(selector)
    return document.querySelector(selector)
}


// Utility Functions
var getCoordinates = function (element)  {
    return element.getBoundingClientRect()
}

var getRelativeY = function (parentCoord, elCoord)  {
    return parentCoord.height - (elCoord.height / 2) - (parentCoord.bottom - elCoord.bottom) 
}

var getRoadPath = function (start, middle, end) {
    var roadMap = getCoordinates(select('.roadmap', true))
    
    return {
        start: {
            x: start.left - roadMap.left,
            y: getRelativeY(roadMap, start)
        },
        middle: {
            x: middle.right - roadMap.left - middle.width / 2,
            y: getRelativeY(roadMap, middle)
        },
        end: {
            x: end.left - roadMap.left,
            y: getRelativeY(roadMap, end)
        }
    }
}

var drawRoad = function (roadContainerEl, pathSelector) {
    var start = getCoordinates(roadContainerEl[0])
    var middle = getCoordinates(roadContainerEl[1])
    var end = getCoordinates(roadContainerEl[2])
    
    var pathElement = select(pathSelector, true)
    var roadPath = getRoadPath(start, middle, end)
    pathElement.setAttribute('d',
            `M ${roadPath.start.x} ${roadPath.start.y} C ${roadPath.start.x } ${roadPath.start.y + 200} ${roadPath.middle.x } ${roadPath.middle.y - 200} ${roadPath.middle.x} ${roadPath.middle.y} S 250 600 ${roadPath.end.x} ${roadPath.end.y }`)
}


var initRoadDrawing = function () {
    var roadReferenceEmployer = select(selectors.roadRefEmployer)
    var roadReferenceJobseeker = select(selectors.roadRefJobseeker)

    drawRoad(roadReferenceEmployer, selectors.roadPathEmployer)
    drawRoad(roadReferenceJobseeker, selectors.roadPathJobseeker)

    window.addEventListener('resize', function () {
        drawRoad(roadReferenceEmployer, selectors.roadPathEmployer)
        drawRoad(roadReferenceJobseeker, selectors.roadPathJobseeker)
    })
}

window.addEventListener('DOMContentLoaded', function () {
    
    initRoadDrawing()    
    
    var shiftController = select(selectors.shiftController)
    shiftController.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var shiftID = this.dataset.shift
            const shiftToggle = select('[el="shift-toggle"]')

            shiftController.forEach(function (btn) {
                toggleClass(btn, 'trainway__btn--active')
            })

            shiftToggle.forEach(function (el) {
                el.style.display = 'none'
            })
            var shiftSection = select(shiftID, true)
            shiftSection.style.display = 'block'
        })
    })


    /*=============================================================
        Animate the Road on Scroll
    ===============================================================*/
    var roadTriggerEl = select(selectors.scrollTrigger, true)
    var roadTriggerElEmployer = select('[el="scroll-trigger-employer"]', true)

    var controller = new ScrollMagic.Controller({ globalSceneOptions: { duration: 1000 } })
    
    new ScrollMagic.Scene({
        triggerElement: roadTriggerEl
    })
    .addTo(controller)
    .on('enter leave', function () {
        roadTriggerEl.classList.toggle('animate')
    })

    new ScrollMagic.Scene({
        triggerElement: roadTriggerElEmployer
    })
    .addTo(controller)
    .on('enter leave', function () {
        roadTriggerElEmployer.classList.toggle('animate')
    })
})