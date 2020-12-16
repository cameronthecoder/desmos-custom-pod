<template>
  <div id="col-container">
    <div 
      v-if="role == 'owner'"
      id="toolbar" 
    >
      <button
        is="coral-button" 
        variant="cta"
        size="small"
      >
        Enable Participant Access
      </button>
    </div>
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
          <Expression v-if="expression.latex" :expression="expression" />
        </div>
      </div>
      <div
        id="calculator"
        ref="calc"
      />
    </div>
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
  padding: 2px;
}
#col-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
#container {
  display: flex;
  padding: 10px;
  overflow: hidden;
  flex-grow: 1;
}
#calculator {
  width: 100%;
}
#expressions_panel {
  width: 300px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 0px;
  padding-bottom: 0px;
  flex: none;
}
#expressions_panel h1 {
  text-align: center;
  margin: 0;
}
#expressions {
  display: flex;
  flex-direction: column;
}
</style>