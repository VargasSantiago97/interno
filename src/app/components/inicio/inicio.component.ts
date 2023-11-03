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

    datos: any = [
        {
            cuit: 30708503335
        },
        {
            cuit: 33716222719
        },
        {
            cuit: 33707998429
        },
        {
            cuit: 30715207369
        },
        {
            cuit: 30717485323
        },
        {
            cuit: 20174832251
        },
        {
            cuit: 20350592971
        },
        {
            cuit: 20347935140
        },
        {
            cuit: 20079053644
        },
        {
            cuit: 30711883548
        },
        {
            cuit: 20104306986
        },
        {
            cuit: 20133503278
        },
        {
            cuit: 20344230952
        },
        {
            cuit: 23205521909
        },
        {
            cuit: 30714635359
        },
        {
            cuit: 20147992654
        },
        {
            cuit: 20309492375
        },
        {
            cuit: 20271999861
        },
        {
            cuit: 23127934029
        },
        {
            cuit: 20305702383
        },
        {
            cuit: 30709558389
        },
        {
            cuit: 30711528268
        },
        {
            cuit: 20132167428
        },
        {
            cuit: 20080082666
        },
        {
            cuit: 30668962277
        },
        {
            cuit: 33708394659
        },
        {
            cuit: 30709535443
        },
        {
            cuit: 30711672474
        },
        {
            cuit: 20274045311
        },
        {
            cuit: 23242592689
        },
        {
            cuit: 30508358942
        },
        {
            cuit: 30711358184
        },
        {
            cuit: 23167760929
        },
        {
            cuit: 20236840442
        },
        {
            cuit: 20264036861
        },
        {
            cuit: 27341768387
        },
        {
            cuit: 20125552634
        },
        {
            cuit: 20344230952
        },
        {
            cuit: 20137031699
        },
        {
            cuit: 30714224340
        },
        {
            cuit: 30715893122
        },
        {
            cuit: 20245766972
        },
        {
            cuit: 30710742908
        },
        {
            cuit: 30710195796
        },
        {
            cuit: 27324739993
        },
        {
            cuit: 24401738017
        },
        {
            cuit: 20138714129
        },
        {
            cuit: 30710537557
        },
        {
            cuit: 20251324744
        },
        {
            cuit: 30716098482
        },
        {
            cuit: 20177626539
        },
        {
            cuit: 23056702369
        },
        {
            cuit: 20410391636
        },
        {
            cuit: 20300969179
        },
        {
            cuit: 20227499673
        },
        {
            cuit: 20079299465
        },
        {
            cuit: 20252291297
        },
        {
            cuit: 20267197084
        },
        {
            cuit: 20310980359
        },
        {
            cuit: 30706135088
        },
        {
            cuit: 33707456219
        },
        {
            cuit: 30711340781
        },
        {
            cuit: 20103666768
        },
        {
            cuit: 20223566600
        },
        {
            cuit: 20218493107
        },
        {
            cuit: 20213958624
        },
        {
            cuit: 30711566771
        },
        {
            cuit: 33710417089
        },
        {
            cuit: 30717290220
        },
        {
            cuit: 30717208834
        },
        {
            cuit: 20166909199
        },
        {
            cuit: 20141404181
        },
        {
            cuit: 30670117770
        },
        {
            cuit: 30710534701
        },
        {
            cuit: 20085341856
        },
        {
            cuit: 30657585757
        },
        {
            cuit: 20178512456
        },
        {
            cuit: 20218307281
        },
        {
            cuit: 20211753049
        },
        {
            cuit: 23232829249
        },
        {
            cuit: 20123651368
        },
        {
            cuit: 30717083446
        },
        {
            cuit: 20064448634
        },
        {
            cuit: 20245473002
        },
        {
            cuit: 27317310019
        },
        {
            cuit: 20314879725
        },
        {
            cuit: 30711692866
        },
        {
            cuit: 30708630272
        },
        {
            cuit: 30708310693
        },
        {
            cuit: 20365065250
        },
        {
            cuit: 27206032613
        },
        {
            cuit: 20163395526
        },
        {
            cuit: 30696748191
        },
        {
            cuit: 20283946488
        },
        {
            cuit: 20129709627
        },
        {
            cuit: 20142246970
        },
        {
            cuit: 20240793629
        },
        {
            cuit: 20161423808
        },
        {
            cuit: 20122617212
        },
        {
            cuit: 20121693489
        },
        {
            cuit: 20173735112
        },
        {
            cuit: 20168171499
        },
        {
            cuit: 20177304760
        },
        {
            cuit: 20131797266
        },
        {
            cuit: 30714440892
        },
        {
            cuit: 20332286596
        },
        {
            cuit: 20104077928
        },
        {
            cuit: 20230855936
        },
        {
            cuit: 23203420749
        },
        {
            cuit: 30715327720
        },
        {
            cuit: 20257369235
        },
        {
            cuit: 30717543307
        }
    ]

    actualizando: any = 0


    constructor(
        private cs: ComunicacionService
    ) { }

    ngOnInit() {
        this.columns = [
            { header: 'CUIT', field: 'cuit' },
            { header: 'Razon Social', field: 'razon_social' },
            { header: 'Nueva Razon', field: 'nueva_razon' },
            { header: 'Codigo', field: 'codigo' },
        ]

    }

    ejecutar() {
        if(this.actualizando < this.datos.length){
            this.cs.padron(this.datos[this.actualizando].cuit).subscribe(
                (res:any) => {
                    console.log(res)

                    if(res.tipoPersona == "JURIDICA"){
                        this.datos[this.actualizando].razon_social = res.razonSocial
                    } else {
                        this.datos[this.actualizando].razon_social = res.apellido + ', ' + res.nombre
                    }



                    this.actualizando++
                    this.ejecutar()
                },
                err => {
                    console.log(err)
                    alert('error')
                }
            )
        } else {
            alert('Fin')
        }
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

