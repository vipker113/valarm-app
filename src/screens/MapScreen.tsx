import React, { useRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DeviceStatus, DeviceType } from '../types/devices/enum';
import StatusFilter from '../components/ui/StatusFilter';

const { width, height } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.55;

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
    battery: 20,
    signalStrength: -90,
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
    battery: 50,
    signalStrength: -70,
    displayLocation: 'Phòng giám sát',
  },
];

type StatusType = 'all' | 'active' | 'inactive' | 'alert';

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [selected, setSelected] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusType>('all');
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => {
        if (!drawerOpen && gesture.moveX < 30 && gesture.dx > 10) return true;
        if (drawerOpen && gesture.moveX < DRAWER_WIDTH && gesture.dx < -10)
          return true;
        return false;
      },
      onPanResponderMove: (_, gesture) => {
        let newX = gesture.dx;
        if (drawerOpen) {
          newX = -DRAWER_WIDTH + gesture.dx;
        }
        if (newX > 0) newX = 0;
        if (newX < -DRAWER_WIDTH) newX = -DRAWER_WIDTH;
        drawerAnim.setValue(newX);
      },
      onPanResponderRelease: (_, gesture) => {
        if (!drawerOpen) {
          if (gesture.dx > 50) {
            openDrawer();
          } else {
            closeDrawer();
          }
        } else {
          if (gesture.dx < -50) {
            closeDrawer();
          } else {
            openDrawer();
          }
        }
      },
    }),
  ).current;

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
      if (search && !d.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [statusFilter, search]);

  const handleSelectDevice = (device: any) => {
    setSelected(device);
    setModalVisible(true);
    mapRef.current?.animateToRegion(
      {
        latitude: device.latitude,
        longitude: device.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      1000,
    );
  };

  const openDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setDrawerOpen(true));
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: -DRAWER_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setDrawerOpen(false));
  };

  const renderDeviceIcon = (type: DeviceType) => {
    switch (type) {
      case DeviceType.CAMERA:
        return <Icon name="video-outline" size={20} color="#374151" />;
      case DeviceType.ALARM:
        return <Icon name="alarm-light-outline" size={20} color="#374151" />;
      case DeviceType.RECORDER:
        return <Icon name="microphone-outline" size={20} color="#374151" />;
      default:
        return <Icon name="help-circle-outline" size={20} color="#374151" />;
    }
  };

  const renderBatteryIcon = (battery: number) => {
    if (battery > 50) return <Icon name="battery" size={18} color="green" />;
    if (battery > 20)
      return <Icon name="battery-medium" size={18} color="orange" />;
    return <Icon name="battery-alert" size={18} color="red" />;
  };

  const renderSignalIcon = (signal: number) => {
    if (signal > -70) return <Icon name="wifi" size={18} color="green" />;
    if (signal > -85) return <Icon name="wifi" size={18} color="orange" />;
    return <Icon name="wifi-off" size={18} color="red" />;
  };

  return (
    <View className="flex-1 bg-white" {...panResponder.panHandlers}>
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

      <View className="absolute top-4 left-3 right-3 bg-white rounded-xl p-2 shadow-md">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => (drawerOpen ? closeDrawer() : openDrawer())}
            className="p-2"
          >
            <Icon name="menu" size={24} color="#374151" />
          </TouchableOpacity>
          <TextInput
            placeholder="Tìm kiếm thiết bị..."
            value={search}
            onChangeText={setSearch}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 ml-2"
          />
        </View>
        <View className="mt-2">
          <StatusFilter selected={statusFilter} onChange={setStatusFilter} />
        </View>
      </View>

      {drawerOpen && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeDrawer}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 5,
          }}
        />
      )}

      <Animated.View
        style={{
          position: 'absolute',
          top: 120,
          left: 0,
          width: DRAWER_WIDTH,
          maxHeight: height * 0.5,
          backgroundColor: '#fff',
          transform: [{ translateX: drawerAnim }],
          zIndex: 10,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          padding: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <FlatList
          data={filteredDevices}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectDevice(item)}
              className={`flex-row items-center justify-between px-3 py-2 border-b border-gray-100 ${
                selected?.id === item.id ? 'bg-indigo-50' : ''
              }`}
            >
              <View className="flex-row items-center space-x-2">
                {renderDeviceIcon(item.deviceType)}
                <View>
                  <Text className="font-semibold text-sm">{item.name}</Text>
                  <Text
                    className={`text-xs ${
                      item.status === DeviceStatus.ACTIVE
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {item.status === DeviceStatus.ACTIVE ? 'online' : 'offline'}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center space-x-2">
                {renderSignalIcon(item.signalStrength)}
                {renderBatteryIcon(item.battery)}
              </View>
            </TouchableOpacity>
          )}
        />
      </Animated.View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <BlurView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          blurType="dark"
          blurAmount={1}
        >
          <View className="bg-white p-5 rounded-lg shadow-lg w-11/12">
            {selected ? (
              <>
                <Text className="text-lg font-bold mb-2">{selected.name}</Text>
                <Text>Code: {selected.code}</Text>
                <Text>Loại: {selected.deviceType}</Text>
                <Text>Trạng thái: {selected.status}</Text>
                <Text>Pin: {selected.battery}%</Text>
                <Text>Tín hiệu: {selected.signalStrength} dBm</Text>
                <Text>Vị trí: {selected.displayLocation}</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="mt-4 bg-blue-500 p-2 rounded-md"
                >
                  <Text className="text-white text-center">Đóng</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text>Không có thiết bị nào được chọn</Text>
            )}
          </View>
        </BlurView>
      </Modal>
    </View>
  );
}
