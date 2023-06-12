import React, { useContext, useEffect, useState } from 'react';
import { Components } from './styled';
import { COLORS } from '../../../utils/styled/constants';
import { AuthContext } from '../../../providers/AuthProvider/context';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import PieChart from 'react-native-pie-chart';
import { SCREEN_WIDTH } from '../../../utils/dimensions';
import { Diary } from '../../../api/types/diary';
import { apiFetch } from '../../../api';
import { format } from 'date-fns';

const Home = () => {
  // Navigation variables
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const { user } = useContext(AuthContext);

  // State to store the current diary
  const [currentDiary, setCurrentDiary] = useState<Diary | null>(null);

  // When the screen is focused, fetch the current diary
  useEffect(() => {
    if (!isFocused) {
      return;
    }

    apiFetch({
      path: '/diaries',
    }).then((response) => {
      setCurrentDiary((response as Diary[]).filter((diary) => diary.date === format(new Date(), 'yyyy-MM-dd'))?.[0]);
    });
  }, [isFocused]);

  useEffect(() => {
    console.log('currentDiary', currentDiary);
  }, [currentDiary]);

  return (
    <Components.Container>
      <Components.TextContainer>
        <Components.WelcomeText>{`Welcome, ${user?.name ?? 'User'}!`}</Components.WelcomeText>
        <Components.TargetCaloriesText>
          {(currentDiary?.total_calories ?? 0) >= (user?.target_calories ?? 1)
            ? `You have reached your target calories of ${user?.target_calories}.`
            : `You have not reached your target calories of ${user?.target_calories} yet.`}
        </Components.TargetCaloriesText>
      </Components.TextContainer>
      <Components.PieChartWrapper>
        <Components.CaloriesText offset={'27%'}>Calories</Components.CaloriesText>
        <Components.CaloriesText offset={'35%'}>{currentDiary?.total_calories ?? 0}</Components.CaloriesText>
        <PieChart
          widthAndHeight={SCREEN_WIDTH / 2}
          series={[currentDiary?.total_carbs ?? 0, currentDiary?.total_protein ?? 0, currentDiary?.total_fat ?? 1]}
          sliceColor={[COLORS.orange, COLORS.lightGreen, COLORS.blue]}
          coverRadius={0.9}
          coverFill={COLORS.black}
        />
        <Components.AdditionalInfo color={COLORS.orange} offset={'65%'}>
          {`Carbs: ${currentDiary?.total_carbs ?? 0}g`}
        </Components.AdditionalInfo>
        <Components.AdditionalInfo color={COLORS.lightGreen} offset={'72%'}>
          {`Protein: ${currentDiary?.total_protein ?? 0}g`}
        </Components.AdditionalInfo>
        <Components.AdditionalInfo color={COLORS.blue} offset={'79%'}>
          {`Fat: ${currentDiary?.total_fat ?? 0}g`}
        </Components.AdditionalInfo>
      </Components.PieChartWrapper>

      <Components.ButtonsWrapper>
        {/*@ts-ignore*/}
        <Components.Button onPress={() => navigation.navigate('Diaries')}>
          <Components.ButtonLabel>{'Diary'}</Components.ButtonLabel>
        </Components.Button>
        {/*@ts-ignore*/}
        <Components.Button onPress={() => navigation.navigate('Meals')}>
          <Components.ButtonLabel>{'Meals'}</Components.ButtonLabel>
        </Components.Button>
        {/*@ts-ignore*/}
        <Components.Button onPress={() => navigation.navigate('Products')}>
          <Components.ButtonLabel>{'Products'}</Components.ButtonLabel>
        </Components.Button>
        {/*@ts-ignore*/}
        <Components.Button onPress={() => navigation.navigate('Account')}>
          <Components.ButtonLabel>{'Account'}</Components.ButtonLabel>
        </Components.Button>
      </Components.ButtonsWrapper>
    </Components.Container>
  );
};

export default Home;
