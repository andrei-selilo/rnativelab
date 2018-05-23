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
            Id: this.props.noteId || null,
            Name: this.props.noteName || '', 
            Description: this.props.noteDescription || ''
        });
    }

    async createNote(value){
        try {
            const valueStr = JSON.stringify(value);

            // Generate new key
            const keys = await AsyncStorage.getAllKeys();
            const id = (+keys.filter(key => key.slice(1, 6) === 'Notes').sort()[keys.length - 1].slice(7) + 1);
            // Insert into local DB
            await AsyncStorage.setItem('@Notes:' + id, valueStr);
            // Update Lab1 component's state
            this.props.notes.push(['@Notes:' + id, valueStr]);
            this.props.lab1UpdateState({Notes: this.props.notes});

            Actions.pop();
        } catch (error) {
            console.log("createNote error : ", error.message || error);
        }
    }

    async updateNote(id, value){
        try {
            const valueStr = JSON.stringify(value);
            const notesUpdatedIndex = this.props.notes.findIndex(element => {
                return element[0] === id;
            });

            // Update local DB
            await AsyncStorage.mergeItem(id, valueStr);
            // Update Lab1 component's state
            this.props.notes[notesUpdatedIndex] = [id, valueStr];
            this.props.lab1UpdateState({Notes: this.props.notes});

            Actions.pop();
        }
        catch (error) {
            console.log(error.message);
        }
    }

    render() {
        console.log(this.props);
        return (
            <View style={styles.noteEditForm}>
                <TextInput 
                    style={styles.input} 
                    placeholder='Name' 
                    value={this.props.noteName}
                    onChangeText={(text) => this.setState({Name: text})}
                />
                <TextInput 
                    style={[styles.input, {height: "70%"}]} 
                    editable = {true}
                    multiline = {true}
                    placeholder='Description'
                    value={this.props.noteDescription}
                    onChangeText={(text) => this.setState({Description: text})}
                />
                <TouchableOpacity 
                    style={styles.updateButton}
                    key={this.props.Id || 'key'} 
                    onPress={()=>{
                        if (this.props.Type === 'Add') {
                            this.createNote({Name: this.state.Name, Description: this.state.Description});
                        } else {
                            this.updateNote(this.state.Id, {Name: this.state.Name, Description: this.state.Description});
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
    updateButton: {
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
        color: "white",
    }
})

export default NoteEditForm;