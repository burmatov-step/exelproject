import {ExcelComponent} from "../../core/ExelComponent";
import {createTable} from './table.template'

export class Table extends ExcelComponent {
    static className = 'exel__table'
    toHTML(){
        return createTable(10)
    }
}