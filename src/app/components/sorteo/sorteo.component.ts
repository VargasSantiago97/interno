import { Component } from '@angular/core';

@Component({
    selector: 'app-sorteo',
    templateUrl: './sorteo.component.html',
    styleUrls: ['./sorteo.component.css'],
})
export class SorteoComponent {
    selector: any = 0
    vuelta: any = 0
    vueltas: any = 40

    mostrando: any = true


    mostrarDiv: boolean = false

    datosSorteo = [
        { nombre: 'Opción 1' },
        { nombre: 'Opción 2' },
        { nombre: 'Opción 3' },
        { nombre: 'Opción 4' },
        { nombre: 'Opción 5' },
        { nombre: 'Opción 6' },
        { nombre: 'Opción 7' },
        { nombre: 'Opción 8' },
        { nombre: 'Opción 9' },
        { nombre: 'Opción 10' },
        { nombre: 'Opción 11' },
        { nombre: 'Opción 12' },
        { nombre: 'Opción 13' },
        { nombre: 'Opción 14' },
        { nombre: 'Opción 15' },
        { nombre: 'Opción 16' },
        { nombre: 'Opción 17' },
        { nombre: 'Opción 18' },
        { nombre: 'Opción 19' },
        { nombre: 'Vargas, Santiago Manuel 💕' },
        { nombre: 'Opción 21' },
        { nombre: 'Opción 22' },
        { nombre: 'Opción 23' },
        { nombre: 'Opción 24' },
        { nombre: 'Opción 25' },
    ];

    sortear() {
        //this.vueltas = this.vueltas + Math.floor(this.datosSorteo.length * Math.random())

        this.mostrando = false

        this.girar()
    }

    girar() {
        if (this.vuelta < this.vueltas) {
            setTimeout(() => {
                this.selector++
                this.vuelta++
                this.girar()
            }, 1 + (this.vuelta * 4));
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
