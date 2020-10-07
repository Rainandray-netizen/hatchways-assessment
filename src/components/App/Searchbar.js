import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root:{
    width:'98%',
    margin: 10,
    color: 'black',
    '& .MuiInput-underline:after':{
      borderBottom: '2px solid black'
    },
    '& .MuiInputBase-root':{
      fontFamily: 'Raleway, sans-serif',
      fontSize: 24
    }
  }
})

const Searchbar = ({handleChange, message}) => {
  const styles = useStyles()

  return (
    <TextField 
      onChange={handleChange}
      classes={{root: styles.root}}
      placeholder={message}
    />
  )
}

export default Searchbar