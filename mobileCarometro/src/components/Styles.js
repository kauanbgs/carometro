import styled from 'styled-components/native';
import { Platform } from 'react-native';

const styles = {
  header: styled.View`
    padding-top: 20px;
    height: 150px;
    flex-direction: row;
    margin-top: 30px;
  `,

  botaosidebar: styled.View`
    flex: 1;
    justify-content: flex-start;
    margin-left: 20px;
    margin-top: 30px;
  `,

  logo: styled.Image.attrs({
    resizeMode: 'contain',
  })`
    width: 150px;
    height: 70px;
    margin-left: 10px;
    margin-top: 15px;
    margin-right: 15px;
  `,

  overlay: styled.View`
    flex: 1;
    flex-direction: row;
    background-color: rgba(0,0,0,0.4);
  `,

  sidebar: styled.View.attrs({
    style: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
    }),
  })`
    width: 290px;
    height: 100%;
    background-color: #f5f5f5;
    padding-top: 50px;
    padding-horizontal: 20px;
    elevation: 10;
  `,

  menu: styled.View`
    flex: 1;
    margin-top: 60px;
  `,

  sectionLabel: styled.Text`
    font-size: 13px;
    font-weight: 700;
    color: #1a73c8;
    letter-spacing: 1px;
    margin-top: 8px;
    margin-bottom: 6px;
    margin-left: 4px;
  `,

  menuItem: styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    padding: 12px 4px;
  `,

  menuText: styled.Text`
    font-size: 16px;
    color: #222;
    margin-left: 14px;
  `,

  linhaFinaPreta: styled.View`
    height: 1px;
    background-color: #00000036;
    margin: 8px 0;
  `,

  overlayArea: styled.View`
    flex: 1;
  `,

  container: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 30px;
  `,

  title: styled.Text`
    font-size: 40px;
    font-weight: 100;
    margin-right: 70px;
    margin-bottom: 30px;
    color: #2957a4;
  `,

  input: styled.TextInput`
    width: 100%;
    height: 40px;
    border-bottom-width: 1px;
    margin-bottom: 20px;
    padding: 0 10px;
  `,

  buttonEntrar: styled.TouchableOpacity`
    align-items: center;
    width: 320px;
    background-color: #2957a4;
    padding: 7px;
    border-radius: 3px;
    margin-top: 20px;
  `,

  buttonText: styled.Text`
    color: white;
    font-weight: bold;
  `,

  checkbox: styled.View`
    width: 20px;
    height: 20px;
    border-width: 1px;
    border-color: #333;
  `,

  checkboxLabel: styled.Text`
    margin-left: 10px;
    color: #bababa;
    font-size: 16px;
  `,

  checkboxContainer: styled.View`
    flex-direction: row;
    align-items: center;
    margin: 10px 0;
    left: -85px;
  `,

  footer: styled.View`
    flex-direction: row;
    justify-content: center;
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
  `,

  footerText: styled.Text`
    color: #bababa;
    font-size: 16px;
  `,

  linkText: styled.Text`
    color: #333;
    font-size: 16px;
    text-decoration: underline;
    font-weight: bold;
  `,

  content: styled.View`
    flex: 1;
    padding-right: 25px;
    padding-top: 15px;
  `,

  titulo: styled.Text`
    margin-top: -20px;
    font-size: 34px;
    font-weight: 100;
  `,

  texto: styled.Text`
    margin-top: 15px;
    font-size: 20px;
  `,

  botoes: styled.View`
    align-self: flex-start;
  `,

  pickerContainer: styled.View`
    width: 100%;
    ${Platform.OS === 'ios'
      ? `
        background-color: #f2f2f7;
        border-radius: 10px;
        overflow: hidden;
      `
      : `
        border-bottom-width: 1px;
        border-bottom-color: #e0e0e0;
      `}
  `,

  picker: styled.View`
    width: 100%;
    ${Platform.OS === 'ios'
      ? `height: 150px;`
      : `height: 50px;`}
  `,

  buttonCriar: styled.TouchableOpacity`
    align-items: center;
    width: 100%;
    background-color: #2957a4;
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;
  `,
};

export default styles;