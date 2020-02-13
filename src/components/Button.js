import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = (props) => {
    console.log(props);
    return (
        <TouchableOpacity onPress={props.onButtonPress} style={[styles.buttonStyle, props.style]} disabled={props.disabled} >
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{props.buttonText}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: 'gray',
        opacity: 0.5,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Button;