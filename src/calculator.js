import { computed, onMounted, ref } from "vue";
import { useCPU } from "./cpu";

const { cpu, getConfig } = useCPU();
const calculator = ref(null);
const expressions = ref();

export function useCalculator() {
  const calc = ref(null);
  const lastEvent = ref("{}");

  const onCalculatorStateChanged = () => {
    if (cpu.value != null) {
      const userID = getConfig().userID;
      const data = JSON.parse(lastEvent.value);
      if (data.userID == userID || !data.userID) {
        console.log("sending data");
        cpu.value.dispatchSyncMessage(
          "changeCalc",
          JSON.stringify({
            calc: calculator.value.getState(),
            userID: userID,
          }),
          false,
          false
        );
      }
      lastEvent.value = "{}";
    }
    console.log(calculator.value.getExpressions());
    expressions.value = calculator.value.getExpressions();
  };

  const getOptions = (role) => {
    return {
      settingsMenu: role == "presenter" || role == "owner",
      zoomButtons: role == "presenter" || role == "owner",
      expressions: role == "presenter" || role == "owner",
      images: role == "presenter" || role == "owner",
      lockViewport: role === "viewer",
      border: true,
    };
  };

  onMounted(() => {
    if (cpu.value) {
      const userConfig = getConfig();
      calculator.value = Desmos.GraphingCalculator(
        calc.value,
        getOptions(userConfig.role) || "owner"
      );
      cpu.value.registerCallback("roleChanged", onRoleChanged);
      cpu.value.registerCallback("syncMessageReceived", onSyncMessageReceived);
    } else {
      calculator.value = Desmos.GraphingCalculator(calc.value, "owner");
    }
    calculator.value.observeEvent("change", onCalculatorStateChanged);
  });

  return {
    getOptions,
    calculator: computed(() => calculator.value),
    expressions: computed(() => expressions.value),
    calc,
  };
}
