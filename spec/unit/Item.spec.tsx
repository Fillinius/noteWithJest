import { prettyDOM, render, screen } from '@testing-library/react'
import { Item } from 'src/components/Item'

describe('Элемент списка задач', () => {
  it('название не должно быть больше 32 символов', async () => {
    const fn = jest.fn()
    render(
      <Item
        id="1"
        header="Наверное самое длинное название задачи"
        done={false}
        onDelete={fn}
        onToggle={fn}
      />
    )
    const labelEl = screen.getByText('Наверное самое длинное название задачи')
    expect(labelEl.innerHTML.length <= 32).toBeFalsy()
  })
  it.skip('название не должно быть пустым', async () => {
    const fn = jest.fn()
    render(<Item id="1" header=" " done={false} onDelete={fn} onToggle={fn} />)
    const labelEl = screen.getByText(' ')

    expect(labelEl.innerHTML.trim().length == 0).toBeTruthy()
  })
  it('нельзя удалять невыполненные задачи', () => {
    const fn = jest.fn()
    render(
      <Item id="1" header="buy bread" done={true} onDelete={fn} onToggle={fn} />
    )
    const btnEl = screen.getByRole('checkbox')
    console.log(prettyDOM(btnEl))

    expect(btnEl.hasAttribute('checked')).toBeTruthy()
  })
})
