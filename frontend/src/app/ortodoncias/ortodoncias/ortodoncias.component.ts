import { Component, OnInit } from '@angular/core';
import { AuxiliarService } from 'src/app/service/auxiliar.service';
import { Ortodoncia } from '../models/ortodoncia';
import { OrtodonciaImpl } from '../models/ortodoncia-impl';
import { OrtodonciaService } from '../service/ortodoncia.service';

@Component({
  selector: 'app-ortodoncias',
  templateUrl: './ortodoncias.component.html',
  styleUrls: ['./ortodoncias.component.css']
})
export class OrtodonciasComponent implements OnInit {
  ortodoncias: Ortodoncia[] = [];
  todasOrtodoncias: Ortodoncia[] = [];
  ortodonciaVerDatos: Ortodoncia = new OrtodonciaImpl(0, '', '', '', 0, [], '', '');
  numPaginas: number = 0;

  constructor(
    private ortodonciaService: OrtodonciaService,
    private auxService: AuxiliarService
  ) { }

  ngOnInit(): void {
    this.getTodasOrtodoncias();
  }

  verDatos(ortodoncia: Ortodoncia): void {
    this.ortodonciaVerDatos = ortodoncia;
  }

  ortodonciaEliminar(ortodoncia: Ortodoncia): void {
    debugger;
    console.log(`He eliminado a ${ortodoncia.id}`);
    this.ortodonciaService.deleteOrtodoncia(ortodoncia.id).subscribe(
      () => {
        debugger;
        this.getTodasOrtodoncias();
      },
      (error) => {console.error(error);}
    )
    this.ortodoncias = this.ortodoncias.filter(u => ortodoncia !== u);
  }

  getTodasOrtodoncias(): void {
    this.ortodonciaService.getOrtodoncias().subscribe((response) =>
    this.ortodoncias = this.ortodonciaService.extraerOrtodoncias(response));
  }

}
