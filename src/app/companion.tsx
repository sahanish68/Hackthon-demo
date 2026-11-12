import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { Screen } from '../components/Screen';
import { colors, radii, spacing, typography } from '../design/theme';
import { sendCompanionMessages } from '../services/companionApi';

export default function CompanionScreen() {
  const [mode, setMode] = useState<'voice' | 'text'>('text');
  const [isPaused, setIsPaused] = useState(false);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [messages, setMessages] = useState([
    { speaker: 'You', text: 'What medicine should I take after lunch?' },
    { speaker: 'ElderCare AI', text: 'Your schedule says one blue tablet at 2:00 PM. Shall I remind you then?' },
  ]);
  const { width } = useWindowDimensions();

  function chooseLanguage() {
    Alert.alert('Conversation language', 'Choose a language for the text conversation.', [
      { text: 'English', onPress: () => undefined },
      { text: 'Hindi', onPress: () => Alert.alert('Hindi support', 'Text translation will be enabled when the configured provider supports Hindi.') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }

  async function sendMessage() {
    const trimmed = draft.trim();
    if (!trimmed || isSending) {
      return;
    }
    const nextMessages = [
      ...messages,
      { speaker: 'You', text: trimmed },
    ];
    setMessages(nextMessages);
    setDraft('');
    setErrorMessage('');
    setIsSending(true);

    try {
      const response = await sendCompanionMessages([
        ...messages.map((message) => ({
          role: message.speaker === 'You' ? 'user' as const : 'model' as const,
          text: message.text,
        })),
        { role: 'user', text: trimmed },
      ]);
      setMessages((current) => [...current, { speaker: 'ElderCare AI', text: response }]);
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : 'The companion is unavailable.');
    } finally {
      setIsSending(false);
    }
  }

  function sendQuickMessage(text: string) {
    setDraft(text);
    setMode('text');
  }

  return (
    <Screen>
      <AppHeader title="AI Companion" />
      <Pressable accessibilityLabel="Choose conversation language" accessibilityRole="button" onPress={chooseLanguage} style={styles.languageRow}>
        <Ionicons color={colors.primary} name="language-outline" size={24} />
        <Text style={styles.languageText}>Speaking in <Text style={styles.bold}>English</Text></Text>
        <Ionicons color={colors.textSoft} name="chevron-down" size={20} />
      </Pressable>
      <View style={styles.modeRow}>
        <Pressable accessibilityRole="button" onPress={() => setMode('voice')} style={[styles.mode, mode === 'voice' && styles.modeSelected]}><Ionicons color={mode === 'voice' ? colors.primary : colors.textMuted} name="mic-outline" size={20} /><Text style={mode === 'voice' ? styles.modeSelectedText : styles.modeText}>Voice</Text></Pressable>
        <Pressable accessibilityRole="button" onPress={() => setMode('text')} style={[styles.mode, mode === 'text' && styles.modeSelected]}><Ionicons color={mode === 'text' ? colors.primary : colors.textMuted} name="text-outline" size={20} /><Text style={mode === 'text' ? styles.modeSelectedText : styles.modeText}>Large Text</Text></Pressable>
      </View>
      <View style={styles.listening}>
        <View style={styles.listeningCircle}><Ionicons color={colors.primary} name="mic" size={42} /></View>
        <Text accessibilityRole="header" style={styles.title}>{mode === 'voice' ? 'Voice is ready' : 'Type your message'}</Text>
        <Text style={styles.subtitle}>{mode === 'voice' ? 'Microphone access will be connected in a future provider phase.' : 'Your messages stay on this screen until a secure service is connected.'}</Text>
      </View>
      <View accessibilityLabel="Conversation messages" style={styles.transcript}>
        <View style={styles.transcriptHeader}>
          <Text style={styles.eyebrow}>CONVERSATION</Text>
          <Ionicons color={colors.primary} name="volume-high-outline" size={22} />
        </View>
        {messages.map((item, index) => (
          <View key={`${item.speaker}-${index}`}>
            <Text style={styles.speaker}>{item.speaker}</Text>
            <Text style={styles.quote}>{item.text}</Text>
          </View>
        ))}
      </View>
      <View style={styles.quickActions}>
        {['What is on my routine?', 'Help me call family'].map((prompt) => (
          <Pressable accessibilityLabel={prompt} accessibilityRole="button" key={prompt} onPress={() => sendQuickMessage(prompt)} style={styles.quickAction}>
            <Text style={styles.quickActionText}>{prompt}</Text>
          </Pressable>
        ))}
      </View>
      {mode === 'text' ? (
        <View style={[styles.inputRow, width < 360 && styles.inputRowCompact]}>
          <TextInput
            accessibilityLabel="Type a message to the AI companion"
            onChangeText={setDraft}
            onSubmitEditing={sendMessage}
            placeholder="Type a message"
            placeholderTextColor={colors.textSoft}
            style={styles.input}
            value={draft}
          />
          <Pressable accessibilityLabel="Send message" accessibilityRole="button" disabled={isSending} onPress={() => void sendMessage()} style={styles.sendButton}>
            {isSending ? <ActivityIndicator color={colors.white} /> : <Ionicons color={colors.white} name="send" size={20} />}
          </Pressable>
        </View>
      ) : null}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <Pressable accessibilityLabel={isPaused ? 'Resume listening' : 'Pause listening'} accessibilityRole="button" onPress={() => setIsPaused((current) => !current)} style={styles.pauseButton}>
        <Ionicons color={colors.primary} name={isPaused ? 'play' : 'pause'} size={21} /><Text style={styles.pauseText}>{isPaused ? 'Resume listening' : 'Pause listening'}</Text>
      </Pressable>
      <Text style={styles.disclaimer}><Ionicons color={colors.warning} name="information-circle-outline" size={16} /> For medical emergencies, please use the SOS button.</Text>
      <Pressable accessibilityRole="button" onPress={() => setMode('text')} style={styles.textFallback}>
        <Ionicons color={colors.primary} name="chatbubble-ellipses-outline" size={22} />
        <Text style={styles.fallbackText}>Text fallback is available when voice is unavailable</Text>
      </Pressable>
      <BottomNavigation />
    </Screen>
  );
}

const styles = StyleSheet.create({
  languageRow: { alignItems: 'center', backgroundColor: colors.surfaceGreen, borderRadius: radii.pill, flexDirection: 'row', padding: spacing.sm, paddingHorizontal: spacing.md },
  languageText: { color: colors.text, flex: 1, fontSize: typography.body, marginLeft: spacing.sm },
  bold: { fontWeight: '800' },
  modeRow: { backgroundColor: colors.surfaceMuted, borderRadius: radii.pill, flexDirection: 'row', marginVertical: spacing.lg, padding: 4 },
  modeSelected: { alignItems: 'center', backgroundColor: colors.white, borderRadius: radii.pill, flex: 1, flexDirection: 'row', justifyContent: 'center', minHeight: 48, gap: spacing.xs },
  modeSelectedText: { color: colors.primary, fontSize: typography.body, fontWeight: '800' },
  mode: { alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'center', gap: spacing.xs },
  modeText: { color: colors.textMuted, fontSize: typography.body, fontWeight: '700' },
  inputRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  inputRowCompact: { gap: spacing.xs },
  input: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.md, borderWidth: 1, color: colors.text, flex: 1, fontSize: typography.body, minHeight: 52, paddingHorizontal: spacing.md },
  sendButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radii.md, height: 52, justifyContent: 'center', width: 52 },
  listening: { alignItems: 'center', paddingVertical: spacing.lg },
  listeningCircle: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radii.pill, height: 110, justifyContent: 'center', marginBottom: spacing.md, width: 110 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.textMuted, fontSize: typography.bodyLarge, marginTop: spacing.sm },
  transcript: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.md, borderWidth: 1, padding: spacing.md },
  transcriptHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.lg },
  eyebrow: { color: colors.primary, fontSize: typography.eyebrow, fontWeight: '800', letterSpacing: 1.1 },
  speaker: { color: colors.primary, fontSize: 14, fontWeight: '800', marginTop: spacing.sm },
  quote: { color: colors.text, fontSize: typography.bodyLarge, lineHeight: 27, marginTop: 4 },
  quickActions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  quickAction: { borderColor: colors.primary, borderRadius: radii.pill, borderWidth: 1, minHeight: 44, justifyContent: 'center', paddingHorizontal: spacing.md },
  quickActionText: { color: colors.primary, fontSize: 14, fontWeight: '700' },
  errorText: { color: colors.danger, fontSize: 14, lineHeight: 20, marginTop: spacing.sm, textAlign: 'center' },
  pauseButton: { alignItems: 'center', alignSelf: 'center', borderColor: colors.primary, borderRadius: radii.pill, borderWidth: 1, flexDirection: 'row', minHeight: 50, paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  pauseText: { color: colors.primary, fontSize: typography.body, fontWeight: '800', marginLeft: spacing.sm },
  disclaimer: { color: colors.textMuted, fontSize: 14, lineHeight: 20, marginTop: spacing.lg, textAlign: 'center' },
  textFallback: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: spacing.lg },
  fallbackText: { color: colors.primary, fontSize: 14, fontWeight: '700', marginLeft: spacing.sm },
});
