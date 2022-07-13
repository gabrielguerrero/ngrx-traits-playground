import { createEntityFeatureFactory } from '@ngrx-traits/core';
import {
  addAsyncActionTrait,
  addFilterEntitiesTrait,
  addLoadEntitiesTrait,
  addSelectEntityTrait,
  addSortEntitiesTrait,
} from '@ngrx-traits/common';
import { props } from '@ngrx/store';
import { Product, ProductFilter } from '../../../models';

export const productTraits = createEntityFeatureFactory(
  { entityName: 'product' },
  addLoadEntitiesTrait<Product>(),
  addSelectEntityTrait<Product>(),
  addSortEntitiesTrait<Product>({
    remote: false,
    defaultSort: { active: 'name', direction: 'asc' },
  }),
  addFilterEntitiesTrait<Product, ProductFilter>({
    filterFn: (filter, entity) => {
      return (
        !filter?.search ||
        entity.name.toLowerCase().includes(filter.search.toLowerCase())
      );
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
