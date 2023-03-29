
import { View } from 'react-native'
import React from 'react'
import Tabuleiro from '../components/Tabuleiro'

const Home = () => {
    return (
        <View style={{ flex: 1, width: "100%" }}>
            <Tabuleiro />
        </View>
    )
}

export default Home;