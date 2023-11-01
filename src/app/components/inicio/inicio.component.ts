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

    movimientos: any = []

    db: any = {}
    db_local: any = {}
    cargador: any = 0
    totalCargador: any = 0

    constructor(
        private cs: ComunicacionService,
        private sqlite: SqliteService
    ) { }

    ngOnInit() {
        this.columns = [
            { header: 'ID', field: 'id_movimiento' },
            { header: 'Cult.', field: 'cultivo' },
            { header: 'Est.', field: 'establecimiento' },
            { header: 'De', field: 'desde' },

            { header: 'ORDEN', field: 'nro_orden' },
            { header: 'CTG', field: 'nro_ctg' },

            { header: 'KG CAMPO', field: 'kg_campo' },
            { header: 'KG BAL', field: 'kg_balanza' },
            { header: 'KG REG', field: 'kg_regulacion' },
            { header: 'KG NETO', field: 'kg_neto' },
            { header: 'KG ACOND.', field: 'kg_acondicionados' },
            { header: 'KG DESTINO', field: 'kg_destino' },
            { header: 'KG MERM', field: 'kg_mermas' },
            { header: 'KG FINAL', field: 'kg_final' },

            { header: 'RETIRA', field: 'retira' },
            { header: 'ENTREGA', field: 'entrega' },
            { header: 'DESTINO', field: 'destino' },

            { header: 'CTG DEST', field: 'nro_ctg_dest' },
            { header: 'CONTRATO', field: 'contrato' },
            { header: 'APLIC.', field: 'aplicacion' },
        ]

        this.totalCargador = 8

        this.getDB('banderas', () => { this.cargador++ })
        this.getDB('movimientos', () => { this.cargador++ })
        this.getDB('establecimientos', () => { this.cargador++ })
        this.getDB('granos', () => { this.cargador++ })
        this.getDB('orden_carga', () => { this.cargador++ })
        this.getDB('socios', () => { this.cargador++ })
        this.getDB('carta_porte', () => { this.cargador++ })

        this.getSqlite('movimiento_contrato', () => { this.cargador++ })

    }

    generarDataTabla() {
        this.dataTabla = []

        this.movimientos.forEach((mov: any) => {
            var dato = {
                id_movimiento: mov.id,
                cultivo: this.transformar(mov.id_grano, 'grano'),
                establecimiento: this.transformar(mov.id_origen, 'establecimiento'),
                desde: mov.tipo_origen,

                nro_orden: this.transformar(mov.id, 'nro_orden'),
                nro_ctg: this.transformar(mov.id, 'nro_ctg'),

                kg_campo: mov.kg_campo,
                kg_balanza: mov.kg_neto,
                kg_regulacion: mov.kg_regulacion,
                kg_neto: mov.kg_neto_final,

                kg_acondicionados: 0,
                kg_destino: 0,
                kg_mermas: 0,
                kg_final: 0,

                retira: '',
                entrega: '',
                destino: '',

                nro_ctg_dest: '',
                contrato: '',
                aplicacion: 0,
            }

            dato.contrato = this.db_local['movimiento_contrato'].some((e:any) => { return e.id_movimiento == mov.id }) ? this.db_local['movimiento_contrato'].find((e:any) => { return e.id_movimiento == mov.id }).id_contrato : ''

            dato.aplicacion = this.db_local['movimiento_contrato'].filter((e:any) => { return e.id_movimiento == mov.id }).reduce((acc:any, curr:any) => { return acc + parseInt(curr.kilos) }, 0)
            /* 
            CREATE TABLE "datos" (
                "id"	TEXT,
                "id_movimiento"	TEXT,
                "kg_acondicionados" INTEGER,
                "kg_destino"	INTEGER,
                "kg_mermas"	INTEGER,
                "kg_final"	INTEGER,
                "retira"	TEXT,
                "entrega"	TEXT,
                "destino"	TEXT,
            ) */






            this.dataTabla.push(dato)
        });
    }

    ejecutar() {

    }

    getDB(tabla: any, fn: any = false) {

    }

    getSqlite(tabla: any, fn: any = false) {
        this.sqlite.getDB(tabla).subscribe(
            (res: any) => {
                this.db_local[tabla] = res

                if (fn) {
                    fn()
                }
            },
            (err: any) => {
                console.error(err)
            }
        )
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

/*
estado: "1"
fecha: "2023-04-25 00:00:00"
id: "39adc393652c"
id_acopio: "bf713ffb707d"
id_bandera: "[\"3a2b44f8a3b2\"]"
id_camion: "416d41386c55"
id_campana: "0f3805fd027b"
id_chofer: "29e3a226ac94"
id_corredor: "a98475e4664e"
id_deposito: "820432e06a30"
id_grano: "d81473ae9754"
id_origen: "81f01651370e"
id_socio: "141ea05753ff"
id_transporte: "274c2067e4c1"
kg_bruto: "52540"
kg_campo: "36530"
kg_neto: "36900"
kg_neto_final: "36580"
kg_regulacion: "-320"
kg_tara: "15640"
observaciones: "Destino 36.360\nHumedad 15.6%"
tipo_origen: "T"

id: "a9318f4030ec"
id_contrato: "d7e18ffc1ab2"
id_movimiento: "39adc393652c"
kilos: "35000"
*/