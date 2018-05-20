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
    state = {
        Name: '',
        Description: ''
    };

    async componentDidMount() {
        await this.setState({
            Name: this.props.Name || '', 
            Description: this.props.Description || ''
        });
    }

    async createNote(value){
        try {
            const keys = await AsyncStorage.getAllKeys();
            const id = (+keys.filter(key => key.slice(1, 6) === 'Notes').sort()[keys.length - 1].slice(7) + 1);
            await AsyncStorage.setItem('@Notes:' + id, JSON.stringify(value) , () => {
                Actions.pop();
            });
        } catch (error) {
            // Error saving data
        }
    }

    async updateNote(id, value){
        console.log(id);
        try {
            await AsyncStorage.mergeItem(id, JSON.stringify(value), () => {
                Actions.pop();
            });
        }
        catch (error) {
            // Error saving data
        }
    }

    render() {
        console.log(this.props);
        return (
            <View style={styles.noteEditForm}>
                <TextInput style={styles.input} placeholder='Name' 
                    onChangeText={(text) => this.setState({Name: text})}
                />
                <TextInput style={styles.input} placeholder='Description'
                    onChangeText={(text) => this.setState({Description: text})}
                />
                <TouchableOpacity key={this.props.Id || 'key'} 
                    onPress={()=>{
                        if (this.props.Type === 'Add') {
                            this.createNote({Name: this.state.Name, Description: this.state.Description});
                        } else {
                            this.updateNote(this.props.Id, {Name: this.state.Name, Description: this.state.Description});
                        }
                    }}>
                    <Text style={styles.buttonText}> 
                        { this.props.Type === 'Add' ? 'Create' : 'Update' }
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