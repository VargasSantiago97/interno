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
    vueltas: any = 0
    vueltasIniciales: any = 120

    tiposDeSorteoRealizar: any = [3, 3, 3, 2, 2, 2, 1, 1, 1]
    sorteActual:any = 0

    mostrando: any = true
    mostrarPapeles: any = false

    fondoGanador: any = 'rgb(47, 255, 0)'

    mostrarDiv: boolean = false

    papers: { color: string, left: string }[] = [];

    db: any = {}

    clientes = [
        {
            nombre: "Alexander William Thompson",
            id: 1,
            tipo: 1
        },
        {
            nombre: "Gabriella Elizabeth Ramirez",
            id: 2,
            tipo: 1
        },
        {
            nombre: "Benjamin Nicholas Anderson",
            id: 3,
            tipo: 1
        },
        {
            nombre: "Isabella Sophia Mitchell",
            id: 4,
            tipo: 2
        },
        {
            nombre: "Christopher David Martinez",
            id: 5,
            tipo: 2
        },
        {
            nombre: "Eleanor Victoria Parker",
            id: 6,
            tipo: 2
        },
        {
            nombre: "Theodore James Robinson",
            id: 7,
            tipo: 2
        },
        {
            nombre: "Victoria Grace Johnson",
            id: 8,
            tipo: 2
        },
        {
            nombre: "William Harrison Davis",
            id: 9,
            tipo: 3
        },
        {
            nombre: "Olivia Charlotte White",
            id: 10,
            tipo: 3
        },
        {
            nombre: "Nicholas Alexander Young",
            id: 11,
            tipo: 3
        },
        {
            nombre: "Emily Madison Taylor",
            id: 12,
            tipo: 3
        },
        {
            nombre: "Michael Christopher Brown",
            id: 13,
            tipo: 3
        },
        {
            nombre: "Abigail Lily Hall",
            id: 14,
            tipo: 3
        },
        {
            nombre: "Samuel Benjamin Green",
            id: 15,
            tipo: 3
        },
        {
            nombre: "Ava Elizabeth Adams",
            id: 16,
            tipo: 3
        },
        {
            nombre: "Daniel Andrew Lewis",
            id: 17,
            tipo: 3
        },
        {
            nombre: "Sophia Elizabeth Moore",
            id: 18,
            tipo: 3
        },
        {
            nombre: "Matthew Joseph Wilson",
            id: 19,
            tipo: 3
        },
        {
            nombre: "Natalie Olivia Scott",
            id: 20,
            tipo: 3
        },
        {
            nombre: "James William Turner",
            id: 21,
            tipo: 3
        },
        {
            nombre: "Elizabeth Grace Clark",
            id: 22,
            tipo: 3
        },
        {
            nombre: "Henry Thomas Harris",
            id: 23,
            tipo: 3
        },
        {
            nombre: "Grace Abigail King",
            id: 24,
            tipo: 3
        },
        {
            nombre: "Andrew Alexander Baker",
            id: 25,
            tipo: 3
        },
        {
            nombre: "Madeline Grace Hill",
            id: 26,
            tipo: 3
        },
        {
            nombre: "Jonathan Christopher Cook",
            id: 27,
            tipo: 3
        },
        {
            nombre: "Charlotte Rose Turner",
            id: 28,
            tipo: 3
        },
        {
            nombre: "David Samuel Hall",
            id: 29,
            tipo: 3
        },
        {
            nombre: "Mia Emily Parker",
            id: 30,
            tipo: 3
        },
        {
            nombre: "Jacob Benjamin Nelson",
            id: 31,
            tipo: 3
        },
    ];

    constructor(private cs: ComunicacionService) { }

    ngOnInit() {
        this.verificaSorteo()
    }

    verificaSorteo() {
        this.cs.getDB('acciones', this.db, () => {

            //VERIFICAR SI HAY QUE SORTEAR
            var sortear = this.db['acciones'].find((e: any) => { return e.id == 'sortear' }).estado
            var mostrar = this.db['acciones'].find((e: any) => { return e.id == 'mostrar' }).estado

            if (sortear == 1) {
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

            } else if (mostrar == 1) {
                var editar = {
                    id: 'mostrar',
                    tipo: 'mostrar',
                    accion: 'mostrar',
                    estado: 0
                }

                this.cs.updateDB('acciones', editar, () => {
                    this.mostrar(true)
                    setTimeout(() => { this.verificaSorteo() }, 5000)
                })
            } else {
                setTimeout(() => { this.verificaSorteo() }, 100)
            }

        })
    }

    sortear() {
        this.mostrando = false

        var id_sorteo: any = this.tiposDeSorteoRealizar[this.sorteActual] ? this.tiposDeSorteoRealizar[this.sorteActual] : 1
        this.sorteActual++

        var cupos: any = this.clientes.filter((e: any) => { return e.tipo == id_sorteo })

        var cupo_ganador = cupos[Math.floor(cupos.length * Math.random())]
        console.log(cupo_ganador)

        this.vueltas = this.vueltasIniciales + (this.clientes.length - (this.selector % this.clientes.length)) + this.clientes.indexOf(cupo_ganador) + 4

        this.girar()
    }

    girar() {
        var delay:any = 1

        if((this.vueltas - this.vuelta) < 40){
            delay = 1 + (40 - (this.vueltas - this.vuelta)) * 5
        }

        if (this.vuelta < this.vueltas) {
            setTimeout(() => {
                this.selector++
                this.vuelta++
                this.girar()
            }, delay);
        } else {
            this.vuelta = 0
            setTimeout(() => {
                this.ganador()
            }, 500);
        }
    }

    ganador() {
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
        var cantidad: any = this.clientes.length

        if (u < 0) {
            u = cantidad + u
        }

        if (u >= cantidad) {
            u = u % cantidad
        }

        return this.clientes[u].nombre
    }

    papelitos() {
        this.mostrarPapeles = true
        this.papers = []

        for (let index = 0; index < 10; index++) {
            setTimeout(() => {

                this.createPapers()

            }, index * 200)
        }
    }

    createPapers() {
        const colors = ["#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff"];
        for (let i = 0; i < 15; i++) {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            const randomLeft: any = Math.floor(Math.random() * 100) + '%';

            this.papers.push({ color: randomColor, left: randomLeft });
        }
    }
}
