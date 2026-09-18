import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../shared/theme';
import { ChartEditorScreen } from '../features/charting/screens/ChartEditorScreen';
import { MainTabNavigator } from './MainTabNavigator';
import type { RootStackParamList } from './navigation.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    card: theme.colors.surface,
    text: theme.colors.text,
    border: theme.colors.border,
    primary: theme.colors.primary,
  },
};

export function RootNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerTintColor: theme.colors.primary }}>
        <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="ChartEditor"
          component={ChartEditorScreen}
          options={{ title: '도안 작성' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
