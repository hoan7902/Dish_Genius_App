import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback, useMemo, useState } from "react";
import { HStack, Text } from "native-base";
import { Colors } from "@/Theme/Variables";
import SvgUri from "react-native-svg-uri";
import { useAppSelector } from "@/Hooks/redux";
import { addFavouriteDishById, getFavouriteDishIds, removeFavouriteDishById } from "@/api";
import { setListFavouriteIds } from "@/Store/reducers";
import { useDispatch } from "react-redux";

const FoodDetails = ({ item, onPress }: { item: any, onPress: any }) => {
  const userId = useAppSelector(state => state.user.userId);
  const listFavouriteIds = useAppSelector(state => state.home.listFavouriteIds);
  const isFavourite = useMemo(() => listFavouriteIds?.includes(item?.id), [item, listFavouriteIds]);
  const [isRed, setIsRed] = useState(isFavourite);
  const dispatch = useDispatch();
  
  const handleAddToFavourite = useCallback(async () => {
    setIsRed(!isRed);
    if (isFavourite) {
      await removeFavouriteDishById(item?.id);
    } else {
      await addFavouriteDishById(item?.id);
    }
    const resFavouriteIds = await getFavouriteDishIds();
    dispatch(setListFavouriteIds({ listFavouriteIds: resFavouriteIds.data.ids}));
  }, [userId]);


  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {item?.thumbnail_url && (
        <Image
          source={{ uri: item?.thumbnail_url || '' }}
          style={styles.image}
        />
      )}
      <Text style={styles.titleName}>{item?.name}</Text>
      <Text style={styles.textDescription}>{item?.description}</Text>
      <View style={styles.subInformation}>
        <HStack style={{ alignItems: 'center', gap: 4 }}>
          <SvgUri source={require('../../../assets/Star.svg')} />
          <Text>{`Score: ${(item?.user_ratings?.score * 100 || 0).toFixed(2)} / 100`}</Text>
        </HStack>
        <Text style={styles.timeCook}>{`${item?.cook_time_minutes || '20'} m`}</Text>
        {userId && 
          <TouchableOpacity onPress={handleAddToFavourite}>
            {(isRed) ? 
              <SvgUri source={require('../../../assets/Heart_Active.svg')} /> 
            : <SvgUri source={require('../../../assets/Heart_Inactive.svg')} />}
            
          </TouchableOpacity>}
      </View>
    </TouchableOpacity>
  );
};

export default memo(FoodDetails);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
    gap: 24,
    width: 300,
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 15
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  titleName: {
    color: Colors.TEXT_DARK,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: 0.5,
  },
  textDescription: {
    color: Colors.TEXT_DESCRIPTION,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
    textAlign: 'center'
  },
  subInformation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 24,
    fontSize: 12,
    width: '100%'
  },
  timeCook: {
    color: Colors.SECONDARY,
    fontWeight: '700'
  }
});
