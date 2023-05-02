import styled from 'styled-components/native';
import { COLORS } from '../../../utils/styled/constants';

export const Components = {
  Container: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${COLORS.black};
  `,

  Button: styled.TouchableOpacity`
    width: 50%;
    height: 40px;
    flex-direction: row;
    gap: 4px;
    background-color: ${COLORS.red};
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  `,

  ButtonLabel: styled.Text`
    font-size: 20px;
    font-weight: bold;
  `,

  Text: styled.Text`
    font-size: 20px;
    color: ${COLORS.gray};
  `,
};
