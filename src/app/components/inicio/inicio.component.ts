import { Component } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { SqliteService } from 'src/app/services/sqlite.service';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

    columns: any = []
    dataTabla: any = []

    db: any = {}

    actualizando: any = 0

    index:any = 0

    constructor(
        private cs: ComunicacionService,
        private sqlite: SqliteService
    ) { }

    ngOnInit() {
        this.columns = [
            { header: 'CUIT', field: 'cuit' },
            { header: 'Razon Social', field: 'razon_social' },
            { header: 'Nueva Razon', field: 'nueva_razon' },
            { header: 'Codigo', field: 'codigo' },
        ]


        this.sqlite.getDB('movimientos', this.db, () => {
            console.log('ss')
            console.log(this.db)
        })

    }

    ejecutar() {
        for (let index = this.index; index < this.index+10; index++) {
            this.dataTabla.push(
                {
                    cuit: index,
                    razon_social: 'asd',
                    nueva_razon: 651551,
                    codigo: "65165,51",
                    rows: 3,
                    cuits: [1, 2, 3]
                }
            )
        }
        this.index+=10
    }


    transformar(dato: any, tipo: any) {
        if (tipo == 'establecimiento') {
            return this.db['establecimientos'].some((e: any) => { return e.id == dato }) ? this.db['establecimientos'].find((e: any) => { return e.id == dato }).alias : dato
        }
        else if (tipo == 'grano') {
            return this.db['granos'].some((e: any) => { return e.id == dato }) ? this.db['granos'].find((e: any) => { return e.id == dato }).alias : dato
        }
        else if (tipo == 'nro_orden') {
            return this.db['orden_carga'].some((e: any) => { return e.id_movimiento == dato }) ? this.db['orden_carga'].find((e: any) => { return e.id_movimiento == dato }).numero : ''
        }

        else if (tipo == 'nro_ctg') {

            const carta_porte: any = this.db['carta_porte'].filter((e: any) => { return e.id_movimiento == dato })

            if (carta_porte.length == 1) {

                var agregar: any = false

                try {
                    var data = JSON.parse(carta_porte[0].data)
                    agregar = (data.estado == 'CN') || (data.estado == 'AC') || (data.estado == 'CF')
                } catch {
                }

                if (agregar) {
                    return carta_porte[0].nro_ctg ? carta_porte[0].nro_ctg : ''
                }

            } else {

                var ctg: any = []

                carta_porte.forEach((cpe: any) => {
                    var agregar: any = false

                    try {
                        var data = JSON.parse(cpe.data)
                        agregar = (data.estado == 'CN') || (data.estado == 'AC') || (data.estado == 'CF')
                    } catch {
                    }

                    if (agregar) {
                        ctg.push((cpe.nro_ctg ? cpe.nro_ctg.toString() : ''))
                    }

                })
                return (ctg.toString())
            }
        }
        else {
            return dato
        }
    }
}

