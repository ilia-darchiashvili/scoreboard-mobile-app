import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { WIDTH, HEIGHT } from '../constants/dimensionConstants';
import Button from './Button';

export const COMPONENT_WIDTH = WIDTH * 46 / 100;
export const COMPONENT_HEIGHT = COMPONENT_WIDTH * 8 / 27;

const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    }
}

const defaultPlayerImagePath = '../images/player.png';
const backgroundImagePath = '../images/background_image.png';

const MAX_POINTS_IN_GAME = 999;

class PlayerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameScorePlayer1: 0,
            gameScorePlayer2: 0,
            matchScorePlayer1: 0,
            matchScorePlayer2: 0,
            avatarPlayer1: null,
            avatarPlayer2: null,
            allDisabled: false,
            winnerMessage: ''
        };
    }

    plus(point, scorePosition) {
        switch (scorePosition) {
            case 'gameScorePlayer1':
                this.setState({
                    gameScorePlayer1: point + 1
                });
                break;
            case 'gameScorePlayer2':
                this.setState({
                    gameScorePlayer2: point + 1
                });
                break;
            case 'matchScorePlayer1':
                this.setState({
                    matchScorePlayer1: point + 1,
                    gameScorePlayer1: 0,
                    gameScorePlayer2: 0
                });
                break;
            case 'matchScorePlayer2':
                this.setState({
                    matchScorePlayer2: point + 1,
                    gameScorePlayer1: 0,
                    gameScorePlayer2: 0
                });
        }

        const { gameScorePlayer1, gameScorePlayer2, matchScorePlayer1, matchScorePlayer2 } = this.state;
        const { player1, player2, matchTo, gameTo, differenceInGame } = this.props.settings;
        const matchToMax = 2 * matchTo - 1;

        if (((gameScorePlayer1 - gameScorePlayer2 >= differenceInGame - 1 && scorePosition === 'gameScorePlayer1')
            || (gameScorePlayer2  - gameScorePlayer1 >= differenceInGame - 1 && scorePosition === 'gameScorePlayer2'))
            && ((gameScorePlayer1 >= gameTo - 1 && scorePosition === 'gameScorePlayer1')
            || (gameScorePlayer2 >= gameTo - 1 && scorePosition === 'gameScorePlayer2')) ||
            ((gameScorePlayer1 >= MAX_POINTS_IN_GAME && scorePosition === 'gameScorePlayer1') 
            || (gameScorePlayer2 >= MAX_POINTS_IN_GAME && scorePosition === 'gameScorePlayer2'))) {
            this.setState({
                gameScorePlayer1: 0,
                gameScorePlayer2: 0,
                matchScorePlayer1: ((gameScorePlayer1 >= gameTo - 1 && scorePosition === 'gameScorePlayer1') 
                || (gameScorePlayer1 >= MAX_POINTS_IN_GAME && scorePosition === 'gameScorePlayer1')) ?
                    matchScorePlayer1 + 1 : matchScorePlayer1,
                matchScorePlayer2: ((gameScorePlayer2 >= gameTo - 1 && scorePosition === 'gameScorePlayer2') 
                || (gameScorePlayer2 >= MAX_POINTS_IN_GAME && scorePosition === 'gameScorePlayer2')) ?
                    matchScorePlayer2 + 1 : matchScorePlayer2
            })
        }

        if (matchScorePlayer1 === parseInt(matchToMax / 2) && (scorePosition === 'matchScorePlayer1'
            || (gameScorePlayer1 - gameScorePlayer2 >= differenceInGame - 1 && 
                gameScorePlayer1 >= gameTo - 1 && scorePosition === 'gameScorePlayer1') ||
                (gameScorePlayer1 >= MAX_POINTS_IN_GAME && scorePosition === 'gameScorePlayer1'))) {
            this.setState({
                allDisabled: true,
                winnerMessage: `${player1} wins!`
            });
        }
        else if (matchScorePlayer2 === parseInt(matchToMax / 2) && (scorePosition === 'matchScorePlayer2'
            || (gameScorePlayer2  - gameScorePlayer1 >= differenceInGame - 1 &&
                gameScorePlayer2 >= gameTo -1 && scorePosition === 'gameScorePlayer2') ||
                (gameScorePlayer2 >= MAX_POINTS_IN_GAME && scorePosition === 'gameScorePlayer2'))) {
            this.setState({
                allDisabled: true,
                winnerMessage: `${player2} wins!`
            });
        }

    }

    minus = (point, scorePosition) => {
        switch (scorePosition) {
            case 'gameScorePlayer1':
                this.setState({
                    gameScorePlayer1: point - 1
                });
                break;
            case 'gameScorePlayer2':
                this.setState({
                    gameScorePlayer2: point - 1
                });
                break;
            case 'matchScorePlayer1':
                this.setState({
                    matchScorePlayer1: point - 1,
                    gameScorePlayer1: 0,
                    gameScorePlayer2: 0
                });
                break;
            case 'matchScorePlayer2':
                this.setState({
                    matchScorePlayer2: point - 1,
                    gameScorePlayer1: 0,
                    gameScorePlayer2: 0
                });
        }
    }

    getPhoto = (player) => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
        
            if (response.didCancel) {
            console.log('User cancelled image picker');
            } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                if (player === 'player1') {
                    this.setState({
                        avatarPlayer1: source,
                    });
                }
                else {
                    this.setState({
                        avatarPlayer2: source,
                    });
                }
            }
        });
    }

    render() {
        const { allDisabled, gameScorePlayer1, gameScorePlayer2, matchScorePlayer1, matchScorePlayer2, winnerMessage } = this.state;
        const { player1, player2, matchTo, games } = this.props.settings;
        const matchToMax = 2 * matchTo - 1;

        return (
            <ImageBackground source={require(backgroundImagePath)} style={{ flex: 1, width: '100%', height: '100%' }}>
                <View style={styles.mainContainerStyle}>
                    <View style={styles.containerStyle}>
                        <TouchableOpacity
                            style={styles.playerImageContainerStyle}
                            onPress={ () => this.getPhoto('player1') }
                            disabled={allDisabled}
                        >
                            <Image source={this.state.avatarPlayer1 || require(defaultPlayerImagePath)} style={styles.playerPhotoStyle} />
                        </TouchableOpacity>
                        <View style={styles.playerNameStyle}>
                            <Text style={styles.playerTextStyle}>{player1}</Text>
                        </View>
                        {
                            games ? (
                                <View style={styles.gameScoreStyle}>
                                    <Button
                                        buttonText="+"
                                        onButtonPress={() => this.plus(gameScorePlayer1, 'gameScorePlayer1')}
                                        style={{ flex: 2 }}
                                        disabled={allDisabled}
                                    />
                                    <View style={styles.scoreTextContainerStyle}>
                                        <Text style={styles.gameScoreTextStyle}>
                                            {gameScorePlayer1}
                                        </Text>
                                    </View>
                                    <Button
                                        buttonText="-"
                                        onButtonPress={() => this.minus(gameScorePlayer1, 'gameScorePlayer1')}
                                        style={{ flex: 2 }}
                                        disabled={gameScorePlayer1 === 0 || allDisabled}
                                    />
                                </View>
                            ) : (
                                <View style={[styles.gameScoreStyle, {backgroundColor: 'dimgray'}]}></View>
                            )
                        }
                        <View style={styles.matchScoreStyle}>
                            <Button
                                buttonText="+"
                                onButtonPress={() => this.plus(matchScorePlayer1, 'matchScorePlayer1')}
                                style={{ flex: 2 }}
                                disabled={allDisabled}
                            />
                            <View style={styles.scoreTextContainerStyle}>
                                <Text style={styles.matchScoreTextStyle}>
                                    {matchScorePlayer1}
                                </Text>
                            </View>
                            <Button
                                buttonText="-"
                                onButtonPress={() => this.minus(matchScorePlayer1, 'matchScorePlayer1')}
                                style={{ flex: 2 }}
                                disabled={matchScorePlayer1 === 0 || allDisabled}
                            />
                        </View>
                    </View>
                    <View style={styles.maxGamesStyle}>
                        <Text style={styles.maxGamesTextStyle}>({matchToMax})</Text>
                    </View>
                    <View style={styles.containerStyle}>
                        <View style={styles.matchScoreStyle}>
                            <Button
                                buttonText="+"
                                onButtonPress={() => this.plus(matchScorePlayer2, 'matchScorePlayer2')}
                                style={{ flex: 2 }}
                                disabled={allDisabled}
                            />
                            <View style={styles.scoreTextContainerStyle}>
                                <Text style={styles.matchScoreTextStyle}>
                                    {matchScorePlayer2}
                                </Text>
                            </View>
                            <Button
                                buttonText="-"
                                onButtonPress={() => this.minus(matchScorePlayer2, 'matchScorePlayer2')}
                                style={{ flex: 2 }}
                                disabled={matchScorePlayer2 === 0 || allDisabled}
                            />
                        </View>
                        {
                            games ? (
                                <View style={styles.gameScoreStyle}>
                                    <Button
                                        buttonText="+"
                                        onButtonPress={() => this.plus(gameScorePlayer2, 'gameScorePlayer2')}
                                        style={{ flex: 2 }}
                                        disabled={allDisabled}
                                    />
                                    <View style={styles.scoreTextContainerStyle}>
                                        <Text style={styles.gameScoreTextStyle}>
                                            {gameScorePlayer2}
                                        </Text>
                                    </View>
                                    <Button
                                        buttonText="-"
                                        onButtonPress={() => this.minus(gameScorePlayer2, 'gameScorePlayer2')}
                                        style={{ flex: 2 }}
                                        disabled={gameScorePlayer2 === 0 || allDisabled}
                                    />
                                </View>
                            ) : (
                                <View style={[styles.gameScoreStyle, {backgroundColor: 'dimgray'}]}></View>
                            )
                        }
                        <View style={styles.playerNameStyle}>
                            <Text style={styles.playerTextStyle}>{player2}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.playerImageContainerStyle}
                            onPress={ () => this.getPhoto('player2') }
                            disabled={allDisabled}
                        >
                            <Image source={this.state.avatarPlayer2 || require(defaultPlayerImagePath)} style={styles.playerPhotoStyle} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.messageContainerStyle}>
                    <Text style={styles.messageTextStyle}>{winnerMessage}</Text>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    mainContainerStyle: {
        display: 'flex',
        flexDirection: 'row',
        // height: '100%'
    },
    containerStyle: {
        display: 'flex',
        flexDirection: 'row',
        width: COMPONENT_WIDTH,
        height: COMPONENT_HEIGHT,
        top: HEIGHT / 2 - COMPONENT_HEIGHT / 2,
        opacity: 0.8
    },
    messageContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    messageTextStyle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'gold'
    },
    playerImageContainerStyle: {
        width: COMPONENT_WIDTH * 2 / 9,
        backgroundColor: 'dimgray'
    },
    playerPhotoStyle: {
        width: COMPONENT_WIDTH * 2 / 9,
        height: COMPONENT_HEIGHT
    },
    playerNameStyle: {
        width: COMPONENT_WIDTH * 4.2 / 9,
        backgroundColor: 'dimgray',
        alignItems: 'center',
        justifyContent: 'center'
    },
    playerTextStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    },
    gameScoreStyle: {
        width: COMPONENT_WIDTH * 1.8 / 9,
        backgroundColor: 'yellow',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    matchScoreStyle: {
        width: COMPONENT_WIDTH / 9,
        backgroundColor: 'dimgray',
        alignItems: 'center',
        justifyContent: 'center'
    },
    matchScoreTextStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    },
    gameScoreTextStyle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black'
    },
    scoreTextContainerStyle: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    maxGamesStyle: {
        width: WIDTH * 8 / 100,
        height: COMPONENT_HEIGHT,
        backgroundColor: 'dimgray',
        top: HEIGHT / 2 - COMPONENT_HEIGHT / 2,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8
    },
    maxGamesTextStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default PlayerInfo;