import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-crear-empleados',
  templateUrl: './crear-empleados.component.html',
  styleUrls: ['./crear-empleados.component.css']
})
export class CrearEmpleadosComponent implements OnInit {

  crearEmpleado: FormGroup;
  agregar = false;
  cargando = false;
  id: string | null;
  titulo: string = "Agregar Empleado";

  constructor(private fb: FormBuilder, private _empleadoService: EmpleadoService,
     private router: Router, private toastr: ToastrService,
     private aRoute: ActivatedRoute) {
    // validamos formulario
    this.crearEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required]
    })

    this.id = this.aRoute.snapshot.paramMap.get('id'); // capturamos el id --> /editar-empleados/:ID
    console.log(this.id);
    
   }


  
   ngOnInit(): void {

    this.esEditar();
  }

  agregarEditarEmpleado(){

    this.cargando = true;
    
    if(this.crearEmpleado.invalid){
      return;
    }
    
    if(this.id === null){
      this.agregarEmpleado();
    } else {
      this.editarEmpleado(this.id);
    }
    
  }

  editarEmpleado(id:string){

    const empleado: any = {
      nombre: this.crearEmpleado.value.nombre,
      apellido: this.crearEmpleado.value.apellido,
      documento: this.crearEmpleado.value.documento,
      salario: this.crearEmpleado.value.salario,
      fechaActualizacion: new Date()
    }

    this.cargando = true;

    this._empleadoService.actualizarEmpleado(id, empleado).then(()=>{
      this.cargando = false;
      this.toastr.info('Empleado editado con éxito.','Registro Editado')
    })
    this.router.navigate(['/lista-empleados']);
  }

  agregarEmpleado(){

    const empleado: any = {
      nombre: this.crearEmpleado.value.nombre,
      apellido: this.crearEmpleado.value.apellido,
      documento: this.crearEmpleado.value.documento,
      salario: this.crearEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    // al injectar el servicio en el constructor, podemos invocar sus métodos
    this._empleadoService.agregarEmpleado(empleado).then((resultado)=>{

      this.toastr.success('Empleado registrado correctamente!', 'Datos OK');
      this.crearEmpleado.reset();
      this.cargando = false;
      this.router.navigate(['/lista-empleados']);

    }).catch( (error) =>{
      console.log(error);
      this.cargando = false;
    })

    console.log(empleado);
  }

  esEditar(){

    if(this.id != null){
      this.cargando = true;
      this.titulo = "Editar Empleado";
      this._empleadoService.editarEmpleado(this.id).subscribe( datos => {
        this.cargando = false;
        // console.log(datos.payload.data()['nombre']); --> de esta forma accedemos al atributo nombre del documento

        // editamos los campos del formulario con los valores de los atributos del documento
        this.crearEmpleado.setValue({
          nombre: datos.payload.data()['nombre'],
          apellido: datos.payload.data()['apellido'],
          documento: datos.payload.data()['documento'],
          salario: datos.payload.data()['salario'],
        })
      })
    }
  }
}
