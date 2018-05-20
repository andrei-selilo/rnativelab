import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Note from "./Note";
import NoteEditForm from "./NoteEditForm";

/*
    Задание 1. «Записная книжка»
    Требуется разработать приложение с графическим пользовательским
    интерфейсом, поддерживающее создание/редактирование/удаление/поиск
    заметок.
    Два варианта хранения заметок:
    А) В базе SQLite.
    Б) С использованием файловой системы.
*/

class Lab1 extends React.Component {
    state = {};

    async getNotes(){
        try {
            const keys = await AsyncStorage.getAllKeys()
            return await AsyncStorage.multiGet(keys.filter(key => key.slice(1, 6) === 'Notes'));
        } catch (error) {
            return [];
        }
    }

    async componentDidMount() {
        const notes = await this.getNotes();
        await this.setState({Notes: notes});
    }

    render(){
        return (
            <View>
            <View>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    onChangeText={(text) => this.setState({text})}
                />
            </View>
            {   
                this.state.Notes ? (
                    this.state.Notes.map(note => {
                        value = JSON.parse(note[1]);
                        return (<Note key={note[0]} id={note[0]} name={value.Name} description={value.Description} />)
                    })
                ) : (
                    <Text>No data</Text>
                ) 
            }
            <View>
                <TouchableOpacity style={styles.createNoteForm}
                    onPress={() => {
                        // Need to pass action type 'Add'
                        Actions['lab1/editNote']({Type: 'Add'})
                    }}>
                    <Text>Add note</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    title: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20,
    },
    searchInput: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 15,
        padding: 5,
        borderWidth: 0.3,
        borderRadius: 5,
        borderColor: 'grey'
    },
    buttonText: {
        marginLeft: 20,
        fontSize: 20
    },
    deleteButton: {
        marginTop: 10,
        width: 45,
        color: 'red'
    },
    createNoteForm: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        padding: 5, 
        marginTop: 10,
        borderWidth: 0.3,
        borderColor: 'grey',
        borderRadius: 10,
        borderStyle: 'dashed'
    } 
})

export default Lab1;