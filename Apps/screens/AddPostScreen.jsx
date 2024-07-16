import { View, TextInput, StyleSheet, Button, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { app } from "../../firebaseConfig";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";

export default function AddPostScreen() {
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([])
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      console.log("Docs:", doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  return (
    <View className="p-10">

      <Formik
        initialValues={{
          title: '',
          desc: '',
          category: '',
          address: '',
          price: '',
          image: ''
        }}
        onSubmit={(value) => console.log(value)}
      >

        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={{ marginTop: 30 }}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={values.title}
              onChangeText={handleChange("title")}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={values.desc}
              onChangeText={handleChange("desc")}
              numberOfLines={5}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={values.price}
              onChangeText={handleChange("price")}
              keyboardType="number-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={values.address}
              onChangeText={handleChange("address")}
            />
            {/* <Picker
              style={styles.input}
              selectedValue={values.category}
              onValueChange={handleChange("category")}
            >
              {categoryList&&categoryList.map((item, index)=>(
                  <Picker.Item
                    key={index}
                    label={item.name}
                    value={item.name}
                  />
                ))}
            </Picker> */}

            <Button className="mt-7" title="submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
    marginBottom: 10,
  },
});
