import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';
import { AppDispatch } from '../redux/store';
import Icon from 'react-native-vector-icons/MaterialIcons';

function LoginScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');

  const handleLogin = () => {
    const dummyUser = { name: 'John Doe', email };
    const dummyToken = 'fake-jwt-token';
    dispatch(loginSuccess({ user: dummyUser, token: dummyToken }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 justify-center items-center bg-gray-100 p-6"
    >
      <View className="w-full max-w-sm">
        <View className="items-center mb-8">
          <Icon name="lock" size={40} color="#3b82f6" />
          <Text className="text-3xl font-bold text-gray-800 mt-4">
            Welcome Back
          </Text>
          <Text className="text-gray-500 mt-1">Sign in to continue</Text>
        </View>

        <View className="mb-4">
          <Text className="text-gray-600 mb-2">Email</Text>
          <TextInput
            className="w-full bg-white p-4 rounded-lg shadow-sm"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-600 mb-2">Password</Text>
          <TextInput
            className="w-full bg-white p-4 rounded-lg shadow-sm"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          className="w-full bg-blue-500 p-4 rounded-lg items-center justify-center shadow-lg"
        >
          <Text className="text-white text-lg font-bold">Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
