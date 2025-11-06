import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from '@/theme/provider';
import {
  Button,
  Input,
  Card,
  Heading1,
  Heading2,
  Body,
  Caption,
  Spinner,
  Skeleton,
  Progress,
} from './index';

/**
 * Component showcase demonstrating all UI components
 */
export const ComponentShowcase: React.FC = () => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(45);

  const handleButtonPress = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [loading]);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{
        padding: theme.spacing[4],
        gap: theme.spacing[4],
      }}
    >
      {/* Typography Section */}
      <Card variant="elevated">
        <Heading2>Typography Components</Heading2>
        <View style={{ gap: theme.spacing[2], marginTop: theme.spacing[3] }}>
          <Heading1>Heading 1 - Large Title</Heading1>
          <Heading2>Heading 2 - Section Title</Heading2>
          <Body>Body text for regular content and paragraphs.</Body>
          <Caption color="secondary">
            Caption text for additional information
          </Caption>
        </View>
      </Card>

      {/* Button Section */}
      <Card variant="outlined">
        <Heading2>Button Components</Heading2>
        <View style={{ gap: theme.spacing[3], marginTop: theme.spacing[3] }}>
          <View style={{ flexDirection: 'row', gap: theme.spacing[2] }}>
            <Button title="Primary" variant="primary" size="sm" />
            <Button title="Secondary" variant="secondary" size="sm" />
          </View>
          <View style={{ flexDirection: 'row', gap: theme.spacing[2] }}>
            <Button title="Outline" variant="outline" size="md" />
            <Button title="Ghost" variant="ghost" size="md" />
          </View>
          <Button
            title="Loading Button"
            variant="primary"
            loading={loading}
            onPress={handleButtonPress}
            fullWidth
          />
        </View>
      </Card>

      {/* Input Section */}
      <Card variant="filled">
        <Heading2>Input Components</Heading2>
        <View style={{ gap: theme.spacing[3], marginTop: theme.spacing[3] }}>
          <Input
            label="Default Input"
            placeholder="Enter text here..."
            value={inputValue}
            onChangeText={setInputValue}
            helperText="This is helper text"
          />
          <Input
            label="Filled Input"
            variant="filled"
            placeholder="Filled variant"
          />
          <Input
            label="Error State"
            placeholder="Input with error"
            error="This field is required"
          />
        </View>
      </Card>

      {/* Loading Section */}
      <Card variant="elevated">
        <Heading2>Loading Components</Heading2>
        <View style={{ gap: theme.spacing[4], marginTop: theme.spacing[3] }}>
          <View>
            <Caption
              color="secondary"
              style={{ marginBottom: theme.spacing[2] }}
            >
              Spinners
            </Caption>
            <View
              style={{
                flexDirection: 'row',
                gap: theme.spacing[4],
                alignItems: 'center',
              }}
            >
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </View>
          </View>

          <View>
            <Caption
              color="secondary"
              style={{ marginBottom: theme.spacing[2] }}
            >
              Skeleton Loading
            </Caption>
            <View style={{ gap: theme.spacing[2] }}>
              <Skeleton height={20} width="80%" />
              <Skeleton height={16} width="60%" />
              <Skeleton height={16} width="40%" />
            </View>
          </View>

          <View>
            <Caption
              color="secondary"
              style={{ marginBottom: theme.spacing[2] }}
            >
              Progress Bar
            </Caption>
            <Progress value={progress} showText />
            <View
              style={{
                flexDirection: 'row',
                gap: theme.spacing[2],
                marginTop: theme.spacing[2],
              }}
            >
              <Button
                title="Decrease"
                variant="outline"
                size="sm"
                onPress={() => setProgress(Math.max(0, progress - 10))}
              />
              <Button
                title="Increase"
                variant="outline"
                size="sm"
                onPress={() => setProgress(Math.min(100, progress + 10))}
              />
            </View>
          </View>
        </View>
      </Card>

      {/* Card Variants */}
      <View>
        <Heading2 style={{ marginBottom: theme.spacing[3] }}>
          Card Variants
        </Heading2>
        <View style={{ gap: theme.spacing[3] }}>
          <Card variant="elevated" padding={3}>
            <Body>Elevated Card - Uses shadow for depth</Body>
          </Card>
          <Card variant="outlined" padding={3}>
            <Body>Outlined Card - Uses border for definition</Body>
          </Card>
          <Card variant="filled" padding={3}>
            <Body>Filled Card - Uses background color</Body>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};
