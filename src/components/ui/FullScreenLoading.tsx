import React from 'react';
import { View, ActivityIndicator, Modal, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
}

function FullScreenLoading({ visible }: Props) {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.container}>
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  indicatorContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
});

export default FullScreenLoading;
