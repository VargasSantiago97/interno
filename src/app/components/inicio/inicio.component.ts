import { Component } from '@angular/core';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
    columns: any = []
    dataTabla:any = []

    ngOnInit(){
        this.columns = [
            {header:'Col 1', field:'col_uno'},
            {header:'Col 2', field:'col_dos'},
            {header:'Col 3', field:'col_tres'},
            {header:'Col 4', field:'col_cuatro'},
        ]

        this.generarDataTabla()
    }

    generarDataTabla(){
        this.dataTabla.push({
            col_uno: 1,
            col_dos: 2,
            col_tres: 3,
            col_cuatro: 4
        })
        this.dataTabla.push({
            col_uno: 1,
            col_dos: 2,
            col_tres: 3,
            col_cuatro: 4
        })
        this.dataTabla.push({
            col_uno: 1,
            col_dos: 2,
            col_tres: 3,
            col_cuatro: 4
        })
        this.dataTabla.push({
            col_uno: 1,
            col_dos: 2,
            col_tres: 3,
            col_cuatro: 4
        })
        this.dataTabla.push({
            col_uno: 1,
            col_dos: 2,
            col_tres: 3,
            col_cuatro: 4
        })
        this.dataTabla.push({
            col_uno: 1,
            col_dos: 2,
            col_tres: 3,
            col_cuatro: 4
        })
        this.dataTabla.push({
            col_uno: 1,
            col_dos: 2,
            col_tres: 3,
            col_cuatro: 4
        })
        this.dataTabla.push({
            col_uno: 1,
            col_dos: 2,
            col_tres: 3,
            col_cuatro: 4
        })
        this.dataTabla.push({
            col_uno: 1,
            col_dos: 2,
            col_tres: 3,
            col_cuatro: 4
        })
        this.dataTabla.push({
            col_uno: 1,
            col_dos: 2,
            col_tres: 3,
            col_cuatro: 4
        })
        this.dataTabla.push({
            col_uno: 1,
            col_dos: 2,
            col_tres: 3,
            col_cuatro: 4
        })
        this.dataTabla.push({
            col_uno: 1,
            col_tres: 3,
            col_cuatro: 4
        })
        this.dataTabla.push({
            col_uno: 1,
            col_dos: 2,
            col_tres: 3,
            col_cuatro: 4
        })
        this.dataTabla.push({
            col_uno: 1,
            col_dos: 2,
            col_tres: 3,
            col_cuatro: 4
        })
        this.dataTabla.push({
            col_uno: 1,
            col_dos: 2,
            col_tres: 3,
            col_cuatro: 4
        })
        this.dataTabla.push({
            col_uno: 1,
            col_dos: 2,
            col_tres: 3,
            col_cuatro: 4
        })
    }
}
