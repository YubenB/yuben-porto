---
slug: building-a-complete-camera-experience-in-react-native-with-expo
title: Building a Complete Camera Experience in React Native with Expo
date: 2025-09-11
readingTime: 15 min read
thumbnail: /images/articles/building-a-complete-camera-experience-in-react-native-with-expo.png
excerpt: Mobile apps often need camera functionality beyond just taking a simple photo. Maybe you want to toggle flash, zoom in and out, switch between front and back cameras, or even preview captured media.
---

Mobile apps often need camera functionality beyond just taking a simple photo. Maybe you want to toggle flash, zoom in and out, switch between front and back cameras, or even preview captured media. In this post, I’ll walk through building a **full camera experience in React Native using Expo** with the lessons I learned while implementing this in a real-world project.

## Why Use Expo for Camera Features?

Expo provides the [expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/) package, which simplifies camera access across iOS and Android. It handles permission requests, camera preview rendering, photo/video capture, and basic controls like flash and zoom.

By combining this with React Native’s modal and state management (Zustand, Redux, or React Context), you can create a **smooth, production-ready camera flow**.

## Step 1: Install and Setup

First, install the necessary dependencies:

```bash
expo install expo-camera expo-media-library expo-permissions
```

> **expo-media-library** lets you save captured photos/videos and access existing media.

Request permissions inside your app:

```tsx
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const mediaStatus = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(
        status === "granted" && mediaStatus.status === "granted"
      );
    })();
  }, []);

  if (hasPermission === null) return <Text>Requesting permissions...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return <Text>Camera ready</Text>;
}
```

## Step 2: Building the Camera Modal

A good UX is to open the camera inside a **modal**, so users can take a picture/video without leaving the current screen.

```tsx
import { Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useRef, useState } from "react";

export function CameraModal({ visible, onClose, onCapture }) {
  const cameraRef = useRef<Camera | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [zoom, setZoom] = useState(0);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      onCapture(photo);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <Camera
        style={{ flex: 1 }}
        type={type}
        flashMode={flash}
        zoom={zoom}
        ref={cameraRef}
      >
        {/* Controls overlay */}
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() =>
              setFlash(flash === FlashMode.off ? FlashMode.on : FlashMode.off)
            }
          >
            <Text style={styles.text}>
              {flash === FlashMode.off ? "Flash Off" : "Flash On"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              )
            }
          >
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={takePhoto}>
            <View style={styles.shutter} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.text}>Close</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </Modal>
  );
}

const styles = StyleSheet.create({
  controls: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
  },
  text: { color: "white", fontSize: 18, margin: 10 },
  shutter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
  },
});
```

## Step 3: Adding Zoom Control

Zoom can be handled by updating the **zoom** prop of the **Camera**. You can map it to a slider:

```tsx
import Slider from "@react-native-community/slider";

<Slider
  style={{ width: 200 }}
  minimumValue={0}
  maximumValue={1}
  step={0.1}
  value={zoom}
  onValueChange={setZoom}
/>;
```

This gives users fine control over zoom levels.

## Step 4: Capturing and Previewing Media

After capturing a photo/video, you usually want to show a **thumbnail preview** before confirming:

```tsx
import { Image } from "react-native";

function Preview({ photo, onRetake, onSave }) {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Image
        source={{ uri: photo.uri }}
        style={{ flex: 1 }}
        resizeMode="contain"
      />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button title="Retake" onPress={onRetake} />
        <Button title="Save" onPress={onSave} />
      </View>
    </View>
  );
}
```

To save:

```tsx
await MediaLibrary.saveToLibraryAsync(photo.uri);
```

## Step 5: Recording Video

To enable video recording:

```tsx
const recordVideo = async () => {
  if (cameraRef.current) {
    const video = await cameraRef.current.recordAsync();
    onCapture(video);
  }
};

const stopRecording = () => {
  if (cameraRef.current) {
    cameraRef.current.stopRecording();
  }
};
```

Add a **long-press gesture** on the shutter button to start recording and release to stop.

## Common Gotchas

- **Upside-down camera preview** → Make sure to test on both Android and iOS. Sometimes you need to wrap the preview in a **transform: [{ rotate: '180deg' }]** if the orientation is wrong.
- **Performance** → Avoid too many re-renders while recording video. Keep camera controls lightweight.
- **Permissions** → Always check both Camera and MediaLibrary permissions, or saving will fail.

## Wrapping Up

With Expo Camera, you can go far beyond a simple photo capture. By combining **modal navigation, flash toggles, zoom sliders, media previews, and video recording**, you can deliver a professional-grade camera experience right inside your app.

If you’re building a mobile app that requires custom media capture, this approach saves you from reinventing the wheel while still giving you full control over UX.
