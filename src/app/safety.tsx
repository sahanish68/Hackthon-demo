import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { ActionCard } from '../components/ActionCard';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { Screen } from '../components/Screen';
import { SectionHeading } from '../components/SectionHeading';
import { showUnavailableAction } from '../components/UnavailableAction';
import { colors, radii, spacing, typography } from '../design/theme';

export default function SafetyScreen() {
  const [locationSharing, setLocationSharing] = useState(true);

  return (
    <Screen>
      <AppHeader title="Safety Center" />
      <SectionHeading eyebrow="HELP IS ALWAYS NEAR" title="Safety center" />
      <Text style={styles.intro}>Your trusted people and emergency support.</Text>
      <View style={styles.locationCard}>
        <Ionicons color={colors.primary} name="location-outline" size={27} />
        <View style={styles.locationCopy}>
          <Text style={styles.cardTitle}>Location sharing is {locationSharing ? 'on' : 'off'}</Text>
          <Text style={styles.cardSubtitle}>{locationSharing ? 'Meera and Arjun can see your location' : 'Your location is not being shared'}</Text>
        </View>
        <Pressable
          accessibilityLabel={`Location sharing is ${locationSharing ? 'on' : 'off'}`}
          accessibilityRole="switch"
          accessibilityState={{ checked: locationSharing }}
          onPress={() => setLocationSharing((current) => !current)}
          style={[styles.switchOn, !locationSharing && styles.switchOff]}
        >
          <View style={[styles.switchKnob, !locationSharing && styles.switchKnobOff]} />
        </Pressable>
      </View>
      <SectionHeading eyebrow="TRUSTED CONTACTS" title="Call someone you know" />
      <ActionCard icon="call-outline" onPress={() => showUnavailableAction('Trusted contact calls')} subtitle="Daughter · Available when connected" title="Meera" />
      <View style={styles.spacer} />
      <ActionCard icon="chatbubble-outline" onPress={() => showUnavailableAction('Trusted contact messages')} subtitle="Son · Available when connected" title="Arjun" />
      <View style={styles.sosCard}>
        <Ionicons color={colors.danger} name="alert-circle-outline" size={32} />
        <Text style={styles.sosEyebrow}>EMERGENCY SOS</Text>
        <Text style={styles.sosTitle}>Need urgent help?</Text>
        <Text style={styles.sosCopy}>This alerts your family and calls emergency services when a verified service is connected.</Text>
        <View style={styles.steps}><Text style={styles.step}>1</Text><Text style={styles.step}>2</Text></View>
        <Pressable
          accessibilityLabel="Start SOS. This only opens confirmation and does not send an alert yet."
          accessibilityRole="button"
          onPress={() => Alert.alert('Confirm SOS', 'No alert has been sent. A verified emergency service must be connected before delivery can be confirmed.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Continue', onPress: () => showUnavailableAction('SOS delivery') }])}
          style={styles.sosButton}
        >
          <Text style={styles.sosButtonText}>Start SOS</Text>
        </Pressable>
      </View>
      <Pressable accessibilityRole="button" onPress={() => router.push('/guides')} style={styles.guidance}>
        <Ionicons color={colors.primary} name="information-circle-outline" size={21} />
        <Text style={styles.guidanceText}>Learn more about staying safe</Text>
      </Pressable>
      <BottomNavigation />
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { color: colors.textMuted, fontSize: typography.bodyLarge, lineHeight: 26, marginBottom: spacing.lg },
  locationCard: { alignItems: 'center', backgroundColor: colors.surfaceGreen, borderRadius: radii.md, flexDirection: 'row', padding: spacing.md, marginBottom: spacing.xl },
  locationCopy: { flex: 1, marginHorizontal: spacing.md },
  cardTitle: { color: colors.text, fontSize: typography.body, fontWeight: '800' },
  cardSubtitle: { color: colors.textMuted, fontSize: 14, lineHeight: 19, marginTop: 3 },
  switchOn: { backgroundColor: colors.primary, borderRadius: radii.pill, height: 28, justifyContent: 'center', padding: 3, width: 48 },
  switchOff: { backgroundColor: colors.border },
  switchKnob: { alignSelf: 'flex-end', backgroundColor: colors.white, borderRadius: radii.pill, height: 22, width: 22 },
  switchKnobOff: { alignSelf: 'flex-start' },
  spacer: { height: spacing.sm },
  sosCard: { backgroundColor: colors.dangerSoft, borderColor: '#F1C7C2', borderRadius: radii.lg, borderWidth: 1, marginTop: spacing.xl, padding: spacing.lg },
  sosEyebrow: { color: colors.danger, fontSize: typography.eyebrow, fontWeight: '800', letterSpacing: 1.1, marginTop: spacing.md },
  sosTitle: { color: colors.text, fontSize: 25, fontWeight: '800', marginTop: spacing.sm },
  sosCopy: { color: colors.textMuted, fontSize: typography.body, lineHeight: 23, marginTop: spacing.sm },
  steps: { flexDirection: 'row', gap: spacing.sm, marginVertical: spacing.lg },
  step: { alignItems: 'center', backgroundColor: colors.white, borderRadius: radii.pill, color: colors.danger, fontSize: 17, fontWeight: '800', height: 34, paddingTop: 7, textAlign: 'center', width: 34 },
  sosButton: { alignItems: 'center', backgroundColor: colors.danger, borderRadius: radii.md, minHeight: 54, justifyContent: 'center' },
  sosButtonText: { color: colors.white, fontSize: typography.button, fontWeight: '800' },
  guidance: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingVertical: spacing.lg },
  guidanceText: { color: colors.primary, fontSize: 15, fontWeight: '700', marginLeft: spacing.sm },
});
