import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

const Counter = () => {
  const [count, setCount] = useState(0);

  //  function Increament(){
  //         setCount(count+1);
  //  }

  //    function Greeting (){
  //     console.log("Hello ");
  //    }

  //   const Greeting2 =function(){
  //     console.log("hello World");

  //    }
  //    const Greeting3 =()=>{
  //     console.log("hello to all World");

  //    }
  //    const Greeting4 =()=>console.log("Single Line Arrow Funtion")
 
  













  //   let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //   let newArray = [];

  //    for(let i=0;i<array.length;i++){
  //     newArray.push(array[i]*2);
  //    }

  //map funtion

  //   const thirdArray = array.map(item => {
  //     return item;
  //   });

  //   console.log('old array', array);
  //   console.log('new Array', newArray);
  // console.log('third Array', thirdArray);
  return (
    <View>
      <TouchableOpacity>
        <Text>Count: {count}</Text>
      </TouchableOpacity>

      <Button
        title="Increament"
        onPress={() => {
          setCount(count + 1);
        }}
      />

      <View style={myStyles.AppContainer}>
        <TouchableOpacity onPress={()=>{setCount(count-1)}}>
          <View style={myStyles.Decrement}>
            <Text style={myStyles.buttonText}>Decrement</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Counter;
const myStyles = StyleSheet.create({
  AppContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Block1: {
    backgroundColor: 'red',
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  Block2: {
    backgroundColor: 'green',
    height: 150,
    width: 150,
  },
  Block3: {
    backgroundColor: 'purple',
    height: 150,
    width: 150,
  },
  TextStyle: {
    color: 'white',
  },
  Decrement: {
    backgroundColor: '#f14c4c',
    height: 45,
    width: 120,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    //boxModel
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
