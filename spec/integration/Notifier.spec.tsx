import { prettyDOM, render, screen } from '@testing-library/react'
import { Notifier } from 'src/components/Notifier'

describe('Оповещение при вополнении задачи', () => {
  it('появляется и содержит заголовок задачи', () => {
    const fn = jest.fn()

    render(<Notifier open={true} task="Любая задача" onClose={fn} />)
    jest.runAllTimers()
    expect(fn).toBeCalled()

    const notifierTextEl = screen.getByTestId('notifier')
    // console.log(prettyDOM(notifierTextEl))
    expect(notifierTextEl.innerHTML).toBe('Любая задача')
  })
  it('одновременно может отображаться только одно', () => {
    const fn = jest.fn()

    render(<Notifier open={true} task="Любая" onClose={fn} />)
    jest.runOnlyPendingTimers()
    expect(fn).toBeCalledTimes(1)
  })
})
