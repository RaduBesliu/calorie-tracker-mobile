import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Components } from './styled';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../../../api/types/product';
import { COLORS } from '../../../utils/styled/constants';
import { apiFetch } from '../../../api';
import _ from 'lodash';
import InputComponent from '../../../components/InputComponent';
import { FlatList } from 'react-native';
import { DiaryProductBody } from '../../../api/types/diary';
import { format } from 'date-fns';
import { Meal } from '../../../api/types/meal';

const CreateDiary = () => {
  const navigation = useNavigation();

  const [diaryProducts, setDiaryProducts] = useState<Product[]>([]);
  const [diaryProductsBody, setDiaryProductsBody] = useState<DiaryProductBody[]>([]);

  const [name, setName] = useState('');
  const [quantityGrams, setQuantityGrams] = useState('');

  const [products, setProducts] = useState<Product[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);

  const [searchProductsTerm, setSearchProductsTerm] = useState('');
  const searchProductsTermRef = useRef('');

  const [searchMealsTerm, setSearchMealsTerm] = useState('');
  const searchMealsTermRef = useRef('');

  useEffect(() => {
    apiFetch({
      path: '/meals',
    }).then((data) => {
      setMeals(data);
    });
  }, []);

  useEffect(() => {
    console.log('diaryProducts', diaryProducts);
  }, [diaryProducts]);

  useEffect(() => {
    console.log('diaryProductsBody', diaryProductsBody);
  }, [diaryProductsBody]);

  useEffect(() => {
    console.log('products', products);
  }, [products]);

  useEffect(() => {
    console.log('meals', meals);
  }, [meals]);

  useEffect(() => {
    console.log('filteredMeals', filteredMeals);
  }, [filteredMeals]);

  const _onAddDiary = async () => {
    console.log({
      date: format(new Date(), 'yyyy-MM-dd'),
      products: diaryProductsBody,
    });
    apiFetch({
      path: `/diary`,
      method: 'POST',
      body: {
        date: format(new Date(), 'yyyy-MM-dd'),
        products: diaryProductsBody,
      },
    }).then((res) => {
      console.log(res);
      navigation.goBack();
    });
  };

  const onDebouncedProductsSearch = async () => {
    apiFetch({
      path: `/product/search/${searchProductsTermRef.current.toLowerCase()}`,
    }).then((data) => {
      setProducts(data?.products);
    });
  };

  const onDebouncedMealsSearch = async () => {
    if (searchMealsTermRef.current.trim() === '') {
      setFilteredMeals([] as Meal[]);
      return;
    }

    setFilteredMeals(
      meals.filter((meal) => {
        return meal.name.toLowerCase().includes(searchMealsTermRef.current.trim().toLowerCase());
      }),
    );
  };

  const searchProductsHandler = useCallback(_.debounce(onDebouncedProductsSearch, 1000), []);

  const searchMealsHandler = useCallback(_.debounce(onDebouncedMealsSearch, 1000), []);

  const onSearchProducts = async (text: string) => {
    setSearchProductsTerm(text);
    searchProductsTermRef.current = text;
    await searchProductsHandler();
  };

  const onSearchMeals = async (text: string) => {
    setSearchMealsTerm(text);
    searchMealsTermRef.current = text;
    await searchMealsHandler();
  };

  const _onAddProductToDiary = async (product: Product) => {
    const diaryProductBody: DiaryProductBody = {
      product_id: product.id,
      quantity_grams: parseInt(quantityGrams) || 100,
    };

    setDiaryProducts([...diaryProducts, product]);
    setDiaryProductsBody([...diaryProductsBody, diaryProductBody]);
    setSearchProductsTerm('');
    setProducts([] as Product[]);
  };

  const _onRemoveProductFromDiary = async (product: Product) => {
    setDiaryProducts(diaryProducts.filter((diaryProduct) => diaryProduct.id !== product.id));
    setDiaryProductsBody(diaryProductsBody.filter((diaryProduct) => diaryProduct.product_id !== product.id));
  };

  const _onAddMealToDiary = async (meal: Meal) => {};

  const _renderAllProductsItem = useCallback(
    ({ item }: { item: Product }) => {
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
          <Components.ButtonsWrapper>
            {diaryProducts.find((diaryProduct) => diaryProduct.id === item.id) === undefined ? (
              <Components.Button color={COLORS.green} onPress={() => _onAddProductToDiary(item)}>
                <Components.ButtonLabel>Add</Components.ButtonLabel>
              </Components.Button>
            ) : (
              <Components.Button color={COLORS.red} onPress={() => _onRemoveProductFromDiary(item)}>
                <Components.ButtonLabel>Remove</Components.ButtonLabel>
              </Components.Button>
            )}
          </Components.ButtonsWrapper>
        </Components.ItemCell>
      );
    },
    [diaryProducts, diaryProductsBody, quantityGrams],
  );

  const _renderAllMeals = useCallback(
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
            <Components.Button color={COLORS.green} onPress={() => _onAddMealToDiary(item)}>
              <Components.ButtonLabel>Add All</Components.ButtonLabel>
            </Components.Button>
          </Components.ButtonsWrapper>
        </Components.ItemCell>
      );
    },
    [meals],
  );

  const _renderDiaryProductsItem = useCallback(
    ({ item }: { item: Product }) => {
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
          <Components.ButtonsWrapper>
            <Components.Button color={COLORS.red} onPress={() => _onRemoveProductFromDiary(item)}>
              <Components.ButtonLabel>Remove</Components.ButtonLabel>
            </Components.Button>
          </Components.ButtonsWrapper>
        </Components.ItemCell>
      );
    },
    [diaryProductsBody, diaryProducts],
  );

  return (
    <Components.Container>
      {searchMealsTerm.trim() === '' && searchProductsTerm.trim() === '' && (
        <InputComponent label={'Name'} placeholder={'Name...'} value={name} setValue={setName} />
      )}
      {filteredMeals?.length === 0 && (
        <InputComponent
          label={'Quantity in grams'}
          placeholder={'Quantity in grams...'}
          value={quantityGrams}
          setValue={setQuantityGrams}
        />
      )}
      {searchProductsTerm.trim() === '' && (
        <InputComponent
          label={'Search for meals'}
          placeholder={'Search...'}
          value={searchMealsTerm}
          setValue={onSearchMeals}
        />
      )}

      {searchMealsTerm.trim() === '' && (
        <InputComponent
          label={'Search for products'}
          placeholder={'Search...'}
          value={searchProductsTerm}
          setValue={onSearchProducts}
        />
      )}
      <FlatList data={products} renderItem={_renderAllProductsItem} keyExtractor={(item) => item.id} />
      <FlatList data={filteredMeals} renderItem={_renderAllMeals} keyExtractor={(item) => item.id} />
      {products?.length === 0 && diaryProducts?.length !== 0 && filteredMeals?.length === 0 && (
        <>
          <Components.ButtonsWrapper>
            <Components.Button color={COLORS.green} onPress={_onAddDiary}>
              <Components.ButtonLabel>Add Diary</Components.ButtonLabel>
            </Components.Button>
          </Components.ButtonsWrapper>
          <FlatList data={diaryProducts} renderItem={_renderDiaryProductsItem} keyExtractor={(item) => item.id} />
        </>
      )}
    </Components.Container>
  );
};

export default CreateDiary;
