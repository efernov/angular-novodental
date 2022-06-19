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
  ortodonciaVerDatos: Ortodoncia = new OrtodonciaImpl(0, "", "", "", 0, [], "");
  numPaginas: number = 0;

  constructor(
    private ortodonciaService: OrtodonciaService,
    private auxService: AuxiliarService
  ) { }

  ngOnInit(): void {
    this.ortodonciaService.getOrtodoncias().subscribe((response) =>
    this.ortodoncias = this.ortodonciaService.extraerOrtodoncias(response));
    this.getTodasOrtodoncias();
  /* this.ortodonciaService.getOrtodoncias().subscribe(
    (lstOrtodoncia) =>{
      debugger;
    this.ortodoncias =lstOrtodoncia;
    this.ortodonciaService.extraerOrtodoncias(response));
    this.getTodasOrtodoncias();
  }); */
  }

  verDatos(ortodoncia: Ortodoncia): void {
    this.ortodonciaVerDatos = ortodoncia;
  }

  onOrtodonciaEliminar(ortodoncia: Ortodoncia): void {
    debugger;
    console.log(`He eliminado a ${ortodoncia.id}`);
    this.ortodonciaService.deleteOrtodoncia(ortodoncia.id).subscribe(
      () => { console.log('ortodoncia eliminado');},
      (error) => {console.error(error);}
    )
    this.ortodoncias = this.ortodoncias.filter(u => ortodoncia !== u);
  }

  getTodasOrtodoncias(): void {
    this.ortodonciaService.getOrtodoncias().subscribe((r) => {
      this.numPaginas = this.auxService.getPaginasResponse(r);
      for (let index = 1; index <= this.numPaginas; index++) {
        this.ortodonciaService.getOrtodonciasPagina(index).subscribe(response => {
          this.todasOrtodoncias.push(
            ...this.ortodonciaService.extraerOrtodoncias(response)
          );
        });
      }
    });
  }
  borrarOrtodoncia(id: number): void {
    this.ortodonciaService.deleteOrtodoncia(id);
  }

  modificarOrtodoncia(ortodoncia: OrtodonciaImpl): void {
    this.ortodonciaService.patchOrtodoncia(ortodoncia).subscribe();
  }
}
