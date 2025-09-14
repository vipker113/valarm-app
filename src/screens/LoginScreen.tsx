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
// import api from '../services/api';

function LoginScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const [code, setCode] = useState(__DEV__ ? 'DEV-COM-2025-JY3AG3BJ' : '');
  const [username, setUsername] = useState(__DEV__ ? 'company@gmail.com' : '');
  const [password, setPassword] = useState(__DEV__ ? '49ud6[:m!JuS' : '');

  const handleLogin = async () => {
    try {
      //  const loginResponse = await api.post('/company/auth/login', {
      //    code,
      //    username,
      //    password,
      //  });
      //  const { access_token } = loginResponse.data.data;
      //  dispatch(loginSuccess({ token: access_token }));
      //  const profileResponse = await api.get('/company/auth/profile');
      //  dispatch(setUser(profileResponse.data.data));
      dispatch(loginSuccess({ token: 'mock-token' }));
      dispatch(setUser({ name: 'Mock User' }));
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid credentials');
    }
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
          <Text className="text-gray-600 mb-2">Code</Text>
          <TextInput
            className="w-full bg-white p-4 rounded-lg shadow-sm"
            placeholder="Enter your code"
            value={code}
            onChangeText={setCode}
            autoCapitalize="none"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-600 mb-2">Username</Text>
          <TextInput
            className="w-full bg-white p-4 rounded-lg shadow-sm"
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
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
