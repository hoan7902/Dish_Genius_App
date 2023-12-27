// import Video from 'react-native-video';
import Video from 'react-native-video';
import React, { memo } from 'react';
import { View } from 'react-native';

const VideoPlayer = ({ urlVideo } : { urlVideo: string}) => (
  <View style={{ flex: 1 }}>
    <Video
      source={{ uri: urlVideo}}
    />
  </View>
);

export default memo(VideoPlayer);
