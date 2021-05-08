import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';



@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  
  empleados: any [] = [];
  

  constructor(private _empleadoService: EmpleadoService, private toastr: ToastrService) { 
    
    
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados(){
    // al devolver un Observable nos tenemos que Suscribir
    this._empleadoService.obtenerEmpleados().subscribe( empleados =>{
      this.empleados = []; // limpieamos arreglo
      empleados.forEach( (datos:any) => {        
        

        this.empleados.push({
          id: datos.payload.doc.id,   // console.log(datos.payload.doc.id);
          ...datos.payload.doc.data() // console.log(datos.payload.doc.data());
        })
      });
      console.log(this.empleados);
      
    })
  }

  eliminarEmpleado(id: string){
    this._empleadoService.eliminarEmpleado(id).then(()=>{
      this.toastr.error('Empleado eliminado correctamente.', 'Registro Eliminado');
    }).catch( error =>{
      console.log(error);
    })
  }

}
