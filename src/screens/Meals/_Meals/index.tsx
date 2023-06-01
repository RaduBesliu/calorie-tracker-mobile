import React, { useCallback, useEffect, useState } from 'react';
import { Components } from './styled';
import { COLORS } from '../../../utils/styled/constants';
import { useNavigation } from '@react-navigation/native';
import { Meal } from '../../../api/types/meal';
import { apiFetch } from '../../../api';
import { Product } from '../../../api/types/product';
import { FlatList } from 'react-native';

const Meals = () => {
  const navigation = useNavigation();

  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    apiFetch({
      path: '/meals',
    }).then((data) => {
      console.log(data);
      setMeals(data?.meals);
    });
  }, []);

  const navigateToCreateMeal = () => {};

  const _renderItem = useCallback(({ item }: { item: Meal }) => {
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
                {item[key]}
              </Components.ItemCellFieldDescription>
            </Components.ItemCellDetails>
          );
        })}
      </Components.ItemCell>
    );
  }, []);

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
