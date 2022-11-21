import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
// import NewComponent from './Components/NewComponent'
// import Counter from './Components/Counter'
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'TODO_DataBase'});
const App = () => {
  const [id, setId] = useState('');
  const [todoName, setTodoName] = useState('');
  const [data, setData] = useState([]);
  const [toggleButton, setToggleButton] = useState('Add to list');

  useEffect(() => {
    CreateTable();
    fetchTodo();
  }, []);

  const CreateTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        `create Table if not Exists Tasks (id INTEGER PRIMARY KEY AUTOINCREMENT,taskName varchar(200))`,
      );
    });
  };

  const AddTodo = () => {
    db.transaction(txn => {
      txn.executeSql(`insert into  Tasks (taskName) values(?) `, [todoName]);
    });
    fetchTodo();
    setTodoName('');
  };

  const fetchTodo = () => {
    db.transaction(txt => {
      txt.executeSql(`select * from Tasks`, [], (sqltxn, res) => {
        let resultSet = [];
        for (let i = 0; i < res.rows.length; i++) {
          let record = res.rows.item(i);
          resultSet.push({
            id: record.id,
            taskName: record.taskName,
          });
        }
        setData(resultSet);
      });
    });
  };

  const deleteTodo = id => {
    db.transaction(txt => {
      txt.executeSql(`delete from Tasks where id=?`, [id]);
    });
    fetchTodo();
  };

  const UpdateTodo = () => {
    db.transaction(txt => {
      txt.executeSql(`update  Tasks set taskName=? where id=?`, [todoName, id]);
    });
    fetchTodo();
    setTodoName('');
    setToggleButton('Add to list');

  };

  const UpdateUser = (id, taskName) => {
    setId(id);
    setTodoName(taskName);
    setToggleButton('Update')
  };

  const HandleButton = () => {
    if (toggleButton === 'Add to list') {
      AddTodo();
    }
    if (toggleButton === 'Update') {
      UpdateTodo();
    }
  };
  return (
    <View>
      {/* <NewComponent/>
      <Counter/> */}
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>TODO List</Text>
      </View>
      <View style={styles.Body}>
        <View style={styles.InputView}>
          <TextInput
            style={styles.Input}
            value={todoName}
            onChangeText={text => {
              setTodoName(text);
            }}
            placeholder="Enter Todo"
          />
          <TouchableOpacity
            onPress={() => {
              HandleButton();
            }}>
            <View style={styles.AddButton}>
              <Text style={styles.ButtonText}>{toggleButton}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          renderItem={({item}) => (
            <View style={styles.Card}>
              <View style={styles.cardText}>
                <Text>◼ {item.taskName}</Text>
              </View>
              <View style={styles.Buttons}>
                <TouchableOpacity
                  onPress={() => {
                    deleteTodo(item.id);
                  }}>
                  <Text>❌</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    UpdateUser(item.id, item.taskName);
                  }}>
                  <Text>🖋</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  AppContainer: {},
  Header: {
    backgroundColor: '#173e86',
  },
  HeaderText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    paddingVertical: 10,
  },
  Body: {
    margin: 20,
  },
  InputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  Input: {
    backgroundColor: '#eeeeee',
    marginRight: 10,
    borderColor: '#173e86',
    borderWidth: 1,
    borderRadius: 20,
    width: '70%',
    height: '80%',
    paddingLeft: 10,
  },
  AddButton: {
    height: 40,
    width: 100,
    backgroundColor: '#ffca28',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    fontSize: 16,
    color: '#173e85',
    fontWeight: 'bold',
  },

  Card: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  cardText: {
    flex: 3,
  },
  Buttons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
});
