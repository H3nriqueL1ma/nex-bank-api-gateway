import type {Component, PropsWithChildren, ReactElement} from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, {
  FadeIn,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import {ThemedText} from "@/components/ThemedText";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerBackgroundColor: { dark: string; light: string };
  textComponent: string
}>;

export default function ParallaxScrollView({
  children,
  headerBackgroundColor,
    textComponent
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView entering={FadeIn.duration(400)} exiting={FadeIn.duration(400)} ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}>
        </Animated.View>
        <ThemedText style={styles.titleHeader}>
          {textComponent}
        </ThemedText>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    height: 140,
    overflow: 'hidden',
    zIndex: 0
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
    backgroundColor: "white"
  },
  titleHeader: {
    zIndex: 1,
    fontFamily: "RobotoMono",
    fontSize: 30,
    textAlign: "right",
    padding: 10,
    top: -45
  }
});
