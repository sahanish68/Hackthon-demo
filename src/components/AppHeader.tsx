import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/theme';

type AppHeaderProps = {
  title: string;
  showMenu?: boolean;
  onMenuPress?: () => void;
};

export function AppHeader({ title, showMenu = true, onMenuPress }: AppHeaderProps) {
  return (
    <View style={styles.header}>
      {showMenu ? (
        <Pressable
          accessibilityLabel="Open all sections"
          accessibilityRole="button"
          hitSlop={8}
          onPress={onMenuPress ?? (() => router.push('/more'))}
          style={styles.iconButton}
        >
          <Ionicons color={colors.text} name="menu-outline" size={28} />
        </Pressable>
      ) : (
        <View style={styles.iconButton} />
      )}
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      <Pressable
        accessibilityLabel="Use dark theme"
        accessibilityRole="button"
        hitSlop={8}
        onPress={() => router.push('/settings')}
        style={styles.iconButton}
      >
        <Ionicons color={colors.primary} name="sunny-outline" size={23} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: typography.bodyLarge,
    fontWeight: '700',
  },
  iconButton: {
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
});
