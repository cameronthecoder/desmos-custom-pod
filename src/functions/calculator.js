import { computed, onMounted, ref } from "vue";
import { useCPU } from "./cpu";

const { cpu, getConfig } = useCPU();
const calculator = ref(null);
const expressions = ref();
const lastEvent = ref("{}");

export function useCalculator() {
  const calc = ref(null);

  const setLastEvent = (data) => {
    lastEvent.value = data;
  };

  const onCalculatorStateChanged = () => {
    if (cpu.value != null) {
      const userID = getConfig().userID;
      const data = JSON.parse(lastEvent.value);
      if (data.userID == userID || !data.userID) {
        cpu.value.dispatchSyncMessage(
          "changeCalc",
          JSON.stringify({ calc: calculator.value.getState(), userID: userID }),
          false,
          false
        );
      }
      setLastEvent("{}");
    }
    expressions.value = calculator.value.getExpressions();
  };

  const getOptions = (role) => {
    return {
      settingsMenu: role == "presenter" || role == "owner",
      zoomButtons: role == "presenter" || role == "owner",
      expressions: role == "presenter" || role == "owner",
      images: role == "presenter" || role == "owner",
      lockViewport: role === "viewer",
      keypad: role === "presenter" || role == "owner",
    };
  };

  onMounted(() => {
    if (cpu.value) {
      const userConfig = getConfig();
      calculator.value = Desmos.GraphingCalculator(
        calc.value,
        getOptions(userConfig.role)
      );
    } else {
      calculator.value = Desmos.GraphingCalculator(
        calc.value,
        getOptions("owner")
      );
    }
    calculator.value.observeEvent("change", onCalculatorStateChanged);
  });

  return {
    getOptions,
    calculator: computed(() => calculator.value),
    expressions: computed(() => expressions.value),
    lastEvent: computed(() => lastEvent.value),
    calc,
    setLastEvent,
  };
}
