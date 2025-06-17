import CheckInputs from './inputs.tsx'

function App() {
  function preventSubmit(el) {
    el.preventDefault()
  }

  return (
    <>
      <form className="form" onSubmit={preventSubmit}>
        <CheckInputs></CheckInputs>
      </form>
    </>
  )
}

export default App
