import type React from 'react'

function PreventSubmit(el: React.FormEvent<HTMLFormElement>) {
  el.preventDefault()
}

export default PreventSubmit
