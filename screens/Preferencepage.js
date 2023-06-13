import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const categories = [

  { name: 'Historical', image: require('../assets/Historical_Sites.jpg') },
  { name: 'Landmarks', image: require('../assets/Landmark.jpg') },
  { name: 'Religious', image: require('../assets/Religious_place.jpg') },
  { name: 'Wonders', image: require('../assets/Natural_Wonders.jpg') },
  { name: 'Architectural', image: require('../assets/Architectural_Marvels.jpg') },
  { name: 'Scenic Beauty', image: require('../assets/Scenic_Beauty.jpg') },
  { name: 'Sanctuaries', image: require('../assets/Wildlife.jpg') },
  { name: 'Beaches', image: require('../assets/Beaches.jpg') },
  { name: 'Hill Stations', image: require('../assets/Hill_station.jpg') },
  { name: 'Parks', image: require('../assets/Garden.jpg') },
];

const PreferencePage = () => {
  const navigaton=useNavigation();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const maxSelections = 3;
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setShowButton(selectedCategories.length === maxSelections);
  }, [selectedCategories]);

  const handleCategorySelection = (category) => {
    if (selectedCategories.includes(category)) {
      const updatedCategories = selectedCategories.filter((selectedCategory) => selectedCategory !== category);
      setSelectedCategories(updatedCategories);
    } else {
      if (selectedCategories.length < maxSelections) {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  const isCategorySelected = (category) => selectedCategories.includes(category);

  const handleButtonClick = () => {
    navigaton.navigate("Login")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Please select 3 Categories</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.categoryContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryItem,
                isCategorySelected(category.name) && styles.selectedCategoryItem,
              ]}
              onPress={() => handleCategorySelection(category.name)}
            >
              <Image source={category.image} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {showButton && (
        <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign:'center'
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryItem: {
    width: '45%',
    margin: 8,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  selectedCategoryItem: {
    backgroundColor: '#a9a9a9',
  },
  categoryImage: {
    width: 120,
    height: 120,
    marginBottom: 8,
    borderRadius: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PreferencePage;
