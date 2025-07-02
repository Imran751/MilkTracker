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

const SummaryScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [waterAmount, setWaterAmount] = useState('');
  const [waterData, setWaterData] = useState({});
  const [costPerDay, setCostPerDay] = useState({});
  const [lastEnteredCost, setLastEnteredCost] = useState(40);
  const [costInput, setCostInput] = useState('');
  const defaultCost = 40;
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedWaterData = await AsyncStorage.getItem('waterData');
        const savedCostPerDay = await AsyncStorage.getItem('waterCostPerDay');
        const savedLastCost = await AsyncStorage.getItem('lastEnteredCost');

        if (savedWaterData) setWaterData(JSON.parse(savedWaterData));
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
      await AsyncStorage.setItem('waterData', JSON.stringify(waterData));
      await AsyncStorage.setItem('waterCostPerDay', JSON.stringify(costPerDay));
      await AsyncStorage.setItem('lastEnteredCost', lastEnteredCost.toString());
    } catch (error) {
      console.error('Failed to save data', error);
    }
  }, [waterData, costPerDay, lastEnteredCost]);

  const saveWaterAmount = useCallback(() => {
    if (selectedDate && waterAmount) {
      const price = costPerDay[selectedDate] ?? lastEnteredCost;
      const updated = {
        ...waterData,
        [selectedDate]: {
          amount: parseFloat(waterAmount),
          price: price,
        },
      };
      if (JSON.stringify(updated) !== JSON.stringify(waterData)) {
        setWaterData(updated);
        setWaterAmount('');
        saveDataToStorage();
      }
    } else {
      alert('Please select a date and enter the water amount');
    }
  }, [selectedDate, waterAmount, waterData, costPerDay, lastEnteredCost, saveDataToStorage]);

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
    const totalWater = Object.values(waterData).reduce((acc, data) => acc + data.amount, 0);
    const totalCost = Object.values(waterData).reduce((acc, data) => acc + data.amount * data.price, 0);
    return { totalWater, totalCost };
  };

  const { totalWater, totalCost } = calculateSummary();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <HamburgerIcon />
      <Text style={styles.title}>Water Record</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={[styles.calendarContainer, { width: width > height ? '90%' : '100%' }]}>
          <Calendar
            markedDates={Object.keys(waterData).reduce((acc, date) => {
              acc[date] = { selected: true, selectedColor: 'blue' };
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
              placeholder="Enter water # of Cans"
              keyboardType="numeric"
              value={waterAmount}
              onChangeText={setWaterAmount}
            />
            <Button title="Save" onPress={saveWaterAmount} />
          </View>
        )}

        <View style={styles.waterDataContainer}>
          <Text style={styles.dataTitle}>Water Record for the Month:</Text>
          {Object.entries(waterData).map(([date, data], index) => {
            const { amount, price } = data;
            const dailyCost = amount * price;
            return (
              <Text key={date} style={styles.waterData}>
                {index + 1}. {date}: {amount} Cans × Rs. {price} = Rs. {dailyCost.toFixed(0)}
              </Text>
            );
          })}
        </View>

        {selectedDate && (
          <View style={styles.costContainer}>
            <Text style={styles.costTitle}>Set Water Cost for {selectedDate}:</Text>
            <TextInput
              style={styles.input}
              placeholder={`Default is Rs. ${lastEnteredCost}/can`}
              keyboardType="numeric"
              value={costInput}
              onChangeText={handleCostChange}
            />
          </View>
        )}

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Summary for the Month:</Text>
          <Text style={styles.summaryText}>Total Water Consumed: {totalWater} Cans</Text>
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
  hamburgerWrapper: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    zIndex: 10,
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
  waterDataContainer: {
    marginTop: 20,
    padding: 10,
    width: '90%',
  },
  dataTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  waterData: {
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

export default SummaryScreen;
