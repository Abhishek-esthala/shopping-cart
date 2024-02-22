import React from 'react'

export default function Hero(props) {
  return (
    <div>
        <div>
          <img src={props.image} alt=''/>
          <h3>{props.name}</h3>
    </div>
    </div>
  )
}
