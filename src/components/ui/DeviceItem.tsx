import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TDevice } from '../../types/devices/device';
import { DeviceStatus, DeviceType } from '../../types/devices/enum';

type Props = {
  device: TDevice;
  onPress?: () => void;
};

const DeviceItem: React.FC<Props> = ({ device, onPress }) => {
  const { name, status, deviceType, battery, signalStrength } = device;

  const renderDeviceIcon = () => {
    switch (deviceType) {
      case DeviceType.CAMERA:
        return <Icon name="video-outline" size={22} color="#374151" />;
      case DeviceType.ALARM:
        return <Icon name="alarm-light-outline" size={22} color="orange" />;
      case DeviceType.RECORDER:
        return <Icon name="microphone-outline" size={22} color="red" />;
      default:
        return <Icon name="help-circle-outline" size={22} color="#374151" />;
    }
  };

  const renderSignalBars = () => {
    if (signalStrength == null) return null;
    const percent = Math.max(0, Math.min(100, signalStrength));
    const bars = Math.ceil((percent / 100) * 4);
    return (
      <View className="flex-row items-end ml-1">
        {[1, 2, 3, 4].map(i => (
          <View
            key={i}
            className={`w-1 mx-[1px] rounded-sm ${
              i <= bars
                ? percent > 60
                  ? 'bg-green-500'
                  : percent > 30
                    ? 'bg-orange-500'
                    : 'bg-red-500'
                : 'bg-gray-200'
            }`}
            style={{ height: i * 4 }}
          />
        ))}
      </View>
    );
  };

  const renderBattery = () => {
    if (battery == null) return null;

    let colorClass = 'text-green-600';
    let colorHex = '#16a34a';
    let icon = 'battery';

    if (battery <= 20) {
      colorClass = 'text-red-600';
      colorHex = '#dc2626';
      icon = 'battery-alert';
    } else if (battery <= 50) {
      colorClass = 'text-orange-500';
      colorHex = '#f97316';
      icon = 'battery-medium';
    }

    return (
      <View className="flex-row items-center ml-2">
        <Icon name={icon} size={18} color={colorHex} />
        <Text className={`ml-1 text-xs ${colorClass}`}>{battery}%</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between px-3 py-2 border-b border-gray-100"
    >
      <View className="flex-row items-center">
        {renderDeviceIcon()}
        <View className="ml-2">
          <Text className="font-semibold text-sm">{name}</Text>
          <Text
            className={`text-xs ${
              status === DeviceStatus.ACTIVE
                ? 'text-green-600'
                : status === DeviceStatus.MAINTENANCE
                  ? 'text-orange-500'
                  : 'text-gray-500'
            }`}
          >
            Hoạt động
          </Text>
        </View>
      </View>

      <View className="flex-row items-center">
        {renderSignalBars()}
        {renderBattery()}
      </View>
    </TouchableOpacity>
  );
};

export default DeviceItem;
