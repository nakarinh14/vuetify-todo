<template>
  <div
    v-ripple
    class="rounded-lg"
    @click="trigger"
  >
    <v-btn
      id="btn"
      class="no-hover"
      icon
    >
      <v-icon
        :color="iconColor"
        :left="left"
      >
        {{ iconName }}
      </v-icon>
    </v-btn>
    <span>
     {{ display }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'RippleIconText',
  props: ['trigger', 'display', 'iconColor', 'iconName', 'left'],
};

</script>

<style scoped>
#btn {
  pointer-events: none;
}
div {
  cursor: pointer;
  user-select: none;
}
</style>
