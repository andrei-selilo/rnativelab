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

class NoteEditForm extends React.Component {
    async createNote(key, value){
        try {
            await AsyncStorage.setItem('@Notes:' + key, value , () => {
                Actions.Lab1({});
            });
        } catch (error) {
            // Error saving data
        }
    }

    async updateNote(key, value){
        try {
            await AsyncStorage.mergeItem('@Notes:' + key, JSON.stringify(value), () => {
                Actions.Lab1({});
            });
        }
        catch (error) {
            // Error saving data
        }
    }

    render() {
        console.log("Edit props::", this.props);
        return (
            <View style={styles.noteEditForm}>
                <TextInput style={styles.input} placeholder='Name'/>
                <TextInput style={styles.input} placeholder='Description'/>
                <TouchableOpacity key='tmpkey' onPress={()=>{}}>
                    <Text style={styles.buttonText} onPress={()=>{}}> 
                        Create / Update
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    noteEditForm: {
        marginTop: 20,
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

export default NoteEditForm;