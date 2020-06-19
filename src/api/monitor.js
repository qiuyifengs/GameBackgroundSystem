const MAX_UI = 1000000
const MILLISECONDS_MULTIPLIER = 1000
const TRANSITION_END = 'transitionend'

const toType = obj => ({}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase())

// Public Util Api

const getUID = prefix => {
    do {
        prefix += ~~(Math.random() * MAX_UID)
    } while (document.getElementById(prefix))
    return prefix
}

const getSelector = element => {
    let selector = element.getAttribute('data-target')
    if (!selector || selector === '#') {
        
    }
}