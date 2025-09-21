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
  <View className={`flex-1 rounded-2xl p-5 ${color} shadow-md`}>
    <View className="items-center">
      <View className="bg-white/20 rounded-full p-3">
        <Icon name={icon} size={28} color="white" />
      </View>
      <Text className="text-white text-2xl font-extrabold mt-3">{value}</Text>
      <Text className="text-white text-sm opacity-90 mt-1">{label}</Text>
    </View>
  </View>
);

interface RecentActivityItemProps {
  icon: string;
  text: string;
  time: string;
}

const RecentActivityItem: React.FC<RecentActivityItemProps> = ({
  icon,
  text,
  time,
}) => (
  <View className="flex-row items-center p-4 bg-white rounded-xl mb-4 shadow-sm border border-gray-50">
    <View className="bg-blue-50 rounded-full p-2">
      <Icon name={icon} size={22} color="#3b82f6" />
    </View>
    <View className="ml-4 flex-1">
      <Text className="text-gray-800 font-medium">{text}</Text>
      <Text className="text-gray-500 text-xs mt-1">{time}</Text>
    </View>
    <Icon name="chevron-right" size={24} color="#d1d5db" />
  </View>
);

function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Dashboard
        </Text>
        <Text className="text-gray-500 mt-1 text-base">Welcome back!</Text>

        <View className="flex-row mt-6 gap-4">
          <StatCard
            icon="notifications-active"
            label="Active Alerts"
            value="3"
            color="bg-red-500"
          />
          <StatCard
            icon="devices"
            label="Online Devices"
            value="12"
            color="bg-green-500"
          />
        </View>

        <View className="mt-10">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Recent Activity
          </Text>
          <RecentActivityItem
            icon="warning"
            text="Alert triggered on 'Device-04'"
            time="5 minutes ago"
          />
          <RecentActivityItem
            icon="power"
            text="'Device-08' came online"
            time="1 hour ago"
          />
          <RecentActivityItem
            icon="power-off"
            text="'Device-02' went offline"
            time="3 hours ago"
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default DashboardScreen;
