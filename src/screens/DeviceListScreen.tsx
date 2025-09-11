import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const devices = [
  { id: '1', name: 'Living Room Cam', online: true, icon: 'videocam' },
  { id: '2', name: 'Front Door Lock', online: false, icon: 'lock' },
  { id: '3', name: 'Garage Sensor', online: true, icon: 'sensors' },
  { id: '4', name: 'Kitchen Speaker', online: true, icon: 'speaker' },
  { id: '5', name: 'Bedroom Light', online: false, icon: 'lightbulb' },
  { id: '6', name: 'Thermostat', online: true, icon: 'thermostat' },
];

interface DeviceItemProps {
  name: string;
  online: boolean;
  icon: string;
}

const DeviceItem: React.FC<DeviceItemProps> = ({ name, online, icon }) => (
  <TouchableOpacity className="flex-row items-center p-4 bg-white rounded-lg mb-3 shadow-sm">
    <Icon name={icon} size={24} color={online ? '#3b82f6' : '#9ca3af'} />
    <View className="ml-4 flex-1">
      <Text className="text-gray-800 text-lg">{name}</Text>
      <Text className={`text-sm ${online ? 'text-green-500' : 'text-gray-500'}`}>
        {online ? 'Online' : 'Offline'}
      </Text>
    </View>
    <Icon name="chevron-right" size={24} color="#9ca3af" />
  </TouchableOpacity>
);

function DeviceListScreen() {
  return (
    <View className="flex-1 bg-gray-100">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-800 mb-4">Devices</Text>
        <FlatList
          data={devices}
          renderItem={({ item }) => <DeviceItem {...item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

export default DeviceListScreen;

