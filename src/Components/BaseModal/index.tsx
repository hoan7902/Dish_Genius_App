import React, { memo, useState } from 'react';
import { Text, View, Modal } from 'native-base';
import { GestureResponderEvent, Image } from 'react-native';
import { Colors } from '@/Theme/Variables';
import BaseButton from '../BaseButton';

interface BaseModalProps {
  buttonText?: string;
  onPressButton?: (event: GestureResponderEvent) => void;
  isModalVisible?: boolean;
  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: any,
  title: string,
  description: string,
}

const BaseModal: React.FC<BaseModalProps> = ({ 
  buttonText = "Login", 
  onPressButton, 
  isModalVisible, 
  onClose,
  title,
  description
}) => (
  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Modal isOpen={isModalVisible} onClose={onClose}>
      <Modal.Content>
        <Modal.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
          <Image
              source={require('../../../assets/Congratulation.png')}
            />
          <Text style={{ color: Colors.NAVY, fontWeight: 700, fontSize: 22 }}>{title}</Text>
          <Text style={{ fontSize: 15 }}>{description}</Text>
          <BaseButton
            buttonText={buttonText}
            buttonColor={Colors.PRIMARY}
            buttonTextColor="white"
            onPress={onPressButton}
            width={250}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  </View>
);

export default memo(BaseModal);
