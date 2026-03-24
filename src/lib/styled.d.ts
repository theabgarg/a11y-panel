import 'styled-components';
import { WidgetTheme } from './components/AccessibilityWidget';

declare module 'styled-components' {
  export interface DefaultTheme extends WidgetTheme {}
}
