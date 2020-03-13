import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class TypecarService {
  constructor(private http: HttpClient) { }

  getAllTypeCar() {
    return this.http
      .get('/app/getAllType_car', {
        headers: {
          Authorization: `${localStorage.getItem('access-token')}`
        }
      })
      .pipe(
        map((rs: any) => {
          return rs.data;
        })
      );
  }

  getAllCarDetail() {
    return this.http.get('/app/getAllCar_detailJClean_serviceJModelJCarJType_car', {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs: any) => {
      return rs.data;
    }));
  }
  getAllCarDetailById(id) {
    return this.http.get(`/app/getCar_detailWId/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs: any) => {
      return rs.data;
    }));
  }
  insertTypeCar(data) {
    const payload = {
      model_id: data.model.value,
      car_id: data.car.value,
      type_car_id: data.typeCar.value,
    }
    return this.http.post('/app/insertCar_detail', payload, {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs: any) => {
      return rs.data;
    }))
  }
  insertCar(data) {
    const payload = {
      brand: data.car,
    }
    console.log(payload);

    return this.http.post('/app/insertCar', payload, {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs: any) => {
      return rs.data;
    }))
  }
  insertModel(data) {
    const payload = {
      model_name: data.model,
    }
    console.log(payload);

    return this.http.post('/app/insertModel', payload, {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs: any) => {
      return rs.data;
    }))
  }
  updateTypeCar(data) {
    const payload = {
      model_id: data.editModel.value,
      car_id: data.editCar.value,
      type_car_id: data.editTypeCar.value,
      car_detail_id: data.id
    }
    return this.http.patch('/app/updateCar_detailSm_cid_tcidWcdid', payload, {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs: any) => {
      return rs.result;
    }))
  }

  deleteCarDetail(id) {
    return this.http.delete(`/app/deleteCar_detailWcdid/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem('access-token')}`
      }
    }).pipe(map((rs: any) => {
      return rs.result;
    }))
  }
}
