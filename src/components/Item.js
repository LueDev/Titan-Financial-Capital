import React from 'react'
import { Paper} from '@mui/material'



function Item({item}) {

  return (
    <Paper>
      <img src={item.image} alt={item.title}/>
      <h2>{item.title}</h2>
    </Paper>
  )
}

export default Item
