<template>
    <div class="t_checkbox">
        <label class="text-gray-100" v-if="label">{{ label }}</label>
        <div class="flex flex-col flex-grow">
            <div class="input_group bg-gray-600">
                <i class="text-gray-400" :class="icon" v-if="icon"></i>
                <input class="text-white" type="checkbox" :name="name" v-model="value" @change="updateValue()" />
            </div>
            <div class="desc text-gray-400 text-xs my-2" v-if="desc">{{ desc }}</div>
            <div v-if="error" class="flex gap-1 items-center rounded bg-red-100 text-red-700 p-1 mt-1 text-xs">
                <i class="far fa-exclamation-circle"></i>
                <b>{{ error }}</b>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Button",
    props: ["name", "label", "value", "desc", "error"],
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {
        updateValue() {
            this.$emit("update:value", this.value);
        },
    },
};
</script>

<style scoped></style>
