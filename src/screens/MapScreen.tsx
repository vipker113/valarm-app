import React, { useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const devices = [
  {
    id: 1,
    name: 'Device 1',
    status: 'online',
    lat: 10.762622,
    lng: 106.660172,
  },
  { id: 2, name: 'Device 2', status: 'offline', lat: 10.775, lng: 106.68 },
  { id: 3, name: 'Device 3', status: 'alert', lat: 10.78, lng: 106.7 },
  { id: 4, name: 'Device 4', status: 'online', lat: 10.74, lng: 106.65 },
];

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const handleFocusDevice = (device: any) => {
    setSelected(device.id);
    mapRef.current?.animateToRegion(
      {
        latitude: device.lat,
        longitude: device.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      1000,
    );
  };

  return (
    <View className="flex-1">
      <MapView
        provider="google"
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 10.762622,
          longitude: 106.660172,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        {devices.map(d => (
          <Marker
            key={d.id}
            coordinate={{ latitude: d.lat, longitude: d.lng }}
            pinColor={
              d.status === 'online'
                ? 'green'
                : d.status === 'offline'
                  ? 'gray'
                  : 'red'
            }
          >
            <Callout>
              <View className="p-2">
                <Text className="font-bold">{d.name}</Text>
                <Text>Status: {d.status}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View className="absolute top-10 left-2 bg-white rounded-xl p-3 shadow-md w-44 max-h-[60%]">
        <Text className="text-base font-bold mb-2">Devices</Text>
        <FlatList
          data={devices}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`py-2 border-b border-gray-300 ${
                selected === item.id ? 'bg-blue-100' : ''
              }`}
              onPress={() => handleFocusDevice(item)}
            >
              <Text className="text-sm">
                {item.name} ({item.status})
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
