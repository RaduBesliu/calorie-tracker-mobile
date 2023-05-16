import styled from 'styled-components/native';
import { COLORS } from '../../../utils/styled/constants';

export const Components = {
  Container: styled.View`
    flex: 1;
    background-color: ${COLORS.black};
    align-items: center;
  `,

  Label: styled.Text`
    color: ${COLORS.green};
    font-weight: bold;
    font-size: 24px;
  `,

  ItemCell: styled.View`
    width: 90%;
    background-color: ${COLORS.brown};
    margin-top: 24px;
    border-radius: 8px;
    padding: 16px;
    margin-left: 16px;
  `,

  ItemCellText: styled.Text`
    color: ${COLORS.black};
    font-size: 18px;
  `,

  ButtonsWrapper: styled.View`
    margin-top: 16px;
    width: 100%;
    height: 48px;
    flex-direction: row;
    justify-content: center;
    background-color: red;
  `,

  Button: styled.TouchableOpacity<{ color: string }>`
    width: 50%;
    background-color: ${(props) => props.color};
    align-items: center;
    justify-content: center;
    padding-vertical: 8px;
  `,

  ButtonLabel: styled.Text`
    color: ${COLORS.black};
    font-size: 20px;
    font-weight: bold;
  `,
};
