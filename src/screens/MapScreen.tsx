import React, { useRef, useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import { DeviceStatus, DeviceType } from '../types/enum';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const mockDevices = [
  {
    id: 1,
    name: 'Camera Phòng A',
    code: 'CAM-001',
    latitude: 10.762622,
    longitude: 106.660172,
    status: DeviceStatus.ACTIVE,
    deviceType: DeviceType.CAMERA,
    battery: 90,
    signalStrength: -65,
    displayLocation: 'Tầng 1 - Phòng A',
  },
  {
    id: 2,
    name: 'Báo cháy Kho',
    code: 'ALR-201',
    latitude: 10.775,
    longitude: 106.68,
    status: DeviceStatus.MAINTENANCE,
    deviceType: DeviceType.ALARM,
    battery: 60,
    signalStrength: -80,
    displayLocation: 'Kho hàng chính',
  },
  {
    id: 3,
    name: 'Recorder Văn phòng',
    code: 'REC-502',
    latitude: 10.78,
    longitude: 106.7,
    status: DeviceStatus.INACTIVE,
    deviceType: DeviceType.RECORDER,
    battery: 30,
    signalStrength: -90,
    displayLocation: 'Phòng giám sát',
  },
];

type StatusType = 'all' | 'active' | 'inactive' | 'alert';

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const modalRef = useRef<BottomSheet>(null);

  const [selected, setSelected] = useState<any | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusType>('all');
  const [typeFilter, setTypeFilter] = useState<DeviceType | null>(null);
  const [search, setSearch] = useState('');

  const filteredDevices = useMemo(() => {
    return mockDevices.filter(d => {
      if (statusFilter !== 'all') {
        if (
          (statusFilter === 'active' && d.status !== DeviceStatus.ACTIVE) ||
          (statusFilter === 'inactive' && d.status !== DeviceStatus.INACTIVE) ||
          (statusFilter === 'alert' && d.status !== DeviceStatus.MAINTENANCE)
        ) {
          return false;
        }
      }
      if (typeFilter && d.deviceType !== typeFilter) return false;
      if (search && !d.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [statusFilter, typeFilter, search]);

  const handleSelectDevice = (device: any) => {
    console.log('Chọn thiết bị:', device.name);
    setSelected(device);
    mapRef.current?.animateToRegion(
      {
        latitude: device.latitude,
        longitude: device.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      1000,
    );
    modalRef.current?.expand();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 bg-white">
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 10.762622,
            longitude: 106.660172,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
        >
          {filteredDevices.map(d => (
            <Marker
              key={d.id}
              coordinate={{ latitude: d.latitude, longitude: d.longitude }}
              pinColor={
                d.status === DeviceStatus.ACTIVE
                  ? 'green'
                  : d.status === DeviceStatus.INACTIVE
                    ? 'gray'
                    : 'orange'
              }
              onPress={() => handleSelectDevice(d)}
            />
          ))}
        </MapView>

        <View className="absolute top-10 left-3 right-3 bg-white rounded-xl p-2 shadow-md">
          <TextInput
            placeholder="Tìm kiếm thiết bị..."
            value={search}
            onChangeText={setSearch}
            className="border border-gray-300 rounded-lg px-3 py-2 mb-2"
          />
          <StatusFilter selected={statusFilter} onChange={setStatusFilter} />
        </View>

        <BottomSheet ref={modalRef} snapPoints={[450, 300]}>
          <View className="p-4">
            {selected ? (
              <>
                <Text className="text-lg font-bold">{selected.name}</Text>
                <Text>Code: {selected.code}</Text>
                <Text>Loại: {selected.deviceType}</Text>
                <Text>Trạng thái: {selected.status}</Text>
                <Text>Pin: {selected.battery}%</Text>
                <Text>Tín hiệu: {selected.signalStrength} dBm</Text>
                <Text>Vị trí: {selected.displayLocation}</Text>
              </>
            ) : (
              <Text>Chọn một thiết bị để xem chi tiết</Text>
            )}
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

interface Props {
  selected: StatusType;
  onChange: (s: StatusType) => void;
}

const StatusFilter = ({ selected, onChange }: Props) => {
  const filters: { key: StatusType; label: string; color: string }[] = [
    { key: 'all', label: 'All', color: 'blue' },
    { key: 'active', label: 'Active', color: 'green' },
    { key: 'inactive', label: 'Inactive', color: 'gray' },
    { key: 'alert', label: 'Alert', color: 'red' },
  ];

  return (
    <View className="flex-row space-x-2">
      {filters.map(f => {
        const isActive = selected === f.key;
        const baseStyle =
          f.key === 'all'
            ? isActive
              ? 'bg-blue-500 border-blue-500'
              : 'border-blue-500'
            : isActive
              ? `border-${f.color}-500 bg-${f.color}-100`
              : `border-${f.color}-500`;

        return (
          <TouchableOpacity
            key={f.key}
            onPress={() => onChange(f.key)}
            className={`flex-row items-center px-3 py-1 rounded-full border ${baseStyle}`}
          >
            {f.key !== 'all' && (
              <View
                className="w-2.5 h-2.5 rounded-full mr-2"
                style={{ backgroundColor: f.color }}
              />
            )}
            <Text
              className={
                f.key === 'all'
                  ? isActive
                    ? 'text-white font-semibold'
                    : 'text-blue-500'
                  : isActive
                    ? `text-${f.color}-700 font-semibold`
                    : `text-${f.color}-500`
              }
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
