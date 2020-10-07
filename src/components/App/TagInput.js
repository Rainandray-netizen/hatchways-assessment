import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/styles'

const TagInput = ({handleSubmit}) => {
  const useStyles = makeStyles({
    root:{
      width:'300px',
      margin: '0px 0px 20px 30px',
      color: 'black',
      fontFamily: 'Raleway, sans-serif',
      "& .MuiInput-underline:after":{
        borderBottom: '2px solid black'
      },
      '& .MuiInputBase-root':{
        fontFamily: 'Raleway, sans-serif'
      }
    }
  })
  const styles = useStyles()
  const [tag, updateTag] = useState()

  const handleChange = (e) => {
    updateTag(e.target.value)
  }

  const handleKeyPress = (e) => {
    e = window.event
    if(e.keyCode === 13){
      handleSubmit(tag)
      e.target.value = ""
    }
  }

  return (
    <TextField 
      className='add-tag-input' 
      classes={{root: styles.root}}
      placeholder='Add a tag'
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  )
}

export default TagInput