import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './src/redux/store';
import './global.css';
import DashboardScreen from './src/screens/DashboardScreen';
import MapScreen from './src/screens/MapScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DeviceListScreen from './src/screens/DeviceListScreen';
import LoginScreen from './src/screens/LoginScreen';
import FullScreenLoading from './src/components/ui/FullScreenLoading';
import {
  getFcmToken,
  notificationListener,
  requestUserPermission,
} from './src/services/notificationService';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainApp() {
  const token = useSelector((state: RootState) => state.user.token);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  useEffect(() => {
    SplashScreen.hide();

    const setupNotifications = async () => {
      await requestUserPermission();
      await getFcmToken();
      notificationListener();
    };

    setupNotifications();
  }, []);

  return (
    <NavigationContainer>
      {token ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Dashboard') {
                iconName = 'dashboard';
              } else if (route.name === 'Map') {
                iconName = 'map';
              } else if (route.name === 'Profile') {
                iconName = 'person';
              } else if (route.name === 'Device List') {
                iconName = 'list';
              }

              return (
                <Icon name={iconName as string} size={size} color={color} />
              );
            },
            tabBarActiveTintColor: '#3b82f6',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Dashboard" component={DashboardScreen} />
          <Tab.Screen name="Device List" component={DeviceListScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
      <FullScreenLoading visible={isLoading} />
    </NavigationContainer>
  );
}

function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <MainApp />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
