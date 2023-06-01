import styled from 'styled-components/native';
import { COLORS } from '../../../utils/styled/constants';

export const Components = {
  Container: styled.View`
    flex: 1;
    background-color: ${COLORS.black};
    justify-content: center;
    align-items: center;
  `,

  Text: styled.Text`
    font-size: 30px;
    color: ${COLORS.green};
    font-weight: bold;
  `,

  Button: styled.TouchableOpacity`
    width: 50%;
    height: 40px;
    flex-direction: row;
    gap: 4px;
    background-color: ${COLORS.green};
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin-bottom: 24px;
  `,

  ButtonLabel: styled.Text`
    font-size: 20px;
    font-weight: bold;
  `,
};
