import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii, shadow, spacing, typography } from '../design/theme';

type ActionCardProps = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  tone?: 'neutral' | 'green' | 'danger';
};

export function ActionCard({
  title,
  subtitle,
  icon,
  onPress,
  tone = 'neutral',
}: ActionCardProps) {
  const content = (
    <>
      <View style={[styles.icon, tone === 'green' && styles.greenIcon, tone === 'danger' && styles.dangerIcon]}>
        <Ionicons
          color={tone === 'danger' ? colors.danger : colors.primary}
          name={icon}
          size={25}
        />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Ionicons color={colors.textSoft} name="chevron-forward" size={22} />
    </>
  );

  return onPress ? (
    <Pressable
      accessibilityLabel={`${title}. ${subtitle}`}
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.card, tone === 'green' && styles.greenCard, tone === 'danger' && styles.dangerCard]}
    >
      {content}
    </Pressable>
  ) : (
    <View style={[styles.card, tone === 'green' && styles.greenCard, tone === 'danger' && styles.dangerCard]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 82,
    padding: spacing.md,
    ...shadow,
  },
  greenCard: {
    backgroundColor: colors.surfaceGreen,
    borderColor: colors.primarySoft,
  },
  dangerCard: {
    backgroundColor: colors.dangerSoft,
    borderColor: '#F1C7C2',
  },
  icon: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.pill,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  greenIcon: {
    backgroundColor: colors.white,
  },
  dangerIcon: {
    backgroundColor: colors.white,
  },
  copy: {
    flex: 1,
    marginHorizontal: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: typography.bodyLarge,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22,
    marginTop: 3,
  },
});
