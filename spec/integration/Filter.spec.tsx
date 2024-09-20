import { prettyDOM, render, screen } from '@testing-library/react'
import { List } from 'src/components/List'
import { JestStoreProvider } from '../utils/JestStoreProvider'
import { Search } from 'src/components/Search'
import uE from '@testing-library/user-event'

describe('Список задач', () => {
  // не содержит выполненные задачи
  // после нажатия на кнопку фильтрации
  it('Ограничение на ввод более 32 символов', async () => {
    const userEvent = uE.setup({
      advanceTimers: jest.advanceTimersByTime,
    })
    const { getByRole, getByTestId } = render(<Search />, {
      wrapper: JestStoreProvider,
    })
    const searchEl = getByRole('textbox')
    searchEl.focus()
    await userEvent.type(searchEl, 'Наверное самое длинное название задачи')
    console.log('search', prettyDOM(searchEl))

    const hintEl = getByTestId('search-hint-text')
    expect(hintEl).not.toBe('')
  })

  // показывает как выполненные, так и не выполненные задачи
  // после повторного нажатия на кнопку фильтрации
  it.todo('с выключенным фильтром')

  it('с включенным фильтром', async () => {
    const onDelete = jest.fn()
    const onToggle = jest.fn()

    const items: Task[] = [
      {
        id: '1',
        header: 'купить хлеб',
        done: false,
      },
      {
        id: '2',
        header: 'купить молоко',
        done: false,
      },
      {
        id: '3',
        header: 'выгулять собаку',
        done: true,
      },
    ]

    render(<List items={items} onDelete={onDelete} onToggle={onToggle} />)
    const itemEl = screen.getAllByTestId('label-field')
    // itemEl.forEach((x) => console.log('test', prettyDOM(x)))

    //выставляем значение seach на 'куп'
    const userEvent = uE.setup({
      advanceTimers: jest.advanceTimersByTime,
    })
    render(<Search />, {
      wrapper: JestStoreProvider,
    })
    const searchEl = screen.getByRole('textbox')
    searchEl.focus()
    await userEvent.type(searchEl, 'куп')
    // console.log('search', prettyDOM(searchEl))

    expect(
      itemEl.filter((item) => item.innerHTML.includes('куп'))
    ).toHaveLength(2)
  })
})
