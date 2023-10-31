import { Component } from '@angular/core';

@Component({
    selector: 'app-sorteo',
    templateUrl: './sorteo.component.html',
    styleUrls: ['./sorteo.component.css'],
})
export class SorteoComponent {
    selector: any = 0
    vuelta: any = 0
    vueltas: any = 20

    mostrando: any = true


    mostrarDiv: boolean = false

    datosSorteo = [
        { nombre: 'Opción 1 Opcion 1 Opcion 1 Opcion 1' },
        { nombre: 'Opción 2' },
        { nombre: 'Opción 3' },
        { nombre: 'Opción 4' },
        { nombre: 'Opción 5' },
        { nombre: 'Opción 6' },
        { nombre: 'Opción 7' },
        { nombre: 'Opción 8' },
        { nombre: 'Opción 9' },
        { nombre: 'Opción 10' }
    ];

    sortear() {
        this.vueltas = this.vueltas + Math.floor(this.datosSorteo.length * Math.random())
        this.mostrando = false

        this.girar()
    }

    girar() {
        if (this.vuelta < this.vueltas) {
            setTimeout(() => {
                this.selector++
                this.vuelta++
                this.girar()
            }, 50 + (this.vuelta * 5));
        } else {
            this.vuelta = 0
        }
    }

    mostrar(mostrar: any = false) {

        if (mostrar) {
            this.mostrando = true
        }

        this.mostrarDiv = true

        if (this.mostrando) {
            this.selector++
            setTimeout(() => {
                this.mostrarDiv = false
                this.mostrar()
            }, 500)
        }
    }

    dato(u: any) {
        var cantidad: any = this.datosSorteo.length

        if (u < 0) {
            u = cantidad + u
        }

        if (u >= cantidad) {
            u = u % cantidad
        }

        console.log(u)
        return this.datosSorteo[u].nombre
    }

    moverDiv() {

        this.mostrarDiv = true

        setTimeout(() => {
            this.mostrarDiv = false

            setTimeout(() => {
                this.moverDiv()
            }, 1)
        }, 1000)
    }

}
