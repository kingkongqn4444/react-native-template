import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserListScreen from '@/screens/UserListScreen';
import AddUserScreen from '@/screens/AddUserScreen';
import EditUserScreen from '@/screens/EditUserScreen';

export type RootStackParamList = {
  UserList: undefined;
  AddUser: undefined;
  EditUser: { userId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
      <Stack.Navigator
        initialRouteName="UserList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="UserList"
          component={UserListScreen}
          options={{ title: 'Users' }}
        />
        <Stack.Screen
          name="AddUser"
          component={AddUserScreen}
          options={{ title: 'Add User' }}
        />
        <Stack.Screen
          name="EditUser"
          component={EditUserScreen}
          options={{ title: 'Edit User' }}
        />
      </Stack.Navigator>
  );
}; 