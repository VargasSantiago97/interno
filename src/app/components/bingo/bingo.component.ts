import { Component } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.css']
})
export class BingoComponent {

  cols: any = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  rows: any = [0, 1, 2]

  cartones: any = [
      [
          ['', '', 27, 36, '', 52, 62, '', 80],
          ['', 11, '', 37, 41, '', '', 75, 88],
          [3, 12, '', '', 48, '', 65, 76, ''],
      ],
      [
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          [11, 12, 13, 14, 15, 16, 17, 18, 19],
          [21, 22, 23, 24, 25, 26, 27, 28, 29],
      ],
      [
          ['', '', 27, 36, '', 52, 62, '', 80],
          ['', 11, '', 37, 41, '', '', 75, 88],
          [3, 12, '', '', 48, '', 65, 76, ''],
      ]
  ]


  constructor() {}

  ngOnInit() {
  }
}

