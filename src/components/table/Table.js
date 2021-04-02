import {ExcelComponent} from "../../core/ExelComponent";
import {createTable} from './table.template' 
import {resizeHandler} from './table.resize'
import {shouldResize} from './table.functions'

export class Table extends ExcelComponent {
    static className = 'exel__table'

    constructor($root){
        super($root, {
            listeners: ['mousedown']
        })
    }


    toHTML(){
        return createTable(10)
    }

    onMousedown(e) {
        
        if(shouldResize(e)){
            resizeHandler(this.$root, e)
        }

       
    }

}