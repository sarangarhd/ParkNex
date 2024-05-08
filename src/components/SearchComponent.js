import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  Keyboard,
} from 'react-native';
import {TextInput as RNTextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {colors} from '../global/Styles';
import {Icon} from 'react-native-elements';
import {width} from '@fortawesome/free-brands-svg-icons/fa42Group';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {filterData} from '../global/Data';
import filter from 'lodash/filter';

export default function SearchComponent() {
  const navigation = useNavigation();
  const [data, setData] = useState([...filterData]);
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputFossued, setTextInputFossued] = useState(true);
  const textInputref = useRef(0);


  const contains = ({name}, query) => {
    if (name.includes(query)) {
      return true;
    }
    return false;
  }


  const handleSearch = text => {
    const datas = filter(filterData, userSearch =>{
      return contains(userSearch, text);
    
    })
    setData([...datas])
  }




  return (
    <View style={styles.horastyle}>
      <TouchableWithoutFeedback
        onPress={() => {
          setModalVisible(true);
        }}>
        <View style={styles.SearchArea}>
          <Icon
            name="search"
            style={styles.searchIcon}
            size={32}
            iconStyle={{marginLeft: 10}}
          />
          <Text style={{fontSize: 15}}>What Are you Looking for</Text>
        </View>
      </TouchableWithoutFeedback>
      <Modal animationType="fade" transparent={false} visible={modalVisible}>
        <View style={styles.modal}>
          <View style={styles.view1}>
            <View style={styles.TextInput}>
              <Animatable.View
                animation={textInputFossued ? 'fadeInRight' : 'fadeInLeft'}
                duration={400}>
                <Icon
                  name={textInputFossued ? 'arrow-back' : 'search'}
                  onPress={() => {
                    if (textInputFossued) {
                      setModalVisible(false);
                      setTextInputFossued(true);
                    }
                  }}
                  style={styles.icon2}
                  size={24}
                  iconStyle={{marginRight: 5}}
                />
              </Animatable.View>
              <RNTextInput
                placeholder=""
                style={{width: '90%'}}
                autoFocus={false}
                ref={textInputref}
                onFocus={() => {
                  setTextInputFossued(true);
                }}
                onBlur={() => {
                  setTextInputFossued(false);
                }}
                onChangeText={text => {
                  handleSearch(text);
                }}
              />

              <Animatable.View
                animation={textInputFossued ? 'fadeInLeft' : ''}
                duration={400}
                >
                <Icon
                  name={textInputFossued ? 'cancel' : null}
                  iconStyle={{color: colors.grey2}}
                  style={{marginRight: -10}}
                  onPress={() => {
                    textInputref.current.clear();
                    setTextInputFossued(true);
                    // handleSearch();
                  }}
                />
              </Animatable.View>
            </View>
          </View>

          <FlatList
            data={data}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  navigation.navigate('SearchResult', {item: item.name});
                  setModalVisible(false);
                  setTextInputFossued(true);
                }}>
                <View style={styles.view2}>
                  <Text style={{color: 'grey', fontSize: 15}}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  horastyle: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: colors.grey4,
  },
  TextInput: {
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 0,
    borderColor: '#86939e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchIcon: {
    color: colors.grey2,
    fontSize: 24,
    padding: 5,
  },
  SearchArea: {
    marginTop: 10,
    width: '95%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grey4,
    // marginHorizontal:10,
    // marginVertical:10,
    // justifyContent:'space-between',
  },
  view1: {
    height: 70,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  view2: {
    fontSize: 24,
    padding: 5,
    color: colors.grey2,
  },
  icon2: {
    color: colors.grey2,
    fontSize: 24,
    padding: 5,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignItems:'center',
    // backgroundColor:'rgba(0,0,0,0.5)',
  },
});
