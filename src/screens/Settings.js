import React, { Component } from 'react';
import { View, StatusBar, Text, TextInput, StyleSheet, Switch, ScrollView } from 'react-native';
import Button from '../components/Button';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: '',
            player2: '',
            matchTo: '',
            games: false,
            gameTo: '',
            differenceInGame: '1'
        }
    }



    nextPage = () => {
        // debugger
        let scoreboardInfo = {
            player1,
            player2,
            matchTo,
            games,
            gameTo,
            differenceInGame
        } = this.state;
        let errorMessage = '';
        if (!player1 || !player2 || !matchTo || (this.state.games && (!gameTo || !differenceInGame))) {
            errorMessage += 'Fill the field(s)!';
        }
        if (parseInt(matchTo) > 50) {
            errorMessage += '\nMaximum "Match To" is 50!'
        }
        if (parseInt(gameTo) > 1000) {
            errorMessage += '\nMaximum "Games To" is 1000!'
        }
        else if ((parseInt(gameTo) < parseInt(differenceInGame))) {
            errorMessage += '\n"Difference To Win A Game" can not be more than "Games To"!'
        }

        if (!errorMessage) {
            this.props.navigation.navigate('ScoreboardScreen', { scoreboardInfo });
        }
        else {
            alert(errorMessage);
        }
    }

    handlePlayer1 = value => {
        this.setState({
            player1: value
        });
    }

    handlePlayer2 = value => {
        this.setState({
            player2: value
        });
    }

    handleMatchTo = value => {
        if (value.charAt(0) === '0') {
            value = '';
        }
        switch (value.charAt(value.length - 1)) {
            case '':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                this.setState({
                    matchTo: value
                });
                break;
        }
    }

    handleGameTo = value => {
        this.setState({
            gameTo: value
        });
    }

    handleDifferenceInGame = value => {
        this.setState({
            differenceInGame: value
        });
    }

    render() {
        return (
            <ScrollView keyboardShouldPersistTaps={'handled'} style={{ display: 'flex', flex: 1, backgroundColor: 'rgb(64, 64, 64)' }}>
                <StatusBar translucent={true} backgroundColor={'rgba(0, 0, 0, 0.4)'} />
                <View style={{ top: 30 }}>
                    <View style={styles.containerStyle}>
                        <View style={{ flex: 1, alignItems: 'flex-end', right: 15, top: 10 }}>
                            <Text style={styles.textStyle}>Player 1:</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-start', left: 15 }}>
                            <TextInput
                                value={this.state.player1}
                                onChangeText={this.handlePlayer1}
                                style={styles.textInputStyle}
                                autoCorrect={false}
                                underlineColorAndroid={'white'}
                            />
                        </View>
                    </View>
                    <View style={styles.containerStyle}>
                        <View style={{ flex: 1, alignItems: 'flex-end', right: 15, top: 10 }}>
                            <Text style={styles.textStyle}>Player 2:</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-start', left: 15 }}>
                            <TextInput
                                value={this.state.player2}
                                onChangeText={this.handlePlayer2}
                                style={styles.textInputStyle}
                                autoCorrect={false}
                                underlineColorAndroid={'white'}
                            />
                        </View>
                    </View>
                    <View style={styles.containerStyle}>
                        <View style={{ flex: 1, alignItems: 'flex-end', right: 15, top: 10 }}>
                            <Text style={styles.textStyle}>Match To:</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-start', left: 15 }}>
                            <TextInput
                                value={this.state.matchTo}
                                onChangeText={this.handleMatchTo}
                                style={styles.textInputStyle}
                                autoCorrect={false}
                                underlineColorAndroid={'white'}
                                keyboardType='numeric'
                            />
                        </View>
                    </View>
                    <View style={styles.containerStyle}>
                        <View style={{ flex: 1, alignItems: 'flex-end', right: 15, top: 10 }}>
                            <Text style={styles.textStyle}>Games:</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-start', left: 15 }}>
                            <Switch 
                                value={this.state.games}
                                onValueChange={ value => this.setState({ games: value }) }
                                thumbColor={'lightgreen'}
                                style={{ flex: 1, top: 5 }}
                            />
                        </View>
                    </View>
                        {
                            this.state.games ? (
                                <View>
                                    <View style={styles.containerStyle}>
                                        <View style={{ flex: 1, alignItems: 'flex-end', right: 15, top: 10 }}>
                                            <Text style={styles.textStyle}>Games To:</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-start', left: 15 }}>
                                            <TextInput
                                                value={this.state.gameTo}
                                                onChangeText={this.handleGameTo}
                                                style={styles.textInputStyle}
                                                autoCorrect={false}
                                                underlineColorAndroid={'white'}
                                                keyboardType='numeric'
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.containerStyle}>
                                        <View style={{ flex: 1, alignItems: 'flex-end', right: 15, top: 10 }}>
                                            <Text style={styles.textStyle}>Difference To Win A Game:</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-start', left: 15 }}>
                                            <TextInput
                                                value={this.state.differenceInGame}
                                                onChangeText={this.handleDifferenceInGame}
                                                style={styles.textInputStyle}
                                                autoCorrect={false}
                                                underlineColorAndroid={'white'}
                                                keyboardType='numeric'
                                            />
                                        </View>
                                    </View>
                                </View>
                            ) : null
                        }
                    <View style={{ width: 200, height: 100, alignSelf: 'center' }}>
                        <Button
                            buttonText="Let's Go!"
                            onButtonPress={this.nextPage}
                            style={{ alignSelf: 'center', width: 200, height: 40, backgroundColor: 'lightgreen', borderRadius: 10, top: 15 }}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        display: 'flex',
        flexDirection: 'row',
        height: 50
    },
    textStyle: {
        flex: 1,
        // top: 10,
        fontSize: 20,
        color: 'white'
    },
    textInputStyle: {
        flex: 1,
        fontSize: 20,
        color: 'white',
        width: '50%'
    }
});

export default Settings;