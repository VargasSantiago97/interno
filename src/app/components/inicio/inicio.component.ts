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
    dbLocal: any = {}

    cargados: any = 0
    aCargar: any = 0

    constructor(
        private cs: ComunicacionService,
        private sqlite: SqliteService
    ) { }

    ngOnInit() {
        this.columns = [
            { header: 'ORIG', field: 'ok_origen' },
            { header: 'ID', field: 'id' },
            { header: 'Tipo', field: 'tipo' },
            { header: 'De', field: 'tipo_origen' },
            { header: 'Fecha', field: 'fecha' },
            { header: 'Cultivo', field: 'cultivo' },
            { header: 'Prod.', field: 'produce' },
            { header: 'Est', field: 'establecimiento' },
            { header: 'Campo', field: 'kg_campo' },
            { header: 'Bruto', field: 'kg_bruto' },
            { header: 'Tara', field: 'kg_tara' },
            { header: 'Neto', field: 'kg_neto' },
            { header: 'Reg', field: 'kg_regulacion' },
            { header: 'Sal. Bal.', field: 'kg_neto_final_salida' },
            { header: 'Dep.', field: 'deposito' },
            { header: 'Acond.', field: 'kg_acondicionadora' },
            { header: 'Destino', field: 'kg_destino' },
            { header: 'DEST', field: 'ok_destino' },
            { header: 'Mermas', field: 'kg_mermas' },
            { header: 'Final', field: 'kg_final' },
            { header: 'Comp.', field: 'kg_computados' },
            { header: 'Pat Ch.', field: 'patente_chasis' },
            { header: 'Pat Ac.', field: 'patente_acoplado' },
            { header: 'CTG Origen', field: 'ctg_origen' },
            { header: 'CTG Destino', field: 'ctg_destino' },
            { header: 'Retira', field: 'retira' },
            { header: 'Entrega', field: 'entrega' },
            { header: 'Acond.', field: 'acondicionadora' },
            { header: 'Destino', field: 'destino' },
            { header: 'Contrato', field: 'contrato' },
            { header: 'Precio', field: 'precio' },
            { header: 'CONT', field: 'ok_contrato' },
        ]

        this.aCargar = 11

        this.cs.getDB('banderas', this.db, () => { this.cargados++ })
        this.cs.getDB('camiones', this.db, () => { this.cargados++ })
        this.cs.getDB('intervinientes', this.db, () => { this.cargados++ })
        this.cs.getDB('depositos', this.db, () => { this.cargados++ })
        this.cs.getDB('granos', this.db, () => { this.cargados++ })
        this.cs.getDB('establecimientos', this.db, () => { this.cargados++ })
        this.cs.getDB('socios', this.db, () => { this.cargados++ })
        this.cs.getDB('transportistas', this.db, () => { this.cargados++ })
        this.cs.getDB('carta_porte', this.db, () => { this.cargados++ })
        this.cs.getDB('movimientos', this.db, () => { this.cargados++ })
        
        this.sqlite.getDB('datos_movimientos', this.dbLocal, () => { this.cargados++ })
    }

    ejecutarCamiones() {
        this.dataTabla = []

        this.db["movimientos"].forEach((movimiento: any) => {

            //filtros
            const fecha = new Date(movimiento.fecha)
            const limite = new Date('2023-05-11')
            const fechaFormato = `${fecha.getFullYear()}/${(fecha.getMonth()+1).toString().padStart(2, '0')}/${(fecha.getDate()).toString().padStart(2, '0')}`

            if(fecha < limite){
                var movimientoLocal:any = this.dbLocal['datos_movimientos'].find((e:any) => { return e.id_movimiento == movimiento.id });

                var dato: any = {
                    ok_origen: movimientoLocal ? movimientoLocal.ok_origen : '',
                    ok_destino: movimientoLocal ? movimientoLocal.ok_destino : '',
                    ok_contrato: movimientoLocal ? movimientoLocal.ok_contrato : '',

                    id: movimiento.id,

                    tipo: movimientoLocal ? movimientoLocal.tipo : '',
                    fecha: fechaFormato,
                    cultivo: this.transformar(movimiento.id_grano, 'grano'),
                    establecimiento: this.transformar(movimiento.id_origen, 'establecimiento'),

                    kg_campo: movimiento.kg_campo,
                    kg_bruto: movimiento.kg_bruto,
                    kg_tara: movimiento.kg_tara,
                    kg_neto: movimiento.kg_neto,
                    kg_regulacion: movimiento.kg_regulacion,
                    kg_neto_final_salida: movimiento.kg_neto_final,

                    patente_chasis: this.transformar(movimiento.id_camion, 'patente_chasis'),
                    patente_acoplado: this.transformar(movimiento.id_camion, 'patente_acoplado'),

                    deposito: this.transformar(movimiento.id_deposito, 'deposito'),

                    kg_acondicionadora: movimientoLocal ? movimientoLocal.kg_acondicionadora : '',
                    kg_destino: movimientoLocal ? movimientoLocal.kg_destino : '',
                    kg_mermas: movimientoLocal ? movimientoLocal.kg_mermas : '',
                    kg_final: movimientoLocal ? movimientoLocal.kg_final : '',
                    kg_computados: movimientoLocal ? movimientoLocal.kg_computados : '',

                    tipo_origen: movimiento.tipo_origen,

                    produce: this.transformar(movimiento.id_origen, 'produce'),
                    ctg_origen: this.transformar(movimiento.id, 'nro_ctg'),

                    ctg_destino: movimientoLocal ? movimientoLocal.ctg_destino : '',
                    retira: movimientoLocal ? movimientoLocal.retira : '',
                    entrega: movimientoLocal ? movimientoLocal.entrega : '',
                    acondicionadora: movimientoLocal ? movimientoLocal.acondicionadora : '',
                    destino: movimientoLocal ? movimientoLocal.destino : '',
                    contrato: movimientoLocal ? movimientoLocal.contrato : '',
                    precio: movimientoLocal ? movimientoLocal.precio : '',
                }

                this.dataTabla.push(dato)
            }
        });
    }


    ejecutarOrigen() {
        this.dataTabla = []

        this.db["movimientos"].forEach((movimiento: any) => {

            //filtros
            const fecha = new Date(movimiento.fecha)
            const limiteInf = new Date('2023-07-01')
            const limiteSup = new Date('2023-07-10')
            const fechaFormato = `${fecha.getFullYear()}/${(fecha.getMonth()+1).toString().padStart(2, '0')}/${(fecha.getDate()).toString().padStart(2, '0')}`

            if((fecha <= limiteSup) && (fecha >= limiteInf)){
                var movimientoLocal:any = this.dbLocal['datos_movimientos'].find((e:any) => { return e.id_movimiento == movimiento.id });

                var dato: any = {
                    ok_origen: movimientoLocal ? movimientoLocal.ok_origen : '',
                    ok_destino: movimientoLocal ? movimientoLocal.ok_destino : '',
                    ok_contrato: movimientoLocal ? movimientoLocal.ok_contrato : '',

                    id: movimiento.id,

                    tipo: movimientoLocal ? movimientoLocal.tipo : '',
                    fecha: fechaFormato,
                    cultivo: this.transformar(movimiento.id_grano, 'grano'),
                    establecimiento: this.transformar(movimiento.id_origen, 'establecimiento'),

                    kg_campo: movimiento.kg_campo,
                    kg_bruto: movimiento.kg_bruto,
                    kg_tara: movimiento.kg_tara,
                    kg_neto: movimiento.kg_neto,
                    kg_regulacion: movimiento.kg_regulacion,
                    kg_neto_final_salida: movimiento.kg_neto_final,

                    patente_chasis: this.transformar(movimiento.id_camion, 'patente_chasis'),
                    patente_acoplado: this.transformar(movimiento.id_camion, 'patente_acoplado'),

                    deposito: this.transformar(movimiento.id_deposito, 'deposito'),

                    kg_acondicionadora: movimientoLocal ? movimientoLocal.kg_acondicionadora : '',
                    kg_destino: movimientoLocal ? movimientoLocal.kg_destino : '',
                    kg_mermas: movimientoLocal ? movimientoLocal.kg_mermas : '',
                    kg_final: movimientoLocal ? movimientoLocal.kg_final : '',
                    kg_computados: movimientoLocal ? movimientoLocal.kg_computados : '',

                    tipo_origen: movimiento.tipo_origen,

                    produce: this.transformar(movimiento.id_origen, 'produce'),
                    ctg_origen: this.transformar(movimiento.id, 'nro_ctg'),

                    ctg_destino: movimientoLocal ? movimientoLocal.ctg_destino : '',
                    retira: movimientoLocal ? movimientoLocal.retira : '',
                    entrega: movimientoLocal ? movimientoLocal.entrega : '',
                    acondicionadora: movimientoLocal ? movimientoLocal.acondicionadora : '',
                    destino: movimientoLocal ? movimientoLocal.destino : '',
                    contrato: movimientoLocal ? movimientoLocal.contrato : '',
                    precio: movimientoLocal ? movimientoLocal.precio : '',
                }

                this.dataTabla.push(dato)
            }
        });
    }


    transformar(dato: any, tipo: any) {
        if (tipo == 'establecimiento') {
            return this.db['establecimientos'].some((e: any) => { return e.id == dato }) ? this.db['establecimientos'].find((e: any) => { return e.id == dato }).alias : dato
        }
        if (tipo == 'produce') {
            return this.db['establecimientos'].some((e: any) => { return e.id == dato }) ? this.db['establecimientos'].find((e: any) => { return e.id == dato }).codigo : dato
        }
        else if (tipo == 'grano') {
            return this.db['granos'].some((e: any) => { return e.id == dato }) ? this.db['granos'].find((e: any) => { return e.id == dato }).alias : dato
        }
        else if (tipo == 'deposito') {
            return this.db['depositos'].some((e: any) => { return e.id == dato }) ? this.db['depositos'].find((e: any) => { return e.id == dato }).alias : dato
        }
        else if (tipo == 'nro_orden') {
            return this.db['orden_carga'].some((e: any) => { return e.id_movimiento == dato }) ? this.db['orden_carga'].find((e: any) => { return e.id_movimiento == dato }).numero : ''
        }

        else if (tipo == 'patente_chasis') {
            return this.db['camiones'].some((e: any) => { return e.id == dato }) ? this.db['camiones'].find((e: any) => { return e.id == dato }).patente_chasis : ''
        }
        else if (tipo == 'patente_acoplado') {
            return this.db['camiones'].some((e: any) => { return e.id == dato }) ? this.db['camiones'].find((e: any) => { return e.id == dato }).patente_acoplado : ''
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