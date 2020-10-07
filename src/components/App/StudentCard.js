import React, { useState } from 'react'
import FontAwesome from 'react-fontawesome'
import TagInput from './TagInput'

const StudentCard = ({student, updateTags, index}) => {
  const {
    city,
    company,
    email,
    firstName,
    grades,
    lastName,
    pic,
    skill,
    tags
  } = student

  const [expand, toggleExpand] = useState(false)

  const handleClick = () => {
    toggleExpand(!expand)
  }

  const handleSubmit = (newTag) => {
    updateTags(index, newTag)
  }

  //string to integer conversion
  const gradesInt = grades.map((grade)=>parseInt(grade))

  const gradeAvg = gradesInt.reduce((a, b) => a + b, 0)/grades.length
  
  const ExpandList = () => {
    return(
      <>
        <div className='gradelist'>
          {grades.map((grade, index)=>{
            return <p>{`Test ${index+1}: \xa0\xa0\xa0\xa0\xa0\xa0 ${grade}%`}</p>
          })}
        </div>
        <div className='tags-container'>
          { tags.map((tag)=>{
            return <span className='tag'>{tag}</span>
          }) }
        </div>
        <TagInput handleSubmit={handleSubmit}/>
      </>
    )
  }

  return (
    <article>
      <div className='card-container'>
        <div className='card-info'>
          <img src={pic}/>
          <div>
            <h1>{`${firstName} ${lastName}`}</h1>
            <p>Email: {email}</p>
            <p>Company: {company}</p>
            <p>Skill: {skill}</p>
            <p>Average: {gradeAvg}%</p>
            { expand ? <ExpandList /> : ''}
          </div>
        </div>
        <div className='expand-button-container'>
          <FontAwesome name={ expand ? 'minus' : 'plus' } size='2x' style={{ color : 'gray' }} onClick={handleClick}/>
        </div>
      </div>
      <hr></hr>
    </article>
  )
}

export default StudentCard