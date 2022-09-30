import request from '@/utils/request'
import { EngineeringData } from '@/interfaces/engineering'
import { Pagination } from '@/interfaces/index'
export function getEngineeringListApi(
  data: EngineeringData & Pagination
): Promise<any> {
  return request({
    url: '/queryProjectInfoByParams',
    method: 'POST',
    data,
  })
}
