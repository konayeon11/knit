import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { theme } from '../shared/theme';
import { ChartListScreen } from '../features/charting/screens/ChartListScreen';
import { CounterScreen } from '../features/counter/screens/CounterScreen';
import { GaugeCalculatorScreen } from '../features/gauge/screens/GaugeCalculatorScreen';
import { NeedleYarnConverterScreen } from '../features/converter/screens/NeedleYarnConverterScreen';
import type { MainTabParamList } from './navigation.types';

const Tab = createBottomTabNavigator<MainTabParamList>();

function tabIcon(emoji: string) {
  return () => <Text style={{ fontSize: 22 }}>{emoji}</Text>;
}

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: { height: 64, paddingBottom: 8, paddingTop: 8 },
        tabBarLabelStyle: { fontSize: theme.fontSize.caption },
      }}
    >
      <Tab.Screen
        name="ChartList"
        component={ChartListScreen}
        options={{ title: '도안 작성', tabBarIcon: tabIcon('🧶') }}
      />
      <Tab.Screen
        name="Counter"
        component={CounterScreen}
        options={{ title: '카운터', tabBarIcon: tabIcon('🔢') }}
      />
      <Tab.Screen
        name="Gauge"
        component={GaugeCalculatorScreen}
        options={{ title: '게이지', tabBarIcon: tabIcon('📏') }}
      />
      <Tab.Screen
        name="Converter"
        component={NeedleYarnConverterScreen}
        options={{ title: '바늘/실', tabBarIcon: tabIcon('🧵') }}
      />
    </Tab.Navigator>
  );
}
