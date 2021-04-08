import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GetIdService {
  constructor() { }

  private idNum;

  setId(idNum){
    this.idNum = idNum; 
  }

  getId(){
    let temp = this.idNum;
    this.clearId();
    return temp;
  }

  clearId(){
    this.idNum = undefined;
  }
}
