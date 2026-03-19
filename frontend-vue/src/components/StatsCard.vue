<template>
  <article class="stats-card" :aria-label="titulo">
    <h3>{{ titulo }}</h3>
    <strong>{{ valor }}</strong>
    <p>{{ descricao }}</p>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  titulo: string;
  valor: string;
  descricao: string;
}>();
</script>