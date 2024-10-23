import { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Todo() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState<number>(0);
  const [editValue, setEditValue] = useState("");

  const addTodo = () => {
    if (input.trim() === "") {
      Alert.alert("Input Error", "Please add a todo before submitting.");
    } else {
      todo.unshift(input);
      setTodo([...todo]);
      setInput("");
    }
  };
  

  const updateTodo = (index: number) => {
    todo[index] = editValue;
    setTodo([...todo]);
    setIndex(0);
    setEditValue("");
    setModalVisible(false);
  };

  const deleteTodo = (index: number) => {
    todo.splice(index, 1);
    setTodo([...todo]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>
      <SafeAreaView style={styles.inputContainer}>
        <TextInput
          style={styles.todoInp}
          onChangeText={setInput}
          value={input}
          placeholder="Enter your todo"
          placeholderTextColor="#A9A9A9"
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.addBtn}
          onPress={addTodo}
        >
          <Text style={styles.text}>Add Todo</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {todo.length > 0 ? (
        <FlatList
          data={todo}
          renderItem={({ item, index }) => (
            <View style={styles.todoContainer}>
              <Text style={styles.todoText}>{item}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.editBtn}
                  onPress={() => {
                    setEditValue(todo[index]);
                    setModalVisible(true);
                    setIndex(index);
                  }}
                >
                  <Text style={styles.text}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.deleteBtn}
                  onPress={() => deleteTodo(index)}
                >
                  <Text style={styles.text}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 10 }}
          style={{ flexGrow: 1 }}
        />
      ) : (
        <Text style={styles.noTodo}>No Todo Found!</Text>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>
            <TextInput
              style={[styles.todoInp, { width: "100%" }]}
              onChangeText={setEditValue}
              value={editValue}
              placeholder="Enter Updated Todo"
              placeholderTextColor="#A9A9A9"
            />
            <View style={styles.modalActions}>
              <Pressable style={styles.modalButton} onPress={() => updateTodo(index)}>
                <Text style={styles.text}>Update</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, styles.buttonClose]} onPress={() => setModalVisible(false)}>
                <Text style={styles.text}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FB",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  heading: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  todoInp: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  addBtn: {
    width: "100%",
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  todoContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 3,
  },
  todoText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%", // Ensure the buttons take up the full width of the container
  },
  editBtn: {
    backgroundColor: "#FFC107",
    padding: 10,
    flex: 1, // Each button takes up 50% of the container
    marginRight: 5, // Space between buttons
    borderRadius: 5,
  },
  deleteBtn: {
    backgroundColor: "#F44336",
    padding: 10,
    flex: 1, // Each button takes up 50% of the container
    marginLeft: 5, // Space between buttons
    borderRadius: 5,
  },
  noTodo: {
    textAlign: "center",
    fontSize: 18,
    color: "#999",
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#4A90E2",
    minWidth: 100,
    textAlign: "center",
  },
  buttonClose: {
    backgroundColor: "#999",
  },
});
