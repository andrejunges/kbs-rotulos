import * as colorsMUI from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import colors from './colors'

module.exports = {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: colorsMUI.blue200,
    primary2Color: colorsMUI.grey400,
    primary3Color: colorsMUI.lightBlack,

    accent1Color: colorsMUI.indigo700, //'#333',//colors.white,
    accent2Color: colorsMUI.grey100,
    accent3Color: colorsMUI.grey500,
    textColor: colorsMUI.darkBlack,
    alternateTextColor: colorsMUI.white,
    canvasColor: colorsMUI.white,
    borderColor: colorsMUI.grey300,
    disabledColor: fade(colorsMUI.darkBlack, 0.3),

    green: colorsMUI.green500,
  },
};
