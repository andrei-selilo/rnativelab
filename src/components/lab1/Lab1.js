import React from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
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
            const keys = await AsyncStorage.getAllKeys();
            return await AsyncStorage.multiGet(keys.filter(key => key.slice(1, 6) === 'Notes'));
        } catch (error) {
            return [];
        }
    }

    updateState(state = {}){
        this.setState(state);
        this.sortNotes();
    }

    debounceEvent = (callback, time = 250, interval) => (...args) =>
        clearTimeout(interval, interval = setTimeout(() => callback(...args), time));

    sortNotes(filter = this.state.Filter) {
        if (filter.text.length < 2 || !this.state.Notes)
            return;

        const notes = this.state.Notes.map((note, index) => { 
            const value = JSON.parse(note[1]);
            note[2] = value.Name.toLowerCase().includes(filter.text.toLowerCase());
            return note; 
        });
        
        this.setState({ Notes: notes, Filter: filter });
    }

    async componentDidMount() {
        const notes = await this.getNotes();
        // notes[2] == true - then show, else hide
        this.setState({Notes: notes});
    }


    render(){
        return (
            <View>
            <View>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    onChangeText={(text) => this.debounceEvent(this.sortNotes({text}), 500)}
                />
            </View>
            <ScrollView style={{height: '80%'}}>
            {   
                this.state.Notes ? (
                    this.state.Notes.map(note => {
                        value = JSON.parse(note[1]);
                        return note[2] !== false && (
                            <Note 
                                key={note[0]} 
                                id={note[0]} 
                                name={value.Name} 
                                description={value.Description} 
                                notes={this.state.Notes}
                                lab1UpdateState={this.updateState.bind(this)}
                            />)
                    })
                ) : (
                    <Text>No data</Text>
                ) 
            }
            </ScrollView>
            <View>
                <TouchableOpacity style={styles.createNoteForm}
                    onPress={() => {
                        // Need to pass action type 'Add'
                        Actions['lab1/editNote']({
                            Type: 'Add',
                            notes: this.state.Notes,
                            lab1UpdateState: this.updateState.bind(this),
                        })
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
        borderStyle: 'dashed',
        backgroundColor: "#66ff99",
    } 
})

export default Lab1;