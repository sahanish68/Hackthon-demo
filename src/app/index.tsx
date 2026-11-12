import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { colors, radii, spacing, typography } from '../design/theme';

const languages = ['English', 'हिंदी', 'தமிழ்', 'తెలుగు', 'മലയാളം', 'ಕನ್ನಡ', 'বাংলা', 'मराठी'];

export default function OnboardingScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  return (
    <Screen>
      <View style={styles.hero}>
        <View style={styles.logo}>
          <Ionicons color={colors.white} name="heart" size={36} />
        </View>
        <Text style={styles.eyebrow}>WELCOME TO ELDERCARE AI</Text>
        <Text accessibilityRole="header" style={styles.title}>
          A caring companion, always by your side.
        </Text>
        <Text style={styles.subtitle}>Choose the language you feel most comfortable with.</Text>
      </View>

      <Text style={styles.label}>Your language</Text>
      <View accessibilityRole="radiogroup" style={styles.languageList}>
        {languages.map((language) => {
          const selected = language === selectedLanguage;
          return (
            <Pressable
              accessibilityLabel={language}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              key={language}
              onPress={() => setSelectedLanguage(language)}
              style={[styles.language, selected && styles.selectedLanguage]}
            >
              <Text style={[styles.languageText, selected && styles.selectedLanguageText]}>
                {language}
              </Text>
              {selected ? <Ionicons color={colors.primary} name="checkmark-circle" size={24} /> : null}
            </Pressable>
          );
        })}
      </View>

      <Pressable
        accessibilityLabel="Get started"
        accessibilityRole="button"
        onPress={() => router.replace('/home')}
        style={styles.primaryButton}
      >
        <Text style={styles.primaryButtonText}>Get Started</Text>
        <Ionicons color={colors.white} name="arrow-forward" size={22} />
      </Pressable>
      <Text style={styles.privacy}>
        <Ionicons color={colors.primary} name="lock-closed-outline" size={15} /> Your conversations stay private and secure.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
  },
  logo: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    height: 78,
    justifyContent: 'center',
    marginBottom: spacing.xl,
    width: 78,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: typography.eyebrow,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  title: {
    color: colors.text,
    fontSize: 31,
    fontWeight: '800',
    lineHeight: 38,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.bodyLarge,
    lineHeight: 27,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  label: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '800',
    marginTop: spacing.xxl,
    marginBottom: spacing.sm,
  },
  languageList: {
    gap: spacing.sm,
  },
  language: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 56,
    paddingHorizontal: spacing.md,
  },
  selectedLanguage: {
    backgroundColor: colors.surfaceGreen,
    borderColor: colors.primary,
  },
  languageText: {
    color: colors.text,
    fontSize: typography.bodyLarge,
    fontWeight: '600',
  },
  selectedLanguageText: {
    color: colors.primaryDark,
    fontWeight: '800',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 58,
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: typography.button,
    fontWeight: '800',
  },
  privacy: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
});
