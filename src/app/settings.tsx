import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { Screen } from '../components/Screen';
import { colors, radii, spacing, typography } from '../design/theme';

export default function SettingsScreen() {
  const [textSize, setTextSize] = useState('Normal');
  const [darkMode, setDarkMode] = useState(false);
  const [reminders, setReminders] = useState(true);
  const [captions, setCaptions] = useState(true);
  const [voiceSpeed, setVoiceSpeed] = useState('Slow & clear');
  const [language, setLanguage] = useState('English');

  function chooseLanguage() {
    Alert.alert('Preferred language', 'Choose the language used for the app interface.', [
      ...['English', 'Hindi', 'Tamil', 'Telugu'].map((option) => ({
        text: option,
        onPress: () => setLanguage(option),
      })),
      { text: 'Cancel', style: 'cancel' },
    ]);
  }

  return (
    <Screen>
      <AppHeader title="Settings" />
      <Text style={styles.eyebrow}>MAKE IT YOURS</Text>
      <Text accessibilityRole="header" style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Choose what feels easiest and most comfortable.</Text>
      <SettingsSection title="Comfort & display">
        <Text style={styles.previewLabel}>Text size preview</Text>
        <Text style={[styles.previewText, textSize === 'Large' && styles.large, textSize === 'Extra Large' && styles.extraLarge]}>This is how your text will look.</Text>
        <View accessibilityRole="radiogroup" style={styles.choiceRow}>
          {['Normal', 'Large', 'Extra Large'].map((option) => (
            <Pressable accessibilityRole="radio" accessibilityState={{ selected: textSize === option }} key={option} onPress={() => setTextSize(option)} style={[styles.choice, textSize === option && styles.selectedChoice]}>
              <Text style={[styles.choiceText, textSize === option && styles.selectedChoiceText]}>{option}</Text>
            </Pressable>
          ))}
        </View>
        <ToggleRow icon="moon-outline" label="Dark mode" description="Reduce brightness at night" value={darkMode} onValueChange={setDarkMode} />
      </SettingsSection>
      <SettingsSection title="Voice & language">
        <Pressable accessibilityRole="button" onPress={chooseLanguage} style={styles.row}>
          <Ionicons color={colors.primary} name="language-outline" size={24} />
          <View style={styles.rowCopy}><Text style={styles.rowTitle}>Preferred language</Text><Text style={styles.rowDescription}>{language}</Text></View>
          <Ionicons color={colors.textSoft} name="chevron-forward" size={22} />
        </Pressable>
        <View style={styles.row}>
          <Ionicons color={colors.primary} name="speedometer-outline" size={24} />
          <View style={styles.rowCopy}><Text style={styles.rowTitle}>Companion voice speed</Text><Text style={styles.rowDescription}>{voiceSpeed}</Text></View>
        </View>
        <View style={styles.choiceRow}>
          {['Slow & clear', 'Regular'].map((option) => (
            <Pressable accessibilityRole="radio" accessibilityState={{ selected: voiceSpeed === option }} key={option} onPress={() => setVoiceSpeed(option)} style={[styles.choice, voiceSpeed === option && styles.selectedChoice]}><Text style={[styles.choiceText, voiceSpeed === option && styles.selectedChoiceText]}>{option}</Text></Pressable>
          ))}
        </View>
      </SettingsSection>
      <SettingsSection title="Reminders & accessibility">
        <ToggleRow icon="notifications-outline" label="Daily reminders" description="Medicine and activities" value={reminders} onValueChange={setReminders} />
        <ToggleRow icon="text-outline" label="Always show captions" description="Text during voice conversations" value={captions} onValueChange={setCaptions} />
      </SettingsSection>
      <Pressable accessibilityRole="button" onPress={() => Alert.alert('Family help', 'Open the Family section to choose a trusted person and start a supported connection.')} style={styles.helpButton}>
        <Ionicons color={colors.primary} name="people-outline" size={23} />
        <Text style={styles.helpText}>Get help from family</Text>
      </Pressable>
      <Text style={styles.version}>ElderCare AI · Version 1.0</Text>
      <BottomNavigation />
    </Screen>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <View style={styles.section}><Text style={styles.sectionTitle}>{title}</Text>{children}</View>;
}

function ToggleRow({ icon, label, description, value, onValueChange }: { icon: keyof typeof Ionicons.glyphMap; label: string; description: string; value: boolean; onValueChange: (value: boolean) => void }) {
  return <View style={styles.row}><Ionicons color={colors.primary} name={icon} size={24} /><View style={styles.rowCopy}><Text style={styles.rowTitle}>{label}</Text><Text style={styles.rowDescription}>{description}</Text></View><Switch accessibilityLabel={label} onValueChange={onValueChange} trackColor={{ false: colors.border, true: colors.primarySoft }} thumbColor={value ? colors.primary : colors.textSoft} value={value} /></View>;
}

const styles = StyleSheet.create({
  eyebrow: { color: colors.primary, fontSize: typography.eyebrow, fontWeight: '800', letterSpacing: 1.1 },
  title: { color: colors.text, fontSize: typography.title, fontWeight: '800', marginTop: spacing.sm },
  subtitle: { color: colors.textMuted, fontSize: typography.bodyLarge, lineHeight: 26, marginTop: spacing.sm, marginBottom: spacing.lg },
  section: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.md, borderWidth: 1, marginBottom: spacing.md, padding: spacing.md },
  sectionTitle: { color: colors.text, fontSize: 20, fontWeight: '800', marginBottom: spacing.md },
  previewLabel: { color: colors.textMuted, fontSize: 14 },
  previewText: { color: colors.text, fontSize: typography.bodyLarge, lineHeight: 27, marginTop: spacing.sm },
  large: { fontSize: 22 },
  extraLarge: { fontSize: 26 },
  choiceRow: { backgroundColor: colors.surfaceMuted, borderRadius: radii.pill, flexDirection: 'row', gap: 4, marginTop: spacing.md, padding: 4 },
  choice: { alignItems: 'center', borderRadius: radii.pill, flex: 1, justifyContent: 'center', minHeight: 46, paddingHorizontal: spacing.sm },
  selectedChoice: { backgroundColor: colors.white },
  choiceText: { color: colors.textMuted, fontSize: 14, fontWeight: '700', textAlign: 'center' },
  selectedChoiceText: { color: colors.primary, fontWeight: '800' },
  row: { alignItems: 'center', flexDirection: 'row', minHeight: 66 },
  rowCopy: { flex: 1, marginHorizontal: spacing.md },
  rowTitle: { color: colors.text, fontSize: typography.body, fontWeight: '800' },
  rowDescription: { color: colors.textMuted, fontSize: 14, marginTop: 3 },
  helpButton: { alignItems: 'center', borderColor: colors.primary, borderRadius: radii.md, borderWidth: 1, flexDirection: 'row', justifyContent: 'center', minHeight: 54 },
  helpText: { color: colors.primary, fontSize: typography.body, fontWeight: '800', marginLeft: spacing.sm },
  version: { color: colors.textSoft, fontSize: 13, marginTop: spacing.lg, textAlign: 'center' },
});
