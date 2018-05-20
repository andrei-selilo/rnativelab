import React from 'react';
import {View, Text} from 'react-native';

/*
    Задание 3. «QR-считыватель/ генератор»
    Требуется разработать приложение с графическим интерфейсом
    генерирующее на основе введенного текста QR-code и поддерживающее
    считывание кода как латиницы так и русского языка. В случае считывателя,
    содержимое, если является ссылкой или текстом можно или открыть в
    браузере или скопировать.
*/

class Lab3 extends React.Component {
    render(){
        return (
            <View>
                <Text>
                    Hello Lab3
                </Text>
            </View>
        )
    }
}

export default Lab3;