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
    deleteNote(key) {
        console.log('::: deleteNote');
    }

    openNoteEditForm(key){
        console.log('::: openNoteEditForm');
        Actions['lab1/editNote']({});
    }

    render() {
        return (
            <View style={styles.noteForm}>
                <TouchableOpacity onPress={() => {this.openNoteEditForm(this.props.key);}}>
                    <Text>{this.props.name || 'name'}</Text>
                    <Text>{this.props.description || 'descrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescrdescr'}</Text>
                    <TouchableOpacity onPress={() => {this.deleteNote(this.props.key)}} style={{width: 45}}>
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
    title: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20,
    },
    noteForm: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        padding: 5,
        borderWidth: 0.3,
        borderColor: 'grey'
    },
    input: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        fontSize: 20,
        padding: 5,
        borderWidth: 0.3,
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