import { Alert } from 'react-native';

export function showUnavailableAction(feature: string) {
  Alert.alert(
    `${feature} is not connected yet`,
    'This visual flow is ready, but the service integration has not been enabled. No action was taken.',
  );
}
