import { Component, OnInit } from '@angular/core';
import { AuxiliarService } from 'src/app/service/auxiliar.service';
import { Material } from '../models/material';
import { MaterialService } from '../service/material.service';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit {
  materiales: Material[] = [];
  todosMateriales: Material[] = [];

  constructor(
    private materialService: MaterialService,
    private auxService: AuxiliarService
  ) { }

  ngOnInit(): void {
    this.getTodosMateriales();
  }

  getTodosMateriales(): void {
    this.materialService.getMateriales().subscribe((response) =>
    this.materiales = this.materialService.extraerMateriales(response));
  }


}
