import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
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
const hatImg = require('./assets/hat.png');
const SCREEN_HEIGHT = Dimensions.get('window').height;
const TOP_SECTION_HEIGHT = SCREEN_HEIGHT * 0.6;
const BOTTOM_SECTION_HEIGHT = SCREEN_HEIGHT * 0.4;
const PROFILE_TOP_PADDING = 36;
const AVATAR_BOTTOM_GAP = 8;
const HAT_NORMAL_HEIGHT = 74;
const HAT_SMALL_HEIGHT = HAT_NORMAL_HEIGHT * 0.7;

function Avatar() {
  return (
    <Image source={avatarImg} style={styles.avatarImage} resizeMode='contain' />
  );
}

function OutlineMortarboard({ small = false }: { small?: boolean }) {
  return (
    <Image
      source={hatImg}
      style={[styles.hatImage, small && styles.hatImageSmall]}
      resizeMode='contain'
    />
  );
}

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [profileMetaHidden, setProfileMetaHidden] = useState(false);
  const [measuredTopHeight, setMeasuredTopHeight] =
    useState(TOP_SECTION_HEIGHT);
  const [measuredBottomHeight, setMeasuredBottomHeight] = useState(
    BOTTOM_SECTION_HEIGHT,
  );
  const [measuredAvatarHeight, setMeasuredAvatarHeight] = useState(186);
  const avatarTranslateY = useRef(new Animated.Value(0)).current;
  const rightHatY = useRef(new Animated.Value(130)).current;
  const rightHatTilt = useRef(new Animated.Value(0)).current;
  const rightHatX = useRef(new Animated.Value(0)).current;
  const rightSmallHatY = useRef(new Animated.Value(165)).current;
  const rightSmallHatTilt = useRef(new Animated.Value(0)).current;
  const leftHatX = useRef(new Animated.Value(-74)).current;
  const leftHatY = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false);

  const rightHatRotate = rightHatTilt.interpolate({
    inputRange: [-30, 30],
    outputRange: ['-30deg', '30deg'],
  });

  const rightSmallHatRotate = rightSmallHatTilt.interpolate({
    inputRange: [-30, 30],
    outputRange: ['-30deg', '30deg'],
  });

  useEffect(() => {
    const rightSmallTopY = -Math.max(
      120,
      measuredBottomHeight - HAT_SMALL_HEIGHT - 6,
    );
    const rightNormalTopY = -Math.max(
      130,
      measuredBottomHeight - HAT_NORMAL_HEIGHT - 6,
    );

    const hatLoop = Animated.loop(
      Animated.sequence([
        // Reset phase
        Animated.parallel([
          Animated.timing(rightSmallHatY, {
            toValue: 165,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(rightSmallHatTilt, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(rightHatY, {
            toValue: 130,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(rightHatTilt, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(rightHatX, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(leftHatX, {
            toValue: -74,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(leftHatY, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),

        // Small right hat moves up from bottom
        Animated.parallel([
          Animated.timing(rightSmallHatY, {
            toValue: rightSmallTopY,
            duration: 2200,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(rightSmallHatTilt, {
            toValue: 14,
            duration: 2200,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),

        // Comes back halfway
        Animated.parallel([
          Animated.timing(rightSmallHatY, {
            toValue: 15,
            duration: 1700,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(rightSmallHatTilt, {
            toValue: 7,
            duration: 1700,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),

        // Midway: left hat slides in/out while small continues down,
        // and near the bottom right normal hat shoots to top.
        Animated.parallel([
          Animated.timing(rightSmallHatY, {
            toValue: 165,
            duration: 1850,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(rightSmallHatTilt, {
            toValue: 0,
            duration: 1850,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.delay(140),
            Animated.parallel([
              Animated.sequence([
                Animated.timing(leftHatX, {
                  toValue: -18,
                  duration: 280,
                  easing: Easing.out(Easing.cubic),
                  useNativeDriver: true,
                }),
                Animated.timing(leftHatX, {
                  toValue: -74,
                  duration: 360,
                  easing: Easing.in(Easing.quad),
                  useNativeDriver: true,
                }),
              ]),
              Animated.sequence([
                Animated.timing(leftHatY, {
                  toValue: -28,
                  duration: 240,
                  easing: Easing.out(Easing.cubic),
                  useNativeDriver: true,
                }),
                Animated.timing(leftHatY, {
                  toValue: 0,
                  duration: 400,
                  easing: Easing.in(Easing.quad),
                  useNativeDriver: true,
                }),
              ]),
            ]),
          ]),
          Animated.sequence([
            Animated.delay(520),
            Animated.parallel([
              Animated.timing(rightHatY, {
                toValue: rightNormalTopY,
                duration: 2300,
                easing: Easing.inOut(Easing.cubic),
                useNativeDriver: true,
              }),
              Animated.timing(rightHatTilt, {
                toValue: -14,
                duration: 2300,
                easing: Easing.inOut(Easing.cubic),
                useNativeDriver: true,
              }),
            ]),
          ]),
        ]),

        Animated.delay(220),

        // Big right hat comes back down smoothly,
        // drifting slightly inward before returning to the edge.
        Animated.parallel([
          Animated.timing(rightHatY, {
            toValue: 130,
            duration: 2300,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(rightHatTilt, {
            toValue: 0,
            duration: 2300,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(rightHatX, {
            toValue: 14,
            duration: 2300,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]),
    );

    hatLoop.start();

    return () => {
      hatLoop.stop();
    };
  }, [
    leftHatX,
    leftHatY,
    measuredBottomHeight,
    rightHatX,
    rightHatTilt,
    rightHatY,
    rightSmallHatTilt,
    rightSmallHatY,
  ]);

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
        <View
          style={styles.bottomHalf}
          onLayout={(e) => setMeasuredBottomHeight(e.nativeEvent.layout.height)}
        >
          <View style={styles.hatLayer} pointerEvents='none'>
            <Animated.View
              style={[
                styles.rightHat,
                {
                  transform: [
                    { translateX: rightHatX },
                    { translateY: rightHatY },
                    { rotate: rightHatRotate },
                  ],
                },
              ]}
            >
              <OutlineMortarboard />
            </Animated.View>

            <Animated.View
              style={[
                styles.rightSmallHat,
                {
                  transform: [
                    { translateY: rightSmallHatY },
                    { rotate: rightSmallHatRotate },
                  ],
                },
              ]}
            >
              <OutlineMortarboard small />
            </Animated.View>

            <Animated.View
              style={[
                styles.leftHat,
                {
                  transform: [
                    { translateX: leftHatX },
                    { translateY: leftHatY },
                    { rotate: '14deg' },
                  ],
                },
              ]}
            >
              <OutlineMortarboard />
            </Animated.View>
          </View>

          <View style={styles.bottomContent}>
            <Text style={styles.uniNameText}>University of Oslo</Text>
            <Text style={styles.studentNumberText}>Student number: 673399</Text>

            <View style={styles.bottomSpacer} />

            <Pressable
              style={styles.receiptButton}
              onPress={handleReceiptPress}
            >
              <Text style={styles.receiptButtonLine1}>
                Valid semester receipt
              </Text>
              <Text style={styles.receiptButtonLine2}>Spring 2026</Text>
            </Pressable>

            <Text style={styles.validityText}>
              Valid from 01.01.26 through 31.08.27
            </Text>
          </View>
        </View>
      </ScrollView>

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
    width: 276,
    height: 276,
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
    overflow: 'hidden',
    position: 'relative',
  },
  hatLayer: {
    ...StyleSheet.absoluteFill,
    zIndex: 0,
  },
  bottomContent: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    zIndex: 2,
  },
  hatImage: {
    width: 152,
    height: 94,
  },
  hatImageSmall: {
    transform: [{ scale: 0.7 }],
  },
  rightHat: {
    position: 'absolute',
    right: -56,
    bottom: -6,
    opacity: 0.62,
  },
  rightSmallHat: {
    position: 'absolute',
    right: -58,
    bottom: -10,
    opacity: 0.52,
  },
  leftHat: {
    position: 'absolute',
    left: -58,
    top: 220,
    opacity: 0.55,
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
