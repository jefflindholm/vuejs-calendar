<template>
    <div :class="classObject" @click="captureClick">
        {{day.format('D')}}
        <ul class="event-list">
            <li v-for="event in events">{{event.description}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    props: ['day'],
    computed: {
        events() {
            return this.$store.state.events.filter(event => this.day.isSame(event.date, 'day'))
        },
        classObject() {
            const today = this.day.isSame(this.$moment(), 'day');
            const formActive = this.$store.state.eventFormActive;
            return {
                day: true,
                today,
                past: this.day.isSameOrBefore(this.$moment(), 'day') && !today,
                active: formActive && this.day.isSame(this.$store.state.eventFormDate, 'day'),
            }
        }
    },
    methods: {
        captureClick(event) {
            this.$store.commit('eventFormPos', { x: event.clientX, y: event.clientY });
            this.$store.commit('eventFormActive', true);
            this.$store.commit('eventFormDate', this.day);
        }
    }
}
</script>
<style>
</style>
