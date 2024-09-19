import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addSearchToken } from 'src/store/searchSlice'

import { headerFieldOptions, validateHeaderMax } from 'src/utils/helpers'
// import './style.css'

export const Search = () => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addSearchToken(search))
  }, [search])

  const hintValue = useMemo(
    () => (validateHeaderMax(search) ? '' : headerFieldOptions.message),
    [search]
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  return (
    <div className="seach-field-wrapper">
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="search"
      />
      <span data-testid="input-hint-text" className="input-field-hint">
        {hintValue}
      </span>
    </div>
  )
}
