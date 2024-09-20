import { render, screen } from '@testing-library/react'
import { List } from 'src/components/List'

const items: Task[] = [
  {
    id: '1',
    header: 'купить хлеб',
    done: true,
  },
  {
    id: '2',
    header: 'купить молоко',
    done: true,
  },
  {
    id: '3',
    header: 'выгулять собаку',
    done: true,
  },
  {
    id: '4',
    header: 'купить хлеб',
    done: true,
  },
  {
    id: '5',
    header: 'купить молоко',
    done: true,
  },
  {
    id: '6',
    header: 'выгулять собаку',
    done: true,
  },
  {
    id: '7',
    header: 'купить хлеб',
    done: true,
  },
  {
    id: '8',
    header: 'купить молоко',
    done: true,
  },
  {
    id: '9',
    header: 'выгулять собаку',
    done: true,
  },
  {
    id: '10',
    header: 'выгулять кошку',
    done: true,
  },
  {
    id: '11',
    header: 'выгулять cat',
    done: true,
  },
]

it('отображение списка задач', () => {
  const onDelete = jest.fn()
  const onToggle = jest.fn()

  const { rerender, asFragment } = render(
    <List items={items} onDelete={onDelete} onToggle={onToggle} />
  )
  const firstRender = asFragment()

  items.pop()

  rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />)
  const secondRender = asFragment()

  expect(firstRender).toMatchDiffSnapshot(secondRender)
})

it('Список содержит не больше 10 невыполненных задач', () => {
  const onDelete = jest.fn()
  const onToggle = jest.fn()
  render(<List items={items} onDelete={onDelete} onToggle={onToggle} />)
  const listEl = screen.queryAllByRole('button')
  expect(
    listEl.filter((item) => !item.hasAttribute('disabled')).length <= 10
  ).toBeTruthy()
})
