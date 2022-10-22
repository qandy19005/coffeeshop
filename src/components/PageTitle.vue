<template>
    <h3>
        {{title}}
    </h3>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'modalActive',

    props: {
        title: {
            required: true,
            type: String
        },
    },
})

</script>
<style lang="scss" scoped>
h3{
  margin: 10px auto -2px auto;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  color: #FFFFFF;
  font-size: 22px;
}
</style>
