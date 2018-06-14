<template>
  <div>
    <table>
      <tr>
        <th v-for="item in data.des.head">{{item}}</th>
      </tr>
      <tr v-for="index in data.des.row">
        <td v-for="i in data.des.col">
          <input v-model="data.value"/>
        </td>
      </tr>
    </table>
  </div>

</template>

<script>
    export default {
        name: "BaseTable"
    }
</script>

<style scoped>

</style>
