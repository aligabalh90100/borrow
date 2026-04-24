// src/component/shared/ArcSlider.tsx
import colors from "@/constants/colors";
import Feather from "@expo/vector-icons/Feather";
import React, { useCallback, useEffect, useMemo } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { width } = Dimensions.get("screen");
const SIZE = width * 0.7;
const STROKE_WIDTH = 30;
const THUMB_SIZE = 30;
const CENTER = SIZE / 2;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;

const START_ANGLE = 135;
const END_ANGLE = 405;
const SWEEP = END_ANGLE - START_ANGLE;

function degToRad(deg: number) {
  "worklet";
  return (deg * Math.PI) / 180;
}

function polarToCartesian(angle: number) {
  "worklet";
  const rad = degToRad(angle);
  return {
    x: CENTER + RADIUS * Math.cos(rad),
    y: CENTER + RADIUS * Math.sin(rad),
  };
}

function angleBetween(x: number, y: number) {
  "worklet";
  let angle = (Math.atan2(y - CENTER, x - CENTER) * 180) / Math.PI;
  if (angle < 0) angle += 360;
  if (angle < START_ANGLE) angle += 360;
  return angle;
}

function createArcPath(startAngle: number, endAngle: number) {
  "worklet";
  const start = polarToCartesian(startAngle);
  const end = polarToCartesian(endAngle);
  const sweep = endAngle - startAngle;
  const largeArc = sweep > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

const BG_ARC = (() => {
  const start = polarToCartesian(START_ANGLE);
  const end = polarToCartesian(END_ANGLE);
  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 1 1 ${end.x} ${end.y}`;
})();

type ArcSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  feeRate?: number;
  hasCrypto?: boolean;
  initialValue?: number;
  onValueChange?: (value: number) => void;
};

export default function ArcSlider({
  min = 50,
  max = 5000,
  step = 10,
  feeRate = 0.0622,
  hasCrypto = false,
  initialValue = 50,
  onValueChange,
}: ArcSliderProps) {
  const effectiveMax = hasCrypto ? 10000 : max;

  const progress = useSharedValue(
    Math.min((initialValue - min) / (effectiveMax - min), 1),
  );

  const [displayValue, setDisplayValue] = React.useState(initialValue);

  // Recalculate when max changes (crypto toggle)
  useEffect(() => {
    const clampedValue = Math.min(displayValue, effectiveMax);
    const newProgress = (clampedValue - min) / (effectiveMax - min);
    progress.value = withTiming(newProgress, { duration: 300 });
    setDisplayValue(clampedValue);
    onValueChange?.(clampedValue);
  }, [effectiveMax]);

  // const currentValue = useDerivedValue(() => {
  //   const raw = min + progress.value * (effectiveMax - min);
  //   return Math.round(raw / step) * step;
  // });

  const notify = useCallback(
    (v: number) => {
      onValueChange?.(v);
    },
    [onValueChange],
  );

  const updateDisplay = useCallback((v: number) => {
    setDisplayValue(v);
  }, []);

  const activeArcProps = useAnimatedProps(() => {
    const endAngle = START_ANGLE + progress.value * SWEEP;
    if (endAngle <= START_ANGLE + 1) {
      return { d: "", opacity: 0 };
    }
    return {
      d: createArcPath(START_ANGLE, endAngle),
      opacity: 1,
    };
  });
  const thumbCxProps = useAnimatedProps(() => {
    const angle = START_ANGLE + progress.value * SWEEP;
    const pos = polarToCartesian(angle);
    return { cx: pos.x, cy: pos.y };
  });

  const totalWithFees = useMemo(
    () => (displayValue + displayValue * feeRate).toFixed(2),
    [displayValue, feeRate],
  );

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      let angle = angleBetween(e.x, e.y);
      if (angle < START_ANGLE) angle = START_ANGLE;
      if (angle > END_ANGLE) angle = END_ANGLE;

      progress.value = (angle - START_ANGLE) / SWEEP;
      const raw = min + progress.value * (effectiveMax - min);
      const val = Math.round(raw / step) * step;
      runOnJS(updateDisplay)(val);
    })
    .onEnd(() => {
      const raw = min + progress.value * (effectiveMax - min);
      const val = Math.round(raw / step) * step;
      runOnJS(notify)(val);
    })
    .hitSlop({ top: 30, bottom: 30, left: 30, right: 30 });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={styles.svgWrapper}>
          <Svg width={SIZE} height={SIZE}>
            {/* Background track */}
            <Path
              d={BG_ARC}
              stroke="#ECECEC"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              fill="none"
            />
            {/* Active track */}
            <AnimatedPath
              animatedProps={activeArcProps}
              stroke={colors.primary}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              fill="none"
            />
            {/* Thumb — sits inside the thick track */}
            <AnimatedCircle
              animatedProps={thumbCxProps}
              r={THUMB_SIZE / 2}
              fill="#FFFFFF"
              stroke="#DEDEDE"
              strokeWidth={2}
            />
          </Svg>

          {/* Center text */}
          <View style={styles.centerText}>
            <Text style={styles.valueText}>
              ${displayValue.toLocaleString()}
            </Text>
            <Text style={styles.maxText}>
              <Text style={{ color: colors.primary }}>Max </Text>$
              {effectiveMax.toLocaleString()}
            </Text>
          </View>
        </Animated.View>
      </GestureDetector>

      {/* Min / Max labels */}
      <View style={styles.rangeLabels}>
        <Text style={styles.rangeText}>${min}</Text>
        <Text style={styles.rangeText}>${effectiveMax.toLocaleString()}</Text>
      </View>

      {/* Total with fees */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total amount</Text>
          <Text style={styles.totalSub}>
            with applicable{" "}
            <Text
              style={{
                color: colors.primary,
                textDecorationLine: "underline",
              }}
            >
              fees
            </Text>
            : ${totalWithFees}
          </Text>
        </View>
        <Pressable style={styles.arrowBtn}>
          <Feather name="arrow-right" size={24} color={colors.textWhite} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
  },
  svgWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerText: {
    position: "absolute",
    alignItems: "center",
  },
  valueText: {
    fontSize: 36,
    fontWeight: "800",
    color: "#1A1A2E",
  },
  maxText: {
    fontSize: 14,
    color: "#6B6B80",
    marginTop: 2,
  },
  rangeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: -10,
    width: width * 0.6,
    marginHorizontal: "auto",
  },
  rangeText: {
    fontSize: 14,
    color: "#6B6B80",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "500",
  },
  totalSub: {
    fontSize: 13,
    color: "#6B6B80",
    marginTop: 2,
  },
  arrowBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1A1A2E",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
