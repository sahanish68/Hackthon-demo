import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { Screen } from '../components/Screen';
import { SectionHeading } from '../components/SectionHeading';
import { colors, radii, spacing, typography } from '../design/theme';
import { useState } from 'react';

const routine = [
  { time: '8:00 AM', title: 'Morning walk', subtitle: '20 minutes in the garden', icon: 'walk-outline' as const, complete: true },
  { time: '9:00 AM', title: 'Morning medicine', subtitle: '1 tablet after breakfast', icon: 'medical-outline' as const, complete: false },
  { time: '1:00 PM', title: 'Drink water', subtitle: 'One full glass', icon: 'water-outline' as const, complete: false },
  { time: '6:30 PM', title: 'Evening medicine', subtitle: '1 tablet with dinner', icon: 'medical-outline' as const, complete: false },
];

export default function RoutineScreen() {
  const [completedItems, setCompletedItems] = useState(() => new Set(routine.filter((item) => item.complete).map((item) => item.title)));
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const completedCount = completedItems.size;

  function toggleRoutineItem(title: string) {
    setCompletedItems((current) => {
      const next = new Set(current);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  }

      function toggleActivity(title: string) {
        setCompletedActivities((current) => {
          const next = new Set(current);
          if (next.has(title)) {
            next.delete(title);
          } else {
            next.add(title);
          }
          return next;
        });
      }

  return (
    <Screen>
      <AppHeader title="My Routine" />
      <Text style={styles.date}>MONDAY, 24 JUNE</Text>
      <Text accessibilityRole="header" style={styles.title}>My daily routine</Text>
      <Text style={styles.subtitle}>A gentle plan for a healthy, happy day.</Text>
      <View style={styles.progressCard}>
        <Text style={styles.progressLabel}>Today’s progress</Text>
        <Text style={styles.progressValue}>{completedCount} of {routine.length} complete</Text>
      </View>
      <View style={styles.timeline}>
        {routine.map((item) => (
          <Pressable
            accessibilityLabel={`${item.title}. ${completedItems.has(item.title) ? 'Completed' : 'Not completed'}`}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: completedItems.has(item.title) }}
            key={`${item.time}-${item.title}`}
            onPress={() => toggleRoutineItem(item.title)}
            style={styles.routineItem}
          >
            <Text style={styles.time}>{item.time}</Text>
            <View style={[styles.icon, completedItems.has(item.title) && styles.completeIcon]}>
              <Ionicons color={completedItems.has(item.title) ? colors.white : colors.primary} name={item.icon} size={22} />
            </View>
            <View style={styles.itemCopy}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons color={completedItems.has(item.title) ? colors.primary : colors.border} name={completedItems.has(item.title) ? 'checkmark-circle' : 'ellipse-outline'} size={25} />
          </Pressable>
        ))}
      </View>
      <SectionHeading eyebrow="FOR YOU" title="Feel good activities" />
      <Activity completed={completedActivities.has('Gentle exercise')} onPress={() => toggleActivity('Gentle exercise')} title="Gentle exercise" subtitle="10 min · Chair yoga" icon="fitness-outline" />
      <Activity completed={completedActivities.has('Brain games')} onPress={() => toggleActivity('Brain games')} title="Brain games" subtitle="Daily word puzzle" icon="extension-puzzle-outline" />
      <Activity completed={completedActivities.has('Hobby idea')} onPress={() => toggleActivity('Hobby idea')} title="Hobby idea" subtitle="Try watercolor leaves" icon="color-palette-outline" />
      <BottomNavigation />
    </Screen>
  );
}

function Activity({ title, subtitle, icon, completed, onPress }: { title: string; subtitle: string; icon: keyof typeof Ionicons.glyphMap; completed: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityLabel={`${title}. ${completed ? 'Completed' : 'Not completed'}`} accessibilityRole="checkbox" accessibilityState={{ checked: completed }} onPress={onPress} style={styles.activity}>
      <View style={styles.activityIcon}><Ionicons color={colors.primary} name={icon} size={24} /></View>
      <View style={styles.itemCopy}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons color={completed ? colors.primary : colors.textSoft} name={completed ? 'checkmark-circle' : 'chevron-forward'} size={21} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  date: { color: colors.primary, fontSize: typography.eyebrow, fontWeight: '800', letterSpacing: 1 },
  title: { color: colors.text, fontSize: typography.title, fontWeight: '800', marginTop: spacing.sm },
  subtitle: { color: colors.textMuted, fontSize: typography.bodyLarge, lineHeight: 26, marginTop: spacing.sm, marginBottom: spacing.lg },
  progressCard: { backgroundColor: colors.primarySoft, borderRadius: radii.md, flexDirection: 'row', justifyContent: 'space-between', padding: spacing.md, marginBottom: spacing.lg },
  progressLabel: { color: colors.primaryDark, fontSize: typography.body, fontWeight: '600' },
  progressValue: { color: colors.primaryDark, fontSize: typography.body, fontWeight: '800' },
  timeline: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.md, borderWidth: 1, marginBottom: spacing.xl },
  routineItem: { alignItems: 'center', flexDirection: 'row', minHeight: 82, paddingHorizontal: spacing.md },
  time: { color: colors.textMuted, fontSize: 13, fontWeight: '700', width: 68 },
  icon: { alignItems: 'center', backgroundColor: colors.surfaceGreen, borderRadius: radii.pill, height: 44, justifyContent: 'center', width: 44 },
  completeIcon: { backgroundColor: colors.primary },
  itemCopy: { flex: 1, marginHorizontal: spacing.md },
  itemTitle: { color: colors.text, fontSize: typography.body, fontWeight: '800' },
  itemSubtitle: { color: colors.textMuted, fontSize: 14, marginTop: 3 },
  activity: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.md, borderWidth: 1, flexDirection: 'row', minHeight: 76, padding: spacing.md, marginBottom: spacing.sm },
  activityIcon: { alignItems: 'center', backgroundColor: colors.surfaceGreen, borderRadius: radii.pill, height: 44, justifyContent: 'center', width: 44 },
});
