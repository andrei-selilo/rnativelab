import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import * as rssParser from 'react-native-rss-parser';
//import localRss from './local.rss';

/*
    Задание 2. «Rss-reader»
    Требуется разработать приложение с графическим
    интерфейсомподдерживающее просмотр любой rss-ленты. Необходимо
    реализовать парсинг xml и отображение списка новостей и так же детальное
    отображение новости используя UIWebView(то есть открываться страница
    будет в приложении, а не браузере)
    Можно загружать новостную ленту как из файла так и из интернета.
*/

class Lab2 extends React.Component {
    state = {};

    async componentDidMount() {
        try {
            await fetch('https://www.nasa.gov/rss/dyn/breaking_news.rss')
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
              this.setState({RSS: rss});
            });
        } 
        catch (error) {
            console.log("componentDidMount : " + error.message || error);
        }
    }

    render(){
        return (
            <View>
                <ScrollView style={{height: '100%'}}>
                {
                    this.state.RSS && this.state.RSS.items &&
                        this.state.RSS.items.map((element) => {
                            return (
                                <View style={styles.itemForm}>
                                    <Text style={{fontWeight: 'bold', marginBottom: 5}}>{element.title}</Text>
                                    <Text>{element.description}</Text>
                                    <Text style={{fontStyle: 'italic', marginTop: 5}}>{element.published}</Text>
                                </View>
                            )
                        })
                }
                </ScrollView>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    itemForm: {
        padding: 10,
        margin: 10,
    },
});

export default Lab2;