import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: AngularFirestore) { 

    
  }

  agregarEmpleado(empleado: any): Promise<any>{ //método para guardar empleados en Firestore
    return this.firestore.collection('empleados').add(empleado);
  }

  obtenerEmpleados(): Observable<any>{ // snapshotChanges crea un arreglo que esta sincronizado con los cambios en tiempo real
                                                  // ordenamos por fecha y ascendentemente
    return this.firestore.collection('empleados', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarEmpleado(id: string): Promise<any>{
    return this.firestore.collection('empleados').doc(id).delete();
  }

  editarEmpleado(id: string): Observable<any>{
    return this.firestore.collection('empleados').doc(id).snapshotChanges();
  }

  actualizarEmpleado(id: string, data: any): Promise<any>{
    return this.firestore.collection('empleados').doc(id).update(data);
  }
}
