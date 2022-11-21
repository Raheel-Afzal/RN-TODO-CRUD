import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'

const NewComponent = () => {

   
  
  const [name,setName]=useState("Enter Name")
  function handleEdit (text){
    
    setName(text)
  }
  return (
    <View>        
      <TextInput  value={name} onChangeText={(text)=>handleEdit(text)} />  
     
        
    </View>
  )
}

export default NewComponent

