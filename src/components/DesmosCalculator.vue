<template>
  <div id="toolbar" />
  <div id="container">
    <div
      v-if="role == 'viewer'"
      id="expressions_panel"
    >
      <h1>Expressions</h1>
      <div
        v-for="expression in expressions" 
        id="expressions"
        :key="expression.id"
      >
        <Expression :expression="expression" />
      </div>
    </div>
    <div
      id="calculator"
      ref="calc"
    />
  </div>
</template>

<script>
import { useCalculator } from "../functions/calculator";
import { useCPU } from "../functions/cpu";
import Expression from './Expression.vue'

export default {
  components: {
    Expression
  },
  setup() {
    const { role } = useCPU();
    const { calc, expressions } = useCalculator();
    return {
      calc, expressions, role
    };
  },
};
</script>
<style>
#toolbar {
  height: 20px;
}
#container {
  display: flex;
  justify-content: center;
  overflow: hidden;
}
#calculator {
  width: 100%;
  height: 100vh;
}
#expressions_panel {
  width: 300px;
  padding: 15px;
}
#expressions_panel h1 {
  text-align: center;
}
#expressions {
  display: flex;
  flex-direction: column;
  gap: 20px 20px;
}
</style>