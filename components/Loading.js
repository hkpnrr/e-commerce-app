import { StyleSheet, ActivityIndicator, View } from 'react-native'
import React from 'react'

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }
})