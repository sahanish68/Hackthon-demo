import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { ActionCard } from '../components/ActionCard';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { Screen } from '../components/Screen';
import { SectionHeading } from '../components/SectionHeading';
import { colors, radii, spacing, typography } from '../design/theme';

const steps = [
  ['1', 'Open the app', 'Find the green video camera icon on your home screen.'],
  ['2', 'Choose a person', 'Tap the name or photo of the person you want to call.'],
  ['3', 'Tap Video Call', 'Press the large green Video Call button. That’s it!'],
];

export default function GuidesScreen() {
  return (
    <Screen>
      <AppHeader title="How-to Guides" />
      <SectionHeading eyebrow="DIGITAL HELP, MADE SIMPLE" title="How-to guides" />
      <Text style={styles.intro}>Learn one small step at a time. There’s no hurry.</Text>
      <View style={styles.scamCard}>
        <Ionicons color={colors.warning} name="shield-checkmark-outline" size={32} />
        <Text style={styles.scamTitle}>Stay safe from scams</Text>
        <Text style={styles.scamCopy}>Never share your bank PIN or OTP—even with someone you know.</Text>
        <Pressable accessibilityRole="button" onPress={() => Alert.alert('Safety tips', 'Never share your PIN or one-time password. If a caller pressures you, end the call and contact someone you trust.')} style={styles.linkButton}>
          <Text style={styles.link}>View safety tips  ›</Text>
        </Pressable>
      </View>
      <SectionHeading eyebrow="POPULAR GUIDE" title="How to make a video call" />
      <View style={styles.steps}>
        {steps.map(([number, title, copy], index) => (
          <Pressable accessibilityRole="button" key={number} onPress={() => Alert.alert(title, copy)} style={styles.step}>
            <Text style={styles.stepNumber}>{number}</Text>
            <Ionicons color={colors.primary} name={index === 0 ? 'apps-outline' : index === 1 ? 'person-outline' : 'videocam-outline'} size={25} />
            <View style={styles.stepCopy}>
              <Text style={styles.stepTitle}>{title}</Text>
              <Text style={styles.stepSubtitle}>{copy}</Text>
            </View>
            <Ionicons color={colors.textSoft} name="chevron-down" size={21} />
          </Pressable>
        ))}
      </View>
      <SectionHeading eyebrow="MORE HELP" title="What would you like to learn?" />
      <ActionCard icon="chatbubble-ellipses-outline" onPress={() => Alert.alert('Send a message', 'Open Family, choose a person, then use a connected messaging service to send your message.')} subtitle="Learn the basics" title="Send a message" />
      <View style={styles.spacer} />
      <ActionCard icon="image-outline" onPress={() => Alert.alert('Share a photo', 'Choose a trusted family member first. Photo sharing will be enabled when secure family storage is connected.')} subtitle="Learn the basics" title="Share a photo" />
      <View style={styles.spacer} />
      <ActionCard icon="volume-high-outline" onPress={() => Alert.alert('Adjust volume', 'Use the physical volume buttons on the side of your phone. The volume indicator will appear on screen.')} subtitle="Learn the basics" title="Adjust volume" />
      <BottomNavigation />
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { color: colors.textMuted, fontSize: typography.bodyLarge, lineHeight: 26, marginBottom: spacing.lg },
  scamCard: { backgroundColor: '#FFF5DF', borderColor: '#F2E0B7', borderRadius: radii.md, borderWidth: 1, padding: spacing.lg, marginBottom: spacing.xl },
  scamTitle: { color: colors.text, fontSize: 21, fontWeight: '800', marginTop: spacing.md },
  scamCopy: { color: colors.textMuted, fontSize: typography.body, lineHeight: 23, marginTop: spacing.sm },
  link: { color: colors.warning, fontSize: 15, fontWeight: '800', marginTop: spacing.md },
  linkButton: { alignSelf: 'flex-start', minHeight: 44, justifyContent: 'center' },
  steps: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.md, borderWidth: 1, marginBottom: spacing.xl },
  step: { alignItems: 'center', flexDirection: 'row', minHeight: 92, padding: spacing.md },
  stepNumber: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radii.pill, color: colors.primaryDark, fontSize: 16, fontWeight: '800', height: 34, paddingTop: 7, textAlign: 'center', width: 34 },
  stepCopy: { flex: 1, marginHorizontal: spacing.md },
  stepTitle: { color: colors.text, fontSize: typography.body, fontWeight: '800' },
  stepSubtitle: { color: colors.textMuted, fontSize: 14, lineHeight: 20, marginTop: 3 },
  spacer: { height: spacing.sm },
});
