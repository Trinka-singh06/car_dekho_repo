// import { SelectQueryBuilder } from 'typeorm';

//  export function applyPagination<T>(
//  qb: SelectQueryBuilder<T>,
//  query: any
//  ) {
//  const page = Number(query.page)  
// 1;
//  const pageSize = Number(query.pageSize)  
// 10;
//  qb.skip((page - 1) * pageSize).take(pageSize);
// return qb;
//  }
// utils/applyPagination.ts
import { SelectQueryBuilder } from 'typeorm';


export function applyPagination<T>(
  qb: SelectQueryBuilder<T>,
  query: any,
): { page: number; pageSize: number } {
  const page = query.page || 1;
  const pageSize = query.pageSize || 47;
  const skip = (page - 1) * pageSize;

  qb.skip(skip).take(pageSize);

  return { page, pageSize };
}