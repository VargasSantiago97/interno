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
    vueltasIniciales: any = 112

    tiposDeSorteoRealizar: any = [3, 3, 3, 2, 2, 2, 1, 1, 1]
    sorteActual: any = 0

    mostrando: any = true
    mostrarPapeles: any = false

    fondoGanador: any = 'rgb(47, 255, 0)'

    mostrarDiv: boolean = false

    papers: { color: string, left: string }[] = [];

    db: any = {}

    clientes = [
        {
            "id": "30-70850333-5",
            "tipo": "3",
            "nombre": "ACI-AGRO S.A."
        },
        {
            "id": "33-71622271-9",
            "tipo": "3",
            "nombre": "AGRO CIN DE PABLO CINTIOLI Y GASTON CINTIOLI SOCIEDAD SIMPLE"
        },
        {
            "id": "33-70799842-9",
            "tipo": "1",
            "nombre": "AGROCAFE S A"
        },
        {
            "id": "30-71520736-9",
            "tipo": "3",
            "nombre": "AGROGANADERA MARTIN HERMANOS SA"
        },
        {
            "id": "30-71748532-3",
            "tipo": "1",
            "nombre": "AGROPECUARIA DON RINO S. R. L."
        },
        {
            "id": "20-17483225-1",
            "tipo": "3",
            "nombre": "ANTOGNINI, MARIO DOMINGO"
        },
        {
            "id": "20-35059297-1",
            "tipo": "3",
            "nombre": "ARAGON, RODRIGO NICOLAS"
        },
        {
            "id": "20-34793514-0",
            "tipo": "3",
            "nombre": "ASSELBORN, CLAUDIO DARIO"
        },
        {
            "id": "20-07905364-4",
            "tipo": "3",
            "nombre": "ASSELBORN, JUAN"
        },
        {
            "id": "30-71188354-8",
            "tipo": "3",
            "nombre": "AV - DAM S.R.L."
        },
        {
            "id": "20-10430698-6",
            "tipo": "3",
            "nombre": "BELLINO, ANSELMO LUIS"
        },
        {
            "id": "20-13350327-8",
            "tipo": "3",
            "nombre": "BETJAN, HECTOR"
        },
        {
            "id": "20-34423095-2",
            "tipo": "3",
            "nombre": "GOMEZ, FRANCO DAVID"
        },
        {
            "id": "23-20552190-9",
            "tipo": "3",
            "nombre": "BROGLIA, JORGE RAUL"
        },
        {
            "id": "30-71463535-9",
            "tipo": "2",
            "nombre": "BUENA ESPERANZA SOCIEDAD DE HECHO DE GORDYCZYK GERMAN Y GORDYCZYK ADRIAN"
        },
        {
            "id": "20-14799265-4",
            "tipo": "3",
            "nombre": "CAPITANICH, HECTOR WILMAN"
        },
        {
            "id": "20-30949237-5",
            "tipo": "3",
            "nombre": "CASTILLO, EDUARDO VICTOR"
        },
        {
            "id": "20-27199986-1",
            "tipo": "3",
            "nombre": "CEPO, BENITO BERNARDO"
        },
        {
            "id": "23-12793402-9",
            "tipo": "3",
            "nombre": "CIMBARO, ROBERTO OSCAR"
        },
        {
            "id": "20-30570238-3",
            "tipo": "3",
            "nombre": "CZYRUK, EDUARDO JAVIER"
        },
        {
            "id": "30-70955838-9",
            "tipo": "1",
            "nombre": "DON RINO S.R.L."
        },
        {
            "id": "30-71152826-8",
            "tipo": "3",
            "nombre": "DON SANTIAGO S.R.L."
        },
        {
            "id": "20-13216742-8",
            "tipo": "3",
            "nombre": "DOROÑUK, HUGO ALBERTO"
        },
        {
            "id": "20-08008266-6",
            "tipo": "2",
            "nombre": "DUTTO, JUAN CARLOS"
        },
        {
            "id": "30-66896227-7",
            "tipo": "1",
            "nombre": "EL AMANECER SRL"
        },
        {
            "id": "33-70839465-9",
            "tipo": "1",
            "nombre": "EL IMPENETRABLE SRL"
        },
        {
            "id": "30-70953544-3",
            "tipo": "3",
            "nombre": "ESTABLECIMIENTO RIO SECO S.R.L."
        },
        {
            "id": "30-71167247-4",
            "tipo": "3",
            "nombre": "ESTANCIA CAPIOVI S.R.L."
        },
        {
            "id": "20-27404531-1",
            "tipo": "3",
            "nombre": "FARIELLO, RICARDO LUIS"
        },
        {
            "id": "23-24259268-9",
            "tipo": "3",
            "nombre": "FERNANDEZ, GUSTAVO ALFREDO"
        },
        {
            "id": "30-50835894-2",
            "tipo": "3",
            "nombre": "FICA S.A."
        },
        {
            "id": "30-71135818-4",
            "tipo": "2",
            "nombre": "FIDEICOMISO EL CHIQUITO"
        },
        {
            "id": "23-16776092-9",
            "tipo": "3",
            "nombre": "FOGAR, OSCAR ALBERTO"
        },
        {
            "id": "20-23684044-2",
            "tipo": "2",
            "nombre": "FONTANELLAS, WALTER ARIEL"
        },
        {
            "id": "20-26403686-1",
            "tipo": "3",
            "nombre": "GARCIA, CLAUDIO LEANDRO"
        },
        {
            "id": "27-34176838-7",
            "tipo": "3",
            "nombre": "GASKO, MARCELA FABIOLA"
        },
        {
            "id": "20-12555263-4",
            "tipo": "3",
            "nombre": "GOMEZ, ALDO OSCAR"
        },
        {
            "id": "20-34423095-2",
            "tipo": "3",
            "nombre": "GOMEZ, FRANCO DAVID"
        },
        {
            "id": "20-13703169-9",
            "tipo": "3",
            "nombre": "GRECZNY, EUGENIO SAMUEL"
        },
        {
            "id": "30-71422434-0",
            "tipo": "2",
            "nombre": "GRUPO AGROFORESTAL SRL"
        },
        {
            "id": "30-71589312-2",
            "tipo": "3",
            "nombre": "GRUPO M.P.G. S.R.L."
        },
        {
            "id": "20-24576697-2",
            "tipo": "3",
            "nombre": "HAPONIUK, JOSE JAVIER"
        },
        {
            "id": "30-71074290-8",
            "tipo": "3",
            "nombre": "INGECAM S.R.L."
        },
        {
            "id": "30-71019579-6",
            "tipo": "3",
            "nombre": "ITIN S.R.L."
        },
        {
            "id": "27-32473999-3",
            "tipo": "3",
            "nombre": "JEPPESEN, ANDREA MARINA"
        },
        {
            "id": "24-40173801-7",
            "tipo": "3",
            "nombre": "JEPPESEN, JUAN MARTIN VALDEMAR"
        },
        {
            "id": "20-13871412-9",
            "tipo": "3",
            "nombre": "JEPPESEN, JUAN RICARDO"
        },
        {
            "id": "30-71053755-7",
            "tipo": "1",
            "nombre": "JORGE Y JOSE MARTIN S.H."
        },
        {
            "id": "20-25132474-4",
            "tipo": "3",
            "nombre": "DANIEL, JUAN ANTONIO"
        },
        {
            "id": "30-71609848-2",
            "tipo": "3",
            "nombre": "JULVI SRL"
        },
        {
            "id": "20-17762653-9",
            "tipo": "1",
            "nombre": "KALEK, TITO OMAR"
        },
        {
            "id": "23-05670236-9",
            "tipo": "3",
            "nombre": "KEES, EDUARDO GUSTAVO"
        },
        {
            "id": "20-41039163-6",
            "tipo": "3",
            "nombre": "KEES, JUAN CRUZ"
        },
        {
            "id": "20-30096917-9",
            "tipo": "3",
            "nombre": "KOBLUK, ARIEL ARCADIO"
        },
        {
            "id": "20-22749967-3",
            "tipo": "3",
            "nombre": "KOBLUK, DANIEL ESTEBAN"
        },
        {
            "id": "20-07929946-5",
            "tipo": "3",
            "nombre": "KOHN, MAURICIO ENRIQUE"
        },
        {
            "id": "20-25229129-7",
            "tipo": "3",
            "nombre": "KOHN, RICARDO JAVIER"
        },
        {
            "id": "20-26719708-4",
            "tipo": "3",
            "nombre": "KONSIMAL, GUSTAVO RAUL"
        },
        {
            "id": "20-31098035-9",
            "tipo": "3",
            "nombre": "KOUCZ, ADOLFO JOEL"
        },
        {
            "id": "30-70613508-8",
            "tipo": "1",
            "nombre": "LA CONSTANCIA S.A."
        },
        {
            "id": "33-70745621-9",
            "tipo": "1",
            "nombre": "LA LEONESA S.R.L."
        },
        {
            "id": "30-71134078-1",
            "tipo": "3",
            "nombre": "LA YUNTA S.A."
        },
        {
            "id": "20-10366676-8",
            "tipo": "1",
            "nombre": "LAGUZZI, RUBEN VICENTE"
        },
        {
            "id": "20-22356660-0",
            "tipo": "2",
            "nombre": "LEGUIZA, DIEGO JAVIER"
        },
        {
            "id": "20-21849310-7",
            "tipo": "2",
            "nombre": "LIPPS, GUSTAVO JAVIER"
        },
        {
            "id": "20-21395862-4",
            "tipo": "2",
            "nombre": "LIPRANDI KEMBER, JUAN JOSE"
        },
        {
            "id": "30-71156677-1",
            "tipo": "1",
            "nombre": "LIPSA SRL"
        },
        {
            "id": "33-71041708-9",
            "tipo": "2",
            "nombre": "LOS FORESTALES S.R.L."
        },
        {
            "id": "30-71729022-0",
            "tipo": "3",
            "nombre": "LOS TRES TIGRES S. R. L."
        },
        {
            "id": "30-71720883-4",
            "tipo": "1",
            "nombre": "LUIS DODERO AGRO SA"
        },
        {
            "id": "20-16690919-9",
            "tipo": "1",
            "nombre": "LUXEN, OSIRIS PEDRO"
        },
        {
            "id": "20-14140418-1",
            "tipo": "3",
            "nombre": "MACUGLIA, MIGUEL ANGEL"
        },
        {
            "id": "30-67011777-0",
            "tipo": "3",
            "nombre": "MADERAS CHAQUENAS SRL"
        },
        {
            "id": "30-71053470-1",
            "tipo": "3",
            "nombre": "MAPA AGROPECUARIA S.A."
        },
        {
            "id": "20-08534185-6",
            "tipo": "3",
            "nombre": "MARTIN, EDUARDO"
        },
        {
            "id": "30-65758575-7",
            "tipo": "3",
            "nombre": "MARTIN HERMANOS SA"
        },
        {
            "id": "20-17851245-6",
            "tipo": "3",
            "nombre": "MELGRATTI, WALTER ENRIQUE"
        },
        {
            "id": "20-21830728-1",
            "tipo": "3",
            "nombre": "MELLINGER, RICARDO ALBERTO"
        },
        {
            "id": "20-21175304-9",
            "tipo": "3",
            "nombre": "MERCANTI, MARCELO GUILLERMO"
        },
        {
            "id": "23-23282924-9",
            "tipo": "3",
            "nombre": "MERCANTI, MAURICIO RENE"
        },
        {
            "id": "20-12365136-8",
            "tipo": "3",
            "nombre": "MINETTI, JUAN GUSTAVO"
        },
        {
            "id": "30-71708344-6",
            "tipo": "3",
            "nombre": "MONILLO S.R.L."
        },
        {
            "id": "20-06444863-4",
            "tipo": "1",
            "nombre": "MONTORO, ANTONIO"
        },
        {
            "id": "20-24547300-2",
            "tipo": "1",
            "nombre": "MONTORO, ADRIAN ALEJANDRO"
        },
        {
            "id": "27-31731001-9",
            "tipo": "1",
            "nombre": "MONTORO, VALERIA MARICEL"
        },
        {
            "id": "20-31487972-5",
            "tipo": "3",
            "nombre": "MOSCHEN, ALEXIS ORESTES"
        },
        {
            "id": "30-71169286-6",
            "tipo": "1",
            "nombre": "MT AGROSERVICIOS S.R.L."
        },
        {
            "id": "30-70863027-2",
            "tipo": "3",
            "nombre": "ORYZA SA"
        },
        {
            "id": "30-70831069-3",
            "tipo": "2",
            "nombre": "PAMPINFIER SA"
        },
        {
            "id": "20-36506525-0",
            "tipo": "3",
            "nombre": "PASSAMANI, JORGE MARTIN"
        },
        {
            "id": "27-20603261-3",
            "tipo": "3",
            "nombre": "PEÑA, SANDRA MARCELA"
        },
        {
            "id": "20-16339552-6",
            "tipo": "2",
            "nombre": "PINCZUK, EMILIO LUIS"
        },
        {
            "id": "30-69674819-1",
            "tipo": "3",
            "nombre": "PUENTE NOGUEIRA SRL"
        },
        {
            "id": "20-28394648-8",
            "tipo": "3",
            "nombre": "RAMELLA, FERNANDO SEGUNDO"
        },
        {
            "id": "20-12970962-7",
            "tipo": "2",
            "nombre": "SALOMON, JORGE"
        },
        {
            "id": "20-14224697-0",
            "tipo": "3",
            "nombre": "SCHULZ, RODOLFO"
        },
        {
            "id": "20-24079362-9",
            "tipo": "3",
            "nombre": "SOTELO, HECTOR RAUL"
        },
        {
            "id": "20-16142380-8",
            "tipo": "3",
            "nombre": "SVEDA, HUGO ALBERTO"
        },
        {
            "id": "20-12261721-2",
            "tipo": "3",
            "nombre": "SVEDA, JORGE ELIAS"
        },
        {
            "id": "20-12169348-9",
            "tipo": "3",
            "nombre": "SZKARLATIUK, NICOLAS"
        },
        {
            "id": "20-17373511-2",
            "tipo": "3",
            "nombre": "TALALAY, ALBERTO"
        },
        {
            "id": "20-16817149-9",
            "tipo": "3",
            "nombre": "TICHIJ, MARTIN JOSE"
        },
        {
            "id": "20-17730476-0",
            "tipo": "3",
            "nombre": "TICHIJ, RICARDO EDUARDO"
        },
        {
            "id": "20-13179726-6",
            "tipo": "3",
            "nombre": "TORRES, ALBERTO JAVIER"
        },
        {
            "id": "30-71444089-2",
            "tipo": "2",
            "nombre": "TRANSPETROL S.A."
        },
        {
            "id": "20-33228659-6",
            "tipo": "3",
            "nombre": "TRAVIESAS FRANCO, GERMAN ALEXIS FIDEL"
        },
        {
            "id": "20-10407792-8",
            "tipo": "1",
            "nombre": "UZELAK, NICOLAS"
        },
        {
            "id": "20-23085593-6",
            "tipo": "3",
            "nombre": "VALLEJO, JORGE LUIS"
        },
        {
            "id": "23-20342074-9",
            "tipo": "3",
            "nombre": "VERBECK, CARLOS RODOLFO ENRIQ"
        },
        {
            "id": "30-71532772-0",
            "tipo": "1",
            "nombre": "YAGUA COLI S.A."
        },
        {
            "id": "20-25736923-5",
            "tipo": "3",
            "nombre": "YULAN, DINO WALDO"
        },
        {
            "id": "30-71754330-7",
            "tipo": "3",
            "nombre": "YURUMI S. A. S."
        }
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

        this.vueltas = this.vueltasIniciales + (this.clientes.length - (this.selector % this.clientes.length)) + this.clientes.indexOf(cupo_ganador)

        this.girar()
    }

    girar() {
        var delay: any = 1

        if ((this.vueltas - this.vuelta) < 40) {
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

        setTimeout(() => {
            this.clientes.splice(this.selector, 1);
        }, 7000)
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
