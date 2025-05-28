import { SelectQueryBuilder } from 'typeorm';

 export function applyPagination<T>(
 qb: SelectQueryBuilder<T>,
 query: any
 ) {
 const page = Number(query.page)  
1;
 const pageSize = Number(query.pageSize)  
10;
 qb.skip((page - 1) * pageSize).take(pageSize);
return qb;
 }