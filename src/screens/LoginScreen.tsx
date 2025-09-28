import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess, setUser } from '../redux/userSlice';
import { AppDispatch } from '../redux/store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';
// import api from '../services/api';

import { showLoading, hideLoading } from '../redux/loadingSlice';

function LoginScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const [code, setCode] = useState(__DEV__ ? 'DEV-COM-2025-JY3AG3BJ' : '');
  const [username, setUsername] = useState(__DEV__ ? 'company@gmail.com' : '');
  const [password, setPassword] = useState(__DEV__ ? 'Admin@123' : '');

  const handleLogin = async () => {
    dispatch(showLoading());
    const endpoint = 'company/auth/login';
    const payload = {
      code,
      username,
      password,
    };
    try {
      const loginResponse = await api.post(endpoint, payload);
      const { access_token } = loginResponse.data.data;

      console.log(loginResponse.data);

      dispatch(loginSuccess({ token: access_token }));
      const profileResponse = await api.get('company/auth/profile');
      dispatch(setUser(profileResponse.data.data));
      // dispatch(loginSuccess({ token: 'mock-token' }));
      // dispatch(setUser({ name: 'Mock User' }));
    } catch (error: any) {
      console.log('Login error', error.response);
      Alert.alert('Login Failed', error.response.data.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gradient-to-br from-blue-50 to-white"
    >
      <View className="flex-1 justify-center items-center px-6">
        <View className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-lg">
          <View className="items-center mb-8">
            <View className="bg-blue-100 p-4 rounded-full">
              <Icon name="lock" size={32} color="#3b82f6" />
            </View>
            <Text className="text-3xl font-bold text-gray-800 mt-4 tracking-tight">
              Welcome Back
            </Text>
            <Text className="text-gray-500 mt-2 text-base">
              Sign in to continue
            </Text>
          </View>

          <View className="mb-5">
            <Text className="text-gray-700 font-medium mb-2">Code</Text>
            <TextInput
              className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              placeholder="Enter your code"
              value={code}
              onChangeText={setCode}
              autoCapitalize="none"
            />
          </View>

          <View className="mb-5">
            <Text className="text-gray-700 font-medium mb-2">Username</Text>
            <TextInput
              className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View className="mb-6">
            <Text className="text-gray-700 font-medium mb-2">Password</Text>
            <TextInput
              className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            className="w-full bg-blue-500 p-4 rounded-xl items-center justify-center shadow-md active:bg-blue-600"
          >
            <Text className="text-white text-lg font-semibold tracking-wide">
              Login
            </Text>
          </TouchableOpacity>

          <View className="mt-6 items-center">
            <Text className="text-gray-500">
              Don’t have an account?{' '}
              <Text className="text-blue-500 font-semibold">Sign up</Text>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
