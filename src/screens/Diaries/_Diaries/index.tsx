import React, { useCallback, useEffect, useState } from 'react';
import { Components } from './styled';
import { COLORS } from '../../../utils/styled/constants';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { apiFetch } from '../../../api';
import { Product } from '../../../api/types/product';
import { FlatList } from 'react-native';
import { Diary } from '../../../api/types/diary';
import { format } from 'date-fns';
import InputComponent from '../../../components/InputComponent';

const Diaries = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [allDiaries, setAllDiaries] = useState<Diary[]>([]);
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [filteredDiaries, setFilteredDiaries] = useState<Diary[]>([]);
  const [searchedDate, setSearchedDate] = useState<string | undefined>();

  useEffect(() => {
    console.log(isFocused);
    if (!isFocused) {
      return;
    }

    apiFetch({
      path: '/diaries',
    }).then((data) => {
      setAllDiaries(data);
      setDiaries(data.filter((diary: Diary) => diary.date === format(new Date(), 'yyyy-MM-dd')));
    });
  }, [isFocused]);

  useEffect(() => {
    console.log('diaries', diaries);
  }, [diaries]);

  useEffect(() => {
    console.log('filteredDiaries', filteredDiaries);
  }, [filteredDiaries]);

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
    setFilteredDiaries(filteredDiaries.filter((item) => item.id !== diary.id));
  };

  const _onDateActionPress = async () => {
    if (filteredDiaries.length > 0) {
      setFilteredDiaries([]);
      setSearchedDate(undefined);
      return;
    }

    setFilteredDiaries(allDiaries.filter((diary: Diary) => diary.date === searchedDate?.trim()) ?? []);
  };

  const _renderItem = useCallback(
    ({ item }: { item: Diary }) => {
      return (
        <Components.ItemCell>
          <Components.Label>
            {item?.date === format(new Date(), 'yyyy-MM-dd') ? "Today's Diary" : `Diary from ${item?.date}`}
          </Components.Label>
          <Components.ItemCellFieldDescription
            color={COLORS.orange}>{`Carbs: ${item.total_carbs}g`}</Components.ItemCellFieldDescription>
          <Components.ItemCellFieldDescription
            color={COLORS.lightGreen}>{`Protein: ${item.total_protein}g`}</Components.ItemCellFieldDescription>
          <Components.ItemCellFieldDescription
            color={COLORS.blue}>{`Fat: ${item.total_fat}g`}</Components.ItemCellFieldDescription>
          <Components.ItemCellFieldDescription color={COLORS.green}>{`Products: ${item.products
            .map((product: Product) => product.name)
            .join(' | ')}`}</Components.ItemCellFieldDescription>
          <Components.ButtonsWrapper hasMinwidth={true}>
            <Components.Button color={COLORS.red} onPress={() => _deleteDiary(item)}>
              <Components.ButtonLabel>Remove</Components.ButtonLabel>
            </Components.Button>
          </Components.ButtonsWrapper>
        </Components.ItemCell>
      );
    },
    [diaries, filteredDiaries],
  );

  return (
    <Components.Container>
      <Components.ButtonsWrapper>
        <Components.Button color={COLORS.green} onPress={() => _onDateActionPress()}>
          <Components.ButtonLabel>{filteredDiaries.length > 0 ? 'Reset' : 'Search'}</Components.ButtonLabel>
        </Components.Button>
      </Components.ButtonsWrapper>
      <InputComponent
        label={'Date search'}
        placeholder={'2023-06-15'}
        value={searchedDate}
        setValue={setSearchedDate}
      />
      {filteredDiaries.length > 0 ? (
        <FlatList data={filteredDiaries} renderItem={_renderItem} keyExtractor={(item) => item.id} />
      ) : (
        <>
          {diaries.length == 0 && (
            <Components.ButtonsWrapper>
              <Components.Button color={COLORS.green} onPress={() => navigateToCreateDiary()}>
                <Components.ButtonLabel>{'Create diary'}</Components.ButtonLabel>
              </Components.Button>
            </Components.ButtonsWrapper>
          )}
          <Components.CreateDiaryText>
            {diaries.length > 0 ? 'Your diary for today' : 'You have no diary for today'}
          </Components.CreateDiaryText>
          <FlatList data={diaries} renderItem={_renderItem} keyExtractor={(item) => item.id} />
        </>
      )}
    </Components.Container>
  );
};

export default Diaries;
