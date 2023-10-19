import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var vars: any;

@Injectable({
    providedIn: 'root'
})
export class ComunicacionService {

    API_URI = vars.API_URI;
    USER_ID: any = 0;
    BLOQUEAR_EDICION: any = vars.BLOQUEAR_EDICION

    constructor(
        private http: HttpClient,
    ) {
        this.USER_ID = localStorage.getItem('user')

        if(!this.BLOQUEAR_EDICION){
            this.BLOQUEAR_EDICION = false
        }
    }

    
    //Consultas a DB
    getDB(tabla: any) {
        return this.http.get(`${this.API_URI}/index.php?op=getAll&tabla=${tabla}`);
    }
    getStatusTest() {
        return this.http.get(`http://192.168.50.106/estado`);
    }
    getDBAll(tabla: any) {
        return this.http.get(`${this.API_URI}/index.php?op=getAllAll&tabla=${tabla}`);
    }
    createDB(tabla: any, data: any) {
        if(!this.BLOQUEAR_EDICION){
            return this.http.post(`${this.API_URI}/index.php?op=create&tabla=${tabla}`, this.trans(tabla, data));
        } else {
            return this.http.post(`${this.API_URI}/index.php?op=getAll&tabla=null`, this.trans(tabla, data));
        }
    }
    updateDB(tabla: any, data: any) {
        if(!this.BLOQUEAR_EDICION){
            return this.http.post(`${this.API_URI}/index.php?op=update&tabla=${tabla}`, this.transEdit(tabla, data));
        } else {
            return this.http.post(`${this.API_URI}/index.php?op=getAll&tabla=null`, this.trans(tabla, data));
        }
    }
    updateDirectoDB(tabla: any, data: any) {
        if(!this.BLOQUEAR_EDICION){
            return this.http.post(`${this.API_URI}/index.php?op=update&tabla=${tabla}`, data);
        } else {
            return this.http.post(`${this.API_URI}/index.php?op=getAll&tabla=null`, this.trans(tabla, data));
        }
    }

    //Consultas a DB
    getDir(dir: any) {
        return this.http.get(`${this.API_URI}/listar.php?&dir=${dir}`);
    }


    trans(tabla:any, dato:any){
        dato.estado = 1;

        dato.creado_por = this.USER_ID;
        dato.editado_por = this.USER_ID;

        var fechaHora = new Date();
        fechaHora.setHours(fechaHora.getHours() - 3);
        var fechaHoraISO = fechaHora.toISOString().slice(0, 19).replace('T', ' ');

        dato.creado_el = fechaHoraISO
        dato.editado_el = fechaHoraISO

        this.setearUltimaMod(tabla, fechaHoraISO)

        return dato
    }
    transEdit(tabla:any, dato:any){
        dato.editado_por = this.USER_ID;

        var fechaHora = new Date();
        fechaHora.setHours(fechaHora.getHours() - 3);
        var fechaHoraISO = fechaHora.toISOString().slice(0, 19).replace('T', ' ');

        dato.editado_el = fechaHoraISO

        this.setearUltimaMod(tabla, fechaHoraISO)

        return dato
    }
    setearUltimaMod(tabla:any, ult_mod:any){
        this.getDB('sync').subscribe(
            (res:any) => {
                if(res){
                    var dato = res.find((e:any) => { return e.tabla == tabla })
                    if(dato){
                        dato.ult_mod = ult_mod
                        this.updateDB('sync', dato).subscribe(
                            (resp:any) => {}, (errr:any) => {console.log(errr)}
                        )
                    }
                }
            },
            (err:any) => {
                console.log(err)
            }
        )
    }
}