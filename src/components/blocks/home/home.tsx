import React, { useRef, useState } from 'react'
import PreventSubmit from '../../functions/utils.tsx'
import CopyMessage from '../message/message.tsx'

export default function HomeWindow() {
  const firstInput = useRef(null)
  const secondInput = useRef(null)
  const submitButton = useRef(null)
  const resultContainer = useRef(null)
  const resultListFirst = useRef(null)
  const resultListSecond = useRef(null)

  function checkValidation() {
    const lettersTest = /^[ARNDCEQGHILKMFPSTWYV-]+$/
    const firstValue = firstInput.current.value
    const secondValue = secondInput.current.value

    if (
      firstValue.length === secondValue.length &&
      lettersTest.test(firstValue) &&
      lettersTest.test(secondValue)
    ) {
      submitButton.current.disabled = false
    } else {
      submitButton.current.disabled = true
    }
  }

  function submitResults() {
    const yellowLetters = ['C']
    const greenLetters = ['A', 'I', 'L', 'M', 'F', 'W', 'Y', 'V', 'P']
    const greyLetters = ['G']
    const pinkLetters = ['D', 'E']
    const violetLetters = ['K', 'R']
    const blueLetters = ['S', 'T', 'H', 'Q', 'N']

    const firstValue = firstInput.current.value
    const secondValue = secondInput.current.value

    if (resultListFirst.current && resultListSecond.current) {
      resultListFirst.current.innerHTML = ''
      resultListSecond.current.innerHTML = ''
    }

    const firstValueArr = firstValue.split('')
    firstValueArr.forEach(el => {
      const firstValueArrEl = document.createElement('span')

      switch (true) {
        case yellowLetters.includes(el):
          firstValueArrEl.style.backgroundColor = '#FFEA00'
          break

        case greenLetters.includes(el):
          firstValueArrEl.style.backgroundColor = '#67E4A6'
          break

        case greyLetters.includes(el):
          firstValueArrEl.style.backgroundColor = '#C4C4C4'
          break

        case pinkLetters.includes(el):
          firstValueArrEl.style.backgroundColor = '#67E4A6'
          break

        case violetLetters.includes(el):
          firstValueArrEl.style.backgroundColor = '#BB99FF'
          break

        case blueLetters.includes(el):
          firstValueArrEl.style.backgroundColor = '#80BFFF'
          break

        default:
          firstValueArrEl.style.backgroundColor = 'transperrent'
      }

      firstValueArrEl.textContent = el

      resultListFirst.current.appendChild(firstValueArrEl)
    })

    const secondValueArr = secondValue.split('')
    const testSecondArr = []

    for (let i = 0; i < firstValueArr.length; i++) {
      if (firstValueArr[i] !== secondValueArr[i]) {
        testSecondArr.push(i)
      }
    }

    secondValueArr.forEach((el, index) => {
      const secondValueArrEl = document.createElement('span')

      if (!testSecondArr.includes(index)) {
        secondValueArrEl.style.backgroundColor = 'transperrent'
      } else {
        switch (true) {
          case yellowLetters.includes(el):
            secondValueArrEl.style.backgroundColor = '#FFEA00'
            break

          case greenLetters.includes(el):
            secondValueArrEl.style.backgroundColor = '#67E4A6'
            break

          case greyLetters.includes(el):
            secondValueArrEl.style.backgroundColor = '#C4C4C4'
            break

          case pinkLetters.includes(el):
            secondValueArrEl.style.backgroundColor = '#67E4A6'
            break

          case violetLetters.includes(el):
            secondValueArrEl.style.backgroundColor = '#BB99FF'
            break

          case blueLetters.includes(el):
            secondValueArrEl.style.backgroundColor = '#80BFFF'
            break

          default:
            secondValueArrEl.style.backgroundColor = 'transperrent'
        }
      }

      secondValueArrEl.textContent = el

      resultListSecond.current.appendChild(secondValueArrEl)
    })
  }

  const [copyPopup, setCopyPopup] = useState(false)
  let timer
  let longPress = false

  function showCopyMessage() {
    setCopyPopup(true)
  }

  function hideCopyMessage() {
    setCopyPopup(false)
  }

  function copyText() {
    longPress = false
    timer = setTimeout(() => {
      longPress = true
    }, 500)
  }

  function deleteCopyText() {
    clearTimeout(timer)

    if (longPress) {
      document.execCommand('copy')
      showCopyMessage()
      setTimeout(() => {
        hideCopyMessage()
      }, 1000)
    }
  }

  return (
    <>
      <form className="form" onSubmit={PreventSubmit}>
        <div className="form__wrapper">
          {copyPopup && <CopyMessage></CopyMessage>}
          <input
            className="form__input-first"
            type="text"
            required
            ref={firstInput}
            onChange={checkValidation}
            onMouseDown={copyText}
            onMouseUp={deleteCopyText}
          ></input>
          <input
            className="form__input-second"
            type="text"
            required
            ref={secondInput}
            onChange={checkValidation}
            onMouseDown={copyText}
            onMouseUp={deleteCopyText}
          ></input>
          <button
            className="form__input-submit"
            ref={submitButton}
            onClick={submitResults}
            type="submit"
          >
            Submit
          </button>
        </div>
        <div className="form__results" ref={resultContainer}>
          <p>Result:</p>
          <div
            className="form__results-first"
            ref={resultListFirst}
            onMouseDown={copyText}
            onMouseUp={deleteCopyText}
          ></div>
          <div
            className="form__results-second"
            ref={resultListSecond}
            onMouseDown={copyText}
            onMouseUp={deleteCopyText}
          ></div>
        </div>
      </form>
    </>
  )
}
