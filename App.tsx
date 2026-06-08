import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const avatarImg = require('./assets/avatar.png');
const SCREEN_HEIGHT = Dimensions.get('window').height;
const TOP_SECTION_HEIGHT = SCREEN_HEIGHT * 0.55;
const BOTTOM_SECTION_HEIGHT = SCREEN_HEIGHT * 0.45;
const PROFILE_TOP_PADDING = 36;
const AVATAR_BOTTOM_GAP = 8;

function Avatar() {
  return (
    <Image source={avatarImg} style={styles.avatarImage} resizeMode='contain' />
  );
}

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [profileMetaHidden, setProfileMetaHidden] = useState(false);
  const [measuredTopHeight, setMeasuredTopHeight] =
    useState(TOP_SECTION_HEIGHT);
  const [measuredAvatarHeight, setMeasuredAvatarHeight] = useState(186);
  const avatarTranslateY = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false);

  const handleReceiptPress = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setProfileMetaHidden(true);

    const dropToBottom = Math.max(
      0,
      measuredTopHeight -
        (PROFILE_TOP_PADDING + measuredAvatarHeight + AVATAR_BOTTOM_GAP),
    );

    const bounceHeight = Math.max(8, Math.round(measuredTopHeight * 0.05));

    Animated.sequence([
      Animated.timing(avatarTranslateY, {
        toValue: dropToBottom,
        duration: 340,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(avatarTranslateY, {
        toValue: dropToBottom - bounceHeight,
        duration: 120,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(avatarTranslateY, {
        toValue: dropToBottom,
        duration: 120,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(avatarTranslateY, {
        toValue: dropToBottom - Math.round(bounceHeight * 0.66),
        duration: 105,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(avatarTranslateY, {
        toValue: dropToBottom,
        duration: 105,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(avatarTranslateY, {
        toValue: dropToBottom - Math.round(bounceHeight * 0.4),
        duration: 90,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(avatarTranslateY, {
        toValue: dropToBottom,
        duration: 90,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(avatarTranslateY, {
        toValue: 0,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      isAnimating.current = false;
      setProfileMetaHidden(false);
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style='dark' />
      <ScrollView bounces={false} style={styles.scroll}>
        {/* ── TOP HALF — yellowish ── */}
        <View
          style={styles.topHalf}
          onLayout={(e) => setMeasuredTopHeight(e.nativeEvent.layout.height)}
        >
          {/* 3-dot menu top right */}
          <Pressable
            style={styles.menuButton}
            onPress={() => setMenuVisible(true)}
          >
            <Text style={styles.menuDots}>⋮</Text>
          </Pressable>

          {/* Profile section centred */}
          <View style={styles.profileSection}>
            <Animated.View
              style={{ transform: [{ translateY: avatarTranslateY }] }}
              onLayout={(e) =>
                setMeasuredAvatarHeight(e.nativeEvent.layout.height)
              }
            >
              <Avatar />
            </Animated.View>

            {!profileMetaHidden && (
              <>
                <Text style={styles.nameText}>Waqar Ahmed</Text>
                <Text style={styles.dobText}>19.09.1999</Text>
              </>
            )}
          </View>
        </View>

        {/* ── BOTTOM HALF — white ── */}
        <View style={styles.bottomHalf}>
          <Text style={styles.uniNameText}>University of Oslo</Text>
          <Text style={styles.studentNumberText}>Student number: 673399</Text>

          <View style={styles.bottomSpacer} />

          <Pressable style={styles.receiptButton} onPress={handleReceiptPress}>
            <Text style={styles.receiptButtonLine1}>
              Valid semester receipt
            </Text>
            <Text style={styles.receiptButtonLine2}>Spring 2026</Text>
          </Pressable>

          <Text style={styles.validityText}>
            Valid from 01.01.26 through 31.08.26
          </Text>
        </View>
      </ScrollView>

      {/* Simple dropdown menu */}
      <Modal
        transparent
        visible={menuVisible}
        animationType='fade'
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.dropdown}>
            {['Edit Profile', 'Settings', 'Log Out'].map((item) => (
              <Pressable
                key={item}
                style={styles.dropdownItem}
                onPress={() => setMenuVisible(false)}
              >
                <Text style={styles.dropdownText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ── layout ──
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scroll: {
    flex: 1,
  },

  // ── top half (yellowish) ──
  topHalf: {
    backgroundColor: '#edc123',
    height: TOP_SECTION_HEIGHT,
    paddingTop: 16,
    overflow: 'hidden',
  },
  menuButton: {
    position: 'absolute',
    top: 16,
    right: 20,
    padding: 8,
    zIndex: 10,
  },
  menuDots: {
    fontSize: 44,
    color: '#000000',
    fontWeight: '900',
    letterSpacing: 2.6,
    textShadowColor: 'rgba(0,0,0,0.34)',
    textShadowOffset: { width: 0.8, height: 0.8 },
    textShadowRadius: 1,
  },
  profileSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: PROFILE_TOP_PADDING,
    paddingBottom: 10,
  },

  // ── avatar image ──
  avatarImage: {
    width: 210,
    height: 210,
    marginBottom: 10,
  },

  // ── name & dob ──
  nameText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  dobText: {
    fontSize: 14,
    color: '#444',
    letterSpacing: 1,
    marginBottom: 10,
  },

  // ── bottom half (white) ──
  bottomHalf: {
    backgroundColor: '#ffffff',
    minHeight: BOTTOM_SECTION_HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -28,
    padding: 28,
    alignItems: 'center',
  },
  bottomSpacer: {
    flex: 1,
  },
  uniNameText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginTop: 8,
  },
  studentNumberText: {
    fontSize: 14,
    color: '#444',
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 6,
  },
  receiptButton: {
    backgroundColor: '#285c33',
    width: '100%',
    borderRadius: 9,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 18,
  },
  receiptButtonLine1: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 20,
  },
  receiptButtonLine2: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    marginTop: 2,
  },
  validityText: {
    marginTop: 8,
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },

  // ── dropdown menu ──
  modalOverlay: {
    flex: 1,
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    minWidth: 150,
  },
  dropdownItem: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 15,
    color: '#1a1a1a',
  },
});
