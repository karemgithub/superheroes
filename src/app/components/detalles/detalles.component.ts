import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, provideRouter, withComponentInputBinding } from '@angular/router';
import { ServiceSHService } from '../../services/service-sh.service';
import { Superheroe } from '../../models/superheroe.model';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuperheroesComponent } from '../superheroes/superheroes.component';
import { routes } from '../../app.routes';
import { ModificarshComponent } from '../modificarsh/modificarsh.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatButtonModule, MatListModule, ReactiveFormsModule, SuperheroesComponent, 
    ModificarshComponent, NgxUiLoaderModule],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent implements OnInit {

  superheroes: Superheroe[] = [];

  @Input() id?: string;

  // declaración de atributos y variables.
  indice: number = 0;

  titulo: string = "Modificar SuperHeroe";

  superheroe: string = "";
  editor: string = "";
  actor_principal: string = "";
  tematica: string = "";
  personajes: string = "";
  imagen: string = "";

  sh: Superheroe[] = [];

  Superheroe: Superheroe = new Superheroe(0, '', '', '', '', '', '');

  constructor(private route: ActivatedRoute, private servicesh: ServiceSHService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.indice = this.route.snapshot.params['id'];
    this.buscarSH(this.indice);
    this.superheroe = this.Superheroe.superheroe;
  }

  buscarSH(indice: number): void {
    this.servicesh.encontrarSuperHeroe(indice).subscribe(data => { this.sh = data });

  }

  //==========================================================================================================
  //ELIMINAR UN SUPERHEROE
  //==========================================================================================================
  eliminar(): void {
    let obs$ = new Observable<Superheroe>;
    obs$ = this.servicesh.eliminarSH(this.indice);
    obs$.subscribe(data => { this.Superheroe = data });
    this.volverMostrarSH();
    alert(this.indice);
  }

  volverMostrarSH() {
    this.router.navigate(['/mostrarSH']);
  }

  //==========================================================================================================
  //VALIDACIÓN DEL FORMULARIO REACTIVO
  //==========================================================================================================
  formSH = this.fb.group({
    "superheroe": ['', Validators.required],
    "editor": ['', Validators.required],
    "actorprincipal": ['', Validators.required],
    "tematica": ['', Validators.required],
    "personajes": ['', Validators.required],
    "imagen": ['', Validators.required]
  })

  get nombre(): FormControl {
    return this.formSH.get('superheroe') as FormControl;
  }

  get Editor(): FormControl {
    return this.formSH.get('editor') as FormControl;
  }

  get actorprincipal(): FormControl {
    return this.formSH.get('actorprincipal') as FormControl;
  }

  get Tematica(): FormControl {
    return this.formSH.get('tematica') as FormControl;
  }

  get Imagen(): FormControl {
    return this.formSH.get('imagen') as FormControl;
  }

  get Personajes(): FormControl {
    return this.formSH.get('personajes') as FormControl;
  }
  //==========================================================================================================

  


}
