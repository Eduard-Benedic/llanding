
var select = function (selector, single) {
    if (!single)
        return document.querySelectorAll(selector)
    return document.querySelector(selector)
}

var selectors = {
    roadPathEmployer: '[el="road-path-employer"]',
    roadPathJobseeker: '[el="road-path-jobseeker"]',
    roadRefEmployer: '[el="road-ref-employer"]',
    roadRefJobseeker:  '[el="road-ref-jobseeker"]',
    scrollTrigger: '[el="scroll-trigger"]',
    shiftController: '[el="shiftControllerBtn"]'
}

var getCoordinates = function (element)  {
    return element.getBoundingClientRect()
}

var getRelativeY = function (parentCoord, elCoord)  {
    return (parentCoord.height - elCoord.height / 2) - (parentCoord.bottom - elCoord.bottom)
}

var getRoadPath = function (start, middle, end) {
    var roadMap = getCoordinates(select('.roadmap', true))
    return {
        start: {
            x: start.left,
            y: getRelativeY(roadMap, start)
        },
        middle: {
            x: middle.left,
            y: getRelativeY(roadMap, middle)
        },
        end: {
            x: end.left,
            y: getRelativeY(roadMap, end)
        }
    }
}

var initiateStepRoad = function (roadReference, roadPath) {
    var start = getCoordinates(roadReference[0])
    var middle = getCoordinates(roadReference[1])
    var end = getCoordinates(roadReference[2])
    
    var pathElement = select(roadPath, true)
    var roadPathCoordinates = getRoadPath(start, middle, end)
    pathElement.setAttribute('d',
            `M ${roadPathCoordinates.start.x} ${roadPathCoordinates.start.y} C ${roadPathCoordinates.start.x} ${roadPathCoordinates.start.y + 140} ${roadPathCoordinates.middle.x + 50} ${roadPathCoordinates.middle.y - 200} ${roadPathCoordinates.middle.x} ${roadPathCoordinates.middle.y} S 500 700 ${roadPathCoordinates.end.x} ${roadPathCoordinates.end.y + 100}`)
}

var toggleClass = function (el, className) {
    if (el.classList.contains(className)) return el.classList.remove(className)
    return el.classList.add(className)    
}

window.addEventListener('DOMContentLoaded', function () {

    var roadReferenceEmployer = select(selectors.roadRefEmployer)
    var roadReferenceJobseeker = select(selectors.roadRefJobseeker)

    initiateStepRoad(roadReferenceEmployer, selectors.roadPathEmployer)
    initiateStepRoad(roadReferenceJobseeker, selectors.roadPathJobseeker)

    /*=================================================
        Toggle Shift Type
    ====================================================*/
    var controllerBtn = select(selectors.shiftController)

    controllerBtn.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var shiftID = this.dataset.shift
            const shiftToggle = select('[el="shift-toggle"]')

            controllerBtn.forEach(function (btn) {
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