<template>
<div>
    <div id="header">
        <div>
            <h1>Calendar</h1>
        </div>
        <div>
            <current-month></current-month>
        </div>
    </div>
    <div id="day-bar">
        <div :key="name" v-for="name in dayNames">{{name}}</div>
    </div>
    <div id="calendar">
        <div :key="idx" v-for="(week, idx) in weeks" class="calendar-week">
            <calendar-day :key="day" v-for="day in week" :day="day"></calendar-day>
        </div>
    </div>
    <event-form></event-form>
</div>
</template>
<script>
import calendarDay from './calendar-day.vue';
import currentMonth from './current-month.vue';
import eventForm from './event-form.vue';
const SUNDAY = 0;
const MONDAY = 1;
export default {
    components: {
        calendarDay,
        currentMonth,
        eventForm,
    },
    computed: {
        month() {
            return this.$store.state.currentMonth;
        },
        year() {
            return this.$store.state.currentYear;
        },
        days() {
            let days = [];
            let current = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D');
            do {
                days.push(current);
                current = this.$moment(current).add(1, 'days');
            } while((current.month() + 1) === this.month);
            // add prev month days to start.....
            current = days[0];
            while(current.day() !== MONDAY) {
                current = this.$moment(current).subtract(1, 'days');
                days.unshift(current);
            }
            // add next month days to end
            current = days.slice(-1)[0];
            while(current.day() !== SUNDAY) {
                current = this.$moment(current).add(1, 'days');
                days.push(current);
            }
            return days;
        },
        weeks() {
            let weeks = [];
            let week = [];
            this.days.forEach(d => {
                week.push(d);
                if (d.day() === SUNDAY) {
                    weeks.push(week);
                    week = [];
                }
            });
            return weeks;
        },
        dayNames() {
            return [
                'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
            ]
        }
    },
}
</script>
<style>
</style>
