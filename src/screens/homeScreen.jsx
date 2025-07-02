import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  ScrollView,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Header from '../componets/header';
import HamburgerIcon from '../componets/hamburgerIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [milkAmount, setMilkAmount] = useState('');
  const [milkData, setMilkData] = useState({});
  const [costPerDay, setCostPerDay] = useState({});
  const [lastEnteredCost, setLastEnteredCost] = useState(140);
  const [costInput, setCostInput] = useState('');
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedMilkData = await AsyncStorage.getItem('milkData');
        const savedCostPerDay = await AsyncStorage.getItem('costPerDay');
        const savedLastCost = await AsyncStorage.getItem('lastEnteredCostMilk');

        if (savedMilkData) setMilkData(JSON.parse(savedMilkData));
        if (savedCostPerDay) setCostPerDay(JSON.parse(savedCostPerDay));
        if (savedLastCost) setLastEnteredCost(parseFloat(savedLastCost));
      } catch (error) {
        console.error('Error loading data', error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const existingCost = costPerDay[selectedDate];
      setCostInput(existingCost !== undefined ? existingCost.toString() : lastEnteredCost.toString());
    }
  }, [selectedDate, costPerDay, lastEnteredCost]);

  const saveDataToStorage = useCallback(async () => {
    try {
      await AsyncStorage.setItem('milkData', JSON.stringify(milkData));
      await AsyncStorage.setItem('costPerDay', JSON.stringify(costPerDay));
      await AsyncStorage.setItem('lastEnteredCostMilk', lastEnteredCost.toString());
    } catch (error) {
      console.error('Failed to save data', error);
    }
  }, [milkData, costPerDay, lastEnteredCost]);

  const saveMilkAmount = useCallback(() => {
    if (selectedDate && milkAmount) {
      const updated = { ...milkData, [selectedDate]: parseFloat(milkAmount) };
      if (JSON.stringify(updated) !== JSON.stringify(milkData)) {
        setMilkData(updated);
        setMilkAmount('');
        saveDataToStorage();
      }
    } else {
      alert('Please select a date and enter the milk amount');
    }
  }, [selectedDate, milkAmount, milkData, saveDataToStorage]);

  const handleCostChange = (text) => {
    setCostInput(text);
    const parsed = parseFloat(text);
    if (!isNaN(parsed)) {
      const updated = { ...costPerDay, [selectedDate]: parsed };
      setCostPerDay(updated);
      setLastEnteredCost(parsed);
      saveDataToStorage();
    }
  };

  const calculateSummary = () => {
    const totalMilk = Object.values(milkData).reduce((acc, amount) => acc + amount, 0);
    const totalCost = Object.keys(milkData).reduce((acc, date) => {
      const cost = costPerDay.hasOwnProperty(date) ? costPerDay[date] : lastEnteredCost;
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
            const dailyCost = (costPerDay.hasOwnProperty(date) ? costPerDay[date] : lastEnteredCost) * amount;
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
              placeholder={`Default: Rs. ${lastEnteredCost}/liter`}
              keyboardType="numeric"
              value={costInput}
              onChangeText={handleCostChange}
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
    backgroundColor: '#ffffff',
    paddingTop: 20,
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
