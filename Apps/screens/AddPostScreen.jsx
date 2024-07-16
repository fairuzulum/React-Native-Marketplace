import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { app } from "../../firebaseConfig";
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function AddPostScreen() {
  const [image, setImage] = useState(null);
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  const storage = getStorage();

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = async (value) => {
    const resp = await fetch(image);
    const blob = await resp.blob();
    const storageRef = ref(storage, `voidPost/` + Date.now() + ".jpg");
    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          value.image = image;

          const docRef = await addDoc(collection(db, "UserPost"), value);
          if (docRef.id) {
            ToastAndroid.show("Post Added", ToastAndroid.SHORT);
          }
        });
      });
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          title: "",
          desc: "",
          category: "",
          address: "",
          price: "",
          image: "",
        }}
        onSubmit={(value) => onSubmitMethod(value)}
        validate={(value) => {
          const errors = {};
          if (!value.title) {
            console.log("title is required");
            ToastAndroid.show("Title is required", ToastAndroid.SHORT);
            errors.title = "Title is required";
          }

          return errors;
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
        }) => (
          <View style={styles.form}>
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <Image
                  source={require("../../assets/images/placeholder.png")}
                  style={styles.image}
                />
              )}
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <Icon name="title" size={20} color="#000" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Title"
                value={values.title}
                onChangeText={handleChange("title")}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon
                name="description"
                size={20}
                color="#000"
                style={styles.icon}
              />
              <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Description"
                value={values.desc}
                onChangeText={handleChange("desc")}
                multiline={true}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon
                name="attach-money"
                size={20}
                color="#000"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={values.price}
                onChangeText={handleChange("price")}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="place" size={20} color="#000" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={values.address}
                onChangeText={handleChange("address")}
              />
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={values.category}
                onValueChange={(itemValue) =>
                  setFieldValue("category", itemValue)
                }
              >
                {categoryList.length > 0 &&
                  categoryList.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.name}
                      value={item.name}
                    />
                  ))}
              </Picker>
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  form: {
    marginTop: 40,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    padding: 5,
    backgroundColor: "#f8f8f8",
  },
  picker: {
    height: 50,
  },
  imagePicker: {
    alignSelf: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
