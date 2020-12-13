import { computed, onMounted, ref } from "vue";
import { useCalculator } from "./calculator";
const { calculator, getOptions } = useCalculator();
const cpu = ref(null);

export function useCPU() {
  const role = ref(null);

  const onConfigured = () => {
    console.log("Configured");
  };

  const getConfig = () => {
    return cpu.value.getConfig();
  };

  const onRoleChanged = () => {
    const userConfig = getConfig();
    role.value = userConfig.role;
    calculator.value.setOptions(getOptions(userConfig.role));
  };

  const onSyncMessageReceived = (msg) => {
    switch (msg.msgNm) {
      case "changeCalc":
        lastEvent.value = msg.msgVal;
        const data = JSON.parse(msg.msgVal);
        calculator.value.setState(data.calc);
        break;

      default:
        break;
    }
  };

  onMounted(() => {
    if (ConnectCustomSDK != undefined) {
      cpu.value = ConnectCustomSDK.SyncConnector || {};
      if (cpu.value) {
        cpu.value.init(
          onConfigured,
          "com.camerondahl.coordinateplanepod",
          "9.5.001",
          "connectsdkhook"
        );
        cpu.value.registerCallback(
          "onSyncMessageReceived",
          onSyncMessageReceived
        );
        role.value = getConfig().role;
        cpu.value.registerCallback("roleChanged", onRoleChanged);
      }
    } else {
      console.warn("SDK not defined");
    }
  });

  return {
    cpu: computed(() => cpu.value),
    role,
    getConfig,
  };
}
