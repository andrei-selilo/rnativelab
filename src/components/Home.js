import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Home extends React.Component {

    state = {};

    constructor() {
        super();
        this.labs = [
            { name: 'Lab 1', key: 'lab1' },
            { name: 'Lab 2', key: 'lab2' },
            { name: 'Lab 3', key: 'lab3' },
            { name: 'Lab 4', key: 'lab4' },
            //{ name: 'Lab 5', key: 'lab5' }
        ];
    }
    
    render(){
        return (
            <View>
                <Text style={styles.title}>
                    Choose lab:
                </Text>
                <View style={styles.labMenu}>
                {
                    this.labs.map((element) => 
                        <TouchableOpacity key={element.key}
                            onPress={() => {
                                Actions[element.key]()
                            }}
                        >
                        <Text style={styles.buttonText}>
                            {element.name}
                        </Text>
                        </TouchableOpacity>
                    )
                }
                </View>
            </View>
        )
    }
}

Home.defaultProps = {
    name: 'name',
}

// Home.propTypes = {
//     name: React.PropTypes.string,
// }

var styles = StyleSheet.create({
    title: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20,
    },
    labMenu: {
        marginTop: 20
    },
    nameInput: {
        padding: 5,
        height: 40,
        borderWidth: 0.3,
        borderColor: 'grey',
        margin: 20
    },
    buttonText: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        fontSize: 20,
        padding: 5,
        borderWidth: 0.3,
        borderColor: 'grey'
    }
})

export default Home;