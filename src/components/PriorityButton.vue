<template>
  <button id="PriorityButton" v-for="Priority in Priorities" :key="Priority.id">
    <img src="" alt="" /> {{ Priority.Priority }}
  </button>
</template>

<script>
export default {
  data() {
    return {
      Priorities: [
        {
          Priority: 'Kinderwagen',
          id: 1
        },
        {
          Priority: 'Rollstuhl',
          id: 2
        },
        {
          Priority: 'Gehbehinderung',
          id: 3
        },
        {
          Priority: 'Seheinschränkung',
          id: 4
        },
        {
          Priority: 'Zwillingskinderwagen',
          id: 5
        }
      ]
    }
  }
}
</script>

<style>
#PriorityButton {
  padding: 1rem;
  background-color: #f4f1de;
  color: #3d405b;
  border-radius: 1rem;
  width: 70%;
  display: grid;
  margin-top: 1rem;
  font-weight: bold;
}
</style>
