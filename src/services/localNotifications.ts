export async function scheduleLocalReminder(title: string, body: string): Promise<void> {
  const Notifications = await import('expo-notifications');
  const permissions = await Notifications.getPermissionsAsync();
  const status =
    permissions.status === 'granted'
      ? permissions.status
      : (await Notifications.requestPermissionsAsync()).status;

  if (status !== 'granted') {
    throw new Error('Notification permission was not granted.');
  }

  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null,
  });
}
