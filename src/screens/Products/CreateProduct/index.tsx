import React, { useEffect, useState } from 'react';
import { Components } from './styled';
import InputComponent from '../../../components/InputComponent';
import { COLORS } from '../../../utils/styled/constants';
import { apiFetch } from '../../../api';
import { useNavigation } from '@react-navigation/native';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [fat, setFat] = useState('');
  const [carbs, setCarbs] = useState('');
  const [protein, setProtein] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (name.trim() && calories.trim() && fat.trim() && carbs.trim() && protein.trim()) {
      setIsFormValid(true);
      return;
    }

    setIsFormValid(false);
  }, [name, calories, fat, carbs, protein]);

  const addProduct = () => {
    console.log({
      body: {
        name,
        calories: Number(calories),
        fat: Number(fat),
        carbs: Number(carbs),
        protein: Number(protein),
      },
    });
    apiFetch({
      path: `/product`,
      method: 'POST',
      body: {
        name: 'test',
        calories: 10,
        fat: 20,
        carbs: 30,
        protein: 40,
      },
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <Components.Container>
      <InputComponent label={'Name'} placeholder={'Name'} value={name} setValue={setName} />
      <InputComponent label={'Calories'} placeholder={'Calories'} value={calories} setValue={setCalories} />
      <InputComponent label={'Fat'} placeholder={'Fat'} value={fat} setValue={setFat} />
      <InputComponent label={'Carbs'} placeholder={'Carbs'} value={carbs} setValue={setCarbs} />
      <InputComponent label={'Protein'} placeholder={'Protein'} value={protein} setValue={setProtein} />
      <Components.ButtonsWrapper>
        {isFormValid && (
          <Components.Button color={COLORS.green} onPress={addProduct}>
            <Components.ButtonLabel>Add</Components.ButtonLabel>
          </Components.Button>
        )}
      </Components.ButtonsWrapper>
    </Components.Container>
  );
};

export default CreateProduct;
