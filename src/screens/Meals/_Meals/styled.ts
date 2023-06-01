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
    width: 85%;
    background-color: ${COLORS.brown};
    margin-vertical: 24px;
    border-radius: 8px;
    padding: 16px;
    margin-left: 10px;
  `,

  ItemCellDetails: styled.View``,

  ItemCellFieldTitle: styled.Text`
    color: ${COLORS.black};
    font-size: 24px;
    font-weight: bold;
    text-transform: capitalize;
  `,

  ItemCellFieldDescription: styled.Text`
    color: ${COLORS.black};
    font-size: 20px;
    margin-bottom: 8px;
  `,

  ButtonsWrapper: styled.View`
    margin-top: 16px;
    width: 100%;
    height: 48px;
    flex-direction: row;
    justify-content: space-around;
  `,

  Button: styled.TouchableOpacity<{ color: string }>`
    width: 40%;
    background-color: ${(props) => props.color};
    align-items: center;
    justify-content: center;
    padding-vertical: 8px;
    border-radius: 8px;
  `,

  ButtonLabel: styled.Text`
    color: ${COLORS.black};
    font-size: 20px;
    font-weight: bold;
  `,
};
