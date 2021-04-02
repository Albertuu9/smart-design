import Vue from "vue"

Vue.filter("completeName", str => str.name + ' ' + (str.surname ? str.surname : ''))