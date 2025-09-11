import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { AppDispatch } from '../redux/store';

interface ProfileButtonProps {
  icon: string;
  label: string;
  onPress: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  icon,
  label,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center p-4 bg-white rounded-lg mb-3 shadow-sm"
  >
    <Icon name={icon} size={24} color="#3b82f6" />
    <Text className="ml-4 text-gray-800 text-lg">{label}</Text>
    <View className="flex-1" />
    <Icon name="chevron-right" size={24} color="#9ca3af" />
  </TouchableOpacity>
);

function ProfileScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-6">
        <View className="items-center mb-6">
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            className="w-32 h-32 rounded-full mb-4"
          />
          <Text className="text-2xl font-bold text-gray-800">John Doe</Text>
          <Text className="text-gray-500">john.doe@example.com</Text>
        </View>

        <ProfileButton
          icon="person-outline"
          label="Edit Profile"
          onPress={() => {}}
        />
        <ProfileButton
          icon="notifications-none"
          label="Notifications"
          onPress={() => {}}
        />
        <ProfileButton icon="security" label="Security" onPress={() => {}} />
        <ProfileButton
          icon="help-outline"
          label="Help & Support"
          onPress={() => {}}
        />

        <View className="mt-6">
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center justify-center p-4 bg-red-100 rounded-lg"
          >
            <Icon name="logout" size={24} color="#ef4444" />
            <Text className="ml-2 text-red-500 text-lg font-bold">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;
