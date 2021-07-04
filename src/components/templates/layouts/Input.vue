<template>
    <div class="t_input">
        <label class="relative text-gray-100" v-if="label">
            <span>{{ label }}</span>
            <i class="absolute text-violet-400 fa-xs mx-1 fas fa-star-christmas" v-if="required"></i>
        </label>
        <div class="flex flex-col flex-grow">
            <div class="input_group bg-gray-600" :class="{ focus: focus }">
                <i class="text-gray-400" :class="icon" v-if="icon"></i>
                <input
                    dir="auto"
                    class="text-white"
                    :name="name"
                    :type="inputType"
                    :placeholder="placeholder"
                    v-model="value"
                    ref="input"
                    @input="updateValue()"
                    @focus="toggleFocus()"
                    @blur="toggleFocus()"
                />
                <b
                    v-if="isPassword"
                    @click="passwordViewToggle()"
                    class="cursor-pointer text-gray-300 far fa-eye fa-sm"
                    :class="{ 'fa-eye-slash': inputType != 'password' }"
                ></b>
                <b v-if="isSearch" @click="clearInput()" class="cursor-pointer text-violet-300 far fa-times fa-sm"></b>
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
import IMask from "imask";

export default {
    name: "Button",
    props: ["type", "name", "label", "value", "placeholder", "icon", "desc", "error", "required", "maskPattern"],
    data() {
        return {
            focus: false,
            isPassword: this.type == "password",
            isSearch: this.type == "search",
            inputType: this.type,
        };
    },
    created() {},
    mounted() {},
    methods: {
        updateValue() {
            if (!!this.maskPattern) {
                IMask(this.$refs.input, { mask: this.maskPattern });
            }
            this.$emit("update:value", this.value);
        },
        toggleFocus() {
            this.focus = !this.focus;
        },

        passwordViewToggle() {
            this.inputType = this.inputType == "password" ? "text" : "password";
        },

        clearInput() {
            this.$emit("update:value", "");
        },
    },
};
</script>

<style scoped></style>
