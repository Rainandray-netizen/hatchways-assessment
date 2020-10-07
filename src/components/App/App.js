import React, {useState} from 'react'
import Searchbar from './Searchbar'
import StudentCard from './StudentCard'

const App = () => {
  const [ data, updateData ] = useState()
  const [ filteredData, updateFilteredData] = useState()
  const [ term, setTerm] = useState('')
  const [ tagsTerm, setTagsTerm ] = useState('')
  const [ initialFilter, updateInitialFilter ] = useState(true)
  //a somewhat stateful way to trigger the filtering only after the term has been updated, preventing janky search issues

  const handleChange = (event) => {
    setTerm(event.target.value)
    updateInitialFilter(false)
  }

  const updateTags = (index, newTag) =>{
    const tempData = data
    tempData.students[index].tags.push(newTag)
    updateData(tempData)
    updateFilteredData(tempData)
    updateInitialFilter(false)
    return
  }

  const tagsHandleChange = (event) => {
    setTagsTerm(event.target.value)
    updateInitialFilter(false)
  }

  const getData = async () => {
    const apiRaw = await fetch('https://api.hatchways.io/assessment/students')
    const apiJson = await apiRaw.json()
    //add in placeholder for tags
    const studentsWithTags = apiJson.students.map((student)=>{
      const tempStudent = student
      tempStudent.tags = []
      return tempStudent
    })
    updateData({students: studentsWithTags})
    return
  }

  const filterSearch = (term, tagsTerm) => {
    let tempFiltered = data.students

    //name search filter
    if(term){
      tempFiltered = tempFiltered.filter((student) => {
        let studentName = `${student.firstName} ${student.lastName}`
        return studentName.toLowerCase().includes(term.toLowerCase())
      })
    }
    
    //tags search filter
    if(tagsTerm){
      tempFiltered = tempFiltered.filter((student) => {
        let stringTags = student.tags.toString()
        return stringTags.toLowerCase().includes(tagsTerm.toLowerCase())
      })
    }

    updateFilteredData({students: tempFiltered})
  }

  if(!initialFilter){
    filterSearch(term, tagsTerm)
    updateInitialFilter(true)
  }

  if(!data){
    getData()
  }
  

  if(!filteredData){
    data && updateFilteredData(data)
  }
  

  if(!filteredData){
    return(
      <div>
        Loading...
      </div>
    )
  }

  return(
    <main className='centerbox-container'>
      <div className='centerbox-intermediary'>
        <Searchbar message={'Search by name'} handleChange={handleChange}/>
        <Searchbar message={'Search by tag'} handleChange={tagsHandleChange}/>
        <div className='centerbox'>
          {filteredData.students && filteredData.students.map((student, index)=>{
            return(
              <StudentCard 
                key={student.id}
                student={student}
                index={index}
                updateTags={updateTags}
              />  
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default App