import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

/*
    Задание 1. «Записная книжка»
    Требуется разработать приложение с графическим пользовательским
    интерфейсом, поддерживающее создание/редактирование/удаление/поиск
    заметок.
    Два варианта хранения заметок:
    А) В базе SQLite.
    Б) С использованием файловой системы.
*/

class Note extends React.Component {
    async deleteNote(id) {
        await AsyncStorage.removeItem(id);
        
        const notesIndex = this.props.notes.findIndex(element => {
            return element[0] === id;
        });
        this.props.notes.splice(notesIndex, 1);
        this.props.lab1UpdateState({Notes: this.props.notes});
    }

    openNoteEditForm(id){
        Actions['lab1/editNote']({
            noteId: id, 
            noteName: this.props.name,
            noteDescription: this.props.description,
            notes: this.props.notes, 
            lab1UpdateState: this.props.lab1UpdateState
        });
    }

    render() {
        return (
            <View style={styles.noteForm}>
                <TouchableOpacity onPress={() => {this.openNoteEditForm(this.props.id);}}>
                    <Text>{this.props.name}</Text>
                    <Text>{this.props.description}</Text>
                    <TouchableOpacity onPress={() => {this.deleteNote(this.props.id)}} style={{width: 45}}>
                        <Text style={[styles.deleteButton]}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    noteForm: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
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
    }
})

export default Note;