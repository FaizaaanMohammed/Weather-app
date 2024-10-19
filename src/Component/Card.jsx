import { Box, Grid } from '@mui/material'
import React from 'react'

const Card = ({heading,value}) => {
  return (
    <>
    <Grid item>
      <Box>
        <h1>{heading}</h1>
        <h1>{value}</h1>
      </Box>
    </Grid>
    </>
  )
}

export default Card
