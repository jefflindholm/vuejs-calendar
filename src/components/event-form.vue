<template>
    <div id="event-form" :class="buildClass" :style="buildStyle">
        <h4>Add event</h4>
        <p>{{ date }}</p>
        <div class="text">
            <input v-focus type="text" v-model="description" placeholder="Enter event description" @keyup.enter="create">
        </div>
        <div class="buttons">
            <button @click="create">Create</button>
        </div>
        <button id="close-button" @click="close">&#10005</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                description: '',
            }
        },
        methods: {
            close() {
                this.$store.commit('eventFormActive', false);
            },
            create() {
                if (this.description.length < 1) {
                    return;
                }
                this.$store.dispatch('addEvent', this.description);
                this.description = '';
                this.close();
            }
        },
        computed: {
            date() {
                return this.$store.state.eventFormDate.format('dddd, MMM Do');
            },
            buildClass() {
                return {
                    active: this.$store.state.eventFormActive,
                }
            },
            buildStyle() {
                return {
                    top: `${this.$store.state.eventPos.y}px`,
                    left: `${this.$store.state.eventPos.x}px`,
                }
            }
        },
        directives: {
            focus: {
                update(el) {
                    el.focus();
                },
            },
        },
    }
</script>
<style>
</style>
