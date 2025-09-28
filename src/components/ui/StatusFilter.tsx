import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type StatusType = 'all' | 'active' | 'inactive' | 'alert';

interface Props {
  selected: StatusType;
  onChange: (s: StatusType) => void;
}

const filterStyles = {
  all: {
    active: {
      container: 'bg-indigo-500 border-indigo-500',
      text: 'text-white font-semibold',
    },
    inactive: {
      container: 'border-indigo-500',
      text: 'text-indigo-600',
    },
  },
  active: {
    active: {
      container: 'bg-emerald-100 border-emerald-500',
      text: 'text-emerald-700 font-semibold',
    },
    inactive: {
      container: 'border-emerald-400',
      text: 'text-emerald-500',
    },
  },
  inactive: {
    active: {
      container: 'bg-zinc-100 border-zinc-500',
      text: 'text-zinc-700 font-semibold',
    },
    inactive: {
      container: 'border-zinc-400',
      text: 'text-zinc-500',
    },
  },
  alert: {
    active: {
      container: 'bg-rose-100 border-rose-500',
      text: 'text-rose-700 font-semibold',
    },
    inactive: {
      container: 'border-rose-400',
      text: 'text-rose-500',
    },
  },
} as const;

const StatusFilter = ({ selected, onChange }: Props) => {
  const filters: { key: StatusType; label: string; dot: string }[] = [
    { key: 'all', label: 'All', dot: 'bg-indigo-500' },
    { key: 'active', label: 'Active', dot: 'bg-emerald-500' },
    { key: 'inactive', label: 'Inactive', dot: 'bg-zinc-500' },
    { key: 'alert', label: 'Alert', dot: 'bg-rose-500' },
  ];

  return (
    <View className="flex-row space-x-2">
      {filters.map(f => {
        const isActive = selected === f.key;
        const { container, text } = isActive
          ? filterStyles[f.key].active
          : filterStyles[f.key].inactive;

        return (
          <TouchableOpacity
            key={f.key}
            onPress={() => onChange(f.key)}
            activeOpacity={0.7}
            className={`flex-row items-center mr-2 px-3 py-1 rounded-full border ${container}`}
          >
            {f.key !== 'all' && (
              <View className={`w-2.5 h-2.5 rounded-full mr-2 ${f.dot}`} />
            )}
            <Text className={text}>{f.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default StatusFilter;
