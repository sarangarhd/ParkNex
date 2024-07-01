import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {colors} from '../global/Styles';

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About ParkNex</Text>
      <Text style={styles.description}>
        ParkNex is an innovative parking management system designed to make the
        process of finding and reserving parking spaces easier and more
        efficient. Our app provides real-time information on parking
        availability, allowing users to book slots in advance and manage their
        reservations seamlessly. ParkNex aims to reduce the time and stress
        associated with parking, ultimately improving the overall urban
        experience.
      </Text>
      <Text style={styles.description}>
        Whether you're a business owner managing a parking lot or an individual
        looking for a convenient parking spot, ParkNex offers a range of
        features to cater to your needs. Our user-friendly interface and
        comprehensive functionalities ensure that parking management is as
        smooth as possible.
      </Text>
      <Text style={styles.description}>Key Features:</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          - Real-time parking slot availability
        </Text>
        <Text style={styles.listItem}>
          - Easy slot booking and reservation management
        </Text>
        <Text style={styles.listItem}>- User profile customization</Text>
        <Text style={styles.listItem}>- Secure payment processing</Text>
        <Text style={styles.listItem}>
          - Business console for parking lot owners
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Final Year Project</Text>
      <Text style={styles.description}>
        This application was developed as part of a final year project at SIBA
        Campus.
      </Text>
      <Text style={styles.description}>Supervisor: Ms. Samodya Bandara</Text>

      <Text style={styles.description}>Student Name: R.H.D. Saranaga</Text>
      <Text style={styles.description}>Student Number: BSC/WD/21/29/15</Text>
    </ScrollView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.buttons,
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: colors.grey1,
    marginBottom: 10,
    textAlign: 'justify',
  },
  listItem: {
    fontSize: 16,
    color: colors.grey1,
    marginLeft: 15,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.grey1,
    marginTop: 20,
    marginBottom: 10,
  },
  list:{
    textAlign: 'justify',
  },
});
