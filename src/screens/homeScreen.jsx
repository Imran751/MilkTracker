import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Button, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Header from '../componets/header';
import HamburgerIcon from '../componets/hamburgerIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWindowDimensions } from 'react-native';

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [milkAmount, setMilkAmount] = useState('');
  const [milkData, setMilkData] = useState({});
  const [costPerDay, setCostPerDay] = useState({});
  const defaultCost = 140;
  const { width, height } = useWindowDimensions();

  // Load saved data from AsyncStorage on component mount
  useEffect(() => {
    const loadData = async () => {
      const savedMilkData = await AsyncStorage.getItem('milkData');
      const savedCostPerDay = await AsyncStorage.getItem('costPerDay');

      if (savedMilkData) setMilkData(JSON.parse(savedMilkData));
      if (savedCostPerDay) setCostPerDay(JSON.parse(savedCostPerDay));
    };
    loadData();
  }, []);

  // Save data to AsyncStorage
const saveDataToStorage = async () => {
  try {
    await AsyncStorage.setItem('milkData', JSON.stringify(milkData));
    await AsyncStorage.setItem('costPerDay', JSON.stringify(costPerDay));
  } catch (error) {
    console.error('Failed to save data to storage', error);
  }
};

  // Save milk amount
  const saveMilkAmount = () => {
    if (selectedDate && milkAmount) {
      const updatedMilkData = {
        ...milkData,
        [selectedDate]: parseFloat(milkAmount),
      };
      setMilkData(updatedMilkData);
      setMilkAmount('');
      saveDataToStorage(); // Save data after update
    } else {
      alert('Please select a date and enter the milk amount');
    }
  };

  // Save cost for the selected date
  const saveCost = (cost) => {
    if (selectedDate) {
      const updatedCostPerDay = {
        ...costPerDay,
        [selectedDate]: parseFloat(cost),
      };
      setCostPerDay(updatedCostPerDay);
      saveDataToStorage(); // Save data after update
    }
  };

  // Calculate summary
  const calculateSummary = () => {
    const totalMilk = Object.values(milkData).reduce((acc, amount) => acc + amount, 0);
    const totalCost = Object.keys(milkData).reduce((acc, date) => {
      const cost = costPerDay[date] || defaultCost;
      return acc + milkData[date] * cost;
    }, 0);
    return { totalMilk, totalCost };
  };

  const { totalMilk, totalCost } = calculateSummary();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <HamburgerIcon />
      <Text style={styles.title}>Milk Record</Text>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={[styles.calendarContainer, { width: width > height ? '90%' : '100%' }]}>
          <Calendar
            markedDates={Object.keys(milkData).reduce((acc, date) => {
              acc[date] = { selected: true, selectedColor: 'tomato' };
              return acc;
            }, {})}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            monthFormat={'yyyy MM'}
          />
        </View>

        {selectedDate && (
          <View style={styles.inputContainer}>
            <Text style={styles.dateText}>Selected Date: {selectedDate}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter milk amount (e.g. 1, 1.5, 2)"
              keyboardType="numeric"
              value={milkAmount}
              onChangeText={setMilkAmount}
            />
            <Button title="Save" onPress={saveMilkAmount} />
          </View>
        )}

        <View style={styles.milkDataContainer}>
          <Text style={styles.dataTitle}>Milk Record for the Month:</Text>
          {Object.entries(milkData).map(([date, amount], index) => {
            const dailyCost = (costPerDay[date] || defaultCost) * amount;
            return (
              <Text key={date} style={styles.milkData}>
                {index + 1}. {date}: {amount} Liters - Rs. {dailyCost.toFixed(0)}
              </Text>
            );
          })}
        </View>

        {selectedDate && (
  <View style={styles.costContainer}>
    <Text style={styles.costTitle}>Set Milk Cost for {selectedDate}:</Text>
    <TextInput
      style={styles.input}
      placeholder={`Enter cost per liter (default: ${defaultCost})`}
      keyboardType="numeric"
      // Show the entered cost if it exists, otherwise show default cost
      value={
        costPerDay[selectedDate] !== undefined
          ? costPerDay[selectedDate].toString()
          : ''
      }
      onChangeText={(cost) => {
        const updatedCostPerDay = {
          ...costPerDay,
          [selectedDate]: parseFloat(cost) || defaultCost,
        };
        setCostPerDay(updatedCostPerDay);
        saveDataToStorage(); // Save immediately after change
      }}
    />
  </View>
)}


        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Summary for the Month:</Text>
          <Text style={styles.summaryText}>Total Milk Consumed: {totalMilk} Liters</Text>
          <Text style={styles.summaryText}>Total Cost to Pay: Rs. {totalCost.toFixed(0)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    paddingTop: 20,
    width: '100%',
  },
  scrollViewContent: {
    paddingBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 100,
    textAlign: 'center',
  },
  calendarContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    width: '80%',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
  },
  milkDataContainer: {
    marginTop: 20,
    padding: 10,
    width: '90%',
  },
  dataTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  milkData: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 5,
  },
  costContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  costTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryText: {
    fontSize: 14,
    marginVertical: 5,
  },
});

export default HomeScreen;
