import { Component } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
    selector: 'app-sorteo',
    templateUrl: './sorteo.component.html',
    styleUrls: ['./sorteo.component.css'],
})
export class SorteoComponent {
    selector: any = 0
    vuelta: any = 0
    vueltas: any = 50

    mostrando: any = true
    mostrarPapeles: any = false

    fondoGanador: any = 'rgb(47, 255, 0)'

    mostrarDiv: boolean = false

    papers: { color: string, left: string  }[] = [];

    db: any = {}

    datosSorteo = [
        { nombre: "Alexander William Thompson" },
        { nombre: "Gabriella Elizabeth Ramirez" },
        { nombre: "Benjamin Nicholas Anderson" },
        { nombre: "Isabella Sophia Mitchell" },
        { nombre: "Christopher David Martinez" },
        { nombre: "Eleanor Victoria Parker" },
        { nombre: "Theodore James Robinson" },
        { nombre: "Victoria Grace Johnson" },
        { nombre: "William Harrison Davis" },
        { nombre: "Olivia Charlotte White" },
        { nombre: "Nicholas Alexander Young" },
        { nombre: "Emily Madison Taylor" },
        { nombre: "Michael Christopher Brown" },
        { nombre: "Abigail Lily Hall" },
        { nombre: "Samuel Benjamin Green" },
        { nombre: "Ava Elizabeth Adams" },
        { nombre: "Daniel Andrew Lewis" },
        { nombre: "Sophia Elizabeth Moore" },
        { nombre: "Matthew Joseph Wilson" },
        { nombre: "Natalie Olivia Scott" },
        { nombre: "James William Turner" },
        { nombre: "Elizabeth Grace Clark" },
        { nombre: "Henry Thomas Harris" },
        { nombre: "Grace Abigail King" },
        { nombre: "Andrew Alexander Baker" },
        { nombre: "Madeline Grace Hill" },
        { nombre: "Jonathan Christopher Cook" },
        { nombre: "Charlotte Rose Turner" },
        { nombre: "David Samuel Hall" },
        { nombre: "Mia Emily Parker" },
        { nombre: "Jacob Benjamin Nelson" }
    ];

    constructor(private cs: ComunicacionService){}

    ngOnInit(){
        this.verificaSorteo()
    }

    verificaSorteo(){
        this.cs.getDB('acciones', this.db, () => {
            
            //VERIFICAR SI HAY QUE SORTEAR
            var estado = this.db['acciones'].find((e:any) => { return e.id == 'sortear' }).estado

            if(estado == 1){
                var editar = {
                    id: 'sortear',
                    tipo: 'sortear',
                    accion: 'sortear',
                    estado: 0
                }

                this.cs.updateDB('acciones', editar, () => {
                    this.sortear()
                    setTimeout(() => { this.verificaSorteo() }, 5000)
                })

            } else {
                setTimeout(() => { this.verificaSorteo() }, 100)
            }

        })
    }

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
            }, 1 + (this.vuelta * 2));
        } else {
            this.vuelta = 0
            setTimeout(() => {
                this.ganador()
            }, 500);
        }
    }

    ganador(){
        this.papelitos()

        this.fondoGanador = 'red'
        setTimeout(() => {
            this.fondoGanador = 'rgb(47, 255, 0)'
        }, 300)
        setTimeout(() => {
            this.fondoGanador = 'red'
        }, 600)
        setTimeout(() => {
            this.fondoGanador = 'rgb(47, 255, 0)'
        }, 900)
        setTimeout(() => {
            this.fondoGanador = 'red'
        }, 1200)
        setTimeout(() => {
            this.fondoGanador = 'rgb(47, 255, 0)'
        }, 1500)

        setTimeout(() => { this.mostrarPapeles = false }, 5000)
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

        return this.datosSorteo[u].nombre
    }

    papelitos(){
        this.mostrarPapeles = true
        this.papers = []

        for (let index = 0; index < 10; index++) {
            setTimeout(() => {

                console.log(index)
                this.createPapers()

            }, index*200)
        }
    }

    createPapers() {
        const colors = ["#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff"];
        for (let i = 0; i < 15; i++) {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            const randomLeft:any = Math.floor(Math.random() * 100) + '%';

            this.papers.push({ color: randomColor, left: randomLeft });
        }
    }

}
