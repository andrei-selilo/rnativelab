import React, { Component } from 'react';
import { Platform } from 'react-native';

import { Router, Scene } from 'react-native-router-flux'

import Home from "./components/Home";
import Lab1 from "./components/lab1/Lab1";
import Lab1NoteEditForm from "./components/lab1/NoteEditForm";
import Lab2 from "./components/lab2/Lab2";
import Lab3 from "./components/lab3/Lab3";
import Lab4 from "./components/lab4/Lab4";
import Lab5 from "./components/lab5/Lab5";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Scene key='root'>
                    <Scene key='home' component={Home} title='Home' />

                    <Scene key='lab1' component={Lab1} title='Lab 1 / Home' /> 
                    <Scene key='lab1/home' component={Lab1} title='Lab 1 / Home' /> 
                    <Scene key='lab1/editNote' component={Lab1NoteEditForm} title='Lab 1 / Note' /> 

                    <Scene key='lab2' component={Lab2} title='Lab 2' />
                    <Scene key='lab3' component={Lab3} title='Lab 3' />
                    <Scene key='lab4' component={Lab4} title='Lab 4' />
                    <Scene key='lab5' component={Lab5} title='Lab 5' />
                </Scene>
            </Router>
        );
    }
}

export default App;