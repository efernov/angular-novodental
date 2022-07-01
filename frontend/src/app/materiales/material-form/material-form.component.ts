import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrtodonciaImpl } from 'src/app/ortodoncias/models/ortodoncia-impl';
import { OrtodonciaService } from 'src/app/ortodoncias/service/ortodoncia.service';
import { environment } from 'src/environments/environment';
import { MaterialImpl } from '../models/material-impl';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.css']
})
export class MaterialFormComponent implements OnInit {
  public material: MaterialImpl = new MaterialImpl(0, 0,0, "", "", '');
  public materialForm: FormGroup;
  private host: string = environment.host;
  public urlEndPoint: string = `${this.host}ortodoncias`;
  public ortodoncias: OrtodonciaImpl[] = [];


  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private ortodonciaService: OrtodonciaService,
    // private alambreService: AlambreService,
    // private tornilloService: TornilloService
  ) {
    this.materialForm = this.formBuilder.group({
      type: ['', Validators.required],
      price: ['', Validators.required],
      diametroMilimetro: [0],
      longitudCentimetro: [0],
      aperturaMilimetro: [0],
      direccionApertura: [0],
      ortodoncia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ortodonciaService.getOrtodoncias().subscribe((Response) => {
      this.ortodoncias = this.ortodonciaService.extraerOrtodoncias(Response);
      debugger;
    },
    (error) => {
      console.error(error);
    }
    );
  }

}
