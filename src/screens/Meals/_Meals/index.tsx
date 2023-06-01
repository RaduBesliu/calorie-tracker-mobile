import React, { useCallback, useEffect, useState } from 'react';
import { Components } from './styled';
import { COLORS } from '../../../utils/styled/constants';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Meal } from '../../../api/types/meal';
import { apiFetch } from '../../../api';
import { Product } from '../../../api/types/product';
import { FlatList } from 'react-native';

const Meals = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    console.log(isFocused);
    if (!isFocused) {
      return;
    }

    apiFetch({
      path: '/meals',
    }).then((data) => {
      console.log(data);
      setMeals(data);
    });
  }, [isFocused]);

  useEffect(() => {
    console.log('meals', meals);
  }, [meals]);

  const navigateToCreateMeal = () => {
    // @ts-ignore
    navigation.navigate('Create Meal');
  };

  const _deleteMeal = async (meal: Meal) => {
    await apiFetch({
      path: `/meal/${meal.id}`,
      method: 'DELETE',
    });

    setMeals(meals.filter((item) => item.id !== meal.id));
  };

  const _renderItem = useCallback(
    ({ item }: { item: Meal }) => {
      return (
        <Components.ItemCell>
          {Object.keys(item).map((key) => {
            if (key === 'id') {
              return null;
            }

            return (
              <Components.ItemCellDetails>
                <Components.ItemCellFieldTitle key={item.id + key}>{key}</Components.ItemCellFieldTitle>
                <Components.ItemCellFieldDescription key={item.id + key + 'value'}>
                  {/*@ts-ignore*/}
                  {key !== 'products' ? item[key] : item[key].map((product: Product) => product.name).join(', ')}
                </Components.ItemCellFieldDescription>
              </Components.ItemCellDetails>
            );
          })}
          <Components.ButtonsWrapper>
            <Components.Button color={COLORS.red} onPress={() => _deleteMeal(item)}>
              <Components.ButtonLabel>Delete</Components.ButtonLabel>
            </Components.Button>
          </Components.ButtonsWrapper>
        </Components.ItemCell>
      );
    },
    [meals],
  );

  return (
    <Components.Container>
      <Components.ButtonsWrapper>
        <Components.Button color={COLORS.green} onPress={() => navigateToCreateMeal()}>
          <Components.ButtonLabel>Create meal</Components.ButtonLabel>
        </Components.Button>
      </Components.ButtonsWrapper>
      <FlatList data={meals} renderItem={_renderItem} keyExtractor={(item) => item.id} />
    </Components.Container>
  );
};

export default Meals;
