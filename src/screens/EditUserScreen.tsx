import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { userService } from '../services/userService';
import useUserStore from '../store/useUserStore';

type EditUserScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditUser'
>;

type EditUserScreenRouteProp = RouteProp<RootStackParamList, 'EditUser'>;

const EditUserScreen = () => {
  const navigation = useNavigation<EditUserScreenNavigationProp>();
  const route = useRoute<EditUserScreenRouteProp>();
  const { userId } = route.params;
  const { users, updateUser } = useUserStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  useEffect(() => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [userId, users, reset]);

  const onSubmit = async (data: any) => {
    try {
      const updatedUser = await userService.updateUser(userId, data);
      updateUser(updatedUser);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="name"
      />
      {errors.name && <Text style={styles.errorText}>Name is required</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.errorText}>Valid email is required</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
          />
        )}
        name="phone"
      />
      {errors.phone && <Text style={styles.errorText}>Phone is required</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Update User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default EditUserScreen; 