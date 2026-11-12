import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/theme';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function SectionHeading({
  eyebrow,
  title,
  actionLabel,
  onActionPress,
}: SectionHeadingProps) {
  return (
    <View style={styles.container}>
      <View>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text accessibilityRole="header" style={styles.title}>
          {title}
        </Text>
      </View>
      {actionLabel ? (
        <Text
          accessibilityRole="button"
          onPress={onActionPress}
          style={styles.action}
        >
          {actionLabel}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: typography.eyebrow,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: typography.section,
    fontWeight: '800',
  },
  action: {
    color: colors.primary,
    fontSize: typography.body,
    fontWeight: '700',
    padding: spacing.sm,
  },
});
