import { computed, onMounted, ref } from "vue";
import { useCalculator } from "./calculator";
const { calculator, getOptions, lastEvent, setLastEvent } = useCalculator();
const cpu = ref(null);

export function useCPU() {
  const role = ref(null);

  const onConfigured = () => {
    console.log("Configured");
  };

  const getConfig = () => {
    return cpu.value.getConfig();
  };

  const onRoleChanged = (e) => {
    const userConfig = getConfig();
    if (e.userId == userConfig.userID) {
      console.log("user role has changed");
      role.value = userConfig.role;
      calculator.value.setOptions(getOptions(userConfig.role));
    }
  };

  const onSyncMessageReceived = (msg) => {
    console.log(msg);
    switch (msg.msgNm) {
      case "changeCalc":
        console.log("change calc has been received");
        setLastEvent(msg.msgVal);
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
          "syncMessageReceived",
          onSyncMessageReceived
        );
        role.value = getConfig().role;
        cpu.value.registerCallback("roleChanged", onRoleChanged);
      }
    } else {
      role.value = "viewer";
      console.warn("SDK not defined");
    }
  });

  return {
    cpu: computed(() => cpu.value),
    role,
    getConfig,
  };
}
