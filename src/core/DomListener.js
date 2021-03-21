import {capitalize} from './utils'

export class DomListener {
    constructor($root, listeners = []){
        if(!$root){
            throw new Error('No $root provided for FomListener')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {

        this.listeners.forEach((listener) =>{
            const method = getMethodName(listener)
            if(!this[method]) {
                
                const name = this.name || ''
                throw new Error(
                `Methof ${method} is not implemented in ${name} Component`)
            }
            // Тоже самое что и addEventListener
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    removeDOMListeners() {
        this.listeners.forEach((listener) =>{
            const method = getMethodName(listener)
            this.$root.off(listener, this[method] )
        })
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}