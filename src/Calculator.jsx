import { useState } from 'react'
import './Calculator.css'

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const handleNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const handleOperator = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  return (
    <div className="calculator">
      <h1>My Cool Calc</h1>
      <div className="calculator-body">
        <div className="display">
          {display}
        </div>
        
        <div className="buttons">
          <button className="btn btn-clear" onClick={handleClear}>C</button>
          <button className="btn btn-operator" onClick={() => handleOperator('/')} >÷</button>
          <button className="btn btn-operator" onClick={() => handleOperator('*')} >×</button>
          <button className="btn btn-operator" onClick={() => handleOperator('-')} >−</button>
          
          <button className="btn btn-number" onClick={() => handleNumber(7)}>7</button>
          <button className="btn btn-number" onClick={() => handleNumber(8)}>8</button>
          <button className="btn btn-number" onClick={() => handleNumber(9)}>9</button>
          <button className="btn btn-operator btn-plus" onClick={() => handleOperator('+')} rowSpan="2">+</button>
          
          <button className="btn btn-number" onClick={() => handleNumber(4)}>4</button>
          <button className="btn btn-number" onClick={() => handleNumber(5)}>5</button>
          <button className="btn btn-number" onClick={() => handleNumber(6)}>6</button>
          
          <button className="btn btn-number" onClick={() => handleNumber(1)}>1</button>
          <button className="btn btn-number" onClick={() => handleNumber(2)}>2</button>
          <button className="btn btn-number" onClick={() => handleNumber(3)}>3</button>
          <button className="btn btn-equals" onClick={handleEquals} rowSpan="2">=</button>
          
          <button className="btn btn-number btn-zero" onClick={() => handleNumber(0)}>0</button>
          <button className="btn btn-number" onClick={handleDecimal}>.</button>
        </div>
      </div>
    </div>
  )
}

export default Calculator