import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { Screen } from '../components/Screen';
import { colors, radii, spacing, typography } from '../design/theme';

const sections = [
  { title: 'Home', subtitle: 'Your day at a glance', icon: 'home-outline' as const, path: '/home' },
  { title: 'AI Companion', subtitle: 'Talk or type anytime', icon: 'sparkles-outline' as const, path: '/companion' },
  { title: 'Family', subtitle: 'Calls and shared moments', icon: 'people-outline' as const, path: '/family' },
  { title: 'My Routine', subtitle: 'Reminders and activities', icon: 'calendar-outline' as const, path: '/routine' },
  { title: 'Safety Center', subtitle: 'Contacts and emergency help', icon: 'shield-checkmark-outline' as const, path: '/safety' },
  { title: 'How-to Guides', subtitle: 'Easy digital assistance', icon: 'school-outline' as const, path: '/guides' },
  { title: 'Settings', subtitle: 'Make ElderCare yours', icon: 'settings-outline' as const, path: '/settings' },
];

export default function MoreScreen() {
  return (
    <Screen>
      <AppHeader title="More" />
      <Text style={styles.eyebrow}>ELDERCARE AI</Text>
      <Text accessibilityRole="header" style={styles.title}>Where would you like to go?</Text>
      <View style={styles.list}>
        {sections.map((section) => (
          <Pressable accessibilityLabel={`${section.title}. ${section.subtitle}`} accessibilityRole="button" key={section.path} onPress={() => router.replace(section.path)} style={styles.item}>
            <View style={styles.icon}><Ionicons color={colors.primary} name={section.icon} size={24} /></View>
            <View style={styles.copy}><Text style={styles.itemTitle}>{section.title}</Text><Text style={styles.itemSubtitle}>{section.subtitle}</Text></View>
            <Ionicons color={colors.textSoft} name="chevron-forward" size={22} />
          </Pressable>
        ))}
      </View>
      <BottomNavigation />
    </Screen>
  );
}

const styles = StyleSheet.create({
  eyebrow: { color: colors.primary, fontSize: typography.eyebrow, fontWeight: '800', letterSpacing: 1.2 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800', lineHeight: 36, marginTop: spacing.sm, marginBottom: spacing.lg },
  list: { gap: spacing.sm },
  item: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.md, borderWidth: 1, flexDirection: 'row', minHeight: 76, padding: spacing.md },
  icon: { alignItems: 'center', backgroundColor: colors.surfaceGreen, borderRadius: radii.pill, height: 44, justifyContent: 'center', width: 44 },
  copy: { flex: 1, marginHorizontal: spacing.md },
  itemTitle: { color: colors.text, fontSize: typography.body, fontWeight: '800' },
  itemSubtitle: { color: colors.textMuted, fontSize: 14, marginTop: 3 },
});
