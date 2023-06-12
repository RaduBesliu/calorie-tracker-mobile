import React, { useCallback, useRef, useState } from 'react';
import { Components } from './styled';
import _ from 'lodash';
import { Product } from '../../../api/types/product';
import { FlatList } from 'react-native';
import { apiFetch } from '../../../api';
import InputComponent from '../../../components/InputComponent';
import { COLORS } from '../../../utils/styled/constants';
import { useNavigation } from '@react-navigation/native';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Products = () => {
  // Navigation hooks
  const navigation = useNavigation();

  // Product related hooks
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchTermRef = useRef('');

  const navigateToCreateProduct = () => {
    // @ts-ignore
    navigation.navigate('Create Product');
  };

  // Search for products
  const onDebouncedSearch = async () => {
    console.log(searchTerm);
    apiFetch({
      path: `/product/search/${searchTermRef.current.toLowerCase()}`,
    }).then((data) => {
      setProducts(data?.products ?? ([] as Product[]));
    });
  };

  // Handler for debounced search ( 1000ms )
  const searchHandler = useCallback(_.debounce(onDebouncedSearch, 1000), []);

  // Set search term on input change
  const onSearch = async (text: string) => {
    setSearchTerm(text);
    searchTermRef.current = text;
    await searchHandler();
  };

  // Check if product should be deleted
  const checkVotes = async (item: Product) => {
    if (item.downvotes - item.upvotes >= 9) {
      await apiFetch({
        path: `/product/${item.id}`,
        method: 'DELETE',
        isAdmin: true,
      });
    }
  };

  // Upvote product
  const _onUpvote = async (item: Product) => {
    await apiFetch({
      path: `/product/${item.id}`,
      method: 'PUT',
      body: {
        upvotes: item.upvotes + 1,
      },
    });

    await checkVotes(item);
    await onDebouncedSearch();
  };

  // Downvote product
  const _onDownvote = async (item: Product) => {
    await apiFetch({
      path: `/product/${item.id}`,
      method: 'PUT',
      body: {
        downvotes: item.downvotes + 1,
      },
    });

    await checkVotes(item);
    await onDebouncedSearch();
  };

  // Render function for FlatList
  const _renderItem = useCallback(({ item }: { item: Product }) => {
    return (
      <Components.ItemCell>
        <Components.Label>{item.name}</Components.Label>
        <Components.ItemCellFieldDescription
          color={COLORS.orange}>{`Carbs: ${item.carbs}g`}</Components.ItemCellFieldDescription>
        <Components.ItemCellFieldDescription
          color={COLORS.lightGreen}>{`Protein: ${item.protein}g`}</Components.ItemCellFieldDescription>
        <Components.ItemCellFieldDescription
          color={COLORS.blue}>{`Fat: ${item.fat}g`}</Components.ItemCellFieldDescription>
        <Components.ButtonsWrapper>
          <Components.ItemCellFieldDescription color={item.upvotes - item.downvotes >= 0 ? COLORS.green : COLORS.red}>
            Likes: {item.upvotes - item.downvotes}
          </Components.ItemCellFieldDescription>
          <Components.ItemCellDetails>
            <Components.Button onPress={() => _onUpvote(item)}>
              <FontAwesomeIcon icon={faThumbsUp} size={20} color={COLORS.white} />
            </Components.Button>
            <Components.Button onPress={() => _onDownvote(item)}>
              <FontAwesomeIcon icon={faThumbsDown} size={20} color={COLORS.white} />
            </Components.Button>
          </Components.ItemCellDetails>
        </Components.ButtonsWrapper>
      </Components.ItemCell>
    );
  }, []);

  return (
    <Components.Container>
      {products.length === 0 && (
        <Components.ButtonsWrapper>
          <Components.CreateButton onPress={() => navigateToCreateProduct()}>
            <Components.ButtonLabel>Create product</Components.ButtonLabel>
          </Components.CreateButton>
        </Components.ButtonsWrapper>
      )}
      <InputComponent label={'Search for products'} placeholder={'Search...'} value={searchTerm} setValue={onSearch} />
      <FlatList data={products} renderItem={_renderItem} keyExtractor={(item) => item.id} />
    </Components.Container>
  );
};

export default Products;
