import { reactive, ref, Ref } from 'vue'
import { Pagination } from '@/interfaces'

export interface UsePagination {
  handleSizeChange: (page: number) => void
  handleCurrentChange: (page: number) => void
  pagination: Pagination
  total: Ref<number>
}
export default function usePagination(getList: () => void): UsePagination {
  const pagination = reactive({
    pageSize: 10,
    pageNum: 1,
  })
  const total = ref(0)
  const handleSizeChange = (size: number): void => {
    pagination.pageSize = size
    pagination.pageNum = 1
    getList()
  }
  const handleCurrentChange = (page: number): void => {
    pagination.pageNum = page
    getList()
  }

  return {
    handleSizeChange,
    handleCurrentChange,
    pagination,
    total,
  }
}
