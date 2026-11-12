import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { ActionCard } from '../components/ActionCard';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { Screen } from '../components/Screen';
import { SectionHeading } from '../components/SectionHeading';
import { colors, radii, spacing, typography } from '../design/theme';

const family = [
  { name: 'Meera', relation: 'Daughter', status: 'Available now', initial: 'M' },
  { name: 'Arjun', relation: 'Son', status: 'Available now', initial: 'A' },
  { name: 'Diya', relation: 'Granddaughter', status: 'Last seen this morning', initial: 'D' },
];

export default function FamilyScreen() {
  const [selectedMember, setSelectedMember] = useState<(typeof family)[number] | null>(null);
  const [draft, setDraft] = useState('');
  const [lastMessage, setLastMessage] = useState('');

  function selectMember(member: (typeof family)[number]) {
    setSelectedMember(member);
  }

  function sendMessage() {
    const trimmed = draft.trim();
    if (!selectedMember || !trimmed) {
      return;
    }
    setLastMessage(`To ${selectedMember.name}: ${trimmed}`);
    setDraft('');
  }

  return (
    <Screen>
      <AppHeader title="Family" />
      <SectionHeading eyebrow="STAY CLOSE" title="My family" />
      <Text style={styles.intro}>See a familiar face or hear a loved one’s voice.</Text>
      <View style={styles.list}>
        {family.map((member) => (
          <View key={member.name} style={styles.memberCard}>
            <Pressable accessibilityLabel={`Open conversation with ${member.name}`} accessibilityRole="button" onPress={() => selectMember(member)} style={styles.memberHeader}>
              <View style={styles.avatar}><Text style={styles.avatarText}>{member.initial}</Text></View>
              <View style={styles.memberCopy}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.relation}>{member.relation}</Text>
                <Text style={styles.status}>{member.status}</Text>
              </View>
              <Ionicons color={colors.textSoft} name="chevron-forward" size={22} />
            </Pressable>
            <View style={styles.actions}>
              <ActionButton icon="call-outline" label="Voice call" onPress={() => {
                selectMember(member);
                Alert.alert('Voice call', `No phone number is configured for ${member.name}. You can write a message below.`);
              }} />
              <ActionButton icon="videocam-outline" label="Video call" onPress={() => {
                selectMember(member);
                Alert.alert('Video call', `No video provider is configured for ${member.name}. You can write a message below.`);
              }} />
            </View>
          </View>
        ))}
      </View>
      {selectedMember ? (
        <View style={styles.conversationCard}>
          <Text style={styles.conversationTitle}>Message {selectedMember.name}</Text>
          <Text style={styles.conversationSubtitle}>Write a message to keep here until secure messaging is connected.</Text>
          <View style={styles.messageRow}>
            <TextInput
              accessibilityLabel={`Message ${selectedMember.name}`}
              onChangeText={setDraft}
              onSubmitEditing={sendMessage}
              placeholder="Type a message"
              placeholderTextColor={colors.textSoft}
              style={styles.messageInput}
              value={draft}
            />
            <Pressable accessibilityLabel="Save message" accessibilityRole="button" onPress={sendMessage} style={styles.sendButton}>
              <Ionicons color={colors.white} name="send" size={20} />
            </Pressable>
          </View>
          {lastMessage ? <Text style={styles.lastMessage}>{lastMessage}</Text> : null}
        </View>
      ) : null}
      <SectionHeading eyebrow="SHARED WITH LOVE" title="Family moments" actionLabel="View all" onActionPress={() => Alert.alert('Family moments', 'Sunday together\nShared by Meera · 2 days ago')} />
      <View style={styles.momentCard}>
        <View style={styles.momentImage}><Ionicons color={colors.primary} name="images-outline" size={38} /></View>
        <Text style={styles.momentTitle}>Sunday together</Text>
        <Text style={styles.momentSubtitle}>Shared by Meera · 2 days ago</Text>
      </View>
      <BottomNavigation />
    </Screen>
  );
}

function ActionButton({ icon, label, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }) {
  return (
    <ActionCard
      icon={icon}
      onPress={onPress}
      subtitle=""
      title={label}
    />
  );
}

const styles = StyleSheet.create({
  intro: { color: colors.textMuted, fontSize: typography.bodyLarge, lineHeight: 26, marginBottom: spacing.lg },
  list: { gap: spacing.md, marginBottom: spacing.xl },
  memberCard: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.md, borderWidth: 1, padding: spacing.md },
  memberHeader: { alignItems: 'center', flexDirection: 'row' },
  avatar: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radii.pill, height: 58, justifyContent: 'center', width: 58 },
  avatarText: { color: colors.primaryDark, fontSize: 24, fontWeight: '800' },
  memberCopy: { marginLeft: spacing.md },
  memberName: { color: colors.text, fontSize: 21, fontWeight: '800' },
  relation: { color: colors.textMuted, fontSize: typography.body, marginTop: 2 },
  status: { color: colors.primary, fontSize: 14, fontWeight: '700', marginTop: 4 },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  conversationCard: { backgroundColor: colors.surfaceGreen, borderColor: colors.primarySoft, borderRadius: radii.md, borderWidth: 1, marginBottom: spacing.xl, padding: spacing.md },
  conversationTitle: { color: colors.text, fontSize: typography.bodyLarge, fontWeight: '800' },
  conversationSubtitle: { color: colors.textMuted, fontSize: 14, lineHeight: 20, marginTop: spacing.xs },
  messageRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  messageInput: { backgroundColor: colors.white, borderColor: colors.border, borderRadius: radii.md, borderWidth: 1, color: colors.text, flex: 1, minHeight: 52, paddingHorizontal: spacing.md },
  sendButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radii.md, height: 52, justifyContent: 'center', width: 52 },
  lastMessage: { color: colors.primaryDark, fontSize: 14, fontWeight: '700', marginTop: spacing.md },
  momentCard: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.md, borderWidth: 1, overflow: 'hidden' },
  momentImage: { alignItems: 'center', backgroundColor: colors.primarySoft, height: 120, justifyContent: 'center' },
  momentTitle: { color: colors.text, fontSize: typography.bodyLarge, fontWeight: '800', marginHorizontal: spacing.md, marginTop: spacing.md },
  momentSubtitle: { color: colors.textMuted, fontSize: 14, margin: spacing.md },
});
