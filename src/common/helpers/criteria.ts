import { FilterQuery, Model } from 'mongoose';

type FilterValue = string | number | boolean | null | undefined;

interface FilterCondition {
  $eq?: FilterValue;
  $ne?: FilterValue;
  $gt?: FilterValue;
  $lt?: FilterValue;
  $regex?: string | RegExp;
  $not?: FilterCondition;
}

export interface Filters {
  [key: string]: FilterValue | FilterCondition | FilterCondition[] | Filters; // Permite anidar filtros y condiciones
}

type OrderDirection = 1 | -1;

export interface Order {
  [key: string]: OrderDirection;
}

export enum QueryType {
  One = 'one',
  Many = 'many',
}

export class Criteria {
  readonly filters: Filters;
  readonly order?: Order;
  readonly limit?: number;
  readonly offset?: number;
  readonly queryType: QueryType;

  constructor(
    filters: Filters,
    queryType: QueryType,
    order?: Order,
    limit?: number,
    offset?: number,
  ) {
    this.filters = filters;
    this.order = order;
    this.limit = limit;
    this.offset = offset;
    this.queryType = queryType;
  }

  public hasFilters(): boolean {
    return Object.keys(this.filters).length > 0;
  }

  public buildQuery<T>(model: Model<T>) {
    let query;

    if (this.queryType === QueryType.One) {
      query = model.findOne(this.filters as FilterQuery<T>);
      if (this.order) {
        query = query.sort(this.order);
      }
    } else {
      query = model.find(this.filters as FilterQuery<T>);
      if (this.order) {
        query = query.sort(this.order);
      }
      if (this.limit !== undefined) {
        query = query.limit(this.limit);
      }
      if (this.offset !== undefined) {
        query = query.skip(this.offset);
      }
    }

    return query;
  }
}
