import React from 'react'
import { Button } from 'react-bootstrap'

export default function Banner(props) {
  function openWin() {
    window.open("https://www.internet.org");
  }
  return (
    <div>
        <div className='Banner' style={{ backgroundImage:`url(${props.Image})` }}>
            <h1>{props.Heading}</h1>
            <h2>{props.SubHeading}</h2>
            <p>{props.Description}</p>
            <Button onClick={openWin} style={{ backgroundColor: props.Color }} >{props.Button}</Button>
        </div>
    </div>
  )
}
