import { useDispatch, useSelector } from 'react-redux'
import { Empty } from 'src/components/Empty'
import { List } from 'src/components/List'
import { Search } from 'src/components/Search'
import { getSearch } from 'src/store/searchSlice'
import { deleteTask, tasksSelector, toggleTask } from 'src/store/taskSlice'

export const TaskList = () => {
  const items = useSelector(tasksSelector)
  const { search } = useSelector(getSearch)
  const dispatch = useDispatch()

  const handleDelete = (id: Task['id']) => {
    dispatch(deleteTask(id))
  }

  const handleToggle = (id: Task['id']) => {
    dispatch(toggleTask(id))
  }

  const filterItem = items.filter((item) =>
    item.header.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  )

  return items.length > 0 ? (
    <div className="list-box">
      <Search />
      <List
        items={search.length === 0 ? items : filterItem}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </div>
  ) : (
    <Empty />
  )
}
