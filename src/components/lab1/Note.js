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
    deleteNote(id) {
        
    }

    openNoteEditForm(id){
        Actions['lab1/editNote']({Id: id});
    }

    render() {
        console.log(this.props);
        return (
            <View style={styles.noteForm}>
                <TouchableOpacity onPress={() => {this.openNoteEditForm(this.props.id);}}>
                    <Text>{this.props.name || 'No name'}</Text>
                    <Text>{this.props.description || 'No description'}</Text>
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