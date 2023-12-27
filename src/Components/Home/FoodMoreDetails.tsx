import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ScrollView } from "native-base";
import { Colors } from "@/Theme/Variables";
// import VideoPlayer from "../Video";
import SvgUri from "react-native-svg-uri";
import { RootScreens } from "@/Screens";

interface FoodMoreDetailsProps {
  food: any;
  navigation?: any,
}

interface SectionInfoProps {
  title: string;
  description: string;
}


const SectionInfo: React.FC<SectionInfoProps> = ({ title, description }: SectionInfoProps) => (
  <View style={styles.sectionInfo}>
    <Text style={styles.textTitle}>{title}</Text>
    <Text style={styles.textSub}>{description}</Text>
  </View>
);

const SectionStep: React.FC = ({ number, content}) => <View style={styles.stepsContainer}>
  <View style={styles.number}>
    <Text style={{ color: Colors.WHITE }}>{number}</Text>
  </View>
  <Text style={styles.textSubBold}>{content}</Text>
</View>;

const FoodMoreDetails: React.FC<FoodMoreDetailsProps> = ({ food, navigation }) => (
  <View style={styles.container}>
    <Image
      source={{ uri: food.thumbnailUrl }}
      style={styles.image}
    />
    <TouchableOpacity style={styles.iconBack} onPress={() => navigation?.navigate(RootScreens.HOME)}>
      <SvgUri 
        source={require('../../../assets/arrow-left.svg')}
      />
    </TouchableOpacity>
    <ScrollView style={styles.scrollView}>
      <View style={styles.homeIndicator} />
      <View style={styles.infoContainer}>
        <SectionInfo title={food.name} description={`Food - ${food.totalTimeTier.display_tier || '30 mins'}`} />
        <SectionInfo title="Description" description={food.description} />
        <View style={styles.sectionInfo}>
          <Text style={styles.textTitle}>Ingredients</Text>
          {food.ingredients.map((ingredient, index) => (
            <Text key={index} style={[styles.textSubBold, { textTransform: 'capitalize' }]}>
              {ingredient}
            </Text>
            ))}
        </View>
        <View style={styles.sectionInfo}>
          <Text style={styles.textTitle}>Steps</Text>
          {food.instructions.map((instruction, idx) => (
            <SectionStep key={idx} number={idx + 1} content={instruction.display_text} />
            ))}
        </View>
      </View>
      {/* Chưa import video được, hichic:< */}
      {/* <VideoPlayer urlVideo={food.urlVideo} /> */}
    </ScrollView>
  </View>
);

export default FoodMoreDetails;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    marginBottom: 230
  },
  image: {
    width: 'auto',
    height: '50%',
    resizeMode: 'cover',
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -100,
    position: 'relative',
  },
  homeIndicator: {
    position: 'absolute',
    top: 10,
    left: '50%',
    transform: [{ translateX: -20 }],
    backgroundColor: Colors.GRAY_INDICATOR,
    borderRadius: 100,
    height: 5,
    width: 40,
    marginBottom: 10
  },
  infoContainer: {
    marginTop: 15,
  },
  textTitle: {
    color: Colors.NAVY,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 27,
    letterSpacing: 0.50,
    wordWrap: 'break-word'
  },
  textSub: {
    color: Colors.TEXT_SECONDARY,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: 0.50,
    wordWrap: 'break-word',
  },
  textSubBold: {
    color: '#2E3E5C',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: 0.50,
    wordWrap: 'break-word'
  },
  sectionInfo: {
    display: 'flex',
    gap: 8,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_INDICATOR,
    borderBottomStyle: 'solid',
  },
  number: {
    backgroundColor: '#2E3E5C', 
    marginTop: 5,
    height: 24,
    width: 24,
    borderRadius: 12,
    color: Colors.WHITE,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  stepsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    marginRight: 20
  },
  iconBack: {
    width: 40,
    height: 40,
    backgroundColor: Colors.PRIMARY,
    position: 'relative',
    top: -280,
    left: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    zIndex: 2
  }
});
