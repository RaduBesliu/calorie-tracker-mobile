import React, { useCallback, useEffect, useState } from 'react';
import { Components } from './styled';
import { COLORS } from '../../../utils/styled/constants';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { apiFetch } from '../../../api';
import { Product } from '../../../api/types/product';
import { FlatList } from 'react-native';
import { Diary } from '../../../api/types/diary';
import { format } from 'date-fns';

const Diaries = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    console.log(isFocused);
    if (!isFocused) {
      return;
    }

    apiFetch({
      path: '/diaries',
    }).then((data) => {
      console.log(data);
      setDiaries(data.filter((diary: Diary) => diary.date === format(new Date(), 'yyyy-MM-dd')));
    });
  }, [isFocused]);

  useEffect(() => {
    console.log('diaries', diaries);
  }, [diaries]);

  const navigateToCreateDiary = () => {
    // @ts-ignore
    navigation.navigate('Create Diary');
  };

  const _deleteDiary = async (diary: Diary) => {
    await apiFetch({
      path: `/diary/${diary.id}`,
      method: 'DELETE',
    });

    setDiaries(diaries.filter((item) => item.id !== diary.id));
  };

  const _renderItem = useCallback(
    ({ item }: { item: Diary }) => {
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
            <Components.Button color={COLORS.red} onPress={() => _deleteDiary(item)}>
              <Components.ButtonLabel>Delete</Components.ButtonLabel>
            </Components.Button>
          </Components.ButtonsWrapper>
        </Components.ItemCell>
      );
    },
    [diaries],
  );

  return (
    <Components.Container>
      {diaries.length == 0 && (
        <Components.ButtonsWrapper>
          <Components.Button color={COLORS.green} onPress={() => navigateToCreateDiary()}>
            <Components.ButtonLabel>{'Create diary'}</Components.ButtonLabel>
          </Components.Button>
        </Components.ButtonsWrapper>
      )}
      <Components.CreateDiaryText>
        {diaries.length > 0 ? 'Your diary' : 'You have no diary yet'}
      </Components.CreateDiaryText>
      <FlatList data={diaries} renderItem={_renderItem} keyExtractor={(item) => item.id} />
    </Components.Container>
  );
};

export default Diaries;
