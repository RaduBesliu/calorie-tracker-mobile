import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Components } from './styled';
import _ from 'lodash';
import { Product } from '../../../api/types/product';
import { FlatList, TextInput } from 'react-native';
import { apiFetch } from '../../../api';
import InputComponent from '../../../components/InputComponent';
import { COLORS } from '../../../utils/styled/constants';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchTermRef = useRef('');

  const onDebouncedSearch = async () => {
    console.log(searchTerm);
    apiFetch({
      path: `/product/search/${searchTermRef.current.toLowerCase()}`,
    }).then((data) => {
      setProducts(data?.products);
    });
  };

  const searchHandler = useCallback(_.debounce(onDebouncedSearch, 1000), []);

  const onSearch = async (text: string) => {
    setSearchTerm(text);
    searchTermRef.current = text;
    await searchHandler();
  };

  const _onUpvote = async (item: Product) => {
    await apiFetch({
      path: `/product/${item.id}`,
      method: 'PUT',
      body: {
        upvotes: item.upvotes + 1,
      },
    });

    await onDebouncedSearch();
  };

  const _onDownvote = async (item: Product) => {
    await apiFetch({
      path: `/product/${item.id}`,
      method: 'PUT',
      body: {
        downvotes: item.downvotes + 1,
      },
    });

    await onDebouncedSearch();
  };

  const _renderItem = useCallback(({ item }: { item: Product }) => {
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
          <Components.Button color={COLORS.green} onPress={() => _onUpvote(item)}>
            <Components.ButtonLabel>Upvote</Components.ButtonLabel>
          </Components.Button>
          <Components.Button color={COLORS.red} onPress={() => _onDownvote(item)}>
            <Components.ButtonLabel>Downvote</Components.ButtonLabel>
          </Components.Button>
        </Components.ButtonsWrapper>
      </Components.ItemCell>
    );
  }, []);

  return (
    <Components.Container>
      <InputComponent label={'Search for products'} placeholder={'Search...'} value={searchTerm} setValue={onSearch} />
      <FlatList data={products} renderItem={_renderItem} />
    </Components.Container>
  );
};

export default Products;
