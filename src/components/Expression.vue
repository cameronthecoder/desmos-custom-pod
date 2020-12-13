<template>
  <div
    v-if="expression.type == 'expression' && expression.latex != ''" 
  >
    <div class="expression">
      <span
        class="expression_color"
        :style="{backgroundColor: expression.color}"
      />
      <h3>{{ expression.latex }}</h3>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        expression: {
            type: Object,
            default: () => {},
            required: true
        }
    }
}
</script>
<style>
.expression h3 {
  line-height: 3px;
}
.expression {
  padding: 5px;
  margin-bottom: 3px;
  background-color: rgb(206, 204, 204);
  border-radius: 8px;
  display: flex;
  align-items: center;
}
.expression_color {
  height: 25px;
  margin-right: 5px;
  flex: none;
  width: 25px;
  border: 3px solid white;
  border-radius: 50%;
  display: inline-block;
}
</style>

<style>

</style>