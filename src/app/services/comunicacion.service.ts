import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var vars: any;

@Injectable({
    providedIn: 'root'
})
export class ComunicacionService {

    API_URI = vars.API_URI;

    formatoColumnas: any = {
        acciones: ['id', 'tipo', 'accion', 'estado']
    }


    constructor(
        private http: HttpClient,
    ) { }

    //Consultas a DB
    dbConsulta(consulta: any) {
        return this.http.post(`${this.API_URI}/index.php`, { sentencia: consulta });
    }
    getDBServer(tabla: any) {
        return this.http.get(`${this.API_URI}/index.php?op=getAll&tabla=${tabla}`);
    }


    padron(consulta: any) {
        return this.http.get(`http://norteyagua.online/api/afip/api/padron.php?documento=${consulta}`);
    }

    createDBServer(tabla: any, data: any) {
        var sent = 'INSERT INTO ' + tabla + ' ('
        sent += this.formatoColumnas[tabla].join(', ')
        sent += ") VALUES ('"

        this.formatoColumnas[tabla].forEach((e: any) => {
            var sumar = data[e] ? (data[e].toString() ? data[e].toString() : '') : ''

            if (e == 'datos') {
                try {
                    sumar = JSON.stringify(data[e]);
                } catch {
                    sumar = '{}'
                }
            }

            sumar = sumar.replaceAll("'", '"')

            sent += sumar
            sent += "', '"
        });

        sent = sent.slice(0, -3) + ')'

        console.log(sent)

        return this.http.post(`${this.API_URI}/index.php`, { sentencia: sent, token: this.getToken() });
    }
    updateDBServer(tabla: any, data: any) {
        var sent = 'UPDATE ' + tabla + ' SET '

        for (let i = 0; i < this.formatoColumnas[tabla].length; i++) {

            var datoAgregar = data[this.formatoColumnas[tabla][i]]

            if (this.formatoColumnas[tabla][i] == 'datos') {
                try {
                    datoAgregar = JSON.stringify(datoAgregar);
                } catch {
                    datoAgregar = '{}'
                }
            }

            const agregar = this.formatoColumnas[tabla][i] + " = '" + datoAgregar + "', "
            sent += agregar
        }

        sent = sent.slice(0, -2)
        sent += ' WHERE id = "' + data.id + '"'

        return this.http.post(`${this.API_URI}/index.php`, { sentencia: sent, token: this.getToken() });
    }
    deleteDBServer(tabla: any, idd: any) {
        const sent = 'DELETE FROM ' + tabla + ' WHERE id = "' + idd + '"'
        return this.http.post(`${this.API_URI}/index.php`, { sentencia: sent, token: this.getToken() });
    }
    deleteDBServerEstado(tabla: any, idd: any) {
        var sent = 'UPDATE ' + tabla + ' SET estado = 0 WHERE id = "' + idd + '"'
        return this.http.post(`${this.API_URI}/index.php`, { sentencia: sent, token: this.getToken() });
    }

    getToken() {
        var token = sessionStorage.getItem('token')
        return token
    }

    //Consultas LOCALES:
    getDB(tabla: any, datosGuardar: any, fn: any = false) {
        this.getDBServer(tabla).subscribe(
            (res: any) => {
                res.forEach((e: any) => {
                    if (e.datos) {
                        var datos = {}
                        try {
                            datos = JSON.parse(e.datos);
                        } catch {
                            datos = {}
                        }
                        e.datos = datos
                    }
                });

                datosGuardar[tabla] = res

                if (fn) {
                    fn()
                }
            },
            (err: any) => {
                console.error(err)
            }
        )
    }

    createDB(tabla: any, datosGuardar: any, fn: any = false) {
        this.createDBServer(tabla, datosGuardar).subscribe(
            (res: any) => {
                if (res.ok) {
                    if (fn) {
                        fn()
                    }
                } else {
                    console.log(res)
                }
            },
            (err: any) => {
                console.error(err)
            }
        )
    }

    updateDB(tabla: any, datosGuardar: any, fn: any = false) {
        this.updateDBServer(tabla, datosGuardar).subscribe(
            (res: any) => {
                if (res.ok) {
                    if (fn) {
                        fn()
                    }
                } else {
                    console.log(res)
                }
            },
            (err: any) => {
                console.error(err)
            }
        )
    }

    deleteDB(tabla: any, idd: any, fn: any = false) {
        this.deleteDBServer(tabla, idd).subscribe(
            (res: any) => {
                if (res.ok) {
                    if (fn) {
                        fn()
                    }
                } else {
                    console.log(res)
                }
            },
            (err: any) => {
                console.error(err)
            }
        )
    }
    deleteDBEstado(tabla: any, idd: any, fn: any = false) {
        this.deleteDBServerEstado(tabla, idd).subscribe(
            (res: any) => {
                if (res.ok) {
                    if (fn) {
                        fn()
                    }
                } else {
                    console.log(res)
                }
            },
            (err: any) => {
                console.error(err)
            }
        )
    }


}