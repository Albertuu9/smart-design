<template>
  <div>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark outlined class="ml-2" small v-bind="attrs" v-on="on">
          <v-icon small class="pr-1 icons">
            mdi-content-save
          </v-icon>
          Guardar
        </v-btn>
      </template>
      <span>Guardar proyecto</span>
    </v-tooltip>
        <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark :color="'#5cb85ccc'" class="ml-2" small v-bind="attrs" v-on="on">
          <v-icon small class="pr-1 icons">
            mdi-file-code
          </v-icon>
          Generar
        </v-btn>
      </template>
      <span>Generar mi código</span>
    </v-tooltip>
  </div>
</template>
<script>
export default {
    name: "MainActionsComponent"
}
</script>
