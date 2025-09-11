import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => (
  <View className={`p-4 rounded-xl flex-1 items-center justify-center ${color}`}>
    <Icon name={icon} size={30} color="white" />
    <Text className="text-white text-lg font-bold mt-2">{value}</Text>
    <Text className="text-white text-sm">{label}</Text>
  </View>
);

interface RecentActivityItemProps {
  icon: string;
  text: string;
  time: string;
}

const RecentActivityItem: React.FC<RecentActivityItemProps> = ({ icon, text, time }) => (
  <View className="flex-row items-center p-4 bg-white rounded-lg mb-3 shadow-sm">
    <Icon name={icon} size={24} color="#3b82f6" />
    <View className="ml-4 flex-1">
      <Text className="text-gray-800">{text}</Text>
      <Text className="text-gray-500 text-xs mt-1">{time}</Text>
    </View>
    <Icon name="chevron-right" size={24} color="#9ca3af" />
  </View>
);

function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-800">Dashboard</Text>
        <Text className="text-gray-500 mt-1">Welcome back!</Text>

        <View className="flex-row mt-6 gap-4">
          <StatCard icon="notifications-active" label="Active Alerts" value="3" color="bg-red-500" />
          <StatCard icon="devices" label="Online Devices" value="12" color="bg-green-500" />
        </View>

        <View className="mt-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Recent Activity</Text>
          <RecentActivityItem icon="warning" text="Alert triggered on 'Device-04'" time="5 minutes ago" />
          <RecentActivityItem icon="power" text="'Device-08' came online" time="1 hour ago" />
          <RecentActivityItem icon="power-off" text="'Device-02' went offline" time="3 hours ago" />
        </View>
      </View>
    </ScrollView>
  );
}

export default DashboardScreen;

