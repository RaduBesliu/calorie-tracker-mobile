import React, { useContext, useEffect, useState } from 'react';

import { Components } from './styled';
import InputComponent from '../../../components/InputComponent';
import { UserHeightMetric, UserWeightMetric } from '../../../api/types/user';
import { AuthContext } from '../../../providers/AuthProvider/context';
import { apiFetch } from '../../../api';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { COLORS } from '../../../utils/styled/constants';

const Account = () => {
  const navigation = useNavigation();

  const { user, setUser, logout } = useContext(AuthContext);

  const [name, setName] = useState<string | undefined>();
  const [preferredHeightMetric, setPreferredHeightMetric] = useState<string | undefined>();
  const [height, setHeight] = useState<string | undefined>();
  const [preferredWeightMetric, setPreferredWeightMetric] = useState<string | undefined>();
  const [weight, setWeight] = useState<string | undefined>();
  const [targetWeight, setTargetWeight] = useState<string | undefined>();
  const [targetCalories, setTargetCalories] = useState<string | undefined>();

  useEffect(() => {
    if (!user) {
      return;
    }

    setName(user.name);
    setPreferredHeightMetric(user.pref_height_metric);
    setHeight(user.height?.toString());
    setPreferredWeightMetric(user.pref_weight_metric);
    setWeight(user.weight?.toString());
    setTargetWeight(user.target_weight?.toString());
    setTargetCalories(user.target_calories?.toString());
  }, []);

  const _onSave = async () => {
    if (!user) {
      return;
    }

    const heightNumber = height ? Number(height) : undefined;
    const weightNumber = weight ? Number(weight) : undefined;
    const targetWeightNumber = targetWeight ? Number(targetWeight) : undefined;
    const targetCaloriesNumber = targetCalories ? Number(targetCalories) : undefined;

    await apiFetch({
      path: '/user/me',
      method: 'PUT',
      body: {
        name,
        pref_height_metric: preferredHeightMetric as UserHeightMetric,
        height: heightNumber,
        pref_weight_metric: preferredWeightMetric as UserWeightMetric,
        weight: weightNumber,
        target_weight: targetWeightNumber,
        target_calories: targetCaloriesNumber,
      },
    }).then((data) => {
      setUser(data);
      navigation.goBack();
    });
  };

  return (
    <Components.Container contentContainerStyle={{ alignItems: 'center' }}>
      <InputComponent label={'Name'} placeholder={'Name...'} value={name} setValue={setName} />
      <InputComponent label={'Height'} placeholder={'Height...'} value={height} setValue={setHeight} />
      <InputComponent label={'Weight'} placeholder={'Weight...'} value={weight} setValue={setWeight} />
      <InputComponent
        label={'Target Weight'}
        placeholder={'Target Weight...'}
        value={targetWeight}
        setValue={setTargetWeight}
      />
      <InputComponent
        label={'Target Calories'}
        placeholder={'Target Calories...'}
        value={targetCalories}
        setValue={setTargetCalories}
      />
      <InputComponent
        label={'Preferred Height Metric'}
        placeholder={'Preferred Height Metric...'}
        value={preferredHeightMetric}
        setValue={setPreferredHeightMetric}
      />
      <InputComponent
        label={'Preferred Weight Metric'}
        placeholder={'Preferred Weight Metric...'}
        value={preferredWeightMetric}
        setValue={setPreferredWeightMetric}
      />
      <Components.Button onPress={_onSave}>
        <Components.ButtonLabel>Save</Components.ButtonLabel>
      </Components.Button>
      <Components.Button onPress={logout}>
        <FontAwesomeIcon icon={faGoogle} color={COLORS.black} />
        <Components.ButtonLabel>{'Logout'}</Components.ButtonLabel>
      </Components.Button>
    </Components.Container>
  );
};

export default Account;
