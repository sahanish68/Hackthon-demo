import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../design/theme';

const items = [
  { label: 'Home', path: '/home', icon: 'home-outline' as const },
  { label: 'Family', path: '/family', icon: 'people-outline' as const },
  { label: 'Routine', path: '/routine', icon: 'calendar-outline' as const },
  { label: 'More', path: '/more', icon: 'grid-outline' as const },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <View accessibilityRole="tablist" style={styles.container}>
      {items.map((item) => {
        const selected = pathname === item.path;
        return (
          <Pressable
            accessibilityLabel={item.label}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            key={item.path}
            onPress={() => router.replace(item.path)}
            style={styles.item}
          >
            <Ionicons
              color={selected ? colors.primary : colors.textSoft}
              name={item.icon}
              size={24}
            />
            <Text style={[styles.label, selected && styles.selectedLabel]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    left: 0,
    paddingBottom: spacing.sm,
    paddingTop: spacing.sm,
    position: 'absolute',
    right: 0,
  },
  item: {
    alignItems: 'center',
    minHeight: 52,
    justifyContent: 'center',
    minWidth: 68,
  },
  label: {
    color: colors.textSoft,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },
  selectedLabel: {
    color: colors.primary,
  },
});
