import { Injectable } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, map, switchMap } from 'rxjs/operators';
import { ProductActions, ProductSelectors } from './products.traits';
import { of } from 'rxjs';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map((products) =>
            ProductActions.loadProductsSuccess({ entities: products })
          ),
          catchError(() => of(ProductActions.loadProductsFail()))
        )
      )
    );
  });

  checkout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.checkout),
      concatLatestFrom(() =>
        this.store.select(ProductSelectors.selectProductSelected)
      ),
      filter(([_, product]) => !!product),
      exhaustMap(([_, product]) =>
        this.orderService
          .checkout({ productId: product!.id, quantity: 1 })
          .pipe(
            map((orderId) => ProductActions.checkoutSuccess({ orderId })),
            catchError(() => of(ProductActions.checkoutFail()))
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
    private productService: ProductService,
    private orderService: OrderService
  ) {}
}
