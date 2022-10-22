<template>
    <transition name="modal-animation">
        <div class="modal-backdrop" v-show="modalActive">
            <transition name="modal-animation-inner">
                <div v-show="modalActive" class="modal-box">
                    <div class="modal-body">
                        <slot name="modal-body" />
                    </div>
                    <div class="modal-footer">
                        <slot name="modal-footer" />
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'modalActive',

    props: {
        modalActive: {
            required: true,
            type: Boolean
        },
    },
})

</script>
<style lang="scss" scoped>
@import "~@/styles/modal.scss";
</style>
