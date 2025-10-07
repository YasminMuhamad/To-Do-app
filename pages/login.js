import { useState } from "react";
import { Button, Modal, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "../components/icon";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const [modalVisible, setModalVisible] = useState(false)

    const [showPass, setShowPass] = useState(false);

    const [errors, setErrors] = useState({
        usernameErr: "",
        passwordErr: "",
        emailErr: "",
        phoneErr: ""
    })

    const visible = () => {
        let valid = true
        let newErrors = {
            usernameErr: "",
            passwordErr: "",
            emailErr: "",
            phoneErr: ""
        };

        // Username validation
        const usernameRegex = /^[A-Za-z_][A-Za-z0-9_]*$/;
        if (username.length == 0) {
            newErrors.usernameErr = "Username is required."
            valid = false
        } else if (username.length < 2) {
            newErrors.usernameErr = "Username can't be less than two characters."
            valid = false
        } else if (!usernameRegex.test(username)) {
            newErrors.usernameErr = "Username is in wrong format."
            valid = false
        }
        else {
            newErrors.usernameErr = ""
        }
        // Password validation
        if (password.length == 0) {
            newErrors.passwordErr = "Password is required."
            valid = false
        } else if (password.length < 8) {
            newErrors.passwordErr = "Password must be more than 8 characters."
            valid = false
        }
        else {
            newErrors.passwordErr = ""
        }

        // Email validation
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (email.length == 0) {
            newErrors.emailErr = "Email is required."
            valid = false
        } else if (!emailRegex.test(email)) {
            newErrors.emailErr = "Email is in wrong format."
            valid = false
        }
        else {
            newErrors.emailErr = ""
        }

        // Phone validation
        const phoneRegex = /^[0-9]{10,15}$/;
        if (phone.length == 0) {
            newErrors.phoneErr = "Phone is required."
            valid = false
        } else if (!phoneRegex.test(phone)) {
            newErrors.phoneErr = "Phone is in wrong format."
            valid = false
        }
        else {
            newErrors.phoneErr = ""
        }
        setErrors(newErrors)
        return valid
    }

    const handleSubmit = () => {
        if (visible()) {
            setModalVisible(true)
        }
    }

    const toggleShowPass = () => {
        setShowPass(!showPass);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>

            <TextInput
                value={username}
                placeholder="Enter your username"
                keyboardType="default"
                onChangeText={setUsername}
                mode="outlined"
                style={styles.input}
            />
            <Text style={styles.error}>{errors.usernameErr}</Text>

            <TextInput
                value={email}
                placeholder="Enter your email"
                keyboardType="email-address"
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
            />
            <Text style={styles.error}>{errors.emailErr}</Text>

            <TextInput
                value={phone}
                placeholder="Enter your phone number"
                keyboardType="numeric"
                onChangeText={setPhone}
                mode="outlined"
                style={styles.input}
            />
            <Text style={styles.error}>{errors.phoneErr}</Text>

            <View style={styles.passwordContainer}>
                <TextInput
                    value={password}
                    placeholder="Enter your password"
                    keyboardType="default"
                    secureTextEntry={!showPass} // التحكم في الإظهار
                    onChangeText={setPassword}
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                />
                <TouchableOpacity onPress={toggleShowPass} style={styles.iconContainer}>
                    <Icon name={showPass ? "eye" : "eye-invisible"} />
                </TouchableOpacity>
            </View>

            <Text style={styles.error}>{errors.passwordErr}</Text>

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent={true} onDismiss={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Submitted Data</Text>
                        <Text>Username: {username}</Text>
                        <Text>Email: {email}</Text>
                        <Text>Phone Number: {phone}</Text>

                        <Button title="Close" mode="contained" onPress={() => setModalVisible(false)} style={styles.closeButton}>
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FA",
        padding: 20,
        justifyContent: "center"
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#ffffffff",
        borderRadius: 10,
        marginBottom: 10,
        paddingRight: 10,
    },
    iconContainer: {
        paddingHorizontal: 8,
    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 25,
        color: "#333"
    },
    input: {
        marginBottom: 10,
        backgroundColor: "white",
    },
    button: {
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 10,
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },
    error: {
        color: "red",
        marginBottom: 5,
        fontSize: 13,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        backgroundColor: "white",
        padding: 25,
        borderRadius: 15,
        width: "80%",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "#333"
    },
    closeButton: {
        marginTop: 20,
        alignSelf: "center",
        paddingHorizontal: 20,
        borderRadius: 10,
    },
});