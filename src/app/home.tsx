import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ActionCard } from '../components/ActionCard';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { Screen } from '../components/Screen';
import { SectionHeading } from '../components/SectionHeading';
import { showUnavailableAction } from '../components/UnavailableAction';
import { colors, radii, spacing, typography } from '../design/theme';
import { scheduleLocalReminder } from '../services/localNotifications';

export default function HomeScreen() {
  return (
    <Screen>
      <AppHeader title="Home" />
      <View style={styles.greeting}>
        <View style={styles.greetingCopy}>
          <Text style={styles.date}>MONDAY, 24 JUNE</Text>
          <Text accessibilityRole="header" style={styles.title}>
            Good morning,{'\n'}Amma
          </Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
      </View>

      <Pressable
        accessibilityLabel="Emergency SOS"
        accessibilityRole="button"
        onPress={() => router.push('/safety')}
        style={styles.sosButton}
      >
        <Ionicons color={colors.danger} name="alert-circle-outline" size={23} />
        <Text style={styles.sosText}>Emergency SOS</Text>
      </Pressable>

      <Pressable
        accessibilityLabel="Start talking to AI Companion"
        accessibilityRole="button"
        onPress={() => router.push('/companion')}
        style={styles.companionCard}
      >
        <View style={styles.companionIcon}>
          <Ionicons color={colors.primary} name="sparkles-outline" size={30} />
        </View>
        <View style={styles.companionCopy}>
          <Text style={styles.companionTitle}>Talk to AI{'\n'}Companion</Text>
          <Text style={styles.companionSubtitle}>Tap to begin</Text>
        </View>
        <Ionicons color={colors.primary} name="arrow-forward-circle" size={35} />
      </Pressable>

      <SectionHeading eyebrow="YOUR DAY" title="Today's schedule" actionLabel="See all" onActionPress={() => router.push('/routine')} />
      <View style={styles.scheduleCard}>
        <ScheduleItem time="9:00" meridiem="AM" title="Morning medicine" subtitle="1 tablet after breakfast" icon="medical-outline" />
        <ScheduleItem time="11:30" meridiem="AM" title="Call with Dr. Rao" subtitle="Video appointment" icon="videocam-outline" next />
      </View>

      <SectionHeading eyebrow="MY PEOPLE" title="Family is one tap away" />
      <View style={styles.familyRow}>
        {['Meera', 'Arjun', 'Diya'].map((name) => (
          <Pressable
            accessibilityLabel={`${name} profile`}
            accessibilityRole="button"
            key={name}
            onPress={() => router.push('/family')}
            style={styles.familyShortcut}
          >
            <View style={styles.familyAvatar}><Text style={styles.avatarText}>{name[0]}</Text></View>
            <Text style={styles.familyName}>{name}</Text>
            <Ionicons color={colors.primary} name="chevron-forward" size={18} />
          </Pressable>
        ))}
      </View>
      <ActionCard
        icon="notifications-outline"
        onPress={async () => {
          try {
            await scheduleLocalReminder('ElderCare AI reminder', 'Your reminders and updates are ready to review.');
          } catch {
            showUnavailableAction('Notifications');
          }
        }}
        subtitle="Your reminders and updates will appear here."
        title="Important notifications"
      />
      <BottomNavigation />
    </Screen>
  );
}

function ScheduleItem({
  time,
  meridiem,
  title,
  subtitle,
  icon,
  next,
}: {
  time: string;
  meridiem: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  next?: boolean;
}) {
  return (
    <View style={styles.scheduleItem}>
      <View style={styles.time}>
        <Text style={styles.timeText}>{time}</Text>
        <Text style={styles.meridiem}>{meridiem}</Text>
      </View>
      <Ionicons color={colors.primary} name={icon} size={24} />
      <View style={styles.scheduleCopy}>
        <Text style={styles.scheduleTitle}>{title}</Text>
        <Text style={styles.scheduleSubtitle}>{subtitle}</Text>
      </View>
      {next ? <Text style={styles.next}>NEXT</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  greeting: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.lg },
  greetingCopy: { flex: 1 },
  date: { color: colors.primary, fontSize: typography.eyebrow, fontWeight: '800', letterSpacing: 1 },
  title: { color: colors.text, fontSize: typography.title, fontWeight: '800', lineHeight: 38, marginTop: spacing.sm },
  avatar: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radii.pill, height: 62, justifyContent: 'center', width: 62 },
  avatarText: { color: colors.primaryDark, fontSize: 24, fontWeight: '800' },
  sosButton: { alignItems: 'center', backgroundColor: colors.dangerSoft, borderRadius: radii.sm, flexDirection: 'row', minHeight: 52, paddingHorizontal: spacing.md, marginBottom: spacing.md },
  sosText: { color: colors.danger, fontSize: typography.body, fontWeight: '800', marginLeft: spacing.sm },
  companionCard: { alignItems: 'center', backgroundColor: colors.surfaceGreen, borderRadius: radii.lg, flexDirection: 'row', minHeight: 128, padding: spacing.lg, marginBottom: spacing.xl },
  companionIcon: { alignItems: 'center', backgroundColor: colors.white, borderRadius: radii.pill, height: 60, justifyContent: 'center', width: 60 },
  companionCopy: { flex: 1, marginLeft: spacing.md },
  companionTitle: { color: colors.text, fontSize: 22, fontWeight: '800', lineHeight: 26 },
  companionSubtitle: { color: colors.primary, fontSize: typography.body, fontWeight: '700', marginTop: spacing.sm },
  scheduleCard: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.md, borderWidth: 1, marginBottom: spacing.xl },
  scheduleItem: { alignItems: 'center', flexDirection: 'row', minHeight: 88, paddingHorizontal: spacing.md },
  time: { alignItems: 'flex-end', marginRight: spacing.md, width: 46 },
  timeText: { color: colors.text, fontSize: 16, fontWeight: '800' },
  meridiem: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  scheduleCopy: { flex: 1, marginLeft: spacing.md },
  scheduleTitle: { color: colors.text, fontSize: typography.body, fontWeight: '800' },
  scheduleSubtitle: { color: colors.textMuted, fontSize: 14, marginTop: 3 },
  next: { color: colors.primary, fontSize: 11, fontWeight: '800' },
  familyRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  familyShortcut: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.md, borderWidth: 1, flex: 1, minHeight: 110, justifyContent: 'center', padding: spacing.sm },
  familyAvatar: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radii.pill, height: 44, justifyContent: 'center', width: 44 },
  familyName: { color: colors.text, fontSize: 14, fontWeight: '700', marginVertical: 5 },
});
