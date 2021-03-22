import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, FlatList, StyleSheet} from 'react-native'
import Constants from "./helpers/constants";
import ListCard from "./components/ListCard";
import {Header} from "react-native-elements";

const axios = require('axios')

export const Menu = () => {
    const [menu, setMenu] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        axios.get(`${Constants.BASE_URL}/api/menus`).then(res => {
            setMenu(res.data.data)
        })
    }, [])

    const renderFood = ({item}) => {
        return <ListCard item={item}/>;
    };

    return (
        <View style={{flex: 1}}>
            <Header
                centerComponent={{ text: 'MENU', style: { color: '#fff' } }}
            />
            <View style={{...styles.wrapper}}>
                <View style={styles.topWrapper}>
                    <View style={styles.textInputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={() => {

                            }}
                            value={query}
                            placeholder={'What are you craving for?'}
                        />
                    </View>

                    <View style={styles.buttonWrapper}>
                        <Button
                            onPress={() => {

                            }}
                            title="Go"
                            color="#c53c3c"
                        />
                    </View>
                </View>

                <FlatList
                    data={menu}
                    renderItem={renderFood}
                    contentContainerStyle={styles.list}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerButtonContainer: {
        marginRight: 10,
    },
    wrapper: {
        flex: 1,
        padding: 10,
    },
    topWrapper: {
        flexDirection: 'row',
    },
    textInputWrapper: {
        flex: 4,
    },
    textInput: {
        height: 35,
        borderColor: '#5d5d5d',
        borderWidth: 1,
    },
    buttonWrapper: {
        flex: 1,
    },
    list: {
        marginTop: 20,
    },
});