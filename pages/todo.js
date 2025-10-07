import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Modal, Button, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm, Controller } from "react-hook-form";

export default function AddTask() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: { content: "" }
  });

  const saveTask = async (value) => {
    try {
      const oldTasks = await AsyncStorage.getItem("tasks");
      const tasksArray = oldTasks ? JSON.parse(oldTasks) : [];

      if (editingIndex !== null) {
        const updatedTasks = tasksArray.map((task, i) =>
          i === editingIndex ? { ...task, content: value } : task
        );
        await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        setEditingIndex(null);
      } else {
        const newTask = { content: value, done: false };
        const newTasks = [...tasksArray, newTask];
        await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
        setTasks(newTasks);
      }
      setValue("content", "");
      setModalVisible(false);
      setEditingIndex(null);
    } catch (e) {
      console.log(e);
    }
  };

  const getTasks = async () => {
    try {
      const getContent = await AsyncStorage.getItem("tasks");
      if (getContent) setTasks(JSON.parse(getContent));
    } catch (e) { console.log(e); }
  };

  const removeTask = async (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const toggleDone = async (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const editTask = (index) => {
    const task = tasks[index];
    setValue("content", task.content);
    setEditingIndex(index);
    setModalVisible(true);
  };

  useEffect(() => { getTasks(); }, []);

  return (
    <View style={styles.container}>
      {/* Scrollable list */}
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 120 }}>
        {tasks.map((task, index) => (
          <View key={index} style={[styles.result, task.done && styles.doneTask]}>
            <Text style={[
              styles.taskText,
              task.done ? styles.taskDoneText : null
            ]}>
              {task.content}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, { backgroundColor: "#ff4d4d" }]} onPress={() => removeTask(index)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: "#2196f3" }]} onPress={() => editTask(index)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: "#4caf50" }]} onPress={() => toggleDone(index)}>
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setEditingIndex(null);
          setValue("content", "");
          setModalVisible(true);
        }}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.title}>{editingIndex !== null ? "Edit Task" : "Add a new task"}</Text>

            <Controller
              name="content"
              control={control}
              rules={{ required: "Please add content." }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="content"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.content && <Text style={styles.error}>{errors.content.message}</Text>}

            <Button title={editingIndex !== null ? "Save" : "Add"} onPress={handleSubmit(({ content }) => saveTask(content))} />
            <Button
              title="Close"
              onPress={() => {
                setModalVisible(false);
                setValue("content", "");
                setEditingIndex(null);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.4)" },
  modalBox: { backgroundColor: "white", padding: 20, borderRadius: 10, width: "80%" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 5, marginBottom: 10 },
  error: { color: "red" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: 'center' },
  result: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  taskText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333"
  },
  taskDoneText: {
    textDecorationLine: "line-through",
    color: "#999"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1E90FF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});