import { createEntityFeatureFactory } from 'ngrx-traits';
import {
  addAsyncActionTrait,
  addFilterEntitiesTrait,
  addLoadEntitiesTrait,
  addSelectEntityTrait,
  addSortEntitiesTrait,
} from 'ngrx-traits/traits';
import { props } from '@ngrx/store';
import { Product, ProductFilter } from '../../../models';

export const productTraits = createEntityFeatureFactory(
  { entityName: 'product' },
  addLoadEntitiesTrait<Product>(),
  addSelectEntityTrait<Product>(),
  addSortEntitiesTrait<Product>({
    defaultSort: { active: 'name', direction: 'asc' },
  }),
  addFilterEntitiesTrait<Product, ProductFilter>({
    filterFn: (filter, entity) => {
      return entity.name.toLowerCase().includes(filter.search.toLowerCase());
    },
  }),
  addAsyncActionTrait({
    name: 'checkout',
    actionSuccessProps: props<{ orderId: string }>(),
  })
)({
  actionsGroupKey: '[Products]',
  featureSelector: 'products',
});

export const ProductActions = productTraits.actions;
export const ProductSelectors = productTraits.selectors;
