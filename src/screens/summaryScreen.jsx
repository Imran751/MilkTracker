import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Button, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Header from '../componets/header';
import HamburgerIcon from '../componets/hamburgerIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWindowDimensions } from 'react-native';

const SummaryScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [waterAmount, setWaterAmount] = useState('');
  const [waterData, setWaterData] = useState({});
  const [costPerDay, setCostPerDay] = useState({});
  const defaultCost = 5; // Default cost for water, can be adjusted
  const { width, height } = useWindowDimensions();

  // Load saved data from AsyncStorage on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedWaterData = await AsyncStorage.getItem('waterData');
        const savedCostPerDay = await AsyncStorage.getItem('waterCostPerDay');

        if (savedWaterData) {
          console.log('Loaded water data:', savedWaterData);
          setWaterData(JSON.parse(savedWaterData));
        }
        if (savedCostPerDay) {
          console.log('Loaded cost data:', savedCostPerDay);
          setCostPerDay(JSON.parse(savedCostPerDay));
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage', error);
      }
    };
    loadData();
  }, []);

  // Save data to AsyncStorage
  const saveDataToStorage = useCallback(async () => {
    try {
      await AsyncStorage.setItem('waterData', JSON.stringify(waterData));
      await AsyncStorage.setItem('waterCostPerDay', JSON.stringify(costPerDay));
      console.log('Data saved to AsyncStorage');
    } catch (error) {
      console.error('Failed to save data to AsyncStorage', error);
    }
  }, [waterData, costPerDay]);

  // Save water amount
  const saveWaterAmount = useCallback(() => {
    if (selectedDate && waterAmount) {
      const updatedWaterData = {
        ...waterData,
        [selectedDate]: parseFloat(waterAmount),
      };

      // Check if the data has changed before updating
      if (JSON.stringify(updatedWaterData) !== JSON.stringify(waterData)) {
        setWaterData(updatedWaterData);
        setWaterAmount('');
        saveDataToStorage();
      }
    } else {
      alert('Please select a date and enter the water amount');
    }
  }, [selectedDate, waterAmount, waterData, saveDataToStorage]);

  // Save cost for the selected date
  const saveCost = useCallback((cost) => {
    if (selectedDate) {
      const updatedCostPerDay = {
        ...costPerDay,
        [selectedDate]: parseFloat(cost),
      };

      // Check if the data has changed before updating
      if (JSON.stringify(updatedCostPerDay) !== JSON.stringify(costPerDay)) {
        setCostPerDay(updatedCostPerDay);
        saveDataToStorage();
      }
    }
  }, [selectedDate, costPerDay, saveDataToStorage]);

  // Calculate summary (total water and total cost)
  const calculateSummary = () => {
    const totalWater = Object.values(waterData).reduce((acc, amount) => acc + amount, 0);
    const totalCost = Object.keys(waterData).reduce((acc, date) => {
      const cost = costPerDay[date] || defaultCost;
      return acc + waterData[date] * cost;
    }, 0);
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
              placeholder="Enter water amount (liters)"
              keyboardType="numeric"
              value={waterAmount}
              onChangeText={setWaterAmount}
            />
            <Button title="Save" onPress={saveWaterAmount} />
          </View>
        )}

        <View style={styles.waterDataContainer}>
          <Text style={styles.dataTitle}>Water Record for the Month:</Text>
          {Object.entries(waterData).map(([date, amount], index) => {
            const dailyCost = (costPerDay[date] || defaultCost) * amount;
            return (
              <Text key={date} style={styles.waterData}>
                {index + 1}. {date}: {amount} Liters - Rs. {dailyCost.toFixed(0)}
              </Text>
            );
          })}
        </View>

        {selectedDate && (
          <View style={styles.costContainer}>
            <Text style={styles.costTitle}>Set Water Cost for {selectedDate}:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter cost per liter (e.g. 50)"
              keyboardType="numeric"
              value={(costPerDay[selectedDate] || '').toString()}
              onChangeText={saveCost}
            />
          </View>
        )}

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Summary for the Month:</Text>
          <Text style={styles.summaryText}>Total Water Consumed: {totalWater} Liters</Text>
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
