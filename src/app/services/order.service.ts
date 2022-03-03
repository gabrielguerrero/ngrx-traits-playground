import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OrderService {
  checkout(
    ...order: { productId: string; quantity: number }[]
  ): Observable<string> {
    return of('123').pipe(delay(1000));
  }
}
