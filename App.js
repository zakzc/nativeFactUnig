import react, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  const [buttonSwitch, setButtonSwitch] = useState(true);
  const [number, onChangeNumber] = useState("");
  const [calculatedFact, setCalculatedFact] = useState(1);
  const [prevResults, setPrevResults] = useState([]);

  const factorial = (num) => {
    if (num === 0 || num === 1) return 1;
    for (var i = num - 1; i >= 1; i--) {
      num *= i;
    }
    return num;
  };

  function calculateFactorial() {
    const numToCalculate = parseInt(number);
    const result = factorial(numToCalculate);
    setCalculatedFact(result);
    setButtonSwitch(!buttonSwitch);
    setPrevResults([...prevResults, { base: numToCalculate, result: result }]);
    console.log(prevResults);
  }

  function clearCalc() {
    onChangeNumber(0);
    setCalculatedFact(1);
    setButtonSwitch(!buttonSwitch);
  }

  function eraseCalc(toErase) {
    const newResults = prevResults.filter((j) => j !== toErase);
    setPrevResults(newResults);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}>Descubra o fatorial de um número:</Text>
      <Text style={styles.textStyle}>Informe o número abaixo:</Text>
      <TextInput
        style={styles.inputStyle}
        onChangeText={onChangeNumber}
        keyboardType="numeric"
        value={number === 0 ? " " : number}
      />
      <View style={styles.buttonArea}>
        <View style={styles.buttonSeparator}>
          {buttonSwitch === true ? (
            <Button
              title="Calcule o fatorial"
              color="green"
              onPress={() => calculateFactorial()}
            />
          ) : (
            <Button
              title="Efetuar novo cálculo"
              onPress={() => clearCalc()}
              color="red"
            />
          )}
        </View>
      </View>
      <Text style={styles.textStyle}>Resultado:</Text>
      <Text style={styles.resultsText}>{calculatedFact}</Text>
      <Text style={styles.textStyle2}>Resultados anteriores</Text>
      <View>
        {prevResults.length > 0 ? (
          prevResults.map((i) => (
            <View style={styles.results} key={i.result}>
              <Text style={styles.resultsText}>
                {i.base}! = {i.result}{" "}
                <Button title=" X " onPress={() => eraseCalc(i)} />
              </Text>
            </View>
          ))
        ) : (
          <View />
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "Azure",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textStyle: {
    marginBottom: "12px",
  },
  textStyle2: {
    marginBottom: "8px",
    fontWeight: 400,
    fontSize: "large",
  },
  textHeading: {
    fontWeight: 500,
    fontSize: "large",
    margin: "25px",
  },
  inputStyle: {
    height: "40px",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: "2px",
    alignItems: "center",
  },
  buttonArea: {
    flexDirection: "row",
    marginTop: "30px",
    marginBottom: "30px",
  },
  buttonSeparator: {
    marginRight: "12px",
  },
  results: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  resultsText: {
    fontWeight: 500,
    fontSize: "large",
    margin: "7px",
    color: "darkslateblue",
  },
});
