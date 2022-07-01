import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuxiliarService } from 'src/app/service/auxiliar.service';
import { Ortodoncia } from '../models/ortodoncia';
import { OrtodonciaImpl } from '../models/ortodoncia-impl';
import { OrtodonciaService } from '../service/ortodoncia.service';

@Component({
  selector: 'app-ortodoncia-item',
  templateUrl: './ortodoncia-item.component.html',
  styleUrls: ['./ortodoncia-item.component.css']
})
export class OrtodonciaItemComponent implements OnInit {
  @Input() ortodoncia: Ortodoncia = new OrtodonciaImpl(0, '', '',  '', 0, [], '', '');
  @Output() ortodonciaSeleccionada = new EventEmitter<Ortodoncia>();
  @Output() ortodonciaEliminada = new EventEmitter<Ortodoncia>();

  constructor(
    private ortodonciaService: OrtodonciaService,
    private auxService: AuxiliarService
  ) { }

  ngOnInit(): void {
    // this.ortodonciaService.borrarOrtodoncia().subscribe((response) =>
    // this.ortodoncias = this.ortodonciaService.deleteOrtodoncia(response));
  }

  onOrtodonciaEliminar(): void {
    this.ortodonciaEliminada.emit(this.ortodoncia);
  }
}
